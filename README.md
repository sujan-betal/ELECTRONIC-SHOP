<<<<<<< HEAD
# ⚡ TechPulse - Modern Electronic Shop (Full-Stack E-Commerce)

An enterprise-grade, high-tech electronic shop e-commerce platform built with **Next.js 16 (React 19, TypeScript, Tailwind CSS)** frontend and a high-performance **FastAPI (SQLAlchemy, SQLite/PostgreSQL, Pydantic v2, PyJWT)** backend.

---

## 🚀 Quick Start (এক ক্লিকে চালু করার নিয়ম)

### Method 1: Automated Launchers (Windows)
Double-click `run_dev.bat` or run PowerShell script `run_dev.ps1`:
```powershell
.\run_dev.ps1
```
This automatically starts both the FastAPI backend and Next.js frontend.

---

### Method 2: Manual Terminal Startup

#### 1. Backend Setup & Run (FastAPI + SQL Database)
```bash
# Navigate to backend directory
cd backend

# (Optional) Install dependencies if needed:
pip install -r requirements.txt

# Start the FastAPI Server:
python run.py
```
- **Backend API URL**: `http://127.0.0.1:8000`
- **Interactive Swagger Documentation**: `http://127.0.0.1:8000/docs`
- **ReDoc Documentation**: `http://127.0.0.1:8000/redoc`

#### 2. Frontend Setup & Run (Next.js + React + Tailwind)
In a new terminal:
```bash
# Navigate to frontend directory
cd frontend

# Start Next.js Development Server:
npm run dev
```
- **Frontend App URL**: `http://localhost:3000`

---

## 🔑 Demo Account Credentials (টেস্টিং লগইন)

| Role | Email | Password |
| :--- | :--- | :--- |
| **Admin Manager** | `admin@electronicshop.com` | `adminpassword123` |
| **Demo Customer** | `alex@example.com` | `userpassword123` |

*(The login modal also features 1-Click Quick Demo Login buttons)*

---

## 💎 Features & Architecture

### 🖥️ Frontend (Next.js App Router)
- **High-Tech Aesthetic**: Dark cyber-glassmorphism theme with glowing neon accents, gradients, and responsive layouts.
- **Dynamic Catalog**:
  - Live search with instant filtering.
  - Multi-category filter pills & brand selection (Apple, Samsung, Sony, ASUS, DJI, Logitech, Anker).
  - Price range slider & sorting (Price Low/High, Rating, Newest).
- **Product Detail Experience**:
  - Multi-angle high-definition photo gallery.
  - Dynamic stock status badge and instant savings calculator.
  - Formatted technical hardware specifications sheet.
  - Customer review submission system & ratings breakdown.
- **Shopping Cart & Checkout Flow**:
  - Interactive slide-over cart drawer with quantity counters (`+` / `-`).
  - Free express delivery progress tracker ($500 threshold).
  - Coupon code discounts (Try: `TECH10` for 10% off, `CYBER20` for 20% off).
  - Multi-method checkout modal (Credit/Debit Card, bKash / Nagad, Cash on Delivery).
  - Confetti celebration and instant order generation.
- **GPS Order Tracker**: Realtime tracking by Order Number with status timeline.
- **Admin Control Center**: Live sales KPI metrics, inventory stock levels, and order status updater.

### ⚙️ Backend (FastAPI + SQL Database)
- **SQLAlchemy ORM**:
  - `Category`, `Product`, `User`, `Order`, `OrderItem`, `Review` models.
  - SQLite database out-of-the-box (`backend/electronics_shop.db`), supports PostgreSQL via `DATABASE_URL` environment variable.
- **Auto-Seeder**: Populates 7 categories, 12+ flagship products with HD photography, specs, ratings, and demo reviews automatically on first launch.
- **RESTful Endpoints**:
  - `/api/products` (Search, pagination, filter, CRUD)
  - `/api/categories` (Categorization with aggregated item counts)
  - `/api/orders` (Order placement, inventory decrement, order tracking)
  - `/api/auth` (JWT token authentication, password hashing, registration, login)
  - `/api/stats` (Admin analytics dashboard metrics)
- **CORS Enabled**: Seamless communication with Next.js frontend.

---

## 📁 Project Structure

```
ELECTRONIC-SHOP/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py            # FastAPI main app, CORS & Lifespan
│   │   ├── database.py        # SQLAlchemy engine & session dependency
│   │   ├── models.py          # SQL Database models
│   │   ├── schemas.py         # Pydantic validation models
│   │   ├── crud.py            # Database operations & password hashing
│   │   ├── seed_data.py       # Initial electronics catalog seeder
│   │   └── routers/
│   │       ├── auth.py        # Register, Login, JWT verification
│   │       ├── products.py    # Products CRUD, search & filtering
│   │       ├── categories.py  # Category endpoints
│   │       ├── orders.py      # Checkout & Order management
│   │       └── stats.py       # Admin dashboard analytics
│   ├── requirements.txt
│   ├── run.py                 # Backend runner
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.tsx     # Root layout with Providers & Modals
│   │   │   ├── page.tsx       # Homepage (Hero, Flash Deals, Features)
│   │   │   ├── products/      # Catalog with filters & search
│   │   │   ├── product/[slug] # Product details, specs, gallery & reviews
│   │   │   ├── orders/        # Order tracking page
│   │   │   ├── admin/         # Store Admin KPI Dashboard
│   │   │   ├── about/         # About TechPulse
│   │   │   └── contact/       # Support & inquiry form
│   │   ├── components/
│   │   │   ├── layout/        # Navbar, Footer
│   │   │   ├── home/          # HeroBanner, CategoryGrid, FlashDeals, PromoBanners
│   │   │   ├── products/      # ProductCard
│   │   │   ├── cart/          # CartDrawer, CheckoutModal
│   │   │   ├── auth/          # AuthModal
│   │   │   └── common/        # Toast
│   │   ├── context/           # CartContext, AuthContext
│   │   ├── lib/api.ts         # REST API Client & fallback handler
│   │   └── types/             # TypeScript interfaces
│   ├── package.json
│   ├── next.config.ts
│   └── tsconfig.json
│
├── run_dev.bat                # Windows Batch launcher
├── run_dev.ps1                # PowerShell launcher
└── README.md
```
=======

>>>>>>> a3607fef2b86ae74df7899825c84bc1780144592
