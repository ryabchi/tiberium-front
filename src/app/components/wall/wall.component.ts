import {Component, Input, OnInit} from '@angular/core';
import {BackendService} from '../../services/backend.service';
import {Post} from '../../models/post';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.less'],
  providers: [BackendService],
})
export class WallComponent implements OnInit {
  posts: Post[] = [];
  showNewPost = false;
  internalUserId: string;

  @Input()
  set userId(user) {
    this.internalUserId = user;
    this.getPostList();
  }

  get userId() {
    return this.internalUserId;
  }

  constructor(
    private httService: BackendService,
    private authService: AuthService,
  ) {
  }

  ngOnInit() {
  }

  getPostList() {
    this.httService.getUserPosts(this.internalUserId).subscribe(
      data => {
        this.getLikes(data.results);
      },
      error => {
        console.log(error);
      }
    );
  }

  getLikes(posts: Post[]) {
    if (posts.length > 0) {
      const postIds: string[] = [];
      posts.forEach(post => {
        postIds.push(post.id);
      });

      this.httService.getLikes(postIds).subscribe(
        data => {
          posts.forEach(post => {
            if (data[post.id]) {
              post.liked_by_user = data[post.id].liked_by_user;
              post.like_count = data[post.id].count;
            } else {
              post.liked_by_user = false;
              post.like_count = 0;
            }
          });
          this.posts = posts;
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  createNewPost() {
    this.showNewPost = true;
  }

  cancelNewPost() {
    this.showNewPost = false;
  }

  newPostCreated(postId) {
    this.showNewPost = false;
    if (postId) {
      this.getPostList();
    }
  }

}
