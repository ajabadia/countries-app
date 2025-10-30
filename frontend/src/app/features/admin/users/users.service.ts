import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseCrudService } from '@app/shared/services/base-crud.service';
import type { User } from '@app/types/user.types';

@Injectable({
  providedIn: 'root',
})
export class UsersService extends BaseCrudService<User> {
  // ✅ REFACTOR: Se actualiza la URL para que apunte al nuevo endpoint de administración de usuarios.
  apiUrl = '/api/admin/users';

  constructor() {
    // El endpoint de la API para los usuarios
    super(inject(HttpClient));
  }
}