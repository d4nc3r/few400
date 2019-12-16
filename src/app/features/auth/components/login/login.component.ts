import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AuthState, selectUserIsLoggedIn, selectLoggedInUserName } from '../../reducers';
import * as userActions from '../../actions/user.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;
  username$: Observable<string>;

  constructor(private store: Store<AuthState>) { }

  ngOnInit() {
    this.isLoggedIn$ = this.store.select(selectUserIsLoggedIn);
    this.username$ = this.store.select(selectLoggedInUserName);
  }

  login(usernameEl: HTMLInputElement, passwordEl: HTMLInputElement) {
    const username = usernameEl.value;
    const password = passwordEl.value;
    this.store.dispatch(userActions.loginRequest({ username, password }));

    // reset form
    usernameEl.value = '';
    passwordEl.value = '';
  }

}
