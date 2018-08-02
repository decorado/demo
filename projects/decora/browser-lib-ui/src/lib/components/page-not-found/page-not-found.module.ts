import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecPageNotFoundComponent } from './page-not-found.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
  ],
  declarations: [
    DecPageNotFoundComponent
  ],
  exports: [
    DecPageNotFoundComponent
  ]
})
export class DecPageNotFoundModule { }
