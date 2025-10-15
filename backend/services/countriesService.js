// d:/desarrollos/countries2/backend/services/countriesService.js
const db = require('../db/database');

function getAllCountries() {
  const stmt = db.prepare('SELECT * FROM countries');
  return stmt.all();
}

function getCountryById(id) {
  const stmt = db.prepare('SELECT * FROM countries WHERE id = ?');
  return stmt.get(id);
}

function getCountriesCount() {
    const stmt = db.prepare('SELECT COUNT(*) as count FROM countries');
    return stmt.get();
}

module.exports = {
  getAllCountries,
  getCountryById,
  getCountriesCount,
};