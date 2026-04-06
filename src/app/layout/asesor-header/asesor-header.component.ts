import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-asesor-header',
  imports: [CommonModule, RouterModule],
  templateUrl: './asesor-header.component.html',
  styleUrl: './asesor-header.component.css'
})
export class AsesorHeaderComponent {

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
    // cuando haya backend: limpiar token y redirigir
  }
}