import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class DecoraMockServerDemoService {

  url: string;

  constructor(private http: HttpClient) {
    this.url = `http://localhost:3000/mock-example`;
  }

  test(): Observable<Object> {
    return this.http.get(`http://localhost:3000/test`);
  }

  list(): Observable<Object> {
    return this.http.get(this.url);
  }

  getById(id: number) {
    return this.http.get(`${this.url}/${id}`);
  }

  add(data) {
    return this.http.post(this.url, data);
  }

  edit(id: number, data) {
    return this.http.put(`${this.url}/${id}`, data);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

}
