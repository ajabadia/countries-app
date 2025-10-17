// backend/routes/countries.ts
import { Router } from 'express';
import { body, param } from 'express-validator';
import { getAllCountries, getCountryById, createCountry, updateCountry, deleteCountry, getCountryTranslations } from '../controllers/countriesController.js';
import { protect } from '../middleware/authMiddleware.js';
const router = Router();
// Reglas de validación para la creación de un país.
const countryValidationRules = [
    body('defaultname').notEmpty().withMessage('defaultname is required').isString(),
    body('alpha2may').isLength({ min: 2, max: 2 }).withMessage('alpha2may must be 2 characters'),
    body('alpha3may').isLength({ min: 3, max: 3 }).withMessage('alpha3may must be 3 characters'),
    body('numeric').notEmpty().isString().withMessage('numeric is required'),
];
// Reglas de validación para la actualización (campos opcionales).
const countryUpdateValidationRules = [
    body('defaultname').optional().isString(),
    body('alpha2may').optional().isLength({ min: 2, max: 2 }).withMessage('alpha2may must be 2 characters'),
    body('alpha3may').optional().isLength({ min: 3, max: 3 }).withMessage('alpha3may must be 3 characters'),
    body('numeric').optional().isString(),
    param('id').isString().withMessage('ID must be a string in the URL'),
];
// Definimos las rutas para la entidad 'Country'
// GET /api/countries -> Devuelve todos los países con paginación y filtros.
router.get('/', getAllCountries);
// GET /api/countries/:id/translations -> Devuelve todas las traducciones para un país.
router.get('/:id/translations', param('id').isString(), getCountryTranslations);
// GET /api/countries/:id -> Devuelve un país específico por su ID.
router.get('/:id', param('id').isString(), getCountryById);
// POST /api/countries -> Crea un nuevo país.
router.post('/', protect, countryValidationRules, createCountry);
// PUT /api/countries/:id -> Actualiza un país existente.
router.put('/:id', protect, countryUpdateValidationRules, updateCountry);
// DELETE /api/countries/:id -> Elimina un país.
router.delete('/:id', protect, param('id').isString().withMessage('ID must be a string in the URL'), deleteCountry);
export default router;
//# sourceMappingURL=countries.js.map