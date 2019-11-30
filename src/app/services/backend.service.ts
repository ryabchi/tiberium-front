import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {Post, PostPage} from '../models/post';
import {Like, LikeInfo} from '../models/like';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {User} from '../models/user';
import {Passport} from '../models/passport';

const apiUrl = environment.apiUrl;

export function url(methodUrl: string) {
  return `${apiUrl}${methodUrl}`;
}


@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http: HttpClient) {
  }

  getPosts(): Observable<PostPage> {
    return this.http.get<PostPage>(url(`/posts`));
  }

  getPost(postId: string): Observable<Post> {
    return this.http.get<Post>(url(`/posts/${postId}`));
  }

  getUserPosts(userId: string): Observable<PostPage> {
    return this.http.get<PostPage>(url(`/posts/user/${userId}`));
  }

  getUserPassport(userId: string): Observable<Passport[]> {
    return this.http.get<Passport[]>(url(`/passports/backdoor/users/${userId}`));
  }

  getTopPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(url(`/posts/top`));
  }

  getFreshPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(url(`/posts/fresh`));
  }

  savePost(post): Observable<Post> {
    return this.http.post<Post>(url(`/posts`), JSON.stringify(post));
  }

  likePost(post): Observable<Like> {
    return this.http.post<Like>(url(`/likes`), JSON.stringify(post));
  }

  getLikes(postIds: string[]): Observable<{ [id: string]: LikeInfo; }> {

    const paramsValue = new HttpParams()
      .set('post_ids', postIds.join(','));
    return this.http.get<{ [id: string]: LikeInfo; }>(url(`/likes`), {params: paramsValue});
  }

  getUser(userId: string): Observable<User> {
    return this.http.get<User>(url(`/userprofiles/${userId}`));
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(url(`/userprofiles`));
  }

  getPassport(): Observable<Passport[]> {
    return this.http.get<Passport[]>(url(`/passports`));
  }

  savePassport(passport): Observable<Passport> {
    return this.http.post<Passport>(url(`/passports`), JSON.stringify(passport));
  }

  deletePassport(passportId: string) {
    return this.http.delete(url(`/passports/${passportId}`));
  }

}
