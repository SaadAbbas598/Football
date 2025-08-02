from sentence_transformers import SentenceTransformer
import faiss
import json
import numpy as np

class IntentMatcher:
    def __init__(self, index_path, mapping_path, model_name="all-mpnet-base-v2"):
        self.model = SentenceTransformer(model_name)
        self.index = faiss.read_index(index_path)
        with open(mapping_path, "r") as f:
            self.intent_data = json.load(f)

    def predict_intent(self, user_input, threshold=0.5):
        # Normalize the input embedding
        embedding = self.model.encode([user_input], normalize_embeddings=True)[0]
        D, I = self.index.search(np.array([embedding]), k=1)
        score = D[0][0]  # Already cosine similarity because of normalization + IP index

        match = self.intent_data[I[0][0]]
        print(f"Matched intent: {match['intent']}, Score: {score:.4f}")

        if score >= threshold:
            return {
                "intent": match["intent"],
                "query": match["query"],
                "confidence": float(score)
            }
        else:
            return {
                "intent": "fallback",
                "confidence": float(score)
            }
