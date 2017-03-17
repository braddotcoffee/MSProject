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
var Course_1 = require('./Course');
var get_service_1 = require('../Services/get.service');
require('rxjs/add/operator/switchMap');
var CourseComponent = (function () {
    function CourseComponent(getService, route, router) {
        this.getService = getService;
        this.route = route;
        this.router = router;
    }
    CourseComponent.prototype.ngOnInit = function () {
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
                _this.course = new Course_1.Course(_this.getService, _this.cCode, body.name);
            }
        });
    };
    CourseComponent = __decorate([
        core_1.Component({
            selector: 'profile',
            providers: [get_service_1.GetService],
            templateUrl: 'Templates/course.html'
        }), 
        __metadata('design:paramtypes', [get_service_1.GetService, router_1.ActivatedRoute, router_2.Router])
    ], CourseComponent);
    return CourseComponent;
}());
exports.CourseComponent = CourseComponent;
//# sourceMappingURL=course.component.js.map