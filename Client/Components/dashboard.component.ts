import { Component, OnInit }  from  '@angular/core';
import { Router            }  from  '@angular/router'

import { GetService        }  from  '../Services/get.service';
import { PersonComponent   }  from  './person.component';

@Component({
  selector: 'dashboard',
  providers: [ GetService ],
  templateUrl: 'Templates/dashboard.html'
})

export class DashboardComponent implements OnInit {

  email: string;

  constructor(private getService: GetService, private router: Router) {
    var loggedIn = sessionStorage.getItem("loggedIn");
    if(!loggedIn)
      this.router.navigateByUrl('/home');
    else
      this.email = JSON.parse(sessionStorage.getItem("userInfo")).Email;
  }

  ngOnInit(): void {  }

}
