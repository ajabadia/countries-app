// File: d:\desarrollos\countries2\frontend\src\app\features\auth\login\login.component.ts | New File

import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';

import { AuthService } from '@core/services/auth.service';
import { ToastService } from '@core/services/toast.service';

import { UiCardComponent } from '@shared/components/ui-card/ui-card.component';
import { UiInputDirective } from '@shared/components/ui-input/ui-input.directive';
import { UiButtonComponent } from '@shared/components/ui-button/ui-button.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    UiCardComponent,
    UiInputDirective,
    UiButtonComponent,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private toastService = inject(ToastService);

  loading = signal(false);
  loginForm: FormGroup;

  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.toastService.showError('Por favor, completa todos los campos.');
      return;
    }

    this.loading.set(true);

    this.authService.login(this.loginForm.value)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: () => {
          this.toastService.showSuccess('¡Bienvenido de nuevo!');
          this.router.navigate(['/']);
        },
        error: (err) => {
          this.toastService.showError(err.error.message || 'Error al iniciar sesión.');
        },
      });
  }
}