import { Course     } from './Course';
import { CourseTime } from './CourseTime';
import { Person     } from './Person';

import { GetService } from '../Services/get.service';


export class Course {
  cCode: string;
  oh: CourseTime[];
  prof: Person;
  staff: Person[];

  constructor(private getService: GetService, cCode: string){
    this.cCode = cCode;
    this.initCourse();
  }

  initCourse(): void {
    this.getService.getCourseOfficeHours(this.cCode)
      .then(response => this.oh = response);
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
