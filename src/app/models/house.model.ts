import { HouseDto } from '../interfaces/dtos.interface';

export class House {
  id: string;
  houseName: string;
  houseNumber: string;
  sex: string;
  houseMaster: string;
  houseMistress: string;
  assistantHouseMaster: string;
  assistantHouseMistress: string;

  constructor(payload?: HouseDto) {
    this.id = payload?.id || '';
    this.houseName = payload?.houseName || '';
    this.houseNumber = payload?.houseNumber || '';
    this.sex = payload?.sex || '';
    this.houseMaster = payload?.houseMaster || '';
    this.houseMistress = payload?.houseMistress || '';
    this.assistantHouseMaster = payload?.assistantHouseMaster || '';
    this.assistantHouseMistress = payload?.assistantHouseMistress || '';
  }
}
