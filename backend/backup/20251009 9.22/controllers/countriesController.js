const { getDB } = require('../db/database');

function list(req, res) {
  const search = req.query.search || '';
  const area = req.query.area;
  const limit = Number(req.query.limit || 20);
  const offset = Number(req.query.offset || 0);
  const lang = req.query.lang || null;

  const db = getDB();
  const params = [];
  let where = '1=1';
  if (search) {
    where += ' AND (c.id LIKE ? OR c.defaultname LIKE ? OR c.alpha2may LIKE ? OR c.alpha3may LIKE ?)';
    params.push('%' + search + '%', '%' + search + '%', '%' + search + '%', '%' + search + '%');
  }
  if (area) {
    where += ' AND EXISTS (SELECT 1 FROM countryareas ca WHERE ca.countryid=c.id AND ca.areaid=?)';
    params.push(area);
  }

  const totalStmt = db.prepare('SELECT COUNT(*) as n FROM countries c WHERE ' + where);
  const total = totalStmt.get(params).n;

  const listSql =
    'SELECT c.id, c.alpha2may as alpha2, c.alpha3may as alpha3, c.numeric, ' +
    'COALESCE(mn.name, c.defaultname) as name ' +
    'FROM countries c ' +
    'LEFT JOIN multilingualnames mn ON mn.entity=\'country\' AND mn.entityid=c.id AND mn.langcode=? ' +
    'WHERE ' + where + ' ' +
    'ORDER BY name ' +
    'LIMIT ? OFFSET ?';

  const rows = db.prepare(listSql).all(lang, ...params, limit, offset);

  res.json({ items: rows, total, limit, offset });
}

function getById(req, res) {
  const id = req.params.id;
  const lang = req.query.lang || null;
  const db = getDB();

  const getSql =
    'SELECT c.id, c.alpha2may as alpha2, c.alpha3may as alpha3, c.numeric, ' +
    'COALESCE(mn.name, c.defaultname) as name ' +
    'FROM countries c ' +
    'LEFT JOIN multilingualnames mn ON mn.entity=\'country\' AND mn.entityid=c.id AND mn.langcode=? ' +
    'WHERE c.id=?';

  const country = db.prepare(getSql).get(lang, id);
  if (!country) return res.status(404).json({ error: 'Not found' });

  const areasSql =
    'SELECT a.id, a.defaultname FROM areas a ' +
    'JOIN countryareas ca ON ca.areaid=a.id ' +
    'WHERE ca.countryid=?';
  country.areas = db.prepare(areasSql).all(id);

  res.json(country);
}

module.exports = { list, getById };
