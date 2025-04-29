import { HttpErrorResponse } from '@angular/common/http';
import { StudentManagementService } from './../services/student-management.service';
import { inject, Injectable } from '@angular/core';
import { CSSPSStudent } from '../models/student-excel-model';

@Injectable({ providedIn: 'root' })
export class StudentRepository {
  private studentService = inject(StudentManagementService);

  public getStudentList(schoolId: number, type: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.studentService.getStudentList(schoolId, type).subscribe({
        next: (response: any) => {
          resolve(response);
        },
        error: (error: HttpErrorResponse) => {
          reject(error);
        },
      });
    });
  }

  public searchStudent(schoolId: number, searchTerm: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.studentService.searchStudent(schoolId, searchTerm).subscribe({
        next: (response: any) => {
          resolve(response);
        },
        error: (error: HttpErrorResponse) => {
          reject(error);
        },
      });
    });
  }

  public uploadStudentsAsJSON(
    schoolId: number,
    students: CSSPSStudent[]
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      this.studentService.uploadStudentsAsJSON(schoolId, students).subscribe({
        next: (response: any) => {
          resolve(response);
        },
        error: (error: HttpErrorResponse) => {
          reject(error);
        },
      });
    });
  }

  public async enrollStudent(
    schoolCode: string,
    indexNumber: string,
    accessToken: string,
    schoolId: number
  ) {
    try {
      return await this.studentService.enrollStudent(
        schoolCode,
        indexNumber,
        accessToken,
        schoolId
      );
    } catch (error) {
      throw error;
    }
  }
}
