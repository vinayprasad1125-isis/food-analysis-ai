from typing import Optional, List, Dict
from pydantic import BaseModel, Field

class NutrientInfo(BaseModel):
    calories: float = 0.0
    protein: float = 0.0
    fat: float = 0.0
    carbs: float = 0.0
    fiber: float = 0.0
    sugar: float = 0.0
    sodium: float = 0.0
    added_sugar: float = 0.0
    saturated_fat: float = 0.0
    trans_fat: float = 0.0

class Ingredient(BaseModel):
    name: str
    quantity: str = "100 g"
    normalized_grams: float = 100.0
    nutrition: Optional[NutrientInfo] = None

class FoodItem(BaseModel):
    fdc_id: int
    description: str
    data_type: Optional[str] = "Branded"
    brand_owner: Optional[str] = None
    ingredients_text: Optional[str] = None
    nutrients: NutrientInfo = Field(default_factory=NutrientInfo)

class VectorDocument(BaseModel):
    doc_id: str
    text: str
    metadata: Dict[str, str] = Field(default_factory=dict)
