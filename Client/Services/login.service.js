"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var http_1 = require('@angular/http');
var http_2 = require('@angular/http');
var Subject_1 = require('rxjs/Subject');
require('rxjs/add/operator/toPromise');
var LoginService = (function () {
    function LoginService(http, router) {
        this.http = http;
        this.router = router;
        this.uLogin = '/loginCred';
        this.loginMessage = new Subject_1.Subject();
        this.loginFlag$ = this.loginMessage.asObservable();
    }
    LoginService.prototype.makePost = function (url, json, callback, lc) {
        var _this = this;
        var headers = new http_1.Headers({ "Content-Type": "application/json" });
        var options = new http_2.RequestOptions({ headers: headers });
        return this.http.post(url, json, options)
            .toPromise()
            .then(function (response) { return callback(response, _this, lc); })
            .catch(this.handleError);
    };
    LoginService.prototype.handleError = function (error) {
        console.error("An error has occurred retrieving results");
        console.error(error);
        return Promise.reject(error.message || error);
    };
    LoginService.prototype.loginCallback = function (response, s, lc) {
        var body = response.json();
        if (body.result) {
            sessionStorage.setItem("loggedIn", "true");
            sessionStorage.setItem("userInfo", JSON.stringify(body));
            s.announceLogin("login");
            s.goToDashBoard();
        }
        else
            lc.loginFailed();
    };
    LoginService.prototype.login = function (Email, Password, lc) {
        var json = { "Email": Email, "Password": Password };
        return this.makePost(this.uLogin, json, this.loginCallback, lc);
    };
    LoginService.prototype.announceLogin = function (message) {
        this.loginMessage.next(message);
    };
    LoginService.prototype.goToDashBoard = function () {
        this.router.navigateByUrl('/dashboard');
    };
    LoginService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, router_1.Router])
    ], LoginService);
    return LoginService;
}());
exports.LoginService = LoginService;
//# sourceMappingURL=login.service.js.map