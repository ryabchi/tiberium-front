import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

const apiUrl = environment.apiUrl;

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router, private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!req.url.startsWith(apiUrl)) {
      return next.handle(req);
    }
    let clonedRequest = req;
    const jwtToken = this.authService.getToken();

    if (jwtToken) {
      clonedRequest = req.clone({
        headers: req.headers
          .set('Authorization', `JWT ${jwtToken}`)
          .set('Content-Type', `application/json`)
      });
    } else {

      clonedRequest = req.clone({
        headers: req.headers
          .set('Content-Type', `application/json`)
      });
      console.log(req.url);
    }
    return next.handle(clonedRequest);
  }
}
