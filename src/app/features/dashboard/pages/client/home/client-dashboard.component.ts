import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FooterComponent } from '../../../../../layout/footer/footer.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-client-dashboard',
  standalone: true,
  imports: [ CommonModule],
  templateUrl: './client-dashboard.component.html',
  styleUrls: ['./client-dashboard.component.css']
})
export class ClientDashboardComponent {

  menuOpen = false;
  showLogoutModal = false;

  constructor(private router: Router) {}

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
    this.router.navigate(['/']);
  }

  goToHome() {
    this.router.navigate(['/']);
  }

  goToDesigner() {
    this.router.navigate(['/client/new-project']);
  }

  goToProjects() {
    this.router.navigate(['/client/projects']);
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }
  
}