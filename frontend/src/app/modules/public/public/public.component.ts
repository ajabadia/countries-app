// src/app/modules/public/public/public.component.ts

import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // Para <router-outlet>
import { SharedModule } from '../../shared/shared.module'; // Para <app-menu-bar>

@Component({
  selector: 'app-public',
  // --- REFACTORIZACIÓN A STANDALONE ---
  standalone: true,
  imports: [
    RouterModule,
    SharedModule
  ],
  // ------------------------------------
  templateUrl: './public.component.html',
  // No tiene estilos propios, podemos quitar styleUrls
})
export class PublicComponent {}