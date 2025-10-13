import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-logo',
    templateUrl: './logo.component.html',
    styleUrls: [],
    standalone: false
})
export class LogoComponent {
  @Input() src = 'assets/images/Ibercaja-logo-2025.svg';
  @Input() alt = 'Ibercaja Logo';
  @Input() width: string | number = 120; // puedes cambiar el valor por defecto
}
