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
var get_service_1 = require('../Services/get.service');
var Person_1 = require('./Person');
var PersonComponent = (function () {
    function PersonComponent(getService) {
        this.getService = getService;
    }
    PersonComponent.prototype.ngOnInit = function () {
        this.person = new Person_1.Person(this.getService, this.email, this.rank);
    };
    PersonComponent.prototype.ngOnChanges = function () {
        this.ngOnInit();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], PersonComponent.prototype, "email", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], PersonComponent.prototype, "rank", void 0);
    PersonComponent = __decorate([
        core_1.Component({
            selector: 'person',
            providers: [get_service_1.GetService],
            templateUrl: 'Templates/person.html'
        }), 
        __metadata('design:paramtypes', [get_service_1.GetService])
    ], PersonComponent);
    return PersonComponent;
}());
exports.PersonComponent = PersonComponent;
//# sourceMappingURL=person.component.js.map