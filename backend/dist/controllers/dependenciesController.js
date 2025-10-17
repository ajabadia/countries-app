// backend/controllers/dependenciesController.ts
import { createCrudController } from './baseController.js';
import dependenciesService from '../services/dependenciesService.js';
// Función para sanitizar el body, extrayendo solo las propiedades permitidas para Dependency.
const sanitizeDependency = (body) => {
    const { parent_id, dependent_id } = body;
    const sanitizedData = {};
    if (parent_id !== undefined)
        sanitizedData.parent_id = parent_id;
    if (dependent_id !== undefined)
        sanitizedData.dependent_id = dependent_id;
    return sanitizedData;
};
const { getAll: getAllDependencies, getById: getDependencyById, create: createDependency, update: updateDependency, delete: deleteDependency, } = createCrudController(dependenciesService, 'Dependency', sanitizeDependency);
export { getAllDependencies, getDependencyById, createDependency, updateDependency, deleteDependency };
//# sourceMappingURL=dependenciesController.js.map