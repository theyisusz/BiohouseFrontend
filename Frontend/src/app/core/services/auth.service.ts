import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService as Auth0Service } from '@auth0/auth0-angular';
import { BehaviorSubject, filter, switchMap, take, tap } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8081/api/v1/usuarios';

  // 🔥 Estado global reactivo
  private userSubject = new BehaviorSubject<Usuario | null>(null);
  user$ = this.userSubject.asObservable();

  constructor(
    private http: HttpClient,
    private auth0: Auth0Service,
    private router: Router
  ) {
    this.initAuthFlow(); // 🔥 AUTO SINCRONIZACIÓN
  }

  // --------------------------------------------------
  // 🔥 FLUJO AUTOMÁTICO (ESTO ES LA CLAVE)
  // --------------------------------------------------
private initAuthFlow() {
  this.auth0.isAuthenticated$
    .pipe(
      filter(isAuth => isAuth === true),
      take(1),
      switchMap(() => this.sincronizarUsuario())
    )
    .subscribe({
      next: (user) => {
        this.userSubject.next(user);

        console.log('✅ Usuario sincronizado automáticamente:', user);

        // 🔥 REDIRECCIÓN AQUÍ
        this.redirectByRole(user);

      },
      error: (err) => {
        console.error('❌ Error en sincronización:', err);
      }
    });
}

  // --------------------------------------------------
  // 🔥 SINCRONIZAR CON BACKEND
  // --------------------------------------------------
  sincronizarUsuario() {
    return this.auth0.user$.pipe(
      filter(user => !!user), // asegurarse que exista
      take(1),
      switchMap(user => {

        const dto = {
          email: user?.email,
          nombre: user?.name,
          apellido: user?.family_name,
          imagenUrl: user?.picture
        };

        return this.http.post<Usuario>(`${this.apiUrl}/sincronizar`, dto);
      }),
      tap(user => {
        this.userSubject.next(user); // 🔥 actualizar estado
      })
    );
  }

  // --------------------------------------------------
  // 🔐 GET USER ACTUAL (sincrónico)
  // --------------------------------------------------
  getUser(): Usuario | null {
    return this.userSubject.value;
  }

  // --------------------------------------------------
  // 🔐 HELPERS DE ROLES (para guards)
  // --------------------------------------------------
  isAdmin(): boolean {
    return this.userSubject.value?.role === 'ADMIN';
  }

  isAsesor(): boolean {
    return this.userSubject.value?.role === 'ASESOR';
  }

  isCliente(): boolean {
    return this.userSubject.value?.role === 'CLIENTE';
  }

  // --------------------------------------------------
  // 🚪 LOGOUT
  // --------------------------------------------------
logout() {
  this.userSubject.next(null);
  sessionStorage.clear();
  localStorage.clear();

  this.auth0.logout({
    logoutParams: {
      returnTo: window.location.origin
    }
  });
}
  private redirectByRole(user: any) {
  if (user.role === 'ADMIN') {
    this.router.navigate(['/admin/dashboard']);
  } else if (user.role === 'ASESOR') {
    this.router.navigate(['/asesor/dashboard']);
  } else {
    this.router.navigate(['/client/dashboard']);
  }
}

}
