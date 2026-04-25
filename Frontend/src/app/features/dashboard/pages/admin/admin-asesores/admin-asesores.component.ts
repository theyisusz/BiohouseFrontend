import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AsesorService, Asesor } from '../../../../../core/services/asesor.service';

@Component({
  selector: 'app-admin-asesores',
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-asesores.component.html',
  styleUrl: './admin-asesores.component.css'
})
export class AdminAsesoresComponent implements OnInit {

  searchTerm = '';
  filtroEstado: 'todos' | 'activos' | 'inactivos' = 'activos';
  selectedRegion: string = '';
  regions: string[] = [];

  // MODAL DETALLE
  showDetailModal = false;
  selectedAsesor: Asesor | null = null;

  // MODAL EDICIÓN
  showEditModal = false;
  asesorEnEdicion: Asesor | null = null;
  erroresValidacion: { [key: string]: string } = {};

  // MODAL CONFIRMACIÓN
  showConfirmModal = false;

  // MODAL ELIMINAR/DESHABILITAR
  showDeleteModal = false;
  asesorAEliminar: Asesor | null = null;

  // MODAL ACTIVAR ASESOR
  showActivateModal = false;
  asesorAActivar: Asesor | null = null;

  asesores: Asesor[] = [];

  constructor(private router: Router, private asesorService: AsesorService) {}

  ngOnInit(): void {
    // Suscribirse a los cambios de asesores
    this.asesorService.getAsesores().subscribe(asesores => {
      this.asesores = asesores;
      const allRegions = this.asesores.map(a => a.departamento).filter(d => !!d) as string[];
      this.regions = Array.from(new Set(allRegions)).sort();
    });
  }

  get filteredAsesores(): Asesor[] {
    let filtered = this.asesores.filter(a => {
      const matchSearch =
        a.nombre.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        a.apellido.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        a.correo.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchRegion = this.selectedRegion ? a.departamento === this.selectedRegion : true;
      return matchSearch && matchRegion;
    });

    // Aplicar filtro de estado
    if (this.filtroEstado === 'activos') {
      filtered = filtered.filter(a => a.estado === 'activo');
    } else if (this.filtroEstado === 'inactivos') {
      filtered = filtered.filter(a => a.estado === 'inactivo');
    }

    // Ordenar: activos primero
    filtered.sort((a, b) => {
      if (a.estado === 'activo' && b.estado === 'inactivo') return -1;
      if (a.estado === 'inactivo' && b.estado === 'activo') return 1;
      return 0;
    });

    return filtered;
  }

  get totalAsesores(): number {
    return this.asesores.length;
  }

  get totalClientes(): number {
    return this.asesores.reduce((sum, a) => sum + a.clientes.length, 0);
  }

  getInitials(nombre: string, apellido: string): string {
    return `${nombre[0]}${apellido[0]}`.toUpperCase();
  }

  // VERIFICAR SI HAY ERRORES DE VALIDACIÓN
  verificarErrores(): boolean {
    return Object.keys(this.erroresValidacion).length > 0;
  }

  // VERIFICAR SI CAMPOS ESTÁN VACÍOS
  verificarCamposVacios(): boolean {
    if (!this.asesorEnEdicion) return true;
    return (
      !this.asesorEnEdicion.nombre?.trim() ||
      !this.asesorEnEdicion.apellido?.trim() ||
      !this.asesorEnEdicion.correo?.trim() ||
      !this.asesorEnEdicion.telefono?.trim()
    );
  }

  // MODAL DETALLE
  openDetail(asesor: Asesor): void {
    this.selectedAsesor = asesor;
    this.showDetailModal = true;
  }

  closeDetail(): void {
    this.showDetailModal = false;
    this.selectedAsesor = null;
  }

  // CREAR NUEVO ASESOR
  createNewAsesor(): void {
    this.router.navigate(['/admin/asesores/crear']);
  }

  // EDITAR ASESOR - ABRIR MODAL
  editAsesor(asesor: Asesor): void {
    // Crear una copia profunda del asesor
    this.asesorEnEdicion = { ...asesor, clientes: [...asesor.clientes] };
    this.erroresValidacion = {};
    this.showEditModal = true;
  }

  // CERRAR MODAL EDICIÓN
  closeEdit(): void {
    this.showEditModal = false;
    this.asesorEnEdicion = null;
    this.erroresValidacion = {};
  }

  // GUARDAR - MOSTRAR CONFIRMACIÓN
  saveAsesor(): void {
    if (this.validarFormulario()) {
      this.showConfirmModal = true;
    }
  }

  // LIMPIAR ERROR DE CAMPO MIENTRAS ESCRIBE
  limpiarErrorCampo(fieldName: string): void {
    delete this.erroresValidacion[fieldName];
  }

  // VALIDAR FORMULARIO
  validarFormulario(): boolean {
    this.erroresValidacion = {};

    if (!this.asesorEnEdicion) return false;

    const soloLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    const telefonoRegex = /^[\d\s\+\-\(\)]{7,15}$/;

    // VALIDAR NOMBRE
    if (!this.asesorEnEdicion.nombre || this.asesorEnEdicion.nombre.trim() === '') {
      this.erroresValidacion['nombre'] = 'El nombre es requerido';
    } else if (!soloLetras.test(this.asesorEnEdicion.nombre)) {
      this.erroresValidacion['nombre'] = 'Solo se permiten letras';
    } else if (this.asesorEnEdicion.nombre.trim().length < 2) {
      this.erroresValidacion['nombre'] = 'Mínimo 2 caracteres';
    } else if (this.asesorEnEdicion.nombre.trim().length > 30) {
      this.erroresValidacion['nombre'] = 'Máximo 30 caracteres';
    }

    // VALIDAR APELLIDO
    if (!this.asesorEnEdicion.apellido || this.asesorEnEdicion.apellido.trim() === '') {
      this.erroresValidacion['apellido'] = 'El apellido es requerido';
    } else if (!soloLetras.test(this.asesorEnEdicion.apellido)) {
      this.erroresValidacion['apellido'] = 'Solo se permiten letras';
    } else if (this.asesorEnEdicion.apellido.trim().length < 2) {
      this.erroresValidacion['apellido'] = 'Mínimo 2 caracteres';
    } else if (this.asesorEnEdicion.apellido.trim().length > 30) {
      this.erroresValidacion['apellido'] = 'Máximo 30 caracteres';
    }

    // VALIDAR CORREO
    if (!this.asesorEnEdicion.correo || this.asesorEnEdicion.correo.trim() === '') {
      this.erroresValidacion['correo'] = 'El correo es requerido';
    } else if (!this.esCorreoValido(this.asesorEnEdicion.correo)) {
      this.erroresValidacion['correo'] = 'El correo no es válido';
    } else if (this.asesorEnEdicion.correo.length > 60) {
      this.erroresValidacion['correo'] = 'Máximo 60 caracteres';
    }

    // VALIDAR TELÉFONO
    if (!this.asesorEnEdicion.telefono || this.asesorEnEdicion.telefono.trim() === '') {
      this.erroresValidacion['telefono'] = 'El teléfono es requerido';
    } else if (!telefonoRegex.test(this.asesorEnEdicion.telefono)) {
      this.erroresValidacion['telefono'] = 'Teléfono inválido (7-15 dígitos)';
    }

    return Object.keys(this.erroresValidacion).length === 0;
  }

  // VALIDAR EMAIL
  esCorreoValido(correo: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(correo);
  }

  // CONFIRMAR GUARDAR
  confirmSave(): void {
    if (this.asesorEnEdicion) {
      this.asesorService.updateAsesor(this.asesorEnEdicion.id, this.asesorEnEdicion);
    }
    this.showConfirmModal = false;
    this.erroresValidacion = {};
    this.closeEdit();
  }

  // CANCELAR CONFIRMACIÓN
  cancelConfirm(): void {
    this.showConfirmModal = false;
  }

  // DESABILITAR ASESOR - ABRE CONFIRMACIÓN
  deleteAsesor(asesor: Asesor): void {
    this.asesorAEliminar = asesor;
    this.showDeleteModal = true;
  }

  // CERRAR MODAL
  closeDeleteModal(): void {
    this.showDeleteModal = false;
    this.asesorAEliminar = null;
  }

  // ACTIVAR ASESOR INACTIVO - ABRIR CONFIRMACIÓN
  activateAsesor(asesor: Asesor): void {
    this.asesorAActivar = asesor;
    this.showActivateModal = true;
  }

  // CERRAR MODAL ACTIVACIÓN
  closeActivateModal(): void {
    this.showActivateModal = false;
    this.asesorAActivar = null;
  }

  // CONFIRMAR ACTIVACIÓN DEL ASESOR
  confirmActivate(): void {
    if (this.asesorAActivar) {
      this.asesorService.updateAsesor(this.asesorAActivar.id, { estado: 'activo' });
      this.closeActivateModal();
    }
  }

  // CANCELAR ACTIVACIÓN
  cancelActivate(): void {
    this.closeActivateModal();
  }

  // DESABILITAR ASESOR - TOGGLE A INACTIVO
  disableAsesor(): void {
    if (this.asesorAEliminar) {
      this.asesorService.updateAsesor(this.asesorAEliminar.id, { estado: 'inactivo' });
      this.closeDeleteModal();
    }
  }
}
