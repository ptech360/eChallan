import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
@Injectable()
export class StorageService {
  isToken: Subject<boolean> = new Subject<boolean>();
  constructor() {
    if(this.getData('ngStorage-token'))
      this.isToken.next(true);
    else
      this.isToken.next(false);
  }


  public storeData(field_name: any, data: any) {
    localStorage.setItem(field_name, JSON.stringify(data));
  }

  public getData(field_name: any) {
    const data = JSON.parse(localStorage.getItem(field_name));
    if (data) {
      return data;
    } else {
      return null;
    }
  }

  clearData() {
    const imei = this.getData('IMEI');
    localStorage.clear();
    this.storeData('IMEI',imei)
    this.isToken.next(false);
  }
}
