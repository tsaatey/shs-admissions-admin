export interface SignupDto {
  firstName: string;
  lastName: string;
  middleName: string;
  gender: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  schoolName: string;
  schoolCode: string;
  schoolAddress: string;
  schoolLocation: string;
}

export interface HouseDto {
  id: string;
  houseName: string;
  houseNumber: string;
  sex: string;
  houseMaster: string;
  houseMistress: string;
  assistantHouseMaster: string;
  assistantHouseMistress: string;
}

export interface DocumentDto {
  document: FormData;
  schoolId: string;
}
