@echo off
REM Añadir todos los cambios
git add .

REM Obtener fecha y hora actuales en formato YYYY-MM-DD HH:MM
for /f "tokens=1-4 delims=/ " %%a in ('date /t') do set FECHA=%%d-%%b-%%c
for /f "tokens=1-2 delims=: " %%a in ('time /t') do set HORA=%%a:%%b

REM Hacer commit con mensaje personalizado
git commit -m "actualización %FECHA% %HORA%"

REM Enviar cambios al repositorio remoto
git push
