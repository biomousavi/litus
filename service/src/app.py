from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .todo import router as todo


# TODO: add origins for production deployment
origins = ["*"]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(todo.router)