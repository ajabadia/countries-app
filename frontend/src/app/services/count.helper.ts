// src/app/utils/count.helper.ts

import { Observable, map, catchError, of } from 'rxjs';
import { CountResponse } from '@services/api-response.model';

/**
 * Interfaz para cualquier servicio que tenga un método `getCount`.
 */
interface CountableService {
  getCount(): Observable<CountResponse>;
}

/**
 * Función de utilidad que toma un servicio "contable" y devuelve un observable con el número total o null en caso de error.
 */
export function getCount(service: CountableService): Observable<number | null> {
  return service.getCount().pipe(
    map((res: CountResponse) => res.total),
    catchError(() => of(null)) // Si falla la petición, devuelve null de forma segura.
  );
}