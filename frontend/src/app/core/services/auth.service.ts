// File: d:\desarrollos\countries2\frontend\src\app\core\services\auth.service.ts | New File

import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { Router } from '@angular/router';

import type { User } from '@core/types/user.types';
import type { AuthCredentials, AuthResponse } from '@core/types/auth.types';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

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
    // Al iniciar el servicio, intentamos cargar el token desde localStorage
    // para mantener la sesión del usuario si recarga la página.
    const token = localStorage.getItem(this.TOKEN_KEY);
    if (token) {
      this.accessTokenSignal.set(token);
      // TODO: En una implementación completa, aquí deberíamos llamar a un endpoint
      // como /api/auth/profile para obtener los datos del usuario y popular currentUserSignal.
    }
  }

  getToken(): string | null {
    // TODO: Reemplazar con la lógica real de autenticación.
    // Temporalmente, devolvemos un token falso para desarrollo.
    return this.accessTokenSignal() || 'fake-jwt-token-for-development';
  }

  login(credentials: AuthCredentials): Observable<AuthResponse> {
    return this.http.post<AuthResponse>('/api/auth/login', credentials).pipe(
      tap(response => {
        this.setAuthentication(response);
      })
    );
  }

  register(userData: AuthCredentials): Observable<User> {
    // Ahora `userData` puede contener `username`, `email` y `password`.
    return this.http.post<User>('/api/auth/register', userData).pipe(
      tap(() => {
        // No hacemos login automático, el usuario deberá iniciar sesión después.
      })
    );
  }

  logout(): void {
    // Idealmente, llamaríamos a un endpoint de logout en el backend.
    // this.http.post('/api/auth/logout', {}).subscribe();

    // Limpiamos el estado local.
    this.currentUserSignal.set(null);
    this.accessTokenSignal.set(null);
    localStorage.removeItem(this.TOKEN_KEY);

    // Redirigimos al usuario a la página de login.
    this.router.navigate(['/auth/login']);
  }

  refreshToken(): Observable<{ accessToken: string }> {
    return this.http.get<{ accessToken: string }>('/api/auth/refresh-token').pipe(
      tap(response => {
        this.accessTokenSignal.set(response.accessToken);
        localStorage.setItem(this.TOKEN_KEY, response.accessToken);
      })
    );
  }

  private setAuthentication(response: AuthResponse): void {
    this.accessTokenSignal.set(response.accessToken);
    this.currentUserSignal.set(response.user);
    localStorage.setItem(this.TOKEN_KEY, response.accessToken);
  }
}