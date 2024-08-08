import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Token } from '../models/token';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  token: Token | null = null;
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    var json = localStorage.getItem('token');
    if (json !== null) {
      const tokenJson = JSON.parse(json!);
      this.token = tokenJson;
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.token}`,
        },
      });
    }
    return next.handle(request);
  }
}
