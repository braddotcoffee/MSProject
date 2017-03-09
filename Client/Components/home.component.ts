import { Component, OnInit }  from  '@angular/core';
import { Router            }  from  '@angular/router';

@Component({
  selector: 'home',
  templateUrl: 'Templates/home.html'
})

export class HomeComponent implements OnInit {

  constructor(private router: Router) {  }

  ngOnInit(): void {
    if(sessionStorage.getItem("loggedIn"))
      this.router.navigateByUrl('/dashboard');
  }

}
