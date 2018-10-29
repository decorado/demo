import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecStatusJobRoundComponent } from './dec-status-job-round.component';
import { DecStatusJobRoundItemModule } from './dec-status-job-round-item/dec-status-job-round-item.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DecGridModule } from '../dec-grid/dec-grid.module';
import { MatIconModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    DecStatusJobRoundItemModule,
    FlexLayoutModule,
    DecGridModule,
    MatIconModule,
    TranslateModule
  ],
  declarations: [
    DecStatusJobRoundComponent
  ],
  exports: [
    DecStatusJobRoundComponent
  ]
})
export class DecStatusJobRoundModule { }
