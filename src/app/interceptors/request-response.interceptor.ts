import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { delay, Observable } from 'rxjs';

@Injectable()
export class RequestResponseInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const url = 'http://localhost:3000/';
    const newReq = request.clone({url: url + request.url});
    return next.handle(newReq).pipe(delay(700));
  }
}
