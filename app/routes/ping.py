# app/routes/ping.py

from fastapi import APIRouter

router = APIRouter(prefix="/api", tags=["System"])

@router.get("/ping")
async def ping():
    """
    Simple health check endpoint for frontend connectivity.
    """
    return {"status": "ok", "message": "ZenAI backend is alive and reachable"}
