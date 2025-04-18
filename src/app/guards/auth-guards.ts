import { inject } from '@angular/core';
import { ActivatedRoute, CanActivateFn, Router } from '@angular/router';
import { AuthStore } from '../store/authentication.store';
import { NavigationService } from '../services/navigation-service';

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

export const resetPasswordGuard: CanActivateFn = () => {
  const store = inject(AuthStore);
  const router = inject(Router);
  const navigationService = inject(NavigationService);

  if (store.usr() && !store.authenticated()) {
    return true;
  } else {
    // Navigate back to the previous URL
    const previousUrl = navigationService.getPreviousUrl();
    if (previousUrl) {
      router.navigateByUrl(previousUrl);
    } else {
      router.navigate(['/']); // Fallback to home if no previous URL is stored
    }
    return false;
  }
};

export const confirmAccountGuard: CanActivateFn = () => {
  const route = inject(ActivatedRoute);
  const store = inject(AuthStore);
  const router = inject(Router);

  const email = route.snapshot.paramMap.get('username') || '';
  if (email || store.cordData().email) {
    return true;
  }
  router.navigate(['/']);
  return false;
};

export const loginGuard: CanActivateFn = () => {
  const store = inject(AuthStore);
  const router = inject(Router);

  if (!store.authenticated()) {
    return true;
  }

  router.navigate(['dashboard']);
  return false;
};
