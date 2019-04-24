import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Constants } from '../../shared/constants';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>  {
    if (localStorage.getItem(Constants.TokenKey)) {
      const reqCopy = req.clone({
        headers: req.headers.append(
          'Authorization', localStorage.getItem(Constants.TokenKey)
        )
      });
      return next.handle(reqCopy);
    }
    return next.handle(req);
  }

  constructor() { }
}
