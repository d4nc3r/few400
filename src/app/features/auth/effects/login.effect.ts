import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError, tap, filter } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import * as appActions from '../../../actions/app.actions';
import * as userActions from '../actions/user.actions';

@Injectable()
export class LoginEffects {
  constructor(private actions$: Actions, private http: HttpClient, private router: Router) { }

  checkForTokenOnAppStart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(appActions.applicationStarted),
      map(() => localStorage.getItem('token')),
      filter(Boolean),
      map((token: string) => extractUserDataFromJwt(token)),
      map(user => userActions.loginRequestSucceeded(user))
    ), { dispatch: true }
  );

  storeToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.loginRequestSucceeded),
      tap(a => localStorage.setItem('token', a.token))
    ), { dispatch: false }
  );

  removeToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.loginRequestFailed, userActions.logoutRequest),
      tap(() => localStorage.setItem('token', '')),
      tap(() => this.router.navigate(['../']))
    ), { dispatch: false }
  );

  // loginRequest --> (loginRequestSucceeded | loginRequestFailed)
  loginRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.loginRequest),
      switchMap((a) => this.http.post<{ access_token: string }>(environment.authUrl, { username: a.username, password: a.password })
        .pipe(
          map(r => userActions.loginRequestSucceeded(extractUserDataFromJwt(r.access_token))),
          catchError(err => of(userActions.loginRequestFailed({ message: err.message })))
        )
      )
    ), { dispatch: true });
}

function extractUserDataFromJwt(token: string): { username: string, token: string } {
  const info = token.split('.')[1];
  const obj = JSON.parse(atob(info)) as { username: string };
  return { username: obj.username, token };
}
