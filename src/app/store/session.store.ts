import { User } from '../models/user.model';
import { School } from '../models/school.model';
import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';

interface SessionStateModel {
  sessionUser: User;
  sessionSchool: School;
  sessionRoles: string[];
}

const initiateState: SessionStateModel = {
  sessionUser: {} as User,
  sessionSchool: {} as School,
  sessionRoles: [],
};

export const SessionStateStore = signalStore(
  withState(initiateState),
  withMethods((store) => ({
    setSessionUser(sessionUser: User) {
      patchState(store, { sessionUser });
    },
    setSessionSchool(sessionSchool: School) {
      patchState(store, { sessionSchool });
    },
    setSessionRoles(sessionRoles: string[]) {
      patchState(store, { sessionRoles });
    },
    reset() {
      patchState(store, initiateState);
    },
  }))
);
