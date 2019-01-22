import { Component } from '@angular/core';
import { PeopleProvider } from '../../providers/people/people';
import { ModalController, NavController, Events, Loading, LoadingController, Alert, AlertController, App } from 'ionic-angular';
import { ViolenterHistoryPage } from '../../pages/violenter-history/violenter-history';
import { AddViolationComponent } from '../add-violation/add-violation';
import { VehicleDetailComponent } from '../vehicle-detail/vehicle-detail';

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
  vehicleNo: string = 'UP65CY7917';
  loading: Loading;




  constructor(public people:PeopleProvider,
              public modalCtrl:ModalController,
              public navCtrl:NavController,
              public appCtrl: App,
              public events: Events,
              public generateCtrl:LoadingController,
              public alertCtrl: AlertController
  ) {
    this.text = 'Hello World';
  }

  getInfo() {
    this.showLoading();
    this.people.getVehicleDetails(this.vehicleNo).subscribe((response:any)=>{
      this.violenter = response;  
      this.violenter['VehicleNo'] = this.vehicleNo;
      this.loading.dismiss();
      // this.navCtrl.push(VehicleDetailComponent,{ data: this.violenter })
    }, (error)=>{
      
      if(error.status === 404 || error.status === 0){
        const alert: Alert = this.alertCtrl.create({
          title: 'Either data not found or you don\'t have an active internet connection.',
          message: 'Do you want to record Manually ?',
          buttons: [{
            text: 'No',
            role: 'cancel'
          }, {
            text: 'Yes',
            handler: () => {
              const overlayView = this.appCtrl._appRoot._overlayPortal._views[0];
              if (overlayView && overlayView.dismiss) {
                overlayView.dismiss();
              }
              this.addViolation();
            }
          }]
    
        });
        alert.present();
      }
      this.loading.dismiss();
    });
  }

  viewViolations(){
    const violenterModal = this.modalCtrl.create(ViolenterHistoryPage,{ data: this.violenter })
    violenterModal.present()
  }

  addViolation(){
    // this.navCtrl.push(AddViolationComponent,{ data: this.violenter })
    this.navCtrl.push(VehicleDetailComponent,{ data: this.violenter || {} })
  }

  showLoading(){
    this.loading =  this.generateCtrl.create({
      content:'getting...',
      dismissOnPageChange:true
    })
    this.loading.present()
  }
}
