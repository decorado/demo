import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DecoraProductsFeaturesDemoRoutingModule } from './decora-products-features-demo-routing.module';
import { DecoraProductsFeaturesDemoComponent } from './decora-products-features-demo.component';
import { DecProductFeaturesModule } from '@projects/decora/browser-lib-ui/src/public_api';

@NgModule({
  imports: [
    CommonModule,
    DecoraProductsFeaturesDemoRoutingModule,
    DecProductFeaturesModule
  ],
  declarations: [
    DecoraProductsFeaturesDemoComponent
  ],
  exports: [
    DecoraProductsFeaturesDemoComponent
  ]
})
export class DecoraProductsFeaturesDemoModule { }
