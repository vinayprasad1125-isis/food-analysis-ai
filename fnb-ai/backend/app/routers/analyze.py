from fastapi import APIRouter, HTTPException, status
from ..schemas.requests import AnalyzeRequest
from ..schemas.responses import AnalyzeResponse
from ..rag.pipeline import rag_pipeline

router = APIRouter(tags=["Analysis"])

@router.post(
    "/analyze",
    response_model=AnalyzeResponse,
    status_code=status.HTTP_200_OK,
    summary="Analyze meal ingredients for nutrition, health score, and AI recommendations",
    description="Runs the full RAG pipeline: USDA lookup, embedding generation, ChromaDB context retrieval, and OpenAI clinical synthesis."
)
async def analyze_meal(request: AnalyzeRequest) -> AnalyzeResponse:
    if not request.ingredients:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="At least one ingredient must be provided for analysis."
        )
    try:
        response = await rag_pipeline.run_analysis_pipeline(request.ingredients)
        return response
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred during meal analysis: {str(e)}"
        )
