import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class F1Service {

  // Host y URL corregidos con el guion faltante
  private apiKey = 'c9cb1cc800msh40ea79b3b9b2468p1ce865jsn7517d83e2838';
  private baseUrl = 'https://f1-live-motorsport-data.p.rapidapi.com';
  private host = 'f1-live-motorsport-data.p.rapidapi.com';

  constructor(private http: HttpClient) { }

  // 1. Obtener carreras por año
  public getRaces(year: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'x-rapidapi-host': this.host,
        'x-rapidapi-key': this.apiKey,
        'Content-Type': 'application/json'
      })
    };
    return this.http.get(`${this.baseUrl}/races/${year}`, httpOptions);
  }

  // 2. Obtener información de una sesión específica (Posiciones/Pilotos)
  public getSessionDetails(sessionId: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'x-rapidapi-host': this.host,
        'x-rapidapi-key': this.apiKey,
        'Content-Type': 'application/json'
      })
    };
    return this.http.get(`${this.baseUrl}/session/${sessionId}`, httpOptions);
  }

  // 3. Obtener clasificación de constructores por año (Ruta corregida)
  public getConstructorStandings(year: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'x-rapidapi-host': this.host,
        'x-rapidapi-key': this.apiKey,
        'Content-Type': 'application/json'
      })
    };
    // Se agregó /standings/ a la ruta
    return this.http.get(`${this.baseUrl}/constructors/standings/${year}`, httpOptions);
  }
}