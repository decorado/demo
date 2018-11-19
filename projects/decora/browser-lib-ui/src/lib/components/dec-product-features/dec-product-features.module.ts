import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecProductFeaturesComponent } from './dec-product-features.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    MatIconModule
  ],
  declarations: [
    DecProductFeaturesComponent
  ],
  exports: [
    DecProductFeaturesComponent
  ]
})
export class DecProductFeaturesModule { }
