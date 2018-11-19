import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecProductBriefingComponent } from './dec-product-briefing.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    DecProductBriefingComponent
  ],
  imports: [
    CommonModule,
    TranslateModule
  ],
  exports: [
    DecProductBriefingComponent
  ]
})
export class DecProductBriefingModule { }
