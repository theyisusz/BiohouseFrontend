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

  // MODAL EDITAR
  showEditModal = false;
  materialToEdit: Material | null = null;
  newPrecio: number = 0;
  precioError = '';

  materiales: Material[] = [
    {
      id: 1,
      nombre: 'Bloqueplas Estándar',
      descripcion: 'Bloque modular fabricado con plástico recuperado. Uso en paredes principales.',
      precioUnitario: 8500,
      unidad: 'unidad',
      ultimaActualizacion: '01/03/2026'
    },
    {
      id: 2,
      nombre: 'Bloqueplas Esquinero',
      descripcion: 'Bloque especial para esquinas y bordes de la estructura.',
      precioUnitario: 9200,
      unidad: 'unidad',
      ultimaActualizacion: '01/03/2026'
    },
    {
      id: 3,
      nombre: 'Bloqueplas Media Pared',
      descripcion: 'Bloque de menor altura para ventanas y remates.',
      precioUnitario: 6800,
      unidad: 'unidad',
      ultimaActualizacion: '15/02/2026'
    },
    {
      id: 4,
      nombre: 'Bloqueplas Puerta',
      descripcion: 'Marco modular para instalación de puertas en la estructura.',
      precioUnitario: 12000,
      unidad: 'unidad',
      ultimaActualizacion: '10/02/2026'
    },
    {
      id: 5,
      nombre: 'Bloqueplas Ventana',
      descripcion: 'Marco modular para instalación de ventanas en la estructura.',
      precioUnitario: 11000,
      unidad: 'unidad',
      ultimaActualizacion: '10/02/2026'
    },
    {
      id: 6,
      nombre: 'Cemento de unión',
      descripcion: 'Material adhesivo especial para unir los bloques Bloqueplas.',
      precioUnitario: 25000,
      unidad: 'bulto',
      ultimaActualizacion: '20/02/2026'
    }
  ];

  openEditModal(material: Material): void {
    this.materialToEdit = material;
    this.newPrecio = material.precioUnitario;
    this.precioError = '';
    this.showEditModal = true;
  }

  closeEditModal(): void {
    this.showEditModal = false;
    this.materialToEdit = null;
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


    if (this.materialToEdit) {
      this.materialToEdit.precioUnitario    = this.newPrecio;
      this.materialToEdit.ultimaActualizacion = new Date().toLocaleDateString('es-CO');
    }

    this.closeEditModal();
  }

}