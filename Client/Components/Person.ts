import { CourseOverview }  from  './CourseOverview.ts';
import { CourseTime     }  from  './CourseTime';

import { GetService     }  from  '../Services/get.service';


export class Person {
  email: string;
  firstName: string;
  lastName: string;
  major: string;
  office: string;
  userType: string;
  viewerRank: number;
  rank: number;
  image: string;
  ct: CourseTime[];
  oh: CourseTime[];
  cTaken: CourseOverview[];
  enrolled: CourseOverview[];

  constructor(private getService: GetService, email: string, rank: number){
    this.email = email;
    this.viewerRank = rank;
    console.log("Init Person");
    this.initPerson();
  }

  initPerson(): void {
    this.getService.getStudentOrProf(this.email)
      .then(response => {
        let userInfo = response.json();
        this.userType = userInfo.studentOrProf;
        this.rank = userInfo.studentRank;

        if(this.userType == "Student")
          this.initStudent();
        else
          this.initProfessor();
      });
  }

  initStudent(): void {
    this.getStudent();
    this.getCoursesTaken();

    if(this.viewerRank > 0){
      this.getEnrolled();
      this.getCourseTimes();
    }

    if(this.rank  >= 1)
      this.getOfficeHours();
  }

  initProfessor(): void {
    this.getProfessor();
    this.getOfficeHours();
  }

  getStudent(): void {
    this.getService.getStudent(this.email)
    .then(response => {
      let userInfo = response.json()[0];
      this.firstName = userInfo.firstname;
      this.lastName = userInfo.lastname;
      this.major = userInfo.major;
      this.image = userInfo.image;
    })
  }

  getProfessor(): void {
    this.getService.getProfessor(this.email)
    .then(response => {
      let userInfo = response.json()[0];
      this.firstName = userInfo.firstname;
      this.lastName = userInfo.lastname;
      this.office = userInfo.office;
      this.image = userInfo.image;
    });
  }

  getCourseTimes(): void {
    this.getService.getCourseTimes(this.email)
      .then(times => {
        this.ct = times;
      });
  }

  getEnrolled(): void {
    this.getService.getCurrentlyEnrolled(this.email)
      .then(c => this.enrolled = c);
  }

  getCoursesTaken(): void{
    this.getService.getCoursesTaken(this.email)
      .then(c => this.cTaken = c);
  }

  getOfficeHours(): void{
    this.getService.getStaffOfficeHours(this.email)
    .then(c => this.oh = c);
  }

  
}
