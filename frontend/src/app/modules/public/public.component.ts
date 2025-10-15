import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuBarComponent, MenuBarItem } from '@shared/components/menu-bar/menu-bar.component';
import { PUBLIC_ROUTES } from '@config/route-config';

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
export class PublicComponent {
  /**
   * Elementos del menú para la sección pública.
   * Se obtienen de la configuración centralizada de rutas.
   */
  public readonly publicMenuItems: MenuBarItem[] = PUBLIC_ROUTES;
}