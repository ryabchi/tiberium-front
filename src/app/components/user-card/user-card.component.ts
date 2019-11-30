import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../models/user';
import {BackendService} from '../../services/backend.service';
import {Passport} from '../../models/passport';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.less'],
  providers: [BackendService, AuthService],
})
export class UserCardComponent implements OnInit {
  user: User;
  internalUserId: string;
  passports: Passport[] = [];
  users: User[] = [];

  currentUserLogin: string;

  @Input()
  set userId(user: string) {
    this.internalUserId = user;
    this.loadUser();
  }

  get userId() {
    return this.internalUserId;
  }

  constructor(
    private httpService: BackendService,
    private authService: AuthService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.currentUserLogin = this.authService.getLogin();
  }

  loadUser() {
    this.httpService.getUser(this.userId).subscribe(
      data => {
        this.user = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  showUserPassport() {
    this.httpService.getUserPassport(this.internalUserId).subscribe(
      data => {
        this.passports = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  loadUsers() {
    this.httpService.getUsers().subscribe(
      data => {
        this.users = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  goToUserProfile(userId) {
    this.router.navigate([`/user/${userId}`]);
  }
}
