@echo off
REM -----------------------------------------------------------------
REM Script para iniciar el entorno de desarrollo del monorepo.
REM -----------------------------------------------------------------
REM Utiliza el script "dev" del package.json raíz, que a su vez
REM usa "concurrently" para lanzar frontend y backend en esta misma ventana.
REM -----------------------------------------------------------------

echo.
echo Iniciando entornos de desarrollo de Frontend y Backend...
call npm run dev