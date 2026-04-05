import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Proyecto } from '../models/proyecto.model';

@Injectable({ providedIn: 'root' })
export class ProyectoService {

  private apiUrl = 'http://localhost:8080/api/proyectos';

  constructor(private http: HttpClient) {}

  getMisProyectos(): Observable<Proyecto[]> {
    return this.http.get<Proyecto[]>(this.apiUrl);
  }

  getProyecto(id: number): Observable<Proyecto> {
    return this.http.get<Proyecto>(`${this.apiUrl}/${id}`);
  }

  crearProyecto(data: Partial<Proyecto>): Observable<Proyecto> {
    return this.http.post<Proyecto>(this.apiUrl, data);
  }

  actualizarProyecto(id: number, data: Partial<Proyecto>): Observable<Proyecto> {
    return this.http.put<Proyecto>(`${this.apiUrl}/${id}`, data);
  }

  eliminarProyecto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}