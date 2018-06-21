import { NgModule } from '@angular/core';
import { BaseHttpService } from './base-http/base-http.service';

const apiServices = [BaseHttpService];

@NgModule({
  declarations: apiServices,
  exports: apiServices,
})
export class ApiModule {}
