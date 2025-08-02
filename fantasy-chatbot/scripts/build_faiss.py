# scripts/build_faiss.py
from sentence_transformers import SentenceTransformer
import faiss
import numpy as np
import json

# Load model
model = SentenceTransformer("all-mpnet-base-v2")

# Load training data
with open("data/intents.json", "r") as f:
    data = json.load(f)

texts = [d["query"] for d in data]
intents = [d["intent"] for d in data]

# Compute & normalize embeddings
embeddings = model.encode(texts, normalize_embeddings=True)

# Build FAISS index using Inner Product (for cosine similarity)
dimension = embeddings.shape[1]
index = faiss.IndexFlatIP(dimension)
index.add(embeddings)

# Save index and mapping
faiss.write_index(index, "data/faiss_index.index")
with open("data/intent_index.json", "w") as f:
    json.dump([{"intent": i, "query": q} for i, q in zip(intents, texts)], f, indent=2)
