import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Data } from '../service/data';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email = '';
  password = '';

  constructor(private dataService: Data, private router: Router) {}

  login() {
    if(this.email && this.password) {
      this.dataService.login();
      this.router.navigate(['/profilo']);
    }
  }

  back() { this.router.navigate(['/home']); }
}

