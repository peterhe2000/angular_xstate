import { Inject, Injectable, InjectionToken } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces';
import { map } from 'rxjs/operators';

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private http: HttpClient,
    @Inject(API_BASE_URL) private baseUrl?: string
  ) {}

  getUsers(isOdd: boolean = null): Observable<User[]> {
    let url = `${this.baseUrl}users`;
    if (isOdd !== null) {
      url = `${url}?isodd=${isOdd}`;
    }
    return this.http
      .get<{ users: User[] }>(url)
      .pipe(map((usersData) => usersData.users || []));
  }

  getUserById(userId: number): Observable<User> {
    let url = `${this.baseUrl}users/${userId}`;
    return this.http.get<User>(url);
  }

  createUser(name: string): Observable<User> {
    let url = `${this.baseUrl}users`;
    const newUser: User = { id: null, name: name };
    return this.http
      .post<{ user: User }>(url, newUser)
      .pipe(map((userData) => userData.user));
  }

  updateUser(user: User, userId: number): Observable<User> {
    let url = `${this.baseUrl}users/${userId}`;
    return this.http
      .put<{ user: User }>(url, { name: user.name })
      .pipe(map((userData) => userData.user));
  }

  deleteUser(userId: number) {
    let url = `${this.baseUrl}users/${userId}`;
    return this.http.delete(url);
  }
}
