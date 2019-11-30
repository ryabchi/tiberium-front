import {Component, Input, OnInit} from '@angular/core';
import {YoutubeService} from '../../services/youtube.service';
import {DomSanitizer} from '@angular/platform-browser';
import {Post} from '../../models/post';
import DateTimeFormat = Intl.DateTimeFormat;

class YoutubeComment {
  authorDisplayName: string;
  authorProfileImageUrl: string;
  authorChannelUrl: string;
  videoId: string;
  textDisplay: string;
  textOriginal: string;
  likeCount: number;
  publishedAt: DateTimeFormat;
}

class YoutubeVideoDescription {
  title: string;
  description: string;
  channelTitle: string;
  publishedAt: DateTimeFormat;
}

@Component({
  selector: 'app-youtube-post',
  templateUrl: './youtube-post.component.html',
  styleUrls: ['./youtube-post.component.less'],
  providers: [YoutubeService],
})
export class YoutubePostComponent implements OnInit {
  post: Post = null;

  internalLoadInfo = true;

  @Input()
  set loadInfo(obj: any) {
    this.internalLoadInfo = obj;
  }

  get loadInfo() {
    return this.internalLoadInfo;
  }

  internalVideoId: any;

  @Input()
  set videoId(obj: any) {
    this.internalVideoId = obj;
    this.loadVideoInfo();
  }

  get videoId() {
    return this.internalVideoId;
  }

  iframeUrl = 'https://www.youtube.com/embed/';
  videoUrl = null;

  comments: YoutubeComment[] = [];
  description: YoutubeVideoDescription = null;

  constructor(private youtubeService: YoutubeService, private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
  }

  load() {
    this.loadVideoInfo();

  }

  loadVideoInfo() {
    if (this.videoId.length !== 11) {
      return;
    }

    if (this.loadInfo) {
      this.youtubeService.getVideoInfo(this.videoId).subscribe(
        data => {
          if (data['items'] && data['items'].length > 0) {
            const video = data['items'][0]['snippet'];
            this.description = video as YoutubeVideoDescription;
            this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.iframeUrl + this.videoId);
            this.loadVideoComments();
          }
        }
        , error => {
          console.log(error);
        }
      );
    } else {
      this.loadVideoComments();
    }
  }

  loadVideoComments() {
    this.youtubeService.getVideoComments(this.videoId).subscribe(
      data => {
        const items = data['items'];
        items.forEach(value => {
          const rawComment = value.snippet.topLevelComment.snippet;
          if (!rawComment.textOriginal) {
            rawComment.textOriginal = '';
          }
          rawComment.textOriginal = this.sanitizer.bypassSecurityTrustHtml(rawComment.textOriginal);
          this.comments.push(rawComment as YoutubeComment);
        });
      },
      error => {
        console.log(error);
      }
    );
  }
}

