import { SchoolUserDto } from '../interfaces/school-user.dto';

export class SchoolUser {
  schoolId: string;
  schoolName: string;
  schoolCode: string;
  schoolLocation: string;
  schoolAddress: string;
  email: string;
  emailVerified: boolean;
  phoneNumber: string;
  phoneNumberVerified: boolean;

  constructor(payload?: SchoolUserDto) {
    this.schoolId = payload?.schoolId || '';
    this.schoolName = payload?.schoolName || '';
    this.schoolCode = payload?.schoolCode || '';
    this.schoolLocation = payload?.schoolLocation || '';
    this.schoolAddress = payload?.schoolAddress || '';
    this.email = payload?.email || '';
    this.emailVerified = payload?.emailVerified || false;
    this.phoneNumber = payload?.phoneNumber || '';
    this.phoneNumberVerified = payload?.phoneNumberVerified || false;
  }
}
