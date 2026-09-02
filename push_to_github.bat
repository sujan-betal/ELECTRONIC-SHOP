@echo off
echo ========================================================
echo   PUSHING ELECTRONIC SHOP TO GITHUB (sujan-betal)
echo ========================================================
echo.
echo Running git push origin main...
echo (If a browser window opens, please click "Sign in with your browser")
echo.
git push origin main
echo.
echo ========================================================
if %ERRORLEVEL% EQU 0 (
    echo [SUCCESS] Code pushed successfully to https://github.com/sujan-betal/ELECTRONIC-SHOP!
) else (
    echo [NOTE] If you need a Personal Access Token:
    echo Run: git push https://YOUR_TOKEN@github.com/sujan-betal/ELECTRONIC-SHOP.git main
)
echo ========================================================
pause
