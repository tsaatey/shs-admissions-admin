import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStore } from '../store/authentication.store';

export const authGuard = () => {
  const store = inject(AuthStore);
  const router = inject(Router);

  if (store.authenticated()) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
