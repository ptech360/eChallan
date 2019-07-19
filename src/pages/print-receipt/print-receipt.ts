import { Component, OnInit, ViewChild } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController,
  ModalController,
  Navbar,
  Platform,
  App,
  ActionSheetController
} from "ionic-angular";
import { Printer, PrintOptions } from '@ionic-native/printer';
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
declare var window: any;
declare var cordova: any;

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
    private platform: Platform,
    public appCtrl: App,
    private printer: Printer,
    public actionSheetCtrl: ActionSheetController
  ) { }

  ngOnInit() { }

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
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Printer',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Internal Printer',
          // role: 'destructive',
          // icon: !this.platform.is('ios') ? 'trash' : null,
          handler: () => {
            this.printUsingIdPayPrint();
          }
        },
        {
          text: 'External Printer',
          // icon: !this.platform.is('ios') ? 'share' : null,
          handler: () => {
            this.printUsingIonicPrinter();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel', // will always sort to be on the bottom
          // icon: !this.platform.is('ios') ? 'close' : null,
          handler: () => {
          }
        }
      ]
    });
    actionSheet.present();
  }

  printUsingIdPayPrint() {
    const response = IdPayPrint(
      "",
      $(this.printContent.nativeElement)[0].innerText
    );
    let that = this;
    parseString(response, function (err, result) {
      if (result && result.Response.ResponseCode[0] === "1000") {
        // that.dismiss();
        // that.navCtrl.popToRoot();
      } else if (err) {
        alert(err.Error.ErrorMessage[0]);
        // that.navCtrl.popToRoot();
      }
    });
  }


  printUsingIonicPrinter() {
    let options: PrintOptions = {
      name: 'MyDocument',
      printerId: 'printer007',
      duplex: false,
      landscape: false,
      grayscale: false
    };

    this.printer.print(this.printContent.nativeElement.innerText, options).then((onSuccess) => {
      // this.dismiss();
      // this.navCtrl.popToRoot();
    }, (onError) => {
      alert(onError);
      // this.navCtrl.popToRoot();
    });
  }

  pay() {
    const violenterModal = this.modalCtrl.create(PaymentGatewayPage, {
      data: this.printScriptObject,
      currentViolations: this.currentViolations
    });
    violenterModal.present();
    violenterModal.onDidDismiss(() => { });
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
    // this.viewCtrl.dismiss();


    this.navCtrl.popToRoot();
  }

  overrideBackBtnFunctionality() {
    /**overides the defult behaviour of navbar back btn
     * Show an alert stating: 'any filled data in form will be lost on going back'
     */
    this.navBar.backButtonClick = (ev: any) => {
      ev.preventDefault();
      ev.stopPropagation();
      if (this.navCtrl.getPrevious().component.name == "ViewChallanPage")
        this.navCtrl.pop();
      else
        this.navCtrl.popToRoot();
    };
  }

  saveChallanAsPdf() {
    const options = {
      documentSize: 'A4',
      type: 'base64'
    };

    const pdfhtml = this.printContent.nativeElement.innerHTML;

    cordova.plugins.pdf.fromData(pdfhtml, options)
      .then((base64) => {
        // To define the type of the Blob
        const contentType = "application/pdf";

        // if cordova.file is not available use instead :
        const folderpath = "file:///storage/emulated/0/Download/";
        // const folderpath = cordova.file.externalRootDirectory + "Download/"; //you can select other folders
        this.savebase64AsPDF(folderpath, this.printScriptObject.ChallanId + '.pdf', base64, contentType);
      })
      .catch((err) => console.error(err));
  }

  // Create a PDF file according to its database64 content only.
  savebase64AsPDF(folderpath, filename, content, contentType) {
    // Convert the base64 string in a Blob
    const DataBlob = this.b64toBlob(content, contentType);
    window.resolveLocalFileSystemURL(folderpath, (dir) => {
      console.log("Access to the directory granted succesfully");
      dir.getFile(filename, { create: true }, (file) => {
        console.log("File created succesfully.");
        file.createWriter((fileWriter) => {
          console.log("Writing content to file");
          fileWriter.write(DataBlob);
          this.toastService.showToast('Challan PDF is successfully saved in' + folderpath);
        }, () => {
          this.toastService.showToast('Unable to save file in path ' + folderpath);
        });
      });
    });
  }

  // Convert a base64 string in a Blob according to the data and contentType.
  b64toBlob(b64Data, contentType, sliceSize?: any) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }
}
