import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  inject,
  ChangeDetectionStrategy,
  HostBinding,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';
import { SafeHtml } from '@angular/platform-browser';
import { IconService, UiIconType } from './icon.service';

export type UiIconRender = 'svg' | 'image';
export type UiIconSize = 'xs' | 's' | 'm' | 'l' | 'xl';

@Component({
  selector: 'app-ui-icon',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ng-container *ngIf="renderType === 'svg'; else imageTpl">
      <span class="icon-wrapper" [innerHTML]="svgContent$ | async"></span>
    </ng-container>

    <ng-template #imageTpl>
      <img [src]="imagePath" [alt]="name" class="icon-image" />
    </ng-template>
  `,
  styleUrls: ['./ui-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiIconComponent implements OnChanges {
  private iconService = inject(IconService);

  // --- Entradas (Inputs) ---
  @Input({ required: true }) name!: string;
  @Input() type: UiIconType = 'system';
  @Input() renderType: UiIconRender = 'svg';
  @Input() size: UiIconSize | 'inherit' | string = 'm';
  @Input() color?: string;
  @Input('class') customClass = '';

  // --- Propiedades internas ---
  svgContent$: Observable<SafeHtml> = of('');
  imagePath = '';

  // --- Vinculación de estilos y clases al Host ---
  @HostBinding('style.--icon-size')
  get sizeStyle(): string {
    const predefinedSizes: UiIconSize[] = ['xs', 's', 'm', 'l', 'xl'];
    if (predefinedSizes.includes(this.size as UiIconSize)) {
      return `var(--icon-size-${this.size})`;
    }
    return this.size === 'inherit' ? 'inherit' : this.size;
  }

  @HostBinding('style.color')
  get colorStyle(): string | undefined {
    return this.color;
  }

  @HostBinding('class')
  get hostClasses(): string {
    return this.customClass;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['name'] || changes['type'] || changes['renderType']) {
      if (this.renderType === 'svg') {
        this.svgContent$ = this.iconService.getIcon(this.name, this.type);
        this.imagePath = '';
      } else {
        // Asumimos png por defecto para imágenes, se podría hacer un input más.
        this.imagePath = this.iconService.getIconPath(this.name, this.type, 'png');
        this.svgContent$ = of('');
      }
    }
  }
}