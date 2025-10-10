const Database = require('better-sqlite3');
let db;
function getDB() {
  if (!db) db = new Database(require('path').join(__dirname, 'countries.db'), { readonly: true });
  return db;
}
module.exports = { getDB };
