from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query, status, Header
from sqlalchemy.orm import Session
from .. import schemas, crud, models
from ..database import get_db
from .auth import get_current_user

router = APIRouter(prefix="/api/orders", tags=["Orders"])

@router.post("", response_model=schemas.Order, status_code=status.HTTP_201_CREATED)
def create_order(
    order_in: schemas.OrderCreate, 
    db: Session = Depends(get_db),
    current_user: Optional[models.User] = Depends(get_current_user)
):
    if not order_in.items:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Order must contain at least one item"
        )
    user_id = current_user.id if current_user else None
    return crud.create_order(db, order_in, user_id=user_id)


@router.get("", response_model=List[schemas.Order])
def list_orders(
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100),
    db: Session = Depends(get_db),
    current_user: Optional[models.User] = Depends(get_current_user)
):
    skip = (page - 1) * limit
    user_id = current_user.id if (current_user and current_user.role != "admin") else None
    return crud.get_orders(db, skip=skip, limit=limit, user_id=user_id)


@router.get("/{id_or_number}", response_model=schemas.Order)
def get_order(id_or_number: str, db: Session = Depends(get_db)):
    if id_or_number.isdigit():
        order = crud.get_order_by_id(db, int(id_or_number))
    else:
        order = crud.get_order_by_number(db, id_or_number)
        
    if not order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Order not found"
        )
    return order


@router.patch("/{order_id}/status", response_model=schemas.Order)
def update_order_status(order_id: int, status: str, db: Session = Depends(get_db)):
    order = crud.get_order_by_id(db, order_id)
    if not order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Order not found"
        )
    order.status = status
    db.commit()
    db.refresh(order)
    return order
