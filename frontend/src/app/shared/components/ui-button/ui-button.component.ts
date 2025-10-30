// File: d:\desarrollos\countries2\frontend\src\app\shared\components\ui-button\ui-button.component.ts | Last Modified: 2025-10-19

import { Component, Input, ChangeDetectionStrategy, HostBinding, ViewChild, ElementRef, AfterContentInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiIconComponent } from '@shared/components/ui-icon/ui-icon.component';
import { UiIconSize, UiIconType } from '@shared/services/icon.service';

// --- Tipos exportables para consistencia en la aplicación ---
/** Define los colores disponibles para el botón, afectando su apariencia. */
export type ButtonColor = 'primary' | 'secondary' | 'danger' | 'success' | 'warning';
/** Define las variantes de estilo del botón (sólido, contorno o fantasma). */
export type ButtonVariant = 'solid' | 'outline' | 'ghost';
/** Define los tamaños predefinidos para el botón. */
export type ButtonSize = 's' | 'm' | 'l';

/**
 * @description
 * Componente de botón altamente configurable que se aplica como directiva a elementos `<button>` o `<a>`.
 * Ofrece una API consistente para controlar el estilo, tamaño, estado (carga, deshabilitado) e iconos.
 *
 * @example
 * <!-- Botón básico -->
 * <button app-ui-button>Click me</button>
 *
 * @example
 * <!-- Botón con color y variante -->
 * <button app-ui-button uiButtonColor="danger" uiButtonVariant="outline">Delete</button>
 *
 * @example
 * <!-- Botón con icono a la izquierda -->
 * <button app-ui-button uiIconName="save" [uiButtonLoading]="isSaving">Save</button>
 *
 * @example
 * <!-- Botón de solo icono (accesible) -->
 * <a app-ui-button uiIconName="settings" uiButtonAriaLabel="Settings"></a>
 *
 * @example
 * <!-- Botón como enlace (<a>) -->
 * <a app-ui-button routerLink="/home">Go Home</a>
 */
@Component({
  selector: 'button[app-ui-button], a[app-ui-button]',
  standalone: true,
  imports: [CommonModule, UiIconComponent],
  templateUrl: './ui-button.component.html',
  styleUrls: ['./ui-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiButtonComponent implements AfterContentInit, OnChanges {
  // --- API Principal del Botón ---
  /** Color principal del botón. */
  @Input({ alias: 'uiButtonColor' }) color: ButtonColor = 'primary';
  /** Variante de estilo (sólido, contorno, etc.). */
  @Input({ alias: 'uiButtonVariant' }) variant: ButtonVariant = 'solid';
  /** Tamaño del botón. */
  @Input({ alias: 'uiButtonSize' }) size: ButtonSize = 'm';
  /** Deshabilita el botón. Acepta `true` o el atributo sin valor. */
  @Input({ alias: 'uiButtonDisabled', transform: (value: boolean | string) => value === '' || value === true }) disabled = false;
  /** Muestra un spinner, oculta el contenido y deshabilita el botón. */
  @Input({ alias: 'uiButtonLoading', transform: (value: boolean | string) => value === '' || value === true }) loading = false;
  /** Hace que el botón ocupe todo el ancho disponible. */
  @Input({ alias: 'uiButtonFullWidth', transform: (value: boolean | string) => value === '' || value === true }) fullWidth = false;
  /** Etiqueta ARIA para accesibilidad, especialmente en botones de solo icono. */
  @Input({ alias: 'uiButtonAriaLabel' }) ariaLabel?: string;

  // --- API para el Icono (Pass-through) ---
  /** Nombre del icono a mostrar. */
  @Input({ alias: 'uiIconName' }) iconName?: string;
  /** Posición del icono respecto al texto. 'only' crea un botón de icono. */
  @Input({ alias: 'uiIconPosition' }) iconPosition: 'left' | 'right' | 'only' = 'left';
  /** Tipo de icono (system, custom). */
  @Input({ alias: 'uiIconType' }) iconType: UiIconType = 'system';
  /** Tamaño del icono. 'inherit' toma el tamaño de la fuente del botón. */
  @Input({ alias: 'uiIconSize' }) iconSize?: UiIconSize | 'inherit' | string;
  /** Color del icono. Por defecto hereda el color del texto del botón. */
  @Input({ alias: 'uiIconColor' }) iconColor?: string;
  /** Clases CSS adicionales para el componente de icono. */
  @Input({ alias: 'uiIconClass' }) iconClass = '';

  // --- Detección de contenido ---
  /** Referencia al contenedor del contenido proyectado (`<ng-content>`). */
  @ViewChild('contentWrapper') private contentWrapper!: ElementRef<HTMLSpanElement>;
  /** Flag interno para saber si el botón tiene contenido de texto. */
  private hasContent = true;

  /**
   * Después de que el contenido se inicializa, verifica si hay texto proyectado.
   * Se usa `setTimeout` para evitar errores `ExpressionChangedAfterItHasBeenCheckedError`.
   */
  ngAfterContentInit(): void {
    setTimeout(() => this.updateHasContent());
  }

  /**
   * Re-evalúa si hay contenido cuando cambian propiedades que podrían afectarlo.
   * Es un fallback, ya que `<ng-content>` no dispara `ngOnChanges` directamente.
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['iconName'] || changes['iconPosition']) {
      this.updateHasContent();
    }
  }

  /**
   * Comprueba el `textContent` del wrapper para determinar si hay texto visible.
   * Actualiza la propiedad `hasContent`.
   */
  private updateHasContent(): void {
    const content = this.contentWrapper?.nativeElement.textContent?.trim() ?? '';
    this.hasContent = content.length > 0;
  }

  // --- Vinculación de clases al Host (Enfoque declarativo) ---
  /** Clase base para todos los botones. */
  @HostBinding('class.ui-button') readonly baseClass = true;

  /** Aplica la clase de color correspondiente basada en el @Input `color`. */
  @HostBinding('class.ui-button--primary') get isPrimary() { return this.color === 'primary'; }
  @HostBinding('class.ui-button--secondary') get isSecondary() { return this.color === 'secondary'; }
  @HostBinding('class.ui-button--danger') get isDanger() { return this.color === 'danger'; }
  @HostBinding('class.ui-button--success') get isSuccess() { return this.color === 'success'; }
  @HostBinding('class.ui-button--warning') get isWarning() { return this.color === 'warning'; }

  /** Aplica la clase de variante correspondiente basada en el @Input `variant`. */
  @HostBinding('class.ui-button--solid') get isSolid() { return this.variant === 'solid'; }
  @HostBinding('class.ui-button--outline') get isOutline() { return this.variant === 'outline'; }
  @HostBinding('class.ui-button--ghost') get isGhost() { return this.variant === 'ghost'; }

  /** Aplica la clase de tamaño correspondiente basada en el @Input `size`. */
  @HostBinding('class.ui-button--s') get isSizeS() { return this.size === 's'; }
  @HostBinding('class.ui-button--m') get isSizeM() { return this.size === 'm'; }
  @HostBinding('class.ui-button--l') get isSizeL() { return this.size === 'l'; }

  /** Aplica clases de estado y modificadores basadas en los @Inputs correspondientes. */
  @HostBinding('class.ui-button--loading') get isLoading() { return this.loading; }
  @HostBinding('class.ui-button--full-width') get isFullWidth() { return this.fullWidth; }
  @HostBinding('class.ui-button--icon-only') get isIconOnly() {
    return this.iconName && (!this.hasContent || this.iconPosition === 'only');
  }

  @HostBinding('attr.disabled')
  /**
   * Vincula el atributo `disabled` al host. El botón se deshabilita si la propiedad
   * `disabled` es `true` o si está en estado de `loading`.
   */
  get isDisabled(): boolean | null {
    return this.disabled || this.loading ? true : null;
  }

  @HostBinding('attr.aria-label')
  /**
   * Asigna un `aria-label` para mejorar la accesibilidad.
   * Usa el `ariaLabel` proporcionado, o el nombre del icono si es un botón de solo icono.
   */
  get finalAriaLabel(): string | undefined {
    return this.ariaLabel || (this.isIconOnly ? this.iconName : undefined);
  }
}