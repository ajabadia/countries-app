// backend/index.ts
import dotenv from 'dotenv';
import express, { type Express } from 'express';
import logger from './config/logger.js';
import path from 'path';
import { fileURLToPath } from 'url';

export async function createApp(): Promise<Express> {
  // Load environment variables from .env file, but not in the test environment.
  // In 'test', jest.setup.ts is responsible for loading variables from .env.test.
  if (process.env.NODE_ENV !== 'test') {
    dotenv.config();
  }

  // --- Dynamic Imports ---
  // We import these modules *after* dotenv has been configured.
  const cors = (await import('cors')).default;
  const morgan = (await import('morgan')).default;
  const cookieParser = (await import('cookie-parser')).default;
  const { errorHandler } = await import('./middleware/errorHandler.js');
  const authRouter = (await import('./routes/auth.js')).default;
  const countriesRouter = (await import('./routes/countries.js')).default;
  const continentsRouter = (await import('./routes/continents.js')).default;
  const languagesRouter = (await import('./routes/languages.js')).default;
  const areasRouter = (await import('./routes/areas.js')).default;
  const dependenciesRouter = (await import('./routes/dependencies.js')).default;
  const multilingualnamesRouter = (await import('./routes/multilingualnames.js')).default;
  const usersRouter = (await import('./routes/users.js')).default;

  const app = express();

  // --- Servir assets estáticos del frontend --- 
  // NOTA: Esto se deja comentado. El servidor de desarrollo de Angular (`ng serve`)
  // se encarga de servir los assets del frontend. Esta línea solo sería necesaria
  // en un entorno de producción donde el backend sirve también el frontend compilado.
  // app.use('/assets', express.static(path.join(path.dirname(fileURLToPath(import.meta.url)), '../../frontend/src/assets')));

  // Stream for Morgan (HTTP logger) to use Winston.
  const stream = {
    write: (message: string) => logger.http(message.trim()),
  };

  // Use Winston's stream in Morgan.
  const morganMiddleware = morgan('combined', { stream });

  // Middlewares
  app.use(morganMiddleware);
  app.use(cors()); // Enable CORS for all routes
  app.use(express.json()); // Middleware to parse JSON
  app.use(cookieParser()); // Middleware to parse cookies

  // API Routes
  app.use('/api/auth', authRouter);
  app.use('/api/countries', countriesRouter);
  app.use('/api/continents', continentsRouter);
  app.use('/api/languages', languagesRouter);
  app.use('/api/areas', areasRouter);
  app.use('/api/dependencies', dependenciesRouter);
  app.use('/api/multilingualnames', multilingualnamesRouter);
  app.use('/api/users', usersRouter);

  // Error handling middleware (must be the last in the middleware chain)
  app.use(errorHandler);

  return app;
}

async function startServer() {
  const app = await createApp();
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    logger.info(`🚀 Server running on http://localhost:${PORT}`);
  });
}

// Start the server only if this file is executed directly
if (process.env.NODE_ENV !== 'test') {
  startServer();
}