// File: d:\desarrollos\countries2\frontend\src\app\app.component.ts | Last Modified: 2025-10-19

import { Component, ChangeDetectionStrategy, inject, signal, ApplicationRef, EnvironmentInjector, createComponent } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { finalize } from 'rxjs';
import { UiHamburgerMenuComponent } from '@shared/components/ui-hamburger-menu/ui-hamburger-menu.component';
import { UiLogoComponent } from '@shared/components/ui-logo/ui-logo.component';
import { UiToastContainerComponent } from '@shared/components/ui-toast-container/ui-toast-container.component';
import { UiButtonComponent } from '@shared/components/ui-button/ui-button.component';
import { LayoutService } from '@core/services/layout.service';
import { AuthService } from '@core/services/auth.service';
import { ToastService } from '@core/services/toast.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    UiHamburgerMenuComponent,
    UiLogoComponent,
    UiButtonComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  // ✅ Hacemos público el servicio para poder usarlo en la plantilla.
  public authService = inject(AuthService);
  public layoutService = inject(LayoutService);
  private toastService = inject(ToastService);

  pageTitle = this.layoutService.pageTitle;
  isLoggingOut = signal(false);

  constructor() {
    // --- Solución Definitiva para el Z-Index de los Toasts ---
    // Para asegurar que los toasts siempre aparezcan por encima de cualquier modal,
    // creamos el componente del contenedor de toasts dinámicamente y lo adjuntamos
    // directamente al <body> del documento. Esto lo saca de cualquier contexto
    // de apilamiento intermedio que pueda tener el .app-layout.
    const appRef = inject(ApplicationRef);
    const injector = inject(EnvironmentInjector);

    const toastContainerRef = createComponent(UiToastContainerComponent, { environmentInjector: injector });

    appRef.attachView(toastContainerRef.hostView);
    document.body.appendChild(toastContainerRef.location.nativeElement);
  }

  /**
   * Gestiona el proceso de cierre de sesión.
   * Muestra un estado de carga en el botón y una notificación al finalizar.
   */
  logout(): void {
    this.isLoggingOut.set(true);
    this.authService.logout()
      .pipe(finalize(() => this.isLoggingOut.set(false)))
      .subscribe(() => {
        this.toastService.showInfo('Has cerrado la sesión.');
      });
  }
}
