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
var router_2 = require('@angular/router');
var Person_1 = require('./Person');
var get_service_1 = require('../Services/get.service');
require('rxjs/add/operator/switchMap');
var RosterComponent = (function () {
    function RosterComponent(getService, route, router) {
        this.getService = getService;
        this.route = route;
        this.router = router;
        this.people = new Array();
    }
    RosterComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params
            .switchMap(function (params) {
            _this.cCode = params["cCode"];
            return _this.getService.getCourseName(params["cCode"]);
        })
            .subscribe(function (response) {
            var body = response.json()[0];
            var loggedIn = sessionStorage.getItem("loggedIn");
            if (!body.name || !loggedIn)
                _this.router.navigateByUrl("/dashboard");
            else {
                _this.name = body.name;
                _this.authorize();
            }
        });
    };
    RosterComponent.prototype.authorize = function () {
        var userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
        if (userInfo.studentOrProf == "Student")
            this.authorizeStudent();
        else
            this.authorizeProf();
    };
    RosterComponent.prototype.authorizeStudent = function () {
        var _this = this;
        this.getService.getCourseStaff(this.cCode)
            .then(function (response) {
            var userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
            var r = response.json();
            console.log(userInfo);
            r.some(function (person, index, array) {
                if (person.semail == userInfo.Email) {
                    this.initPeople();
                    return true;
                }
                else if (index == array.length - 1)
                    this.router.navigateByUrl("/dashboard");
            }, _this);
        });
    };
    RosterComponent.prototype.authorizeProf = function () {
        var _this = this;
        this.getService.getCourseProf(this.cCode)
            .then(function (response) {
            var userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
            var r = response.json()[0];
            if (r.getcourseprof == userInfo.Email)
                _this.initPeople();
            else
                _this.router.navigateByUrl("/dashboard");
        });
    };
    RosterComponent.prototype.initPeople = function () {
        var _this = this;
        this.getService.getSignedUp(this.cCode)
            .then(function (response) {
            var body = response.json();
            body.forEach(function (person) {
                this.getStudent(person.semail);
            }, _this);
        });
    };
    RosterComponent.prototype.getStudent = function (email) {
        var userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
        this.people.push(new Person_1.Person(this.getService, email, userInfo.studentRank));
    };
    RosterComponent = __decorate([
        core_1.Component({
            selector: 'profile',
            providers: [get_service_1.GetService],
            templateUrl: 'Templates/roster.html'
        }), 
        __metadata('design:paramtypes', [get_service_1.GetService, router_1.ActivatedRoute, router_2.Router])
    ], RosterComponent);
    return RosterComponent;
}());
exports.RosterComponent = RosterComponent;
//# sourceMappingURL=roster.component.js.map