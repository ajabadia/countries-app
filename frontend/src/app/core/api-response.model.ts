// src/app/core/models/api-response.model.ts

/**
 * @interface ApiResponse
 * Define la estructura estándar para las respuestas de la API que devuelven listados.
 * Usar un tipo genérico <T> hace esta interfaz reutilizable para cualquier tipo de dato (países, continentes, etc.).
 */
export interface ApiResponse<T> {
  data: T[];  // Un array con los datos solicitados (ej. una lista de países).
  total: number; // El número total de registros disponibles en la base de datos para esa consulta.
}