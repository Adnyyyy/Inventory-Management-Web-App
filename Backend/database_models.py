from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, Float, ForeignKey, Boolean, DateTime
from sqlalchemy.orm import Relationship, relationship
from sqlalchemy.sql import func

Base = declarative_base()

class Product(Base):

    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    description = Column(String)
    price = Column(Float)
    quantity = Column(Integer)
    category = Column(String)
    owner_id = Column(Integer, ForeignKey("users.id"))
    date_added = Column(DateTime(timezone=True), server_default=func.now())

    owner = relationship("User", back_populates="products")

class User(Base):

    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    is_admin = (Column(Boolean, default=False))

    products = relationship("Product", back_populates="owner")



