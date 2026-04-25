import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import colombiaRaw from '../../assets/colombia.json';

@Component({
  selector: 'app-info-tools',
  imports: [CommonModule, FormsModule],
  templateUrl: './info-tools.html',
  styleUrl: './info-tools.css',
})
export class InfoTools {
  showModal: boolean = false;
  showConfirmation: boolean = false;

  projectName: string = '';
  selectedDepartment: string = '';
  selectedCity: string = '';

  departments: string[] = [];
  cities: string[] = [];

  colombiaData: any[] = colombiaRaw;

  constructor(private router: Router) {
    this.departments = this.colombiaData.map(d => d.departamento);
  }

  openModal(): void {
    this.showModal = true;
    this.showConfirmation = false;
  }

  closeModal(): void {
    this.showModal = false;
  }

  onDepartmentChange(): void {
    const dept = this.colombiaData.find(d => d.departamento === this.selectedDepartment);
    this.cities = dept ? dept.ciudades : [];
    this.selectedCity = '';
  }

  guardar(): void {
    if (!this.projectName || !this.selectedDepartment || !this.selectedCity) {
      alert("Por favor completa todos los campos antes de continuar.");
      return;
    }
    this.showConfirmation = true;
  }

  cancelarConfirmacion(): void {
    this.showConfirmation = false;
  }

  confirmar(): void {
    // Aquí puedes guardar los datos como necesites, ej: LocalStorage o Service.
    // localStorage.setItem('projectName', this.projectName);
    this.showModal = false;
    this.router.navigate(['/new-project/start']);
  }
}
