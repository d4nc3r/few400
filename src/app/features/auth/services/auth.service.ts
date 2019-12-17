import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthState, selectUserIsLoggedIn } from '../reducers';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn$: Observable<boolean>;

  constructor(private store: Store<AuthState>) {
    this.isLoggedIn$ = store.select(selectUserIsLoggedIn);
  }
}
