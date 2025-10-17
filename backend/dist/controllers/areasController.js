// backend/controllers/areasController.ts
import { createCrudController } from './baseController.js';
import areasService from '../services/areasService.js';
// Función para sanitizar el body, extrayendo solo las propiedades permitidas para Area.
const sanitizeArea = (body) => {
    const { defaultname } = body;
    const sanitizedData = {};
    if (defaultname !== undefined)
        sanitizedData.defaultname = defaultname;
    return sanitizedData;
};
const { getAll: getAllAreas, getById: getAreaById, create: createArea, update: updateArea, delete: deleteArea, } = createCrudController(areasService, 'Area', sanitizeArea);
export { getAllAreas, getAreaById, createArea, updateArea, deleteArea };
//# sourceMappingURL=areasController.js.map