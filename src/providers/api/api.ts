import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Events, AlertController } from 'ionic-angular';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { StorageService } from '../localstorage/storage';

/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable()
export class Api {
  url: string = 'http://182.75.23.86:8001';

  constructor(public http: HttpClient, public localStorage:StorageService, public events:Events, public alertCtrl: AlertController) {
  }

  getHeaders(optHeaders?: HttpHeaders) {
    let headers = new HttpHeaders();
    if (this.localStorage.getData('ngStorage-token')) {
      headers = headers.set('Authorization', 'Bearer ' + this.localStorage.getData('ngStorage-token'));
      headers = headers.set('imei', this.localStorage.getData('IMEI'));
    }
    if (optHeaders) {
      for (const optHeader of optHeaders.keys()) {
        headers = headers.append(optHeader, optHeaders.get(optHeader));
      }
    }
    return headers;
  }

  get(endpoint: string, optHeaders?: HttpHeaders) {
    const headers = this.getHeaders(optHeaders);
    return this.http
      .get(this.url + '/' + endpoint, { headers: headers, observe: 'response' })
      .map(this.extractData)
      .catch(this.handleError);
  }

  post(endpoint: string, body: any, optHeaders?: HttpHeaders) {
    const headers = this.getHeaders(optHeaders);
    return this.http
      .post(this.url + '/' + endpoint, body, {
        headers: headers,
        observe: 'response'
      })
      .map(this.extractData)
      .catch(this.handleError);
  }

  put(endpoint: string, body: any, optHeaders?: HttpHeaders) {
    const headers = this.getHeaders(optHeaders);
    return this.http
      .put(this.url + '/' + endpoint, body, {
        headers: headers,
        observe: 'response'
      })
      .map(this.extractData)
      .catch(this.handleError);
  }

  delete(endpoint: string, optHeaders?: HttpHeaders) {
    const headers = this.getHeaders(optHeaders);
    return this.http
      .delete(this.url + '/' + endpoint, {
        headers: headers,
        observe: 'response'
      })
      .map(this.extractData)
      .catch(this.handleError);
  }

  patch(endpoint: string, body: any, optHeaders?: HttpHeaders) {
    const headers = this.getHeaders(optHeaders);
    return this.http
      .put(this.url + '/' + endpoint, body, {
        headers: headers,
        observe: 'response'
      })
      .map(this.extractData)
      .catch(this.handleError);
  }

  extractData(response: HttpResponse<any>) {
    return response.body || response.status;
  }

  handleError = (errorResponse: HttpErrorResponse) => {
    const err: any = {};
    switch (errorResponse.status) {
      case 401:
        this.showError('Session Expired');
        this.events.publish("session:expired");
        break;
      
      case 0:
        this.showError('You don\'t seem to have an active internet connection. Please connect and try again.' )
        break;
    
      default:
        this.showError('Somthing went wrong');
        break;
    }
    err.status = errorResponse.error
      ? errorResponse.error.status
      : errorResponse.status;
    err.message = errorResponse.error
      ? errorResponse.error.message
        ? errorResponse.error.message
        : errorResponse.error.toString()
      : 'Something went wrong';
    return Observable.throw(err);
  }

  showError(message){
    const alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: message,
      buttons: ['OK']
    })
    alert.present();
  }
}
