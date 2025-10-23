// File: d:\desarrollos\countries2\frontend\src\app\features\auth\register\register.component.ts | New File

import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { finalize } from 'rxjs';

import { AuthService } from '@core/services/auth.service';
import { LayoutService } from '@core/services/layout.service';
import { ActionService } from '@core/services/action.service';
import { ToastService } from '@core/services/toast.service';

import { UiHeadingComponent } from '@shared/components/ui-heading/ui-heading.component';
import { UiButtonComponent } from '@shared/components/ui-button/ui-button.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, UiHeadingComponent, UiButtonComponent],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private layoutService = inject(LayoutService);
  private actionService = inject(ActionService);
  private toastService = inject(ToastService);

  registerForm: FormGroup;
  isSubmitting = signal(false);

  constructor() {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    const registerAction = this.actionService.getActionById('auth-register');
    if (registerAction?.pageTitle) {
      this.layoutService.setPageTitle(registerAction.pageTitle);
    }
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      return;
    }
    this.isSubmitting.set(true);
    this.authService.register(this.registerForm.value).pipe(
      finalize(() => this.isSubmitting.set(false))
    ).subscribe({
      next: () => {
        this.toastService.showSuccess('¡Registro completado! Ahora puedes iniciar sesión.');
        this.router.navigate(['/auth/login']);
      },
      error: (err) => this.toastService.showError(err.error?.message || 'Error en el registro.'),
    });
  }
}