import { Component } from '@angular/core';
import { PeopleProvider } from '../../providers/people/people';

/**
 * Generated class for the GenerateChallanComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'generate-challan',
  templateUrl: 'generate-challan.html'
})
export class GenerateChallanComponent {

  text: string;
  dl: string;
  rc: string;
  vc: string;
  violenter: any;
  needManualDetails:boolean = false;


  constructor(public people:PeopleProvider) {
    this.text = 'Hello World';
  }

  getInfo(){
    this.violenter = this.people.getPerson('driving_license',this.dl);
    if(this.violenter == null){
      this.needManualDetails = true;
    }
  }

  viewViolations(){
  
  }
}
