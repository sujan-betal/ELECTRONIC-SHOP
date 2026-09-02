from datetime import datetime
from typing import List, Optional, Dict, Any
from pydantic import BaseModel, EmailStr, Field

# Category Schemas
class CategoryBase(BaseModel):
    name: str
    slug: str
    description: Optional[str] = None
    icon: Optional[str] = None
    image: Optional[str] = None

class CategoryCreate(CategoryBase):
    pass

class Category(CategoryBase):
    id: int
    product_count: Optional[int] = 0

    class Config:
        from_attributes = True


# Review Schemas
class ReviewBase(BaseModel):
    user_name: str
    user_avatar: Optional[str] = None
    rating: int = Field(ge=1, le=5)
    comment: str

class ReviewCreate(ReviewBase):
    pass

class Review(ReviewBase):
    id: int
    product_id: int
    created_at: datetime

    class Config:
        from_attributes = True


# Product Schemas
class ProductBase(BaseModel):
    name: str
    slug: str
    brand: str
    description: str
    price: float
    original_price: Optional[float] = None
    discount_percent: Optional[int] = 0
    stock: int = 10
    rating: Optional[float] = 4.5
    review_count: Optional[int] = 0
    image_url: str
    gallery_images: Optional[str] = None  # JSON serialized list of URLs
    features: Optional[str] = None        # JSON serialized list of features
    specs: Optional[str] = None           # JSON serialized dict of specifications
    is_featured: Optional[bool] = False
    is_new_arrival: Optional[bool] = False
    is_trending: Optional[bool] = False
    category_id: int

class ProductCreate(ProductBase):
    pass

class ProductUpdate(BaseModel):
    name: Optional[str] = None
    brand: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = None
    original_price: Optional[float] = None
    discount_percent: Optional[int] = None
    stock: Optional[int] = None
    image_url: Optional[str] = None
    gallery_images: Optional[str] = None
    features: Optional[str] = None
    specs: Optional[str] = None
    is_featured: Optional[bool] = None
    is_new_arrival: Optional[bool] = None
    is_trending: Optional[bool] = None
    category_id: Optional[int] = None

class Product(ProductBase):
    id: int
    created_at: datetime
    category: Optional[Category] = None
    reviews: Optional[List[Review]] = []

    class Config:
        from_attributes = True


# User Schemas
class UserBase(BaseModel):
    name: str
    email: EmailStr
    avatar: Optional[str] = None

class UserCreate(UserBase):
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class User(UserBase):
    id: int
    role: str
    created_at: datetime

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: User


# Order Schemas
class OrderItemCreate(BaseModel):
    product_id: Optional[int] = None
    product_name: str
    product_image: Optional[str] = None
    quantity: int
    price: float

class OrderItem(BaseModel):
    id: int
    product_id: Optional[int] = None
    product_name: str
    product_image: Optional[str] = None
    quantity: int
    price: float
    total: float

    class Config:
        from_attributes = True

class OrderCreate(BaseModel):
    customer_name: str
    customer_email: EmailStr
    customer_phone: str
    shipping_address: str
    city: str
    postal_code: str
    payment_method: str = "card"
    items: List[OrderItemCreate]

class Order(BaseModel):
    id: int
    order_number: str
    user_id: Optional[int] = None
    customer_name: str
    customer_email: str
    customer_phone: str
    shipping_address: str
    city: str
    postal_code: str
    total_amount: float
    discount_amount: float
    shipping_fee: float
    status: str
    payment_method: str
    payment_status: str
    created_at: datetime
    items: List[OrderItem] = []

    class Config:
        from_attributes = True


# Analytics / Stats Schemas
class DashboardStats(BaseModel):
    total_revenue: float
    total_orders: int
    total_products: int
    total_users: int
    recent_orders: List[Order]
    top_products: List[Product]
