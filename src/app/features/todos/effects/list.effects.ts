import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import { TodosState } from '../reducers';
import * as listActions from '../actions/list.actions';
import { TodoEntity } from '../reducers/list.reducer';
import { of } from 'rxjs';

@Injectable()
export class ListEffects {
  constructor(private actions$: Actions, private http: HttpClient) { }

  loadList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(listActions.loadListData),
      switchMap(() => this.http.get<TodoEntity[]>(environment.todosUrl)
        .pipe(
          map(r => listActions.loadListDataSucceeded({ payload: r })),
          catchError(err => of(listActions.loadListDataFailed({ message: err.message })))
        )
      )
    ), { dispatch: true }
  );

  addItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(listActions.listItemAdded),
      switchMap(a => this.http.post<TodoEntity>(environment.todosUrl, { description: a.payload.description })
        .pipe(
          map(r => listActions.listItemAddedSuccess({ oldId: a.payload.id, payload: r })),
          catchError(err => of(listActions.listItemAddedFailure({ message: err.message, payload: a.payload })))
        )
      )
    ), { dispatch: true }
  );
}
