
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-copyright',
  templateUrl: './copyright.component.html',
  styleUrls: []
})
export class CopyrightComponent {
  @Input() text: string = '(c) Alejandro Abadía';
}
