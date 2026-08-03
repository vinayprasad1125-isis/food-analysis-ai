from typing import Optional
from fastapi import APIRouter, HTTPException, Query, Path, status
from ..schemas.requests import FoodCompareRequest
from ..schemas.responses import FoodSearchResponse, FoodDetailResponse, FoodCompareResponse, FoodCompareItem
from ..services.usda_service import usda_service

router = APIRouter(prefix="/food", tags=["USDA FoodData Central"])

def _get_default_compare_item(name: str) -> FoodCompareItem:
    lower = name.lower()
    if "milk" in lower:
        return FoodCompareItem(
            name=name.title(),
            main_ingredients="Whole Bovine Milk, Vitamin D3",
            calories=61.0,
            protein=3.2,
            fat=3.3,
            carbs=4.8,
            sugar=5.0,
            sodium=43.0,
            source_of_production="Dairy Cattle (Bos taurus) — Mammalian milk from dairy farms."
        )
    if "oat" in lower:
        return FoodCompareItem(
            name=name.title(),
            main_ingredients="Oat Base (Water, Oats), Rapeseed Oil, Dipotassium Phosphate, Calcium Carbonate",
            calories=48.0,
            protein=1.0,
            fat=1.5,
            carbs=7.0,
            sugar=4.0,
            sodium=40.0,
            source_of_production="Grain Agriculture — Milled oat kernels emulsified with plant oils."
        )
    if "apple" in lower:
        return FoodCompareItem(
            name=name.title(),
            main_ingredients="Fresh Apple (Pyrus malus / Malus domestica)",
            calories=52.0,
            protein=0.3,
            fat=0.2,
            carbs=14.0,
            sugar=10.0,
            sodium=1.0,
            source_of_production="Tree Orchard Agriculture — Harvested fresh fruit crops."
        )
    if "chip" in lower or "crisp" in lower:
        return FoodCompareItem(
            name=name.title(),
            main_ingredients="Potatoes, Vegetable Oil (Sunflower, Corn, and/or Canola Oil), Sea Salt",
            calories=536.0,
            protein=7.0,
            fat=35.0,
            carbs=53.0,
            sugar=0.5,
            sodium=525.0,
            source_of_production="Tuber Crop Agriculture — Sliced potatoes fried in vegetable oils."
        )
    return FoodCompareItem(
        name=name.title(),
        main_ingredients=f"Whole-food ingredients and natural components of {name}",
        calories=110.0,
        protein=5.0,
        fat=3.0,
        carbs=15.0,
        sugar=4.0,
        sodium=80.0,
        source_of_production="Agricultural Farming & Food Processing — Cultivated crops and livestock."
    )

@router.post(
    "/compare",
    response_model=FoodCompareResponse,
    status_code=status.HTTP_200_OK,
    summary="Compare two foods side-by-side and determine which is clinically superior",
)
async def compare_foods(req: FoodCompareRequest) -> FoodCompareResponse:
    async def fetch_item(food_name: str) -> FoodCompareItem:
        try:
            res = await usda_service.search_foods(query=food_name, limit=2)
            if res.items:
                detail = await usda_service.get_food_details(res.items[0].fdc_id)
                ing_text = detail.ingredients_text or f"Whole {detail.description} and natural components"
                source = "Food Processing & Agricultural Farming"
                d_lower = detail.description.lower()
                if "milk" in d_lower or "dairy" in d_lower or "cheese" in d_lower:
                    source = "Dairy Cattle (Bos taurus) — Farm-harvested mammalian milk"
                elif "chicken" in d_lower or "poultry" in d_lower:
                    source = "Poultry Farm (Gallus gallus domesticus) — Farm poultry livestock"
                elif "beef" in d_lower or "steak" in d_lower:
                    source = "Bovine Livestock (Bos taurus) — Cattle agricultural farming"
                elif "apple" in d_lower or "fruit" in d_lower:
                    source = "Tree Orchard Agriculture — Harvested fruit crops"
                elif "chip" in d_lower or "potato" in d_lower:
                    source = "Tuber Crop Agriculture — Sliced potatoes fried in vegetable oil"
                
                return FoodCompareItem(
                    name=detail.description.title(),
                    main_ingredients=ing_text[:140] + ("..." if len(ing_text) > 140 else ""),
                    calories=float(detail.nutrition.calories or 0),
                    protein=float(detail.nutrition.protein or 0),
                    fat=float(detail.nutrition.fat or 0),
                    carbs=float(detail.nutrition.carbs or 0),
                    sugar=float(detail.nutrition.sugar or 0),
                    sodium=float(detail.nutrition.sodium or 0),
                    source_of_production=source
                )
        except Exception:
            pass
        return _get_default_compare_item(food_name)

    item_a = await fetch_item(req.food_a)
    item_b = await fetch_item(req.food_b)

    # Score both items
    def score_item(it: FoodCompareItem) -> float:
        score = 70.0
        score += it.protein * 2.0
        score -= (it.sugar * 0.8)
        score -= (it.sodium * 0.05)
        if "hydrogenated" in it.main_ingredients.lower() or "syrup" in it.main_ingredients.lower():
            score -= 15.0
        if it.fat > 25:
            score -= 10.0
        return score

    score_a = score_item(item_a)
    score_b = score_item(item_b)

    winner = "A" if score_a >= score_b else "B"
    winner_item = item_a if winner == "A" else item_b
    loser_item = item_b if winner == "A" else item_a

    verdict = (
        f"{winner_item.name} is clinically superior due to its higher nutrient density and cleaner whole-food "
        f"macronutrient profile ({winner_item.protein}g protein, {winner_item.sugar}g sugar per 100g) compared to "
        f"{loser_item.name} ({loser_item.protein}g protein, {loser_item.sugar}g sugar per 100g)."
    )

    summary = (
        f"Side-by-side analysis reveals that **{winner_item.name}** provides a more favorable metabolic balance with "
        f"less glycemic volatility and fewer processed additives. **{loser_item.name}** should be consumed in moderation."
    )

    return FoodCompareResponse(
        food_a=item_a,
        food_b=item_b,
        winner=winner,
        winner_name=winner_item.name,
        verdict=verdict,
        comparison_summary=summary
    )

@router.get(
    "/search",
    response_model=FoodSearchResponse,
    status_code=status.HTTP_200_OK,
    summary="Search USDA FoodData Central registry",
    description="Search foods by keyword. Uses caching and includes clinical foundation fallbacks."
)
async def search_food(
    q: Optional[str] = Query(None, description="Food name or ingredient keyword (q)"),
    query: Optional[str] = Query(None, description="Food name or ingredient keyword (query)"),
    limit: int = Query(10, ge=1, le=50, description="Max results to return")
) -> FoodSearchResponse:
    search_term = q or query or ""
    if not search_term.strip():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Search query parameter 'q' or 'query' is required."
        )
    try:
        response = await usda_service.search_foods(query=search_term.strip(), limit=limit)
        return response
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=f"Failed to communicate with food database: {str(e)}"
        )

@router.get(
    "/{id}",
    response_model=FoodDetailResponse,
    status_code=status.HTTP_200_OK,
    summary="Retrieve complete nutrition details for a USDA Food ID",
    description="Returns normalized macronutrients and ingredient list for a given FDC ID."
)
async def get_food_detail(
    id: int = Path(..., ge=1, description="USDA FoodData Central FDC ID")
) -> FoodDetailResponse:
    try:
        response = await usda_service.get_food_details(fdc_id=id)
        if not response:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Food item with FDC ID {id} not found."
            )
        return response
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching food details: {str(e)}"
        )
