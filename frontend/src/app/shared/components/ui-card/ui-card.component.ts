import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-ui-card',
  standalone: true,
  template: `
    <div class="card-container">
      <ng-content select="[ui-card-title]"></ng-content>
      <ng-content select="[ui-card-content]"></ng-content>
    </div>
  `,
  styleUrls: ['./ui-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiCardComponent {}