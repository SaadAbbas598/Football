from fastapi import APIRouter, Request
from backend.intent_matcher import IntentMatcher
from .handlers import (
    handle_compare_players,
    handle_get_projection,
    handle_get_draft_recommendation,
    handle_get_vegas_odds,
    handle_get_injury_status,
    handle_fallback_response
)

matcher = IntentMatcher(
    index_path="data/faiss_index.index",
    mapping_path="data/intent_index.json"
)

router = APIRouter()

@router.post("/chat")
async def detect_intent(request: Request):
    body = await request.json()
    message = body.get("message")

    if not message:
        return {"error": "Missing message in request body."}

    result = matcher.predict_intent(message)
    intent = result["intent"]

    if intent == "compare_players":
        data = handle_compare_players(message)
        answer = f"Based on projections, {data['players'][0]} is expected to score more than {data['players'][1]}. Consider starting them!"

    elif intent == "get_projection":
        data = handle_get_projection(message)
        points = data['projection'].get('points', 'N/A')
        answer = f"{data['player']} is projected to score {points} points."

    elif intent == "get_draft_recommendation":
        data = handle_get_draft_recommendation(message)
        top_players = data.get("draft_rankings", [])[:3]
        names = ", ".join([p.get("name", "Unknown") for p in top_players])
        answer = f"Top draft recommendations: {names}"

    elif intent == "get_vegas_odds":
        data = handle_get_vegas_odds(message)
        answer = "Here are the current Vegas odds. (See full details in the app.)"

    elif intent == "get_injury_status":
        data = handle_get_injury_status(message)
        answer = "Here are this week's key injuries. (Scroll for full list.)"

    else:
        data = handle_fallback_response(message)
        answer = data["message"]
        # Logging intent info
    print(f"Intent: {intent}, Confidence: {result['confidence']:.2f}, Answer: {answer}")
    return {
        "intent": intent,
        "confidence": float(result["confidence"]),  # ✅ Convert to native float
        "answer": answer,
        "raw": data
    }
