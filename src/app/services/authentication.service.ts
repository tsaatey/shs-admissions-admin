import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignupDto } from '../interfaces/sign-up.interface';
import { setSchoolCredentials } from '@Crafterhive/cssps';
import { Observable } from 'rxjs';
import { LoginResponseDto } from '../interfaces/login.interface';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  constructor(private httpClient: HttpClient) {}

  public login(email: string, password: string): Observable<LoginResponseDto> {
    return this.httpClient.post<LoginResponseDto>(
      `${environment.baseUrl}/login`,
      { email, password }
    );
  }

  // Forgot password
  public forgotPassword(email: string): Observable<any> {
    return this.httpClient.post<any>(`${environment.baseUrl}/forgot-password`, {
      email,
    });
  }

  public resetPassword(
    proposedPassword: string,
    confirmProposedPassword: string,
    confirmationCode: string,
    email: string
  ): Observable<any> {
    return this.httpClient.post(
      `${environment.baseUrl}/confirm-forgot-password`,
      {
        proposedPassword,
        confirmProposedPassword,
        confirmationCode,
        email,
      }
    );
  }

  public signup(payload: SignupDto): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/sign-up`, payload);
  }

  public confirmSignup(
    email: string,
    confirmationCode: string
  ): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/confirm-sign-up`, {
      email,
      confirmationCode,
    });
  }

  public changePassword(
    previousPassword: string,
    proposedPassword: string,
    confirmProposedPassword: string
  ): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/change-password`, {
      previousPassword,
      proposedPassword,
      confirmProposedPassword,
    });
  }

  public renewAccessToken(refreshToken: string): Observable<LoginResponseDto> {
    return this.httpClient.post<LoginResponseDto>(
      `${environment.baseUrl}/renew-token`,
      {
        refreshToken,
      }
    );
  }

  public async setCSSPSCredentials(payload: any) {
    // Call the set cssps wrapper function from @Crafterhive/cssps
    try {
      return await setSchoolCredentials(payload);
    } catch (error) {
      throw error;
    }
  }

  public requestNewCode(email: string): Observable<any> {
    return this.httpClient.post(
      `${environment.baseUrl}/resend-confirmation-code`,
      { email }
    );
  }
}
