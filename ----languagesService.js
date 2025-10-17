// backend/services/languagesService.js
const BaseService = require('./baseService');

class LanguagesService extends BaseService {
  constructor() {
    super('languages');
  }
}

module.exports = new LanguagesService();