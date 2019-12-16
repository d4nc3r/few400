import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodosComponent } from './todos.component';
import { StoreModule } from '@ngrx/store';

import { featureName, reducers } from './reducers';

@NgModule({
  declarations: [TodosComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature(featureName, reducers)
  ],
  exports: [TodosComponent]
})
export class TodosModule { }
