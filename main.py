from fastapi import FastAPI, Depends, HTTPException
from databse import get_db
import models
from models import *
from databse import session, engine
import database_models
from sqlalchemy.orm import Session
from auth import get_current_user, get_password_hash, create_access_token, verify_password, oauth2_scheme
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

database_models.Base.metadata.create_all(bind=engine)

@app.get("/")
def greet():
    return "Hey there, this is my new project created using FastAPI!"

@app.get("/products")
async def get_products(current_user: database_models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    products = db.query(database_models.Product).filter(database_models.Product.owner_id == current_user.id).all()
    return products

@app.get("/product/{id}")
def get_product(id: int, db: Session = Depends(get_db)):
    db_product = db.query(database_models.Product).filter(database_models.Product.id == id).first()
    if db_product:
        return db_product
    else:
        raise HTTPException(status_code=404, detail="Product not found")


@app.post("/product")
def create_product(product: models.ProductCreate, db: Session = Depends(get_db), current_user: database_models.User = Depends(get_current_user) ):
    new_product_data = product.model_dump()
    new_product_data["owner_id"] = current_user.id

    db_product = database_models.Product(**new_product_data)
    db.add(db_product)
    db.commit()
    db.refresh(db_product)

    return db_product

@app.put("/product")
def update_product(id: int, product_update: ProductCreate, db: Session = Depends(get_db), current_user: database_models.User = Depends(get_current_user)):
    db_product = db.query(database_models.Product).filter(database_models.Product.id == id, database_models.Product.owner_id == current_user.id).first()

    if not db_product:
        raise HTTPException(status_code=404, detail="Product not found")

    db_product.name = product_update.name
    db_product.description = product_update.description
    db_product.price = product_update.price
    db_product.quantity = product_update.quantity
    db_product.category = product_update.category

    db.commit()
    db.refresh(db_product)
    return db_product


@app.delete("/product")
def delete_product(id: int, db: Session = Depends(get_db),
                   current_user: database_models.User = Depends(get_current_user)):
    db_product = db.query(database_models.Product).filter(database_models.Product.id == id).first()

    if not db_product:
        raise HTTPException(status_code=404, detail="Product not found")

    if db_product.owner_id != current_user.id and not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Not authorized to delete this product")

    db.delete(db_product)
    db.commit()
    return {"detail": "Product deleted successfully"}

@app.post("/register")
def register_user(user: models.UserCreate,db: Session = Depends(get_db), ):
    pass_hashed = get_password_hash(user.password)
    new_user = database_models.User(username = user.username, hashed_password= pass_hashed)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return f"User created successfully with username: {new_user.username}"

@app.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(database_models.User).filter(database_models.User.username == form_data.username).first()
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Incorrect username or password")

    token = create_access_token(data={"sub": user.username})
    return {"access_token": token, "token_type": "bearer"}

@app.get("/me")
def read_users_me(token: str = Depends(oauth2_scheme)):
    return {"token" : token}

