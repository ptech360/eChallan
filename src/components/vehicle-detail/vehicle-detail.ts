import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Loading, ModalController } from 'ionic-angular';
import { ViolenterHistoryPage } from '../../pages/violenter-history/violenter-history';
import { FormBuilder, FormGroup } from '../../../node_modules/@angular/forms';
import { AddViolationComponent } from '../add-violation/add-violation';
/**
 * Generated class for the VehicleDetailComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'vehicle-detail',
  templateUrl: 'vehicle-detail.html'
})
export class VehicleDetailComponent {

  text: string;
  violenter: any = {};

  violationForm:FormGroup;

  constructor(public navCtrl:NavController,
    public modalCtrl:ModalController,
    public navParam:NavParams,
    public fb:FormBuilder) {
      this.violationForm = this.fb.group({
        BodyType: [''],
        ChassisNo: [''],
        Colour: [''],
        EngNo: [''],
        FatherName: [''],
        MakerModel: [''],
        MobileNumber: [''],
        OwnerName: [''],
        PastViolationCount: [0],
        PastViolations: [],
        PermanentAddress: [''],
        RegistrationNo: [''],
        RegnDate: [''],
        VehicleClass: [''],
        VehicleNo:['']
      });
  }

  ionViewDidLoad() {    
    this.violenter = this.navParam.get('data');    
    this.violationForm.patchValue(this.violenter);
    console.log(this.violenter);    
  }

  viewViolations(){
    const violenterModal = this.modalCtrl.create(ViolenterHistoryPage,{ data: this.violenter })
    violenterModal.present()
  }

  addViolation(){
    this.navCtrl.push(AddViolationComponent,{ data: this.violationForm.value })
  }

}
