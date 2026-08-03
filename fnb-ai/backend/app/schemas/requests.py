from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field

class IngredientInput(BaseModel):
    name: str = Field(..., description="Name of the food ingredient or item", example="Sugar")
    quantity: str = Field("100 g", description="Natural language quantity or serving size", example="20 g")

class AnalyzeRequest(BaseModel):
    ingredients: List[IngredientInput] = Field(..., description="List of meal ingredients with quantities")

class EmbedRequest(BaseModel):
    food_name: str = Field(..., example="Avocado Power Bowl")
    ingredients: List[str] = Field(..., example=["Avocado", "Chicken Breast", "Olive Oil"])
    nutrition: Dict[str, float] = Field(
        default_factory=lambda: {"calories": 460.0, "protein": 38.0, "fat": 22.0, "carbs": 18.0, "sugar": 3.0}
    )
    health_notes: Optional[str] = ""
    benefits: Optional[List[str]] = Field(default_factory=list)
    warnings: Optional[List[str]] = Field(default_factory=list)

class ChatMessage(BaseModel):
    role: str = Field("user", example="user")
    content: str = Field(..., example="Is organic stevia safer than aspartame?")

class ChatRequest(BaseModel):
    message: str = Field(..., description="User question about food, ingredients, or nutrition")
    history: Optional[List[ChatMessage]] = Field(default_factory=list)

class FoodCompareRequest(BaseModel):
    food_a: str = Field(..., description="First food item to compare", example="Whole Milk")
    food_b: str = Field(..., description="Second food item to compare", example="Oat Milk")
