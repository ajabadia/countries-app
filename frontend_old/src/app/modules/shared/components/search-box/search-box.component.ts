// src/app/modules/shared/components/search-box/search-box.component.ts

import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { UiIconComponent } from '../ui-icon/ui-icon.component';

@Component({
  selector: 'app-search-box',
  // --- REFACTORIZACIÓN A STANDALONE ---
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    UiIconComponent, // Añadido para usar los iconos estandarizados
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // ------------------------------------
  // ✅ MEJORA: Plantilla inline usando app-ui-icon y adaptada para el debounce.
  template: `
    <div class="search-box-wrapper">
      <app-ui-icon name="search" type="system" class="icon-search"></app-ui-icon>
      <input
        type="text"
        [ngModel]="value"
        (ngModelChange)="onInputChange($event)"
        [placeholder]="placeholder"
        class="search-input"
        aria-label="Search"
      />
      @if (value) {
        <button (click)="clear()" class="btn-clear" aria-label="Clear search">
          <app-ui-icon name="x" type="system"></app-ui-icon>
        </button>
      }
    </div>
  `,
  styleUrls: ['./search-box.component.scss'],
})
export class SearchBoxComponent implements OnInit, OnDestroy {
  @Input() placeholder: string = 'Buscar...';
  @Input() debounceMs: number = 300; // Tiempo de espera en milisegundos.

  // Usamos getter y setter para interceptar los cambios de valor.
  private _value: string = '';
  @Input()
  get value(): string {
    return this._value;
  }
  set value(val: string) {
    if (this._value !== val) {
      this._value = val;
      this.valueChange.emit(this._value);
    }
  }

  @Output() valueChange = new EventEmitter<string>();

  /**
   * MEJORA DE RENDIMIENTO: Subject y Subscription para implementar el "debounce".
   * Esto evita emitir eventos en cada pulsación de tecla.
   */
  private searchSubject = new Subject<string>();
  private searchSubscription?: Subscription;

  ngOnInit(): void {
    this.searchSubscription = this.searchSubject.pipe(
      debounceTime(this.debounceMs), // Espera X ms después de la última pulsación.
      distinctUntilChanged() // Solo emite si el valor realmente ha cambiado.
    ).subscribe(newValue => {
      this.value = newValue; // Actualiza el valor y emite el evento.
    });
  }

  /**
   * Limpia la suscripción para evitar fugas de memoria cuando el componente se destruye.
   */
  ngOnDestroy(): void {
    this.searchSubscription?.unsubscribe();
  }

  /**
   * Este método se llama en el evento (input) del template.
   * En lugar de emitir directamente, pasa el valor al Subject.
   */
  onInputChange(newValue: string): void {
    this.searchSubject.next(newValue ?? '');
  }

  /**
   * Limpia el campo de búsqueda y emite el cambio inmediatamente.
   */
  clear(): void {
    this.searchSubject.next('');
  }
}