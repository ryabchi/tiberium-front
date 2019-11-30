import {Component, OnInit} from '@angular/core';
import {Post} from '../../models/post';
import {BackendService} from '../../services/backend.service';

const POST_TYPE = {
  TOP: 'top',
  FRESH: 'fresh',
};

@Component({
  selector: 'app-fresh',
  templateUrl: './fresh.component.html',
  styleUrls: ['./fresh.component.less'],
  providers: [BackendService],
})
export class FreshComponent implements OnInit {
  posts: Post[] = [];

  constructor(private httService: BackendService) {
  }

  ngOnInit() {
    this.getPostList();
  }

  getPostList() {
    this.httService.getFreshPosts().subscribe(
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
