// src/app/modules/shared/models/country.model.ts

export interface Country {
  id: string;
  alpha2may: string;
  alpha3may: string;
  numeric: string;
  defaultname: string;

  // Para acceso dinámico (robustez en la tabla Angular)
  [key: string]: any;
}
