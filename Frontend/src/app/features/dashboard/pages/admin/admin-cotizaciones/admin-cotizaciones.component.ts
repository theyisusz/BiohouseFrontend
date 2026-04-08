import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Cotizacion {
  id: number;
  cliente: string;
  correo: string;
  proyecto: string;
  totalMateriales: number;
  costoTotal: number;
  fecha: string;
  estado: string;
}

@Component({
  selector: 'app-admin-cotizaciones',
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-cotizaciones.component.html',
  styleUrl: './admin-cotizaciones.component.css'
})
export class AdminCotizacionesComponent {

  searchTerm = '';
  selectedEstado = '';

  cotizaciones: Cotizacion[] = [
    { id: 1, cliente: 'Juan Pérez',   correo: 'juan@ejemplo.com',   proyecto: 'Residencia Minimalista',  totalMateriales: 320, costoTotal: 95000,  fecha: '03/02/2026', estado: 'Cerrado'        },
    { id: 2, cliente: 'Ana Martínez', correo: 'ana@ejemplo.com',    proyecto: 'Casa Eco-Moderna',        totalMateriales: 410, costoTotal: 125000, fecha: '05/02/2026', estado: 'En negociación' },
    { id: 3, cliente: 'María López',  correo: 'maria@ejemplo.com',  proyecto: 'Casa Familiar',           totalMateriales: 280, costoTotal: 75000,  fecha: '10/02/2026', estado: 'Cerrado'        },
    { id: 4, cliente: 'Carlos Ruiz',  correo: 'carlos@ejemplo.com', proyecto: 'Casa de Campo',           totalMateriales: 480, costoTotal: 130000, fecha: '15/02/2026', estado: 'Pendiente'      },
    { id: 5, cliente: 'Luis Gómez',   correo: 'luis@ejemplo.com',   proyecto: 'Casa Moderna',            totalMateriales: 190, costoTotal: 58000,  fecha: '20/02/2026', estado: 'En contacto'    },
    { id: 6, cliente: 'Sofia Torres', correo: 'sofia@ejemplo.com',  proyecto: 'Residencia Campestre',    totalMateriales: 350, costoTotal: 110000, fecha: '25/02/2026', estado: 'Rechazado'      },
  ];

  // MODAL DETALLE
  showDetailModal = false;
  selectedCotizacion: Cotizacion | null = null;

  // MODAL ESTADO
  showEstadoModal = false;
  cotizacionToEdit: Cotizacion | null = null;
  newEstado = '';

  get filteredCotizaciones(): Cotizacion[] {
    return this.cotizaciones.filter(c => {
      const matchSearch =
        c.cliente.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        c.proyecto.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        c.correo.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchEstado = this.selectedEstado ? c.estado === this.selectedEstado : true;
      return matchSearch && matchEstado;
    });
  }

  get totalCotizado(): number {
    return this.cotizaciones.reduce((acc, c) => acc + c.costoTotal, 0);
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

  // DETALLE
  openDetail(cotizacion: Cotizacion): void {
    this.selectedCotizacion = cotizacion;
    this.showDetailModal = true;
  }

  closeDetail(): void {
    this.showDetailModal = false;
    this.selectedCotizacion = null;
  }

  // CAMBIAR ESTADO
  openEstadoModal(cotizacion: Cotizacion): void {
    this.cotizacionToEdit = cotizacion;
    this.newEstado = cotizacion.estado;
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