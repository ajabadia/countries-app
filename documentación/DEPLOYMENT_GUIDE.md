<!-- File: d:\desarrollos\countries2\documentación\DEPLOYMENT_GUIDE.md | Last Modified: 2025-10-28 -->

# Guía de Despliegue a Producción

Este documento describe los pasos necesarios para compilar la aplicación `countries2` y desplegarla en un entorno de producción.

---

## 1. Requisitos del Servidor

Antes de empezar, asegúrate de que tu servidor de producción cumple con los siguientes requisitos:

-   **Node.js**: Versión 18.x o superior.
-   **npm**: Se instala automáticamente con Node.js.
-   **Servidor Web**: Se recomienda **Nginx** o Apache para servir el frontend y actuar como proxy inverso.
-   **Gestor de Procesos**: Se recomienda **PM2** para mantener el servidor backend funcionando de forma continua.

---

## 2. Despliegue del Backend (API)

El objetivo es compilar el código TypeScript a JavaScript y ejecutarlo con Node.js de forma persistente.

### Paso 1: Obtener y Compilar el Código

1.  Clona el repositorio en tu servidor o sube el código fuente.
    ```bash
    git clone <URL_DEL_REPOSITORIO>
    cd countries2
    ```

2.  Instala todas las dependencias.
    ```bash
    npm install
    ```

3.  Compila el backend. Este comando transpilará el código TypeScript a JavaScript en el directorio `backend/dist`.
    ```bash
    npm run build:backend
    ```

### Paso 2: Configuración del Entorno

1.  Crea un archivo `.env` en el directorio `backend/`. Este archivo **no debe** estar en el control de versiones.

2.  Añade las variables de entorno para producción. Asegúrate de usar secretos fuertes y diferentes a los de desarrollo.
    ```dotenv
    # backend/.env
    NODE_ENV=production
    PORT=3000
    ACCESS_TOKEN_SECRET=TU_SECRETO_DE_PRODUCCION_PARA_ACCESS_TOKEN
    REFRESH_TOKEN_SECRET=TU_SECRETO_DE_PRODUCCION_PARA_REFRESH_TOKEN
    ```

### Paso 3: Ejecución con un Gestor de Procesos (PM2)

PM2 es un gestor de procesos para Node.js que mantendrá tu API en línea y la reiniciará automáticamente si falla.

1.  Instala PM2 globalmente (si no lo has hecho ya).
    ```bash
    npm install pm2 -g
    ```

2.  Inicia el servidor backend con PM2.
    ```bash
    # Desde la raíz del proyecto
    pm2 start backend/dist/index.js --name "countries2-api"
    ```

3.  Guarda la configuración de PM2 para que se reinicie automáticamente si el servidor se reinicia.
    ```bash
    pm2 save
    ```

---

## 3. Despliegue del Frontend (Angular)

El objetivo es compilar la aplicación Angular a un conjunto de archivos estáticos y servirlos con un servidor web como Nginx.

### Paso 1: Compilación para Producción

1.  Desde la raíz del proyecto, ejecuta el script de compilación del frontend.
    ```bash
    npm run build
    ```
    Esto generará los archivos estáticos optimizados en el directorio `dist/frontend/browser/`.

### Paso 2: Configuración del Servidor Web (Ejemplo con Nginx)

Nginx servirá los archivos estáticos y actuará como un proxy inverso para las llamadas a la API.

1.  Crea un nuevo archivo de configuración para tu sitio en Nginx (ej. `/etc/nginx/sites-available/countries2`).

2.  Añade la siguiente configuración, ajustando `server_name` y las rutas según tu entorno:
    ```nginx
    server {
        listen 80;
        server_name tu-dominio.com;

        # Ruta a los archivos compilados del frontend
        root /ruta/a/tu/proyecto/countries2/dist/frontend/browser;
        index index.html;

        # Configuración para la API (Proxy Inverso)
        # Todas las peticiones a /api/ se redirigen al backend
        location /api {
            proxy_pass http://localhost:3000;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }

        # Configuración para la Single-Page Application (SPA)
        # Cualquier otra ruta que no sea un archivo se redirige a index.html
        location / {
            try_files $uri $uri/ /index.html;
        }
    }
    ```

3.  Habilita el sitio y reinicia Nginx.
    ```bash
    sudo ln -s /etc/nginx/sites-available/countries2 /etc/nginx/sites-enabled/
    sudo nginx -t # Para verificar que la configuración es correcta
    sudo systemctl restart nginx
    ```

Con estos pasos, tu aplicación estará desplegada y lista para ser accedida en producción.