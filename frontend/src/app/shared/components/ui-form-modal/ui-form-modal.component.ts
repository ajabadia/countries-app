// File: d:\desarrollos\countries2\frontend\src\app\shared\components\ui-form-modal\ui-form-modal.component.ts | Last Modified: 2025-10-19

import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, signal, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';

// Dependencias de componentes de UI compartidos
import { UiHeadingComponent } from '@shared/components/ui-heading/ui-heading.component';
import { UiButtonComponent } from '@shared/components/ui-button/ui-button.component';

// Tipos de variantes para el modal
export type ModalVariant = 'info' | 'success' | 'error' | 'warning' | 'default';
export type ModalMode = 'form' | 'confirm';

@Component({
  selector: 'app-ui-form-modal',
  standalone: true,
  imports: [CommonModule, UiHeadingComponent, UiButtonComponent],
  templateUrl: './ui-form-modal.component.html',
  styleUrls: ['./ui-form-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiFormModalComponent implements OnChanges, OnDestroy {
  // --- Entradas (Inputs) Propias del Modal ---
  @Input({ alias: 'uiFormModalVisible' }) isVisible = false;
  @Input({ alias: 'uiFormModalTitle' }) title = 'Formulario';
  @Input({ alias: 'uiFormModalVariant' }) variant: ModalVariant = 'default';
  @Input({ alias: 'uiFormModalIsLoading' }) isLoading = false;
  @Input({ alias: 'uiFormModalMode' }) mode: ModalMode = 'form';
  @Input({ alias: 'uiFormModalConfirmText' }) confirmText = 'Guardar';

  private formStatusSubscription?: Subscription;

  // Signal para el estado de validez del formulario.
  isFormInvalid = signal(true);

  // Hacemos que el form sea un setter para reaccionar a los cambios.
  private _form?: FormGroup;
  @Input({ alias: 'uiFormModalForm' })
  set form(form: FormGroup | undefined) {
    this._form = form;
    this.subscribeToFormStatus();
  }
  get form(): FormGroup | undefined {
    return this._form;
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Si recibimos un nuevo formulario, nos suscribimos a sus cambios de estado.
    if (changes['form']) {
      this.formStatusSubscription?.unsubscribe();
      if (this.form) {
        // Si hay un formulario, basamos la validez en su estado.
        this.formStatusSubscription = this.form.statusChanges.pipe(
          startWith(this.form.status)
        ).subscribe(status => {
          this.isFormInvalid.set(status !== 'VALID');
        });
      } else {
        // Si no hay formulario (ej. modal de confirmación), el botón no debe estar deshabilitado por invalidez.
        this.isFormInvalid.set(false);
      }
    }
  }

  private subscribeToFormStatus(): void {
    this.formStatusSubscription?.unsubscribe();
    if (this.form) {
      this.formStatusSubscription = this.form.statusChanges.pipe(
        startWith(this.form.status)
      ).subscribe(status => {
        this.isFormInvalid.set(status !== 'VALID');
      });
    } else {
      this.isFormInvalid.set(false);
    }
  }

  ngOnDestroy(): void {
    this.formStatusSubscription?.unsubscribe();
  }

  // --- Entradas de "Pass-through" para componentes hijos ---
  @Input({ alias: 'uiHeadingIconName' }) headingIconName?: string;

  // --- Salidas (Outputs) del componente ---
  @Output('uiFormModalClose') close = new EventEmitter<void>();
  @Output('uiFormModalSave') save = new EventEmitter<void>();

  get iconName(): string {
    const iconMap: Record<ModalVariant, string> = {
      info: 'icon-info-circle',
      success: 'icon-success',
      error: 'icon-error',
      warning: 'icon-warning',
      default: 'icon-pen',
    };
    return iconMap[this.variant];
  }

  onClose(): void {
    this.close.emit();
  }

  onSave(): void {
    // Marcamos todos los campos como "tocados" para que se muestren los errores de validación al intentar guardar.
    if (this.form) {
      this.form.markAllAsTouched();
    }
    this.save.emit();
  }
}