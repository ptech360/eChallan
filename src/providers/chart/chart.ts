import { Injectable } from '@angular/core';
import { Api } from '../api/api';

declare var google: any;
/*
  Generated class for the ChartProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ChartProvider {

  constructor(public api: Api) {
    console.log('Hello ChartProvider Provider');
  }

  violstionChart(){  var data = google.visualization.arrayToDataTable([
    ['Violent', '#Charges'],
    ['Red Signal',     11],
    ['No Helmet',      20],
    ['No Papers',  5],
    ['Overspeeding', 30],
  ]);

  var options = {
    // 'legend':'bottom',
    vAxis: {maxValue: 50},
                chartArea: {width: '100%'},
    is3D: true,
    colors:['#ea4b59','#f0954f','#ffe902','#bccf01','#64c6ef','#009fe3','#c066a7'],
    animation: {
      "startup": true,
      duration: 600,
      easing: 'in-out'
    }
  };

  var chart = new google.visualization.PieChart(document.getElementById('violents_piechart'));

  chart.draw(data, options);

}
}