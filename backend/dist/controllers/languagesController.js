// backend/controllers/languagesController.ts
import { createCrudController } from './baseController.js';
import languagesService from '../services/languagesService.js';
const sanitizeLanguage = (body) => {
    const { name, active } = body;
    const sanitizedData = {};
    if (name !== undefined)
        sanitizedData.name = name;
    if (active !== undefined)
        sanitizedData.active = active;
    return sanitizedData;
};
const { getAll: getAllLanguages, getById: getLanguageById, create: createLanguage, update: updateLanguage, delete: deleteLanguage, removeMany: deleteManyLanguages, } = createCrudController(languagesService, 'Language', sanitizeLanguage);
export { getAllLanguages, getLanguageById, createLanguage, updateLanguage, deleteLanguage, deleteManyLanguages, };
//# sourceMappingURL=languagesController.js.map