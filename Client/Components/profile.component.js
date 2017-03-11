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
var get_service_1 = require('../Services/get.service');
require('rxjs/add/operator/switchMap');
var ProfileComponent = (function () {
    function ProfileComponent(getService, route, router) {
        this.getService = getService;
        this.route = route;
        this.router = router;
    }
    ProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params
            .switchMap(function (params) { return _this.getService
            .getStudentOrProf(params["email"]); })
            .subscribe(function (response) {
            var body = response.json();
            var loggedIn = sessionStorage.getItem("loggedIn");
            console.log("HERE");
            console.log(body);
            if (!body.Email || !loggedIn)
                _this.router.navigateByUrl("/dashboard");
            else {
                _this.email = body.Email;
                var userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
                console.log(userInfo);
                if (userInfo.studentOrProf == "Professor")
                    _this.rank = 3;
                else if (userInfo.Email == _this.email)
                    _this.rank = 4;
                else
                    _this.rank = userInfo.studentRank;
                console.log(_this.rank);
            }
        });
    };
    ProfileComponent = __decorate([
        core_1.Component({
            selector: 'profile',
            providers: [get_service_1.GetService],
            templateUrl: 'Templates/profile.html'
        }), 
        __metadata('design:paramtypes', [get_service_1.GetService, router_1.ActivatedRoute, router_2.Router])
    ], ProfileComponent);
    return ProfileComponent;
}());
exports.ProfileComponent = ProfileComponent;
//# sourceMappingURL=profile.component.js.map