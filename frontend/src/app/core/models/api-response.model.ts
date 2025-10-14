// src/app/core/models/api-response.model.ts

/**
 * Define la estructura estándar para las respuestas de la API que devuelven listados.
 */
export interface ApiResponse<T> {
  data: T[];
  total: number;
  // ✅ CORREGIDO: Añadimos las propiedades que usa el paginador.
  totalPages: number;
  currentPage: number;
}