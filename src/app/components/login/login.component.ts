import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {YoutubeService} from '../../services/youtube.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  providers: [AuthService, YoutubeService],
})
export class LoginComponent implements OnInit {

  errors: string[];
  loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private youtube: YoutubeService,
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.loginForm = fb.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  ngOnInit() {
    if (this.authService.getToken()) {
      this.router.navigate(['/']);
    }
  }

  login() {
    this.errors = [];
    this.authService.login(this.loginForm.value).subscribe(
      data => {
        this.authService.saveToken(data.token);
        this.youtube.getToken();
        this.authService.saveUserData();
        this.router.navigate(['/']);
      },
      error => {
        if (error.error.non_field_errors) {
          error.error.non_field_errors.forEach((element) => {
            this.errors.push(element);
          });
        }

        if (error.status === 500) {
          this.errors.push('Server error');
        }
      }
    );
  }

  onFormSubmit() {
    this.login();
  }

  goToRegistration() {
    this.router.navigate(['/registration']);
  }

}
