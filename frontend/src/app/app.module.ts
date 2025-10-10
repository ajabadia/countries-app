import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './modules/shared/shared.module';
import { AdminComponent } from './modules/admin/admin/admin.component';
import { AdminDashboardComponent } from './modules/admin/pages/dashboard/admin-dashboard.component';
import { AdminCountriesComponent } from './modules/admin/pages/countries/admin-countries.component';
import { AdminContinentsComponent } from './modules/admin/pages/continents/admin-continents.component';
import { AdminAreasComponent } from './modules/admin/pages/areas/admin-areas.component';
import { AdminDependenciesComponent } from './modules/admin/pages/dependencies/admin-dependencies.component';
import { AdminLanguagesComponent } from './modules/admin/pages/languages/admin-languages.component';
import { AdminTranslationsComponent } from './modules/admin/pages/translations/admin-translations.component';


@NgModule({
  declarations: [AppComponent,  
  ],
  imports: [BrowserModule, AppRoutingModule, SharedModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}



