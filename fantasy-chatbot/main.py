# main.py

from fastapi import FastAPI
from backend.intent_router import router as intent_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Enable CORS for React (adjust for your frontend URL)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register the intent router
app.include_router(intent_router)
