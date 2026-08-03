# F&B AI — Production Clinical Backend Engine

An AI-powered Food & Beverage Health Analysis backend built with **FastAPI (Python 3.12+)**, **ChromaDB**, **OpenAI GPT-4o (`text-embedding-3-small` & structured JSON mode)**, and **USDA FoodData Central API**.

---

## 🏗️ Architecture & RAG Pipeline

```
Frontend (Next.js App Router)
         ↓
FastAPI Async Routers (/analyze, /food/search, /food/{id}, /embed, /chat)
         ↓
USDA FoodData Central API (Normalized & Cached)
         ↓
OpenAI text-embedding-3-small (Vector Generation)
         ↓
ChromaDB Vector Store (nutrition_collection)
         ↓
OpenAI GPT-4o / Clinical Synthesis Engine
         ↓
Structured JSON Response (0–100 Health Score, Warnings, Benefits, Alternatives)
```

---

## 🚀 Quick Start & Installation

### 1. Prerequisites
- **Python 3.12+** installed on your system.
- An API key from [OpenAI](https://platform.openai.com) (optional; intelligent fallback works without it).
- A free API key from [USDA FoodData Central](https://fdc.nal.usda.gov/api-key-signup.html) (optional; fallback clinical registry works without it).

### 2. Setup Virtual Environment
```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 3. Environment Variables
Copy `.env.example` to `.env` in `backend/.env`:
```bash
cp .env.example .env
```

Example `.env`:
```env
OPENAI_API_KEY=your-openai-api-key-here
OPENAI_MODEL=gpt-4o
OPENAI_EMBEDDING_MODEL=text-embedding-3-small
USDA_API_KEY=DEMO_KEY
USDA_API_BASE_URL=https://api.nal.usda.gov/fdc/v1
CHROMADB_PERSIST_DIRECTORY=./chroma_db_storage
CHROMADB_COLLECTION_NAME=nutrition_collection
CORS_ORIGINS=http://localhost:3000,http://127.0.0.1:3000,*
```

### 4. Run the Backend
Run from the `backend/` directory:
```bash
uvicorn app.main:app --reload --port 8000
```
- **Interactive OpenAPI Docs**: [http://localhost:8000/docs](http://localhost:8000/docs)
- **ReDoc Documentation**: [http://localhost:8000/redoc](http://localhost:8000/redoc)
- **Health Check**: [http://localhost:8000/health](http://localhost:8000/health)

---

## 📡 API Endpoints & Documentation

### 1. `POST /analyze`
Analyzes a meal or drink based on ingredients and quantities.
- **Request Body**:
  ```json
  {
    "ingredients": [
      { "name": "Sugar", "quantity": "20 g" },
      { "name": "Milk", "quantity": "200 ml" }
    ]
  }
  ```
- **Response**:
  ```json
  {
    "health_score": 87,
    "nutrition": {
      "calories": 220.0,
      "protein": 9.0,
      "fat": 5.0,
      "carbs": 35.0,
      "fiber": 3.0,
      "sugar": 20.0,
      "sodium": 180.0
    },
    "ingredient_analysis": [
      {
        "name": "Sugar",
        "safety_status": "Harmful",
        "risk_level": "High",
        "notes": "Harmful synthetic additive or excessive free sugar.",
        "category": "Synthetic Additive"
      }
    ],
    "warnings": ["High free sugar content (20.0g detected)."],
    "benefits": ["Rich in bioavailable protein (9.0g)."],
    "recommendations": ["Monitor daily cumulative free sugar intake."],
    "ai_summary": "AI clinical semantic audit complete...",
    "good_ingredients": ["Milk"],
    "bad_ingredients": ["Sugar"],
    "potential_risks": ["Rapid glycemic spike and insulin secretion risk."],
    "recommended_alternatives": ["Substitute refined sugars with organic stevia leaf extract."],
    "confidence_score": 95
  }
  ```

### 2. `GET /food/search?q={query}&limit=10`
Search the USDA FoodData Central registry (with caching & clinical fallback).
- **Example**: `GET /food/search?q=avocado&limit=5`

### 3. `GET /food/{id}`
Retrieve normalized macronutrient breakdown and ingredients for an FDC ID.
- **Example**: `GET /food/167705`

### 4. `POST /embed`
Ingest custom food nutrition facts and embeddings (`text-embedding-3-small`) into ChromaDB.
- **Request Body**:
  ```json
  {
    "food_name": "Avocado Power Bowl",
    "ingredients": ["Avocado", "Chicken Breast", "Olive Oil"],
    "nutrition": { "calories": 460, "protein": 38, "fat": 22, "carbs": 18, "sugar": 3 },
    "health_notes": "Rich in monounsaturated lipids.",
    "benefits": ["High protein", "Antioxidant bioavailability"],
    "warnings": []
  }
  ```

### 5. `POST /chat`
RAG-powered nutrition chatbot endpoint querying top-K ChromaDB clinical documents.
- **Request Body**:
  ```json
  {
    "message": "Is organic stevia safer than aspartame?",
    "history": []
  }
  ```
- **Response**:
  ```json
  {
    "answer": "Stevia leaf extract (steviol glycosides) is a non-nutritive sweetener...",
    "sources": ["fact_stevia_001", "fact_sugar_001"],
    "confidence": 0.95
  }
  ```

---

## 🛡️ Health Score Algorithm (0–100)
Calculated in `app/services/health_scorer.py`:
- **Starting Score**: `85` (baseline whole foods)
- **Penalties**:
  - Excess Free Sugar (>15g): Up to `-25` points
  - Added Industrial Sugar (>8g): `-10` points
  - High Sodium (>500mg): `-12` points
  - Trans Fatty Acids (>0.1g): `-20` points
  - Synthetic Additives (Aspartame, Sucralose, HFCS, Sodium Benzoate, etc.): `-12` points per additive
  - Artificial Colorings (Red 40, Yellow 5, Yellow 6, etc.): `-10` points per dye
  - Preservatives & Ultra-processed compounds: `-3` to `-5` points
- **Bonuses**:
  - Dietary Fiber (≥5g): `+8` points
  - Bioavailable Protein (≥15g): `+7` points
  - 100% Clean Whole Foods (0 industrial additives): `+5` points

---

## 🔌 Frontend Integration
- All Next.js API requests to `/api/*` are automatically proxied via `next.config.js` rewrites to `http://127.0.0.1:8000/*`.
- Existing layouts, animations, colors, components, and styling are 100% preserved.
- Graceful local fallbacks ensure the frontend remains interactive even during network offline testing.
