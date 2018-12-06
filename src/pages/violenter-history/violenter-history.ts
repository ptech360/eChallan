import { Component,OnInit } from '@angular/core';
import { IonicPage, ViewController, NavParams } from 'ionic-angular';
import { ChartProvider } from '../../providers/chart/chart';
import { Observable } from '../../../node_modules/rxjs/Observable';
import { ViolentsProvider } from '../../providers/violents/violents';

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
  private violencListCopy = [];
  public violencList = [];
  violentsList: any = [];

  constructor(public viewCtrl: ViewController, public navParams:NavParams,public violent:ViolentsProvider,
  ) {
  }

  ngOnInit() {
    // var timmer = Observable.interval(1000).subscribe((val) => {
    //   if(google){
    //     google.charts.load('current', {packages: ['corechart', 'bar']});
    //     google.charts.setOnLoadCallback(this.chartService.violstionChart);
    //     timmer.unsubscribe();
    //   }
    // });

    this.violentOpts = {
      title: 'Violents Made',
      subTitle: 'Select violents to display'
    };

    this.getViolents();
  }

  ionViewDidLoad() {
      this.violenter = this.navParams.get('data');
      this.violencList = this.violenter['PastViolations'];
      this.violencListCopy = this.violencList;
      
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  stpSelect() {
    console.log('STP selected');
  }

  filterHistory(event:any[]){
    if(event.length)
      this.violencList = this.violencListCopy.filter(v => {
        return (event.indexOf(v.ViolationId)> -1);
      })
    else
      this.violencList = this.violencListCopy;
  }

  getViolents(){
    this.violent.getViolents().subscribe(response => {
      this.violentsList = response;
    })
  }

}
