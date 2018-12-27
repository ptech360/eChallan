import { Component } from "@angular/core";
import { NavParams, ViewController, NavController } from "ionic-angular";
import { ReceiptPage } from "../../receipt/receipt";
import { ViolentsProvider } from "../../../providers/violents/violents";
import { Camera, CameraOptions } from "@ionic-native/camera";
import { ToastService } from "../../../providers/toast/toast.service";



@Component({
    selector: 'page-seize',
    templateUrl: 'seize-modal.html',
})
export class SeizeModal {

    cameraOptions: CameraOptions = {
        sourceType: this.camera.PictureSourceType.CAMERA,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        correctOrientation: true
    };

    object: any;
    vehicleTypeId: any;
    currentViolents;
    charge;
    violenter;
    documentName;
    documentID;
    vehicleName;
    vehicleColor;
    vehicleNumber
    challanObject: any = {};
    vehicleImages: any = [];
    vehicleUrls: any = [];
    documentUrls: any = [];
    vehicleTypes: any = [];
    documentImages: any = [];
    vehicleDocs: any = [];
    docsIds: any = [];
    docsInputIds: any = [];
    selectedVehicleDocs: any = [];

    constructor(public navParams: NavParams,
        public viewCtrl: ViewController,
        public navCtrl: NavController,
        private camera: Camera,
        public violentService: ViolentsProvider,
        public toastService: ToastService
    ) {
        this.challanObject = this.navParams.get('challanObject');
        this.getVehicleType();
        this.getVehicleDocs();
    }

    ionViewDidLoad() {
        this.object = this.navParams.get('data')
        // this.currentViolents = this.navParams.get('currentViolents')  
        // this.charge = this.navParams.get('charge')  
        // this.violenter = this.navParams.get('violenter') 

    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

    seizeVehicle() {
        const formData = new FormData();
        formData.append('ChallanId', this.challanObject.ChallanId);
        formData.append('VehicleTypId', this.vehicleTypeId);
        formData.append('VehicleName', this.vehicleName);
        formData.append('VehicleImage', this.vehicleImages);

        this.violentService.vehicleSeize(formData).subscribe(response => {
            this.challanObject.seizedVehicle = response;
            this.toastService.showToast('Vehicle Seized');
            this.viewCtrl._nav.popAll();
        }, (error) => {
            if (error.status === 401)
                this.viewCtrl._nav.popAll();
        });
    }

    seizeDocument() {
        const formData = new FormData();
        formData.append('ChallanId', this.challanObject.ChallanId);
        formData.append('DocsId', this.docsIds);
        formData.append('DocsInputId', this.docsInputIds);
        formData.append('DocsImage', this.documentImages);

        this.violentService.documentSeize(formData).subscribe(response => {
            this.challanObject.seizedDocument = response;
            this.toastService.showToast('Documents Seized');
            this.viewCtrl._nav.popAll();
        }, (error) => {
            if (error.status === 401)
                this.viewCtrl._nav.popAll();
        });
    }

    private captureVehicle() {
        this.camera.getPicture(this.cameraOptions).then((onSuccess) => {
            this.vehicleUrls.push('data:image/jpeg;base64,' + onSuccess);
            const fileName: string = 'vehicle-img' + new Date().toISOString().substring(0, 10) + new Date().getHours() + new Date().getMinutes() + new Date().getSeconds() + '.jpeg';
            this.vehicleImages.push(this.dataURLtoFile('data:image/jpeg;base64,' + onSuccess, fileName));
        }, (error) => {

        });
    }

    private captureDocument() {
        this.camera.getPicture(this.cameraOptions).then((onSuccess) => {
            this.documentUrls.push('data:image/jpeg;base64,' + onSuccess);
            const fileName: string = 'doc-img' + new Date().toISOString().substring(0, 10) + new Date().getHours() + new Date().getMinutes() + new Date().getSeconds() + '.jpeg';
            this.documentImages.push(this.dataURLtoFile('data:image/jpeg;base64,' + onSuccess, fileName));
        }, (error) => {

        });
    }

    dataURLtoFile(dataurl, filename) {
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    }

    delDocImage(index: number) {
        this.documentUrls.splice(index, 1);
        this.documentImages.splice(index, 1);
    }

    delVehicleImage(index: number) {
        this.vehicleUrls.splice(index, 1);
        this.vehicleImages.splice(index, 1);
    }

    getVehicleType() {
        this.violentService.vehicleType().subscribe(response => {
            this.vehicleTypes = response;
            console.log(response);
        })
    }

    getVehicleDocs() {
        this.violentService.VehicleDocs().subscribe(response => {
            this.vehicleDocs = response;
            console.log(response);

        })
    }

}