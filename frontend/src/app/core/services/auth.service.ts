// File: d:\desarrollos\countries2\frontend\src\app\core\services\auth.service.ts | New File

import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap, catchError } from 'rxjs';
import { Router } from '@angular/router';

import { ToastService } from './toast.service';
// ✅ CORRECCIÓN: Se ajusta la ruta para que sea absoluta desde la raíz del proyecto.
import { environment } from 'src/environments/environment'; 
import type { User } from '@app/types/user.types';
import type { AuthCredentials, AuthResponse } from '@app/types/auth.types';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private toastService = inject(ToastService);

  private apiUrl = `${environment.apiUrl}/auth`;

  // --- Estado Reactivo ---
  // Usamos signals para gestionar el estado de autenticación de forma reactiva.
  private currentUserSignal = signal<User | null>(null);
  private accessTokenSignal = signal<string | null>(null);

  // --- Selectores Públicos (Signals Computados) ---
  // Exponemos el estado a través de signals de solo lectura para protegerlo.
  public currentUser = this.currentUserSignal.asReadonly();
  public isAuthenticated = computed(() => !!this.currentUserSignal());
  public accessToken = this.accessTokenSignal.asReadonly();

  private readonly TOKEN_KEY = 'access_token';

  constructor() {
    // El constructor se mantiene limpio. La lógica de inicialización se moverá a un APP_INITIALIZER.
  }

  getToken(): string | null {
    return this.accessTokenSignal();
  }

  login(credentials: AuthCredentials): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        this.setAuthentication(response);
      })
    );
  }

  register(userData: AuthCredentials): Observable<User> {
    // Ahora `userData` puede contener `username`, `email` y `password`.
    return this.http.post<User>(`${this.apiUrl}/register`, userData).pipe(
      tap(() => {
        // No hacemos login automático, el usuario deberá iniciar sesión después.
      })
    );
  }

  getProfile(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/profile`);
  }

  updateProfile(data: { name: string; email: string }): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/profile`, data).pipe(
      tap(updatedUser => {
        this.currentUserSignal.set(updatedUser);
        this.toastService.showSuccess('Tu perfil ha sido actualizado correctamente.');
      })
    );
  }

  changePassword(data: { currentPassword: string, newPassword: string }): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/profile/password`, data).pipe(
      tap(() => this.toastService.showSuccess('Contraseña actualizada con éxito.'))
    );
  }

  logout(): Observable<any> {
    // Llamamos al endpoint de logout para invalidar el refresh token en el servidor.
    return this.http.post(`${this.apiUrl}/logout`, {}).pipe(
      // Si la llamada al backend falla, lo capturamos pero no detenemos el flujo.
      // El logout del lado del cliente DEBE completarse siempre.
      catchError(error => {
        console.error('La llamada al endpoint de logout falló, pero se procederá con el cierre de sesión local.', error);
        return of(null); // Continuamos el flujo como si hubiera tenido éxito.
      }),
      // Usamos tap para el efecto secundario de limpiar los datos locales.
      // Esto se ejecutará tanto si la llamada original tuvo éxito como si la capturamos en el catchError.
      tap(() => {
        this.clearAuthData();
      })
    );
  }

  private clearAuthData(): void {
    // Limpiamos el estado local.
    this.currentUserSignal.set(null);
    this.accessTokenSignal.set(null);
    localStorage.removeItem(this.TOKEN_KEY);
  }

  /**
   * Intenta refrescar la sesión del usuario. Se usa en el APP_INITIALIZER.
   * Llama al endpoint de refresh-token. Si tiene éxito, el usuario se loguea.
   * Si falla (ej. refresh token inválido), se asegura de que el estado quede limpio.
   */
  refreshSession(): Observable<AuthResponse | null> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/refresh-token`, {}).pipe(
      tap(response => this.setAuthentication(response)),
      catchError(() => {
        // No es necesario un console.error aquí, ya que es un flujo esperado si no hay sesión.
        this.clearAuthData(); // Limpiamos sin notificar ni redirigir.
        return of(null); // Retornamos un observable que completa sin error.
      })
    );
  }

  private setAuthentication(response: AuthResponse): void {
    this.accessTokenSignal.set(response.accessToken);
    this.currentUserSignal.set(response.user);
    localStorage.setItem(this.TOKEN_KEY, response.accessToken);
  }

}