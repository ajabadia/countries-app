// backend/index.ts
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import countriesRouter from './routes/countries.js';
import continentsRouter from './routes/continents.js';
import languagesRouter from './routes/languages.js';
import areasRouter from './routes/areas.js';
import dependenciesRouter from './routes/dependencies.js';
import multilingualnamesRouter from './routes/multilingualnames.js';
import { errorHandler } from './middleware/errorHandler.js';
const app = express();
// Middlewares
app.use(cors()); // Habilita CORS para todas las rutas
app.use(morgan('dev')); // Logger de peticiones HTTP
app.use(express.json()); // Middleware para parsear JSON
// Rutas de la API
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
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map