# setup_backend.ps1 (fix cadenas JS)
$ErrorActionPreference = "Stop"

function Run-NpmLine {
  param([string]$Line)
  cmd /c "npm $Line"
}

Write-Host "== 1) Creando estructura de carpetas ==" -ForegroundColor Cyan
New-Item -ItemType Directory -Force -Path backend, backend\db, backend\routes, backend\controllers, backend\middleware | Out-Null

Write-Host "== 2) Inicializando proyecto Node y dependencias ==" -ForegroundColor Cyan
Set-Location backend
if (-not (Test-Path package.json)) { Run-NpmLine "init -y" | Out-Null }
Run-NpmLine "install express better-sqlite3 cors morgan"
Run-NpmLine "install -D nodemon"
Run-NpmLine "pkg set scripts.start=""node app.js"""
Run-NpmLine "pkg set scripts.dev=""nodemon app.js"""
"PORT=3000" | Set-Content -Path .env -Encoding UTF8

Write-Host "== 3) Moviendo countries.db a backend\db ==" -ForegroundColor Cyan
Set-Location ..
if (Test-Path .\countries.db) {
  Move-Item -Force -Path .\countries.db -Destination .\backend\db\countries.db
  Write-Host "countries.db movida a backend\db\countries.db" -ForegroundColor Green
} else {
  Write-Warning "No se encontró countries.db en la raíz; cópiala aquí y reejecuta si falla la verificación."
}
Set-Location backend

Write-Host "== 4) Creando archivos de código ==" -ForegroundColor Cyan

@'
const Database = require('better-sqlite3');
let db;
function getDB() {
  if (!db) db = new Database(require('path').join(__dirname, 'countries.db'), { readonly: true });
  return db;
}
module.exports = { getDB };
'@ | Set-Content -Path .\db\database.js -Encoding UTF8

@'
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
'@ | Set-Content -Path .\controllers\countriesController.js -Encoding UTF8

@'
const { getDB } = require('../db/database');

function list(req, res) {
  const db = getDB();
  const rows = db.prepare('SELECT id, defaultname FROM areas ORDER BY id').all();
  res.json(rows);
}

module.exports = { list };
'@ | Set-Content -Path .\controllers\areasController.js -Encoding UTF8

@'
const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/countriesController');

router.get('/', ctrl.list);
router.get('/:id', ctrl.getById);

module.exports = router;
'@ | Set-Content -Path .\routes\countries.js -Encoding UTF8

@'
const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/areasController');

router.get('/', ctrl.list);

module.exports = router;
'@ | Set-Content -Path .\routes\areas.js -Encoding UTF8

@'
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/countries', require('./routes/countries'));
app.use('/api/areas', require('./routes/areas'));

app.get('/health', (_req,res)=>res.json({ ok:true }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>console.log('API on http://localhost:'+PORT));
'@ | Set-Content -Path .\app.js -Encoding UTF8

if (-not (Test-Path .\middleware\auth.js)) { "" | Set-Content -Path .\middleware\auth.js -Encoding UTF8 }

Write-Host "== 5) Verificando countries.db ==" -ForegroundColor Cyan
if (Test-Path .\db\countries.db) {
  Write-Host "OK: DB encontrada." -ForegroundColor Green
} else {
  Write-Warning "Falta backend\db\countries.db; copia countries.db a la raíz y vuelve a ejecutar el script."
}

Write-Host "== 6) Arrancando backend con nodemon ==" -ForegroundColor Cyan
Run-NpmLine "run dev"
