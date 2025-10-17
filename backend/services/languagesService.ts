// backend/services/languagesService.ts
import BaseService from './baseService.js';
import type { Language } from '../types/language.types.js';

/**
 * Servicio para la entidad 'Language'.
 * Hereda toda la lógica CRUD de BaseService.
 */
class LanguagesService extends BaseService<Language> {
  constructor() {
    super('languages', ['name']);
  }
}

export default new LanguagesService();