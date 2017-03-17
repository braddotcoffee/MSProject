import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router, Params } from '@angular/router';

import { Course     } from './Course';
import { GetService } from '../Services/get.service';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'profile',
  providers: [ GetService ],
  templateUrl: 'Templates/course.html'
})

export class CourseComponent implements OnInit {
  cCode: string;
  course: Course;

  constructor(
    private getService: GetService,
    private route: ActivatedRoute,
    private router: Router
  ) {  }

  ngOnInit(): void {
    this.route.params
    .switchMap((params: Params) => {
      this.cCode = params["cCode"];
      return this.getService.getCourseName(params["cCode"])
    })
      .subscribe(response => {
        let body = response.json()[0];
        var loggedIn = sessionStorage.getItem("loggedIn");
        if(!body.name || !loggedIn)
          this.router.navigateByUrl("/dashboard")
        else {
          this.course = new Course(this.getService, 
                                   this.cCode, body.name);
        }
      });
  }
}
