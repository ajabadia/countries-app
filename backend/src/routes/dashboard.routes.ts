// File: d:\desarrollos\countries2\backend\src\routes\dashboard.routes.ts | New File

import { Router } from 'express';
import { authenticateToken, authorize } from '../middleware/authMiddleware.js';
import { getStats } from '../controllers/dashboard.controller.js';

const router = Router();

router.route('/').get(authenticateToken, authorize(['admin']), getStats);

export default router;