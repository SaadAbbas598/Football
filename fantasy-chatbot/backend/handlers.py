# backend/handlers.py

def handle_compare_players(message: str) -> dict:
    # Mock comparison between two players
    return {
        "players": ["Bijan Robinson", "Austin Ekeler"],
        "analysis": "Bijan has a better matchup and higher projection this week.",
    }


def handle_get_projection(message: str) -> dict:
    # Mock projection response
    return {
        "player": "Christian McCaffrey",
        "projection": {
            "points": 22.4,
            "matchup": "vs. SEA",
            "ranking": 1
        }
    }


def handle_get_draft_recommendation(message: str) -> dict:
    # Mock draft recommendations
    return {
        "draft_rankings": [
            {"name": "Ja'Marr Chase", "position": "WR"},
            {"name": "Nick Chubb", "position": "RB"},
            {"name": "CeeDee Lamb", "position": "WR"},
        ]
    }


def handle_get_vegas_odds(message: str) -> dict:
    # Mock Vegas odds
    return {
        "games": [
            {"teams": "Chiefs vs Bills", "odds": "Chiefs -3.5"},
            {"teams": "Cowboys vs Eagles", "odds": "Eagles -1.5"},
        ]
    }


def handle_get_injury_status(message: str) -> dict:
    # Mock injury report
    return {
        "injuries": [
            {"player": "Tyreek Hill", "status": "Questionable", "reason": "Hamstring"},
            {"player": "Mark Andrews", "status": "Out", "reason": "Ankle"},
        ]
    }


def handle_fallback_response(message: str) -> dict:
    # Fallback for unknown/out-of-scope queries
    return {
        "message": "I'm built for Fantasy Football advice only. Try asking about players, trades, or matchups."
    }
