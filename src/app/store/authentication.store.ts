import {
  SchoolSignupDto,
  UserSignupDto,
} from '../interfaces/sign-up.interface';
import {
  signalStore,
  withState,
  withMethods,
  patchState,
  withHooks,
  watchState,
  getState,
} from '@ngrx/signals';
import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { effect } from '@angular/core';

export interface AuthenticationStateModel {
  authenticated: boolean;
  jwt: string;
  jwtExpiry: string;
  jwtType: string;
  refreshToken: string;
  newDeviceMetadata: string;
  identifier: string;
  schoolData: SchoolSignupDto;
  cordData: UserSignupDto;
  usr: string;
}

const initialState: AuthenticationStateModel = {
  authenticated: false,
  jwt: '',
  jwtExpiry: '',
  jwtType: '',
  refreshToken: '',
  newDeviceMetadata: '',
  identifier: '',
  schoolData: {} as SchoolSignupDto,
  cordData: {} as UserSignupDto,
  usr: '',
};

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withDevtools('auth'),
  withState(loadInitialState),
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
    setSchoolData(schoolData: SchoolSignupDto) {
      patchState(store, { schoolData });
    },
    setCordData(cordData: UserSignupDto) {
      patchState(store, { cordData });
    },
    setUsr(usr: string) {
      patchState(store, { usr });
    },
    reset() {
      patchState(store, initialState);
      localStorage.removeItem('authState');
    },
  })),
  withHooks({
    onInit(store) {
      effect(() => {
        const state = getState(store);
        saveStateToStorage(state);
      }),
        watchState(store, (state) => {
          console.log('Auth', state);
        });
    },
  })
);

// Load from localStorage
function loadInitialState(): AuthenticationStateModel {
  const storedState = localStorage.getItem('authState');
  return storedState ? JSON.parse(storedState) : initialState;
}

// Save state to localStorage
function saveStateToStorage(state: AuthenticationStateModel) {
  localStorage.setItem('authState', JSON.stringify(state));
}
