// src/app/modules/shared/components/header/header.component.ts

import { Component, ChangeDetectionStrategy } from '@angular/core';
import { LogoComponent } from '@shared/components/logo/logo.component'; // ✅ CORRECCIÓN: Usamos el alias @shared

@Component({
    selector: 'app-header',
    // ¡CLAVE! Se convierte a standalone.
    standalone: true,
    // ¡CLAVE! Importamos el LogoComponent para poder usar <app-logo> en la plantilla.
    imports: [
      LogoComponent
    ],
    template: `<app-logo [width]="160"></app-logo>`,
    // No tiene estilos, se puede omitir.
    styles: [],
    // ✅ OPTIMIZACIÓN: OnPush es ideal para componentes contenedores simples.
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {

}