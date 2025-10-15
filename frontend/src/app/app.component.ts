// src/app/app.component.ts

import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // Necesario para <router-outlet>

// ✅ CORRECCIÓN: Importamos los componentes desde su ubicación correcta en 'src/app/layout'.
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {}
