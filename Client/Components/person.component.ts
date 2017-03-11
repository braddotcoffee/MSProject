import { Component, Input, OnInit   }  from  '@angular/core';

import { GetService } from '../Services/get.service';
import { Person     } from './Person'

@Component({
  selector: 'person',
  providers: [ GetService ],
  templateUrl: 'Templates/person.html'
})

export class PersonComponent implements OnInit {
  @Input()
  email: string;
  @Input()
  rank: number;

  person: Person;

  constructor(private getService: GetService){}

  ngOnInit(): void {
    console.log(this.rank);
    this.person = new Person(this.getService, this.email, this.rank);
  }

}
