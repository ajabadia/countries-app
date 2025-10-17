// backend/services/areasService.js
const BaseService = require('./baseService');

class AreasService extends BaseService {
  constructor() {
    super('areas');
  }
}

module.exports = new AreasService();