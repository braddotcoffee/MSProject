import { Injectable     }  from  '@angular/core';
import { Router         }  from  '@angular/router';
import { Headers, Http  }  from  '@angular/http';
import { RequestOptions }  from  '@angular/http';
import { Response       }  from  '@angular/http';
import { Subject        }  from  'rxjs/Subject';

import { LoginComponent }  from  '../Components/login.component';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class LoginService {
  uLogin = '/loginCred';

  private loginMessage = new Subject<string>();
  loginFlag$ = this.loginMessage.asObservable();

  constructor(private http: Http, private router: Router) {  }

  private makePost(url: string, json: Object, 
                   callback: Function, lc: LoginComponent): Promise<string>{
    let headers = new Headers({"Content-Type": "application/json"});
    let options = new RequestOptions({headers: headers});
    
    return this.http.post(url, json, options)
            .toPromise()
            .then(response => callback(response, this, lc))
            .catch(this.handleError);
  }

  private handleError(error: any): Promise<any>{
    console.error("An error has occurred retrieving results")
    console.error(error);
    return Promise.reject(error.message || error);
  }


  private loginCallback(response: Response, s:LoginService, lc:LoginComponent){
    let body = response.json();

    if(body.result) {
      sessionStorage.setItem("loggedIn", "true");
      sessionStorage.setItem("userInfo", JSON.stringify(body));
      s.announceLogin("login");
      s.goToDashBoard();
    }
    else
      lc.loginFailed();
  }

  login(Email: string, Password: string, lc: LoginComponent): Promise<string>{
    var json = {"Email":Email, "Password":Password};

    return this.makePost(this.uLogin, json, this.loginCallback, lc);
  }

  announceLogin(message: string){
    this.loginMessage.next(message);
  }

  goToDashBoard():void{
    this.router.navigateByUrl('/dashboard');
  }

}
