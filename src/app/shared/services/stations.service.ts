import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface stations {
  name: string;
  comment: string;
}
@Injectable({
  providedIn: 'root',
})
export class StationsService {
  url = 'https://piar.meew.me/';

  constructor(private http: HttpClient) {}

  getstations() {
    return this.http.get(this.url + 'stations');
  }

  creatstation(data: stations) {
    return this.http.post(this.url + 'stations', data);
  }

  updatestation(id: string, data: stations) {
    return this.http.patch(this.url + `stations/${id}`, data);
  }

  deletestation(id: string) {
    return this.http.delete(this.url + `stations/${id}`);
  }
}
