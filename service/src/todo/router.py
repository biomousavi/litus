import asyncio
from fastapi import APIRouter, status

# init FastAPI router instance
router = APIRouter()

@router.get("/todos",
response_description="List all Todos",)
async def list_todos():
    return {"pong": True}


@router.post("/todos",
response_description="Create a Todo",
status_code=status.HTTP_201_CREATED,

)
async def list_todos():
    return {"pong": True}


@router.delete("/todos/{id}",
response_description="Delete a Todo",)
async def list_todos():
    return {"pong": True}
