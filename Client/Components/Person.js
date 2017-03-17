"use strict";
var Person = (function () {
    function Person(getService, email, rank) {
        this.getService = getService;
        this.email = email;
        this.viewerRank = rank;
        this.initPerson();
    }
    Person.prototype.initPerson = function () {
        var _this = this;
        this.getService.getStudentOrProf(this.email)
            .then(function (response) {
            var userInfo = response.json();
            _this.userType = userInfo.studentOrProf;
            _this.rank = userInfo.studentRank;
            if (_this.userType == "Student")
                _this.initStudent();
            else
                _this.initProfessor();
        });
    };
    Person.prototype.initStudent = function () {
        this.getStudent();
        this.getCoursesTaken();
        this.getSkills();
        if (this.viewerRank > 0) {
            this.getEnrolled();
            this.getCourseTimes();
        }
        if (this.rank >= 1)
            this.getOfficeHours();
    };
    Person.prototype.initProfessor = function () {
        this.getProfessor();
        this.getOfficeHours();
    };
    Person.prototype.getStudent = function () {
        var _this = this;
        this.getService.getStudent(this.email)
            .then(function (response) {
            var userInfo = response.json()[0];
            _this.firstName = userInfo.firstname;
            _this.lastName = userInfo.lastname;
            _this.major = userInfo.major;
            _this.image = userInfo.image;
        });
    };
    Person.prototype.getProfessor = function () {
        var _this = this;
        this.getService.getProfessor(this.email)
            .then(function (response) {
            var userInfo = response.json()[0];
            _this.firstName = userInfo.firstname;
            _this.lastName = userInfo.lastname;
            _this.office = userInfo.office;
            _this.image = userInfo.image;
        });
    };
    Person.prototype.getCourseTimes = function () {
        var _this = this;
        this.getService.getCourseTimes(this.email)
            .then(function (times) {
            _this.ct = times;
        });
    };
    Person.prototype.getEnrolled = function () {
        var _this = this;
        this.getService.getCurrentlyEnrolled(this.email)
            .then(function (c) { return _this.enrolled = c; });
    };
    Person.prototype.getCoursesTaken = function () {
        var _this = this;
        this.getService.getCoursesTaken(this.email)
            .then(function (c) { return _this.cTaken = c; });
    };
    Person.prototype.getSkills = function () {
        var _this = this;
        this.getService.getSkills(this.email)
            .then(function (s) {
            _this.skills = s;
            console.log(_this.skills);
        });
    };
    Person.prototype.getOfficeHours = function () {
        var _this = this;
        this.getService.getStaffOfficeHours(this.email)
            .then(function (c) { return _this.oh = c; });
    };
    return Person;
}());
exports.Person = Person;
//# sourceMappingURL=Person.js.map