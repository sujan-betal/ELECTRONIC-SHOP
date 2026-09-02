from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from .. import schemas, crud, models
from ..database import get_db

router = APIRouter(prefix="/api/categories", tags=["Categories"])

@router.get("", response_model=List[schemas.Category])
def list_categories(db: Session = Depends(get_db)):
    categories = crud.get_categories(db)
    result = []
    for cat in categories:
        count = db.query(models.Product).filter(models.Product.category_id == cat.id).count()
        cat_data = schemas.Category(
            id=cat.id,
            name=cat.name,
            slug=cat.slug,
            description=cat.description,
            icon=cat.icon,
            image=cat.image,
            product_count=count
        )
        result.append(cat_data)
    return result


@router.get("/{slug}", response_model=schemas.Category)
def get_category(slug: str, db: Session = Depends(get_db)):
    category = crud.get_category_by_slug(db, slug)
    if not category:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Category not found"
        )
    count = db.query(models.Product).filter(models.Product.category_id == category.id).count()
    return schemas.Category(
        id=category.id,
        name=category.name,
        slug=category.slug,
        description=category.description,
        icon=category.icon,
        image=category.image,
        product_count=count
    )


@router.post("", response_model=schemas.Category, status_code=status.HTTP_201_CREATED)
def create_category(category_in: schemas.CategoryCreate, db: Session = Depends(get_db)):
    existing = crud.get_category_by_slug(db, category_in.slug)
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Category with this slug already exists"
        )
    return crud.create_category(db, category_in)
