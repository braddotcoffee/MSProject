import { Injectable     }  from  '@angular/core';
import { Headers, Http  }  from  '@angular/http';
import { RequestOptions }  from  '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class GetService {
  coursesTaken = '/coursesTaken';
  cOfficeHours = '/courseOfficeHours';
  sOfficeHours = '/staffOfficeHours';
  enrolled     = '/currentlyEnrolled';
  times        = '/courseTimes';
  sInCourse    = '/studentsInCourse';
  uLogin        = '/login';

  constructor(private http: Http) {  }

  private makePost(url: string, json: Object, 
                   callback: Function): Promise<string>{
    let headers = new Headers({"Content-Type": "application/json"});
    let options = new RequestOptions({headers: headers});
    
    return this.http.post(url, json, options)
            .toPromise()
            .then(response => callback(response))
            .catch(this.handleError);
  }

  private handleError(error: any): Promise<any>{
    console.error("An error has occurred retrieving results")
    console.error(error);
    return Promise.reject(error.message || error);
  }

  private logCallback(response: string): void{
    console.log("Inside Callback")
    console.log(response)
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

  login(Email: string, Password: string): Promise<string>{
    var json = {"Email":Email, "Password":Password};

    return this.makePost(this.uLogin, json, this.logCallback);
  }

}
