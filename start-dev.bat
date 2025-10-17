@echo off
REM -----------------------------------------------------------------
REM Script para iniciar los entornos de desarrollo de Frontend y Backend.
REM -----------------------------------------------------------------
REM Abre dos ventanas de terminal separadas:
REM 1. Inicia el servidor de Angular con el proxy.
REM 2. Inicia el servidor de Node.js.
REM -----------------------------------------------------------------

echo Iniciando el servidor de Backend (Node.js)...
start "Backend" cmd /k "cd backend && node app.js"

echo Iniciando el servidor de Frontend (Angular)...
start "Frontend" cmd /k "cd frontend && ng serve --proxy-config proxy.conf.json"

echo.
echo Entornos de desarrollo iniciados en ventanas separadas.