import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SelectionService<T extends { id: string }> {
  public selected: T[] = [];
  private lastIndex: number | null = null;
  public focusedIndex: number = 0;

  select(row: T, list: T[], event?: MouseEvent | { shiftKey?: boolean }) {
    const idx = list.findIndex(x => x.id === row.id);

    if (event && event.shiftKey && this.lastIndex !== null) {
      // Shift: rango
      const s = Math.min(this.lastIndex, idx);
      const e = Math.max(this.lastIndex, idx);
      for (let i = s; i <= e; i++) {
        const item = list[i];
        if (!this.selected.some(sel => sel.id === item.id)) {
          this.selected = [...this.selected, item];
        }
      }
    } else {
      // Toggle individual
      const i = this.selected.findIndex(sel => sel.id === row.id);
      if (i !== -1) {
        this.selected.splice(i, 1);
        this.selected = [...this.selected];
      } else {
        this.selected = [...this.selected, row];
      }
      this.lastIndex = idx;
      this.focusedIndex = idx;
    }
  }

  clear() { this.selected = []; }
  selectAll(list: T[]) { this.selected = [...list]; }
  moveFocus(list: T[], step: number) {
    this.focusedIndex = Math.max(0, Math.min(list.length - 1, this.focusedIndex + step));
  }
  isSelected(id: string) { return this.selected.some(x => x.id === id); }
  get allSelected() { return (list: T[]) => this.selected.length === list.length; }
  get someSelected() { return (list: T[]) => this.selected.length > 1 && this.selected.length < list.length; }
  get anySelected() { return this.selected.length > 0; }

  keyboardHandler(event: KeyboardEvent, list: T[]) {
    if (event.key === 'ArrowDown') { this.moveFocus(list, +1); event.preventDefault(); }
    if (event.key === 'ArrowUp')   { this.moveFocus(list, -1); event.preventDefault(); }
    if (event.key === ' ' || event.key.toLowerCase() === 'space') {
      const row = list[this.focusedIndex];
      this.select(row, list, event);
      event.preventDefault();
    }
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'a') {
      this.selectAll(list); event.preventDefault();
    }
  }
}
