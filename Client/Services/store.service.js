"use strict";
var http_1 = require('@angular/http');
var http_2 = require('@angular/http');
require('rxjs/add/operator/toPromise');
var StoreService = (function () {
    function StoreService(http) {
        this.http = http;
        this.storeStud = '/storeStudent';
        this.storeProf = '/storeProfessor';
        this.storeSec = '/storeSecurityQuestion';
        this.storeOH = '/storeOfficeHours';
        this.storeCTaken = '/storeCoursesTaken';
        this.storeE = '/storeEnrolled';
        this.storeCTimes = '/storeCourseTimes';
        this.storeC = '/storeCourse';
        this.storeS = '/storeSkills';
        this.rStudent = '/registerStudent';
        this.rStaff = '/registerStaff';
    }
    StoreService.prototype.makePost = function (url, json, callback) {
        var headers = new http_1.Headers({ "Content-Type": "application/json" });
        var options = new http_2.RequestOptions({ headers: headers });
        return this.http.post(url, json, options)
            .toPromise()
            .then(function (response) { return callback(response.json()); })
            .catch(this.handleError);
    };
    StoreService.prototype.handleError = function (error) {
        console.error("An error has occurred retrieving results");
        console.error(error);
        return Promise.reject(error.message || error);
    };
    StoreService.prototype.logCallback = function (response) {
        console.log("Inside Callback");
        console.log(response.json());
    };
    StoreService.prototype.storeStudent = function (json) {
        return this.makePost(this.storeStud, json, this.logCallback);
    };
    StoreService.prototype.storeProfessor = function (json) {
        return this.makePost(this.storeProf, json, this.logCallback);
    };
    StoreService.prototype.storeSecurityQuestion = function (json) {
        return this.makePost(this.storeSec, json, this.logCallback);
    };
    StoreService.prototype.storeOfficeHours = function (json) {
        return this.makePost(this.storeOH, json, this.logCallback);
    };
    StoreService.prototype.storeCoursesTaken = function (json) {
        return this.makePost(this.storeCTaken, json, this.logCallback);
    };
    StoreService.prototype.storeEnrolled = function (json) {
        return this.makePost(this.storeE, json, this.logCallback);
    };
    StoreService.prototype.storeCourseTimes = function (json) {
        return this.makePost(this.storeCTimes, json, this.logCallback);
    };
    StoreService.prototype.storeCourse = function (json) {
        return this.makePost(this.storeC, json, this.logCallback);
    };
    StoreService.prototype.storeSkills = function (json) {
        return this.makePost(this.storeS, json, this.logCallback);
    };
    StoreService.prototype.registerStudent = function (json) {
        return this.makePost(this.rStudent, json, this.logCallback);
    };
    StoreService.prototype.registerStaff = function (json) {
        return this.makePost(this.rStaff, json, this.logCallback);
    };
    return StoreService;
}());
exports.StoreService = StoreService;
//# sourceMappingURL=store.service.js.map