import { UserDto } from '../interfaces/user.dto';
import { SchoolUser } from './school-user.model';

export class User {
  userId: string;
  firstName: string;
  lastName: string;
  middleName: string;
  gender: string;
  email: string;
  phoneNumber: string;
  school: SchoolUser;

  constructor(user?: UserDto) {
    this.userId = user?.userId || '';
    this.firstName = user?.firstName || '';
    this.lastName = user?.lastName || '';
    this.middleName = user?.middleName || '';
    this.gender = user?.gender || '';
    this.email = user?.email || '';
    this.phoneNumber = user?.phoneNumber || '';
    this.school = new SchoolUser({
      schoolId: user?.school?.schoolId || '',
      schoolAddress: user?.school?.schoolAddress || '',
      schoolCode: user?.school?.schoolCode || '',
      schoolLocation: user?.school?.schoolLocation || '',
      schoolName: user?.school?.schoolName || '',
      email: user?.school?.email || '',
      emailVerified: user?.school?.emailVerified || false,
      phoneNumber: user?.school?.phoneNumber || '',
      phoneNumberVerified: user?.school?.phoneNumberVerified || false,
    });
  }
}
