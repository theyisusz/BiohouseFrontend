import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthHttpInterceptor } from '@auth0/auth0-angular';

// Auth0 tiene su propio interceptor listo
// Solo lo registras en app.config.ts así:
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authHttpInterceptorFn } from '@auth0/auth0-angular';

// En app.config.ts:
provideHttpClient(withInterceptors([authHttpInterceptorFn]))