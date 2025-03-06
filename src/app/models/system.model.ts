import { HttpStateStatus } from './../enums';

export class HttpRequestState {
  public status: HttpStateStatus;
  public error: string;

  constructor() {
    this.status = HttpStateStatus.IDLE;
    this.error = '';
  }
}

export class AuthorizationResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  newDeviceMetadata: null;
  tokenType: string;
  idToken: string;

  constructor(payload?: AuthorizationResponse) {
    this.accessToken = payload?.accessToken || '';
    this.refreshToken = payload?.refreshToken || '';
    this.expiresIn = payload?.expiresIn || 0;
    this.newDeviceMetadata = payload?.newDeviceMetadata || null;
    this.tokenType = payload?.tokenType || '';
    this.idToken = payload?.idToken || '';
  }
}
