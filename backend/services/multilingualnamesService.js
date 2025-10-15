// backend/services/multilingualnamesService.js
const BaseService = require('./baseService.js');

class MultilingualnamesService extends BaseService {
  constructor() {
    super('multilingualnames');
  }
}

module.exports = new MultilingualnamesService();