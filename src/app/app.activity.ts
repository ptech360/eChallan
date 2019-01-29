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
    localStorage.setItem('ngStorage-token','');
    this.rootPage = LoginComponent;
  }

  public offline() {
    this.toastProvider.showToast('You are offline', 'top', true);

  }

  public online() {
    this.toastProvider.showToast('Back Online', 'top', true);
    localForage.getItem('VehicleChallan').then((challans: any[]) => {
      if(challans){
        challans.forEach(challan => {
          const formData = new FormData();
          challan.files.forEach((file:any) => {
            formData.append('file',file);
          });
          delete challan.files;
          Object.keys(challan).forEach(element => {
            formData.append(element,challan[element]);
          });
          this.violent.generateChallan(formData).subscribe((response: any) => {
            challans.splice(challans.indexOf(challan),1);
            localForage.setItem('VehicleChallan',challans);
          }, (error: any) =>{
            
            
          });
        });
      }
    })
  }
  login(): any {
    this.rootPage = HomePage;
  }

  isLoggedIn() {
    if(this.authProvider.isLoggedIn()){
      this.rootPage = HomePage;
    } else {
      this.rootPage = LoginComponent;
    }
  }
}