from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from .. import schemas, crud
from ..database import get_db

router = APIRouter(prefix="/api/products", tags=["Products"])

@router.get("", response_model=dict)
def list_products(
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100),
    category: Optional[str] = Query(None, description="Category slug"),
    category_id: Optional[int] = Query(None),
    search: Optional[str] = Query(None),
    brand: Optional[str] = Query(None),
    min_price: Optional[float] = Query(None),
    max_price: Optional[float] = Query(None),
    featured: Optional[bool] = Query(None),
    trending: Optional[bool] = Query(None),
    new_arrival: Optional[bool] = Query(None),
    sort_by: Optional[str] = Query(None, description="price_asc, price_desc, rating, newest"),
    db: Session = Depends(get_db)
):
    skip = (page - 1) * limit
    products, total = crud.get_products(
        db,
        skip=skip,
        limit=limit,
        category_slug=category,
        category_id=category_id,
        search=search,
        brand=brand,
        min_price=min_price,
        max_price=max_price,
        featured=featured,
        trending=trending,
        new_arrival=new_arrival,
        sort_by=sort_by
    )

    # Convert to Pydantic models
    items = [schemas.Product.model_validate(p) for p in products]

    return {
        "items": items,
        "total": total,
        "page": page,
        "limit": limit,
        "pages": (total + limit - 1) // limit if total > 0 else 1
    }


@router.get("/{id_or_slug}", response_model=schemas.Product)
def get_product(id_or_slug: str, db: Session = Depends(get_db)):
    if id_or_slug.isdigit():
        product = crud.get_product_by_id(db, int(id_or_slug))
    else:
        product = crud.get_product_by_slug(db, id_or_slug)
        
    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found"
        )
    return product


@router.post("", response_model=schemas.Product, status_code=status.HTTP_201_CREATED)
def create_product(product_in: schemas.ProductCreate, db: Session = Depends(get_db)):
    existing = crud.get_product_by_slug(db, product_in.slug)
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Product with this slug already exists"
        )
    return crud.create_product(db, product_in)


@router.put("/{product_id}", response_model=schemas.Product)
def update_product(product_id: int, product_update: schemas.ProductUpdate, db: Session = Depends(get_db)):
    product = crud.update_product(db, product_id, product_update)
    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found"
        )
    return product


@router.delete("/{product_id}")
def delete_product(product_id: int, db: Session = Depends(get_db)):
    success = crud.delete_product(db, product_id)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found"
        )
    return {"message": "Product deleted successfully"}


@router.get("/{product_id}/reviews", response_model=List[schemas.Review])
def list_product_reviews(product_id: int, db: Session = Depends(get_db)):
    return crud.get_product_reviews(db, product_id)


@router.post("/{product_id}/reviews", response_model=schemas.Review, status_code=status.HTTP_201_CREATED)
def add_product_review(product_id: int, review_in: schemas.ReviewCreate, db: Session = Depends(get_db)):
    product = crud.get_product_by_id(db, product_id)
    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found"
        )
    return crud.create_review(db, product_id, review_in)
