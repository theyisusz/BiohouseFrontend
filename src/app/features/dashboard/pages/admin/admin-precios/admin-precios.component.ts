import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Material {
  id: number;
  nombre: string;
  descripcion: string;
  precioUnitario: number;
  unidad: string;
  ultimaActualizacion: string;
}

@Component({
  selector: 'app-admin-precios',
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-precios.component.html',
  styleUrl: './admin-precios.component.css'
})
export class AdminPreciosComponent {

  showEditModal = false;
  newPrecio: number = 0;
  precioError = '';

  material: Material = {
    id: 1,
    nombre: 'Bloqueplas',
    descripcion: 'Bloque modular fabricado con plástico recuperado. Material insignia de BioHouse para la construcción de estructuras.',
    precioUnitario: 8500,
    unidad: 'unidad',
    ultimaActualizacion: '01/03/2026'
  };

  openEditModal(): void {
    this.newPrecio = this.material.precioUnitario;
    this.precioError = '';
    this.showEditModal = true;
  }

  closeEditModal(): void {
    this.showEditModal = false;
    this.precioError = '';
  }

  validateAndSave(): void {
    this.precioError = '';

    if (!this.newPrecio || this.newPrecio <= 0) {
      this.precioError = 'El precio debe ser mayor a 0.';
      return;
    }

    if (this.newPrecio > 9999999) {
      this.precioError = 'El precio no puede superar $9,999,999.';
      return;
    }

    this.material.precioUnitario = this.newPrecio;
    this.material.ultimaActualizacion = new Date().toLocaleDateString('es-CO');
    this.closeEditModal();
  }
}