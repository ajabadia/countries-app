// backend/index.ts
import dotenv from 'dotenv';
// Carga las variables de entorno desde el archivo .env
dotenv.config();

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import countriesRouter from './routes/countries.js';
import continentsRouter from './routes/continents.js';
import languagesRouter from './routes/languages.js';
import areasRouter from './routes/areas.js';
import dependenciesRouter from './routes/dependencies.js';
import multilingualnamesRouter from './routes/multilingualnames.js';
import authRouter from './routes/auth.js';
import { errorHandler } from './middleware/errorHandler.js';
import logger from './config/logger.js';

const app = express();

// Stream para que Morgan (logger de HTTP) use Winston.
const stream = {
  write: (message: string) => logger.http(message.trim()),
};

// Usamos el stream de Winston en Morgan.
// 'combined' es un formato estándar de Apache que incluye información útil.
const morganMiddleware = morgan('combined', { stream });

// Middlewares
app.use(morganMiddleware);
app.use(cors()); // Habilita CORS para todas las rutas
app.use(express.json()); // Middleware para parsear JSON
app.use(cookieParser()); // Middleware para parsear cookies

// Rutas de la API
app.use('/api/auth', authRouter);
app.use('/api/countries', countriesRouter);
app.use('/api/continents', continentsRouter);
app.use('/api/languages', languagesRouter);
app.use('/api/areas', areasRouter);
app.use('/api/dependencies', dependenciesRouter);
app.use('/api/multilingualnames', multilingualnamesRouter);

// Middleware de manejo de errores (debe ser el último en la cadena de middlewares)
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  // Usamos un emoji para que el mensaje de éxito sea más visible :)
  logger.info(`🚀 Server running on http://localhost:${PORT}`);
});