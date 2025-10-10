//app.js
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Importaciones de rutas de conteo
const countriesCountRoute = require('./api/countries/count');
const areasCountRoute = require('./api/areas/count');
const continentsCountRoute = require('./api/continents/count');
const dependenciesCountRoute = require('./api/dependencies/count');
const languagesCountRoute = require('./api/languages/count');
const multilingualnamesCountRoute = require('./api/multilingualnames/count');

// IMPORTANTE: solo uno de estos para countries
const countriesRouter = require('./routes/countries');

// Registro de rutas
app.use('/api/countries/count', countriesCountRoute);
app.use('/api/areas/count', areasCountRoute);
app.use('/api/continents/count', continentsCountRoute);
app.use('/api/dependencies/count', dependenciesCountRoute);
app.use('/api/languages/count', languagesCountRoute);
app.use('/api/multilingualnames/count', multilingualnamesCountRoute);

app.use('/api/countries', countriesRouter); // esto expone GET /api/countries (tabla y detalle)

app.get('/health', (_req, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('API on http://localhost:' + PORT));
