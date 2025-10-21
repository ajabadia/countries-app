// backend/src/routes/users.ts

import { Router } from 'express';
import { getAllUsers, getUserById } from '../controllers/usersController.js';

const router = Router();

router.get('/', getAllUsers);
router.get('/:id', getUserById);
// Por seguridad, no expondremos rutas para crear, actualizar o borrar usuarios directamente aquí.
// Esas acciones deberían ser manejadas por rutas de administración específicas y protegidas.

export default router;