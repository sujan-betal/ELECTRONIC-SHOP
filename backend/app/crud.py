import uuid
import hashlib
import json
from typing import List, Optional, Tuple
from sqlalchemy.orm import Session
from sqlalchemy import or_, desc, asc
from . import models, schemas

# Simple and reliable password hashing using PBKDF2 with SHA256
def get_password_hash(password: str) -> str:
    salt = "electronic_shop_salt_v1"
    hashed = hashlib.pbkdf2_hmac(
        'sha256',
        password.encode('utf-8'),
        salt.encode('utf-8'),
        100000
    )
    return hashed.hex()

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return get_password_hash(plain_password) == hashed_password


# Category operations
def get_categories(db: Session) -> List[models.Category]:
    return db.query(models.Category).all()

def get_category_by_slug(db: Session, slug: str) -> Optional[models.Category]:
    return db.query(models.Category).filter(models.Category.slug == slug).first()

def get_category_by_id(db: Session, category_id: int) -> Optional[models.Category]:
    return db.query(models.Category).filter(models.Category.id == category_id).first()

def create_category(db: Session, category: schemas.CategoryCreate) -> models.Category:
    db_category = models.Category(
        name=category.name,
        slug=category.slug,
        description=category.description,
        icon=category.icon,
        image=category.image
    )
    db.add(db_category)
    db.commit()
    db.refresh(db_category)
    return db_category


# Product operations
def get_products(
    db: Session,
    skip: int = 0,
    limit: int = 50,
    category_slug: Optional[str] = None,
    category_id: Optional[int] = None,
    search: Optional[str] = None,
    brand: Optional[str] = None,
    min_price: Optional[float] = None,
    max_price: Optional[float] = None,
    featured: Optional[bool] = None,
    trending: Optional[bool] = None,
    new_arrival: Optional[bool] = None,
    sort_by: Optional[str] = None  # price_asc, price_desc, rating, newest
) -> Tuple[List[models.Product], int]:
    query = db.query(models.Product)

    if category_slug:
        query = query.join(models.Category).filter(models.Category.slug == category_slug)
    elif category_id:
        query = query.filter(models.Product.category_id == category_id)

    if search:
        search_fmt = f"%{search}%"
        query = query.filter(
            or_(
                models.Product.name.ilike(search_fmt),
                models.Product.brand.ilike(search_fmt),
                models.Product.description.ilike(search_fmt)
            )
        )

    if brand:
        query = query.filter(models.Product.brand.ilike(brand))

    if min_price is not None:
        query = query.filter(models.Product.price >= min_price)

    if max_price is not None:
        query = query.filter(models.Product.price <= max_price)

    if featured is not None:
        query = query.filter(models.Product.is_featured == featured)

    if trending is not None:
        query = query.filter(models.Product.is_trending == trending)

    if new_arrival is not None:
        query = query.filter(models.Product.is_new_arrival == new_arrival)

    total_count = query.count()

    # Sorting
    if sort_by == "price_asc":
        query = query.order_by(asc(models.Product.price))
    elif sort_by == "price_desc":
        query = query.order_by(desc(models.Product.price))
    elif sort_by == "rating":
        query = query.order_by(desc(models.Product.rating))
    elif sort_by == "newest":
        query = query.order_by(desc(models.Product.created_at))
    else:
        query = query.order_by(desc(models.Product.is_featured), desc(models.Product.id))

    products = query.offset(skip).limit(limit).all()
    return products, total_count


def get_product_by_id(db: Session, product_id: int) -> Optional[models.Product]:
    return db.query(models.Product).filter(models.Product.id == product_id).first()

def get_product_by_slug(db: Session, slug: str) -> Optional[models.Product]:
    return db.query(models.Product).filter(models.Product.slug == slug).first()

def create_product(db: Session, product: schemas.ProductCreate) -> models.Product:
    db_product = models.Product(**product.model_dump())
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product

def update_product(db: Session, product_id: int, product_update: schemas.ProductUpdate) -> Optional[models.Product]:
    db_product = get_product_by_id(db, product_id)
    if not db_product:
        return None
    
    update_data = product_update.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_product, key, value)
    
    db.commit()
    db.refresh(db_product)
    return db_product

def delete_product(db: Session, product_id: int) -> bool:
    db_product = get_product_by_id(db, product_id)
    if not db_product:
        return False
    db.delete(db_product)
    db.commit()
    return True


# User operations
def get_user_by_email(db: Session, email: str) -> Optional[models.User]:
    return db.query(models.User).filter(models.User.email == email.lower()).first()

def get_user_by_id(db: Session, user_id: int) -> Optional[models.User]:
    return db.query(models.User).filter(models.User.id == user_id).first()

def create_user(db: Session, user: schemas.UserCreate, role: str = "customer") -> models.User:
    hashed_pwd = get_password_hash(user.password)
    db_user = models.User(
        name=user.name,
        email=user.email.lower(),
        hashed_password=hashed_pwd,
        role=role,
        avatar=user.avatar or f"https://api.dicebear.com/7.x/avataaars/svg?seed={user.name}"
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def authenticate_user(db: Session, login_data: schemas.UserLogin) -> Optional[models.User]:
    user = get_user_by_email(db, login_data.email)
    if not user:
        return None
    if not verify_password(login_data.password, user.hashed_password):
        return None
    return user


# Order operations
def create_order(db: Session, order_in: schemas.OrderCreate, user_id: Optional[int] = None) -> models.Order:
    order_num = f"ORD-{uuid.uuid4().hex[:8].upper()}"
    
    # Calculate totals
    subtotal = sum(item.price * item.quantity for item in order_in.items)
    shipping_fee = 0.0 if subtotal > 500 else 15.0
    discount_amount = round(subtotal * 0.05, 2) if subtotal > 1000 else 0.0
    total_amount = round(subtotal - discount_amount + shipping_fee, 2)

    db_order = models.Order(
        order_number=order_num,
        user_id=user_id,
        customer_name=order_in.customer_name,
        customer_email=order_in.customer_email,
        customer_phone=order_in.customer_phone,
        shipping_address=order_in.shipping_address,
        city=order_in.city,
        postal_code=order_in.postal_code,
        total_amount=total_amount,
        discount_amount=discount_amount,
        shipping_fee=shipping_fee,
        status="processing",
        payment_method=order_in.payment_method,
        payment_status="paid"
    )
    db.add(db_order)
    db.commit()
    db.refresh(db_order)

    # Add items and decrement stock
    for item in order_in.items:
        db_item = models.OrderItem(
            order_id=db_order.id,
            product_id=item.product_id,
            product_name=item.product_name,
            product_image=item.product_image,
            quantity=item.quantity,
            price=item.price,
            total=round(item.price * item.quantity, 2)
        )
        db.add(db_item)

        if item.product_id:
            product = get_product_by_id(db, item.product_id)
            if product and product.stock >= item.quantity:
                product.stock -= item.quantity

    db.commit()
    db.refresh(db_order)
    return db_order

def get_orders(db: Session, skip: int = 0, limit: int = 50, user_id: Optional[int] = None) -> List[models.Order]:
    query = db.query(models.Order)
    if user_id:
        query = query.filter(models.Order.user_id == user_id)
    return query.order_by(desc(models.Order.created_at)).offset(skip).limit(limit).all()

def get_order_by_id(db: Session, order_id: int) -> Optional[models.Order]:
    return db.query(models.Order).filter(models.Order.id == order_id).first()

def get_order_by_number(db: Session, order_number: str) -> Optional[models.Order]:
    return db.query(models.Order).filter(models.Order.order_number == order_number).first()


# Review operations
def create_review(db: Session, product_id: int, review_in: schemas.ReviewCreate) -> models.Review:
    db_review = models.Review(
        product_id=product_id,
        user_name=review_in.user_name,
        user_avatar=review_in.user_avatar or f"https://api.dicebear.com/7.x/avataaars/svg?seed={review_in.user_name}",
        rating=review_in.rating,
        comment=review_in.comment
    )
    db.add(db_review)
    
    # Update product rating and review count
    product = get_product_by_id(db, product_id)
    if product:
        all_reviews = db.query(models.Review).filter(models.Review.product_id == product_id).all()
        total_rating = sum(r.rating for r in all_reviews) + review_in.rating
        new_count = len(all_reviews) + 1
        product.rating = round(total_rating / new_count, 1)
        product.review_count = new_count
        
    db.commit()
    db.refresh(db_review)
    return db_review

def get_product_reviews(db: Session, product_id: int) -> List[models.Review]:
    return db.query(models.Review).filter(models.Review.product_id == product_id).order_by(desc(models.Review.created_at)).all()


# Dashboard analytics
def get_dashboard_stats(db: Session) -> dict:
    total_revenue = sum(o.total_amount for o in db.query(models.Order).all())
    total_orders = db.query(models.Order).count()
    total_products = db.query(models.Product).count()
    total_users = db.query(models.User).count()
    recent_orders = db.query(models.Order).order_by(desc(models.Order.created_at)).limit(5).all()
    top_products = db.query(models.Product).order_by(desc(models.Product.rating)).limit(5).all()

    return {
        "total_revenue": round(total_revenue, 2),
        "total_orders": total_orders,
        "total_products": total_products,
        "total_users": total_users,
        "recent_orders": recent_orders,
        "top_products": top_products
    }
