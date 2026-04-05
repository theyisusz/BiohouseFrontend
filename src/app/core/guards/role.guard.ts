import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router      = inject(Router);

  if (authService.isAdmin()) {
    return true;
  }

  router.navigate(['/client/dashboard']);
  return false;
};

export const clienteGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router      = inject(Router);

  if (authService.isCliente()) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};