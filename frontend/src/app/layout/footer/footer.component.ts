// src/app/modules/shared/components/footer/footer.component.ts

import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CopyrightComponent } from '@shared/components/copyright/copyright.component'; // ✅ CORRECCIÓN: Usamos el alias @shared

@Component({
    selector: 'app-footer',
    standalone: true,
    imports: [
      CopyrightComponent // Importamos el componente que usa su plantilla
    ],
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {

}