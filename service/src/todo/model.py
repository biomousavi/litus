from pydantic import BaseModel

class TodoModel(BaseModel):
    """
    Container for a single todo record.
    """

    # The primary key for the StudentModel, stored as a `str` on the instance.
    # This will be aliased to `_id` when sent to MongoDB,
    # but provided as `id` in the API requests and responses.
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    title: str
    creation_time: datetime
    estimated_time: int
