import { ApiResponseDto } from '../interfaces/api-response.interface';
import { House } from '../models/house.model';
import { HouseDto } from '../interfaces/dtos.interface';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HouseService {
  constructor(private httpClient: HttpClient) {}

  public addHouse(schoolId: string, house: HouseDto): Observable<any> {
    return this.httpClient.post<ApiResponseDto<any>>(
      `${environment.baseUrl}/house`,
      { schoolId, ...house }
    );
  }

  public updateHouse(schoolId: string, house: House): Observable<any> {
    return this.httpClient.put<ApiResponseDto<any>>(`${environment.baseUrl}`, {
      schoolId,
      ...house,
    });
  }

  public deleteHouse(id: number): Observable<any> {
    return this.httpClient.delete<ApiResponseDto<any>>(
      `${environment.baseUrl}/house/${id}`
    );
  }

  public getAllHouses(school_id: string): Observable<HouseDto[]> {
    return this.httpClient.get<HouseDto[]>(`${environment.baseUrl}/house`, {
      params: { school_id },
    });
  }
}
