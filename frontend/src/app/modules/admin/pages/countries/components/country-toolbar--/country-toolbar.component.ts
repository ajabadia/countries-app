import { Component, Output, Input, EventEmitter } from '@angular/core';

/**
 * Barra de herramientas superior para países.
 * Incluye botones de añadir, refrescar y búsqueda.
 * Los estilos específicos se encuentran en styles/shared.
 */
@Component({
  selector: 'country-toolbar', // Mantén consistente con el template padre
  templateUrl: './country-toolbar.component.html',
  styleUrls: [] // Usar estilos globales de shared, puedes añadir uno local si lo necesitas
})
export class CountryToolbarComponent {
  /**
   * ¿Mostrar el botón "Añadir país"?
   */
  @Input() canAdd = true;
  
  /**
   * ¿Mostrar el botón "Refrescar"?
   */
  @Input() canRefresh = true;
  
  /**
   * Valor actual del buscador.
   */
  @Input() searchValue = '';

  /**
   * Evento al cambiar el texto de búsqueda. 
   * Emite el valor del input, no el event DOM.
   */
  @Output() searchChange = new EventEmitter<string>();
  
  /**
   * Evento al pulsar "Añadir país".
   */
  @Output() addCountry = new EventEmitter<void>();
  
  /**
   * Evento al pulsar "Refrescar".
   */
  @Output() refresh = new EventEmitter<void>();

  /**
   * Dispara el evento de añadir país.
   */
  onAddCountry() {
    this.addCountry.emit();
  }

  /**
   * Dispara el evento de refrescar listado.
   */
  onRefresh() {
    this.refresh.emit();
  }

  /**
   * Dispara el evento de cambio en búsqueda.
   * Siempre emite el valor del input.
   */
  onSearchChange() {
    this.searchChange.emit(this.searchValue);
  }
}
