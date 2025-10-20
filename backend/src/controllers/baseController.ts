// backend/controllers/baseController.ts
import type { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { validationResult } from 'express-validator';
import type BaseService from '../services/baseService.js';
import type { GetAllOptions } from '../services/baseService.js';
import { NotFoundError, ValidationError } from '../errors/httpErrors.js';

/**
 * Una función que toma el body de una petición y devuelve una entidad parcial y limpia.
 * Esencial para prevenir la asignación masiva (mass assignment).
 */
type BodySanitizer<T> = (body: unknown) => Partial<T>;

/**
 * Factoría para crear un conjunto de controladores CRUD genéricos para una entidad.
 * @param service La instancia del servicio para la entidad (ej. countriesService).
 * @param entityName El nombre de la entidad en singular (ej. 'Country').
 * @param sanitizer Una función para limpiar y validar el body de la petición.
 */
export function createCrudController<T extends { id: number | string }>(
  service: BaseService<T>,
  entityName: string,
  sanitizer: BodySanitizer<T>
) {
  const getAll = asyncHandler(async (req: Request, res: Response) => {
    const { page = '1', pageSize = '10', orderBy = 'id', orderDir = 'asc', search = null } = req.query;

    const pageNumber = parseInt(page as string, 10) || 1;
    const pageSizeNumber = parseInt(pageSize as string, 10) || 10;

    const options: GetAllOptions = {
      limit: pageSizeNumber,
      offset: (pageNumber - 1) * pageSizeNumber,
      orderBy: orderBy as string,
      orderDir: orderDir as 'asc' | 'desc',
      search: search as string | null,
    };

    const result = await service.getAll(options);
    res.json(result);
  });

  const getById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const entity = await service.getById(id);

    if (!entity) {
      throw new NotFoundError(`${entityName} with id ${id} not found`);
    }
    res.json(entity);
  });

  const create = asyncHandler(async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ValidationError(errors.array());
    }

    const entityData = sanitizer(req.body);
    // Asumiendo que service.create devuelve la entidad creada
    const newEntity = await service.create(entityData);
    res.status(201).json(newEntity);
  });

  const update = asyncHandler(async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ValidationError(errors.array());
    }

    const { id } = req.params;
    const existing = await service.getById(id);
    if (!existing) {
      throw new NotFoundError(`${entityName} with id ${id} not found`);
    }

    const entityData = sanitizer(req.body);
    // Asumiendo que service.update devuelve la entidad actualizada
    const updatedEntity = await service.update(id, entityData);
    res.json(updatedEntity);
  });

  const remove = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await service.remove(id);

    if (result.changes === 0) {
      throw new NotFoundError(`${entityName} with id ${id} not found`);
    }

    res.status(204).send();
  });

  const removeMany = asyncHandler(async (req: Request, res: Response) => {
    const { ids } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
      throw new ValidationError([
        {
          msg: 'Invalid value',
          param: 'ids',
          location: 'body',
          value: ids,
        },
      ]);
    }

    // Asumiendo que service.removeMany existe y devuelve el número de filas afectadas
    const result = await service.removeMany(ids);

    res.json({ message: `${result.changes} ${entityName}(s) deleted successfully.` });
  });

  return { getAll, getById, create, update, delete: remove, removeMany };
}