import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';
import { DecProductInfoComponent } from './dec-product-info.component';
import { DecProductInfoExtraComponent } from './dec-product-info-extra/dec-product-info-extra.component';
import { DecIconModule } from './../dec-icon/dec-icon.module';

@NgModule({
  imports: [
    CommonModule,
    DecIconModule,
    FlexLayoutModule,
    TranslateModule,
  ],
  declarations: [
    DecProductInfoComponent,
    DecProductInfoExtraComponent,
  ],
  exports: [
    DecProductInfoComponent,
    DecProductInfoExtraComponent,
  ]
})
export class DecProductInfoModule { }
