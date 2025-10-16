import { Component, Input, HostListener, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { UiIconComponent, UiIconType } from '@shared/components/ui-icon/ui-icon.component'; // Asumiendo que ui-icon está en shared
import { ButtonSize } from '@shared/components/ui-button/ui-button.component'; // Reutilizamos el tipo de tamaño del botón para consistencia

@Component({
  selector: 'app-ui-stat-card',
  standalone: true,
  imports: [UiIconComponent],
  templateUrl: './ui-stat-card.component.html',
  styleUrls: ['./ui-stat-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UiStatCardComponent {
  @Input() label!: string;
  @Input() value!: string | number;
  
  /** Nombre del icono a mostrar (sin extensión). */
  @Input() name?: string;
  
  /** Tipo de icono, según lo definido en IconService. */
  @Input() iconType: UiIconType = 'system';
  
  /** Color del icono, en formato CSS (ej: '#10416a' o 'var(--color-primary)'). */
  @Input() iconColor?: string;

  /** Tamaño del icono, usando el diccionario de datos común ('xs', 's', 'm', 'l', 'xl'). */
  @Input() iconSize: ButtonSize = 'xl';
  
  /** Ruta de detalle a la que navegar al hacer clic. */
  @Input() detailRoute?: string;

  isActive = false;

  constructor(private router: Router) {}

  /** Acción navegable al hacer click en la tarjeta */
  onClick(): void {
    if (this.detailRoute) {
      this.router.navigate([this.detailRoute]);
    }
  }
  /** Teclado: enter y espacio disparan onClick */
  @HostListener('keydown.enter')
  @HostListener('keydown.space')
  onKeydown() { this.onClick(); }
}
