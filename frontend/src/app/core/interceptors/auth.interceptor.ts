import { inject } from '@angular/core';
import {
  HttpEvent,
  HttpRequest,
  HttpErrorResponse,
  HttpInterceptorFn,
  HttpHandlerFn,
} from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { AuthService } from '@core/services/auth.service';
import { ToastService } from '@core/services/toast.service';

let isRefreshing = false;
const refreshTokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

const addAuthToken = (request: HttpRequest<any>, token: string): HttpRequest<any> => {
  return request.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const handle401Error = (
  request: HttpRequest<any>,
  next: HttpHandlerFn,
  authService: AuthService
): Observable<HttpEvent<any>> => {
  if (!isRefreshing) {
    isRefreshing = true;
    refreshTokenSubject.next(null);

    return authService.refreshToken().pipe(
      switchMap((token: { accessToken: string }) => {
        isRefreshing = false;
        refreshTokenSubject.next(token.accessToken);
        return next(addAuthToken(request, token.accessToken));
      }),
      catchError((err) => {
        isRefreshing = false;
        authService.logout(); // Si el refresh token falla, deslogueamos
        return throwError(() => err);
      })
    );
  }

  // Si ya se está refrescando, esperamos a que el nuevo token esté disponible
  return refreshTokenSubject.pipe(
    filter(token => token !== null),
    take(1),
    switchMap((jwtToken) => next(addAuthToken(request, jwtToken as string)))
  );
};

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const toastService = inject(ToastService);
  const token = authService.getToken();

  const authReq = token ? addAuthToken(req, token) : req;

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        return handle401Error(authReq, next, authService);
      }

      const errorMessage = (typeof error.error === 'object' && error.error !== null && error.error.message)
        || error.message
        || 'Ocurrió un error inesperado.';
      toastService.showError(errorMessage);
      return throwError(() => error);
    })
  );
};