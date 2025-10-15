// src/app/app.component.ts

import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // Necesario para <router-outlet>

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule], // Solo importamos RouterModule
  template: '<router-outlet></router-outlet>', // La plantilla solo necesita el router-outlet
  styleUrls: ['./app.component.scss']
})
export class AppComponent {}