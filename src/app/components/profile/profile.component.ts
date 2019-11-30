import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {ActivatedRoute} from '@angular/router';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less'],
  providers: [AuthService],
})
export class ProfileComponent implements OnInit {

  userId: string;
  private userIdSub: any;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.userIdSub = this.route.params.subscribe(
      params => {
        if (params.userId) {
          this.userId = params.userId;
        } else {
          this.userId = this.authService.getUserId();
        }
      }
    );
  }

  OnDestroy() {
    this.userIdSub.unsubscribe();
  }


}
