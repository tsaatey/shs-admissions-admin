import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { AdmissionManagementService } from './../services/admission-management.service';
import { Injectable } from '@angular/core';
import { AcademicYear } from '../models/academic-year.model';
import { ApiResponseDto } from '../interfaces/api-response.dto';

@Injectable({ providedIn: 'root' })
export class AdmisionManagementRepository {
  constructor(private admissionManagementService: AdmissionManagementService) {}

  public async generateAdmissionNumber(
    schoolCode: string,
    schoolId: number,
    jhsIndexNumber: string,
    accessToken: string
  ) {
    try {
      return await this.admissionManagementService.generateAdmissionNumber(
        schoolCode,
        schoolId,
        jhsIndexNumber,
        accessToken
      );
    } catch (error) {
      throw error;
    }
  }

  public setAdmissionNumberPrefix(
    schoolId: number,
    admissionNumberPrefix: string,
    academicYear: string
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      this.admissionManagementService
        .setAdmissionNumberPrefix(schoolId, admissionNumberPrefix, academicYear)
        .subscribe({
          next: (response: HttpResponse<any>) => {
            resolve(response.body);
          },
          error: (err: HttpErrorResponse) => {
            reject(err);
          },
        });
    });
  }

  public setCostOfVoucher(
    schoolId: number,
    costOfVoucher: number
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      this.admissionManagementService
        .setCostOfVoucher(schoolId, costOfVoucher)
        .subscribe({
          next: (response: ApiResponseDto<any>) => {
            resolve(response.result);
          },
          error: (err: HttpErrorResponse) => {
            reject(err);
          },
        });
    });
  }

  public getAdmissionNumberPrefix(school_id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.admissionManagementService
        .getAdmissionNumberPrefix(school_id)
        .subscribe({
          next: (response: ApiResponseDto<AcademicYear>) => {
            resolve(response);
          },
          error: (err: HttpErrorResponse) => {
            reject(err);
          },
        });
    });
  }

  public getCostOfVoucher(school_id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.admissionManagementService.getCostOfVoucher(school_id).subscribe({
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
