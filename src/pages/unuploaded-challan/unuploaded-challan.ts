import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import * as localForage from "localforage";
import { ToastService } from "../../providers/toast/toast.service";
import { ViolentsProvider } from "../../providers/providers";
import { Observable } from "rxjs/Observable";
/**
 * Generated class for the UnuploadedChallanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-unuploaded-challan",
  templateUrl: "unuploaded-challan.html"
})
export class UnuploadedChallanPage {
  challans: any[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastService: ToastService,
    public violent: ViolentsProvider
  ) {}

  ionViewDidLoad() {
    localForage.getItem("VehicleChallan").then((challans: any[]) => {
      if (challans) {
        this.challans = challans;
      }
    });
  }

  generateChallan(challan: any) {
    if (!challan.ChallanId) {
      this.toastService.showLoader("Generating Challan..");
      const formData = new FormData();
      Object.keys(challan).forEach(key => {
        if (challan[key] instanceof Array) {
          challan[key].forEach((element, index) => {
            formData.append(`${key}[${index}]`, element);
          });
        } else {
          formData.append(key, challan[key]);
        }
      });
      this.violent.generateChallan(formData).subscribe(
        (response: any) => {
          this.toastService.hideLoader();
          localForage.getItem("ChallanPayment").then((data: any[]) => {
            debugger;
            if (data) {
              const paymentObject = data.find(
                element => element.PaymentDate == challan.ChallanDate
              );
              const index = data.findIndex(
                element => element.PaymentDate == challan.ChallanDate
              );
              if (paymentObject) {
                paymentObject["ChallanId"] = response.ChallanId;
                this.sendSMSAndEmail(challan);
                this.challanPayment(paymentObject, index, data).subscribe(
                  success => {},
                  error => {}
                );
              }
            }
          });
          localForage.getItem("VehicleSeized").then((data: any[]) => {
            if (data) {
              const seizedData = data.find(
                element => element.ChallanDate == challan.ChallanDate
              );
              const index = data.findIndex(
                element => element.ChallanDate == challan.ChallanDate
              );
              if (seizedData) {
                seizedData["ChallanId"] = response.ChallanId;
                this.sendSMSAndEmail(challan);
                this.seizeVehicle(seizedData, index, data);
              }
            }
          });
          localForage.getItem("DocSeized").then((data: any[]) => {
            if (data) {
              const seizedData = data.find(
                element => element.ChallanDate == challan.ChallanDate
              );
              const index = data.findIndex(
                element => element.ChallanDate == challan.ChallanDate
              );
              if (seizedData) {
                seizedData["ChallanId"] = response.ChallanId;
                this.sendSMSAndEmail(challan);
                this.seizeDocs(seizedData, index, data);
              }
            }
          });

          this.challans.splice(this.challans.indexOf(challan), 1);
          localForage.removeItem("VehicleChallan");
          localForage.setItem("VehicleChallan", this.challans);
        },
        (error: any) => {
          this.toastService.hideLoader();
        }
      );
    } else {
      localForage.getItem("ChallanPayment").then((data: any[]) => {
        if (data) {
          const paymentObject = data.find(
            element => element.ChallanId == challan.ChallanId
          );
          const index = data.findIndex(
            element => element.ChallanId == challan.ChallanId
          );
          if (paymentObject) {
            this.challanPayment(paymentObject, index, data).subscribe(r => {
              this.challans.splice(this.challans.indexOf(challan), 1);
              localForage.removeItem("VehicleChallan");
              localForage.setItem("VehicleChallan", this.challans);
            });
          }
        }
      });
    }
  }

  challanPayment(paymentObject, index: number, data: any[]) {
    return new Observable(subscriber => {
      this.toastService.showLoader("Saving Payment detail..");
      this.violent.challanPayment(paymentObject).subscribe(
        response => {
          this.toastService.hideLoader();
          this.toastService.showToast("Payment Done.");
          // challan['PaymentId'] = paymentObject.PaymentId;
          // challan.PaymentStatus ='';
          // challan.VehicleSeizeStatus='';
          // challan.DocsSeizeStatus ='';
          data.splice(index, 1);
          localForage.removeItem("ChallanPayment");
          localForage.setItem("ChallanPayment", data);
          subscriber.next(response);
        },
        err => {
          this.toastService.hideLoader();
          data[index] = paymentObject;
          localForage.removeItem("ChallanPayment");
          localForage.setItem("ChallanPayment", data);
          subscriber.error(err);
        }
      );
    });
  }

  seizeVehicle(seizedData: any, index: number, data: any[]): any {
    this.toastService.showLoader("Vehicle Seized..");
    const fd = new FormData();
    Object.keys(seizedData).forEach(key => {
      if (seizedData[key] instanceof Array) {
        seizedData[key].forEach((element, index) => {
          fd.append(`${key}[${index}]`, element);
        });
      } else {
        fd.append(key, seizedData[key]);
      }
    });
    this.violent.vehicleSeize(fd).subscribe(
      res => {
        this.toastService.hideLoader();
        data.splice(index, 1);
        localForage.removeItem("VehicleSeized");
        localForage.setItem("VehicleSeized", data);
      },
      err => {
        this.toastService.hideLoader();
        data[index] = seizedData;
        localForage.removeItem("VehicleSeized");
        localForage.setItem("VehicleSeized", data);
      }
    );
  }

  seizeDocs(seizedData: any, index: number, data: any[]): any {
    this.toastService.showLoader("Document Seized..");
    const fd = new FormData();
    Object.keys(seizedData).forEach(key => {
      if (seizedData[key] instanceof Array) {
        seizedData[key].forEach((element, index) => {
          fd.append(`${key}[${index}]`, element);
        });
      } else {
        fd.append(key, seizedData[key]);
      }
    });
    this.violent.vehicleSeize(fd).subscribe(
      res => {
        this.toastService.hideLoader();
        data.splice(index, 1);
        localForage.removeItem("DocSeized");
        localForage.setItem("DocSeized", data);
      },
      err => {
        this.toastService.hideLoader();
        data[index] = seizedData;
        localForage.removeItem("DocSeized");
        localForage.setItem("DocSeized", data);
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
      ViolationAct: challanObject.violations,
      TotalFine: challanObject.amount,
      PaymentStatus: "",
      SeizeStatus: "",
      MailRecipent: ""
    };
    if (challanObject.PaymentStatus)
      object["PaymentStatus"] =
        challanObject.PaymentStatus == "P" ? "Pending" : "Success";
    else if (challanObject.DocsSeizeStatus)
      object["SeizeStatus-"] = "Documents";
    else if (challanObject.VehicleSeizeStatus)
      object["SeizeStatus-"] = "Vehicle";

    if (challanObject.EmailId && this.validateEmail(challanObject.EmailId)) {
      object["MailRecipent"] = challanObject.EmailId;
      this.violent.sendEmail(object).subscribe(response => {});
    }
    if (challanObject.MobileNumber) {
      object["MailRecipent"] = "";
      this.violent.sendSMS(object).subscribe(response => {});
    }
  }

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
}
