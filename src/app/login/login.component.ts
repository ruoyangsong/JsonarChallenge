import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {FormControl, Validators} from '@angular/forms';
import {CookieService} from '../cookie.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string;
  password: string;

  authenticationFailed = false;
  constructor(private router: Router, private cookieService: CookieService) { }

  login(): void {
    if ((this.username === 'Test1' && this.password === 'test1@mytest.com') || (this.username === 'Test2' && this.password === 'test2@mytest.com')) {
      this.cookieService.set('authenticated', 'True');
      this.router.navigate(['customers']);
    } else {
      this.authenticationFailed = true;
    }
  }
}
