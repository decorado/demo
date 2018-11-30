import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecProductSimilarModelsComponent } from './dec-product-similar-models.component';
import { DecCardSimilarProductModule } from '../dec-card-similar-product/dec-card-similar-product.module';

@NgModule({
  imports: [
    CommonModule,
    DecCardSimilarProductModule
  ],
  declarations: [DecProductSimilarModelsComponent],
  exports: [DecProductSimilarModelsComponent]
})
export class DecProductSimilarModelsModule { }
