import { Component,OnInit } from '@angular/core';
import { IonicPage, ViewController, NavParams } from 'ionic-angular';
import { ChartProvider } from '../../providers/chart/chart';
import { Observable } from '../../../node_modules/rxjs/Observable';

declare let google: any;
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

  public violenter = {};
  violents: string;
  violentOpts: { title: string, subTitle: string };

  constructor(public viewCtrl: ViewController, public navParams:NavParams,
              public chartService:ChartProvider
  ) {
  }

  ngOnInit() {
    var timmer = Observable.interval(1000).subscribe((val) => {
      if(google){
        google.charts.load('current', {packages: ['corechart', 'bar']});
        google.charts.setOnLoadCallback(this.chartService.violstionChart);
        timmer.unsubscribe();
      }
    });

    this.violentOpts = {
      title: 'Violents Made',
      subTitle: 'Select violents to display'
    };
  }

  ionViewDidLoad() {
      this.violenter = this.navParams.get('data');
      console.log(this.violenter);
      
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  stpSelect() {
    console.log('STP selected');
  }

}
