import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface users {
  name: string;
  comment: string;
  login: string;
  password: string;
}
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  url = 'https://piar.meew.me/';

  constructor(private http: HttpClient) {}

  getUserList() {
    return this.http.get(this.url + 'users');
  }

  creatUser(data: users) {
    return this.http.post(this.url + 'users', data);
  }

  updateUser(id: string, data: users) {
    return this.http.patch(this.url + `users/${id}`, data);
  }

  deleteUser(id: string) {
    return this.http.delete(this.url + `users/${id}`);
  }
}
