import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `<p>Panel de Administración</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminDashboardComponent {}