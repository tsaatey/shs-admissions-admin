import { User } from '../models/user.model';
import { School } from '../models/school.model';
import {
  signalStore,
  withState,
  withMethods,
  patchState,
  withHooks,
  watchState,
  getState,
} from '@ngrx/signals';
import { effect } from '@angular/core';
import { environment } from '../../environments/environment';

interface SessionStateModel {
  sessionUser: User;
  sessionSchool: School;
  sessionRoles: string[];
}

const initialState: SessionStateModel = {
  sessionUser: {} as User,
  sessionSchool: {} as School,
  sessionRoles: [],
};

export const SessionStateStore = signalStore(
  { providedIn: 'root' },
  withState(loadInitialState),
  withMethods((store) => ({
    setSessionUser(sessionUser: User) {
      patchState(store, { sessionUser });
    },
    setSessionSchool(sessionSchool: School) {
      patchState(store, { sessionSchool });
    },
    setSessionRoles(sessionRoles: string[]) {
      patchState(store, (state) => ({
        sessionRoles: { ...state.sessionRoles, sessionRoles },
      }));
    },
    reset() {
      patchState(store, initialState);
      localStorage.removeItem('sessionState');
    },
  })),
  withHooks({
    onInit(store) {
      effect(() => {
        const state = getState(store);
        saveStateToStorage(state);
      }),
        watchState(store, (state) => {
          if (environment.development) {
            console.log('Session', state);
          }
        });
    },
  })
);

// Load from localStorage
function loadInitialState(): SessionStateModel {
  const storedState = localStorage.getItem('sessionState');
  return storedState ? JSON.parse(storedState) : initialState;
}

// Save state to localStorage
function saveStateToStorage(state: SessionStateModel) {
  localStorage.setItem('sessionState', JSON.stringify(state));
}
