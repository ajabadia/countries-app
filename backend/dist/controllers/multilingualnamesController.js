// backend/controllers/multilingualnamesController.ts
import { createCrudController } from './baseController.js';
import multilingualnamesService from '../services/multilingualnamesService.js';
// Función para sanitizar el body, extrayendo solo las propiedades permitidas.
const sanitizeMultilingualName = (body) => {
    const { entity_id, language, value, type } = body;
    const sanitizedData = {};
    if (entity_id !== undefined)
        sanitizedData.entity_id = entity_id;
    if (language !== undefined)
        sanitizedData.language = language;
    if (value !== undefined)
        sanitizedData.value = value;
    if (type !== undefined)
        sanitizedData.type = type;
    return sanitizedData;
};
const { getAll: getAllMultilingualNames, getById: getMultilingualNameById, create: createMultilingualName, update: updateMultilingualName, delete: deleteMultilingualName, } = createCrudController(multilingualnamesService, 'MultilingualName', sanitizeMultilingualName);
export { getAllMultilingualNames, getMultilingualNameById, createMultilingualName, updateMultilingualName, deleteMultilingualName, };
//# sourceMappingURL=multilingualnamesController.js.map