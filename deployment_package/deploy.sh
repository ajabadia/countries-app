#!/bin/bash

# deploy.sh - Script para compilar y empaquetar la aplicación para producción.
#
# Este script automatiza los siguientes pasos:
# 1. Limpia cualquier paquete de despliegue anterior.
# 2. Compila el frontend de Angular para producción.
# 3. Compila el backend de Node.js/TypeScript a JavaScript.
# 4. Agrupa todos los artefactos necesarios en una carpeta 'deployment_package'.

# Detener el script si cualquier comando falla
set -e

# --- Configuración ---
DEPLOY_DIR="deployment_package"

# --- Inicio del Script ---
echo "🚀 Iniciando la creación del paquete de despliegue..."

# 1. Limpiar el directorio de despliegue anterior
echo "🧹 Limpiando el directorio de despliegue anterior..."
rm -rf $DEPLOY_DIR
mkdir -p $DEPLOY_DIR

# 2. Compilar el Frontend
echo "🎨 Compilando el frontend para producción..."
npm run build

# 3. Compilar el Backend
echo "⚙️ Compilando el backend para producción..."
npm run build:backend

# 4. Preparar el paquete del Backend
echo "📦 Preparando el paquete del backend..."
mkdir -p $DEPLOY_DIR/backend
cp -r backend/dist $DEPLOY_DIR/backend/dist
cp -r backend/db $DEPLOY_DIR/backend/db
cp backend/package.json $DEPLOY_DIR/backend/package.json
cp backend/package-lock.json $DEPLOY_DIR/backend/package-lock.json

# 5. Preparar el paquete del Frontend
echo "🖼️ Preparando el paquete del frontend..."
cp -r dist/frontend/browser $DEPLOY_DIR/frontend

# 6. Instrucciones Finales
echo ""
echo "✅ Paquete de despliegue creado con éxito en el directorio '$DEPLOY_DIR/'."
echo ""
echo "Próximos pasos en el servidor de producción:"
echo "1. Copia el directorio '$DEPLOY_DIR' a tu servidor (ej. usando scp)."
echo "2. En el servidor, navega a la carpeta 'backend': cd $DEPLOY_DIR/backend"
echo "3. Instala las dependencias de producción: npm install --omit=dev"
echo "4. Crea el archivo '.env' con las variables de entorno de producción."
echo "5. Inicia la aplicación con PM2: pm2 start dist/index.js --name \"countries2-api\""
echo "6. Configura tu servidor web (ej. Nginx) para servir los archivos de '$DEPLOY_DIR/frontend' y hacer proxy de '/api' al backend."
echo ""