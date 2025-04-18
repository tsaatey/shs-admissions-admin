export interface SchoolSignupDto {
  schoolName: string;
  schoolCode: string;
  schoolAddress: string;
  schoolLocation: string;
}

export interface UserSignupDto {
  firstName: string;
  lastName: string;
  middleName: string;
  gender: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}

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
