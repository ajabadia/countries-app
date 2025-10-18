import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  public loginForm = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  public errorMessage: string | null = null;
  public isLoading = false;

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;
    const credentials = this.loginForm.getRawValue();

    this.authService
      .login(credentials)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: () => {
          // Navegamos al panel de administración tras un login exitoso
          this.router.navigate(['/admin']);
        },
        error: (err) => {
          // Mostramos un mensaje de error genérico
          this.errorMessage =
            err.status === 401 ? 'Credenciales inválidas.' : 'Ha ocurrido un error. Inténtelo de nuevo.';
        },
      });
  }
}