// backend/services/continentsService.js
const BaseService = require('./baseService');

class ContinentsService extends BaseService {
  constructor() {
    super('continents');
  }
}

module.exports = new ContinentsService();