import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router, Params } from '@angular/router';

import { Person     } from './Person'
import { GetService } from '../Services/get.service';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'profile',
  providers: [ GetService ],
  templateUrl: 'Templates/roster.html'
})

export class RosterComponent implements OnInit {
  cCode: string;
  name: string;
  people: Person[];

  constructor(
    private getService: GetService,
    private route: ActivatedRoute,
    private router: Router
  ) {  
    this.people = new Array<Person>();
  }

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
          this.name = body.name;
          this.authorize();
        }
      });
  }

  authorize(): void {
    let userInfo = JSON.parse(sessionStorage.getItem("userInfo"))
    if(userInfo.studentOrProf == "Student")
      this.authorizeStudent();
    else
      this.authorizeProf();
  }

  authorizeStudent(): void {
    this.getService.getCourseStaff(this.cCode)
    .then(response => {
      let userInfo = JSON.parse(sessionStorage.getItem("userInfo"))
      let r = response.json();
      console.log(userInfo)
      r.some(function(person:any, index:number, array:any){
        if(person.semail == userInfo.Email){
          this.initPeople();
          return true;
        }
        else if(index == array.length - 1)
          this.router.navigateByUrl("/dashboard")
      }, this)
    })
  }

  authorizeProf(): void {
    this.getService.getCourseProf(this.cCode)
    .then(response => {
      let userInfo = JSON.parse(sessionStorage.getItem("userInfo"))
      let r = response.json()[0];
      if(r.getcourseprof == userInfo.Email)
        this.initPeople();
      else
          this.router.navigateByUrl("/dashboard")
    })
  }

  initPeople(): void {
    this.getService.getSignedUp(this.cCode)
    .then(response => {
      let body = response.json();
      body.forEach(function(person: any){
        this.getStudent(person.semail);
      }, this)
    })
  }

  getStudent(email: string): void {
    let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
    this.people.push(new Person (this.getService, email, userInfo.studentRank))
  }

}
