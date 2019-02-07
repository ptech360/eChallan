import { App, Events } from 'ionic-angular';
import { NetworkProvider } from '../providers/network/network';
import { HomePage } from '../pages/home/home';
import { User } from '../providers/user/user';
import { ToastService } from '../providers/toast/toast.service';
import { LoginComponent } from '../components/login/login';
import * as localForage from 'localforage';
import { ViolentsProvider } from '../providers/violents/violents';
export class Activity {
  rootPage: any;
  constructor(
    public events: Events,
    public appCtrl: App,
    public authProvider: User,
    public networkProvider: NetworkProvider,
    public toastProvider: ToastService,
    public violent: ViolentsProvider
  ) {
    this.handleEvents();
    this.networkProvider.checkNetworkStatus();
    this.isLoggedIn();
  }

  handleEvents() {
    this.events.subscribe('user:login', () => {
      console.log("login");
      this.sync()
      this.login();
    });

    this.events.subscribe('user:logout', () => {
      this.logout();
    });
    this.events.subscribe("offline", () => {
      this.offline();
    });
    this.events.subscribe("online", () => {
      this.online();
    });
  }
  public logout() {
    localStorage.removeItem('ngStorage-token');
    localStorage.removeItem('user-detail');
    this.rootPage = LoginComponent;
  }

  public offline() {
    this.toastProvider.showToast('You are offline', 'top', true);

  }

  public online() {
    this.toastProvider.showToast('Back Online', 'top', true);
    this.sync();
  }

  public sync(){
    localForage.getItem('VehicleSeized').then((data: any[]) => {
      if(data){
        data.forEach((element,index) => {
          if(element.ChallanId){
            this.seizeVehicle(element,index,data);
          }
        });
      }
    });
    localForage.getItem('DocSeized').then((data: any[]) => {
      if(data){
        data.forEach((element,index) => {
          if(element.ChallanId){
            this.seizeDocs(element,index,data);
          }
        });
      }
    });
    localForage.getItem('ChallanPayment').then((data: any[]) => {
      if(data){
        data.forEach((element,index) => {
          if(element.ChallanId){
            this.challanPayment(element,index,data);
          }
        });
      }
    });
    localForage.getItem('VehicleChallan').then((challans: any[]) => {
      console.log(challans);

      // const vahanChallans = new FormData();
      // if(challans){
      //   challans.forEach((challan, indx) => {
      //     Object.keys(challan).forEach(key => {
      //       if (challan[key] instanceof Array) {
      //         challan[key].forEach((element,index) => {
      //           vahanChallans.append(`vahanChallans[${indx}].${key}[${index}]`, element);
      //         });
      //       } else {
      //         vahanChallans.append(`vahanChallans[${indx}].${key}`,challan[key]);
      //       }
      //     });
      //   });
      //   this.violent.generateOfflineChallan(vahanChallans).subscribe((response: any) => {
      //     localForage.removeItem('VehicleChallan');
      //   }, (error: any) =>{            

      //   });
      // }
      
      if (challans) {
        challans.forEach(challan => {
          const formData = new FormData();
          Object.keys(challan).forEach(key => {
            if (challan[key] instanceof Array) {
              challan[key].forEach((element, index) => {
                formData.append(`${key}[${index}]`, element);
              });
            } else {
              formData.append(key, challan[key]);
            }
          });
          this.violent.generateChallan(formData).subscribe((response: any) => {
            localForage.getItem('VehicleSeized').then((data: any[]) => {
              if(data){
                const seizedData = data.find(element => element.ChallanDate == challan.ChallanDate);
                const index = data.findIndex(element => element.ChallanDate == challan.ChallanDate);
                if (seizedData) {
                  seizedData['ChallanId'] = response.ChallanId;
                  this.seizeVehicle(seizedData, index,  data);
                }
              }
            });
            localForage.getItem('DocSeized').then((data: any[]) => {
              if(data){
                const seizedData = data.find(element => element.ChallanDate == challan.ChallanDate);
                const index = data.findIndex(element => element.ChallanDate == challan.ChallanDate);
                if (seizedData) {
                  seizedData['ChallanId'] = response.ChallanId;
                  this.seizeDocs(seizedData, index, data);
                }
              }
            });
            localForage.getItem('ChallanPayment').then((data: any[]) => {
              if(data){
                const paymentObject = data.find(element => element.PaymentDate == challan.ChallanDate);
                const index = data.findIndex(element => element.PaymentDate == challan.ChallanDate);
                if (paymentObject) {
                  paymentObject['ChallanId'] = response.ChallanId;
                  this.challanPayment(paymentObject, index, data);
                }
              }
            });
            challans.splice(challans.indexOf(challan), 1);
            localForage.removeItem('VehicleChallan');
            localForage.setItem('VehicleChallan', challans);
          }, (error: any) => {
            localForage.removeItem('VehicleChallan');
            localForage.setItem('VehicleChallan', challans);
          });
        });
      }
    })
  }

  challanPayment(paymentObject, index:number, data: any[]){
    this.violent.challanPayment(paymentObject).subscribe(response => {
      this.toastProvider.showToast("Payment Done for offline challan.");
      // challan['PaymentId'] = paymentObject.PaymentId;
      // challan.PaymentStatus =''; 
      // challan.VehicleSeizeStatus=''; 
      // challan.DocsSeizeStatus ='';
      data.splice(index, 1);
      localForage.removeItem('ChallanPayment');
      localForage.setItem('ChallanPayment', data);
    },err=>{
      data[index] = paymentObject;
      localForage.removeItem('ChallanPayment');
      localForage.setItem('ChallanPayment', data);
    })
  }

  seizeVehicle(seizedData: any, index:number, data: any[]): any {
    const fd = new FormData();
    Object.keys(seizedData).forEach(key => {
      if (seizedData[key] instanceof Array) {
        seizedData[key].forEach((element, index) => {
          fd.append(`${key}[${index}]`, element);
        });
      } else {
        fd.append(key, seizedData[key]);
      }
    });
    this.violent.vehicleSeize(fd).subscribe(res => {
      data.splice(index, 1);
      localForage.removeItem('VehicleSeized');
      localForage.setItem('VehicleSeized', data);
    }, err => {
      data[index] = seizedData;
      localForage.removeItem('VehicleSeized');
      localForage.setItem('VehicleSeized', data);
    });
  }

  seizeDocs(seizedData: any, index:number, data: any[]): any {
    const fd = new FormData();
    Object.keys(seizedData).forEach(key => {
      if (seizedData[key] instanceof Array) {
        seizedData[key].forEach((element, index) => {
          fd.append(`${key}[${index}]`, element);
        });
      } else {
        fd.append(key, seizedData[key]);
      }
    });
    this.violent.vehicleSeize(fd).subscribe(res => {
      data.splice(index, 1);
      localForage.removeItem('DocSeized');
      localForage.setItem('DocSeized', data);
    }, err => {
      data[index] = seizedData;
      localForage.removeItem('DocSeized');
      localForage.setItem('DocSeized', data);
    });
  }

  login(): any {
    this.rootPage = HomePage;
  }

  isLoggedIn() {
    if (this.authProvider.isLoggedIn()) {
      this.rootPage = HomePage;
    } else {
      this.rootPage = LoginComponent;
    }
  }
}