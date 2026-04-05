import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import { Cotizacion } from '../models/cotizacion.model';
import { Material } from '../models/material.model';

@Injectable({ providedIn: 'root' })
export class AdminService {

  private apiUrl = 'http://localhost:8080/api/admin';

  constructor(private http: HttpClient) {}

  // STATS
  getStats(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/stats`);
  }

  // USUARIOS
  getClientes(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}/clientes`);
  }

  getRecentClients(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}/clientes/recientes`);
  }

  cambiarEstadoUsuario(id: number, estado: string): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.apiUrl}/clientes/${id}/estado`, { estado });
  }

  // COTIZACIONES
  getAllCotizaciones(): Observable<Cotizacion[]> {
    return this.http.get<Cotizacion[]>(`${this.apiUrl}/cotizaciones`);
  }

  getRecentQuotations(): Observable<Cotizacion[]> {
    return this.http.get<Cotizacion[]>(`${this.apiUrl}/cotizaciones/recientes`);
  }

  // MATERIALES / PRECIOS
  getMateriales(): Observable<Material[]> {
    return this.http.get<Material[]>(`${this.apiUrl}/materiales`);
  }

  actualizarPrecio(id: number, precio: number): Observable<Material> {
    return this.http.put<Material>(`${this.apiUrl}/materiales/${id}/precio`, { precio });
  }
}