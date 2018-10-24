import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecoraProductMeasuresComparisonDemoRoutingModule } from './decora-product-measures-comparison-demo-routing.module';
import { DecoraProductMeasuresComparisonDemoComponent } from './decora-product-measures-comparison-demo.component';
import { DecProductMeasuresComparisonModule } from '@projects/decora/browser-lib-ui/src/public_api';
import { DemoContainerModule } from '@app/shared/components/demo-container/demo-container.module';

@NgModule({
  imports: [
    CommonModule,
    DecoraProductMeasuresComparisonDemoRoutingModule,
    DecProductMeasuresComparisonModule,
    DemoContainerModule
  ],
  declarations: [
    DecoraProductMeasuresComparisonDemoComponent
  ],
  exports: [ 
    DecoraProductMeasuresComparisonDemoComponent
  ]
})
export class DecoraProductMeasuresComparisonDemoModule { }
