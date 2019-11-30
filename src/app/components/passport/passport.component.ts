import {Component, OnInit} from '@angular/core';
import {BackendService} from '../../services/backend.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Passport} from '../../models/passport';

@Component({
  selector: 'app-passport',
  templateUrl: './passport.component.html',
  styleUrls: ['./passport.component.less'],
  providers: [BackendService],
})
export class PassportComponent implements OnInit {
  passports: Passport[];
  passportForm: FormGroup;

  constructor(private httpService: BackendService, private fb: FormBuilder) {
    this.passportForm = fb.group({
      name: [null, Validators.required],
      secret: [null, Validators.required],
      created_at: [null],
      creator: [null],
    });
  }

  ngOnInit() {
    this.load();
  }

  load() {
    this.httpService.getPassport().subscribe(
      data => {
        this.passports = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  savePassport() {
    this.httpService.savePassport(this.passportForm.value).subscribe(
      data => {
        this.passports.push(data);
        this.passportForm.reset();
      },
      error => {
        console.log(error);
      }
    );
  }

  deletePassport(passportId) {
    this.httpService.deletePassport(passportId).subscribe(
      data => {
        this.load();
      },
      error => {
        console.log(error);
      }
    );
  }

}
