import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-header',
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.css'
})
export class AdminHeaderComponent {
  constructor(private router: Router) {}

  menuOpen = false;
  showLogoutModal = false;

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  openLogoutModal(): void {
    this.menuOpen = false;
    this.showLogoutModal = true;
  }

  cancelLogout(): void {
    this.showLogoutModal = false;
  }

  confirmLogout(): void {
    this.showLogoutModal = false;
    this.goToHome();
    // cuando haya backend: limpiar token y redirigir
  }
  goToHome() {
    this.router.navigate(['/']);
  }
}