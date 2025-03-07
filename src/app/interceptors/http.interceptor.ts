import { ToastrService } from 'ngx-toastr';
import { inject, Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HttpStatusCode,
  HttpEvent,
} from '@angular/common/http';
import { Observable, catchError, from, switchMap, throwError } from 'rxjs';
import { SessionUtilities } from '../utils/session.utilities';
import { AuthStore } from '../store/authentication.store';
import { SessionStateStore } from '../store/session.store';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
  readonly authAstore = inject(AuthStore);
  readonly sessionStore = inject(SessionStateStore);

  constructor(private sessionUtilities: SessionUtilities) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Get the request headers
    let headers = req.headers;

    // Check if user is already logged in an attach access token to request
    if (this.authAstore.authenticated()) {
      // Get access token from the store
      const token = this.authAstore.jwt();

      // Append token to the header
      headers = headers.append('x-auth-token', token);
    }

    // If user is not logged in then skip the authentication header
    const newRequest = req.clone({ headers: headers });

    // Pass the new request
    return next.handle(newRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        // Token has expired
        if (error.status === HttpStatusCode.Unauthorized) {
          // Renew access token and retry the request
          return from(this.sessionUtilities.renewAccessToken()).pipe(
            switchMap(() => {
              // Update the token in the header
              const newToken = this.authAstore.jwt();
              const updatedHeaders = req.headers.set('x-auth-token', newToken);
              const updatedRequest = req.clone({ headers: updatedHeaders });
              // Retry the request with the new token
              return next.handle(updatedRequest);
            }),
            catchError((renewError) => {
              // If token renewal fails, redirect to login or handle accordingly
              this.sessionUtilities.signOut();
              return throwError(() => renewError);
            })
          );
        }

        // Something went wrong on the server
        if (error.status === HttpStatusCode.InternalServerError) {
          // Internal server error, redirect to 500 page
          this.sessionUtilities.houston();
        }

        // User does not have permission to perform that action
        if (error.status === HttpStatusCode.Forbidden) {
          // Forbidden, redirect to 403 page
        }

        return throwError(() => error);
      })
    );
  }
}
