import os
import chromadb
from typing import List, Dict, Any, Optional
from ..config import settings

class ChromaVectorStore:
    def __init__(self):
        self.collection_name = settings.CHROMADB_COLLECTION_NAME
        try:
            os.makedirs(settings.CHROMADB_PERSIST_DIRECTORY, exist_ok=True)
            self.client = chromadb.PersistentClient(path=settings.CHROMADB_PERSIST_DIRECTORY)
        except Exception:
            # Fall back to ephemeral in-memory client if disk persistence is restricted
            self.client = chromadb.Client()

        self.collection = self.client.get_or_create_collection(
            name=self.collection_name,
            metadata={"hnsw:space": "cosine"}
        )

    def add_document(
        self,
        doc_id: str,
        text: str,
        embedding: List[float],
        metadata: Optional[Dict[str, Any]] = None
    ) -> bool:
        try:
            # Ensure all metadata values are strings, ints, floats, or bools for ChromaDB
            clean_metadata = {}
            if metadata:
                for k, v in metadata.items():
                    if isinstance(v, (str, int, float, bool)):
                        clean_metadata[k] = v
                    else:
                        clean_metadata[k] = str(v)

            self.collection.upsert(
                ids=[doc_id],
                documents=[text],
                embeddings=[embedding],
                metadatas=[clean_metadata] if clean_metadata else None
            )
            return True
        except Exception as e:
            return False

    def query_similar(self, embedding: List[float], top_k: int = 3) -> List[Dict[str, Any]]:
        try:
            results = self.collection.query(
                query_embeddings=[embedding],
                n_results=min(top_k, max(1, self.collection.count()))
            )
            docs = []
            if results and "documents" in results and results["documents"]:
                for idx, doc_text in enumerate(results["documents"][0]):
                    doc_id = results["ids"][0][idx] if "ids" in results and results["ids"] else str(idx)
                    metadata = results["metadatas"][0][idx] if "metadatas" in results and results["metadatas"] else {}
                    distance = results["distances"][0][idx] if "distances" in results and results["distances"] else 0.0
                    docs.append({
                        "id": doc_id,
                        "text": doc_text,
                        "metadata": metadata,
                        "distance": distance
                    })
            return docs
        except Exception:
            return []

    def count(self) -> int:
        try:
            return self.collection.count()
        except Exception:
            return 0

vector_store = ChromaVectorStore()
