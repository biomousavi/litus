from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


# TODO: add origins for deployment
origins = ["*"]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app = FastAPI()

