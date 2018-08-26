import { Component } from '@angular/core';

/**
 * Generated class for the NoRecordsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'no-records',
  templateUrl: 'no-records.html'
})
export class NoRecordsComponent {

  text: string;

  constructor() {
    console.log('Hello NoRecordsComponent Component');
    this.text = 'Hello World';
  }

}
