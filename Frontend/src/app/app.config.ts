import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAuth0 } from '@auth0/auth0-angular';
import { routes } from './app.routes';
//import { authInterceptor } from './core/interceptors/auth.interceptor';
import { authHttpInterceptorFn } from '@auth0/auth0-angular';
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([authHttpInterceptorFn])),
    provideAuth0({
      domain: 'TU_DOMINIO.auth0.com',        // viene de tu cuenta Auth0
      clientId: 'TU_CLIENT_ID',              // viene de tu cuenta Auth0
      authorizationParams: {
        redirect_uri: window.location.origin, // a donde redirige después del login
        audience: 'TU_API_AUDIENCE'           // viene de la config del backend
      }
    })
  ]
};