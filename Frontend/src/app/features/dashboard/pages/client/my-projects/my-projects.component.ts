import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface Project {
  id: number;
  name: string;
  area: number;
  floors: number;
  date: string;
  price: number;
  status: string;
}

@Component({
  selector: 'app-my-projects',
  imports: [CommonModule, FormsModule],
  templateUrl: './my-projects.component.html',
  styleUrl: './my-projects.component.css'
})
export class MyProjectsComponent {
  constructor(private router: Router) {}

goToNewProject(): void {
  this.router.navigate(['/client/new-project']);
}
  showDeleteModal = false;
  projectToDelete: Project | null = null;

  searchTerm = '';
  selectedStatus = '';

  projects: Project[] = [
    { id: 1, name: 'Residencia Minimalista', area: 180, floors: 2, date: '3/02/2026', price: 95000, status: 'Completado' },
    { id: 2, name: 'Casa Familiar',          area: 150, floors: 1, date: '3/02/2026', price: 75000, status: 'Completado' },
    { id: 3, name: 'Casa de Campo',          area: 220, floors: 3, date: '15/04/2026', price: 130000, status: 'En proceso' },
  ];

  get filteredProjects(): Project[] {
    return this.projects.filter(p => {
      const matchName   = p.name.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchStatus = this.selectedStatus ? p.status === this.selectedStatus : true;
      return matchName && matchStatus;
    });
  }

  getBadgeClass(status: string): string {
    switch (status) {
      case 'Completado': return 'badge-completado';
      case 'En proceso': return 'badge-proceso';
      case 'Borrador':   return 'badge-borrador';
      default:           return '';
    }
  }
  confirmDelete(project: Project): void {
  this.projectToDelete = project;
  this.showDeleteModal = true;
}

cancelDelete(): void {
  this.showDeleteModal = false;
  this.projectToDelete = null;
}

deleteProject(): void {
  if (this.projectToDelete) {
    this.projects = this.projects.filter(p => p.id !== this.projectToDelete!.id);
  }
  this.showDeleteModal = false;
  this.projectToDelete = null;
}

}