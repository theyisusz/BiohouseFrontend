import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AsesorService, Asesor } from '../../../../../core/services/asesor.service';

interface Cliente {
  id: number;
  nombre: string;
  apellido: string;
  correo: string;
  telefono: string;
  departamento?: string;
  municipio?: string;
  proyectos: number;
  fechaRegistro: string;
  ultimaSesion: string;
  estado: string;
  asesorId: number | null;
}

@Component({
  selector: 'app-admin-usuarios',
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-usuarios.component.html',
  styleUrl: './admin-usuarios.component.css'
})
export class AdminUsuariosComponent implements OnInit {

  searchTerm = '';
  selectedEstado = '';
  selectedRegion = '';
  regions: string[] = [];
  asesores: Asesor[] = [];

  clientes: Cliente[] = [
    { id: 1, nombre: 'Juan',   apellido: 'Pérez',    correo: 'juan@ejemplo.com',   telefono: '+57 300 111 2233', departamento: 'Valle del Cauca', municipio: 'Cali', proyectos: 3, fechaRegistro: '01/01/2026', ultimaSesion: 'Hoy, 10:30 am',    estado: 'Activo',   asesorId: 1 },
    { id: 2, nombre: 'María',  apellido: 'López',    correo: 'maria@ejemplo.com',  telefono: '+57 311 222 3344', departamento: 'Antioquia', municipio: 'Medellín', proyectos: 1, fechaRegistro: '15/01/2026', ultimaSesion: 'Ayer, 3:15 pm',    estado: 'Activo',   asesorId: 2 },
    { id: 3, nombre: 'Carlos', apellido: 'Ruiz',     correo: 'carlos@ejemplo.com', telefono: '+57 322 333 4455', departamento: 'Bogotá D.C.', municipio: 'Bogotá', proyectos: 2, fechaRegistro: '20/01/2026', ultimaSesion: 'Hace 3 días',      estado: 'Inactivo', asesorId: 3 },
    { id: 4, nombre: 'Ana',    apellido: 'Martínez', correo: 'ana@ejemplo.com',    telefono: '+57 333 444 5566', departamento: 'Valle del Cauca', municipio: 'Palmira', proyectos: 4, fechaRegistro: '05/02/2026', ultimaSesion: 'Hoy, 8:00 am',     estado: 'Activo',   asesorId: 1 },
    { id: 5, nombre: 'Luis',   apellido: 'Gómez',    correo: 'luis@ejemplo.com',   telefono: '+57 344 555 6677', departamento: 'Cundinamarca', municipio: 'Soacha', proyectos: 1, fechaRegistro: '10/02/2026', ultimaSesion: 'Hace una semana',  estado: 'Inactivo', asesorId: null },
    { id: 6, nombre: 'Sofia',  apellido: 'Torres',   correo: 'sofia@ejemplo.com',  telefono: '+57 355 666 7788', departamento: 'Atlántico', municipio: 'Barranquilla', proyectos: 2, fechaRegistro: '14/02/2026', ultimaSesion: 'Hace 2 días',      estado: 'Activo',   asesorId: 2 },
  ];

  // MODAL DETALLE
  showDetailModal = false;
  selectedCliente: Cliente | null = null;

  // MODAL ESTADO
  showEstadoModal = false;
  clienteToEdit: Cliente | null = null;
  newEstado = '';

  // MODAL ASIGNAR ASESOR
  showAsesorModal = false;
  clienteToAssignAsesor: Cliente | null = null;
  selectedAsesorId: number | null = null;

  constructor(private asesorService: AsesorService) {}

  ngOnInit(): void {
    // Suscribirse a los cambios de asesores
    this.asesorService.getAsesores().subscribe(asesores => {
      this.asesores = asesores;
    });
    const allRegions = this.clientes.map(c => c.departamento).filter(d => !!d) as string[];
    this.regions = Array.from(new Set(allRegions)).sort();
  }

  get filteredClientes(): Cliente[] {
    return this.clientes.filter(c => {
      const matchSearch = 
        c.nombre.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        c.apellido.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        c.correo.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchEstado = this.selectedEstado ? c.estado === this.selectedEstado : true;
      const matchRegion = this.selectedRegion ? c.departamento === this.selectedRegion : true;
      return matchSearch && matchEstado && matchRegion;
    });
  }

  getEstadoBadge(estado: string): string {
    switch (estado) {
      case 'Activo':    return 'badge-activo';
      case 'Inactivo':  return 'badge-inactivo';
      case 'Bloqueado': return 'badge-bloqueado';
      default:          return '';
    }
  }

  getInitials(nombre: string, apellido: string): string {
    return `${nombre[0]}${apellido[0]}`.toUpperCase();
  }

  // DETALLE
  openDetail(cliente: Cliente): void {
    this.selectedCliente = cliente;
    this.showDetailModal = true;
  }

  closeDetail(): void {
    this.showDetailModal = false;
    this.selectedCliente = null;
  }

  // CAMBIAR ESTADO
  openEstadoModal(cliente: Cliente): void {
    this.clienteToEdit = cliente;
    this.newEstado = cliente.estado;
    this.showEstadoModal = true;
  }

  closeEstadoModal(): void {
    this.showEstadoModal = false;
    this.clienteToEdit = null;
    this.newEstado = '';
  }

  saveEstado(): void {
    if (this.clienteToEdit) {
      const index = this.clientes.findIndex(c => c.id === this.clienteToEdit!.id);
      if (index !== -1) {
        this.clientes[index].estado = this.newEstado;
        // Forzar re-render del array para detectar cambios
        this.clientes = [...this.clientes];
      }
    }
    this.closeEstadoModal();
  }

  // OBTENER NOMBRE DEL ASESOR POR ID
  getAsesorNombre(asesorId: number | null): string {
    if (!asesorId) return 'Sin asesor';
    const asesor = this.asesores.find(a => a.id === asesorId);
    return asesor ? `${asesor.nombre} ${asesor.apellido}` : 'Sin asesor';
  }

  // ASIGNAR ASESOR
  openAsesorModal(cliente: Cliente): void {
    this.clienteToAssignAsesor = cliente;
    this.selectedAsesorId = cliente.asesorId;
    this.showAsesorModal = true;
  }

  closeAsesorModal(): void {
    this.showAsesorModal = false;
    this.clienteToAssignAsesor = null;
    this.selectedAsesorId = null;
  }

  onAsesorChange(): void {
    // Este método ayuda a Angular a detectar cambios en el select
    console.log('Asesor seleccionado:', this.selectedAsesorId);
  }

  saveAsesor(): void {
    if (this.clienteToAssignAsesor) {
      const index = this.clientes.findIndex(c => c.id === this.clienteToAssignAsesor!.id);
      if (index !== -1) {
        // Convertir a número si es necesario
        const asesorId = this.selectedAsesorId ? Number(this.selectedAsesorId) : null;
        
        // Si el cliente tenía un asesor anterior, desasignarlo
        const asesorAnterior = this.clientes[index].asesorId;
        if (asesorAnterior && asesorAnterior !== asesorId) {
          this.asesorService.unassignClienteFromAsesor(asesorAnterior, this.clienteToAssignAsesor.id);
        }
        
        // Asignar cliente al nuevo asesor
        if (asesorId) {
          const clienteData = {
            id: this.clienteToAssignAsesor.id,
            nombre: this.clienteToAssignAsesor.nombre,
            apellido: this.clienteToAssignAsesor.apellido,
            correo: this.clienteToAssignAsesor.correo,
            telefono: this.clienteToAssignAsesor.telefono
          };
          this.asesorService.assignClienteToAsesor(asesorId, clienteData);
        }
        
        // Actualizar el cliente en la lista local
        this.clientes[index].asesorId = asesorId;
        // Forzar re-render del array para detectar cambios
        this.clientes = [...this.clientes];
      }
    }
    this.closeAsesorModal();
  }
}