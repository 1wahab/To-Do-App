from fastapi import APIRouter, Depends, HTTPException, status, Body, Header
from sqlalchemy.orm import Session
from jose import jwt, JWTError

from backend.models import Task, User
from backend.database import get_db

router = APIRouter()

SECRET_KEY = "your-secret-key"  # Must match the key in models.py
ALGORITHM = "HS256"

def get_current_user(authorization: str = Header(...), db: Session = Depends(get_db)) -> User:
    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid authorization header")
    token = authorization.split(" ")[1]
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload.get("sub")
        if not user_id:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    except JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    user = db.query(User).get(int(user_id))
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User not found")
    return user

@router.post("/tasks", status_code=status.HTTP_201_CREATED)
def create_task(
    title: str = Body(...),
    description: str = Body(None),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    task = Task(title=title, description=description, user_id=current_user.id)
    db.add(task)
    db.commit()
    db.refresh(task)
    return {
        "message": "Task created",
        "task": {
            "id": task.id,
            "title": task.title,
            "description": task.description,
            "completed": task.completed
        }
    }

@router.get("/tasks")
def get_tasks(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    tasks = db.query(Task).filter(Task.user_id == current_user.id).all()
    return tasks

@router.put("/tasks/{task_id}")
def update_task(
    task_id: int,
    title: str = Body(...),
    description: str = Body(None),
    completed: bool = Body(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    task = db.query(Task).filter(Task.id == task_id, Task.user_id == current_user.id).first()
    if not task:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Task not found")
    task.title = title
    task.description = description
    task.completed = completed
    db.commit()
    db.refresh(task)
    return {
        "message": "Task updated",
        "task": {
            "id": task.id,
            "title": task.title,
            "description": task.description,
            "completed": task.completed
        }
    }

@router.delete("/tasks/{task_id}")
def delete_task(
    task_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    task = db.query(Task).filter(Task.id == task_id, Task.user_id == current_user.id).first()
    if not task:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Task not found")
    db.delete(task)
    db.commit()
    return {"message": "Task deleted"}
