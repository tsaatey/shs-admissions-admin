import { ApiResponseDto } from './../interfaces/api-response.interface';
import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class DocumentManagementService {
  constructor(private httpClient: HttpClient) {}

  public uploadDocument(payload: FormData): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClient
        .post<ApiResponseDto<any>>(`${environment.baseUrl}/`, payload)
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

  public getAllDocuments(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClient
        .get<ApiResponseDto<any[]>>(`${environment.baseUrl}/school/documents`)
        .subscribe(
          (response: ApiResponseDto<any[]>) => {
            resolve(response);
          },
          (error: HttpErrorResponse) => {
            reject(error);
          }
        );
    });
  }

  public deleteDocument(payload: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClient
        .get<ApiResponseDto<any>>(`${environment.baseUrl}/${payload}`)
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

  public publishDocument(payload: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClient
        .post<ApiResponseDto<any>>(`${environment.baseUrl}/`, payload)
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
}
