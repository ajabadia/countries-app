// src/app/modules/admin/admin/admin.component.ts

import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterModule],
  // ✅ REFACTOR: Este componente ahora solo actúa como un contenedor para las rutas de admin.
  // El layout principal (header, etc.) es gestionado por AppComponent.
  template: '<router-outlet></router-outlet>',
})
export class AdminComponent {}