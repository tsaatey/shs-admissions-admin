export interface UserExtendedDto {
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
}
