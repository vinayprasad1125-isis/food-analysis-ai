from fastapi import APIRouter, HTTPException, status
from ..schemas.requests import ChatRequest
from ..schemas.responses import ChatResponse
from ..rag.pipeline import rag_pipeline

router = APIRouter(tags=["AI Nutrition Chatbot"])

@router.post(
    "/chat",
    response_model=ChatResponse,
    status_code=status.HTTP_200_OK,
    summary="Ask AI nutrition questions powered by ChromaDB RAG and GPT-4o",
    description="Retrieves top-K similar clinical documents from ChromaDB and passes them to OpenAI GPT-4o."
)
async def chat_with_rag(request: ChatRequest) -> ChatResponse:
    if not request.message or not request.message.strip():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Chat message cannot be empty."
        )
    try:
        history_dicts = [h.model_dump() for h in request.history] if request.history else []
        res_dict = await rag_pipeline.run_chat_rag(
            user_query=request.message.strip(),
            history=history_dicts
        )
        return ChatResponse(
            answer=res_dict.get("answer", ""),
            sources=res_dict.get("sources", []),
            confidence=float(res_dict.get("confidence", 0.95)),
            usda_nutrition=res_dict.get("usda_nutrition")
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred in the chatbot RAG service: {str(e)}"
        )
