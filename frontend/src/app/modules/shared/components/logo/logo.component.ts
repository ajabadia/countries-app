// src/app/modules/shared/components/logo/logo.component.ts

import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common'; // Necesario para [style.max-width.px]

@Component({
    selector: 'app-logo',
    // ¡CLAVE! Se convierte a standalone.
    standalone: true,
    // ¡CLAVE! Importamos CommonModule para poder usar directivas como [style.xxx] en la plantilla.
    imports: [CommonModule],
    templateUrl: './logo.component.html',
    // No tiene estilos, se puede omitir.
    styleUrls: [],
    // ✅ OPTIMIZACIÓN: OnPush mejora el rendimiento, ya que el componente solo se
    // redibujará si cambian sus inputs.
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogoComponent {
  @Input() src = 'assets/images/Ibercaja-logo-2025.svg';
  @Input() alt = 'Ibercaja Logo';
  @Input() width: string | number = 120;
}