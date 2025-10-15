import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiHeadingComponent } from '@shared/components/ui-heading/ui-heading.component';
import { UiIconComponent } from '@shared/components/ui-icon/ui-icon.component';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [
    CommonModule,
    UiHeadingComponent,
    UiIconComponent, // ✅ Importamos el componente de icono
  ],
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent {}