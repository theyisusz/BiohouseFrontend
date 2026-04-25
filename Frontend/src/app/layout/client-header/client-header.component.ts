import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-client-header',
  imports: [CommonModule],
  templateUrl: './client-header.component.html',
  styleUrl: './client-header.component.css',
})
export class ClientHeaderComponent {
menuOpen = false;
  showLogoutModal = false;

  constructor(private router: Router,
    private authService: AuthService
  ) {}

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  // 🔥 NUEVO: abrir modal
  openLogoutModal() {
    this.menuOpen = false; // cierra dropdown
    this.showLogoutModal = true;
  }

  cancelLogout() {
    this.showLogoutModal = false;
  }

  confirmLogout() {
    this.showLogoutModal = false;
    this.authService.logout();
  }

  goToHome() {
    this.router.navigate(['/']);
  }

  goToDesigner() {
    this.router.navigate(['client/new-project']);
  }

  goToProjects() {
    this.router.navigate(['client/projects']);
  }

  goToProfile() {
    this.router.navigate(['/client/profile']);
  }
  goToDashboard() {
    this.router.navigate(['/client/dashboard']);
  }
}
