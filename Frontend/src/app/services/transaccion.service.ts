import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransaccionService {
  private URL_API = 'http://localhost:3000/api/transaccion';

  constructor(private http: HttpClient) { }

  getTransacciones(): Observable<any> {
    return this.http.get(`${this.URL_API}`);
  }

  getTransaccionesByEmail(email: string): Observable<any> {
    return this.http.get(`${this.URL_API}/historial/${email}`);
  }

  getTransaccionesByIdiomas(origen: string, destino: string): Observable<any> {
    return this.http.get(`${this.URL_API}/idiomas/${origen}/${destino}`);
  }

  createTransaccion(transaccion: any): Observable<any> {
    return this.http.post(`${this.URL_API}`, transaccion);
  }
}