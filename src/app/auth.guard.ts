import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './features/auth/services/auth.service';

@Injectable()
// IMPORTANT: needs to be provided, and we have to hook it up to the route as well
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) { }

  canActivate() {
    return this.authService.isLoggedIn$;
  }
}
