// src/app/modules/country/components/country-table/country-table.component.ts
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Country } from '../../models/country.model';
import { CountriesService } from 'src/app/services/countries.service';
import { countryTableColumns } from '../../country-table.columns';
import { CountryModalComponent } from '../country-modal/country-modal.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-country-table',
  templateUrl: './country-table.component.html',
  styleUrls: ['./country-table.component.scss']
})
export class CountryTableComponent implements OnInit {
  countries: Country[] = [];
  total = 0;
  columns = countryTableColumns;

  constructor(
    private countriesService: CountriesService,
    private modalService: NgbModal // <-- Inyecta el servicio de modales
  ) { }

  ngOnInit(): void {
    this.loadCountries();
  }

  loadCountries() {
    this.countriesService.getAll().subscribe(response => {
      this.countries = response.data;
      this.total = response.total;
    });
  }
  
  openModal(country?: Country) {
    const modalRef = this.modalService.open(CountryModalComponent);
    modalRef.componentInstance.country = country;

    modalRef.result.then((result) => {
      if (country) { // Si había un país, es una actualización
        this.countriesService.update(country.id, result).subscribe(() => this.handleSuccess('País actualizado'));
      } else { // Si no, es una creación
        this.countriesService.create(result).subscribe(() => this.handleSuccess('País creado'));
      }
    }).catch(() => {}); // El catch vacío es para evitar errores en consola cuando se cierra la modal sin guardar
  }

  deleteCountry(country: Country) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Se eliminará el país "${country.defaultname}"`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.countriesService.delete(country.id).subscribe(() => {
          this.handleSuccess('País eliminado');
        });
      }
    });
  }

  private handleSuccess(message: string) {
    Swal.fire({
      icon: 'success',
      title: message,
      showConfirmButton: false,
      timer: 1500
    });
    this.loadCountries(); // Recarga la tabla
  }
}