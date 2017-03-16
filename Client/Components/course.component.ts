import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router, Params } from '@angular/router';

import { GetService } from '../Services/get.service';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'profile',
  providers: [ GetService ],
  templateUrl: 'Templates/course.html'
})

export class CourseComponent implements OnInit {
  cCode: string;

  constructor(
    private getService: GetService,
    private route: ActivatedRoute,
    private router: Router
  ) {  }

  ngOnInit(): void {
    this.route.params
    .switchMap((params: Params) => this.getService
               .getStudentOrProf(params["cCode"]))
               .subscribe(response => {
                 let body = response.json();
                 var loggedIn = sessionStorage.getItem("loggedIn");
                 if(!body.cCode || !loggedIn)
                   this.router.navigateByUrl("/dashboard")
                 else 
                   this.cCode = body.cCode;
               });
  }
}
