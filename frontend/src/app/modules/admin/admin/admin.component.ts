// src/app/modules/admin/admin/admin.component.ts

import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // Necesario para <router-outlet>
import { SharedModule } from '../../shared/shared.module'; // Para usar <app-menu-bar>, <app-footer>, etc.

@Component({
  selector: 'app-admin',
  // --- REFACTORIZACIÓN A STANDALONE ---
  standalone: true,
  imports: [
    RouterModule,
    SharedModule
  ],
  // ------------------------------------
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent {}