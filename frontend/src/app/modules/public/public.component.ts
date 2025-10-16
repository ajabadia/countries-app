import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuBarComponent, MenuBarItem } from '@shared/components/menu-bar/menu-bar.component';
import { PUBLIC_ROUTES } from './public.routes';

@Component({
  selector: 'app-public',
  standalone: true,
  imports: [
    RouterModule,
    MenuBarComponent
  ],
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PublicComponent implements OnInit {
  /**
   * Elementos del menú para la sección pública.
   * Se generan dinámicamente a partir de la configuración de rutas.
   */
  public publicMenuItems: MenuBarItem[] = [];

  ngOnInit(): void {
    this.publicMenuItems = PUBLIC_ROUTES
      .filter(route => route.data?.['menu']) // Filtramos solo las rutas que tienen datos de menú
      .map(route => ({
        // ✅ CORRECCIÓN: Construimos la ruta de forma segura, evitando dobles barras.
        route: ['/public', route.path].filter(Boolean).join('/'),
        ...route.data!['menu'],
      }));
  }
}