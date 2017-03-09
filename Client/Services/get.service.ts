import { Injectable     }  from  '@angular/core';
import { Router         }  from  '@angular/router';
import { Headers, Http  }  from  '@angular/http';
import { RequestOptions }  from  '@angular/http';
import { Response       }  from  '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class GetService {
  coursesTaken = '/coursesTaken';
  cOfficeHours = '/courseOfficeHours';
  sOfficeHours = '/staffOfficeHours';
  enrolled     = '/currentlyEnrolled';
  times        = '/courseTimes';
  sInCourse    = '/studentsInCourse';

  constructor(private http: Http, private router: Router) {  }

  private makePost(url: string, json: Object, 
                   callback: Function): Promise<string>{
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
    let body = response.json()
    console.log(body)
  }

  getCoursesTaken(Email: string): Promise<string>{
    var json = {"Email": Email};

    return this.makePost(this.coursesTaken, json, this.logCallback);
  }

  getCourseOfficeHours(Name: string): Promise<string>{
    var json = {"Name":Name};

    return this.makePost(this.cOfficeHours, json, this.logCallback);
  }

  getStaffOfficeHours(Email: string): Promise<string>{
    var json = {"Email": Email};

    return this.makePost(this.sOfficeHours, json, this.logCallback);
  }

  getCurrentlyEnrolled(Email: string): Promise<string>{
    var json = {"Email": Email};

    return this.makePost(this.enrolled, json, this.logCallback);
  }

  getCourseTimes(Email: string): Promise<string>{
    var json = {"Email": Email};

    return this.makePost(this.times, json, this.logCallback);
  }

  getStudentsInCourse(Name: string): Promise<string>{
    var json = {"Name":Name};

    return this.makePost(this.sInCourse, json, this.logCallback);
  }

}