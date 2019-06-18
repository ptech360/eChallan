import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as localForage from 'localforage';
import { ToastService } from '../../providers/toast/toast.service';
import { ViolentsProvider } from '../../providers/providers';
/**
 * Generated class for the UnuploadedChallanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-unuploaded-challan',
  templateUrl: 'unuploaded-challan.html',
})
export class UnuploadedChallanPage {
  challans: any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastService: ToastService, public violent: ViolentsProvider) {
  }

  ionViewDidLoad() {
    localForage.getItem('VehicleChallan').then((challans: any[]) => {
      if(challans){
        this.challans = challans;
      }
    })
  }

  generateChallan(challan:any){
    this.toastService.showLoader();
    const formData = new FormData();
    challan.files.forEach((file:any) => {
      formData.append('file',file);
    });
    delete challan.files;
    Object.keys(challan).forEach(element => {
      formData.append(element,challan[element]);
    });
    this.violent.generateChallan(formData).subscribe((response: any) => {
      this.toastService.hideLoader();
      this.toastService.showToast("Data Synchronized");
      this.challans.splice(this.challans.indexOf(challan),1);
      localForage.setItem('VehicleChallan',this.challans);
    }, (error: any) =>{
      this.toastService.hideLoader();
      
    });
  }

}
