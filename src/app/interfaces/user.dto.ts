import { SchoolUserDto } from "./school-user.dto";

export interface UserDto {
  userId: string;
  firstName: string;
  lastName: string;
  middleName: string;
  gender: string;
  email: string;
  phoneNumber: string;
  school: SchoolUserDto;
}
