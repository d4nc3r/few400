import { Component, OnInit } from '@angular/core';
import { TodosState, selectAllTodos } from './reducers';
import { Store } from '@ngrx/store';

import * as listActions from './actions/list.actions';
import { TodoEntity } from './reducers/list.reducer';
import { Observable } from 'rxjs';

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
