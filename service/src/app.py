from fastapi import FastAPI

app = FastAPI()


# TODO: implement the needed endpoints, interacting as needed with the database
# NOTE: this file imports FastAPI, but you can use Flask if you prefer
def get_full_name(first_name:str, last_name:str):
  full_name = first_name.title() + " " + last_name.title()
  return full_name
  