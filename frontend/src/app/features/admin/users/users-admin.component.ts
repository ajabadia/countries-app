import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
// Importamos los componentes de UI necesarios
import { UiHeadingComponent } from '@app/shared/components/ui-heading/ui-heading.component';

@Component({
  selector: 'app-users-admin',
  standalone: true,
  imports: [CommonModule, UiHeadingComponent],
  templateUrl: './users-admin.component.html',
})
export class UsersAdminComponent {
  // Propiedades para el template
  pageTitle = 'Gestión de Usuarios';
}
