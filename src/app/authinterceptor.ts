import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpResponse } from '@angular/common/http';
import { tap, filter } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  // this will intercept every http request
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const idToken = localStorage.getItem('token');
    if (idToken) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + idToken)
      });

      return next.handle(cloned).pipe(
        filter(r => r instanceof HttpResponse),
        tap((r: HttpResponse<any>) => console.log(`Made an authorized request to ${r.url} and got ${r.status} / ${r.statusText}`))
      );
    } else {
      return next.handle(req).pipe(
        filter(r => r instanceof HttpResponse),
        tap((r: HttpResponse<any>) => console.log(`Made an UNAUTHORIZED request to ${r.url} and got ${r.status} / ${r.statusText}`))
      );
    }
  }
}
