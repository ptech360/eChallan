import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login';
import { GenerateChallanComponent } from './generate-challan/generate-challan';

@NgModule({
	declarations: [LoginComponent,
    GenerateChallanComponent],
	imports: [],
	exports: [LoginComponent,
    GenerateChallanComponent,]
})
export class ComponentsModule {}
