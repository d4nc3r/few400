import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState, selectRouteUrl } from './reducers';
import { applicationStarted } from './actions/app.actions';
import { AuthService } from './features/auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'few400';
  isLoggedIn$: Observable<boolean>;
  currentUrl$: Observable<string>;

  constructor(private store: Store<AppState>, private authService: AuthService) {
    store.dispatch(applicationStarted());
  }

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
    this.currentUrl$ = this.store.select(selectRouteUrl);
  }
}
