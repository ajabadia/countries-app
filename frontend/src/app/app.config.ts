// File: d:\desarrollos\countries2\frontend\src\app\app.config.ts | Moved and Corrected

import { APP_INITIALIZER, ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { Observable } from 'rxjs';

import { routes } from './app.routes';
import { AuthService } from '@core/services/auth.service';
import { authInterceptor } from '@core/interceptors/auth.interceptor';

function initializeAuth(authService: AuthService): () => Observable<any> {
  return () => authService.refreshSession();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeAuth,
      deps: [AuthService],
      multi: true,
    },
  ],
};