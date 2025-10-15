// src/app/modules/shared/shared.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// --- Importamos todos los componentes standalone ---
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LogoComponent } from './components/logo/logo.component';
import { CopyrightComponent } from './components/copyright/copyright.component';
import { UiButtonComponent } from './components/ui-button/ui-button.component';
import { AdminMenuComponent } from './components/admin-menu/admin-menu.component';
import { MenuBarComponent } from './components/menu-bar/menu-bar.component';
import { UiHeadingComponent } from './components/ui-heading/ui-heading.component';
import { UiStatCardComponent } from './components/ui-stat-card/ui-stat-card.component';
import { ToolbarButtonsComponent } from './components/toolbar-buttons/toolbar-buttons.component';
import { FlagIconComponent } from './components/flag-icon/flag-icon.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { TableComponent } from './components/table/table.component';
import { ToggleCheckboxComponent } from './components/toggle-checkbox/toggle-checkbox.component';
import { ModalComponent } from './components/modal/modal.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { UiIconComponent } from './components/ui-icon/ui-icon.component'; // ✅ CORREGIDO: Importamos el componente, no el módulo.

const COMPONENTS = [
  HeaderComponent, FooterComponent, LogoComponent, CopyrightComponent, UiButtonComponent,
  AdminMenuComponent, MenuBarComponent, UiHeadingComponent, UiStatCardComponent,
  ToolbarButtonsComponent, FlagIconComponent, SearchBoxComponent, PaginatorComponent,
  TableComponent, ToggleCheckboxComponent, ModalComponent, ConfirmDialogComponent,
  UiIconComponent // ✅ CORREGIDO: Añadido aquí.
];

const MODULES = [ CommonModule, RouterModule, FormsModule, ReactiveFormsModule ];

@NgModule({
  declarations: [],
  imports: [ ...COMPONENTS, ...MODULES ],
  exports: [ ...COMPONENTS, ...MODULES ]
})
export class SharedModule { }