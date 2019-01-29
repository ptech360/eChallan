import { App, Events } from 'ionic-angular';
import { NetworkProvider } from '../providers/network/network';
import { HomePage } from '../pages/home/home';
import { User } from '../providers/user/user';
import { ToastService } from '../providers/toast/toast.service';
import { LoginComponent } from '../components/login/login';

export class Activity {
  rootPage: any;
  constructor(
    public events: Events,
    public appCtrl: App,
    public authProvider: User,
    public networkProvider: NetworkProvider,
    public toastProvider: ToastService,
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