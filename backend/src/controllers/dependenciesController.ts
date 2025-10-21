// backend/controllers/dependenciesController.ts
import { createCrudController } from './baseController.js';
import dependenciesService from '../services/dependenciesService.js';
import type { Dependency } from '../types/dependency.types.js';

// Función para sanitizar el body, extrayendo solo las propiedades permitidas para Dependency.
const sanitizeDependency = (body: any): Partial<Dependency> => {
  const { parent_id, dependent_id } = body;
  const sanitizedData: Partial<Dependency> = {};
  if (parent_id !== undefined) sanitizedData.parent_id = parent_id;
  if (dependent_id !== undefined) sanitizedData.dependent_id = dependent_id;
  return sanitizedData;
};

const {
  getAll: getAllDependencies,
  getById: getDependencyById,
  create: createDependency,
  update: updateDependency,
  delete: deleteDependency,
  removeMany: deleteManyDependencies,
} = createCrudController(dependenciesService, 'Dependency', sanitizeDependency);

export { getAllDependencies, getDependencyById, createDependency, updateDependency, deleteDependency, deleteManyDependencies };