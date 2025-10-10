import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicComponent } from './public/public.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { CountriesComponent } from './pages/countries/countries.component';

const routes: Routes = [
  {
    path: '',
    component: PublicComponent,
    children: [
      { path: '', component: LandingPageComponent },
      { path: 'countries', component: CountriesComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule {}


