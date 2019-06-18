import { Component, OnInit, ViewChild } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController,
  ModalController,
  Navbar,
  Platform
} from "ionic-angular";
import { PaymentGatewayPage } from "../payment-gateway/payment-gateway";
import { ViolentsProvider } from "../../providers/providers";
import { ToastService } from "../../providers/toast/toast.service";
declare let require;
var parseString = require("xml2js").parseString;
/**
 * Generated class for the PrintReceiptPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare let IdPayPrint;
declare let $;

@IonicPage()
@Component({
  selector: "page-print-receipt",
  templateUrl: "print-receipt.html"
})
export class PrintReceiptPage implements OnInit {
  @ViewChild(Navbar) navBar: Navbar; // for overriding backbtn's default functionality
  @ViewChild("printContent") printContent;
  printScriptObject: any = {};
  printData: any = [];
  currentViolations: any;
  unregisterBackButtonActionForAndroid: Function;

  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public violationService: ViolentsProvider,
    public toastService: ToastService,
    private platform: Platform
  ) {}

  ngOnInit() {}

  ionViewDidLoad() {
    this.overrideBackBtnFunctionality();
    this.printScriptObject = this.navParams.get("data");
    this.currentViolations = this.navParams.get("currentViolents");
    Object.keys(this.printScriptObject).forEach(key => {
      this.printData.push(key);
    });
    this.unregisterBackButtonActionForAndroid &&
      this.unregisterBackButtonActionForAndroid();
  }

  private print() {
    const response = IdPayPrint(
      "",
      $(this.printContent.nativeElement)[0].innerText
    );
    let that = this;
    parseString(response, function(err, result) {
      if (result && result.Response.ResponseCode[0] === "1000") {
        // that.dismiss();
        that.navCtrl.popToRoot();
      } else if (err) {
        alert(err.Error.ErrorMessage[0]);
        that.navCtrl.popToRoot();
      }
    });

    // this.printer.print(this.printContent.nativeElement, this.options).then((onSuccess)=>{
    //   this.dismiss();
    //   this.navCtrl.popToRoot();
    // }, (onError) =>{
    // alert(onError);
    // this.navCtrl.popToRoot();
    // });
  }

  pay() {
    const violenterModal = this.modalCtrl.create(PaymentGatewayPage, {
      data: this.printScriptObject,
      currentViolations: this.currentViolations
    });
    violenterModal.present();
    violenterModal.onDidDismiss(() => {
    });
  }

  done() {
    this.navCtrl.popToRoot();
  }

  unseize(object) {
    if (object.VehicleSeizeStatus === "S") {
      this.toastService.showLoader();
      this.violationService.unseizeVehicle(object.ChallanId).subscribe(
        response => {
          this.toastService.hideLoader();
          this.toastService.showToast("Vehicle Unseized");
          object.PaymentStatus = "P";
          object.VehicleSeizeStatus = "";
        },
        error => {
          this.toastService.hideLoader();
        }
      );
    } else if (object.DocsSeizeStatus === "S") {
      this.toastService.showLoader();
      this.violationService.unseizeDocs(object.ChallanId).subscribe(
        response => {
          this.toastService.hideLoader();
          this.toastService.showToast("Docs Unseized");
          object.PaymentStatus = "P";
          object.DocsSeizeStatus = "";
        },
        error => {
          this.toastService.hideLoader();
        }
      );
    }

    object.DocsSeizeStatus = "";
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  overrideBackBtnFunctionality() {
    /**overides the defult behaviour of navbar back btn
     * Show an alert stating: 'any filled data in form will be lost on going back'
     */
    this.navBar.backButtonClick = (ev: any) => {
      ev.preventDefault();
      ev.stopPropagation();
      this.navCtrl.popToRoot();
    };

    /**handle the android hardware back btn for the same purpose*/
    if (this.platform.is("android")) {
      this.unregisterBackButtonActionForAndroid = this.platform.registerBackButtonAction(
        () => {
          // check any overlay like alert overlay, datetime overlay etc
          // if it is present, close that overlay
        },
        1
      );
    }
  }
}
