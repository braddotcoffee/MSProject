import { Component, OnInit } from '@angular/core';
import { Router            } from '@angular/router';

declare var $:any;
declare var Bloodhound:any;

@Component({
  selector: 'search',
  templateUrl: 'Templates/search.html'
})

export class SearchComponent implements OnInit {

  constructor(private router: Router){  }

  ngOnInit(): void {
    var results = new Bloodhound({
      datumTokenizer: Bloodhound.tokenizers.obj.whitespace("value"),
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      sorter: function(a:any, b:any){
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

        if(indexA == indexB)
          return 0;

        if(indexA == -1)
          return 1;
        if(indexB == -1)
          return -1;

        return indexA>indexB ? 1 : -1;
      },
      remote: {
        wildcard:"%QUERY",
        url: "/search?q=%QUERY",
        transform: function(response:any){
          console.log(response);
          return $.map(results.sorter(response), function(r:any){
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
        suggestion: function(result:any){
          return '<p>'+result.value+'<br><span class="searchEmail">'
          +result.email+"</span></p>";
        }
      }
    });
  }

  submit(): void {
    var val = $("#search").val();
    $("#search").val("");
    if(val.indexOf('@') !== -1 && val.indexOf('.') !== -1)
      this.router.navigateByUrl('/profile/'+val);
    if(val.indexOf('CC:') !== -1)
      this.router.navigateByUrl('/course/'+val.substr(3))
  }
}
