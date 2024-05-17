import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@scifi/auth/auth.service';

export const authenticationGuard: CanActivateFn = () => {
  const customerAccount = inject(AuthService).accountData;
  if (!customerAccount) {
    return inject(Router).createUrlTree(['/']);
  } else {
    return true;
  }
};
