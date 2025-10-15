// src/app/services/selection.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Servicio genérico para gestionar la selección de elementos en una lista o tabla.
 * Es reutilizable para cualquier tipo de entidad.
 */
@Injectable({
  // No se provee en 'root' para que cada componente que lo necesite
  // cree su propia instancia y no compartan la selección.
  providedIn: 'any'
})
export class SelectionService<T> {
  private readonly _selected = new BehaviorSubject<T[]>([]);

  // --- Observables públicos para reaccionar a los cambios ---
  public readonly selected$ = this._selected.asObservable();
  public readonly count$ = this.selected$.pipe(map(items => items.length));
  public readonly isEmpty$ = this.count$.pipe(map(count => count === 0));
  public readonly hasOne$ = this.count$.pipe(map(count => count === 1));
  public readonly hasMultiple$ = this.count$.pipe(map(count => count > 1));

  // --- Getters para acceso síncrono ---
  get selected(): T[] { return this._selected.getValue(); }
  get count(): number { return this.selected.length; }
  get first(): T | null { return this.selected[0] || null; }

  // --- Métodos para manipular la selección ---
  public set(items: T[]): void {
    this._selected.next(items);
  }

  public toggle(item: T, getKey: (i: T) => any): void {
    const current = this.selected;
    const key = getKey(item);
    const index = current.findIndex(i => getKey(i) === key);

    index > -1 ? current.splice(index, 1) : current.push(item);
    this.set([...current]);
  }

  public clear(): void {
    this.set([]);
  }
}