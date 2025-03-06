// import { Injectable } from '@angular/core';
// import { StateClear } from 'ngxs-reset-plugin';
// import { Store } from '@ngxs/store';
// import { AuthenticationStateStore } from '../store/states/authentication.state';
// import { AuthenticationRenewAccessToken } from '../store/actions';
// import { Router } from '@angular/router';

// @Injectable({ providedIn: 'root' })
// export class SessionUtility {
//   constructor(private store: Store, private router: Router) {}

//   public signOut() {
//     this.store.dispatch(new StateClear());
//     location.reload();
//   }

//   public houston() {
//     this.router.navigate(['/500']);
//   }

//   async renewAccessToken() {
//     try {
//       const refreshToken = this.store.selectSnapshot(
//         AuthenticationStateStore.getRefreshToken
//       );
//       this.store.dispatch(
//         new AuthenticationRenewAccessToken({
//           payload: { refreshToken },
//           messageId: '',
//         })
//       );
//     } catch (error) {
//       throw error;
//     }
//   }
// }
