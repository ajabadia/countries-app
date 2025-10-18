// src/app/services/api-response.model.ts

/**
 * Interfaz genérica para respuestas de API que devuelven una lista de datos.
 * Esta es la estructura unificada que devuelve el backend.
 */
export interface ApiResponse<T> {
  data: T[];
  total: number;
}