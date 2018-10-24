import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecProductInfoComponent } from './dec-product-info.component';
import { DecIconModule } from './../dec-icon/dec-icon.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';
import { DecProductInfoExtraComponent } from './dec-product-info-extra/dec-product-info-extra.component';
import { CategoryPipeModule } from './../../pipes/category/category-pipe.module';

@NgModule({
  imports: [
    CommonModule,
    DecIconModule,
    FlexLayoutModule,
    TranslateModule,
    CategoryPipeModule
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
