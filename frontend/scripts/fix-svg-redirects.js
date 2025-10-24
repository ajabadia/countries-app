// File: d:\desarrollos\countries2\frontend\scripts\fix-svg-redirects.js

const fs = require('fs').promises;
const path = require('path');

// --- Configuración de Rutas ---
// El script asume que se ejecuta desde la carpeta /frontend
const baseDir = path.resolve(__dirname, '../src/assets/icons/flags');
const langFlagsDir = path.join(baseDir, 'language-flags');
const countryFlagsDir = path.join(baseDir, 'circle-flags');

async function fixSvgRedirects() {
  console.log('🚀 Iniciando script para corregir redirecciones en SVGs...');
  console.log(`📂 Directorio de idiomas a escanear: ${langFlagsDir}`);
  console.log(`📂 Directorio de países de origen: ${countryFlagsDir}\n`);

  try {
    const files = await fs.readdir(langFlagsDir);
    let processedCount = 0;
    let skippedCount = 0;

    for (const file of files) {
      if (path.extname(file) !== '.svg') {
        continue; // Ignorar archivos que no son SVG
      }

      const langFilePath = path.join(langFlagsDir, file);
      const content = await fs.readFile(langFilePath, 'utf-8');
      const trimmedContent = content.trim();

      if (trimmedContent.startsWith('../')) {
        // Es un archivo de redirección, ej: ../za.svg
        const targetFileName = trimmedContent.substring(trimmedContent.lastIndexOf('/') + 1);
        const sourceFilePath = path.join(countryFlagsDir, targetFileName);

        try {
          const sourceSvgContent = await fs.readFile(sourceFilePath, 'utf-8');
          await fs.writeFile(langFilePath, sourceSvgContent, 'utf-8');
          console.log(`✅ Actualizado: ${file} -> Contenido copiado desde ${targetFileName}`);
          processedCount++;
        } catch (error) {
          console.error(`❌ Error: No se pudo encontrar el archivo de origen ${sourceFilePath} para ${file}.`);
        }
      } else {
        // Es un SVG válido, lo ignoramos.
        skippedCount++;
      }
    }

    console.log('\n✨ ¡Proceso completado!');
    console.log(`   - Archivos actualizados: ${processedCount}`);
    console.log(`   - Archivos ignorados (ya eran válidos): ${skippedCount}`);

  } catch (error) {
    console.error('💥 Ha ocurrido un error catastrófico al leer los directorios:', error);
    console.error('   Asegúrate de que las rutas en el script son correctas y de que tienes permisos de lectura/escritura.');
  }
}

fixSvgRedirects();