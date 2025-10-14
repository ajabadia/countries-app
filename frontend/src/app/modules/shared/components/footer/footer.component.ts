// src/app/modules/shared/components/footer/footer.component.ts

import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CopyrightComponent } from '../copyright/copyright.component'; // Importamos el componente hijo

@Component({
    selector: 'app-footer',
    standalone: true,
    imports: [
      CopyrightComponent // Importamos el componente que usa su plantilla
    ],
    templateUrl: './footer.component.html',
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {

}