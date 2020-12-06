import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../authentication/authentication.service';

function passwordMatcher(pwGrp: FormGroup): { [s: string]: boolean } | null {
  return pwGrp.controls.password.value ===
      pwGrp.controls.confirmPassword.value ? null : {mismatch: true};
}


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  message: string;
  signupForm = this.builder.group({
    username: ['', Validators.required],
    pwGroup: this.builder.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, { validator: passwordMatcher })
  });

  get username(): AbstractControl {return this.signupForm.get('username'); }
  get password(): AbstractControl {return this.signupForm.get('pwGroup').get('password'); }
  get confirmPassword(): AbstractControl {return this.signupForm.get('pwGroup').get('confirmPassword'); }
  get pwGroup(): AbstractControl {return this.signupForm.get('pwGroup'); }

  constructor(private builder: FormBuilder,
              private authService: AuthenticationService) { }

  ngOnInit(): void {
  }

  register(): void {
    this.authService.register(this.username.value, this.password.value).subscribe(
      data => {
        this.message = data.message;
        setTimeout(() => {
          this.message = '';
          this.signupForm.reset();
        }, 3000);
      },
      error => {
        this.message = 'Registration ' + error.error.message;
        setTimeout(() => {
          this.message = '';
          this.signupForm.reset();
        }, 3000);
      }
    );
  }
}

