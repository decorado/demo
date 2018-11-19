import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecJobDetailsComponent } from './dec-job-details.component';
import { MatIconModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { CategoryPipeModule } from './../../pipes/category/category-pipe.module';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    TranslateModule,
    CategoryPipeModule
  ],
  declarations: [
    DecJobDetailsComponent
  ],
  exports: [
    DecJobDetailsComponent
  ]
})
export class DecJobDetailsModule { }
