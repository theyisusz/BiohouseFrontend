import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Asesor {
  id: number;
  nombre: string;
  apellido: string;
  correo: string;
  telefono: string;
  fechaSolicitud: string;
  estado: string;
}

@Component({
  selector: 'app-admin-asesores',
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-asesores.component.html',
  styleUrl: './admin-asesores.component.css'
})
export class AdminAsesoresComponent {

  searchTerm = '';
  selectedEstado = '';

  // MODAL DETALLE
  showDetailModal = false;
  selectedAsesor: Asesor | null = null;

  // MODAL CONFIRMACIÓN
  showConfirmModal = false;
  asesorToAction: Asesor | null = null;
  confirmAction: 'aprobar' | 'rechazar' | null = null;

  asesores: Asesor[] = [
    { id: 1, nombre: 'Pedro',   apellido: 'Ramírez',  correo: 'pedro@ejemplo.com',   telefono: '+57 300 111 2233', fechaSolicitud: '01/03/2026', estado: 'Pendiente' },
    { id: 2, nombre: 'Laura',   apellido: 'Castillo', correo: 'laura@ejemplo.com',   telefono: '+57 311 222 3344', fechaSolicitud: '05/03/2026', estado: 'Aprobado'  },
    { id: 3, nombre: 'Andrés',  apellido: 'Mora',     correo: 'andres@ejemplo.com',  telefono: '+57 322 333 4455', fechaSolicitud: '10/03/2026', estado: 'Pendiente' },
    { id: 4, nombre: 'Camila',  apellido: 'Vargas',   correo: 'camila@ejemplo.com',  telefono: '+57 333 444 5566', fechaSolicitud: '12/03/2026', estado: 'Rechazado' },
    { id: 5, nombre: 'Ricardo', apellido: 'Peña',     correo: 'ricardo@ejemplo.com', telefono: '+57 344 555 6677', fechaSolicitud: '15/03/2026', estado: 'Aprobado'  },
  ];

  get filteredAsesores(): Asesor[] {
    return this.asesores.filter(a => {
      const matchSearch =
        a.nombre.toLowerCase().includes(this.searchTerm.toLowerCase())   ||
        a.apellido.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        a.correo.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchEstado = this.selectedEstado ? a.estado === this.selectedEstado : true;
      return matchSearch && matchEstado;
    });
  }

  get totalPendientes(): number {
    return this.asesores.filter(a => a.estado === 'Pendiente').length;
  }

  get totalAprobados(): number {
    return this.asesores.filter(a => a.estado === 'Aprobado').length;
  }

  getBadgeClass(estado: string): string {
    switch (estado) {
      case 'Pendiente': return 'badge-pendiente';
      case 'Aprobado':  return 'badge-aprobado';
      case 'Rechazado': return 'badge-rechazado';
      default:          return '';
    }
  }

  getInitials(nombre: string, apellido: string): string {
    return `${nombre[0]}${apellido[0]}`.toUpperCase();
  }

  // DETALLE
  openDetail(asesor: Asesor): void {
    this.selectedAsesor = asesor;
    this.showDetailModal = true;
  }

  closeDetail(): void {
    this.showDetailModal = false;
    this.selectedAsesor = null;
  }

  // CONFIRMAR ACCIÓN
  openConfirm(asesor: Asesor, action: 'aprobar' | 'rechazar'): void {
    this.asesorToAction  = asesor;
    this.confirmAction   = action;
    this.showConfirmModal = true;
  }

  closeConfirm(): void {
    this.showConfirmModal = false;
    this.asesorToAction  = null;
    this.confirmAction   = null;
  }

  executeAction(): void {
    if (this.asesorToAction && this.confirmAction) {
      this.asesorToAction.estado = this.confirmAction === 'aprobar' ? 'Aprobado' : 'Rechazado';
    }
    this.closeConfirm();
  }
}