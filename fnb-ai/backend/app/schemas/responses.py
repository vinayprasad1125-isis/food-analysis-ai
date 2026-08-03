from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field

class NutritionSummary(BaseModel):
    calories: float = 0.0
    protein: float = 0.0
    fat: float = 0.0
    carbs: float = 0.0
    fiber: float = 0.0
    sugar: float = 0.0
    sodium: float = 0.0
    added_sugar: Optional[float] = 0.0
    saturated_fat: Optional[float] = 0.0
    trans_fat: Optional[float] = 0.0

class IngredientAnalysisItem(BaseModel):
    name: str
    safety_status: str = "Good"  # Good | Flagged | Harmful
    risk_level: str = "Low"      # Low | Moderate | High
    notes: str = "Clean whole-food ingredient."
    category: Optional[str] = "Whole Food"

class AnalyzeResponse(BaseModel):
    health_score: int = Field(..., ge=0, le=100, description="Algorithmic health score from 0 to 100")
    nutrition: NutritionSummary
    ingredient_analysis: List[IngredientAnalysisItem] = Field(default_factory=list)
    warnings: List[str] = Field(default_factory=list)
    benefits: List[str] = Field(default_factory=list)
    recommendations: List[str] = Field(default_factory=list)
    ai_summary: str = ""
    good_ingredients: List[str] = Field(default_factory=list)
    bad_ingredients: List[str] = Field(default_factory=list)
    potential_risks: List[str] = Field(default_factory=list)
    recommended_alternatives: List[str] = Field(default_factory=list)
    confidence_score: int = 95

class FoodSearchItem(BaseModel):
    fdc_id: int
    description: str
    brand_owner: Optional[str] = None
    data_type: Optional[str] = "Branded"

class FoodSearchResponse(BaseModel):
    total_hits: int
    items: List[FoodSearchItem]

class FoodDetailResponse(BaseModel):
    fdc_id: int
    description: str
    ingredients_text: Optional[str] = None
    nutrition: NutritionSummary
    data_type: Optional[str] = "Branded"
    brand_owner: Optional[str] = None

class EmbedResponse(BaseModel):
    success: bool
    document_id: str
    message: str

class ChatResponse(BaseModel):
    answer: str
    sources: List[str] = Field(default_factory=list)
    confidence: float = 0.95
    usda_nutrition: Optional[Dict[str, Any]] = None

class FoodCompareItem(BaseModel):
    name: str
    main_ingredients: str
    calories: float = 0.0
    protein: float = 0.0
    fat: float = 0.0
    carbs: float = 0.0
    sugar: float = 0.0
    sodium: float = 0.0
    source_of_production: str = ""

class FoodCompareResponse(BaseModel):
    food_a: FoodCompareItem
    food_b: FoodCompareItem
    winner: str
    winner_name: str
    verdict: str
    comparison_summary: str
