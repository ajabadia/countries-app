import { Directive, Input, TemplateRef, inject } from '@angular/core';

@Directive({
  selector: 'ng-template[appUiTableColumn]',
  standalone: true,
})
export class UiTableColumnDirective {
  @Input({ alias: 'appUiTableColumn', required: true }) columnName!: string;
  public templateRef: TemplateRef<unknown> = inject(TemplateRef);
}