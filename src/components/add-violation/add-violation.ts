import { Component } from '@angular/core';

/**
 * Generated class for the AddViolationComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'add-violation',
  templateUrl: 'add-violation.html'
})
export class AddViolationComponent {

  text: string;

  constructor() {
    console.log('Hello AddViolationComponent Component');
    this.text = 'Hello World';
  }

}
