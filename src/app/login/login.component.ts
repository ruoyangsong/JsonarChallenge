import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string;
  password: string;

  authenticationFailed = false;
  constructor(private router: Router) { }

  login(): void {
    if ((this.username === 'Test1' && this.password === 'test1@mytest.com') || (this.username === 'Test2' && this.password === 'test2@mytest.com')) {
      this.router.navigate(['customers']);
    } else {
      console.log('auth fauled');
      this.authenticationFailed = true;
    }
  }
}
