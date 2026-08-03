import time
from typing import Any, Dict, Optional

class SimpleTTLCache:
    """
    In-memory TTL cache for USDA FoodData Central lookups and OpenAI embeddings.
    Prevents duplicate network requests and speeds up repeated meal analyses.
    """
    def __init__(self, default_ttl_seconds: int = 3600):
        self._cache: Dict[str, Dict[str, Any]] = {}
        self.default_ttl = default_ttl_seconds

    def get(self, key: str) -> Optional[Any]:
        if key not in self._cache:
            return None
        item = self._cache[key]
        if time.time() > item["expires_at"]:
            del self._cache[key]
            return None
        return item["value"]

    def set(self, key: str, value: Any, ttl_seconds: Optional[int] = None) -> None:
        ttl = ttl_seconds if ttl_seconds is not None else self.default_ttl
        self._cache[key] = {
            "value": value,
            "expires_at": time.time() + ttl
        }

    def clear(self) -> None:
        self._cache.clear()

# Global shared caches for USDA lookups and embeddings
usda_cache = SimpleTTLCache(default_ttl_seconds=7200)
embedding_cache = SimpleTTLCache(default_ttl_seconds=86400)
