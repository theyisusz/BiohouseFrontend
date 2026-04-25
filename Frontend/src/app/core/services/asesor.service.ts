import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface ClienteAsesor {
  id: number;
  nombre: string;
  apellido: string;
  correo: string;
  telefono: string;
}

export interface Asesor {
  id: number;
  nombre: string;
  apellido: string;
  correo: string;
  telefono: string;
  departamento?: string;
  municipio?: string;
  clientes: ClienteAsesor[];
  estado: 'activo' | 'inactivo';
}

@Injectable({ providedIn: 'root' })
export class AsesorService {

  private asesoresSubject = new BehaviorSubject<Asesor[]>([
    {
      id: 1,
      nombre: 'Pedro',
      apellido: 'Ramírez',
      correo: 'pedro@ejemplo.com',
      telefono: '+57 300 111 2233',
      departamento: 'Valle del Cauca',
      municipio: 'Cali',
      estado: 'activo',
      clientes: [
        { id: 1, nombre: 'Juan', apellido: 'García', correo: 'juan@ejemplo.com', telefono: '+57 301 111 1111' },
        { id: 2, nombre: 'María', apellido: 'López', correo: 'maria@ejemplo.com', telefono: '+57 302 222 2222' },
        { id: 3, nombre: 'Carlos', apellido: 'Martínez', correo: 'carlos@ejemplo.com', telefono: '+57 303 333 3333' },
      ]
    },
    {
      id: 2,
      nombre: 'Laura',
      apellido: 'Castillo',
      correo: 'laura@ejemplo.com',
      telefono: '+57 311 222 3344',
      departamento: 'Bogotá D.C.',
      municipio: 'Bogotá',
      estado: 'activo',
      clientes: [
        { id: 4, nombre: 'Ana', apellido: 'Rodríguez', correo: 'ana@ejemplo.com', telefono: '+57 304 444 4444' },
        { id: 5, nombre: 'Luis', apellido: 'Hernández', correo: 'luis@ejemplo.com', telefono: '+57 305 555 5555' },
      ]
    },
    {
      id: 3,
      nombre: 'Andrés',
      apellido: 'Mora',
      correo: 'andres@ejemplo.com',
      telefono: '+57 322 333 4455',
      departamento: 'Antioquia',
      municipio: 'Medellín',
      estado: 'activo',
      clientes: [
        { id: 6, nombre: 'Paula', apellido: 'Sánchez', correo: 'paula@ejemplo.com', telefono: '+57 306 666 6666' },
        { id: 7, nombre: 'Diego', apellido: 'Pérez', correo: 'diego@ejemplo.com', telefono: '+57 307 777 7777' },
        { id: 8, nombre: 'Sofía', apellido: 'González', correo: 'sofia@ejemplo.com', telefono: '+57 308 888 8888' },
        { id: 9, nombre: 'Marcos', apellido: 'Torres', correo: 'marcos@ejemplo.com', telefono: '+57 309 999 9999' },
      ]
    },
    {
      id: 4,
      nombre: 'Camila',
      apellido: 'Vargas',
      correo: 'camila@ejemplo.com',
      telefono: '+57 333 444 5566',
      departamento: 'Cauca',
      municipio: 'Popayán',
      estado: 'inactivo',
      clientes: [
        { id: 10, nombre: 'Elena', apellido: 'Díaz', correo: 'elena@ejemplo.com', telefono: '+57 310 111 0000' },
      ]
    },
    {
      id: 5,
      nombre: 'Ricardo',
      apellido: 'Peña',
      correo: 'ricardo@ejemplo.com',
      telefono: '+57 344 555 6677',
      departamento: 'Valle del Cauca',
      municipio: 'Buenaventura',
      estado: 'activo',
      clientes: []
    },
  ]);

  asesores$ = this.asesoresSubject.asObservable();

  constructor() {}

  getAsesores(): Observable<Asesor[]> {
    return this.asesores$;
  }

  getAsesoresSync(): Asesor[] {
    return this.asesoresSubject.value;
  }

  addAsesor(asesor: Asesor): void {
    const currentAsesores = this.asesoresSubject.value;
    // Generar ID automáticamente
    const newId = currentAsesores.length > 0 ? Math.max(...currentAsesores.map(a => a.id)) + 1 : 1;
    const newAsesor: Asesor = {
      ...asesor,
      id: newId,
      clientes: [],
      estado: 'activo'
    };
    this.asesoresSubject.next([...currentAsesores, newAsesor]);
  }

  updateAsesor(id: number, asesor: Partial<Asesor>): void {
    const currentAsesores = this.asesoresSubject.value;
    const index = currentAsesores.findIndex(a => a.id === id);
    if (index !== -1) {
      currentAsesores[index] = { ...currentAsesores[index], ...asesor };
      this.asesoresSubject.next([...currentAsesores]);
    }
  }

  deleteAsesor(id: number): void {
    const currentAsesores = this.asesoresSubject.value.filter(a => a.id !== id);
    this.asesoresSubject.next(currentAsesores);
  }

  // ASIGNAR CLIENTE A ASESOR
  assignClienteToAsesor(asesorId: number, cliente: ClienteAsesor): void {
    const currentAsesores = this.asesoresSubject.value;
    const asesorIndex = currentAsesores.findIndex(a => a.id === asesorId);
    
    if (asesorIndex !== -1) {
      const asesor = currentAsesores[asesorIndex];
      // Verificar si el cliente ya está asignado
      const clienteIndex = asesor.clientes.findIndex(c => c.id === cliente.id);
      
      if (clienteIndex === -1) {
        // Agregar cliente
        asesor.clientes = [...asesor.clientes, cliente];
      } else {
        // Actualizar cliente
        asesor.clientes[clienteIndex] = cliente;
      }
      
      this.asesoresSubject.next([...currentAsesores]);
    }
  }

  // DESASIGNAR CLIENTE DE ASESOR
  unassignClienteFromAsesor(asesorId: number, clienteId: number): void {
    const currentAsesores = this.asesoresSubject.value;
    const asesorIndex = currentAsesores.findIndex(a => a.id === asesorId);
    
    if (asesorIndex !== -1) {
      const asesor = currentAsesores[asesorIndex];
      asesor.clientes = asesor.clientes.filter(c => c.id !== clienteId);
      this.asesoresSubject.next([...currentAsesores]);
    }
  }
}
