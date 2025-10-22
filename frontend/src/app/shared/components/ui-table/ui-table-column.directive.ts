import { Directive, Input, TemplateRef, inject } from '@angular/core';

@Directive({
  selector: 'ng-template[uiTableColumn]',
  standalone: true,
})
export class UiTableColumnDirective {
  @Input({ alias: 'uiTableColumn', required: true }) columnName!: string;
  public templateRef: TemplateRef<unknown> = inject(TemplateRef);
}