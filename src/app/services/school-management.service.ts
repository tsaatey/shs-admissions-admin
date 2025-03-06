import { AdmissionLetter } from '../models/admission-letter';
import { DocumentDto } from './../interfaces/document.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponseDto } from '../interfaces/api-response.interface';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class SchoolManagementService {
  constructor(private httpClient: HttpClient) {}

  public getSchoolInformation(schoolId: any): Observable<ApiResponseDto<any>> {
    return this.httpClient.get<ApiResponseDto<any>>(
      `${environment.baseUrl}/school/info`,
      {
        params: { schoolId },
      }
    );
  }

  public updateSChoolInformation(
    schoolId: string,
    name: string,
    nickName: string
  ): Observable<ApiResponseDto<any>> {
    return this.httpClient.post<ApiResponseDto<any>>(
      `${environment.baseUrl}/school/${schoolId}/update-name`,
      { name, nickName }
    );
  }

  public getUploadedImages(schoolId: any): Observable<ApiResponseDto<any>> {
    return this.httpClient.get<ApiResponseDto<any>>(
      `${environment.baseUrl}/school/${schoolId}/images`
    );
  }

  public uploadImage(image: FormData): Observable<ApiResponseDto<any>> {
    return this.httpClient.post<ApiResponseDto<any>>(
      `${environment.baseUrl}/school/upload/image`,
      image
    );
  }

  public uploadSchoolLogo(logo: FormData): Observable<ApiResponseDto<any>> {
    return this.httpClient.post<ApiResponseDto<any>>(
      `${environment.baseUrl}/school/upload/logo`,
      logo
    );
  }

  public uploadDocument(
    document: DocumentDto
  ): Observable<ApiResponseDto<any>> {
    return this.httpClient.post<ApiResponseDto<any>>(
      `${environment.baseUrl}/school/upload/document`,
      document.document
    );
  }

  public uploadAdmissionLetter(
    payload: FormData
  ): Observable<ApiResponseDto<any>> {
    return this.httpClient.post<ApiResponseDto<any>>(
      `${environment.baseUrl}/school/upload/admission-letter`,
      payload
    );
  }

  public getAllDocuments(schoolId: any): Observable<ApiResponseDto<any>> {
    return this.httpClient.get<ApiResponseDto<any[]>>(
      `${environment.baseUrl}/school/documents`,
      { params: { schoolId } }
    );
  }

  public deleteDocument(schoolId: string, documentId: string): Observable<any> {
    return this.httpClient.delete(
      `${environment.baseUrl}/school/${schoolId}/documents/${documentId}`
    );
  }

  public publishDocument(payload: any): Observable<any> {
    return this.httpClient.post<ApiResponseDto<any>>(
      `${environment.baseUrl}/`,
      payload
    );
  }

  public getDashboardData(schoolId: any): Observable<ApiResponseDto<any>> {
    return this.httpClient.get<ApiResponseDto<any>>(
      `${environment.baseUrl}/school/dashboard`,
      {
        params: { schoolId },
      }
    );
  }

  public getAcademicYears(): Observable<any> {
    return this.httpClient.get<ApiResponseDto<any>>(
      `${environment.baseUrl}/school/academic-year`
    );
  }

  public addParticulars(name: string, schoolId: string): Observable<any> {
    return this.httpClient.post<ApiResponseDto<any>>(
      `${environment.baseUrl}/school/particulars`,
      { name, schoolId }
    );
  }

  public getParticulars(schoolId: any): Observable<any> {
    return this.httpClient.get<ApiResponseDto<any>>(
      `${environment.baseUrl}/school/particulars`,
      { params: { schoolId } }
    );
  }

  public getAdmissionLetter(
    schoolId: string,
    academicYear: string
  ): Observable<ApiResponseDto<AdmissionLetter>> {
    return this.httpClient.get<ApiResponseDto<AdmissionLetter>>(
      `${environment.baseUrl}/school/${schoolId}/admission-letter`,
      { params: { academic_year: academicYear } }
    );
  }

  public deleteSchoolPhoto(schoolId: string, imageId: string): Observable<any> {
    return this.httpClient.delete<ApiResponseDto<any>>(
      `${environment.baseUrl}/school/${schoolId}/images/${imageId}`
    );
  }
}
