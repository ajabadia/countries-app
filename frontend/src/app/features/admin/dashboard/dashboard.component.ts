import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService, type Stat } from './dashboard.service';
import { UiStatCardComponent } from '../../../shared/components/ui-stat-card/ui-stat-card.component';
import { LayoutService } from '@core/services/layout.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, UiStatCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  private readonly dashboardService = inject(DashboardService);
  private readonly layoutService = inject(LayoutService);

  // Signal para almacenar las estadísticas. Inicialmente vacío.
  public stats = signal<Stat[]>([]);

  constructor() {
    this.layoutService.setPageTitle('Dashboard');
    this.dashboardService.getStats().subscribe({
      next: statsData => {
        // Cuando los datos llegan, actualizamos el signal
        this.stats.set(statsData);
      },
      error: err => console.error('Error fetching dashboard stats:', err),
    });
  }
}