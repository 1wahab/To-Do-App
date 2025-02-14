# backend/routes/user.py
from fastapi import APIRouter, Depends, HTTPException, status, Body
from datetime import datetime, timedelta
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from backend.models import User
from backend.database import get_db

router = APIRouter()

@router.post("/signup", status_code=status.HTTP_201_CREATED)
def signup(
    first_name: str = Body(...),
    last_name: str = Body(...),
    date_of_birth: str = Body(...),  # Expected format: YYYY-MM-DD
    gender: str = Body(...),
    email: str = Body(...),
    password: str = Body(...),
    db: Session = Depends(get_db)
):
    if db.query(User).filter(User.email == email).first():
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="User already exists")
    
    try:
        dob = datetime.strptime(date_of_birth, "%Y-%m-%d").date()
    except Exception:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid date format. Use YYYY-MM-DD")
    
    user = User(
        first_name=first_name,
        last_name=last_name,
        date_of_birth=dob,
        gender=gender,
        email=email,
    )
    user.set_password(password)
    db.add(user)
    db.commit()
    db.refresh(user)
    return {"message": "User created", "user_id": user.id}

@router.post("/login")
def login_json(payload: dict, db: Session = Depends(get_db)):

    # Expecting a JSON body like: {"email": "johndoe@example.com", "password": "secret123"}
    email = payload.get("email")
    password = payload.get("password")
    if not email or not password:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email and password required")

    user = db.query(User).filter(User.email == email).first()
    if not user or not user.check_password(password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")

    token = user.generate_token(expires_delta=timedelta(hours=72))
    return {"access_token": token, "token_type": "bearer"}



