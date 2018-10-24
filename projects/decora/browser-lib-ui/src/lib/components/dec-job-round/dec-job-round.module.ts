import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecJobRoundComponent } from './dec-job-round.component';
import { DecJobRoundItemModule } from './dec-job-round-item/dec-job-round-item.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DecGridModule } from './../dec-grid/dec-grid.module';
import { MatIconModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    DecJobRoundItemModule,
    FlexLayoutModule,
    DecGridModule,
    MatIconModule,
    TranslateModule
  ],
  declarations: [
    DecJobRoundComponent
  ],
  exports: [
    DecJobRoundComponent
  ]
})
export class DecJobRoundModule { }
