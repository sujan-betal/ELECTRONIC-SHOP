@echo off
echo ========================================================
echo   TECHPULSE ELECTRONIC SHOP - FASTAPI & NEXT.JS LAUNCHER
echo ========================================================
echo.
echo [1/2] Starting FastAPI Backend on http://127.0.0.1:8000 ...
start cmd /k "cd backend && python run.py"

echo [2/2] Starting Next.js React Frontend on http://localhost:3000 ...
start cmd /k "cd frontend && npm run dev"

echo.
echo All services launched!
echo - Frontend: http://localhost:3000
echo - Backend API: http://127.0.0.1:8000
echo - Swagger Docs: http://127.0.0.1:8000/docs
echo.
pause
