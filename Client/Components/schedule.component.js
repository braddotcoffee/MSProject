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
var ScheduleComponent = (function () {
    function ScheduleComponent() {
        this.schedule = new Map();
        this.days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday",
            "Saturday", "Sunday"];
    }
    ScheduleComponent.prototype.ngOnInit = function () {
        console.log(this.times);
        this.arrangeSchedule();
    };
    ScheduleComponent.prototype.arrangeSchedule = function () {
        this.times.forEach(function (time, index, array) {
            var day = time.day.trim();
            if (this.schedule.has(day))
                this.schedule.get(day).push(time);
            else
                this.schedule.set(day, [time]);
            if (index == array.length - 1) {
                this.sortSchedule();
            }
        }, this);
    };
    ScheduleComponent.prototype.sortSchedule = function () {
        this.days.forEach(function (day) {
            var daySched = this.schedule.get(day);
            if (daySched) {
                daySched.sort(function (a, b) {
                    var aTime = a.time.split(":");
                    var bTime = b.time.split(":");
                    var aHour = parseInt(aTime[0]);
                    var bHour = parseInt(bTime[0]);
                    var aMin = parseInt(aTime[1].substr(0, 2));
                    var bMin = parseInt(bTime[1].substr(0, 2));
                    if (aTime[1].substr(2) == "PM")
                        aHour += 12;
                    if (bTime[1].substr(2) == "PM")
                        bHour += 12;
                    var aDate = new Date();
                    var bDate = new Date();
                    aDate.setHours(aHour);
                    bDate.setHours(bHour);
                    aDate.setMinutes(aMin);
                    bDate.setMinutes(bMin);
                    aDate.setSeconds(0);
                    bDate.setSeconds(0);
                    console.log(aDate);
                    console.log(bDate);
                    return aDate > bDate ? 1 : aDate < bDate ? -1 : 0;
                });
            }
        }, this);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], ScheduleComponent.prototype, "times", void 0);
    ScheduleComponent = __decorate([
        core_1.Component({
            selector: 'schedule',
            templateUrl: 'Templates/schedule.html'
        }), 
        __metadata('design:paramtypes', [])
    ], ScheduleComponent);
    return ScheduleComponent;
}());
exports.ScheduleComponent = ScheduleComponent;
//# sourceMappingURL=schedule.component.js.map