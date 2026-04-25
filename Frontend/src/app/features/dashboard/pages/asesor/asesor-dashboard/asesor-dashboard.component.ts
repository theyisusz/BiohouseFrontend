import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-asesor-dashboard',
  imports: [CommonModule, RouterModule],
  templateUrl: './asesor-dashboard.component.html',
  styleUrl: './asesor-dashboard.component.css'
})
export class AsesorDashboardComponent {

  today = new Date();

  stats = [
    { icon: '👥', label: 'Clientes asignados',      value: 12, sub: '3 activos hoy',     color: 'stat-green'  },
    { icon: '📄', label: 'Cotizaciones en gestión', value: 8,  sub: '2 pendientes',       color: 'stat-blue'   },
    { icon: '✅', label: 'Cotizaciones cerradas',   value: 15, sub: 'Este mes',           color: 'stat-yellow' },
    { icon: '⏳', label: 'En negociación',          value: 3,  sub: 'Requieren atención', color: 'stat-purple' },
  ];

  recentClientes = [
    { nombre: 'Juan Pérez',   correo: 'juan@ejemplo.com',   proyectos: 3, ultimaSesion: 'Hoy, 10:30 am',   estado: 'Activo'   },
    { nombre: 'Ana Martínez', correo: 'ana@ejemplo.com',    proyectos: 4, ultimaSesion: 'Hoy, 8:00 am',    estado: 'Activo'   },
    { nombre: 'Carlos Ruiz',  correo: 'carlos@ejemplo.com', proyectos: 2, ultimaSesion: 'Hace 3 días',     estado: 'Inactivo' },
    { nombre: 'María López',  correo: 'maria@ejemplo.com',  proyectos: 1, ultimaSesion: 'Ayer, 3:15 pm',   estado: 'Activo'   },
  ];

  recentCotizaciones = [
    { cliente: 'Juan Pérez',   proyecto: 'Residencia Minimalista', valor: '$95,000',  estado: 'En negociación' },
    { cliente: 'Ana Martínez', proyecto: 'Casa Eco-Moderna',       valor: '$125,000', estado: 'En contacto'    },
    { cliente: 'María López',  proyecto: 'Casa Familiar',          valor: '$75,000',  estado: 'Cerrado'        },
    { cliente: 'Carlos Ruiz',  proyecto: 'Casa de Campo',          valor: '$130,000', estado: 'Pendiente'      },
  ];

  getBadgeClass(estado: string): string {
    switch (estado) {
      case 'Activo':          return 'badge-activo';
      case 'Inactivo':        return 'badge-inactivo';
      case 'Pendiente':       return 'badge-pendiente';
      case 'En contacto':     return 'badge-contacto';
      case 'En negociación':  return 'badge-negociacion';
      case 'Cerrado':         return 'badge-cerrado';
      case 'Rechazado':       return 'badge-rechazado';
      default:                return '';
    }
  }

  getInitials(nombre: string): string {
    const parts = nombre.split(' ');
    return parts.length >= 2
      ? `${parts[0][0]}${parts[1][0]}`.toUpperCase()
      : nombre[0].toUpperCase();
  }
}