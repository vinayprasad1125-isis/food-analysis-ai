import hashlib
from typing import List, Dict, Any
from ..schemas.requests import IngredientInput
from ..schemas.responses import AnalyzeResponse, NutritionSummary
from ..services.usda_service import usda_service
from ..services.health_scorer import health_scorer
from ..services.openai_service import openai_service
from ..embeddings.embedder import embedder
from ..vectorstore.chroma_db import vector_store

class RAGPipeline:
    async def run_analysis_pipeline(self, ingredients: List[IngredientInput]) -> AnalyzeResponse:
        """
        Executes the complete RAG pipeline:
        1. Search USDA API & scale nutrition for each ingredient by quantity.
        2. Calculate total meal nutrition.
        3. Evaluate health score, ingredient safety, warnings, and benefits.
        4. Convert meal profile into embedding and store in ChromaDB vector store.
        5. Retrieve top-K relevant clinical knowledge from ChromaDB.
        6. Pass retrieved context + nutrition to GPT for synthesis.
        """
        total_nutrients = {
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

        ing_names = [ing.name.strip() for ing in ingredients]

        # Step 1 & 2: USDA Nutrition Lookup & Aggregation
        for item in ingredients:
            nut = await usda_service.lookup_ingredient_nutrition(item.name, item.quantity)
            for key, val in nut.items():
                if key in total_nutrients and val is not None:
                    total_nutrients[key] = round(total_nutrients[key] + float(val), 2)

        nutrition_summary = NutritionSummary(**total_nutrients)

        # Step 3: Algorithmic Health Scoring & Additive Audit
        (
            health_score,
            item_analyses,
            warnings,
            benefits,
            good_ingredients,
            bad_ingredients,
            potential_risks,
        ) = health_scorer.evaluate(nutrition_summary, ing_names)

        # Step 4: Embed & Store meal document in ChromaDB
        meal_doc_text = (
            f"Meal Ingredients: {', '.join(ing_names)}. "
            f"Nutrition per serving: {nutrition_summary.calories} kcal, "
            f"{nutrition_summary.protein}g protein, {nutrition_summary.sugar}g sugar, "
            f"{nutrition_summary.sodium}mg sodium."
        )
        doc_id = f"meal_{hashlib.md5(meal_doc_text.encode('utf-8')).hexdigest()}"
        meal_embedding = await embedder.embed_text(meal_doc_text)
        vector_store.add_document(
            doc_id=doc_id,
            text=meal_doc_text,
            embedding=meal_embedding,
            metadata={
                "type": "analyzed_meal",
                "health_score": str(health_score),
                "calories": str(nutrition_summary.calories),
            },
        )

        # Step 5: Retrieve top-K relevant clinical knowledge from ChromaDB
        similar_docs = vector_store.query_similar(meal_embedding, top_k=3)
        rag_context_lines = []
        for d in similar_docs:
            rag_context_lines.append(f"- {d['text']}")
        rag_context = "\n".join(rag_context_lines) if rag_context_lines else "Standard clinical dietary guidelines."

        # Step 6: Generate AI Synthesis via GPT (or clinical fallback)
        ai_result = await openai_service.generate_analysis(
            health_score=health_score,
            nutrition=nutrition_summary,
            ingredients=ing_names,
            rag_context=rag_context,
            warnings=warnings,
            benefits=benefits,
            good_ingredients=good_ingredients,
            bad_ingredients=bad_ingredients,
            potential_risks=potential_risks,
        )

        # Assemble complete structured response
        return AnalyzeResponse(
            health_score=health_score,
            nutrition=nutrition_summary,
            ingredient_analysis=item_analyses,
            warnings=warnings,
            benefits=benefits,
            recommendations=ai_result.get("recommendations", []),
            ai_summary=ai_result.get("ai_summary", ""),
            good_ingredients=good_ingredients,
            bad_ingredients=bad_ingredients,
            potential_risks=potential_risks,
            recommended_alternatives=ai_result.get("recommended_alternatives", []),
            confidence_score=ai_result.get("confidence_score", 95),
        )

    async def run_chat_rag(self, user_query: str, history: List[Dict[str, str]] = None) -> Dict[str, Any]:
        """
        Executes RAG retrieval and USDA FoodData Central lookup for chatbot queries.
        """
        query_embedding = await embedder.embed_text(user_query)
        similar_docs = vector_store.query_similar(query_embedding, top_k=3)

        sources = []
        context_lines = []
        for d in similar_docs:
            context_lines.append(f"- {d['text']}")
            if d.get("id"):
                sources.append(d["id"])

        # Extract food name from query
        clean_query = user_query.strip().lower()
        for prefix in ["is ", "are ", "what is ", "what are ", "how healthy is ", "how good is ", "tell me about ", "is it good ", "are they good "]:
            if clean_query.startswith(prefix):
                clean_query = clean_query[len(prefix):]
        for suffix in [" good", " bad", " healthy", " good for you", " bad for you", " safe", " ok", "?", "."]:
            if clean_query.endswith(suffix):
                clean_query = clean_query[:-len(suffix)]
        clean_query = clean_query.strip()
        if not clean_query:
            clean_query = user_query.strip()

        usda_nutrition = None
        try:
            search_res = await usda_service.search_foods(clean_query, limit=3)
            if not search_res.items and len(clean_query.split()) > 1:
                search_res = await usda_service.search_foods(clean_query.split()[-1], limit=3)
            if search_res.items:
                top_item = search_res.items[0]
                detail = await usda_service.get_food_details(top_item.fdc_id)
                usda_nutrition = {
                    "fdc_id": detail.fdc_id,
                    "description": detail.description,
                    "brand_owner": detail.brand_owner or "USDA FoodData Central",
                    "calories": detail.nutrition.calories,
                    "protein": detail.nutrition.protein,
                    "fat": detail.nutrition.fat,
                    "carbs": detail.nutrition.carbs,
                    "fiber": detail.nutrition.fiber,
                    "sugar": detail.nutrition.sugar,
                    "sodium": detail.nutrition.sodium,
                }
        except Exception:
            pass

        rag_context = "\n".join(context_lines) if context_lines else "Standard clinical nutrition literature."
        ai_response = await openai_service.generate_chat_response(
            message=user_query,
            history=history or [],
            rag_context=rag_context,
            usda_nutrition=usda_nutrition,
        )
        ai_response["sources"] = sources
        ai_response["usda_nutrition"] = usda_nutrition
        return ai_response

rag_pipeline = RAGPipeline()
