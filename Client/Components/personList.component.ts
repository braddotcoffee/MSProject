import { Component, Input } from '@angular/core';

import { Person           } from './Person';

@Component({
  selector: 'person-list',
  templateUrl: 'Templates/personList.html'
})

export class PersonListComponent {
  @Input()
  people: Person[];
  @Input()
  header: string;
}
