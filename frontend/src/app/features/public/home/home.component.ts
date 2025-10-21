// File: d:\desarrollos\countries2\frontend\src\app\features\public\home\home.component.ts | New File

import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutService } from '@core/services/layout.service';
import { UiIconComponent } from '@app/shared/components/ui-icon/ui-icon.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, UiIconComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  private layoutService = inject(LayoutService);

  ngOnInit(): void {
    this.layoutService.setPageTitle('Bienvenido');
  }
}