import { Component, OnInit } from '@angular/core';
import { AuthService as Auth0Service } from '@auth0/auth0-angular';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { filter, take } from 'rxjs';

@Component({
  selector: 'app-login',
  template: '<p>Redirigiendo...</p>'
})
export class LoginComponent implements OnInit {

  constructor(
    private auth0: Auth0Service,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {

    this.auth0.isAuthenticated$
      .pipe(take(1))
      .subscribe(isAuth => {

        console.log("🔥 isAuthenticated:", isAuth);

      if (!isAuth) {
        this.auth0.loginWithRedirect({
          authorizationParams: {
            prompt: 'login' // 🔥 FORZAR LOGIN SIEMPRE
          }
        });
        return;
      }

        // 🔥 1. Intentar con usuario ya cargado
        const user = this.authService.getUser();
        console.log("🔥 getUser():", user);

        if (user) {
          console.log("🔥 Usuario ya estaba listo");
          this.redirectByRole(user);
          return;
        }

        // 🔥 2. Esperar usuario si aún no está
        this.authService.user$
          .pipe(
            filter(u => !!u),
            take(1)
          )
          .subscribe(u => {
            console.log("🔥 Usuario recibido después:", u);
            this.redirectByRole(u);
          });

      });

  }

  redirectByRole(user: any) {

    console.log("🔥 USER COMPLETO:", user);
    console.log("🔥 ROL:", user?.role);

    const role = user?.role;

    if (role === 'ADMIN') {
      this.router.navigate(['/admin/dashboard']);
    } else if (role === 'ASESOR') {
      this.router.navigate(['/asesor/dashboard']);
    } else if (role === 'CLIENTE') {
      this.router.navigate(['/client/dashboard']);
    } else {
      console.warn("⚠️ Rol desconocido, redirigiendo a home");
      this.router.navigate(['/']);
    }

  }

}
