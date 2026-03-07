@echo off
echo Stopping all Node.js processes...
taskkill /IM node.exe /F >nul 2>&1

echo Waiting for ports to be released...
timeout /t 3 >nul

echo Starting MEL Laundry application...
echo Frontend: http://localhost:3003
echo Backend:  http://localhost:5001
echo Admin:    http://localhost:3003/admin
echo.

npm run dev
