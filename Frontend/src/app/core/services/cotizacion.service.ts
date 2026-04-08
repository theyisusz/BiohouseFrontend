import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cotizacion } from '../models/cotizacion.model';

@Injectable({ providedIn: 'root' })
export class CotizacionService {

  private apiUrl = 'http://localhost:8080/api/cotizaciones';

  constructor(private http: HttpClient) {}

  getMisCotizaciones(): Observable<Cotizacion[]> {
    return this.http.get<Cotizacion[]>(this.apiUrl);
  }

  getCotizacion(id: number): Observable<Cotizacion> {
    return this.http.get<Cotizacion>(`${this.apiUrl}/${id}`);
  }

  generarCotizacion(proyectoId: number): Observable<Cotizacion> {
    return this.http.post<Cotizacion>(`${this.apiUrl}/generar/${proyectoId}`, {});
  }

  guardarCotizacion(data: Partial<Cotizacion>): Observable<Cotizacion> {
    return this.http.post<Cotizacion>(this.apiUrl, data);
  }

  cambiarEstado(id: number, estado: string): Observable<Cotizacion> {
    return this.http.put<Cotizacion>(`${this.apiUrl}/${id}/estado`, { estado });
  }
}