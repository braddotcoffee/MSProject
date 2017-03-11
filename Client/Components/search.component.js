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
var SearchComponent = (function () {
    function SearchComponent(router) {
        this.router = router;
    }
    SearchComponent.prototype.ngOnInit = function () {
        var results = new Bloodhound({
            datumTokenizer: Bloodhound.tokenizers.obj.whitespace("value"),
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            sorter: function (a, b) {
                var valA = a.firstname + " " + a.lastname;
                var valB = b.firstname + " " + b.lastname;
                valA = valA.toLowerCase();
                valB = valB.toLowerCase();
                var val = $("#search").val();
                val = val.toLowerCase();
                var indexA = valA.indexOf(val);
                var indexB = valB.indexOf(val);
                console.log(indexA);
                console.log(indexB);
                if (indexA == indexB)
                    return 0;
                if (indexA == -1)
                    return 1;
                if (indexB == -1)
                    return -1;
                return indexA > indexB ? 1 : -1;
            },
            remote: {
                wildcard: "%QUERY",
                url: "/search?q=%QUERY",
                transform: function (response) {
                    console.log(response);
                    return $.map(results.sorter(response), function (r) {
                        return {
                            value: r.firstname + " " + r.lastname,
                            email: r.email
                        };
                    });
                }
            }
        });
        results.initialize();
        $('input.typeahead').typeahead({
            hint: false,
            highlight: true
        }, {
            display: "email",
            source: results.ttAdapter(),
            limit: 3,
            templates: {
                suggestion: function (result) {
                    return '<p>' + result.value + '<br><span class="searchEmail">'
                        + result.email + "</span></p>";
                }
            }
        });
    };
    SearchComponent.prototype.submit = function () {
        var val = $("#search").val();
        if (val.indexOf('@') !== -1 && val.indexOf('.') !== -1)
            this.router.navigateByUrl('/profile/' + val);
    };
    SearchComponent = __decorate([
        core_1.Component({
            selector: 'search',
            templateUrl: 'Templates/search.html'
        }), 
        __metadata('design:paramtypes', [router_1.Router])
    ], SearchComponent);
    return SearchComponent;
}());
exports.SearchComponent = SearchComponent;
//# sourceMappingURL=search.component.js.map