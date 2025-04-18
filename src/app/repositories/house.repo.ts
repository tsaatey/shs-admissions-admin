import { Injectable } from '@angular/core';
import { HouseService } from '../services/house.service';
import { HouseDto } from '../interfaces/dtos.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { House } from '../models/house.model';

@Injectable({ providedIn: 'root' })
export class HouseRepo {
  constructor(private houseService: HouseService) {}

  public addHouse(schoolId: string, house: HouseDto): Promise<any> {
    return new Promise((resolve, reject) => {
      this.houseService.addHouse(schoolId, house).subscribe({
        next: (response: any) => {
          resolve(response);
        },
        error: (error: HttpErrorResponse) => {
          reject(error);
        },
      });
    });
  }

  public updateHouse(schoolId: string, house: House): Promise<any> {
    return new Promise((resolve, reject) => {
      this.houseService.updateHouse(schoolId, house).subscribe({
        next: (response: any) => {
          resolve(response);
        },
        error: (error: HttpErrorResponse) => {
          reject(error);
        },
      });
    });
  }

  public deleteHouse(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.houseService.deleteHouse(id).subscribe({
        next: (response: any) => {
          resolve(response);
        },
        error: (error: HttpErrorResponse) => {
          reject(error);
        },
      });
    });
  }

  public getHouses(school_id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.houseService.getAllHouses(school_id).subscribe({
        next: (response: HouseDto[]) => {
          const data = response.map((value) => new House(value));
          resolve(data);
        },
        error: (error: HttpErrorResponse) => {
          reject(error);
        },
      });
    });
  }
}
