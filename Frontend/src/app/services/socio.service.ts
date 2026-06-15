import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocioService {
  private URL_API = 'http://localhost:3000/api/socio';

  constructor(private http: HttpClient) { }

  getSocios(): Observable<any> {
    return this.http.get(`${this.URL_API}`);
  }

  getSociosActivos(): Observable<any> {
    return this.http.get(`${this.URL_API}/activos`);
  }

  createSocio(socio: any): Observable<any> {
    return this.http.post(`${this.URL_API}`, socio);
  }

  editSocio(socio: any): Observable<any> {
    return this.http.put(`${this.URL_API}/${socio.id}`, socio);
  }

  deleteSocio(id: number): Observable<any> {
    return this.http.delete(`${this.URL_API}/${id}`);
  }
}