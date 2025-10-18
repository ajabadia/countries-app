// src/app/modules/public/public/public.component.ts

import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuBarComponent } from '@shared/components/menu-bar/menu-bar.component';
import { PUBLIC_ROUTES } from '@config/route-config';

@Component({
  selector: 'app-public',
  standalone: true,
  imports: [RouterModule, MenuBarComponent],
  templateUrl: './public.component.html',
})
export class PublicComponent {
  public readonly publicMenuItems = PUBLIC_ROUTES;
}