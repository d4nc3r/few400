import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';

export interface AppState {
  router: fromRouter.RouterState.Minimal;
}

export const reducers = {
  router: fromRouter.routerReducer
};

const selectRouter = createFeatureSelector<
  AppState,
  fromRouter.RouterReducerState
>('router');

export const {
  selectCurrentRoute,
  selectQueryParam, // 'factory selector' that lets us look up a query param
  selectQueryParams, // all the params
  selectRouteData, // data on the route
  selectUrl,
  selectRouteParam, // 'factory selector' that lets us look up a single route param
  selectRouteParams // all the params
} = fromRouter.getSelectors(selectRouter);

export const selectCustomerIdFromRoute = selectRouteParam('id');
