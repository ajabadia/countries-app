import { Directive, Input, TemplateRef, inject } from '@angular/core';

@Directive({
  selector: 'ng-template[uiTableColumn]',
  standalone: true,
})
export class UiTableColumnDirective {
  @Input({ alias: 'uiTableColumn', required: true }) columnName!: string; // Este ya estaba bien, pero lo confirmo.
  public templateRef: TemplateRef<unknown> = inject(TemplateRef);
}