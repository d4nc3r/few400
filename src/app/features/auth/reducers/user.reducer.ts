import { Action, createReducer, on } from '@ngrx/store';

import * as userActions from '../actions/user.actions';

export interface UserState {
  name: string;
  isLoggedIn: boolean;
}

const initialState: UserState = {
  name: null,
  isLoggedIn: false
};

export function reducer(state: UserState = initialState, action: Action): UserState {
  return myReducer(state, action);
}

const myReducer = createReducer(
  initialState,
  on(userActions.loginRequestSucceeded, (state, action) => ({ name: action.username, isLoggedIn: true })),
  on(userActions.loginRequestFailed, () => initialState),
  on(userActions.logoutRequest, () => initialState)
);
