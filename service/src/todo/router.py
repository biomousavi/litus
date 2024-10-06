import asyncio
from fastapi import APIRouter


router = APIRouter()

@router.get("/todos",
response_description="List all Todos",)
async def list_todos():
    return {"pong": True}
