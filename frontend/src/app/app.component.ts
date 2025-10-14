// src/app/app.component.ts

import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // Necesario para <router-outlet>
import { SharedModule } from './modules/shared/shared.module'; // Para usar los componentes compartidos

@Component({
  selector: 'app-root',
  // --- REFACTORIZACIÓN A STANDALONE ---
  standalone: true,
  imports: [
    RouterModule, // Importa las directivas del router
    SharedModule  // Importa todos nuestros componentes de UI
  ],
  // ------------------------------------
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Países del Mundo'; // Un título más descriptivo
}