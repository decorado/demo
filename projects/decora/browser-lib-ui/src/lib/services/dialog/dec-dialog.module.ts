import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatToolbarModule, MatIconModule, MatButtonModule, MatMenuModule, MatProgressBarModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';
import { DecSpinnerModule } from './../../components/dec-spinner/dec-spinner.module';

import { DecDialogComponent } from './dec-dialog.component';
import { DecDialogService } from './dec-dialog.service';
import { DecDialogTitleComponent } from './dec-dialog-title/dec-dialog-title.component';
import { DecDialogActionsComponent } from './dec-dialog-actions/dec-dialog-actions.component';
import { DecDialogContentComponent } from './dec-dialog-content/dec-dialog-content.component';
import { DecDialogCloseDirective } from './dec-dialog-close/dec-dialog-close.directive';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatProgressBarModule,
    FlexLayoutModule,
    MatProgressBarModule,
    DecSpinnerModule,
    TranslateModule,
  ],
  declarations: [DecDialogComponent, DecDialogTitleComponent, DecDialogActionsComponent, DecDialogContentComponent, DecDialogCloseDirective],
  entryComponents: [DecDialogComponent],
  providers: [DecDialogService],
  exports: [DecDialogTitleComponent, DecDialogActionsComponent, DecDialogContentComponent, DecDialogCloseDirective],
})
export class DecDialogModule { }
