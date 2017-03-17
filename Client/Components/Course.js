"use strict";
var Person_1 = require('./Person');
var Course = (function () {
    function Course(getService, cCode, name) {
        this.getService = getService;
        this.cCode = cCode;
        this.name = name;
        this.staff = new Array();
        this.initCourse();
    }
    Course.prototype.initCourse = function () {
        var _this = this;
        this.getService.getCourseOH(this.cCode)
            .then(function (response) { return _this.oh = response; });
        this.getService.getCourseProf(this.cCode)
            .then(function (response) {
            var body = response.json()[0];
            _this.getProfessor(body.getcourseprof);
        });
        this.getService.getCourseStaff(this.cCode)
            .then(function (response) {
            var body = response.json();
            body.forEach(function (person) {
                this.getStudent(person.semail);
            }, _this);
        });
    };
    Course.prototype.getProfessor = function (email) {
        var userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
        this.prof = new Person_1.Person(this.getService, email, userInfo.studentRank);
    };
    Course.prototype.getStudent = function (email) {
        var userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
        this.staff.push(new Person_1.Person(this.getService, email, userInfo.studentRank));
    };
    return Course;
}());
exports.Course = Course;
//# sourceMappingURL=Course.js.map