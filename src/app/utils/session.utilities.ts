import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationBloc } from '../blocs/auth.bloc';
import { AuthStore } from '../store/authentication.store';
import { SessionStateStore } from '../store/session.store';
import { SchoolStateStore } from '../store/school.store';

@Injectable({
  providedIn: 'root',
})
export class SessionUtilities {
  readonly authAstore = inject(AuthStore);
  readonly sessionStore = inject(SessionStateStore);
  readonly schoolStore = inject(SchoolStateStore);

  constructor(private router: Router, private authBloc: AuthenticationBloc) {}

  public signOut() {
    // Clear the stores, authenticated state will be reset
    this.authAstore.reset();
    this.sessionStore.reset();
    this.schoolStore.reset();

    location.reload();
  }

  public houston() {
    this.router.navigate(['/500']);
  }

  async renewAccessToken() {
    try {
      await this.authBloc.renewAccessToken();
    } catch (error) {
      throw error;
    }
  }
}
