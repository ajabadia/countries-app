import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service'; // Asumiendo que existe
import { NotificationService } from '../services/notification.service'; // Asumiendo que existe

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  constructor(
    private authService: AuthService,
    private notificationService: NotificationService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;
    const token = this.authService.getToken();
    if (token) {
      authReq = this.addAuthToken(req, token);
    }

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        // Si el error es 401, intentamos refrescar el token
        if (error.status === 401) {
          return this.handle401Error(authReq, next);
        }

        // Para otros errores, mostramos una notificación y propagamos el error.
        // Es buena práctica verificar que 'error.error' es un objeto antes de acceder a 'message'.
        const errorMessage = (typeof error.error === 'object' && error.error !== null && error.error.message)
          || error.message
          || 'Ocurrió un error inesperado.';
        this.notificationService.showError(errorMessage);
        return throwError(() => error);
      })
    );
  }

  private addAuthToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  
  private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshToken().pipe(
        switchMap((token: { accessToken: string }) => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(token.accessToken);
          return next.handle(this.addAuthToken(request, token.accessToken));
        }),
        catchError((err) => {
          this.isRefreshing = false;
          this.authService.logout(); // Si el refresh token falla, deslogueamos
          return throwError(() => err);
        })
      );
    }

    // Si ya se está refrescando, esperamos a que el nuevo token esté disponible
    return this.refreshTokenSubject.pipe(
      filter(token => token !== null),
      take(1),
      switchMap((jwtToken) => {
        return next.handle(this.addAuthToken(request, jwtToken as string));
      })
    );
  }
}