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
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
var app_routing_module_1 = require('./app-routing.module');
var app_component_1 = require('../Components/app.component');
var home_component_1 = require('../Components/home.component');
var login_component_1 = require('../Components/login.component');
var dashboard_component_1 = require('../Components/dashboard.component');
var person_component_1 = require('../Components/person.component');
var schedule_component_1 = require('../Components/schedule.component');
var profile_component_1 = require('../Components/profile.component');
var search_component_1 = require('../Components/search.component');
var course_component_1 = require('../Components/course.component');
var roster_component_1 = require('../Components/roster.component');
var personList_component_1 = require('../Components/personList.component');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                http_1.HttpModule,
                forms_1.FormsModule,
                app_routing_module_1.AppRoutingModule
            ],
            declarations: [
                home_component_1.HomeComponent,
                login_component_1.LoginComponent,
                dashboard_component_1.DashboardComponent,
                person_component_1.PersonComponent,
                schedule_component_1.ScheduleComponent,
                profile_component_1.ProfileComponent,
                search_component_1.SearchComponent,
                course_component_1.CourseComponent,
                roster_component_1.RosterComponent,
                personList_component_1.PersonListComponent,
                app_component_1.AppComponent
            ],
            bootstrap: [
                app_component_1.AppComponent
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map