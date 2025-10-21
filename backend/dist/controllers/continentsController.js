// backend/controllers/continentsController.ts
import { createCrudController } from './baseController.js';
import continentsService from '../services/continentsService.js';
const sanitizeContinent = (body) => {
    const { defaultname } = body;
    const sanitizedData = {};
    if (defaultname !== undefined)
        sanitizedData.defaultname = defaultname;
    return sanitizedData;
};
const { getAll: getAllContinents, getById: getContinentById, create: createContinent, update: updateContinent, delete: deleteContinent, removeMany: deleteManyContinents, } = createCrudController(continentsService, 'Continent', sanitizeContinent);
export { getAllContinents, getContinentById, createContinent, updateContinent, deleteContinent, deleteManyContinents, };
//# sourceMappingURL=continentsController.js.map