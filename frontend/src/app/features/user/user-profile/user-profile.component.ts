import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '@core/services/auth.service';
import { ToastService } from '@core/services/toast.service';
import { User } from '@core/types/user.types';
import { UiCardComponent } from '@shared/components/ui-card/ui-card.component';
import { UiButtonComponent } from '@shared/components/ui-button/ui-button.component';
import { UiInputDirective } from '@shared/components/ui-input/ui-input.directive';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UiCardComponent,
    UiButtonComponent,
    UiInputDirective,
  ],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private toastService = inject(ToastService);

  currentUser = this.authService.currentUser;

  profileForm!: FormGroup;
  passwordForm!: FormGroup;

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      name: [this.currentUser()?.name || '', Validators.required],
      email: [this.currentUser()?.email || '', [Validators.required, Validators.email]],
    });

    this.passwordForm = this.fb.group(
      {
        currentPassword: ['', Validators.required],
        newPassword: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(form: FormGroup) {
    const newPassword = form.get('newPassword')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return newPassword === confirmPassword ? null : { mismatch: true };
  }

  onUpdateProfile(): void {
    if (this.profileForm.invalid) {
      this.toastService.showError('Por favor, revisa los datos del formulario.');
      return;
    }

    this.authService.updateProfile(this.profileForm.value).subscribe({
      next: (updatedUser: User) => {
        this.toastService.showSuccess('Perfil actualizado correctamente.');
        this.profileForm.reset(updatedUser);
      },
      error: (err: any) => {
        this.toastService.showError(err.error.message || 'Error al actualizar el perfil.');
      },
    });
  }

  onChangePassword(): void {
    if (this.passwordForm.invalid) {
      if (this.passwordForm.hasError('mismatch')) {
        this.toastService.showError('Las nuevas contraseñas no coinciden.');
      } else {
        this.toastService.showError('Por favor, completa todos los campos de contraseña.');
      }
      return;
    }

    const { currentPassword, newPassword } = this.passwordForm.value;
    this.authService.changePassword({ currentPassword, newPassword }).subscribe({
      next: () => {
        this.toastService.showSuccess('Contraseña cambiada correctamente.');
        this.passwordForm.reset();
      },
      error: (err: any) => {
        this.toastService.showError(err.error.message || 'Error al cambiar la contraseña.');
      },
    });
  }

  onLogout(): void {
    this.authService.logout();
  }
}