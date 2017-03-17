import { Injectable     }  from  '@angular/core';
import { Router         }  from  '@angular/router';
import { Headers, Http  }  from  '@angular/http';
import { RequestOptions }  from  '@angular/http';
import { Response       }  from  '@angular/http';

import { CourseOverview }  from  '../Components/CourseOverview';
import { CourseTime     }  from  '../Components/CourseTime';
import { Person         }  from  '../Components/Person';
import { Skill          }  from  '../Components/Skill';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class GetService {
  coursesTaken = '/coursesTaken';
  sOfficeHours = '/staffOfficeHours';
  enrolled     = '/currentlyEnrolled';
  times        = '/courseTimes';
  sInCourse    = '/studentsInCourse';
  skills       = '/skills';
  student      = '/getStudent';
  courseOH     = '/getCourseOH';
  professor    = '/getProfessor';
  cProf        = '/getCourseProf';
  cStaff       = '/getCourseStaff';
  cName        = '/getCourseName';
  sUp          = '/getSignedUp';
  sOrP         = '/studentOrProf';

  constructor(private http: Http, private router: Router) {  }

  private makePost(url: string, json: Object, 
                   callback: Function): Promise<Object>{
    let headers = new Headers({"Content-Type": "application/json"});
    let options = new RequestOptions({headers: headers});

    return this.http.post(url, json, options)
            .toPromise()
            .then(response => callback(response, this))
            .catch(this.handleError);
  }

  private handleError(error: any): Promise<any>{
    console.error("An error has occurred retrieving results")
    console.error(error);
    return Promise.reject(error.message || error);
  }

  private logCallback(response: Response): void{
    let body = response.json();
  }

  private courseTimeCallback(response: Response): CourseTime[] {
    let body = response.json() as CourseTime[];
    return body;
  }

  private courseCallback(response: Response): CourseOverview[]{
    let body = response.json() as CourseOverview[];
    return body;
  }

  private personCallback(response: Response): Person {
    let body = response.json() as Person;
    return body;
  }

  private skillsCallback(response: Response): Skill[] {
    let body = response.json() as Skill[];
    return body;
  }

  private responseCallback(response: Response): Response {
    return response;
  }

  getCoursesTaken(Email: string): Promise<CourseOverview[]>{
    var json = {"Email": Email};

    return this.makePost(this.coursesTaken, json, this.courseCallback);
  }

   getStaffOfficeHours(Email: string): Promise<CourseTime[]>{
    var json = {"Email": Email};

    return this.makePost(this.sOfficeHours, json, this.courseTimeCallback);
  }

  getCurrentlyEnrolled(Email: string): Promise<CourseOverview[]>{
    var json = {"Email": Email};

    return this.makePost(this.enrolled, json, this.courseCallback);
  }

  getCourseTimes(Email: string): Promise<CourseTime[]>{
    var json = {"Email": Email};

    return this.makePost(this.times, json, this.courseTimeCallback);
  }

  getSkills(Email: string): Promise<Skill[]>{
    var json = {"Email": Email};

    return this.makePost(this.skills, json, this.skillsCallback)
  }

  getCourseOH(cCode: string): Promise<CourseTime[]>{
    var json = {"cCode": cCode};

    return this.makePost(this.courseOH, json, this.courseTimeCallback);
  }

  getCourseProf(cCode: string): Promise<Response>{
    var json = {"cCode": cCode};

    return this.makePost(this.cProf, json, this.responseCallback);
  }

  getCourseStaff(cCode: string): Promise<Response>{
    var json = {"cCode": cCode};

    return this.makePost(this.cStaff, json, this.responseCallback);
  }

  getCourseName(cCode: string): Promise<Response>{
    var json = {"cCode": cCode};

    return this.makePost(this.cName, json, this.responseCallback);
  }

  getSignedUp(cCode: string): Promise<Response>{
    var json = {"cCode": cCode};

    return this.makePost(this.sUp, json, this.responseCallback);
  }

  getStudentsInCourse(Name: string): Promise<Response>{
    var json = {"Name":Name};

    return this.makePost(this.student, json, this.responseCallback);
  }

  getStudent(Email: string): Promise<Response>{
    var json = {"Email":Email};

    return this.makePost(this.student, json, this.responseCallback);
  }

  getProfessor(Email: string): Promise<Response> {
    var json = {"Email": Email};

    return this.makePost(this.professor, json, this.responseCallback);
  }

  getStudentOrProf(Email: string): Promise<Response>{
    var json = {"Email":Email}

    return this.makePost(this.sOrP, json, this.responseCallback);
  }

}
