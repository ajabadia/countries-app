import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LogoComponent } from './components/logo/logo.component';
import { CopyrightComponent } from './components/copyright/copyright.component';
import { UiButtonComponent } from './components/ui-button/ui-button.component';
import { AdminMenuComponent } from './components/admin-menu/admin-menu.component';
import { RouterModule } from '@angular/router';
import { MenuBarComponent } from './components/menu-bar/menu-bar.component';
import { UiHeadingComponent } from './components/ui-heading/ui-heading.component';
import { UiStatCardComponent } from './components/ui-stat-card/ui-stat-card.component';




@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LogoComponent,
    CopyrightComponent,
    UiHeadingComponent,
    UiButtonComponent,
    AdminMenuComponent,
    MenuBarComponent,
    UiStatCardComponent
  ],
  imports: [CommonModule, RouterModule],
  exports: [
    HeaderComponent,
    FooterComponent,
    LogoComponent,
    CopyrightComponent,
    MenuBarComponent,
    UiButtonComponent,
    UiHeadingComponent,
    AdminMenuComponent,
    UiStatCardComponent 
  ]
})
export class SharedModule {}

