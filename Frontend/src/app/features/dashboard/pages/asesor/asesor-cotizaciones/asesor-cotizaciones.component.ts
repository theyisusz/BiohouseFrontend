import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Cotizacion {
  id: number;
  cliente: string;
  correo: string;
  proyecto: string;
  costoTotal: number;
  fecha: string;
  estado: string;
}

@Component({
  selector: 'app-asesor-cotizaciones',
  imports: [CommonModule, FormsModule],
  templateUrl: './asesor-cotizaciones.component.html',
  styleUrl: './asesor-cotizaciones.component.css'
})
export class AsesorCotizacionesComponent {

  searchTerm = '';
  selectedEstado = '';

  showEstadoModal = false;
  cotizacionToEdit: Cotizacion | null = null;
  newEstado = '';

  cotizaciones: Cotizacion[] = [
    { id: 1, cliente: 'Juan Pérez',   correo: 'juan@ejemplo.com',   proyecto: 'Residencia Minimalista', costoTotal: 95000,  fecha: '03/02/2026', estado: 'Cerrado'        },
    { id: 2, cliente: 'Ana Martínez', correo: 'ana@ejemplo.com',    proyecto: 'Casa Eco-Moderna',       costoTotal: 125000, fecha: '05/02/2026', estado: 'En negociación' },
    { id: 3, cliente: 'María López',  correo: 'maria@ejemplo.com',  proyecto: 'Casa Familiar',          costoTotal: 75000,  fecha: '10/02/2026', estado: 'En contacto'    },
    { id: 4, cliente: 'Carlos Ruiz',  correo: 'carlos@ejemplo.com', proyecto: 'Casa de Campo',          costoTotal: 130000, fecha: '15/02/2026', estado: 'Pendiente'      },
    { id: 5, cliente: 'Luis Gómez',   correo: 'luis@ejemplo.com',   proyecto: 'Casa Moderna',           costoTotal: 58000,  fecha: '20/02/2026', estado: 'Rechazado'      },
  ];

  get filteredCotizaciones(): Cotizacion[] {
    return this.cotizaciones.filter(c => {
      const matchSearch =
        c.cliente.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        c.proyecto.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchEstado = this.selectedEstado ? c.estado === this.selectedEstado : true;
      return matchSearch && matchEstado;
    });
  }

  getBadgeClass(estado: string): string {
    switch (estado) {
      case 'Pendiente':      return 'badge-pendiente';
      case 'En contacto':    return 'badge-contacto';
      case 'En negociación': return 'badge-negociacion';
      case 'Cerrado':        return 'badge-cerrado';
      case 'Rechazado':      return 'badge-rechazado';
      default:               return '';
    }
  }

  getInitials(nombre: string): string {
    const parts = nombre.split(' ');
    return parts.length >= 2
      ? `${parts[0][0]}${parts[1][0]}`.toUpperCase()
      : nombre[0].toUpperCase();
  }

  openEstadoModal(cot: Cotizacion): void {
    this.cotizacionToEdit = cot;
    this.newEstado = cot.estado;
    this.showEstadoModal = true;
  }

  closeEstadoModal(): void {
    this.showEstadoModal = false;
    this.cotizacionToEdit = null;
    this.newEstado = '';
  }

  saveEstado(): void {
    if (this.cotizacionToEdit) {
      this.cotizacionToEdit.estado = this.newEstado;
    }
    this.closeEstadoModal();
  }
}