import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodosComponent } from './features/todos/todos.component';
import { AuthGuard } from './auth.guard';
import { environment } from '../environments/environment';
import { CustomersComponent } from './components/customers/customers.component';


const routes: Routes = [
  {
    path: 'todos',
    component: TodosComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'customer/:id',
    component: CustomersComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    enableTracing: !environment.production
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
