// admin-countries-pagination.ts
// Lógica para manejar la paginación (cambiar página, elementos por página).

export class CountriesPaginationManager {
  page = 1;             // Página actual
  perPage = 25;         // Países por página
  totalPages = 1;       // Total de páginas

  // Cambiar de página
  nextPage() {
    if (this.page < this.totalPages) {
      this.page++;
    }
  }
  prevPage() {
    if (this.page > 1) {
      this.page--;
    }
  }

  // Cambiar cuantos países se ven por página
  changeItemsPerPage(n: number) {
    this.perPage = n;
    this.page = 1; // Siempre volver al inicio
  }
}
