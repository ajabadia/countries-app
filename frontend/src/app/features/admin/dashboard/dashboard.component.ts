// File: d:\desarrollos\countries2\frontend\src\app\features\admin\dashboard\dashboard.component.ts | New File

import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutService } from '@core/services/layout.service';
import { UiStatCardComponent } from '@shared/components/ui-stat-card/ui-stat-card.component';
import { UiIconComponent } from '@shared/components/ui-icon/ui-icon.component';
import { DashboardService, Stat } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, UiStatCardComponent, UiIconComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardAdminComponent implements OnInit {
  private layoutService = inject(LayoutService);
  private dashboardService = inject(DashboardService);

  public stats = signal<Stat[]>([]);

  ngOnInit(): void {
    this.layoutService.setPageTitle('Dashboard de Administración');
    this.dashboardService.getStats().subscribe(data => {
      this.stats.set(data);
    });
  }
}