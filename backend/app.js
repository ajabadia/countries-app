// app.js

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routers RESTful de cada entidad (puedes crear más según tu estructura)
app.use('/api/countries', require('./routes/countries'));
app.use('/api/areas', require('./routes/areas'));
app.use('/api/continents', require('./routes/continents'));
app.use('/api/dependencies', require('./routes/dependencies'));
app.use('/api/languages', require('./routes/languages'));
app.use('/api/multilingualnames', require('./routes/multilingualnames'));

// Endpoint de salud
app.get('/health', (_req, res) => res.json({ ok: true }));

// Arranque del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('API on http://localhost:' + PORT));
