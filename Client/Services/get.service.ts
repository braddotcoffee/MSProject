import { Injectable     }  from  '@angular/core';
import { Router         }  from  '@angular/router';
import { Headers, Http  }  from  '@angular/http';
import { RequestOptions }  from  '@angular/http';
import { Response       }  from  '@angular/http';

import { Course         }  from  '../Components/Course';
import { CourseTime     }  from  '../Components/CourseTime';
import { Person         }  from  '../Components/Person';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class GetService {
  coursesTaken = '/coursesTaken';
  cOfficeHours = '/courseOfficeHours';
  sOfficeHours = '/staffOfficeHours';
  enrolled     = '/currentlyEnrolled';
  times        = '/courseTimes';
  sInCourse    = '/studentsInCourse';
  student      = '/getStudent';
  professor    = '/getProfessor';
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

  private courseCallback(response: Response): Course[]{
    let body = response.json() as Course[];
    return body;
  }

  private personCallback(response: Response): Person {
    let body = response.json() as Person;
    return body;
  }

  private responseCallback(response: Response): Response {
    return response;
  }

  getCoursesTaken(Email: string): Promise<Course[]>{
    var json = {"Email": Email};

    return this.makePost(this.coursesTaken, json, this.courseCallback);
  }

  getCourseOfficeHours(Name: string): Promise<string>{
    var json = {"Name":Name};

    return this.makePost(this.cOfficeHours, json, this.logCallback);
  }

  getStaffOfficeHours(Email: string): Promise<CourseTime[]>{
    var json = {"Email": Email};

    return this.makePost(this.sOfficeHours, json, this.courseTimeCallback);
  }

  getCurrentlyEnrolled(Email: string): Promise<Course[]>{
    var json = {"Email": Email};

    return this.makePost(this.enrolled, json, this.courseCallback);
  }

  getCourseTimes(Email: string): Promise<CourseTime[]>{
    var json = {"Email": Email};

    return this.makePost(this.times, json, this.courseTimeCallback);
  }

  getStudentsInCourse(Name: string): Promise<string>{
    var json = {"Name":Name};

    return this.makePost(this.student, json, this.logCallback);
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
