import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login';
import { GenerateChallanComponent } from './generate-challan/generate-challan';
import { AddViolationComponent } from './add-violation/add-violation';

@NgModule({
	declarations: [LoginComponent,
    GenerateChallanComponent,
    AddViolationComponent],
	imports: [],
	exports: [LoginComponent,
    GenerateChallanComponent,
    AddViolationComponent,]
})
export class ComponentsModule {}
