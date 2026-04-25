import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-asesor-header',
  imports: [CommonModule, RouterModule],
  templateUrl: './asesor-header.component.html',
  styleUrl: './asesor-header.component.css'
})
export class AsesorHeaderComponent {
  constructor(private router: Router,
    private authService: AuthService
  ) {}

  menuOpen = false;
  showLogoutModal = false;

  toggleMenu(): void { this.menuOpen = !this.menuOpen; }

  openLogoutModal(): void {
    this.menuOpen = false;
    this.showLogoutModal = true;
  }

  cancelLogout(): void { this.showLogoutModal = false; }

  confirmLogout(): void {
    this.showLogoutModal = false;
    this.authService.logout();
    // cuando haya backend: limpiar token y redirigir
  }
  goToHome() {
    this.router.navigate(['/']);
  }
}
