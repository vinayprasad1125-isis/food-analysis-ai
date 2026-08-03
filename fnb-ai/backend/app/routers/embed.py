import hashlib
from fastapi import APIRouter, HTTPException, status
from ..schemas.requests import EmbedRequest
from ..schemas.responses import EmbedResponse
from ..embeddings.embedder import embedder
from ..vectorstore.chroma_db import vector_store

router = APIRouter(tags=["Embeddings & RAG Ingestion"])

@router.post(
    "/embed",
    response_model=EmbedResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Generate text-embedding-3-small embeddings and store in ChromaDB",
    description="Ingests food nutrition, benefits, and warnings into the ChromaDB nutrition_collection."
)
async def create_embedding_and_store(request: EmbedRequest) -> EmbedResponse:
    doc_text = (
        f"Food Name: {request.food_name}. "
        f"Ingredients: {', '.join(request.ingredients)}. "
        f"Nutrition: {request.nutrition}. "
        f"Health notes: {request.health_notes}. "
        f"Benefits: {', '.join(request.benefits or [])}. "
        f"Warnings: {', '.join(request.warnings or [])}."
    )
    doc_id = f"custom_{hashlib.md5(doc_text.encode('utf-8')).hexdigest()}"

    try:
        embedding = await embedder.embed_text(doc_text)
        success = vector_store.add_document(
            doc_id=doc_id,
            text=doc_text,
            embedding=embedding,
            metadata={
                "food_name": request.food_name,
                "type": "custom_embedding"
            }
        )
        if not success:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to store document in ChromaDB vector store."
            )
        return EmbedResponse(
            success=True,
            document_id=doc_id,
            message="Successfully generated text-embedding-3-small vector and stored in ChromaDB."
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Embedding generation error: {str(e)}"
        )
