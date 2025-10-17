import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { authInterceptor } from './interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  // Registramos el router, el cliente HTTP y nuestro interceptor de autenticación
  providers: [provideRouter(routes), provideHttpClient(withInterceptors([authInterceptor]))],
};