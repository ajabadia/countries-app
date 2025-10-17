// backend/services/dependenciesService.js
const BaseService = require('./baseService.js');

class DependenciesService extends BaseService {
  constructor() {
    super('dependencies');
  }
}

module.exports = new DependenciesService();