import { Component, OnInit }  from  '@angular/core';

import { GetService        }  from  '../Services/get.service';
import { PersonComponent   }  from  './person.component';

@Component({
  selector: 'dashboard',
  providers: [ GetService ],
  templateUrl: 'Templates/dashboard.html'
})

export class DashboardComponent implements OnInit {

  email: string;

  constructor(private getService: GetService) {
    this.email = JSON.parse(sessionStorage.getItem("userInfo")).Email;
  }

  ngOnInit(): void {  }

}
