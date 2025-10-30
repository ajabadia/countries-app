// File: d:\desarrollos\countries2\frontend\src\app\core\interceptors\auth.interceptor.ts | Last Modified: 2025-10-24

import { Injectable, inject } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HttpInterceptorFn,
  HttpHandlerFn,
} from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, switchMap, filter, take } from 'rxjs/operators';
import { AuthService } from '@core/services/auth.service';

let isRefreshing = false;
const refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const accessToken = authService.getToken();

  // ✅ SOLUCIÓN: Añadimos withCredentials a todas las peticiones.
  // Esto es necesario para que el navegador envíe la cookie HttpOnly al backend.
  req = req.clone({
    withCredentials: true,
  });

  if (accessToken) {
    req = addToken(req, accessToken);
  }

  return next(req).pipe(
    catchError(error => {
      // ✅ CORRECCIÓN CLAVE: Se añade una condición para romper el bucle.
      // Si la petición que falla ya es de autenticación (login o refresh-token),
      // no intentamos refrescar de nuevo. Simplemente dejamos que el error continúe.
      if (error instanceof HttpErrorResponse && error.status === 401 && !req.url.includes('/auth/')) {
        return handle401Error(req, next, authService);
      }
      return throwError(() => error);
    })
  );
};

function addToken(request: HttpRequest<any>, token: string) {
  return request.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });
}

function handle401Error(request: HttpRequest<any>, next: HttpHandlerFn, authService: AuthService): Observable<HttpEvent<any>> {
  if (!isRefreshing) {
    isRefreshing = true;
    refreshTokenSubject.next(null);

    return authService.refreshSession().pipe(
      switchMap((response) => {
        isRefreshing = false;
        const newAccessToken = response?.accessToken;
        refreshTokenSubject.next(newAccessToken);
        return next(addToken(request, newAccessToken || ''));
      }),
      catchError((err) => {
        isRefreshing = false;
        authService.logout(); // Si el refresh token falla, deslogueamos al usuario.
        return throwError(() => err);
      })
    );
  } else {
    // Si ya se está refrescando, ponemos la petición en cola.
    return refreshTokenSubject.pipe(
      filter(token => token != null),
      take(1),
      switchMap(jwt => {
        return next(addToken(request, jwt));
      })
    );
  }
}
