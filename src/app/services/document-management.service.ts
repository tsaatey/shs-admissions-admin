import { ApiResponseDto } from './../interfaces/api-response.interface';
import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DocumentManagementService {
  constructor(private httpClient: HttpClient) {}

  public uploadDocument(payload: FormData): Observable<any> {
    return this.httpClient.post<ApiResponseDto<any>>(
      `${environment.baseUrl}/school/upload/document`,
      payload
    );
  }

  public getAllDocuments(schoolId: number): Observable<any> {
    return this.httpClient.get<any[]>(
      `${environment.baseUrl}/school/documents`,
      { params: { schoolId } }
    );
  }

  public deleteDocument(schoolId: number, documentId: string): Observable<any> {
    return this.httpClient.delete<any>(
      `${environment.baseUrl}/school/${schoolId}/documents/${documentId}`
    );
  }
}
