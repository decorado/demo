import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecStatusJobRoundItemComponent } from './dec-status-job-round-item.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material';
import { DecLabelStatusModule } from './../../dec-label-status/dec-label-status.module';
import { TimeAgoModule } from './../../../pipes/time-ago/time-ago.module';
import { TranslateModule } from '@ngx-translate/core';
import { DecCountdownModule } from './../../dec-countdown/dec-countdown.module';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatIconModule,
    DecLabelStatusModule,
    TimeAgoModule,
    TranslateModule,
    DecCountdownModule
  ],
  declarations: [
    DecStatusJobRoundItemComponent
  ],
  exports: [
    DecStatusJobRoundItemComponent
  ]
})
export class DecStatusJobRoundItemModule { }
