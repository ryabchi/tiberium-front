import {Injectable} from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

const apiUrl = environment.apiUrl;

export function url(methodUrl: string) {
  return `${apiUrl}${methodUrl}`;
}

const USER_ID_KEY = 'user_id';
const LOGIN_KEY = 'login';
const TOKEN_KEY = 'jwt_token';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiTokenUrl = '/jwt-token-auth/';
  token: string;
  userId: string;

  constructor(
    public jwtHelper: JwtHelperService,
    private http: HttpClient,
    private router: Router,
  ) {
  }

  login(data): Observable<any> {
    // exchange login and password on JWT token
    return this.http.post<any>(url(this.apiTokenUrl), JSON.stringify(data));
  }

  register(data): Observable<any> {
    return this.http.post<any>(url('/userprofiles/register'), JSON.stringify(data));
  }

  getToken() {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return token;
    }
    this.logout();
    return undefined;
  }

  saveToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
  }

  saveUserData() {
    const token = this.jwtHelper.decodeToken(this.getToken());
    localStorage.setItem(USER_ID_KEY, token.user_id);
    localStorage.setItem(LOGIN_KEY, token.username);
  }

  getUserId() {
    const userId = localStorage.getItem(USER_ID_KEY);
    if (userId) {
      return userId;
    }
    this.logout();
    return undefined;
  }

  getLogin() {
    const login = localStorage.getItem(LOGIN_KEY);
    if (login) {
      return login;
    }
    this.logout();
    return undefined;
  }

  logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_ID_KEY);
    localStorage.removeItem(LOGIN_KEY);
    localStorage.removeItem('youtube');
    this.token = null;
    // this.router.navigate(['/login']);
  }

  lol(){
    localStorage.getItem('jwt_token');
}

}
