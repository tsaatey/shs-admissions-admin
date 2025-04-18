import { AcademicYear } from '../models/academic-year.model';
import { School } from './../models/school.model';
import { inject, Injectable } from '@angular/core';
import { SchoolManagementService } from '../services/school-management.service';
import { SchoolDto } from '../interfaces/school.dto';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { getErrorMessage } from '../utils/func-utils';
import { AcademicYearDto } from '../interfaces/academic-year.dto';
import { ApiResponseDto } from '../interfaces/api-response.dto';
import { DocumentDto } from '../interfaces/dtos.interface';
import { AdmissionLetter } from '../models/admission-letter';
import { SessionStateStore } from '../store/session.store';

@Injectable({ providedIn: 'root' })
export class SchoolRepository {
  private sessionStore = inject(SessionStateStore);

  constructor(private schoolMgtService: SchoolManagementService) {}

  public getSchoolInfo(schoolId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.schoolMgtService.getSchoolInformation(schoolId).subscribe({
        next: (response: any) => {
          // Success
          resolve(true);
          this.sessionStore.setSessionSchool(new School(response));
        },
        error: (error: HttpErrorResponse) => {
          reject(error);
        },
      });
    });
  }

  public updateSchool(
    schoolId: string,
    name: string,
    nickName: string
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      console.log('Inside repo function');
      this.schoolMgtService
        .updateSChoolInformation(schoolId, name, nickName)
        .subscribe({
          next: (response: ApiResponseDto<any>) => {
            resolve(response);
          },
          error: (error: HttpErrorResponse) => {
            reject(error);
          },
        });
    });
  }

  public getUploadedImages(schoolId: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.schoolMgtService.getUploadedImages(schoolId).subscribe({
        next: (response: ApiResponseDto<any>) => {
          resolve(response);
        },
        error: (error: HttpErrorResponse) => {
          reject(error);
        },
      });
    });
  }

  public uploadImage(image: FormData): Promise<any> {
    return new Promise((resolve, reject) => {
      this.schoolMgtService.uploadImage(image).subscribe({
        next: (response: ApiResponseDto<any>) => {
          resolve(response);
        },
        error: (error: HttpErrorResponse) => {
          reject(error);
        },
      });
    });
  }

  public uploadLogo(payload: FormData): Promise<any> {
    return new Promise((resolve, reject) => {
      this.schoolMgtService.uploadSchoolLogo(payload).subscribe({
        next: (response: ApiResponseDto<any>) => {
          resolve(response);
        },
        error: (error: HttpErrorResponse) => {
          const errorMessage = getErrorMessage(error);
          reject(error);
        },
      });
    });
  }

  public getAcademicYears(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.schoolMgtService.getAcademicYears().subscribe({
        next: (response: ApiResponseDto<AcademicYearDto[]>) => {
          const data = response.result.map(
            (year: AcademicYearDto) => new AcademicYear(year)
          );
          resolve(data);
        },
        error: (error: HttpErrorResponse) => {
          reject(error);
        },
      });
    });
  }

  public uploadDocument(document: DocumentDto): Promise<any> {
    return new Promise((resolve, reject) => {
      this.schoolMgtService.uploadDocument(document).subscribe({
        next: (response: ApiResponseDto<any>) => {
          resolve(response);
        },
        error: (error: HttpErrorResponse) => {
          reject(error);
        },
      });
    });
  }

  public uploadAdmissionLetter(payload: FormData): Promise<any> {
    return new Promise((resolve, reject) => {
      this.schoolMgtService.uploadAdmissionLetter(payload).subscribe({
        next: (response: ApiResponseDto<any>) => {
          resolve(response);
        },
        error: (error: HttpErrorResponse) => {
          reject(error);
        },
      });
    });
  }

  public getAllDocuments(schoolId: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.schoolMgtService.getAllDocuments(schoolId).subscribe({
        next: (response: ApiResponseDto<any>) => {
          resolve(response.result);
        },
        error: (error: HttpErrorResponse) => {
          reject(error);
        },
      });
    });
  }

  public deleteDocument(schoolId: string, documentId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.schoolMgtService.deleteDocument(schoolId, documentId).subscribe({
        next: (response: ApiResponseDto<any>) => {
          resolve(response);
        },
        error: (error: HttpErrorResponse) => {
          reject(error);
        },
      });
    });
  }

  public publishDocument(payload: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.schoolMgtService.publishDocument(payload).subscribe({
        next: (response: ApiResponseDto<any>) => {
          resolve(response);
        },
        error: (error: HttpErrorResponse) => {
          reject(error);
        },
      });
    });
  }

  public getDashboardData(schoolId: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.schoolMgtService.getDashboardData(schoolId).subscribe({
        next: (response: ApiResponseDto<any>) => {
          resolve(response.result);
        },
        error: (error: HttpErrorResponse) => {
          reject(error);
        },
      });
    });
  }

  public addParticulars(name: string, schoolId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.schoolMgtService.addParticulars(name, schoolId).subscribe({
        next: (response: ApiResponseDto<any>) => {
          resolve(response);
        },
        error: (error: HttpErrorResponse) => {
          reject(error);
        },
      });
    });
  }

  public getParticulars(schoolId: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.schoolMgtService.getParticulars(schoolId).subscribe({
        next: (response: ApiResponseDto<any>) => {
          resolve(response.result);
        },
        error: (error: HttpErrorResponse) => {
          reject(error);
        },
      });
    });
  }

  public getAdmissionLetter(
    schoolId: string,
    academicYear: string
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      this.schoolMgtService
        .getAdmissionLetter(schoolId, academicYear)
        .subscribe({
          next: (response: ApiResponseDto<AdmissionLetter>) => {
            resolve(response.result);
          },
          error: (error: HttpErrorResponse) => {
            reject(error);
          },
        });
    });
  }

  public deleteSchoolPhoto(schoolId: string, imageId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.schoolMgtService.deleteSchoolPhoto(schoolId, imageId).subscribe({
        next: (response: ApiResponseDto<any>) => {
          resolve(response);
        },
        error: (error: HttpErrorResponse) => {
          reject(error);
        },
      });
    });
  }
}
