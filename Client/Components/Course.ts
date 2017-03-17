import { CourseTime } from './CourseTime';
import { Person     } from './Person';

import { GetService } from '../Services/get.service';


export class Course {
  cCode: string;
  name: string;
  oh: CourseTime[];
  prof: Person;
  staff: Person[];

  constructor(private getService: GetService, cCode: string, name: string){
    this.cCode = cCode;
    this.name  = name;
    this.staff = new Array<Person>();
    this.initCourse();
  }

  initCourse(): void {
    this.getService.getCourseOH(this.cCode)
      .then(response => this.oh = response);
    this.getService.getCourseProf(this.cCode)
      .then(response => {
        let body = response.json()[0];
        this.getProfessor(body.getcourseprof);
      });
    this.getService.getCourseStaff(this.cCode)
    .then(response => {
      let body = response.json();
      body.forEach(function(person:any){
        this.getStudent(person.semail);
      }, this);
    });
  }

  getProfessor(email: string): void {
    let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
    this.prof = new Person(this.getService, email, 
                           userInfo.studentRank);
  }

  getStudent(email: string): void {
    let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
    this.staff.push(new Person (this.getService, email, userInfo.studentRank))
  }

}
