import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {YoutubeToken} from '../models/youtubetoken';

const apiUrl = environment.apiUrl;

export function url(methodUrl: string) {
  return `${apiUrl}${methodUrl}`;
}


@Injectable()
export class YoutubeService {

  youtubeCommentsApi = 'https://www.googleapis.com/youtube/v3/commentThreads';
  youtubeVideoApi = 'https://www.googleapis.com/youtube/v3/videos';
  apiKey: string;

  constructor(private http: HttpClient) {
  }

  getVideoInfo(videoId: string, part = 'snippet') {
    if (!this.apiKey) {
      this.apiKey = localStorage.getItem('youtube');
    }
    if (!this.apiKey) {
      this.getToken();
    }
    const paramsValue = new HttpParams()
      .set('key', this.apiKey)
      .set('id', videoId)
      .set('part', part);
    return this.http.get(this.youtubeVideoApi, {params: paramsValue});
  }

  getToken() {
    this.getYoutubeToken().subscribe(
      data => {
        this.apiKey = data.token;
        localStorage.setItem('youtube', data.token);
      },
      error => {
        console.log(error);
      }
    );
  }


  getVideoComments(videoId: string, maxResults = 3, part = 'snippet') {
    if (!this.apiKey) {
      this.apiKey = localStorage.getItem('youtube');
    }
    if (!this.apiKey) {
      this.getToken();
    }
    const paramsValue = new HttpParams()
      .set('key', this.apiKey)
      .set('videoId', videoId)
      .set('part', part)
      .set('maxResults', String(maxResults));
    return this.http.get(this.youtubeCommentsApi, {params: paramsValue});
  }

  getYoutubeToken(): Observable<YoutubeToken> {
    return this.http.get<YoutubeToken>(url(`/youtube/tokens`));
  }

}
