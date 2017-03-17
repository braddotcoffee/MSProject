import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router, Params } from '@angular/router';

import { GetService } from '../Services/get.service';
import { Person } from './Person'

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'profile',
  providers: [ GetService ],
  templateUrl: 'Templates/profile.html'
})

export class ProfileComponent implements OnInit {
  email: string;
  rank: number;

  constructor(
    private getService: GetService,
    private route: ActivatedRoute,
    private router: Router
  ) {  }

  ngOnInit(): void {
    this.route.params
    .switchMap((params: Params) => this.getService
               .getStudentOrProf(params["email"]))
               .subscribe(response => {
                 let body = response.json();
                 var loggedIn = sessionStorage.getItem("loggedIn");
                 if(!body.Email || !loggedIn)
                   this.router.navigateByUrl("/dashboard")
                 else{
                   this.email = body.Email;
                   let userInfo = JSON.parse(sessionStorage.getItem("userInfo"))
                   console.log(userInfo);
                   if(userInfo.studentOrProf == "Professor")
                     this.rank = 3;
                   else if(userInfo.Email == this.email)
                     this.rank = 4;
                   else
                     this.rank = userInfo.studentRank;
                   console.log(this.rank);

                 }
               });
  }
}
