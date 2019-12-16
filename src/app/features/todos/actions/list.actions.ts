import { createAction, props } from '@ngrx/store';
import { TodoEntity } from '../reducers/list.reducer';

let tempId = 0;

export const listItemAdded = createAction(
  '[todos] list item added',
  ({ description }: { description: string }) => ({
    payload: {
      id: 'T' + tempId++,
      description,
      completed: false
    }
  })
);

export const listItemAddedSuccess = createAction(
  '[todos] successfully added list item',
  props<{ oldId: string, payload: TodoEntity }>()
);

export const listItemAddedFailure = createAction(
  '[todos] failed to add list item',
  props<{ message: string, payload: TodoEntity }>()
);

export const loadListData = createAction(
  '[todos] load list data'
);

export const loadListDataSucceeded = createAction(
  '[todos] successfully loaded list data',
  props<{ payload: TodoEntity[] }>()
);

export const loadListDataFailed = createAction(
  '[todos] failed to load list data',
  props<{ message: string }>()
);
