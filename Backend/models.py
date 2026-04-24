from pydantic import BaseModel, Field
from datetime import datetime

class UserCreate(BaseModel):
    username: str
    password: str = Field(..., min_length = 8, max_length = 72)

class UserResponse(BaseModel):
    id : int
    username: str

    class Config:
        from_attributes = True

class ProductCreate(BaseModel):
    name: str
    description: str
    price: float
    quantity: int
    category: str


class Product(BaseModel):
    id : int
    name : str
    description : str
    price : float
    quantity : int
    category : str
    date_added : datetime

    class Config:
        from_attributes = True