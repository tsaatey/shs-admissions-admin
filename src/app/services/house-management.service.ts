import { ApiResponseDto } from './../interfaces/api-response.interface';
import { House } from '../models/house.model';
import { HouseDto } from '../interfaces/dtos.interface';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class HouseManagementService {
  constructor(private httpClient: HttpClient) {}

  public addHouse(payload: HouseDto): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClient
        .post<ApiResponseDto<any>>(`${environment.baseUrl}/house`, payload)
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

  public updateHouse(payload: House): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClient
        .put<ApiResponseDto<any>>(`${environment.baseUrl}`, payload)
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

  public deleteHouse(payload: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClient
        .delete<ApiResponseDto<any>>(`${environment.baseUrl}/house/${payload}`)
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

  public getAllHouses(payload: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClient
        .get<ApiResponseDto<any[]>>(`${environment.baseUrl}/house`, {
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
}
