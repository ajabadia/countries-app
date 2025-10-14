// src/app/modules/public/pages/landing-page/landing-page.component.ts

import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module'; // Para <app-ui-heading>

@Component({
  selector: 'app-landing-page',
  // --- REFACTORIZACIÓN A STANDALONE ---
  standalone: true,
  imports: [
    SharedModule
  ],
  // ------------------------------------
  templateUrl: './landing-page.component.html',
})
export class LandingPageComponent {}