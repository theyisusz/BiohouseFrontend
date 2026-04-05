import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  editMode = false;
  passwordMode = false;

  user = {
    nombre: 'Juan',
    apellido: 'Pérez',
    correo: 'juan.perez@ejemplo.com',
    telefono: '+57 300 123 4567',
    proyectos: 3,
    fechaRegistro: '01/01/2026',
    ultimaSesion: '02/04/2026'
  };

  editData = { ...this.user };

  passwordData = {
    actual: '',
    nueva: '',
    confirmar: ''
  };

  errors: { [key: string]: string } = {};
  passwordErrors: { [key: string]: string } = {};

  getInitials(): string {
    return `${this.user.nombre[0]}${this.user.apellido[0]}`.toUpperCase();
  }

  enableEdit(): void {
    this.editData = { ...this.user };
    this.errors = {};
    this.editMode = true;
  }

  cancelEdit(): void {
    this.editData = { ...this.user };
    this.errors = {};
    this.editMode = false;
  }

  // ──────────────────────────────────────────
  // VALIDACIONES PERFIL
  // ──────────────────────────────────────────
  private validateProfile(): boolean {
    this.errors = {};
    const soloLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const telefonoRegex = /^[\d\s\+\-\(\)]{7,15}$/;

    if (!this.editData.nombre.trim()) {
      this.errors['nombre'] = 'El nombre es obligatorio.';
    } else if (!soloLetras.test(this.editData.nombre)) {
      this.errors['nombre'] = 'Solo se permiten letras.';
    } else if (this.editData.nombre.trim().length < 2) {
      this.errors['nombre'] = 'Mínimo 2 caracteres.';
    } else if (this.editData.nombre.trim().length > 30) {
      this.errors['nombre'] = 'Máximo 30 caracteres.';
    }

    if (!this.editData.apellido.trim()) {
      this.errors['apellido'] = 'El apellido es obligatorio.';
    } else if (!soloLetras.test(this.editData.apellido)) {
      this.errors['apellido'] = 'Solo se permiten letras.';
    } else if (this.editData.apellido.trim().length < 2) {
      this.errors['apellido'] = 'Mínimo 2 caracteres.';
    } else if (this.editData.apellido.trim().length > 30) {
      this.errors['apellido'] = 'Máximo 30 caracteres.';
    }

    if (!this.editData.correo.trim()) {
      this.errors['correo'] = 'El correo es obligatorio.';
    } else if (!correoRegex.test(this.editData.correo)) {
      this.errors['correo'] = 'Ingresa un correo válido.';
    } else if (this.editData.correo.length > 60) {
      this.errors['correo'] = 'Máximo 60 caracteres.';
    }

    if (!this.editData.telefono.trim()) {
      this.errors['telefono'] = 'El teléfono es obligatorio.';
    } else if (!telefonoRegex.test(this.editData.telefono)) {
      this.errors['telefono'] = 'Ingresa un teléfono válido (7-15 dígitos).';
    }

    return Object.keys(this.errors).length === 0;
  }

  saveChanges(): void {
    if (!this.validateProfile()) return;
    this.user = { ...this.user, ...this.editData };
    this.editMode = false;
    this.errors = {};
  }

  // ──────────────────────────────────────────
  // VALIDACIONES CONTRASEÑA
  // ──────────────────────────────────────────
  private validatePassword(): boolean {
    this.passwordErrors = {};

    if (!this.passwordData.actual.trim()) {
      this.passwordErrors['actual'] = 'Ingresa tu contraseña actual.';
    }

    if (!this.passwordData.nueva.trim()) {
      this.passwordErrors['nueva'] = 'La nueva contraseña es obligatoria.';
    } else if (this.passwordData.nueva.length < 8) {
      this.passwordErrors['nueva'] = 'Mínimo 8 caracteres.';
    } else if (this.passwordData.nueva.length > 30) {
      this.passwordErrors['nueva'] = 'Máximo 30 caracteres.';
    }

    if (!this.passwordData.confirmar.trim()) {
      this.passwordErrors['confirmar'] = 'Confirma tu nueva contraseña.';
    } else if (this.passwordData.nueva !== this.passwordData.confirmar) {
      this.passwordErrors['confirmar'] = 'Las contraseñas no coinciden.';
    }

    return Object.keys(this.passwordErrors).length === 0;
  }

  savePassword(): void {
    if (!this.validatePassword()) return;
    this.passwordData = { actual: '', nueva: '', confirmar: '' };
    this.passwordErrors = {};
    this.passwordMode = false;
  }
  cancelPassword(): void {
  this.passwordData = { actual: '', nueva: '', confirmar: '' };
  this.passwordErrors = {};
  this.passwordMode = false;
}
}