import { Component } from "@angular/core";
import {
  NavController,
  NavParams,
  LoadingController,
  Loading,
  AlertController,
  Alert,
  App,
  Events
} from "ionic-angular";
import { Camera, CameraOptions } from "@ionic-native/camera";
import { Geolocation } from "@ionic-native/geolocation";
import { HttpClient } from "@angular/common/http";
import * as localForage from "localforage";

import { ViolentsProvider } from "../../providers/violents/violents";
import { PaymentGatewayPage } from "../../pages/payment-gateway/payment-gateway";
import { SeizePage } from "../../pages/seize/seize";
import {
  FormGroup,
  FormBuilder,
  FormArray,
  FormControl,
  Validators
} from "@angular/forms";
import { ToastService } from "../../providers/toast/toast.service";
import { PrintReceiptPage } from "../../pages/print-receipt/print-receipt";
import { StorageService } from "../../providers/providers";

/**
 * Generated class for the AddViolationComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "add-violation",
  templateUrl: "add-violation.html"
})
export class AddViolationComponent {
  text: string;
  totalCharge: number = 0.0;
  violenter;
  currentViolents: any[] = [];
  violentsList: any = [];
  violationIds: any = [];
  violations: any = [];
  loading: Loading;
  challanForm: FormGroup;
  cameraOptions: CameraOptions = {
    targetWidth: 600,
    targetHeight: 600,
    sourceType: this.camera.PictureSourceType.CAMERA,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.PNG,
    mediaType: this.camera.MediaType.PICTURE,
    correctOrientation: true,
    cameraDirection: 0,
    quality: 10
  };
  imageUrls: any = [];
  files: any = [];
  geoLocation: string = "";
  locationName: string = "";

  constructor(
    public violent: ViolentsProvider,
    public navCtrl: NavController,
    public navParam: NavParams,
    private camera: Camera,
    private geolocation: Geolocation,
    public alertCtrl: AlertController,
    public toastService: ToastService,
    public fb: FormBuilder,
    public httpClient: HttpClient,
    public appCtrl: App,
    public localStorage: StorageService,
    public events: Events
  ) {
    this.toastService.showLoader("Loading Violations...");
    this.violent.getViolents().subscribe(
      response => {
        this.toastService.hideLoader();
        this.violentsList = response;
        localForage
          .setItem("TrafficVioList", response)
          .then(() => {
            return localForage.getItem("TrafficVioList");
          })
          .then(value => {
            // we got our value
          })
          .catch(err => {
            // we got an error
          });
      },
      error => {
        if (error.status === 401) {
          this.events.publish("user:logout");
        }
        localForage
          .getItem("TrafficVioList")
          .then(value => {
            this.violentsList = value;
            // we got our value
          })
          .catch(err => {
            // we got an error
          });
        this.toastService.hideLoader();
      }
    );
  }

  getGeoLoacation(latitude, longitude) {
    this.httpClient
      .get(
        "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
          latitude +
          "," +
          longitude +
          "&key=AIzaSyC0fj5LBatMHxv2d-o6OTni7V1voRbQiKM"
      )
      .subscribe((response: any) => {
        debugger;
        try {
          this.locationName = response.results
            ? response.results[0].formatted_address
            : "Not Locate";
        } catch (error) {}

        this.challanForm.controls["LocationName"].patchValue(this.locationName);
      });
  }

  ionViewDidLoad() {
    this.violenter = this.navParam.get("data");
    this.challanForm = this.getChallanForm();
    this.geolocation
      .getCurrentPosition()
      .then(pos => {
        this.geoLocation =
          "lat: " +
          pos.coords.latitude.toFixed(6) +
          ", lon: " +
          pos.coords.longitude.toFixed(6);
        this.challanForm.controls["GeoLocation"].patchValue(this.geoLocation);
        setTimeout(() => {
          this.getGeoLoacation(pos.coords.latitude, pos.coords.longitude);
        }, 2000);
      })
      .catch(error => {
        console.log(error);
      });
  }

  getChallanForm() {
    return this.fb.group({
      BodyType: [""],
      ChassisNo: [""],
      Colour: [""],
      EngNo: [""],
      VehicleNo: [""],
      MakerModel: [""],
      DlNo: [""],
      OwnerName: [""],
      FatherName: [""],
      OwnerAddress: [""],
      // RegistrationNo: [''],
      EmailId: [""],
      MobileNumber: [""],
      ViolationId: [""],
      UserName: [this.localStorage.getData("user-detail").Username],
      LocationName: ["Varanasi"],
      GeoLocation: ["Varanasi"],
      // PaymentTypeName: [""],
      // PaymentId : [''],
      VehicleImageFile: this.fb.array([])
    });
  }

  subTotal() {
    let repeatedViolents = [];
    let createdDate: any = 0;
    let currentDate: any = 0;
    let miliseconds: any = 0;
    let h: any;
    if (this.violenter.PastViolations && this.violenter.PastViolations.length)
      repeatedViolents = this.currentViolents.filter(element => {
        return (
          this.violenter.PastViolations.findIndex(violent => {
            createdDate = new Date(violent.CreatedDate);
            currentDate = new Date();
            miliseconds = currentDate.getTime() - createdDate.getTime();
            h = miliseconds / 1000 / 60 / 60;
            return element.ViolationId === violent.ViolationId && h <= 24;
          }) > -1
        );
      });
    if (repeatedViolents.length) {
      let repeatedViolentNames: string = "";
      repeatedViolents.forEach((element: any, index: number) => {
        repeatedViolentNames += index + 1 + ". " + element.ViolationName + "\n";
        this.currentViolents.splice(this.currentViolents.indexOf(element), 1);
      });
      this.showError(repeatedViolentNames);
    }
    for (let i = 0; i < this.currentViolents.length; i++) {
      this.totalCharge += Number(this.currentViolents[i].ViolationFine);
    }
  }

  payment() {
    this.navCtrl.push(PaymentGatewayPage, {
      data: this.currentViolents,
      charge: this.totalCharge,
      violenter: this.violenter,
      files: this.files
    });
  }

  generateChallan() {
    // this.challanForm = this.getChallanForm();
    this.violationIds = [];
    this.violations = [];
    this.currentViolents.forEach(element => {
      this.violationIds.push(element.ViolationId);
      this.violations.push(element.ViolationName);
    });
    this.challanForm.patchValue(this.violenter);
    this.challanForm.controls["ViolationId"].patchValue(
      this.violationIds.toString()
    );
    this.challanForm.controls["VehicleNo"].patchValue(this.violenter.VehicleNo);
    let tzoffset = new Date().getTimezoneOffset() * 60000; //offset in milliseconds
    const date: any =
      new Date(<any>new Date() - tzoffset).toISOString().slice(0, -5) + "Z";
    this.challanForm.value["ChallanDate"] =
      date.slice(0, -1).slice(0, 10) + " " + date.slice(0, -1).slice(11);
    this.toastService.showLoader();
    const formData = new FormData();
    Object.keys(this.challanForm.value).forEach(key => {
      if (this.challanForm.value[key] instanceof Array) {
        this.challanForm.value[key].forEach((element, index) => {
          formData.append(`${key}[${index}]`, element);
        });
      } else {
        formData.append(key, this.challanForm.value[key]);
      }
    });
    this.violent.generateChallan(formData).subscribe(
      (response: any) => {
        this.toastService.hideLoader();
        this.challanForm.value["ChallanId"] = response.ChallanId;
        this.challanForm.value["ChallanDate"] = response.ChallanDate;
        this.challanForm.value["amount"] = this.totalCharge;
        this.challanForm.value["violations"] = this.violations;
        this.challanForm.value["VehicleNo"] = this.violenter.VehicleNo;
        this.challanForm.value["VehicleClass"] = this.violenter.VehicleClass;
        this.challanForm.value["PaymentStatus"] = "P";
        this.challanForm.value["DutyOfficer"] = response.DutyOfficer;
        this.sendSMSAndEmail(this.challanForm.value);
        this.navCtrl.push(PrintReceiptPage, {
          data: this.challanForm.value,
          currentViolents: this.currentViolents
        });
      },
      (error: any) => {
        // this.challanForm.value['ChallanId'] = null;
        this.toastService.hideLoader();
        if (error.status == 0) {
          let tzoffset = new Date().getTimezoneOffset() * 60000; //offset in milliseconds
          const date: any =
            new Date(<any>new Date() - tzoffset).toISOString().slice(0, -5) +
            "Z";
          this.challanForm.value["ChallanDate"] =
            date.slice(0, -1).slice(0, 10) + " " + date.slice(0, -1).slice(11);
          const challanForm = Object.assign({}, this.challanForm.value);
          this.challanForm.value["amount"] = this.totalCharge;
          this.challanForm.value["violations"] = this.violations;
          this.challanForm.value["VehicleNo"] = this.violenter.VehicleNo;
          this.challanForm.value["VehicleClass"] = this.violenter.VehicleClass;
          this.challanForm.value["PaymentStatus"] = "P";
          this.challanForm.value["DutyOfficer"] = "";
          this.saveOffline(challanForm, this.challanForm.value);
        } else if (error.status === 401) {
          this.events.publish("user:logout");
        }
      }
    );
  }

  sendSMSAndEmail(challanObject) {
    const object = {
      ChallanId: challanObject.ChallanId,
      ChallanDate: challanObject.ChallanDate,
      VehicleNo: challanObject.VehicleNo,
      OwnerName: challanObject.OwnerName,
      MobileNo: challanObject.MobileNumber,
      Location: challanObject.LocationName,
      ViolationAct: challanObject.violations.toString(),
      TotalFine: challanObject.amount,
      PaymentStatus: "Pending",
      SeizeStatus: "",
      MailRecipent: ""
    };
    if (challanObject.EmailId && this.validateEmail(challanObject.EmailId)) {
      object["MailRecipent"] = challanObject.EmailId;
      this.violent.sendEmail(object).subscribe(response => {

      });
    }
    if (challanObject.MobileNumber) {
      object["MailRecipent"] = "";
      this.violent.sendSMS(object).subscribe(response => {
        
      });
    }
  }

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  saveOffline = (formData, jsonData) => {
    delete formData["amount"];
    delete formData["violations"];
    delete formData["VehicleClass"];
    delete formData["PaymentStatus"];
    delete formData["DutyOfficer"];
    const alert: Alert = this.alertCtrl.create({
      title: "You don't seem to have an active internet connection.",
      message: "Do you want to save offline ?",
      buttons: [
        {
          text: "No",
          role: "cancel"
        },
        {
          text: "Yes",
          handler: () => {
            // const overlayView = this.appCtrl._appRoot._overlayPortal._views[0];
            // if (overlayView && overlayView.dismiss) {
            //   overlayView.dismiss();
            // }
            localForage
              .getItem("VehicleChallan")
              .then((value: any[]) => {
                if (value) {
                  value.push(formData);
                  localForage.setItem("VehicleChallan", value).then(() => {
                    return localForage.getItem("VehicleChallan");
                  });
                } else {
                  localForage.setItem("VehicleChallan", [formData]).then(() => {
                    return localForage.getItem("VehicleChallan");
                  });
                }
              })
              .then(response => {
                this.toastService.showToast("Data saved offline.");
                this.navCtrl.push(PrintReceiptPage, {
                  data: jsonData,
                  currentViolents: this.currentViolents
                });
              });
          }
        }
      ]
    });
    alert.present();
  };

  seize() {
    this.navCtrl.push(SeizePage, {
      data: this.currentViolents,
      charge: this.totalCharge,
      violenter: this.violenter
    });
  }

  private capture() {
    this.camera.getPicture(this.cameraOptions).then(
      onSuccess => {
        this.imageUrls.push("data:image/png;base64," + onSuccess);
        const vehicleImageFiles = <FormArray>(
          this.challanForm.controls["VehicleImageFile"]
        );
        vehicleImageFiles.push(new FormControl(onSuccess));
      },
      onError => {
        alert(onError);
      }
    );
  }

  delImage(index: number) {
    const vehicleImageFiles = <FormArray>(
      this.challanForm.controls["VehicleImageFile"]
    );
    this.imageUrls.splice(index, 1);
    vehicleImageFiles.removeAt(index);
  }

  showError(message) {
    const alert = this.alertCtrl.create({
      title: "Repeated Violation(s)",
      subTitle: message,
      buttons: ["OK"]
    });
    alert.present();
  }
}
