import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService, type Stat } from './dashboard.service';
import { UiStatCardComponent } from '../../../shared/components/ui-stat-card/ui-stat-card.component';
import { LayoutService } from '@core/services/layout.service';
import { ActionService } from '@core/services/action.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, UiStatCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  private readonly dashboardService = inject(DashboardService);
  private readonly layoutService = inject(LayoutService);
  private readonly actionService = inject(ActionService);

  // Signal para almacenar las estadísticas. Inicialmente vacío.
  public stats = signal<Stat[]>([]);

  constructor() {
    this.loadStats();
  }

  ngOnInit(): void {
    const dashboardAction = this.actionService.getActionById('admin-dashboard');
    if (dashboardAction && dashboardAction.pageTitle) {
      this.layoutService.setPageTitle(dashboardAction.pageTitle);
    }
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