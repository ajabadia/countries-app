// File: d:\desarrollos\countries2\frontend\src\app\features\auth\login\login.component.ts | New File

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
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, UiHeadingComponent, UiButtonComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private layoutService = inject(LayoutService);
  private actionService = inject(ActionService);
  private toastService = inject(ToastService);

  loginForm: FormGroup;
  isSubmitting = signal(false);

  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    const loginAction = this.actionService.getActionById('auth-login');
    if (loginAction?.pageTitle) {
      this.layoutService.setPageTitle(loginAction.pageTitle);
    }
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }
    this.isSubmitting.set(true);
    this.authService.login(this.loginForm.value).pipe(
      finalize(() => this.isSubmitting.set(false))
    ).subscribe({
      next: () => this.router.navigate(['/']),
      error: (err) => this.toastService.showError(err.error?.message || 'Error en el inicio de sesión.'),
    });
  }
}