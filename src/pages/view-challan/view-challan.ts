import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, Events } from "ionic-angular";
import { ViolentsProvider } from "../../providers/providers";
import { PrintReceiptPage } from "../print-receipt/print-receipt";
import { ToastService } from "../../providers/toast/toast.service";
import * as localForage from "localforage";
/**
 * Generated class for the ViewChallanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-view-challan",
  templateUrl: "view-challan.html"
})
export class ViewChallanPage {
  date: any = {
    fromDate: this.getFromTime(),
    toDate: this.getCorrectISOStringDate()
  };
  challans: any = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public violenterService: ViolentsProvider,
    public toastService: ToastService,
    public events: Events
  ) {
    this.getChallan();
  }

  ionViewDidLoad() {
  }

  getChallan() {
    const date: any = {};
    date.fromDate =
      this.date.fromDate.slice(0, -1).slice(0, 10) +
      " " +
      this.date.fromDate.slice(0, -1).slice(11);
    date.toDate =
      this.date.toDate.slice(0, -1).slice(0, 10) +
      " " +
      this.date.toDate.slice(0, -1).slice(11);
    this.toastService.showLoader("Getting..");
    this.violenterService.getChallanByDate(date).subscribe(
      response => {
        this.toastService.hideLoader();
        this.challans = response;
      },
      error => {
        if (error.status === 401) {
          this.events.publish("user:logout");
        }
        this.toastService.hideLoader();
      }
    );
  }

  getChallanDetail(challan) {
    const violations = [];
    const currentViolents: any[] = challan.PastViolations.filter(c => {
      if (c.ChallanId === challan.ChallanId) {
        violations.push(c.ViolationDesc);
        challan["LocationName"] = c.LocationName;
      }
      return c.ChallanId === challan.ChallanId;
    });
    challan["amount"] = challan.TotalFine;
    challan["violations"] = violations;
    this.navCtrl.push(PrintReceiptPage, {
      data: challan,
      currentViolents: currentViolents
    });
  }

  getCorrectISOStringDate() {
    /**new Date().toISOString returns incorrrect time( by ignoring the time zone)
     * hence, this method has been made to get the correct isoString time
     */
    let today: any = new Date();
    today.setHours(today.getHours());
    let tzoffset = new Date().getTimezoneOffset() * 60000; //offset in milliseconds
    return new Date(today - tzoffset).toISOString().slice(0, -5) + "Z";
  }

  getFromTime() {
    let today: any = new Date();
    today.setHours(today.getHours());
    today.setDate(today.getDate() - 1);
    // today.setHours(5);
    // today.setMinutes(0);
    // today.setSeconds(0);
    let tzoffset = new Date().getTimezoneOffset() * 60000; //offset in milliseconds
    return new Date(today - tzoffset).toISOString().slice(0, -5) + "Z";
  }
}
