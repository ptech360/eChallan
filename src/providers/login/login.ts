
import { Injectable } from '@angular/core';
import { IfObservable } from 'rxjs/observable/IfObservable';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the LoginProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

export class User{
  username: string
  name: string
  phone: number

  constructor(username:string, name:string, phone:number){
    this.name = name
    this.username = username
    this.phone = phone
  }
}
@Injectable()
export class LoginProvider {

  currentUser: User

  constructor() {
  }

  login(credentials){
    if(credentials.phone == null || credentials.password == null){
      return Observable.throw('Please enter all the fields')
    }
    else{
        return Observable.create(observer => {
          let access  = (credentials.phone == '9876543210' && credentials.password == "Abc@123")
          this.currentUser = new User('john','John Cena',9876543210)
          observer.next(access)
          observer.complete()
        })
    }
  }

  getUserInfo() : User {
    return this.currentUser;
  }

  logout(){
    return Observable.create( observer => {
      this.currentUser = null;
      observer.next(true)
      observer.complete()
    })
  }

}
