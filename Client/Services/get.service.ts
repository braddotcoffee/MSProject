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
  login        = '/login';

  constructor(private http: Http) {  }

  private makePost(url: String, json: Object, 
                   callback: Function): Promise<String>{
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

  private logCallback(response: String): void{
    console.log("Inside Callback")
    console.log(response)
  }

  getCoursesTaken(Email: String): Promise<String>{
    var json = {"Email": Email};

    return this.makePost(coursesTaken, json, logCallback);
  }

  getCourseOfficeHours(Name: String): Promise<String>{
    var json = {"Name":Name};

    return this.makePost(cOfficeHours, json, logCallback);
  }

  getStaffOfficeHours(Email: String): Promise<String>{
    var json = {"Email": Email};

    return this.makePost(sOfficeHours, json, logCallback);
  }

  getCurrentlyEnrolled(Email: String): Promise<String>{
    var json = {"Email": Email};

    return this.makePost(enrolled, json, logCallback);
  }

  getCourseTimes(Email: String): Promise<String>{
    var json = {"Email": Email};

    return this.makePost(times, json, logCallback);
  }

  getStudentsInCourse(Name: String): Promise<String>{
    var json = {"Name":Name};

    return this.makePost(sInCourse, json, logCallback);
  }

  login(Email: String, Password: String): Promise<String>{
    var json = {"Email":Email, "Password":Password};

    return this.makePost(login, json, logCallback);
  }

}
