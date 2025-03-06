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
    houseName: string;
    houseNumber: string;
    houseSex: string;
    houseMaster: string;
    houseMistress: string;
    schoolId: string;
}

export interface DocumentDto {
    document: FormData,
    schoolId: string
}
