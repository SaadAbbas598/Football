# 🏈 Fantasy Football Chatbot API

A smart, FastAPI-powered chatbot that helps users with fantasy football decisions by using real-time data such as player stats, Vegas odds, and matchup analysis.

---

## 🚀 Features

- 🧠 Natural language understanding (LLM-based)
- 📊 Real-time player and matchup data via FantasyNerds and GameOdds APIs
- 🎯 Intent detection for accurate query resolution
- 💬 Chat interface with React frontend (optional)
- ⚡ FastAPI backend with modular and async architecture
- 🗃️ MongoDB or PostgreSQL (optional) for chat history and user data

---

## 🛠️ Tech Stack

- **Backend**: FastAPI, Pydantic  
- **Frontend (optional)**: React + Tailwind  
- **Database**: MongoDB / PostgreSQL  
- **LLM Integration**: OpenAI (ChatGPT) or local models  
- **External APIs**: FantasyNerds, GameOdds  

---

## 📦 Installation Dependencies

Install these dependencies using `pip` or include them in `requirements.txt`:

```txt
# Core backend
fastapi
uvicorn[standard]
pydantic

# HTTP requests
httpx

# LLM API integration
openai

# Environment variable handling
python-dotenv

# Database drivers
motor         # MongoDB async driver
asyncpg       # PostgreSQL async driver

# Optional for semantic search
faiss-cpu
numpy

# Development tools (optional)
black
isort
pytest
