import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './authinterceptor';
import { environment } from '../environments/environment';
import { LoggingInterceptor } from './logging.interceptor';

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];

if (!environment.production) {
  httpInterceptorProviders.push({
    provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true
  });
}
