import asyncio
import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import cognee

load_dotenv()

app = FastAPI(title="RecallMind API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Models ──────────────────────────────────────────────
class RememberRequest(BaseModel):
    content: str
    session_id: str = "default"

class RecallRequest(BaseModel):
    query: str
    session_id: str = "default"

class ForgetRequest(BaseModel):
    topic: str
    session_id: str = "default"

class ImproveRequest(BaseModel):
    session_id: str = "default"

# ── Init ────────────────────────────────────────────────
@app.on_event("startup")
async def startup():
    print("🧠 RecallMind starting up...")

# ── Health ──────────────────────────────────────────────
@app.get("/")
async def root():
    return {"status": "🧠 RecallMind is running!", "version": "1.0.0"}

# ── REMEMBER ────────────────────────────────────────────
@app.post("/remember")
async def remember(req: RememberRequest):
    try:
        await cognee.add(req.content, dataset_name=req.session_id)
        await cognee.cognify(datasets=[req.session_id])
        return {
            "status": "remembered",
            "content": req.content,
            "session_id": req.session_id
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ── RECALL ──────────────────────────────────────────────
@app.post("/recall")
async def recall(req: RecallRequest):
    try:
        results = await cognee.search(
            req.query,
            datasets=[req.session_id]
        )
        formatted = []
        for r in results:
            if hasattr(r, 'text'):
                formatted.append(r.text)
            elif isinstance(r, dict):
                formatted.append(r.get('text', str(r)))
            else:
                formatted.append(str(r))
        return {
            "query": req.query,
            "results": formatted,
            "count": len(formatted),
            "session_id": req.session_id
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ── FORGET ──────────────────────────────────────────────
@app.post("/forget")
async def forget(req: ForgetRequest):
    try:
        await cognee.prune.prune_data()
        return {
            "status": "forgotten",
            "topic": req.topic,
            "session_id": req.session_id
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ── IMPROVE ─────────────────────────────────────────────
@app.post("/improve")
async def improve(req: ImproveRequest):
    try:
        await cognee.improve(datasets=[req.session_id])
        return {
            "status": "improved",
            "session_id": req.session_id,
            "message": "Memory connections strengthened!"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ── STATS ───────────────────────────────────────────────
@app.get("/stats")
async def stats():
    return {
        "status": "active",
        "apis": ["remember", "recall", "forget", "improve"],
        "powered_by": "Cognee + Gemini + HuggingFace"
    }