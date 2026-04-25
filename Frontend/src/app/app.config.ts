import { ApplicationConfig, APP_INITIALIZER } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAuth0, authHttpInterceptorFn } from '@auth0/auth0-angular';

import { routes } from './app.routes';
import { authInitializer } from './core/init/auth.init';

export const appConfig: ApplicationConfig = {
  providers: [
    // 🔹 Router
    provideRouter(routes),

    // 🔹 HTTP + interceptor de Auth0
    provideHttpClient(
      withInterceptors([authHttpInterceptorFn])
    ),

    // 🔹 Configuración Auth0
    provideAuth0({
      domain: 'dev-vq65v0hxzkvb44f0.us.auth0.com',
      clientId: 'iijzpeh7WOAYa4eHNc7QNSfgoGCn7Nvb',

      authorizationParams: {
        redirect_uri: window.location.origin,
        audience: 'https://BioHouse.com'
      },

      // 🔥 IMPORTANTE: permitir que el interceptor adjunte el token
      httpInterceptor: {
        allowedList: [
          {
            uri: 'http://localhost:8081/api/v1/*',
            tokenOptions: {
              authorizationParams: {
                audience: 'https://BioHouse.com'
              }
            }
          }
        ]
      }
    }),

    // 🔥 IMPORTANTE: fuerza inicialización del SDK
    {
      provide: APP_INITIALIZER,
      useFactory: authInitializer,
      deps: [], // 👈 importante en standalone
      multi: true
    }
  ]
};
