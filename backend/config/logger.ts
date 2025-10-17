// backend/config/logger.ts

import winston from 'winston';
import path from 'path';
import 'winston-daily-rotate-file'; // Importa el módulo para la rotación de archivos

// Define los niveles de log personalizados para que coincidan con los estándares comunes.
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

// Define los colores para cada nivel, útil para la salida en consola.
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
};
winston.addColors(colors);

// Formato base para los logs.
const baseFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.errors({ stack: true }) // Asegura que el stack de errores se loguee
);

// Formato para la consola: colorido y legible.
const consoleFormat = winston.format.combine(
  baseFormat,
  winston.format.colorize({ all: true }),
  winston.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
);

// Formato para archivos: JSON, ideal para análisis automático.
const fileFormat = winston.format.combine(baseFormat, winston.format.json());

// Define los "transportes" (destinos de los logs).
const transports: winston.transport[] = [
  // Transporte de rotación diaria para los errores.
  new winston.transports.DailyRotateFile({
    filename: 'logs/error-%DATE%.log', // Patrón del nombre de archivo
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true, // Comprime los logs antiguos
    maxSize: '20m', // Rota el archivo si alcanza los 20MB
    maxFiles: '14d', // Conserva los logs de los últimos 14 días
    level: 'error', // Solo logs de nivel 'error'.
  }),
  // Transporte de rotación diaria para todos los logs.
  new winston.transports.DailyRotateFile({
    filename: 'logs/combined-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
  }),
];

// En entornos de no-producción, también mostramos los logs en la consola.
if (process.env.NODE_ENV !== 'production') {
  transports.push(new winston.transports.Console({ format: consoleFormat }));
}

// Crea y exporta la instancia del logger.
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info', // Nivel mínimo de log a procesar.
  levels,
  format: fileFormat, // Formato por defecto para los transportes de archivo.
  transports,
});

export default logger;