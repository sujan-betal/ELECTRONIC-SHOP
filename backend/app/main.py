from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, Base
from .seed_data import seed_database
from .routers import products, categories, orders, auth, stats

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: ensure tables exist & seed initial catalog
    Base.metadata.create_all(bind=engine)
    seed_database()
    yield
    # Shutdown logic if any

app = FastAPI(
    title="Electronic Shop REST API",
    description="Full-featured FastAPI & SQLAlchemy Backend for Electronic Shop E-commerce Platform",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan
)

# Enable CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins in development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API Routers
app.include_router(auth.router)
app.include_router(products.router)
app.include_router(categories.router)
app.include_router(orders.router)
app.include_router(stats.router)

@app.get("/")
def root():
    return {
        "name": "Electronic Shop API",
        "status": "online",
        "version": "1.0.0",
        "documentation": "/docs"
    }

@app.get("/api/health")
def health():
    return {"status": "healthy", "service": "electronic-shop-backend"}
