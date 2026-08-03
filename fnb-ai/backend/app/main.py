from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .config import settings
from .routers import analyze, food, embed, chat
from .vectorstore.chroma_db import vector_store
from .embeddings.embedder import embedder

# Seed initial clinical knowledge into ChromaDB on application startup
INITIAL_NUTRITION_KNOWLEDGE = [
    {
        "id": "fact_sugar_001",
        "text": "Excessive free sugars (> 25g/day) induce rapid blood glucose spikes, insulin resistance, and hepatic lipid accumulation.",
        "meta": {"topic": "sugar", "type": "clinical_fact"}
    },
    {
        "id": "fact_stevia_001",
        "text": "Stevia leaf extract (steviol glycosides) is a non-nutritive sweetener with zero glycemic index, suitable for metabolic health.",
        "meta": {"topic": "sweetener", "type": "clinical_fact"}
    },
    {
        "id": "fact_avocado_001",
        "text": "Avocado provides high concentrations of monounsaturated oleic acid, increasing bioavailability of fat-soluble vitamins (A, D, E, K) by 40%.",
        "meta": {"topic": "fat", "type": "clinical_fact"}
    },
    {
        "id": "fact_transfat_001",
        "text": "Industrial trans fatty acids from partially hydrogenated oils raise LDL-C and lower HDL-C, significantly increasing cardiovascular inflammation.",
        "meta": {"topic": "fat", "type": "clinical_fact"}
    },
    {
        "id": "fact_sodium_001",
        "text": "High sodium intake (> 2300mg/day) promotes endothelial dysfunction and extracellular fluid retention, elevating arterial blood pressure.",
        "meta": {"topic": "sodium", "type": "clinical_fact"}
    },
    {
        "id": "fact_emulsifier_001",
        "text": "Synthetic food emulsifiers (polysorbate-80, carboxymethylcellulose) can disrupt mucosal barrier integrity and alter gut microbiota.",
        "meta": {"topic": "additive", "type": "clinical_fact"}
    }
]

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Seed ChromaDB if collection is empty
    if vector_store.count() == 0:
        for item in INITIAL_NUTRITION_KNOWLEDGE:
            vec = await embedder.embed_text(item["text"])
            vector_store.add_document(
                doc_id=item["id"],
                text=item["text"],
                embedding=vec,
                metadata=item["meta"]
            )
    yield

app = FastAPI(
    title="F&B AI — Clinical Food & Beverage Health Analysis API",
    description="Production-ready FastAPI backend with USDA FoodData Central integration, ChromaDB RAG, and OpenAI GPT-4o analysis.",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(analyze.router)
app.include_router(food.router)
app.include_router(embed.router)
app.include_router(chat.router)

@app.get("/", tags=["System"])
async def root():
    return {
        "service": "F&B AI Clinical Backend Engine",
        "status": "online",
        "version": "1.0.0",
        "documentation": "/docs"
    }

@app.get("/health", tags=["System"])
async def health_check():
    return {
        "status": "healthy",
        "chromadb_documents": vector_store.count(),
        "model": settings.OPENAI_MODEL,
        "embedding_model": settings.OPENAI_EMBEDDING_MODEL
    }
