import { Component, OnInit     }  from  '@angular/core';
import { Router                }  from  '@angular/router';

import { LoginService          }  from  '../Services/login.service';

@Component({
  selector: 'app',
  providers: [LoginService],
  templateUrl: 'Templates/app.html'
})

export class AppComponent implements OnInit {
  login: string;
  link: string;

  constructor(private loginService: LoginService, private router: Router) {  }

  ngOnInit(){
    this.loginService.loginFlag$.subscribe(
      message => {
        if(message == "login")
          this.makeLogin();
        else
          this.makeLogout();
      });

    if(sessionStorage.getItem("loggedIn"))
      this.makeLogin();
    else 
      this.makeLogout();
  } 

  makeLogin(){
    this.login = 'Logout';
    this.link = '/dashboard';
  }

  makeLogout(){
    this.login = 'Login';
    this.link = '/login';

    sessionStorage.clear();

    this.router.navigateByUrl('/home');
  }

  handleClick(): void {
    if(this.login == "Logout")
      this.makeLogout();
  }
}
