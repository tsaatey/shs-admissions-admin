import { UserExtendedDto } from '../interfaces/user-extended.dto';

export class UserExtended {
  id: string;
  firstName: string;
  lastName: string;
  middleName: null;
  gender: string;
  phone: string;
  email: string;
  username: null;
  enabled: boolean;
  accountNonExpired: null;
  credentialNonExpired: null;
  accountNonLocked: null;
  dateTimeCreated: number;
  dateTimeUpdated: number;
  userRoles: any[];
  userRolesMenus: [];

  constructor(payload: UserExtendedDto) {
    this.id = payload.id;
    this.firstName = payload.firstName;
    this.lastName = payload.lastName;
    this.middleName = payload.middleName;
    this.gender = payload.gender;
    this.phone = payload.phone;
    this.email = payload.email;
    this.username = payload.username;
    this.enabled = payload.enabled;
    this.accountNonExpired = payload.accountNonExpired;
    this.credentialNonExpired = payload.credentialNonExpired;
    this.accountNonLocked = payload.accountNonLocked;
    this.dateTimeCreated = payload.dateTimeCreated;
    this.dateTimeUpdated = payload.dateTimeUpdated;
    this.userRoles = payload.userRoles;
    this.userRolesMenus = payload.userRolesMenus;
  }
}
