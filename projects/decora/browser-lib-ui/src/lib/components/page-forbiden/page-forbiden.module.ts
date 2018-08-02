import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecPageForbidenComponent } from './page-forbiden.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
  ],
  declarations: [
    DecPageForbidenComponent
  ],
  exports: [
    DecPageForbidenComponent
  ]
})
export class DecPageForbidenModule { }
