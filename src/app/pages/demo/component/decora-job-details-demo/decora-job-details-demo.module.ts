import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecoraJobDetailsDemoComponent } from './decora-job-details-demo.component';
import { DecoraJobDetailsDemoRoutingModule } from './decora-job-details-demo-routing.module';
import { DecJobDetailsModule } from '@projects/decora/browser-lib-ui/src/public_api';

@NgModule({
  declarations: [
    DecoraJobDetailsDemoComponent
  ],
  imports: [
    CommonModule,
    DecoraJobDetailsDemoRoutingModule,
    DecJobDetailsModule
  ],
  exports: [
    DecoraJobDetailsDemoComponent
  ]
})
export class DecoraJobDetailsDemoModule { }
