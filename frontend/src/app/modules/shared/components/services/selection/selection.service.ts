// src/app/modules/shared/components/services/selection/selection.service.ts

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs'; // <-- 1. Importamos Subject

// T extiende un objeto que debe tener una propiedad 'id' de cualquier tipo.
@Injectable() // ✅ CORREGIDO: Lo quitamos de 'root' para que cada página tenga el suyo.
export class SelectionService<T extends { id: any }> {
  private selectedMap = new Map<string | number, T>();
  private lastIndex: number | null = null;
  public focusedIndex: number = 0;

  /** ✅ NUEVO: Subject para notificar cambios en la selección. */
  private selectionChangedSource = new Subject<void>();
  public selectionChanged = this.selectionChangedSource.asObservable();

  get selectedArray(): T[] {
    return Array.from(this.selectedMap.values());
  }
  
  /** ✅ NUEVO: Getter para obtener el número de elementos seleccionados. */
  get count(): number {
    return this.selectedMap.size;
  }

  select(row: T, list: T[], event?: MouseEvent | { shiftKey?: boolean }) {
    const idx = list.findIndex(x => x.id === row.id);
    if (event && event.shiftKey && this.lastIndex !== null) {
      this.handleRangeSelection(list, idx);
    } else {
      this.toggle(row);
    }
    if (!(event && event.shiftKey)) {
      this.lastIndex = idx;
    }
    this.selectionChangedSource.next(); // Notificamos el cambio
  }
  
  toggle(row: T) {
    if (this.selectedMap.has(row.id)) {
      this.selectedMap.delete(row.id);
    } else {
      this.selectedMap.set(row.id, row);
    }
    this.selectionChangedSource.next(); // Notificamos el cambio
  }

  private handleRangeSelection(list: T[], currentIdx: number) {
    if (this.lastIndex === null) return;
    const start = Math.min(this.lastIndex, currentIdx);
    const end = Math.max(this.lastIndex, currentIdx);
    for (let i = start; i <= end; i++) {
      this.selectedMap.set(list[i].id, list[i]);
    }
    this.focusedIndex = currentIdx;
  }

  clear() { 
    this.selectedMap.clear(); 
    this.selectionChangedSource.next(); // Notificamos el cambio
  }

  selectAll(list: T[]) { 
    this.selectedMap.clear();
    list.forEach(item => this.selectedMap.set(item.id, item));
    this.selectionChangedSource.next(); // Notificamos el cambio
  }
  
  isSelected(id: string | number): boolean { 
    return this.selectedMap.has(id); 
  }
  
  allSelected(list: T[]): boolean { 
    return list.length > 0 && list.every(item => this.selectedMap.has(item.id)); 
  }
  
  someSelected(list: T[]): boolean { 
    return this.count > 0 && !this.allSelected(list);
  }
  
  get anySelected(): boolean { 
    return this.count > 0; 
  }
}