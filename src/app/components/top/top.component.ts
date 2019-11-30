import {Component, OnInit} from '@angular/core';
import {Post} from '../../models/post';
import {BackendService} from '../../services/backend.service';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.less'],
  providers: [BackendService],
})
export class TopComponent implements OnInit {
  posts: Post[] = [];

  constructor(private httService: BackendService) {
  }

  ngOnInit() {
    this.getPostList();
  }

  getPostList() {
    this.httService.getTopPosts().subscribe(
      data => {
        this.getLikes(data);
      },
      error => {
        console.log(error);
      }
    );
  }

  getLikes(posts: Post[]) {
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
