import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-skeleton',
  templateUrl: './skeleton.component.html',
  styleUrls: ['./skeleton.component.less'],
  providers: [AuthService],
})
export class SkeletonComponent implements OnInit {

  navLinks = [
    {url: '/', label: 'Main', icon: 'home'},
    {url: '/top', label: 'Top', icon: 'star'},
    {url: '/fresh', label: 'Fresh', icon: 'explore'},
    {url: '/passport', label: 'Passport', icon: 'credit_card'},
    {url: '/login', label: 'Exit', icon: 'exit_to_app'},
  ];

  constructor(private httpAuth: AuthService) {
  }

  ngOnInit() {
  }

  tryLogout(label) {
    if (label === 'exit_to_app') {
      this.httpAuth.logout();
    }
  }

}
