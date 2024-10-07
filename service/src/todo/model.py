from typing import Optional
from pydantic import BaseModel, Field
from typing_extensions import Annotated
from pydantic.functional_validators import BeforeValidator
from datetime import datetime


# Represents an ObjectId field in the database.
# It will be represented as a `str` on the model so that it can be serialized to JSON.
PyObjectId = Annotated[str, BeforeValidator(str)]

class TodoModel(BaseModel):
    """
    Container for a single todo record.
    """

    # The primary key for the TodoModel, stored as a `str` on the instance.
    # This will be aliased to `_id` when sent to MongoDB,
    # but provided as `id` in the API requests and responses.
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    title: str
    creation_time: datetime
    estimated_time: int
