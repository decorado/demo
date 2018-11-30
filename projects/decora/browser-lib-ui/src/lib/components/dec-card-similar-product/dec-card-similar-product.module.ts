import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecCardSimilarProductComponent } from './dec-card-similar-product.component';
import { MatCardModule, MatButtonModule } from '@angular/material';
import { DecImageModule } from '../../directives/image/image.module';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    DecImageModule
  ],
  declarations: [DecCardSimilarProductComponent],
  exports: [DecCardSimilarProductComponent]
})
export class DecCardSimilarProductModule { }
