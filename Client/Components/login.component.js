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
var login_service_1 = require('../Services/login.service');
var LoginComponent = (function () {
    function LoginComponent(loginService) {
        this.loginService = loginService;
    } // Inject Get Service
    LoginComponent.prototype.ngOnInit = function () {
        this.buttonClass = "btn-info";
    };
    LoginComponent.prototype.login = function () {
        this.loginService.login(this.email, this.pwd, this);
    };
    LoginComponent.prototype.emailEvent = function (event) {
        this.email = event.target.value;
    };
    LoginComponent.prototype.pwdEvent = function (event) {
        this.pwd = event.target.value;
    };
    LoginComponent.prototype.loginFailed = function () {
        var form = document.getElementById("login");
        var activeElement = document.activeElement;
        activeElement.blur();
        form.reset();
        this.buttonClass = "btn-danger";
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'login',
            templateUrl: 'Templates/login.html',
        }), 
        __metadata('design:paramtypes', [login_service_1.LoginService])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map