import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/of';
import { Injectable } from '@angular/core';

import { Api } from '../api/api';
import { StorageService } from '../localstorage/storage';
import { Observable } from '../../../node_modules/rxjs/Observable';

/**
 * Most apps have the concept of a User. This is a simple provider
 * with stubs for login/signup/etc.
 *
 * This User provider makes calls to our API at the `login` and `signup` endpoints.
 *
 * By default, it expects `login` and `signup` to return a JSON object of the shape:
 *
 * ```json
 * {
 *   status: 'success',
 *   user: {
 *     // User fields your app needs, like "id", "name", "email", etc.
 *   }
 * }Ø
 * ```
 *
 * If the `status` field is not `success`, then an error is detected and returned.
 */
@Injectable()
export class User {
  _user: any;
  accountInfo: any;
  appInfo: any;

  constructor(public api: Api, public localStorage: StorageService) { 
  }

  /**
   * Send a POST request to our login endpoint with the data
   * the user entered on the form.
   */
  login(accountInfo: any) {
    this.accountInfo = accountInfo;
    this.accountInfo['IMEI'] = this.localStorage.getData('IMEI');
    return this.api.post('GetToken', accountInfo).map(response => {
      this._loggedIn(response);
      return response;
    });
  }

  /**
   * Send a POST request to our signup endpoint with the data
   * the user entered on the form.
   */
  signup(accountInfo: any) {
    let seq = this.api.post('signup', accountInfo);

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.status == 'success') {
        this._loggedIn(res);
      }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }

  /**
   * Log the user out, which forgets the session
   */
  logout() {

  }

  /**
   * Process a login/signup response to store user data
   */
  _loggedIn(resp) {
    this.localStorage.storeData('ngStorage-token', resp.Token);
    this.localStorage.storeData('user-detail', resp.userDetails);
    this.localStorage.storeData('IMEI',this.accountInfo.IMEI);
  }

  isLoggedIn(){
    if(this.localStorage.getData('ngStorage-token')){
      return true;
    } else {
      return false;
    }
  }

  getAppInfo(){
    return this.api.get('ProjectLogo');
    // if(this.appInfo){
    //   return Observable.of(this.appInfo);
    // }else{
    //   return this.api.get('ProjectLogo').map(response => this.appInfo = response);
    // }
  }
  
}
