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
var login_service_1 = require('../Services/login.service');
var AppComponent = (function () {
    function AppComponent(loginService, router) {
        this.loginService = loginService;
        this.router = router;
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.loginService.loginFlag$.subscribe(function (message) {
            if (message == "login")
                _this.makeLogin();
            else
                _this.makeLogout();
        });
        if (sessionStorage.getItem("loggedIn"))
            this.makeLogin();
        else
            this.makeLogout();
    };
    AppComponent.prototype.makeLogin = function () {
        this.login = 'Logout';
        this.link = '/dashboard';
    };
    AppComponent.prototype.makeLogout = function () {
        this.login = 'Login';
        this.link = '/login';
        sessionStorage.clear();
        this.router.navigateByUrl('/home');
    };
    AppComponent.prototype.handleClick = function () {
        if (this.login == "Logout")
            this.makeLogout();
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app',
            providers: [login_service_1.LoginService],
            templateUrl: 'Templates/app.html'
        }), 
        __metadata('design:paramtypes', [login_service_1.LoginService, router_1.Router])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map