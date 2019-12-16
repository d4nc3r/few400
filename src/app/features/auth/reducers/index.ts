import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromUser from './user.reducer';

export const featureName = 'authFeature';
export interface AuthState {
  user: fromUser.UserState;
}

export const reducers: ActionReducerMap<AuthState> = {
  user: fromUser.reducer
};

// Selectors

// 1. Feature Selector
const selectAuthFeature = createFeatureSelector<AuthState>(featureName);


// 2. Per Branch
const selectUserBranch = createSelector(selectAuthFeature, f => f.user);

// 3. Helpers


// 4. For components

//  -- are they logged in?
export const selectUserIsLoggedIn = createSelector(
  selectUserBranch,
  b => b.isLoggedIn
);

// -- who are they?
export const selectLoggedInUserName = createSelector(
  selectUserBranch,
  b => b.name
);
