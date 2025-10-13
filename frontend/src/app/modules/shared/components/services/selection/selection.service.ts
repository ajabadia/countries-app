// src/app/modules/shared/components/services/selection/selection.service.ts
import { Injectable } from '@angular/core';

// T extiende un objeto que debe tener una propiedad 'id' de cualquier tipo.
@Injectable({
  providedIn: 'root'
})
export class SelectionService<T extends { id: any }> {
  // Almacenamiento optimizado: Map<ID, Objeto T>
  private selectedMap = new Map<string | number, T>();
  private lastIndex: number | null = null;
  public focusedIndex: number = 0;

  /**
   * Devuelve los elementos seleccionados como un array (para el consumo del componente).
   * La selección real se gestiona en el Map.
   */
  get selectedArray(): T[] {
    return Array.from(this.selectedMap.values());
  }
  
  // ===============================================
  // MANEJO DE SELECCIÓN PRINCIPAL
  // ===============================================

  /**
   * Maneja la selección individual y de rango (Shift+Click).
   */
  select(row: T, list: T[], event?: MouseEvent | { shiftKey?: boolean }) {
    const idx = list.findIndex(x => x.id === row.id);

    if (event && event.shiftKey && this.lastIndex !== null) {
      // 1. Selección de rango (Shift+Click)
      this.handleRangeSelection(list, idx);
    } else {
      // 2. Toggle individual (Click simple)
      this.toggle(row);
    }
    
    // Siempre actualiza el último índice y el foco si es una selección simple
    if (!event || !event.shiftKey) {
        this.lastIndex = idx;
        this.focusedIndex = idx;
    }
  }
  
  /**
   * Alterna el estado de selección de una fila.
   * Optimizado para Map: O(1)
   */
  toggle(row: T): void {
    if (this.selectedMap.has(row.id)) {
      this.selectedMap.delete(row.id);
    } else {
      this.selectedMap.set(row.id, row);
    }
  }
  
  /**
   * Lógica de selección de rango (solo llamado internamente por select()).
   */
  private handleRangeSelection(list: T[], currentIdx: number): void {
      if (this.lastIndex === null) return;

      const [start, end] = [
          Math.min(this.lastIndex, currentIdx), 
          Math.max(this.lastIndex, currentIdx)
      ];
      
      // Itera solo sobre el rango afectado
      for (let i = start; i <= end; i++) {
          this.selectedMap.set(list[i].id, list[i]);
      }
      
      this.focusedIndex = currentIdx;
  }
  
  // ===============================================
  // UTILIDADES
  // ===============================================

  /** Limpia todas las selecciones. */
  clear() { 
    this.selectedMap.clear(); 
  }

  /** Selecciona todos los elementos de la lista actual. */
  selectAll(list: T[]) { 
    this.selectedMap.clear();
    list.forEach(item => this.selectedMap.set(item.id, item));
  }
  
  /** * Verifica si un elemento está seleccionado. 
   * Optimizado para Map: O(1)
   */
  isSelected(id: string | number): boolean { 
    return this.selectedMap.has(id); 
  }
  
  // --- Estados de la selección (consumidos por el componente Table) ---

  /** True si todos los elementos de la lista visible están seleccionados. */
  allSelected(list: T[]): boolean { 
      return list.length > 0 && list.every(item => this.selectedMap.has(item.id)); 
  }
  
  /** True si algunos, pero no todos, están seleccionados. */
  someSelected(list: T[]): boolean { 
      return this.selectedMap.size > 0 && !this.allSelected(list);
  }
  
  /** True si hay al menos una selección. */
  get anySelected(): boolean { 
      return this.selectedMap.size > 0; 
  }

  // --- Accesibilidad/Navegación por teclado ---
  moveFocus(list: T[], step: number) {
    this.focusedIndex = Math.max(0, Math.min(list.length - 1, this.focusedIndex + step));
  }

}
