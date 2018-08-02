import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { DecListAdvancedFilterComponent } from './list-advanced-filter.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    TranslateModule,
    FlexLayoutModule,
  ],
  declarations: [DecListAdvancedFilterComponent],
  exports: [DecListAdvancedFilterComponent],
})
export class DecListAdvancedFilterModule { }
