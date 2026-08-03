import hashlib
import math
from typing import List
from openai import AsyncOpenAI
from ..config import settings
from ..utils.cache import embedding_cache

class EmbeddingService:
    def __init__(self):
        self.model = settings.OPENAI_EMBEDDING_MODEL
        self.client = None
        if settings.OPENAI_API_KEY and not settings.OPENAI_API_KEY.startswith("your-"):
            try:
                self.client = AsyncOpenAI(api_key=settings.OPENAI_API_KEY)
            except Exception:
                self.client = None

    def _generate_deterministic_embedding(self, text: str, dimensions: int = 1536) -> List[float]:
        """
        Generates a stable, reproducible 1536-dimensional float vector for offline testing
        when an OpenAI API key is not provided.
        """
        h = hashlib.sha256(text.encode("utf-8")).digest()
        embedding = []
        for i in range(dimensions):
            byte_val = h[i % len(h)]
            # Generate pseudo-random float between -1.0 and 1.0
            val = math.sin((i + 1) * byte_val)
            embedding.append(round(val, 6))
        # L2-normalize
        norm = math.sqrt(sum(x * x for x in embedding)) or 1.0
        return [round(x / norm, 6) for x in embedding]

    async def embed_text(self, text: str) -> List[float]:
        if not text:
            return [0.0] * 1536

        cache_key = f"embed:{self.model}:{hashlib.md5(text.encode('utf-8')).hexdigest()}"
        cached = embedding_cache.get(cache_key)
        if cached:
            return cached

        if self.client:
            try:
                response = await self.client.embeddings.create(
                    model=self.model,
                    input=text
                )
                vec = response.data[0].embedding
                embedding_cache.set(cache_key, vec)
                return vec
            except Exception as e:
                # Fallback to deterministic vector if API call errors
                pass

        vec = self._generate_deterministic_embedding(text)
        embedding_cache.set(cache_key, vec)
        return vec

    async def embed_batch(self, texts: List[str]) -> List[List[float]]:
        if not texts:
            return []
        results = []
        for text in texts:
            results.append(await self.embed_text(text))
        return results

embedder = EmbeddingService()
