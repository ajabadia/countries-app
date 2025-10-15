// src/app/modules/admin/components/admin-dashboard/admin-dashboard.component.ts
import { Component, inject, OnInit } from '@angular/core';
import { CountriesService } from 'src/app/services/countries.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  countriesCount: number | null = null;
  areasCount: number | null = null;
  continentsCount: number | null = null;
  dependenciesCount: number | null = null;
  languagesCount: number | null = null;
  translationsCount: number | null = null;

  constructor(private countriesService: CountriesService) {}

  ngOnInit() {
    this.countriesService.getCountriesCount().subscribe({
      next: result => {
        console.log('RESPUESTA backend:', result); // Verás en consola { total: 249 }
        this.countriesCount = result.total;
      },
      error: err => {
        console.error('Error consultando países:', err);
        this.countriesCount = null;
      }
    });
    this.countriesService.getAreasCount().subscribe({
      next: result => {
        console.log('RESPUESTA backend:', result); // Verás en consola { total:  }
        this.areasCount = result.total;
      },
      error: err => {
        console.error('Error consultando areas:', err);
        this.areasCount = null;
      }
    });
    this.countriesService.getContinentsCount().subscribe({
      next: result => {
        console.log('RESPUESTA backend:', result); // Verás en consola { total:  }
        this.continentsCount = result.total;
      },
      error: err => {
        console.error('Error consultando continentes:', err);
        this.continentsCount = null;
      }
    });  
    this.countriesService.getLanguagesCount().subscribe({
      next: result => {
        console.log('RESPUESTA backend:', result); // Verás en consola { total: 249 }
        this.languagesCount = result.total;
      },
      error: err => {
        console.error('Error consultando lenguajes:', err);
        this.languagesCount = null;
      }
    });  
    this.countriesService.getDependenciesCount().subscribe({
      next: result => {
        console.log('RESPUESTA backend:', result); // Verás en consola { total: 249 }
        this.dependenciesCount = result.total;
      },
      error: err => {
        console.error('Error consultando dependencias:', err);
        this.dependenciesCount = null;
      }
    });
    this.countriesService.getTranslationsCount().subscribe({
      next: result => {
        console.log('RESPUESTA backend:', result); // Verás en consola { total: 249 }
        this.translationsCount = result.total;
      },
      error: err => {
        console.error('Error consultando traducciones:', err);
        this.translationsCount = null;
      }
    });
  }
}
