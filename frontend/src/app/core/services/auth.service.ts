// File: d:\desarrollos\countries2\frontend\src\app\core\services\auth.service.ts | New File

import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { Router } from '@angular/router';

import { ToastService } from './toast.service';
// ✅ CORRECCIÓN: Se ajusta la ruta para que sea absoluta desde la raíz del proyecto.
import { environment } from 'src/environments/environment'; 
import type { User } from '../types/user.types';
import type { AuthCredentials, AuthResponse } from '../types/auth.types';

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
    // Al iniciar el servicio, intentamos cargar el token desde localStorage
    // para mantener la sesión del usuario si recarga la página.
    const token = localStorage.getItem(this.TOKEN_KEY);

    if (token) {
      this.accessTokenSignal.set(token);
      // Al recargar, obtenemos el perfil del usuario para restaurar el estado.
      this.getProfile().subscribe({
        next: user => this.currentUserSignal.set(user),
        error: () => {
          this.clearAuthData(false); // Si el token es inválido, limpiamos sin notificar.
        }
      });
    }
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
      })
    );
  }

  changePassword(data: { currentPassword: string, newPassword: string }): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/profile/password`, data);
  }

  logout(): void {
    // Llamamos al endpoint de logout en el backend para invalidar el refresh token.
    this.http.post(`${this.apiUrl}/logout`, {}).subscribe({
      next: () => this.clearAuthData(),
      error: () => this.clearAuthData(), // Limpiamos igual aunque falle, por seguridad
    });
  }

  private clearAuthData(notify: boolean = true): void {
    // Limpiamos el estado local.
    this.currentUserSignal.set(null);
    this.accessTokenSignal.set(null);
    localStorage.removeItem(this.TOKEN_KEY);

    if (notify) {
      this.toastService.showInfo('Has cerrado la sesión.');
    }
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