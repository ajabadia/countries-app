// D:/desarrollos/countries2/backend/routes/countries.js

const express = require('express');
const router = express.Router();
// 1. Importamos la función 'body' de la librería
const { body } = require('express-validator'); 
const countriesController = require('../controllers/countriesController');

// Las rutas GET y DELETE no necesitan validación del cuerpo de la petición
router.get('/count', countriesController.getCountriesCount);
router.get('/', countriesController.getAllCountries);
router.get('/:id', countriesController.getCountryById);
router.delete('/:id', countriesController.deleteCountry);

// 2. Añadimos un array de middlewares de validación a las rutas POST y PUT
router.post('/', 
  [ // Este es el array de validadores
    body('id').isLength({ min: 2, max: 2 }).withMessage('El campo "id" es obligatorio y debe tener 2 caracteres.'),
    body('defaultname').notEmpty().withMessage('El campo "defaultname" es obligatorio.'),
    body('alpha2may').isLength({ min: 2, max: 2 }).withMessage('alpha2may debe tener 2 caracteres.'),
    body('alpha3may').isLength({ min: 3, max: 3 }).withMessage('alpha3may debe tener 3 caracteres.'),
    body('numeric').isNumeric().withMessage('El campo "numeric" debe ser un número.'),
  ], 
  countriesController.createCountry // El controlador solo se ejecuta si la validación pasa
);

router.put('/:id', 
  [ // El ID no se valida en el body porque viene de la URL (req.params.id)
    body('defaultname').notEmpty().withMessage('El campo "defaultname" es obligatorio.'),
    body('alpha2may').isLength({ min: 2, max: 2 }).withMessage('alpha2may debe tener 2 caracteres.'),
    body('alpha3may').isLength({ min: 3, max: 3 }).withMessage('alpha3may debe tener 3 caracteres.'),
    body('numeric').isNumeric().withMessage('El campo "numeric" debe ser un número.'),
  ], 
  countriesController.updateCountry
);

module.exports = router;