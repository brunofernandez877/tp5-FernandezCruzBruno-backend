import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EmpPubService {
  private urlEmp = 'http://localhost:3000/api/empleado';
  private urlPub = 'http://localhost:3000/api/publicacion';

  constructor(private http: HttpClient) { }

  // Empleados
  getEmpleados(): Observable<any> { return this.http.get(this.urlEmp); }
  createEmpleado(emp: any): Observable<any> { return this.http.post(this.urlEmp, emp); }
  getEmpleadoporId(id: number): Observable<any> { return this.http.get(`${this.urlEmp}/${id}`)};

  // Publicaciones
  getPublicaciones(): Observable<any> { return this.http.get(this.urlPub); }
  createPublicacion(pub: any): Observable<any> { return this.http.post(this.urlPub, pub); }
  editPublicacion(pub: any): Observable<any> { return this.http.put(`${this.urlPub}/${pub.id}`, pub); }
  deletePublicacion(id: number): Observable<any> { return this.http.delete(`${this.urlPub}/${id}`); } 
  buscarPublicaciones(titulo: string, vigente: boolean): Observable<any> { return this.http.get(`${this.urlPub}/buscar?titulo=${titulo}&vigente=${vigente}`); 
  }
}