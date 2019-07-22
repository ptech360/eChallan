import { Component, AfterContentInit, AfterViewInit } from "@angular/core";
import {
  NavController,
  NavParams,
  LoadingController,
  Loading,
  ModalController
} from "ionic-angular";
import {
  FormBuilder,
  FormGroup,
  Validators
} from "../../../node_modules/@angular/forms";
import { AddViolationComponent } from "../add-violation/add-violation";
/**
 * Generated class for the VehicleDetailComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "vehicle-detail",
  templateUrl: "vehicle-detail.html"
})
export class VehicleDetailComponent implements AfterViewInit{
  text: string;
  violenter: any = {};

  collpases={
    c1:false,
    c2:false
  };

  violationForm: FormGroup;
  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public navParam: NavParams,
    public fb: FormBuilder
  ) {
    this.violationForm = this.fb.group({
      BodyType: [""],
      ChassisNo: ["", [Validators.pattern("^[a-zA-Z0-9]+(s{0,1}[a-zA-Z])*$")]],
      Colour: [""],
      EngNo: ["", [Validators.pattern("^[a-zA-Z0-9]+(s{0,1}[a-zA-Z])*$")]],
      FatherName: ["", [Validators.pattern("^[a-zA-Z-,]+(s{0,1}[a-zA-Z-, ])*$")]],
      MakerModel: [""],
      EmailId: ["", [Validators.pattern("^(([^<>()\[\]\\.,;:\s@]+(\.[^<>()\[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$")]],
      MobileNumber: ["", [Validators.required, Validators.pattern("[0-9]{10}")]],
      OwnerName: ["", [Validators.required, Validators.pattern("^[a-zA-Z-,]+(s{0,1}[a-zA-Z-, ])*$")]],
      PastViolationCount: [0],
      PastViolations: [],
      OwnerAddress: ["", [Validators.required]],
      RegnDate: [""],
      VehicleClass: [""],
      VehicleNo: [
        "",
        [
          Validators.required,
          Validators.pattern("^[A-Z]{2}[0-9]{1,2}[A-Z]{1,2}?[0-9]{4}$")
        ]
      ]
    });
  }

  ionViewDidLoad() {
    this.violenter = this.navParam.get("data");
    this.violationForm.patchValue(this.violenter);
  }
  
  ngAfterViewInit(){
    
  }

  addViolation() {
    this.navCtrl.push(AddViolationComponent, {
      data: this.violationForm.value
    });
  }

  onCollapse(div:HTMLElement){
    console.log(div);
    div.classList.toggle('collapse_hide');
    
    //this.collpases[c]= !this.collpases[c];
    // div.classList.toggle('collapse_in_out');
  }
}
