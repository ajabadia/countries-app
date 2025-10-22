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
        const { page = '1', pageSize = '10', orderBy = 'id', orderDir = 'asc', search = null, searchFields } = req.query;
        const pageNumber = parseInt(page, 10) || 1;
        const pageSizeNumber = parseInt(pageSize, 10) || 10;
        const options = {
            pageSize: pageSizeNumber,
            offset: (pageNumber - 1) * pageSizeNumber,
            orderBy: orderBy,
            orderDir: orderDir,
            search: search,
            // ✅ Sí que los necesitamos, para búsquedas dinámicas desde el frontend.
            // Si no vienen en la query, el servicio usará los suyos por defecto.
            searchFields: Array.isArray(searchFields) ? searchFields :
                typeof searchFields === 'string' ? [searchFields] :
                    undefined
        };
        const { data, total } = await service.getAll(options);
        res.json({
            data,
            total,
            page: pageNumber,
            pageSize: pageSizeNumber,
            totalPages: Math.ceil(total / pageSizeNumber),
            hasNextPage: pageNumber * pageSizeNumber < total,
            hasPrevPage: pageNumber > 1,
        });
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
        // Asumiendo que service.create devuelve la entidad creada
        const newEntity = await service.create(entityData);
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
        // Asumiendo que service.update devuelve la entidad actualizada
        const updatedEntity = await service.update(id, entityData);
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
    const removeMany = asyncHandler(async (req, res) => {
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
//# sourceMappingURL=baseController.js.map