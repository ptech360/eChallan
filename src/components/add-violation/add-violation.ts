import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Loading, AlertController, Alert, App, Events } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';
import { HttpClient } from '@angular/common/http';
import * as localForage from "localforage";

import { ViolentsProvider } from '../../providers/violents/violents';
import { PaymentGatewayPage } from '../../pages/payment-gateway/payment-gateway';
import { SeizePage } from '../../pages/seize/seize';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { ToastService } from '../../providers/toast/toast.service';
import { PrintReceiptPage } from '../../pages/print-receipt/print-receipt';
import { StorageService } from '../../providers/providers';

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
  totalCharge:number = 0.0;
  violenter;
  currentViolents:any[] = [];
  violentsList:any = [];
  violationIds: any = [];
  violations: any = [];
  loading: Loading;
  challanForm:FormGroup
  cameraOptions: CameraOptions = {
    targetWidth: 600,
    targetHeight: 600,
    sourceType         : this.camera.PictureSourceType.CAMERA,
    destinationType    : this.camera.DestinationType.DATA_URL,
    encodingType       : this.camera.EncodingType.PNG,
    mediaType: this.camera.MediaType.PICTURE,
    correctOrientation: true,
    cameraDirection: 0,
    quality: 10
  };
  imageUrls: any = [];
  files: any = [];
  geoLocation: string = "";
  locationName: string = "";


  constructor(public violent:ViolentsProvider,
              public navCtrl:NavController,
              public navParam:NavParams,
              private camera: Camera,
              private geolocation: Geolocation,
              public alertCtrl: AlertController,
              public toastService:ToastService,
              public fb:FormBuilder,
              public httpClient: HttpClient,
              public appCtrl: App,
              public localStorage: StorageService,
              public events: Events 
  ) {
    this.toastService.showLoader('Loading Violations...')
    this.violent.getViolents().subscribe(response => {
      this.toastService.hideLoader();
      this.violentsList = response;
      localForage.setItem('TrafficVioList', response).then(() => {
        return localForage.getItem('TrafficVioList');
      }).then((value) => {
        console.log(value);
        // we got our value
      }).catch((err) => {
        console.log(err);
        // we got an error
      });
    }, error => {
      if(error.status === 401) {
        this.events.publish("user:logout");
      }
      localForage.getItem('TrafficVioList').then( (value) => {
        console.log(value);
        this.violentsList = value;
        // we got our value
      }).catch((err) => {
        console.log(err);
        // we got an error
      });
      this.toastService.hideLoader();
    });
  }

  getGeoLoacation(latitude, longitude){
    this.httpClient.get('https://maps.googleapis.com/maps/api/geocode/json?latlng='+latitude+','+longitude+'&key=AIzaSyC0fj5LBatMHxv2d-o6OTni7V1voRbQiKM').subscribe((response:any) => {
      this.locationName = response.results ? response.results[0].formatted_address : 'Not Locate';
      this.challanForm.controls['LocationName'].patchValue(this.locationName);
      console.log(this.locationName);
      
    })
  }

  ionViewDidLoad() {
    this.violenter = this.navParam.get('data');
    this.challanForm = this.getChallanForm();
    this.geolocation.getCurrentPosition().then(pos => {
      console.log(pos);
      
      this.geoLocation =  'lat: ' + pos.coords.latitude.toFixed(6) + ', lon: ' + pos.coords.longitude.toFixed(6);
      this.challanForm.controls['GeoLocation'].patchValue(this.geoLocation);
      setTimeout(() => {
        this.getGeoLoacation(pos.coords.latitude,pos.coords.longitude);        
      }, 2000);
    }).catch(error=>{
      console.log(error);
    });
  }

  getChallanForm(){
    // this.currentViolents.forEach(element => {
    //   this.violationIds.push(element.ViolationId);
    //   this.violations.push(element.ViolationName);
    // });
    return this.fb.group({
      BodyType: [''],
      ChassisNo: [''],
      Colour: [''],
      EngNo: [''],
      VehicleNo: [''],
      MakerModel: [''],
      DlNo:[''],
      OwnerName: [''],
      FatherName: [''],
      OwnerAddress: [''],
      // RegistrationNo: [''],
      MobileNumber: [''],
      ViolationId:[''],
      UserName: [this.localStorage.getData('user-detail').Username],
      LocationName: ['Varanasi'],
      GeoLocation: ['Varanasi'],
      // PaymentTypeName: [""],
      // PaymentId : [''],
      VehicleImageFile: this.fb.array([])
    });
  }

  subTotal(){
    let repeatedViolents = [];
    let createdDate:any = 0;
    let currentDate:any = 0; 
    let miliseconds:any = 0;  
    let h:any;
    if(this.violenter.PastViolations&&this.violenter.PastViolations.length)
    repeatedViolents = this.currentViolents.filter(element => {
      return this.violenter.PastViolations.findIndex(violent => {
        createdDate = new Date(violent.CreatedDate);
        currentDate = new Date();
        miliseconds = currentDate.getTime() - createdDate.getTime();
        h = ((miliseconds/1000)/60)/60;
        return (element.ViolationId === violent.ViolationId && h<=24);
      })>-1;
    });
    if(repeatedViolents.length){
      let repeatedViolentNames:string = '';
      repeatedViolents.forEach((element:any,index:number) => {
        repeatedViolentNames += index+1 + '. ' + element.ViolationName + "\n";
        this.currentViolents.splice(this.currentViolents.indexOf(element),1);
      });
      this.showError(repeatedViolentNames);
    }
    for(let i=0;i<this.currentViolents.length;i++){
      this.totalCharge += Number(this.currentViolents[i].ViolationFine);
    }
  }

  payment(){
    this.navCtrl.push(PaymentGatewayPage, { data: this.currentViolents, charge:this.totalCharge, violenter: this.violenter, files:this.files });
  }

  generateChallan(){
    // this.challanForm = this.getChallanForm();
    this.violationIds = [];
    this.violations = [];
    this.currentViolents.forEach(element => {
      this.violationIds.push(element.ViolationId);
      this.violations.push(element.ViolationName);
    });
    this.challanForm.patchValue(this.violenter);
    this.challanForm.controls['ViolationId'].patchValue(this.violationIds.toString());
    this.challanForm.controls['VehicleNo'].patchValue(this.violenter.VehicleNo);
    let tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
    const date:any = (new Date(<any>new Date() - tzoffset)).toISOString().slice(0, -5) + "Z";
    this.challanForm.value['ChallanDate'] = date.slice(0,-1).slice(0,10) + ' ' +  date.slice(0,-1).slice(11);
    this.toastService.showLoader();
    const formData = new FormData();
    Object.keys(this.challanForm.value).forEach(key => {
      if (this.challanForm.value[key] instanceof Array) {
        this.challanForm.value[key].forEach((element,index) => {
          formData.append(`${key}[${index}]`, element);
        });
      } else {
        formData.append(key,this.challanForm.value[key]);
      }
    });
    // this.files.forEach((file:any) => {
    //   formData.append('file',file);
    // });
    // formData.append('VehicleImageFile','');
    this.violent.generateChallan(formData).subscribe((response: any) => {
      this.toastService.hideLoader();
      this.challanForm.value['ChallanId'] = response.ChallanId;
      this.challanForm.value['ChallanDate'] = response.ChallanDate;
      this.challanForm.value['amount'] = this.totalCharge;
      this.challanForm.value['violations'] = this.violations;
      this.challanForm.value['VehicleNo'] = this.violenter.VehicleNo;
      this.challanForm.value['VehicleClass'] = this.violenter.VehicleClass;
      this.challanForm.value['PaymentStatus'] = "P";
      this.challanForm.value['DutyOfficer'] = response.DutyOfficer;
      this.navCtrl.push(PrintReceiptPage, {data: this.challanForm.value, currentViolents: this.currentViolents});
      // const violenterModal =  this.modalCtrl.create(PrintReceiptPage, {data: this.challanForm.value});
      // violenterModal.present();
      // this.navCtrl.popToRoot();
    },(error: any) => {
      // this.challanForm.value['ChallanId'] = null;
      this.toastService.hideLoader();
      if(error.status == 0){
        let tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
        const date:any = (new Date(<any>new Date() - tzoffset)).toISOString().slice(0, -5) + "Z";
        this.challanForm.value['ChallanDate'] = date.slice(0,-1).slice(0,10) + ' ' +  date.slice(0,-1).slice(11);
        const challanForm = Object.assign({}, this.challanForm.value);  
        this.challanForm.value['amount'] = this.totalCharge;
        this.challanForm.value['violations'] = this.violations;
        this.challanForm.value['VehicleNo'] = this.violenter.VehicleNo;
        this.challanForm.value['VehicleClass'] = this.violenter.VehicleClass;
        this.challanForm.value['PaymentStatus'] = "P";
        this.challanForm.value['DutyOfficer'] = "";
        // this.toastService.hideLoader();
        // challanForm['files'] = this.files;
        this.saveOffline(challanForm, this.challanForm.value);
      }else if(error.status === 401) {
        this.events.publish("user:logout");
      }
    });
  }

  saveOffline = (formData, jsonData) => {
    delete formData['amount'];
    delete formData['violations'];
    delete formData['VehicleClass'];
    delete formData['PaymentStatus'];
    delete formData['DutyOfficer'];
    const alert: Alert = this.alertCtrl.create({
      title: 'You don\'t seem to have an active internet connection.',
      message: 'Do you want to save offline ?',
      buttons: [{
        text: 'No',
        role: 'cancel'
      }, {
        text: 'Yes',
        handler: () => {
          // const overlayView = this.appCtrl._appRoot._overlayPortal._views[0];
          // if (overlayView && overlayView.dismiss) {
          //   overlayView.dismiss();
          // }
          localForage.getItem('VehicleChallan').then((value: any[]) => {
            if(value){
              value.push(formData);
              localForage.setItem('VehicleChallan', value).then(() => {
                return localForage.getItem('VehicleChallan');
              });
            }else {
              localForage.setItem('VehicleChallan', [formData]).then(() => {
                return localForage.getItem('VehicleChallan');
              });
            }
          }).then(response => {
            this.toastService.showToast("Data saved offline.");
            this.navCtrl.push(PrintReceiptPage, {data: jsonData, currentViolents: this.currentViolents});
            console.log(response);
          });          
        }
      }]

    });
    alert.present();
  }

  seize(){
    this.navCtrl.push(SeizePage, { data: this.currentViolents, charge:this.totalCharge, violenter: this.violenter });
  }

  private capture(){
    this.camera.getPicture(this.cameraOptions).then((onSuccess)=>{
      this.imageUrls.push('data:image/png;base64,' + onSuccess);
      const vehicleImageFiles = <FormArray>this.challanForm.controls['VehicleImageFile'];
      vehicleImageFiles.push(new FormControl(onSuccess));
      // const fileName:string = 'img'+new Date().toISOString().substring(0,10)+new Date().getHours()+new Date().getMinutes()+new Date().getSeconds()+'.jpeg'; 
      // this.files.push(this.dataURLtoFile('data:image/jpeg;base64,' + onSuccess,fileName));
      // console.log(this.files);
    },(onError)=>{
      alert(onError);
    });
  }

  // dataURLtoFile(dataurl, filename) {
  //   var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
  //       bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
  //   while(n--){
  //       u8arr[n] = bstr.charCodeAt(n);
  //   }
  //   return new File([u8arr], filename, {type:mime});
  // }

  delImage(index:number){
    const vehicleImageFiles = <FormArray>this.challanForm.controls['VehicleImageFile'];
    this.imageUrls.splice(index,1);
    vehicleImageFiles.removeAt(index);
    // this.files.splice(index,1);
  }

  showError(message) {
    const alert = this.alertCtrl.create({
      title: 'Repeated Violation(s)',
      subTitle: message,
      buttons: ['OK']
    })
    alert.present();
  }

}
