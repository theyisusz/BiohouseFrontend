import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Cliente {
  id: number;
  nombre: string;
  apellido: string;
  correo: string;
  telefono: string;
  proyectos: number;
  fechaRegistro: string;
  ultimaSesion: string;
  estado: string;
}

@Component({
  selector: 'app-asesor-clientes',
  imports: [CommonModule, FormsModule],
  templateUrl: './asesor-clientes.component.html',
  styleUrl: './asesor-clientes.component.css'
})
export class AsesorClientesComponent {

  searchTerm = '';
  selectedEstado = '';

  showDetailModal = false;
  selectedCliente: Cliente | null = null;

  clientes: Cliente[] = [
    { id: 1, nombre: 'Juan',   apellido: 'Pérez',    correo: 'juan@ejemplo.com',   telefono: '+57 300 111 2233', proyectos: 3, fechaRegistro: '01/01/2026', ultimaSesion: 'Hoy, 10:30 am',   estado: 'Activo'   },
    { id: 2, nombre: 'María',  apellido: 'López',    correo: 'maria@ejemplo.com',  telefono: '+57 311 222 3344', proyectos: 1, fechaRegistro: '15/01/2026', ultimaSesion: 'Ayer, 3:15 pm',   estado: 'Activo'   },
    { id: 3, nombre: 'Carlos', apellido: 'Ruiz',     correo: 'carlos@ejemplo.com', telefono: '+57 322 333 4455', proyectos: 2, fechaRegistro: '20/01/2026', ultimaSesion: 'Hace 3 días',     estado: 'Inactivo' },
    { id: 4, nombre: 'Ana',    apellido: 'Martínez', correo: 'ana@ejemplo.com',    telefono: '+57 333 444 5566', proyectos: 4, fechaRegistro: '05/02/2026', ultimaSesion: 'Hoy, 8:00 am',    estado: 'Activo'   },
    { id: 5, nombre: 'Luis',   apellido: 'Gómez',    correo: 'luis@ejemplo.com',   telefono: '+57 344 555 6677', proyectos: 1, fechaRegistro: '10/02/2026', ultimaSesion: 'Hace una semana', estado: 'Inactivo' },
  ];

  get filteredClientes(): Cliente[] {
    return this.clientes.filter(c => {
      const matchSearch =
        c.nombre.toLowerCase().includes(this.searchTerm.toLowerCase())   ||
        c.apellido.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        c.correo.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchEstado = this.selectedEstado ? c.estado === this.selectedEstado : true;
      return matchSearch && matchEstado;
    });
  }

  getBadgeClass(estado: string): string {
    return estado === 'Activo' ? 'badge-activo' : 'badge-inactivo';
  }

  getInitials(nombre: string, apellido: string): string {
    return `${nombre[0]}${apellido[0]}`.toUpperCase();
  }

  openDetail(cliente: Cliente): void {
    this.selectedCliente = cliente;
    this.showDetailModal = true;
  }

  closeDetail(): void {
    this.showDetailModal = false;
    this.selectedCliente = null;
  }
}