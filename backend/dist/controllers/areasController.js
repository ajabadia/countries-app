// backend/controllers/areasController.ts
import { createCrudController } from './baseController.js';
import areasService from '../services/areasService.js';
// Función para sanitizar el body, extrayendo solo las propiedades permitidas para Area.
const sanitizeArea = (body) => {
    const { id, defaultname } = body;
    const sanitizedData = {};
    if (id !== undefined)
        sanitizedData.id = id;
    if (defaultname !== undefined)
        sanitizedData.defaultname = defaultname;
    return sanitizedData;
};
const { getAll: getAllAreas, getById: getAreaById, create: createArea, update: updateArea, delete: deleteArea, removeMany: deleteManyAreas, } = createCrudController(areasService, 'Area', sanitizeArea);
export { getAllAreas, getAreaById, createArea, updateArea, deleteArea, deleteManyAreas };
//# sourceMappingURL=areasController.js.map