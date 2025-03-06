import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AcademicYear } from '../models/academic-year.model';
import { generateAdmissionNumber } from '@Crafterhive/cssps';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiResponseDto } from '../interfaces/api-response.dto';

@Injectable({ providedIn: 'root' })
export class AdmissionManagementService {
  constructor(private httpClient: HttpClient) {}

  public async generateAdmissionNumber(
    schoolCode: string,
    schoolId: number,
    jhsIndexNumber: string,
    accessToken: string
  ) {
    try {
      return await generateAdmissionNumber({
        schoolCode,
        schoolId,
        jhsIndexNumber,
        accessToken,
      });
    } catch (error) {
      throw error;
    }
  }

  public setAdmissionNumberPrefix(
    schoolId: number,
    admissionNumberPrefix: string,
    academicYear: string
  ): Observable<any> {
    return this.httpClient.post<Observable<any>>(
      `${environment.baseUrl}/school/admission-number/prefix`,
      { schoolId, admissionNumberPrefix, academicYear }
    );
  }

  public setCostOfVoucher(
    schoolId: number,
    costOfVoucher: number
  ): Observable<ApiResponseDto<any>> {
    return this.httpClient.post<ApiResponseDto<any>>(
      `${environment.baseUrl}/school/voucher/cost`,
      { schoolId, costOfVoucher }
    );
  }

  public getAdmissionNumberPrefix(
    school_id: number
  ): Observable<ApiResponseDto<AcademicYear>> {
    return this.httpClient.get<ApiResponseDto<AcademicYear>>(
      `${environment.baseUrl}/school/admission-number/prefix`,
      {
        params: { school_id },
      }
    );
  }

  public getCostOfVoucher(school_id: any): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/school/voucher/cost`, {
      params: { school_id },
    });
  }
}
