import { Component } from '@angular/core';
//import { CommonModule } from '@angular/common';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  imports: [CommonModule, DatePipe],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
  today = new Date();

  stats = [
    {
      icon: '👥',
      label: 'Clientes registrados',
      value: 24,
      sub: '+3 este mes',
      color: 'stat-green'
    },
    {
      icon: '📁',
      label: 'Proyectos activos',
      value: 18,
      sub: '6 completados',
      color: 'stat-blue'
    },
    {
      icon: '📄',
      label: 'Cotizaciones generadas',
      value: 41,
      sub: '+8 esta semana',
      color: 'stat-yellow'
    },
    {
      icon: '💲',
      label: 'Valor total cotizado',
      value: '$4.2M',
      sub: 'COP estimado',
      color: 'stat-purple'
    }
  ];

  recentClients = [
    { nombre: 'Juan Pérez',     correo: 'juan@ejemplo.com',   proyectos: 3, ultimaSesion: 'Hoy, 10:30 am',    estado: 'Activo' },
    { nombre: 'María López',    correo: 'maria@ejemplo.com',  proyectos: 1, ultimaSesion: 'Ayer, 3:15 pm',    estado: 'Activo' },
    { nombre: 'Carlos Ruiz',    correo: 'carlos@ejemplo.com', proyectos: 2, ultimaSesion: 'Hace 3 días',      estado: 'Inactivo' },
    { nombre: 'Ana Martínez',   correo: 'ana@ejemplo.com',    proyectos: 4, ultimaSesion: 'Hoy, 8:00 am',     estado: 'Activo' },
    { nombre: 'Luis Gómez',     correo: 'luis@ejemplo.com',   proyectos: 1, ultimaSesion: 'Hace una semana',  estado: 'Inactivo' },
  ];

  recentQuotations = [
    { cliente: 'Juan Pérez',   proyecto: 'Residencia Minimalista',  valor: '$95,000',  estado: 'Completado' },
    { cliente: 'Ana Martínez', proyecto: 'Casa Eco-Moderna',        valor: '$125,000', estado: 'En proceso' },
    { cliente: 'María López',  proyecto: 'Casa Familiar',           valor: '$75,000',  estado: 'Completado' },
    { cliente: 'Carlos Ruiz',  proyecto: 'Casa de Campo',           valor: '$130,000', estado: 'Pendiente'  },
  ];

  getEstadoBadge(estado: string): string {
    switch (estado) {
      case 'Activo':      return 'badge-activo';
      case 'Inactivo':    return 'badge-inactivo';
      case 'Completado':  return 'badge-completado';
      case 'En proceso':  return 'badge-proceso';
      case 'Pendiente':   return 'badge-pendiente';
      default:            return '';
    }
  }
}