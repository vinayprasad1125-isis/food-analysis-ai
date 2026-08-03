import re
from typing import List, Dict, Any, Tuple
from ..schemas.responses import NutritionSummary, IngredientAnalysisItem

# Harmful & flagged additive keyword dictionaries
HARMFUL_ADDITIVES = [
    "aspartame", "sucralose", "saccharin", "acesulfame", "sodium benzoate",
    "potassium sorbate", "bha", "bht", "tbhq", "msg", "monosodium glutamate",
    "high fructose corn syrup", "hfcs", "hydrogenated", "trans fat"
]

ARTIFICIAL_COLORS = [
    "red 40", "yellow 5", "yellow 6", "blue 1", "blue 2", "green 3",
    "caramel color", "titanium dioxide", "artificial dye"
]

PRESERVATIVES = [
    "benzoate", "sorbate", "nitrate", "nitrite", "sulfite", "propionate",
    "edta"
]

PROCESSED_INGREDIENTS = [
    "maltodextrin", "dextrose", "syrup", "emulsifier", "polysorbate",
    "lecithin", "gum", "modified starch", "bleached"
]

class HealthScoreCalculator:
    def evaluate(
        self,
        nutrition: NutritionSummary,
        ingredients: List[str]
    ) -> Tuple[int, List[IngredientAnalysisItem], List[str], List[str], List[str], List[str], List[str]]:
        """
        Calculates a clinical health score from 0 to 100 and classifies ingredients
        into beneficial, moderate, and harmful components.
        """
        score = 85.0  # Base starting score for standard whole foods
        warnings: List[str] = []
        benefits: List[str] = []
        good_ingredients: List[str] = []
        bad_ingredients: List[str] = []
        potential_risks: List[str] = []
        item_analyses: List[IngredientAnalysisItem] = []

        # 1. Macronutrient adjustments
        # Sugar penalty (excessive sugars over 15g per serving)
        if nutrition.sugar > 15.0:
            penalty = min(25.0, (nutrition.sugar - 15.0) * 1.5)
            score -= penalty
            warnings.append(f"High free sugar content ({nutrition.sugar}g detected).")
            potential_risks.append("Rapid glycemic spike and insulin secretion risk.")
        elif nutrition.sugar <= 5.0:
            score += 4.0
            benefits.append("Low glycemic load with minimal free sugars.")

        # Added sugar penalty
        if (nutrition.added_sugar or 0.0) > 8.0:
            score -= 10.0
            warnings.append(f"Contains {nutrition.added_sugar}g of added industrial sugars.")

        # Sodium penalty (> 500mg per serving)
        if nutrition.sodium > 500.0:
            score -= 12.0
            warnings.append(f"Elevated sodium level ({nutrition.sodium}mg).")
            potential_risks.append("May contribute to arterial stiffness and hypertension.")
        elif nutrition.sodium < 140.0:
            score += 3.0
            benefits.append("Heart-healthy low sodium profile.")

        # Saturated & Trans fat adjustments
        if (nutrition.saturated_fat or 0.0) > 8.0:
            score -= 8.0
            warnings.append("High saturated lipid ratio.")
        if (nutrition.trans_fat or 0.0) > 0.1:
            score -= 20.0
            warnings.append("Harmful trans-fatty acids detected.")
            potential_risks.append("Trans fats increase LDL cholesterol and cardiovascular inflammation.")

        # Fiber & Protein bonuses
        if nutrition.fiber >= 5.0:
            score += 8.0
            benefits.append(f"High dietary fiber ({nutrition.fiber}g) promotes microbiome diversity.")
        if nutrition.protein >= 15.0:
            score += 7.0
            benefits.append(f"Rich in bioavailable protein ({nutrition.protein}g).")

        # 2. Semantic Ingredient Audit
        whole_food_count = 0
        processed_count = 0

        for ing in ingredients:
            ing_lower = ing.lower().strip()
            is_harmful = False
            is_flagged = False
            note = "Whole food component with high nutrient density."
            category = "Whole Food"

            # Check artificial additives & harmful sweeteners
            for add in HARMFUL_ADDITIVES:
                if add in ing_lower:
                    is_harmful = True
                    score -= 12.0
                    note = f"Harmful synthetic additive ({add.title()}) detected."
                    category = "Synthetic Additive"
                    bad_ingredients.append(ing)
                    warnings.append(f"Contains {add.title()}, which is flagged for metabolic disruption.")
                    break

            # Check artificial colors
            if not is_harmful:
                for col in ARTIFICIAL_COLORS:
                    if col in ing_lower:
                        is_harmful = True
                        score -= 10.0
                        note = f"Artificial coloring agent ({col.title()})."
                        category = "Artificial Coloring"
                        bad_ingredients.append(ing)
                        warnings.append(f"Contains synthetic food dye {col.title()}.")
                        break

            # Check preservatives & processed ingredients
            if not is_harmful:
                for pres in PRESERVATIVES:
                    if pres in ing_lower:
                        is_flagged = True
                        score -= 5.0
                        note = "Chemical preservative; monitor daily cumulative intake."
                        category = "Preservative"
                        if ing not in bad_ingredients:
                            bad_ingredients.append(ing)
                        break

            if not is_harmful and not is_flagged:
                for proc in PROCESSED_INGREDIENTS:
                    if proc in ing_lower:
                        is_flagged = True
                        processed_count += 1
                        score -= 3.0
                        note = "Ultra-processed food texture or sweetening agent."
                        category = "Processed Compound"
                        if ing not in bad_ingredients:
                            bad_ingredients.append(ing)
                        break

            if not is_harmful and not is_flagged:
                whole_food_count += 1
                good_ingredients.append(ing)

            status = "Harmful" if is_harmful else "Flagged" if is_flagged else "Good"
            risk = "High" if is_harmful else "Moderate" if is_flagged else "Low"

            item_analyses.append(IngredientAnalysisItem(
                name=ing,
                safety_status=status,
                risk_level=risk,
                notes=note,
                category=category
            ))

        # Whole foods vs processed foods ratio balance
        if whole_food_count > 0 and processed_count == 0:
            score += 5.0
            benefits.append("100% clean whole foods without industrial emulsifiers.")

        # Clamp final score between 0 and 100
        final_score = int(max(0.0, min(100.0, round(score))))
        return final_score, item_analyses, warnings, benefits, good_ingredients, bad_ingredients, potential_risks

health_scorer = HealthScoreCalculator()
