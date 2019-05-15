import { Component } from "@angular/core";
import { NavParams, ViewController, NavController, Alert, AlertController } from "ionic-angular";
import { ViolentsProvider } from "../../../providers/violents/violents";
import { Camera, CameraOptions } from "@ionic-native/camera";
import { ToastService } from "../../../providers/toast/toast.service";
import * as localForage from 'localforage';


@Component({
  selector: 'page-seize',
  templateUrl: 'seize-modal.html',
})
export class SeizeModal {

  cameraOptions: CameraOptions = {
    sourceType: this.camera.PictureSourceType.CAMERA,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.PNG,
    mediaType: this.camera.MediaType.PICTURE,
    correctOrientation: true,
    targetWidth: 600,
    targetHeight: 600,
    quality: 10
  };

  object: any;
  vehicleTypeId: any;
  currentViolents;
  charge;
  violenter;
  documentName;
  documentID;
  vehicleName;
  vehicleColor;
  vehicleNumber
  challanObject: any = {};
  vehicleImages: any = [];
  vehicleUrls: any = [];
  documentUrls: any = [];
  vehicleTypes: any = [];
  documentImages: any = [];
  vehicleDocs: any = [];
  docsIds: any = [];
  docsInputIds: any = [];
  selectedVehicleDocs: any = [];

  constructor(public navParams: NavParams,
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    private camera: Camera,
    public violentService: ViolentsProvider,
    public toastService: ToastService,
    public alertCtrl: AlertController
  ) {
    this.challanObject = this.navParams.get('challanObject');
    this.getVehicleType();
    this.getVehicleDocs();
  }

  ionViewDidLoad() {
    this.object = this.navParams.get('data')
    // this.currentViolents = this.navParams.get('currentViolents')  
    // this.charge = this.navParams.get('charge')  
    // this.violenter = this.navParams.get('violenter') 

  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  seizeVehicle() {
    const formData = new FormData();
    const object = {
      ChallanId: this.challanObject.ChallanId,
      VehicleTypId: this.vehicleTypeId,
      VehicleName: this.vehicleName,
      VehicleImage: this.vehicleImages,
      ChallanDate: this.challanObject.ChallanDate
    }
    formData.append('ChallanId', this.challanObject.ChallanId);
    formData.append('VehicleTypId', this.vehicleTypeId);
    formData.append('VehicleName', this.vehicleName);
    this.vehicleImages.forEach((element, index) => {
      formData.append(`VehicleImage[${index}]`, element);
    });
    // formData.append('VehicleImage', this.vehicleImages);
    this.toastService.showLoader();

    this.violentService.vehicleSeize(formData).subscribe(response => {
      this.toastService.hideLoader();
      this.challanObject.VehicleSeizeStatus = "S";
      this.challanObject.PaymentStatus = '';
      this.sendSMSAndEmail();
      this.toastService.showToast('Vehicle Seized');
      this.viewCtrl._nav.popAll();
    }, (error) => {
      this.toastService.hideLoader();
      if (error.status === 401)
        this.viewCtrl._nav.popAll();
      else if (error.status === 0)
        this.saveOffline('VehicleSeized', object);
    });
  }

  saveOffline = (keyForm, formData) => {
    const alert: Alert = this.alertCtrl.create({
      title: 'You don\'t seem to have an active internet connection.',
      message: 'Do you want to save offline ?',
      buttons: [{
        text: 'No',
        role: 'cancel'
      }, {
        text: 'Yes',
        handler: () => {
          localForage.getItem(keyForm).then((value: any[]) => {
            if (value) {
              value.push(formData);
              localForage.setItem(keyForm, value).then(() => {
                return localForage.getItem(keyForm);
              });
            } else {
              localForage.setItem(keyForm, [formData]).then(() => {
                return localForage.getItem(keyForm);
              });
            }
          }).then(response => {
            this.toastService.showToast("Data saved offline.");
            if (keyForm == 'DocSeized') this.challanObject.DocsSeizeStatus = "S"
            if (keyForm == 'VehicleSeized') this.challanObject.VehicleSeizeStatus = "S";
            this.challanObject.PaymentStatus = '';
            this.viewCtrl._nav.popAll();
          });
        }
      }]

    });
    alert.present();
  }

  seizeDocument() {
    const formData = new FormData();
    const object = {
      'ChallanId': this.challanObject.ChallanId,
      'DocsId': this.docsIds,
      'DocsInputId': this.docsInputIds,
      'DocsImage': this.documentImages,
      'ChallanDate': this.challanObject.ChallanDate
    }
    formData.append('ChallanId', this.challanObject.ChallanId);
    formData.append('DocsId', this.docsIds);
    formData.append('DocsInputId', this.docsInputIds);
    this.documentImages.forEach((element, index) => {
      formData.append(`DocsImage[${index}]`, element);
    });
    // formData.append('DocsImage', this.documentImages);
    this.toastService.showLoader();

    this.violentService.documentSeize(formData).subscribe(response => {
      this.toastService.hideLoader();
      this.challanObject.DocsSeizeStatus = "S"
      this.challanObject.PaymentStatus = '';
      this.challanObject.vehicleDocsModel = response;
      this.sendSMSAndEmail();
      this.toastService.showToast('Documents Seized');
      this.viewCtrl._nav.popAll();
    }, (error) => {
      this.toastService.hideLoader();
      if (error.status === 401)
        this.viewCtrl._nav.popAll();
      else if (error.status === 0)
        this.saveOffline('DocSeized', object);
    });
  }

  sendSMSAndEmail() {
    console.log(this.challanObject);
    
    const object = {
      "ChallanId": this.challanObject.ChallanId,
      "ChallanDate": this.challanObject.ChallanDate,
      "VehicleNo": this.challanObject.VehicleNo,
      "OwnerName": this.challanObject.OwnerName,
      "MobileNo": this.challanObject.MobileNumber,
      "Location": this.challanObject.LocationName,
      "ViolationAct": this.challanObject.violations.toString(),
      "TotalFine": this.challanObject.amount,
      "SeizeStatus": this.challanObject.DocsSeizeStatus == "S" ? "Documents" : "Vehicle",
      "PaymentStatus": "",
      "MailRecipent": ""
    };
    if (this.challanObject.EmailId && this.validateEmail(this.challanObject.EmailId)){  
      object['MailRecipent'] = this.challanObject.EmailId;
    }
    this.violentService.sendEmail(object).subscribe(response => {
      console.log(response);
    });
    if (this.challanObject.MobileNumber){
      object['MailRecipent'] = "";
      this.violentService.sendSMS(object).subscribe(response => {
        console.log(response);
      });
    }
  }

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  private captureVehicle() {
    this.camera.getPicture(this.cameraOptions).then((onSuccess) => {
      this.vehicleUrls.push('data:image/png;base64,' + onSuccess);
      this.vehicleImages.push(onSuccess);
    }, (error) => {

    });
  }

  private captureDocument() {
    this.camera.getPicture(this.cameraOptions).then((onSuccess) => {
      this.documentUrls.push('data:image/png;base64,' + onSuccess);
      this.documentImages.push(onSuccess);
      // const fileName: string = 'doc-img' + new Date().toISOString().substring(0, 10) + new Date().getHours() + new Date().getMinutes() + new Date().getSeconds() + '.jpeg';
      // this.documentImages.push(this.dataURLtoFile('data:image/jpeg;base64,' + onSuccess, fileName));
    }, (error) => {

    });
  }

  // dataURLtoFile(dataurl, filename) {
  //     var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
  //         bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
  //     while (n--) {
  //         u8arr[n] = bstr.charCodeAt(n);
  //     }
  //     return new File([u8arr], filename, { type: mime });
  // }

  delDocImage(index: number) {
    this.documentUrls.splice(index, 1);
    this.documentImages.splice(index, 1);
  }

  delVehicleImage(index: number) {
    this.vehicleUrls.splice(index, 1);
    this.vehicleImages.splice(index, 1);
  }

  getVehicleType() {
    this.violentService.vehicleType().subscribe(response => {
      this.vehicleTypes = response;
      localForage.setItem('VehicleTypes', response).then(() => {
        return localForage.getItem('VehicleTypes');
      }).then((value) => {
        console.log(value);
        // we got our value
      }).catch((err) => {
        console.log(err);
        // we got an error
      });
    }, error => {
      localForage.getItem('VehicleTypes').then((value) => {
        console.log(value);
        this.vehicleTypes = value;
        // we got our value
      }).catch((err) => {
        console.log(err);
        // we got an error
      });
    })
  }

  getVehicleDocs() {
    this.violentService.VehicleDocs().subscribe(response => {
      this.vehicleDocs = response;
      localForage.setItem('VehicleDocs', response).then(() => {
        return localForage.getItem('VehicleDocs');
      }).then((value) => {
        console.log(value);
        // we got our value
      }).catch((err) => {
        console.log(err);
        // we got an error
      });
    }, error => {
      localForage.getItem('VehicleDocs').then((value) => {
        console.log(value);
        this.vehicleDocs = value;
        // we got our value
      }).catch((err) => {
        console.log(err);
        // we got an error
      });
    });
  }

}