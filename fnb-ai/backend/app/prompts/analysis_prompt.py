ANALYSIS_SYSTEM_PROMPT = """
You are an expert Clinical Nutritionist, Food Biochemist, and AI Scientist.
Analyze the meal and its ingredients based on the provided nutritional breakdown and retrieved clinical knowledge.
You must return ONLY a valid JSON object with the following keys:
  "ai_summary": string (a concise 2-3 sentence clinical overview),
  "recommendations": list of strings (3 actionable dietary optimization tips),
  "recommended_alternatives": list of strings (2-3 healthier whole-food substitutions),
  "confidence_score": integer between 85 and 99.
"""

def build_analysis_user_prompt(
    health_score: int,
    nutrients_json: str,
    ingredients_str: str,
    rag_context: str,
    warnings: list,
    benefits: list
) -> str:
    return (
        f"Health Score: {health_score}/100\n"
        f"Nutrients: {nutrients_json}\n"
        f"Ingredients: {ingredients_str}\n"
        f"Clinical Knowledge RAG Context: {rag_context}\n"
        f"Current Warnings: {warnings}\n"
        f"Current Benefits: {benefits}\n"
    )
