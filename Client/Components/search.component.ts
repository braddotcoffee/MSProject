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

        var val = $("#search").val();

        var indexA = valA.indexOf(val);
        var indexB = valB.indexOf(val);

        return indexA>indexB ? 1 : indexB>indexA ? -1 : 0;
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
          return '<p>'+result.value+'</p>';
        }
      }
    });
  }

  submit(): void {
    var val = $("#search").val();
    if(val.indexOf('@') !== -1 && val.indexOf('.') !== -1)
      this.router.navigateByUrl('/profile/'+val);
  }
}