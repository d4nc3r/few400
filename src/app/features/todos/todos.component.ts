import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as listActions from './actions/list.actions';
import { TodosState, selectAllTodos } from './reducers';
import { TodoEntity } from './reducers/list.reducer';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  todoList$: Observable<TodoEntity[]>;

  constructor(private store: Store<TodosState>) { }

  ngOnInit() {
    this.todoList$ = this.store.select(selectAllTodos);
  }

  add(what: HTMLInputElement) {
    const description = what.value;

    // dispatch an action, huzzah
    this.store.dispatch(listActions.listItemAdded({ description }));
  }

  loadList() {
    this.store.dispatch(listActions.loadListData());
  }

}
