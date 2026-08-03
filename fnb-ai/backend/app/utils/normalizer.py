import re
from typing import Dict, Any, List

# USDA nutrient name mapping to standardized schema fields
USDA_NUTRIENT_MAP = {
    "energy": "calories",
    "energy (atwater general factors)": "calories",
    "energy (atwater specific factors)": "calories",
    "protein": "protein",
    "total lipid (fat)": "fat",
    "fat": "fat",
    "carbohydrate, by difference": "carbs",
    "carbohydrate": "carbs",
    "fiber, total dietary": "fiber",
    "fiber": "fiber",
    "sugars, total including nlea": "sugar",
    "sugars, total": "sugar",
    "sugar": "sugar",
    "sugars, added": "added_sugar",
    "sodium, na": "sodium",
    "sodium": "sodium",
    "fatty acids, total saturated": "saturated_fat",
    "fatty acids, total trans": "trans_fat",
}

def normalize_usda_nutrients(food_nutrients: List[Dict[str, Any]]) -> Dict[str, float]:
    """
    Takes raw foodNutrients array from USDA FoodData Central and returns
    a normalized dictionary of primary macronutrients.
    """
    result = {
        "calories": 0.0,
        "protein": 0.0,
        "fat": 0.0,
        "carbs": 0.0,
        "fiber": 0.0,
        "sugar": 0.0,
        "sodium": 0.0,
        "added_sugar": 0.0,
        "saturated_fat": 0.0,
        "trans_fat": 0.0,
    }

    for item in food_nutrients:
        # nutrientName can be in 'nutrientName' or item['nutrient']['name']
        name = ""
        if "nutrientName" in item and item["nutrientName"]:
            name = str(item["nutrientName"]).lower().strip()
        elif "nutrient" in item and isinstance(item["nutrient"], dict):
            name = str(item["nutrient"].get("name", "")).lower().strip()
        
        val = 0.0
        if "value" in item and item["value"] is not None:
            try:
                val = float(item["value"])
            except (ValueError, TypeError):
                val = 0.0
        elif "amount" in item and item["amount"] is not None:
            try:
                val = float(item["amount"])
            except (ValueError, TypeError):
                val = 0.0

        for key_pattern, field_name in USDA_NUTRIENT_MAP.items():
            if key_pattern in name:
                # Keep the maximum reported value for duplicate energy entries
                if field_name == "calories" and result["calories"] > 0 and val < result["calories"]:
                    continue
                result[field_name] = round(val, 2)
                break

    return result

def parse_quantity_to_grams(quantity_str: str) -> float:
    """
    Parses natural language quantity strings like '20 g', '200 ml', '1 cup', '1 serving'
    and estimates standardized weight in grams/ml.
    """
    if not quantity_str:
        return 100.0

    q_lower = quantity_str.lower().strip()

    # Extract leading number if present
    match = re.search(r"^([\d.]+)", q_lower)
    num = float(match.group(1)) if match else 1.0

    if "kg" in q_lower:
        return num * 1000.0
    if "mg" in q_lower:
        return num / 1000.0
    if "g" in q_lower or "ml" in q_lower or "gram" in q_lower:
        return num
    if "oz" in q_lower or "ounce" in q_lower:
        return num * 28.35
    if "lb" in q_lower or "pound" in q_lower:
        return num * 453.59
    if "cup" in q_lower:
        return num * 240.0
    if "tbsp" in q_lower or "tablespoon" in q_lower:
        return num * 15.0
    if "tsp" in q_lower or "teaspoon" in q_lower:
        return num * 5.0
    if "can" in q_lower or "bottle" in q_lower:
        return num * 355.0
    if "serving" in q_lower or "slice" in q_lower or "piece" in q_lower:
        return num * 80.0

    # If only number was given, assume grams
    return num if num > 0 else 100.0
