export interface LoginResponseDto {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  newDeviceMetadata: null;
  tokenType: string;
  idToken: string;
}

export interface NewAccountLoginDto {
  challengeName: string;
  session: string;
  challengeParameters: any;
  authenticationResult: null;
}
