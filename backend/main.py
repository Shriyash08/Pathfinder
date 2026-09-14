from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import json

app = FastAPI(title="PathFinder API", description="API serving career paths and tech roadmaps")

# CORS config to allow the Next.js frontend to talk to this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def load_data():
    try:
        with open("roles_db.json", "r", encoding="utf-8") as f:
            return json.load(f)
    except FileNotFoundError:
        return []

roles_db = load_data()

def demand_score(role: dict) -> int:
    trend = role.get("market_status", {}).get("trend", "").lower()
    why = role.get("market_status", {}).get("why", "").lower()
    name = role.get("role_name", "").lower()
    signal_text = f"{trend} {why} {name}"

    score = 72
    if "booming" in signal_text:
        score += 11
    if "emerging" in signal_text:
        score += 7
    if "specialist" in signal_text or "niche" in signal_text:
        score += 3
    if "hiring heavily" in signal_text or "fastest-growing" in signal_text:
        score += 6
    if "strategic" in signal_text or "critical" in signal_text:
        score += 4

    boosts = [
        ("ai", 5), ("machine learning", 5), ("data", 4), ("cloud", 4),
        ("security", 5), ("devops", 3), ("platform", 3), ("robotics", 2),
        ("semiconductor", 3), ("game", -2), ("support", -3)
    ]
    for key, delta in boosts:
        if key in signal_text:
            score += delta

    return max(68, min(96, score))

@app.get("/api/roles")
def get_all_roles():
    """Return basic info for all roles to populate the grid/list"""
    # Just return name, vibe, and score to keep it light
    summaries = []
    for role in roles_db:
        if role.get("role_vibe") and len(role.get("technical_workflow", [])) > 0:
            summaries.append({
                "role_name": role["role_name"],
                "role_vibe": role["role_vibe"],
                "market_confidence_score": demand_score(role)
            })
    return summaries

@app.get("/api/roles/{role_name}")
def get_role_details(role_name: str):
    """Return full details for a specific role"""
    for role in roles_db:
        if role["role_name"].lower() == role_name.lower():
            role["market_confidence_score"] = demand_score(role)
            return role
    raise HTTPException(status_code=404, detail="Role not found")
