import { HttpClient } from '@angular/common/http';
import { Injectable, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  toasts: any[] = [];
  url="https://piar.meew.me/"
  constructor(private http:HttpClient) { }
  registartiom(data: any): Observable<any>{
    return this.http.post(this.url + 'users', data);
  }
  login(data : any) {
    return this.http.post<any>(this.url + 'users/auth', data)
  }
  
  show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.toasts.push({ textOrTpl, ...options });
  }
  remove(toast: any) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }
}
