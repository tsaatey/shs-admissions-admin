import { ApiResponseDto } from './../interfaces/api-response.interface';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { enrollStudent } from '@Crafterhive/cssps';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class StudentManagementService {
  constructor(private httpClient: HttpClient) {}

  public getStudentList(schoolId: number, type: string): Observable<any> {
    return this.httpClient.get<ApiResponseDto<any[]>>(
      `${environment.baseUrl}/school/student`,
      {
        params: { schoolId, type },
      }
    );
  }

  public searchStudent(schoolId: number, searchTerm: string): Observable<any> {
    return this.httpClient.get<ApiResponseDto<any[]>>(
      `${environment.baseUrl}/school/student/search`,
      { params: { schoolId, searchTerm } }
    );
  }

  public uploadStudentsAsJSON(
    schoolId: number,
    students: any
  ): Observable<any> {
    return this.httpClient.post<ApiResponseDto<any[]>>(
      `${environment.baseUrl}/school/student-list/json`,
      { schoolId, students }
    );
  }

  public async enrollStudent(
    schoolCode: string,
    indexNumber: string,
    accessToken: string,
    schoolId: number
  ) {
    try {
      return await enrollStudent({
        schoolCode,
        indexNumber,
        accessToken,
        schoolId,
      });
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
