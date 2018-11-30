import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DecoraCardSimilarProductRoutingModule } from './decora-card-similar-product-routing.module';
import { DecoraCardSimilarProductComponent } from './decora-card-similar-product.component';
import { DecCardSimilarProductModule } from '@projects/decora/browser-lib-ui/src/lib/components/dec-card-similar-product/dec-card-similar-product.module';

@NgModule({
  declarations: [DecoraCardSimilarProductComponent],
  imports: [
    CommonModule,
    DecoraCardSimilarProductRoutingModule,
    DecCardSimilarProductModule
  ]
})
export class DecoraCardSimilarProductModule { }
