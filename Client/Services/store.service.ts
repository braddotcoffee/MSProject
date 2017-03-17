import { Injectable     }  from  '@angular/core';
import { Headers, Http  }  from  '@angular/http';
import { RequestOptions }  from  '@angular/http';
import { Response       }  from  '@angular/http';


import  'rxjs/add/operator/toPromise';

export class StoreService {
  storeStud    = '/storeStudent';
  storeProf    = '/storeProfessor';
  storeSec     = '/storeSecurityQuestion';
  storeOH      = '/storeOfficeHours';
  storeCTaken  = '/storeCoursesTaken';
  storeE       = '/storeEnrolled';
  storeCTimes  = '/storeCourseTimes';
  storeC       = '/storeCourse';
  storeS       = '/storeSkills';
  rStudent     = '/registerStudent';
  rStaff       = '/registerStaff';

  buttonClass: string;

  constructor(private http: Http) {  }

  private makePost(url: string, json: Object, 
                   callback: Function): Promise<Object>{
    let headers = new Headers({"Content-Type": "application/json"});
    let options = new RequestOptions({headers: headers});
    
    return this.http.post(url, json, options)
            .toPromise()
            .then(response => callback(response.json()))
            .catch(this.handleError);
  }

  private handleError(error: any): Promise<any>{
    console.error("An error has occurred retrieving results")
    console.error(error);
    return Promise.reject(error.message || error);
  }

  private logCallback(response: Response): void{
    console.log("Inside Callback")
    console.log(response.json())
  }

  storeStudent(json: Object): Promise<Response>{
    return this.makePost(this.storeStud, json, this.logCallback);
  }

  storeProfessor(json: Object): Promise<Response>{
    return this.makePost(this.storeProf, json, this.logCallback);
  }

  storeSecurityQuestion(json: Object): Promise<Response>{
    return this.makePost(this.storeSec, json, this.logCallback);
  }

  storeOfficeHours(json: Object): Promise<Response>{
    return this.makePost(this.storeOH, json, this.logCallback);
  }

  storeCoursesTaken(json: Object): Promise<Response>{
    return this.makePost(this.storeCTaken, json, this.logCallback);
  }

  storeEnrolled(json: Object): Promise<Response>{
    return this.makePost(this.storeE, json, this.logCallback);
  }

  storeCourseTimes(json: Object): Promise<Response>{
    return this.makePost(this.storeCTimes, json, this.logCallback);
  }

  storeCourse(json: Object): Promise<Response>{
    return this.makePost(this.storeC, json, this.logCallback);
  }

  storeSkills(json: Object): Promise<Response>{
    return this.makePost(this.storeS, json, this.logCallback);
  }

  registerStudent(json: Object): Promise<Response>{
    return this.makePost(this.rStudent, json, this.logCallback);
  }

  registerStaff(json: Object): Promise<Response>{
    return this.makePost(this.rStaff, json, this.logCallback);
  }

}
