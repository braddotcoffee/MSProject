import { Component } from '@angular/core';
import { ElementRef } from '@angular/core';
import { OnInit } from '@angular/core';

import { LoginService } from '../Services/login.service';

@Component({
  selector: 'login',
  templateUrl: 'Templates/login.html',
})

export class LoginComponent implements OnInit {
  email: string;
  pwd: string;
  buttonClass: string;

  constructor(private loginService: LoginService) {  } // Inject Get Service

  ngOnInit(): void{
    this.buttonClass = "btn-info";
  }

  login(): void {
    this.loginService.login(this.email, this.pwd, this);
  }

  emailEvent(event: any){
    this.email = event.target.value;
  }

  pwdEvent(event: any){
    this.pwd = event.target.value;
  }

  loginFailed() {
    var form = document.getElementById("login") as HTMLFormElement;
    var activeElement = document.activeElement as HTMLElement;
    activeElement.blur();
    form.reset();
    this.buttonClass = "btn-danger";
  }
}

