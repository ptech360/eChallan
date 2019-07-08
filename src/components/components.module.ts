import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login';
import { GenerateChallanComponent } from './generate-challan/generate-challan';
import { AddViolationComponent } from './add-violation/add-violation';
import { ProfileComponent } from './profile/profile';
import { VehicleDetailComponent } from './vehicle-detail/vehicle-detail';

@NgModule({
  declarations: [
    LoginComponent,
    GenerateChallanComponent,
    AddViolationComponent,
    ProfileComponent,
    VehicleDetailComponent
  ],
  imports: [CommonModule],
  exports: [
    LoginComponent,
    GenerateChallanComponent,
    AddViolationComponent,
    ProfileComponent,
    VehicleDetailComponent
  ]
})
export class ComponentsModule { }
