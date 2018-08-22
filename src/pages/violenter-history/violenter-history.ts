import { Component,OnInit } from '@angular/core';
import { IonicPage, ViewController, NavParams } from 'ionic-angular';
import { ChartProvider } from '../../providers/chart/chart';

declare var google: any;
/**
 * Generated class for the ViolenterHistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-violenter-history',
  templateUrl: 'violenter-history.html',
})
export class ViolenterHistoryPage implements OnInit {

  public violenter;
  violents: string;
  violentOpts: { title: string, subTitle: string };

  constructor(public viewCtrl: ViewController, public navParams:NavParams,
              public chartService:ChartProvider
  ) {
  }

  ngOnInit() {
    google.charts.load('current', {packages: ['corechart', 'bar']});
    google.charts.setOnLoadCallback(this.chartService.violstionChart);

    this.violentOpts = {
      title: 'Violents Made',
      subTitle: 'Select violents to display'
    };
  }

  ionViewDidLoad() {
      this.violenter = this.navParams.get('data')
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  stpSelect() {
    console.log('STP selected');
  }

}
