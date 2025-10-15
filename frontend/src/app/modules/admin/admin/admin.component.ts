// src/app/modules/admin/admin/admin.component.ts

import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuBarComponent } from '@shared/components/menu-bar/menu-bar.component';
import { ADMIN_ROUTES } from '@config/route-config';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterModule, MenuBarComponent],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  public readonly adminMenuItems = ADMIN_ROUTES;
}