// File: d:\desarrollos\countries2\frontend\src\app\shared\components\ui-search-box\ui-search-box.component.ts | Last Modified: 2025-10-19

import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  OnDestroy,
  OnInit,
  signal,
  effect,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { UiIconComponent } from '@shared/components/ui-icon/ui-icon.component';
import { UiButtonComponent } from '@shared/components/ui-button/ui-button.component';

@Component({
  selector: 'app-ui-search-box',
  standalone: true,
  imports: [CommonModule, UiIconComponent, UiButtonComponent],
  templateUrl: './ui-search-box.component.html',
  styleUrls: ['./ui-search-box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiSearchBoxComponent implements OnInit, OnDestroy {
  // --- Entradas (Inputs) ---
  uiSearchBoxValue = input<string>('');
  uiSearchBoxPlaceholder = input<string>('Buscar...');
  uiSearchBoxDebounceMs = input<number>(300);

  // --- Salidas (Outputs) ---
  uiSearchBoxValueChange = output<string>();

  // --- Estado Interno ---
  currentValue = signal<string>('');
  private searchSubject = new Subject<string>();
  private searchSubscription?: Subscription;

  constructor() {
    // Sincroniza el valor del input con el estado interno cuando cambia desde el exterior.
    effect(() => {
      this.currentValue.set(this.uiSearchBoxValue());
    });
  }

  ngOnInit(): void {
    this.searchSubscription = this.searchSubject
      .pipe(
        debounceTime(this.uiSearchBoxDebounceMs()),
        distinctUntilChanged()
      )
      .subscribe(value => {
        this.uiSearchBoxValueChange.emit(value);
      });
  }

  ngOnDestroy(): void {
    this.searchSubscription?.unsubscribe();
  }

  /**
   * Se llama en cada pulsación de tecla en el input.
   * Actualiza el estado visual inmediatamente y pasa el valor al Subject para el debounce.
   */
  onInputChange(value: string): void {
    this.currentValue.set(value);
    this.searchSubject.next(value);
  }

  /**
   * Limpia el campo de búsqueda y emite el cambio.
   */
  clear(): void {
    this.onInputChange('');
  }
}