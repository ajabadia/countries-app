import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService, type Stat } from './dashboard.service';
import { UiStatCardComponent } from '../../../shared/components/ui-stat-card/ui-stat-card.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, UiStatCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  private readonly dashboardService = inject(DashboardService);

  // Signal para almacenar las estadísticas. Inicialmente vacío.
  public stats = signal<Stat[]>([]);

  constructor() {
    this.loadStats();
  }

  private loadStats(): void {
    this.dashboardService.getStats().subscribe({
      next: statsData => {
        // Cuando los datos llegan, actualizamos el signal
        this.stats.set(statsData);
      },
      error: err => console.error('Error fetching dashboard stats:', err),
    });
  }
}