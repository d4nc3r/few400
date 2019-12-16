import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import * as io from 'socket.io-client';

import { environment } from '../../../../environments/environment';
import * as listActions from '../actions/list.actions';
import { TodoEntity } from '../reducers/list.reducer';
import { Store } from '@ngrx/store';
import { TodosState } from '../reducers';

@Injectable()
export class ListEffects {
  socket;

  constructor(private actions$: Actions, private http: HttpClient, private store: Store<TodosState>) {
    this.connectWs();
  }

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



  connectWs() {
    this.socket = io(environment.todosWsUrl);
    this.socket.on('connect', () => console.log('connected to web socket server'));
    this.socket.on('todo-added', (data: TodoEntity) => this.store.dispatch(listActions.gotTodoFromWebSocket({ payload: data })));
  }

}
