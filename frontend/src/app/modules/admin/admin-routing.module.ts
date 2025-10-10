import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin/admin.component';
import { AdminDashboardComponent } from './pages/dashboard/admin-dashboard.component';
import { AdminCountriesComponent } from './pages/countries/admin-countries.component';
import { AdminContinentsComponent } from './pages/continents/admin-continents.component';
import { AdminAreasComponent } from './pages/areas/admin-areas.component';
import { AdminDependenciesComponent } from './pages/dependencies/admin-dependencies.component';
import { AdminLanguagesComponent } from './pages/languages/admin-languages.component';
import { AdminTranslationsComponent } from './pages/translations/admin-translations.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'countries', component: AdminCountriesComponent },
      { path: 'continents', component: AdminContinentsComponent },
      { path: 'areas', component: AdminAreasComponent },
      { path: 'dependencies', component: AdminDependenciesComponent },
      { path: 'languages', component: AdminLanguagesComponent },
      { path: 'translations', component: AdminTranslationsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
