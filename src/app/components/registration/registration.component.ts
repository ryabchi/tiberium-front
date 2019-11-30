import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.less'],
  providers: [AuthService],
})
export class RegistrationComponent implements OnInit {
  public readonly siteKey = '6LeKVqMUAAAAANXZiZyqdLU-xE51wArENuXk6BgN';
  captchaSize = 'normal';
  captchaLang = 'en';
  captchaTheme = 'light';
  captchaType = 'image';

  errors: string[];
  registrationForm: FormGroup;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.registrationForm = fb.group({
      login: [null, Validators.required],
      name: [null, Validators.required],
      password: [null, Validators.required],
      recaptcha: ['', Validators.required],
    });
  }

  ngOnInit() {
  }

  register() {
    this.errors = [];
    this.authService.register(this.registrationForm.value).subscribe(
      data => {
        this.router.navigate(['/login']);
      },
      error => {
        if (error.error.non_field_errors) {
          error.error.non_field_errors.forEach((element) => {
            this.errors.push(element);
          });
        }

        if (error.error.login) {
          error.error.login.forEach((element) => {
            this.errors.push(`login: ${element}`);
          });
        }
        console.log(error);
      }
    );
  }

  onFormSubmit() {
    this.register();
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

}
