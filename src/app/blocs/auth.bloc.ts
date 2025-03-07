import { SessionStateStore } from './../store/session.store';
import { LoginResponse } from './../models/login-response.model';
import { inject, Injectable } from '@angular/core';
import { AuthenticationService } from './../services/authentication.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { SignupDto } from '../interfaces/sign-up.interface';
import {
  LoginResponseDto,
  NewAccountLoginDto,
} from '../interfaces/login.interface';
import { User } from '../models/user.model';
import {
  getUserFromIdToken,
  getRolesFromAccessToken,
  getErrorMessage,
} from '../utils/func-utils';
import { AuthStore } from '../store/authentication.store';

@Injectable({ providedIn: 'root' })
export class AuthenticationBloc {
  private authStore = inject(AuthStore);
  private sessionStore = inject(SessionStateStore);

  constructor(private authService: AuthenticationService) {}

  async login(
    email: string,
    password: string
  ): Promise<{
    success: boolean;
    message: string;
    user?: User;
    other?: NewAccountLoginDto;
  }> {
    return new Promise((resolve, reject) => {
      this.authService.login(email, password).subscribe({
        next: (response: any) => {
          // console.log(response);
          if (response.hasOwnProperty('accessToken')) {
            const res = new LoginResponse(response as LoginResponseDto);

            // Get user from id token
            const user = getUserFromIdToken(res.idToken);

            // Get roles from access toke
            const roles = getRolesFromAccessToken(res.accessToken);

            // Store the necessary values in the store
            // Set user
            this.sessionStore.setSessionUser(user);

            // Set access token
            this.authStore.setJwt(res.accessToken);

            // Set Authenticated
            this.authStore.setAuthenticated(true);

            // Set refresh token
            this.authStore.setRefreshToken(res.refreshToken);

            // Set session roles
            this.sessionStore.setSessionRoles(roles);

            resolve({ success: true, message: 'Login successful', user: user });
          } else {
            resolve({
              success: true,
              message: 'Login successful',
              other: response as NewAccountLoginDto,
            });
          }
        },
        error: (error: HttpErrorResponse) => {
          const errorMessage = getErrorMessage(error);

          reject({ success: false, message: errorMessage });
        },
      });
    });
  }

  async forgotPassword(
    email: string
  ): Promise<{ success: boolean; message: string }> {
    return new Promise((resolve, reject) => {
      this.authService.forgotPassword(email).subscribe({
        next: (response: HttpResponse<any>) => {
          // Handle success
          // Set store property
          this.authStore.setIdentifier(email);
          resolve({ success: true, message: 'success' });
        },
        error: (error: HttpErrorResponse) => {
          const errorMessage = getErrorMessage(error);

          resolve({ success: false, message: errorMessage });
        },
      });
    });
  }

  async resetPassword(
    proposedPassword: string,
    confirmProposedPassword: string,
    confirmationCode: string,
    email: string
  ): Promise<{ success: boolean; message: string }> {
    return new Promise((resolve, reject) => {
      this.authService
        .resetPassword(
          proposedPassword,
          confirmProposedPassword,
          confirmationCode,
          email
        )
        .subscribe({
          next: (response: HttpResponse<any>) => {
            resolve({ success: true, message: 'success' });
          },
          error: (error: HttpErrorResponse) => {
            const errorMessage = getErrorMessage(error);
            resolve({ success: false, message: errorMessage });
          },
        });
    });
  }

  async signup(
    payload: SignupDto
  ): Promise<{ success: boolean; message: string }> {
    return new Promise((resolve, reject) => {
      this.authService.signup(payload).subscribe({
        next: (response: HttpResponse<any>) => {
          // Sign up successful
          resolve({ success: true, message: 'success' });
        },
        error: (error: HttpErrorResponse) => {
          const errorMessage = getErrorMessage(error);
          resolve({ success: false, message: errorMessage });
        },
      });
    });
  }

  async confirmSignup(email: string, confirmationCode: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.authService.confirmSignup(email, confirmationCode).subscribe({
        next: (response: HttpResponse<any>) => {
          // Success
          resolve(response);
        },
        error: (error: HttpErrorResponse) => {
          // Error
          reject(error);
        },
      });
    });
  }

  async changePassword(
    previousPassword: string,
    proposedPassword: string,
    confirmProposedPassword: string
  ): Promise<{ success: boolean; message: string }> {
    return new Promise((resolve, reject) => {
      this.authService
        .changePassword(
          previousPassword,
          proposedPassword,
          confirmProposedPassword
        )
        .subscribe({
          next: (response: HttpResponse<any>) => {
            // success
            resolve({ success: true, message: 'success' });
          },
          error: (error: HttpErrorResponse) => {
            // Error
            const errorMessage = getErrorMessage(error);
            reject(errorMessage);
          },
        });
    });
  }

  async renewAccessToken(): Promise<any> {
    return new Promise((resolve, reject) => {
      const refreshToken = this.authStore.refreshToken();
      this.authService.renewAccessToken(refreshToken).subscribe({
        next: (response: LoginResponseDto) => {
          const res = new LoginResponse(response as LoginResponseDto);

          // Get user from id token
          const user = getUserFromIdToken(res.idToken);

          // Get roles from access toke
          const roles = getRolesFromAccessToken(res.accessToken);

          // Store the necessary values in the store
          // Set user
          this.sessionStore.setSessionUser(user);

          // Set access token
          this.authStore.setJwt(res.accessToken);

          // Set Authenticated
          this.authStore.setAuthenticated(true);

          // Set refresh token
          this.authStore.setRefreshToken(res.refreshToken);

          // Set session roles
          this.sessionStore.setSessionRoles(roles);

          // Resolve
          resolve(true);
        },
        error: (error: HttpErrorResponse) => {
          reject(false);
        },
      });
    });
  }

  public requestNewCode(email: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.authService.requestNewCode(email).subscribe({
        next: (response: HttpResponse<any>) => {
          resolve(response);
        },
        error: (err: HttpErrorResponse) => {
          reject(err);
        },
      });
    });
  }
}
