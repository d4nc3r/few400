import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpResponse } from '@angular/common/http';
import { filter, tap } from 'rxjs/operators';


@Injectable()
export class LoggingInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    console.group('HTTP REQUEST');
    console.log(`Started a Request at ${new Date()}`);
    return next.handle(req).pipe(
      tap((r: HttpResponse<any>) => console.log(`Request to ${r.url} finished at ${new Date()}`)),
      tap(() => console.groupEnd())
    );
  }
}
