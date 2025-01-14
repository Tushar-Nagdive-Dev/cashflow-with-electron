import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private api: ApiService) {}

  loginUser(data: { email: string; password: string }): Observable<User> {
    return this.api.post<User>('users/login', data);
  }

  createUser(data: User): Observable<User> {
    return this.api.post<User>('users/register', data);
  }
}
