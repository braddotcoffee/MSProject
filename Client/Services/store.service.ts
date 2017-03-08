import { Injectable     }  from  '@angular/core';
import { Headers, Http  }  from  '@angular/http';
import { RequestOptions }  from  '@angular/http';


import  'rxjs/add/operator/toPromise';

export class StoreService {
  storeStudent = '/storeStudent';
  storeProf    = '/storeProfessor';
  storeSec     = '/storeSecurityQuestion';
  storeOH      = '/storeOfficeHours';
  storeCTaken  = '/storeCoursesTaken';
  storeE       = '/storeEnrolled';
  storeCTimes  = '/storeCourseTimes'

  private makePost(url: String, json: Object, 
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

  private logCallback(response: Object): void{
    console.log("Inside Callback")
    console.log(response.statusCode)
  }

  storeStudent(json: Object): Promise<Object>{
    return makePost(storeStudent, json, logCallback);
  }

  storeProfessor(json: Object): Promise<Object>{
    return makePost(storeProf, json, logCallback);
  }

  storeSecurityQuestion(json: Object): Promise<Object>{
    return makePost(storeSec, json, logCallback);
  }

  storeOfficeHours(json: Object): Promise<Object>{
    return makePost(storeOH, json, logCallback);
  }

  storeCoursesTaken(json: Object): Promise<Object>{
    return makePost(storeCTaken, json, logCallback);
  }

  storeEnrolled(json: Object): Promise<Object>{
    return makePost(storeE, json, logCallback);
  }

  storeCourseTimes(json: Object): Promise<Object>{
    return makePost(storeCTimes, json, logCallback);
  }

}
