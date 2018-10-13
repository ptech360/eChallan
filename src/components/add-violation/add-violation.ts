import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ViolentsProvider } from '../../providers/violents/violents';
import { PaymentGatewayPage } from '../../pages/payment-gateway/payment-gateway';
import { SeizePage } from '../../pages/seize/seize';

/**
 * Generated class for the AddViolationComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'add-violation',
  templateUrl: 'add-violation.html'
})
export class AddViolationComponent {

  text: string;
  totalCharge:number = 0.0;
  violenter;
  violentOpts: { title: string, subTitle: string };
  currentViolents:any[] = [];
  violentsList:any = [];
  loading: Loading;
  cameraOptions: CameraOptions = {
    sourceType         : this.camera.PictureSourceType.CAMERA,
    destinationType    : this.camera.DestinationType.DATA_URL,
    encodingType       : this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    correctOrientation: true
  };
  imageUrls: any = [];
  files: any = [];


  constructor(public violent:ViolentsProvider,
              public navCtrl:NavController,
              public navParam:NavParams,
              private camera: Camera,
              public generateCtrl:LoadingController
  ) {
    this.showLoading()
    this.violent.getViolents().subscribe(response => {
      this.loading.dismiss();
      this.violentsList = response;
      // this.violenter.PastViolations.forEach(element => {
      //   const createdate:any = new Date(element.createdDate);
      //   const now:any = new Date();
      //   const millisTill10: number = new Date() - createdate;
        
      //   this.violentsList.filter(violent => {

      //   });
      // });
    })
  }

  ionViewDidLoad() {
    this.violenter = this.navParam.get('data'); 
    console.log(this.violenter);
       
  }

  subTotal(){
    for(let i=0;i<this.currentViolents.length;i++){
      this.totalCharge += Number(this.currentViolents[i].ViolationFine);
    }
  }

  payment(){
    this.navCtrl.push(PaymentGatewayPage, { data: this.currentViolents, charge:this.totalCharge, violenter: this.violenter, files:this.files })
  }

  seize(){
    this.navCtrl.push(SeizePage, { data: this.currentViolents, charge:this.totalCharge, violenter: this.violenter });
  }

  showLoading(){
    this.loading =  this.generateCtrl.create({
      content:'getting violents...',
      dismissOnPageChange:true
    })
    this.loading.present()
  }

  private capture(){
    this.camera.getPicture(this.cameraOptions).then((onSuccess)=>{
      this.imageUrls.push('data:image/jpeg;base64,' + onSuccess);
      const fileName:string = 'img'+new Date().toISOString().substring(0,10)+new Date().getHours()+new Date().getMinutes()+new Date().getSeconds()+'.jpeg'; 
      this.files.push(this.dataURLtoFile('data:image/jpeg;base64,' + onSuccess,fileName));
      console.log(this.files);
      
    },(onError)=>{
      alert(onError);
    })
  }

  dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
  }

  delImage(index:number){
    this.imageUrls.splice(index,1);
    this.files.splice(index,1);
  }

}
