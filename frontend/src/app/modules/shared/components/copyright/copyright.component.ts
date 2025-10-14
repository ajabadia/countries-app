// src/app/modules/shared/components/copyright/copyright.component.ts

import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-copyright',
    standalone: true,
    imports: [], // No necesita nada porque solo usa {{ }}
    templateUrl: './copyright.component.html',
    styleUrls: [],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CopyrightComponent {
  private readonly currentYear = new Date().getFullYear();

  @Input() text: string = `(c) Alejandro Abadía ${this.currentYear}`;
}