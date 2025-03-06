import { SignupDto } from '../interfaces/sign-up.interface';
import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';

export interface AuthenticationStateModel {
  authenticated: boolean;
  jwt: string;
  jwtExpiry: string;
  jwtType: string;
  refreshToken: string;
  newDeviceMetadata: string;
  identifier: string;
  signupData: SignupDto;
}

const initialState: AuthenticationStateModel = {
  authenticated: false,
  jwt: '',
  jwtExpiry: '',
  jwtType: '',
  refreshToken: '',
  newDeviceMetadata: '',
  identifier: '',
  signupData: {} as SignupDto,
};

export const AuthStore = signalStore(
  withState(initialState),
  withMethods((store) => ({
    setAuthenticated(authenticated: boolean) {
      patchState(store, { authenticated });
    },
    setJwt(jwt: string) {
      patchState(store, { jwt });
    },
    setRefreshToken(refreshToken: string) {
      patchState(store, { refreshToken });
    },
    setJwtExpiry(jwtExpiry: string) {
      patchState(store, { jwtExpiry });
    },
    setJwtType(jwtType: string) {
      patchState(store, { jwtType });
    },
    setNewDeviceMetadata(newDeviceMetadata: string) {
      patchState(store, { newDeviceMetadata });
    },
    setIdentifier(identifier: string) {
      patchState(store, { identifier });
    },
    setSignupData(signupData: SignupDto) {
      patchState(store, { signupData });
    },
    reset() {
      patchState(store, initialState);
    },
  }))
);
