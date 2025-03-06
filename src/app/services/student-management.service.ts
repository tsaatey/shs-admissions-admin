import { ApiResponseDto } from './../interfaces/api-response.interface';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { enrollStudent } from '@Crafterhive/cssps';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class StudentManagementService {
  constructor(private httpClient: HttpClient) {}

  public getAllCSSPSPlacedStudents(payload: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClient
        .get<ApiResponseDto<any[]>>(`${environment.baseUrl}/school/student`, {
          params: payload,
        })
        .subscribe(
          (response: any) => {
            resolve(response);
          },
          (error: HttpErrorResponse) => {
            reject(error);
          }
        );
    });
  }

  public getAllEnroledStudents(payload: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClient
        .get<ApiResponseDto<any[]>>(`${environment.baseUrl}/school/student`, {
          params: payload,
        })
        .subscribe(
          (response: any) => {
            resolve(response);
          },
          (error: HttpErrorResponse) => {
            reject(error);
          }
        );
    });
  }

  public getAllNotEnroledStudents(payload: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClient
        .get<ApiResponseDto<any[]>>(`${environment.baseUrl}/school/student`, {
          params: payload,
        })
        .subscribe(
          (response: any) => {
            resolve(response);
          },
          (error: HttpErrorResponse) => {
            reject(error);
          }
        );
    });
  }

  public getAllAdmittedStudents(payload: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClient
        .get<ApiResponseDto<any[]>>(`${environment.baseUrl}/school/student`, {
          params: payload,
        })
        .subscribe(
          (response: any) => {
            resolve(response);
          },
          (error: HttpErrorResponse) => {
            reject(error);
          }
        );
    });
  }

  public searchStudent(payload: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClient
        .get<ApiResponseDto<any[]>>(
          `${environment.baseUrl}/school/student/search`,
          { params: payload }
        )
        .subscribe(
          (response: any) => {
            resolve(response);
          },
          (error: HttpErrorResponse) => {
            reject(error);
          }
        );
    });
  }

  public uploadStudentsAsJSON(payload: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClient
        .post<ApiResponseDto<any[]>>(
          `${environment.baseUrl}/school/student-list/json`,
          payload
        )
        .subscribe(
          (response: any) => {
            resolve(response);
          },
          (error: HttpErrorResponse) => {
            reject(error);
          }
        );
    });
  }

  public async enrollStudent(payload: any) {
    try {
      return await enrollStudent(payload);
    } catch (error) {
      throw error;
    }
  }

  public async udpateStudent(payload: any) {
    try {
      // Call updateStudent function from the CSSPS wrapper
    } catch (error) {
      throw error;
    }
  }
}
