import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService as Auth0Service } from '@auth0/auth0-angular';
import { map, take } from 'rxjs/operators';

export const authGuard: CanActivateFn = () => {
  const auth0  = inject(Auth0Service);
  const router = inject(Router);

  return auth0.isAuthenticated$.pipe(
    take(1),
    map(isAuthenticated => {
      if (isAuthenticated) return true;
      router.navigate(['/login']);
      return false;
    })
  );
};