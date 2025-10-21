import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseAdminDirective } from '@app/shared/directives/base-admin.directive';
import { CountriesService } from './countries.service';
import type { Country } from '@app/core/types/country.types';
import { TableColumn } from '@app/shared/components/ui-table/table.types';

// Importamos los componentes de UI necesarios
import { UiTableComponent } from '@app/shared/components/ui-table/ui-table.component';
import { UiHeadingComponent } from '@app/shared/components/ui-heading/ui-heading.component';
import { UiPaginatorComponent } from '@app/shared/components/ui-paginator/ui-paginator.component';
import { UiSearchBoxComponent } from '@app/shared/components/ui-search-box/ui-search-box.component';
import { UiToolbarButtonsComponent, ToolbarButtonConfig } from '@app/shared/components/ui-toolbar-buttons/ui-toolbar-buttons.component';
import { UiIconComponent } from '@app/shared/components/ui-icon/ui-icon.component';
import { PaginatorChangeEvent } from '@app/shared/components/ui-paginator/ui-paginator.types';

@Component({
  selector: 'app-countries-admin',
  standalone: true,
  imports: [
    CommonModule,
    UiTableComponent,
    UiHeadingComponent,
    UiPaginatorComponent,
    UiSearchBoxComponent,
    UiToolbarButtonsComponent,
    UiIconComponent,
  ],
  templateUrl: './countries-admin.component.html',
})
export class CountriesAdminComponent extends BaseAdminDirective<Country> implements OnInit {
  protected override fb = inject(FormBuilder);

  // Implementación de propiedades abstractas
  service = inject(CountriesService);
  form: FormGroup = this.fb.group({
    defaultname: ['', Validators.required],
    alpha2may: ['', [Validators.required, Validators.maxLength(2)]],
    alpha3may: ['', [Validators.required, Validators.maxLength(3)]],
    numeric: [''],
  });

  // Implementación de la propiedad abstracta para la búsqueda
  searchableFields: (keyof Country)[] = [
    'id',
    'defaultname',
    'alpha2may',
    'alpha3may',
    'numeric'
  ];
  // Propiedades para el template
  pageTitle = 'Países';
  columns: TableColumn<Country>[] = [];
  toolbarActions: ToolbarButtonConfig[] = [];

  override ngOnInit(): void {
    this.pageSize$.next(50); // Establecemos el tamaño de página inicial
    super.ngOnInit();
    this.columns = [
      { key: 'id', label: 'ID' },
      {
        key: 'defaultname',
        label: 'Nombre',
        sortable: true,
        template: true // Indicamos que esta columna usará una plantilla
      },
      { key: 'alpha2may', label: 'ISO2', sortable: true },
      { key: 'alpha3may', label: 'ISO3', sortable: true },
      { key: 'numeric', label: 'Código Numérico', sortable: true },
    ];
    this.toolbarActions = [
      { id: 'new', label: 'Nuevo', iconName: 'icon-add', action: () => this.openModal() },
      { id: 'delete-selected', label: 'Eliminar seleccionados', iconName: 'icon-trash', action: () => this.onDeleteSelected(), disabled$: this.isSelectionEmpty$, color: 'danger' }
    ];
  }

  /**
   * Maneja el evento de cambio del paginador.
   * @param event El estado del paginador con la página y el tamaño de página.
   */
  onPaginatorChange(event: PaginatorChangeEvent): void {
    this.page$.next(event.page);
    this.pageSize$.next(event.pageSize);
  }
}