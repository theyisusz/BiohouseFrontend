import { inject } from '@angular/core';
import { AuthService as Auth0Service } from '@auth0/auth0-angular';
import { AuthService } from '../services/auth.service';

export function authInitializer() {
  return async () => {

    const auth0 = inject(Auth0Service);

    // 🔥 ESTA LÍNEA ES LA CLAVE
    inject(AuthService); // 👈 fuerza inicialización

    try {
      await auth0.handleRedirectCallback();
      console.log('🔥 Callback procesado');
    } catch (e) {}

    auth0.isAuthenticated$.subscribe(v => {
      console.log('🔥 Auth0 activo:', v);
    });
  };
}
