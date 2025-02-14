# backend/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.database import engine, Base  # Import Base from database.py

# Import routers from the routes package
from backend.routes import user, task

app = FastAPI(title="ToDo App API")

# Configure CORS – adjust origins for production
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change to specific origins in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create the database tables if they do not exist
Base.metadata.create_all(bind=engine)

# Include routers under the "/api" prefix
app.include_router(user.router, prefix="/api")
app.include_router(task.router, prefix="/api")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.main:app", host="0.0.0.0", port=8000, reload=True)
