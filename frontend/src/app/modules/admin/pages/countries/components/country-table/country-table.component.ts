// src/app/modules/admin/pages/countries/components/country-table/country-table.component.ts

import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Country } from '../../models/country.model';
import { CountriesService } from 'src/app/core/services/countries.service';
// ¡CORREGIDO! La ruta y el nombre de la importación son ahora correctos.
import { countryTableColumns } from '../../config/country-table.columns';
import { CountryModalComponent } from '../country-modal/country-modal.component';
import Swal from 'sweetalert2';
import { ApiResponse } from 'src/app/core/models/api-response.model';

@Component({
    selector: 'app-country-table',
    templateUrl: './country-table.component.html',
    styleUrls: ['./country-table.component.scss'],
    standalone: false
})
export class CountryTableComponent implements OnInit {
  countries: Country[] = [];
  total = 0;
  columns = countryTableColumns;

  constructor(
    private countriesService: CountriesService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.loadCountries();
  }

  loadCountries(): void {
    // ¡CORREGIDO! Se añade el tipado a la respuesta para evitar errores de 'any'.
    this.countriesService.getAll().subscribe((response: ApiResponse<Country>) => {
      this.countries = response.data;
      this.total = response.total;
    });
  }

  async openModal(country?: Country) {
    const modalRef = this.modalService.open(CountryModalComponent, { centered: true });
    modalRef.componentInstance.country = country;

    try {
      const result: Country = await modalRef.result;

      if (this.isCountry(result)) {
        if (country) { // Si el país existe, actualizamos
          this.countriesService.update(country.id, result).subscribe(() => this.handleSuccess('País actualizado correctamente'));
        } else { // Si no, creamos uno nuevo
          this.countriesService.create(result).subscribe(() => this.handleSuccess('País creado correctamente'));
        }
      }
    } catch (error) {
      // Este bloque se ejecuta cuando la modal se cierra sin guardar (ESC, click fuera, etc).
      // Lo dejamos vacío para que no aparezca un error en la consola.
    }
  }

  // Una pequeña función de guarda para asegurar que el resultado de la modal es un objeto Country válido.
  private isCountry(result: any): result is Country {
    return result && typeof result.id === 'string' && typeof result.defaultname === 'string';
  }

  deleteCountry(country: Country): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Esta acción no se puede deshacer. Se eliminará el país "${country.defaultname}".`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Sí, ¡eliminar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.countriesService.delete(country.id).subscribe(() => {
          this.handleSuccess('País eliminado correctamente');
        });
      }
    });
  }

  private handleSuccess(message: string): void {
    Swal.fire({
      icon: 'success',
      title: message,
      showConfirmButton: false,
      timer: 1500,
      position: 'top-end',
      toast: true
    });
    this.loadCountries();
  }
}