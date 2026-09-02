from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from .. import schemas, crud
from ..database import get_db

router = APIRouter(prefix="/api/stats", tags=["Analytics & Stats"])

@router.get("/dashboard", response_model=schemas.DashboardStats)
def get_dashboard_data(db: Session = Depends(get_db)):
    return crud.get_dashboard_stats(db)
