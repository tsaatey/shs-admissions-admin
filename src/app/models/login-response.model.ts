import { LoginResponseDto } from '../interfaces/login.interface';

export class LoginResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  newDeviceMetadata: null;
  tokenType: string;
  idToken: string;

  constructor(payload?: LoginResponseDto) {
    this.accessToken = payload?.accessToken || '';
    this.refreshToken = payload?.refreshToken || '';
    this.expiresIn = payload?.expiresIn || 0;
    this.newDeviceMetadata = payload?.newDeviceMetadata || null;
    this.tokenType = payload?.tokenType || '';
    this.idToken = payload?.idToken || '';
  }
}
