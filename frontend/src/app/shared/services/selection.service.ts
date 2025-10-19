// File: d:\desarrollos\countries2\frontend\src\app\shared\services\selection.service.ts | Last Modified: 2025-10-19

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SelectionService<T extends { id: number | string }> {
  private selection = new Set<number | string>();
  private selection$ = new BehaviorSubject<Set<number | string>>(this.selection);

  get selectionChanges(): Observable<Set<number | string>> {
    return this.selection$.asObservable();
  }

  isSelected(item: T): boolean {
    return this.selection.has(item.id);
  }

  toggle(item: T): void {
    if (this.selection.has(item.id)) {
      this.selection.delete(item.id);
    } else {
      this.selection.add(item.id);
    }
    this.selection$.next(this.selection);
  }

  areAllSelected(items: T[]): boolean {
    if (!items || items.length === 0) {
      return false;
    }
    return items.every(item => this.selection.has(item.id));
  }

  toggleAll(items: T[]): void {
    if (this.areAllSelected(items)) {
      // Si todos están seleccionados, los deseleccionamos
      items.forEach(item => this.selection.delete(item.id));
    } else {
      // Si no, seleccionamos todos
      items.forEach(item => this.selection.add(item.id));
    }
    this.selection$.next(this.selection);
  }

  clear(): void {
    this.selection.clear();
    this.selection$.next(this.selection);
  }

  get size(): number {
    return this.selection.size;
  }

  getSelectedIds(): (number | string)[] {
    return Array.from(this.selection);
  }
}