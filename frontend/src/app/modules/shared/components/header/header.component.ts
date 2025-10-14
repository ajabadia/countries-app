// src/app/modules/shared/components/header/header.component.ts

import { Component, ChangeDetectionStrategy } from '@angular/core';
import { LogoComponent } from '../logo/logo.component'; // Importamos el componente hijo

@Component({
    selector: 'app-header',
    // ¡CLAVE! Se convierte a standalone.
    standalone: true,
    // ¡CLAVE! Importamos el LogoComponent para poder usar <app-logo> en la plantilla.
    imports: [
      LogoComponent
    ],
    templateUrl: './header.component.html',
    // No tiene estilos, se puede omitir.
    styles: [],
    // ✅ OPTIMIZACIÓN: OnPush es ideal para componentes contenedores simples.
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {

}