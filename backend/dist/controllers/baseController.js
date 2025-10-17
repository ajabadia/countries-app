import asyncHandler from 'express-async-handler';
import { validationResult } from 'express-validator';
import { NotFoundError, ValidationError } from '../errors/httpErrors.js';
/**
 * Factoría para crear un conjunto de controladores CRUD genéricos para una entidad.
 * @param service La instancia del servicio para la entidad (ej. countriesService).
 * @param entityName El nombre de la entidad en singular (ej. 'Country').
 * @param sanitizer Una función para limpiar y validar el body de la petición.
 */
export function createCrudController(service, entityName, sanitizer) {
    const getAll = asyncHandler(async (req, res) => {
        const { page = '1', pageSize = '10', sort = 'id', order = 'asc', search = null } = req.query;
        const options = {
            limit: parseInt(pageSize, 10),
            offset: (parseInt(page, 10) - 1) * parseInt(pageSize, 10),
            orderBy: sort,
            orderDir: order,
            search: search,
        };
        const result = await service.getAll(options);
        res.json(result);
    });
    const getById = asyncHandler(async (req, res) => {
        const { id } = req.params;
        const entity = await service.getById(id);
        if (!entity) {
            throw new NotFoundError(`${entityName} with id ${id} not found`);
        }
        res.json(entity);
    });
    const create = asyncHandler(async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new ValidationError(errors.array());
        }
        const entityData = sanitizer(req.body);
        const result = await service.create(entityData);
        // Después de crear, obtenemos la entidad completa para devolverla.
        const newEntity = await service.getById(result.lastInsertRowid);
        res.status(201).json(newEntity);
    });
    const update = asyncHandler(async (req, res) => {
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
        await service.update(id, entityData);
        const updatedEntity = await service.getById(id);
        res.json(updatedEntity);
    });
    const remove = asyncHandler(async (req, res) => {
        const { id } = req.params;
        const result = await service.remove(id);
        if (result.changes === 0) {
            throw new NotFoundError(`${entityName} with id ${id} not found`);
        }
        res.status(204).send();
    });
    return { getAll, getById, create, update, delete: remove };
}
//# sourceMappingURL=baseController.js.map