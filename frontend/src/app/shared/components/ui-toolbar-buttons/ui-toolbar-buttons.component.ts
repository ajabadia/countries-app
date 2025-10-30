import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toObservable } from '@angular/core/rxjs-interop';
import { UiButtonComponent } from '@app/shared/components/ui-button/ui-button.component';
import { UiIconComponent } from '@app/shared/components/ui-icon/ui-icon.component';
import { ToolbarButtonConfig } from '@app/types/action.types';

@Component({
  selector: 'app-ui-toolbar-buttons',
  standalone: true,
  imports: [CommonModule, UiButtonComponent, UiIconComponent],
  template: `
    @for (action of uiToolbarButtonsActions; track action.id) {
      <button
        app-ui-button
        [uiButtonColor]="action.color || 'secondary'"
        [uiButtonVariant]="action.variant || 'solid'"
        [disabled]="(action.disabled$ | async) || false"
        (click)="onButtonClick(action)"
      >
        @if (action.iconName) { <app-ui-icon [uiIconName]="action.iconName"></app-ui-icon> }
        {{ action.label }}
      </button>
    }
  `,
})
export class UiToolbarButtonsComponent {
  @Input() uiToolbarButtonsActions: ToolbarButtonConfig[] = [];
  @Output() uiToolbarButtonsActionClick = new EventEmitter<string>();

  onButtonClick(action: ToolbarButtonConfig): void {
    this.uiToolbarButtonsActionClick.emit(action.id);
  }
}