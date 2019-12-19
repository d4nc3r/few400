import { Component } from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MemoizedSelector, Store } from '@ngrx/store';
import { provideMockStore, MockStore, MockSelector } from '@ngrx/store/testing';
import { AppComponent } from './app.component';
import { AppState, selectRouteUrl } from './reducers';
import { applicationStarted } from './actions/app.actions';
import { By } from '@angular/platform-browser';
import { of, BehaviorSubject } from 'rxjs';
import { AuthService } from './features/auth/services/auth.service';
import { selectUserIsLoggedIn } from './features/auth/reducers';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let mockStore: MockStore<AppState>;

  const fakeAuthService = {
    isLoggedIn$: new BehaviorSubject<boolean>(false)
  } as any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        LoginStubComponent
      ],
      providers: [
        provideMockStore(),
        { provide: AuthService, useValue: fakeAuthService }
      ]
    });
    mockStore = TestBed.get(Store);
    spyOn(mockStore, 'dispatch');
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  }));

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch applicationStarted when it is created', () => {
    const action = applicationStarted();
    expect((mockStore.dispatch as any).calls.first().args[0].type).toBe(action.type);
  });

  it('should display the current URL', () => {
    mockStore.overrideSelector(selectRouteUrl, 'http://icanhascheezburger.com');
    fixture.detectChanges();
    const elUrl = fixture.debugElement.query(By.css('[data-url-display]')).nativeElement;
    expect(elUrl.innerText).toBe('http://icanhascheezburger.com');
  });

  it('should show the Todos link if the user is logged in', () => {
    fakeAuthService.isLoggedIn$.next(true);
    fixture.detectChanges();
    const elLink = fixture.debugElement.query(By.css('[data-todos-link]'));
    expect(elLink).toBeTruthy();
  });

  it('should hide the Todos link if the user is not logged in', () => {
    fakeAuthService.isLoggedIn$.next(false);
    fixture.detectChanges();
    const elLink = fixture.debugElement.query(By.css('[data-todos-link]'));
    expect(elLink).toBeNull();
  });
});

@Component({ selector: 'app-login', template: '' })
class LoginStubComponent { }
