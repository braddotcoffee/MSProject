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
    console.log("Inside Callback")
    let body = response.json();
    console.log(body);
  }

  private courseTimeCallback(response: Response): CourseTime[] {
    console.log("Inside CT Callback");
    let body = response.json() as CourseTime[];
    console.log(body);
    return body;
  }

  private courseCallback(response: Response): Course[]{
    console.log("Inside Course Callback");
    let body = response.json() as Course[];
    console.log(body);
    return body;
  }

  private personCallback(response: Response): Person {
    console.log("Inside Person Callback");
    let body = response.json() as Person;
    console.log(body);
    return body;
  }

  getCoursesTaken(Email: string): Promise<Course[]>{
    var json = {"Email": Email};

    return this.makePost(this.coursesTaken, json, this.courseCallback);
  }

  getCourseOfficeHours(Name: string): Promise<string>{
    var json = {"Name":Name};

    return this.makePost(this.cOfficeHours, json, this.logCallback);
  }

  getStaffOfficeHours(Email: string): Promise<string>{
    var json = {"Email": Email};

    return this.makePost(this.sOfficeHours, json, this.logCallback);
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

  getStudent(Email: string): Promise<Person>{
    var json = {"Email":Email};

    return this.makePost(this.professor, json, this.personCallback);
  }

}
