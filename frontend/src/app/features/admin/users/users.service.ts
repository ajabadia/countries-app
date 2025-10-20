import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseCrudService } from '@app/shared/services/base-crud.service';
import type { User } from '@app/core/types/user.types';

@Injectable({
  providedIn: 'root',
})
export class UsersService extends BaseCrudService<User> {
  apiUrl = '/api/users';

  constructor() {
    // El endpoint de la API para los usuarios
    super(inject(HttpClient));
  }
}