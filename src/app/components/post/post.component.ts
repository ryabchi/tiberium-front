import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {BackendService} from '../../services/backend.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {YoutubePostComponent} from '../youtube-post/youtube-post.component';
import {AuthService} from '../../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.less'],
  providers: [BackendService, AuthService],
})
export class PostComponent implements OnInit {
  @ViewChild('youtubePost') youtubePost: YoutubePostComponent;
  youtubeIdRegExp = '^((((http|https):\\/\\/www\\.)|((http|https):\\/\\/)|(www\\.|))youtube\\.com\\/watch\\?v=\\w\\w\\w\\w\\w\\w\\w\\w\\w\\w\\w$)';
  youtubeLoadVideoInfo = true;

  private postIdSub: any;

  @Input()
  set postData(obj: any) {
    this.postForm.setValue(obj);
  }

  @Output() savedPost = new EventEmitter<string>();

  PostType = {
    TEXT: 'text',
    IMAGE: 'image',
    VIDEO: 'video',
  };

  postTypes = [
    {value: this.PostType.TEXT, label: 'text'},
    {value: this.PostType.IMAGE, label: 'photo'},
    {value: this.PostType.VIDEO, label: 'video'},
  ];

  postForm: FormGroup;

  constructor(
    private httpService: BackendService,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.postForm = fb.group({
      id: [''],
      post_type: ['text', Validators.required],
      text: [''],
      youtube_link: [''],
      creator: [''],
      creator_info: [null],
      created_at: [null],
      liked_by_user: [false],
      like_count: [0],
      // image: [''],
    });
  }

  ngOnInit() {
    this.postIdSub = this.route.params.subscribe(
      params => {
        if (params.postId) {
          this.youtubeLoadVideoInfo = false;
          this.getPost(params.postId);
        }
      }
    );
  }

  extractVideoId() {
    const result = this.postForm.value.youtube_link.match(this.youtubeIdRegExp);
  }

  previewVideo() {
    this.youtubePost.load();
  }

  resetForm() {
    this.postForm.reset();
  }

  cancel() {
    this.postForm.reset();
    this.savedPost.emit('');
  }

  savePost() {
    this.httpService.savePost(this.postForm.value).subscribe(
      data => {
        this.savedPost.emit(data.id);
        this.resetForm();
      },
      error => {
        console.log(`Error while create post: ${error}`);
      }
    );
  }

  getPost(postId: string) {
    this.httpService.getPost(postId).subscribe(
      data => {
        data.liked_by_user = false;
        data.like_count = 0;
        this.postForm.setValue(data);
      },
      error => {
        console.log(error);
      }
    );
  }

  onFormSubmit() {
    this.savePost();
  }

  like() {

    const likeData = {
      post: this.postForm.value.id,
      userId: this.authService.getUserId(),
    };


    this.httpService.likePost(likeData).subscribe(
      data => {
        if (data) {
          this.postForm.value.liked_by_user = true;
          this.postForm.value.like_count += 1;

        } else {
          this.postForm.value.liked_by_user = false;
          this.postForm.value.like_count -= 1;
        }
      },
      error => {
        console.log(`Error while like: ${error}`);
      }
    );
  }

  goToUserProfile() {
    const userId = this.postForm.value.creator_info.id;
    this.router.navigate([`/user/${userId}`]);
  }

  goToPost() {
    const postId = this.postForm.value.id;
    this.router.navigate([`/post/${postId}`]);
  }
}
