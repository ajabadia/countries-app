// src/app/models/api-response.model.ts

/**
 * Interfaz genérica para respuestas de API que devuelven una lista de datos.
 * Esta es la estructura que espera el componente BaseAdminComponent.
 */
export interface ApiResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}

/**
 * Interfaz para respuestas de API que solo devuelven un conteo total.
 */
export interface CountResponse {
  total: number;
}