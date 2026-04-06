import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { adminGuard, clienteGuard } from './core/guards/role.guard';

// Layouts
import { PublicLayoutComponent } from './layout/public-layout/public-layout.component';
import { ClientLayoutComponent } from './layout/client-layout/client-layout.component';

// Públicas
import { HomeComponent } from './features/home/pages/home/home.component';
import { LoginComponent } from './features/auth/pages/login/login.component';
import { RegisterComponent } from './features/auth/pages/register/register.component';

// Cliente
import { ClientDashboardComponent } from './features/dashboard/pages/client/home/client-dashboard.component';
import { MyProjectsComponent } from './features/dashboard/pages/client/my-projects/my-projects.component';
import { ProfileComponent } from './features/dashboard/pages/client/profile/profile.component';
import { AdminDashboardComponent } from './features/dashboard/pages/admin/admin-dashboard/admin-dashboard.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';


// Admin
import { AdminUsuariosComponent } from './features/dashboard/pages/admin/admin-usuarios/admin-usuarios.component';
import { AdminCotizacionesComponent } from './features/dashboard/pages/admin/admin-cotizaciones/admin-cotizaciones.component';
import { AdminPreciosComponent } from './features/dashboard/pages/admin/admin-precios/admin-precios.component';
import { NewProjectComponent } from './features/dashboard/pages/client/new-project/new-project.component';
import { AdminAsesoresComponent } from './features/dashboard/pages/admin/admin-asesores/admin-asesores.component';
import { AsesorCotizacionesComponent } from './features/dashboard/pages/asesor/asesor-cotizaciones/asesor-cotizaciones.component';
import { AsesorClientesComponent } from './features/dashboard/pages/asesor/asesor-clientes/asesor-clientes.component';
import { AsesorDashboardComponent } from './features/dashboard/pages/asesor/asesor-dashboard/asesor-dashboard.component';
import { AsesorLayoutComponent } from './layout/asesor-layout/asesor-layout.component';
export const routes: Routes = [

  //  PÚBLICO (sin login)
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      { path: '', component: HomeComponent }
    ]
  },

  // AUTH
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // 👤 CLIENTE (logueado)
  {
    path: 'client',
    component: ClientLayoutComponent,
    //canActivate: [authGuard, clienteGuard],
    children: [
      { path: 'dashboard', component: ClientDashboardComponent },
      { path: 'projects', component: MyProjectsComponent }, 
      { path: 'profile', component: ProfileComponent }, 
      { path: 'new-project', component: NewProjectComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  {
  path: 'admin',
  component: AdminLayoutComponent,
  //canActivate: [authGuard, adminGuard],
  children: [
    { path: 'dashboard', component: AdminDashboardComponent },
    // futuras rutas:
       { path: 'clientes', component: AdminUsuariosComponent },
       { path: 'asesores',  component: AdminAsesoresComponent  },
       { path: 'cotizaciones', component: AdminCotizacionesComponent },
       { path: 'precios', component: AdminPreciosComponent },
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
  ]
},   
{
  path: 'asesor',
  component: AsesorLayoutComponent,
  children: [
    { path: 'dashboard',    component: AsesorDashboardComponent    },
    { path: 'clientes',     component: AsesorClientesComponent     },
    { path: 'cotizaciones', component: AsesorCotizacionesComponent },
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
  ]
},       
  //  404
  { path: '**', redirectTo: '' }
];