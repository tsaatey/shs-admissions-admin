import {
  signalStore,
  getState,
  patchState,
  watchState,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { AcademicYear } from './../models/academic-year.model';
import { effect } from '@angular/core';
import { environment } from '../../environments/environment';

interface SchoolStateModel {
  currentAcademicYear: AcademicYear;
  programmes?: string[];
}

const initialState: SchoolStateModel = {
  currentAcademicYear: {} as AcademicYear,
  programmes: [],
};

export const SchoolStateStore = signalStore(
  { providedIn: 'root' },
  withState(loadInitialState),
  withMethods((store) => ({
    setCurrentAcademicYear(currentAcademicYear: AcademicYear) {
      patchState(store, { currentAcademicYear });
    },
    setProgrammes(programmes: string[]) {
      patchState(store, { programmes });
    },
    reset() {
      patchState(store, initialState);
      localStorage.removeItem('schoolState');
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
            console.log('SchoolState', state);
          }
        });
    },
  })
);

// Load from localStorage
function loadInitialState(): SchoolStateModel {
  const storedState = localStorage.getItem('schoolState');
  return storedState ? JSON.parse(storedState) : initialState;
}

// Save state to localStorage
function saveStateToStorage(state: SchoolStateModel) {
  localStorage.setItem('schoolState', JSON.stringify(state));
}
