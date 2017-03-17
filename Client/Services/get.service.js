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
require('rxjs/add/operator/toPromise');
var GetService = (function () {
    function GetService(http, router) {
        this.http = http;
        this.router = router;
        this.coursesTaken = '/coursesTaken';
        this.sOfficeHours = '/staffOfficeHours';
        this.enrolled = '/currentlyEnrolled';
        this.times = '/courseTimes';
        this.sInCourse = '/studentsInCourse';
        this.skills = '/skills';
        this.student = '/getStudent';
        this.courseOH = '/getCourseOH';
        this.professor = '/getProfessor';
        this.cProf = '/getCourseProf';
        this.cStaff = '/getCourseStaff';
        this.cName = '/getCourseName';
        this.sUp = '/getSignedUp';
        this.sOrP = '/studentOrProf';
    }
    GetService.prototype.makePost = function (url, json, callback) {
        var _this = this;
        var headers = new http_1.Headers({ "Content-Type": "application/json" });
        var options = new http_2.RequestOptions({ headers: headers });
        return this.http.post(url, json, options)
            .toPromise()
            .then(function (response) { return callback(response, _this); })
            .catch(this.handleError);
    };
    GetService.prototype.handleError = function (error) {
        console.error("An error has occurred retrieving results");
        console.error(error);
        return Promise.reject(error.message || error);
    };
    GetService.prototype.logCallback = function (response) {
        var body = response.json();
    };
    GetService.prototype.courseTimeCallback = function (response) {
        var body = response.json();
        return body;
    };
    GetService.prototype.courseCallback = function (response) {
        var body = response.json();
        return body;
    };
    GetService.prototype.personCallback = function (response) {
        var body = response.json();
        return body;
    };
    GetService.prototype.skillsCallback = function (response) {
        var body = response.json();
        return body;
    };
    GetService.prototype.responseCallback = function (response) {
        return response;
    };
    GetService.prototype.getCoursesTaken = function (Email) {
        var json = { "Email": Email };
        return this.makePost(this.coursesTaken, json, this.courseCallback);
    };
    GetService.prototype.getStaffOfficeHours = function (Email) {
        var json = { "Email": Email };
        return this.makePost(this.sOfficeHours, json, this.courseTimeCallback);
    };
    GetService.prototype.getCurrentlyEnrolled = function (Email) {
        var json = { "Email": Email };
        return this.makePost(this.enrolled, json, this.courseCallback);
    };
    GetService.prototype.getCourseTimes = function (Email) {
        var json = { "Email": Email };
        return this.makePost(this.times, json, this.courseTimeCallback);
    };
    GetService.prototype.getSkills = function (Email) {
        var json = { "Email": Email };
        return this.makePost(this.skills, json, this.skillsCallback);
    };
    GetService.prototype.getCourseOH = function (cCode) {
        var json = { "cCode": cCode };
        return this.makePost(this.courseOH, json, this.courseTimeCallback);
    };
    GetService.prototype.getCourseProf = function (cCode) {
        var json = { "cCode": cCode };
        return this.makePost(this.cProf, json, this.responseCallback);
    };
    GetService.prototype.getCourseStaff = function (cCode) {
        var json = { "cCode": cCode };
        return this.makePost(this.cStaff, json, this.responseCallback);
    };
    GetService.prototype.getCourseName = function (cCode) {
        var json = { "cCode": cCode };
        return this.makePost(this.cName, json, this.responseCallback);
    };
    GetService.prototype.getSignedUp = function (cCode) {
        var json = { "cCode": cCode };
        return this.makePost(this.sUp, json, this.responseCallback);
    };
    GetService.prototype.getStudentsInCourse = function (Name) {
        var json = { "Name": Name };
        return this.makePost(this.student, json, this.responseCallback);
    };
    GetService.prototype.getStudent = function (Email) {
        var json = { "Email": Email };
        return this.makePost(this.student, json, this.responseCallback);
    };
    GetService.prototype.getProfessor = function (Email) {
        var json = { "Email": Email };
        return this.makePost(this.professor, json, this.responseCallback);
    };
    GetService.prototype.getStudentOrProf = function (Email) {
        var json = { "Email": Email };
        return this.makePost(this.sOrP, json, this.responseCallback);
    };
    GetService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, router_1.Router])
    ], GetService);
    return GetService;
}());
exports.GetService = GetService;
//# sourceMappingURL=get.service.js.map