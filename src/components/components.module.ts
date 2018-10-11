import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login';
import { GenerateChallanComponent } from './generate-challan/generate-challan';
import { AddViolationComponent } from './add-violation/add-violation';
import { ProfileComponent } from './profile/profile';
import { NoRecordsComponent } from './no-records/no-records';
import { VehicleDetailComponent } from './vehicle-detail/vehicle-detail';

@NgModule({
  declarations: [
    LoginComponent,
    GenerateChallanComponent,
    AddViolationComponent,
    ProfileComponent,
    NoRecordsComponent,
    VehicleDetailComponent
  ],
  imports: [CommonModule],
  exports: [
    LoginComponent,
    GenerateChallanComponent,
    AddViolationComponent,
    ProfileComponent,
    NoRecordsComponent,
    VehicleDetailComponent
  ]
})
export class ComponentsModule {}
