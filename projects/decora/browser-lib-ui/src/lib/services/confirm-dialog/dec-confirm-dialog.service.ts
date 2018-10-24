import { Injectable } from '@angular/core';
import { DecConfirmDialogConfig } from './dec-confirm-dialog.models';
import { DecDialogService } from './../dialog/dec-dialog.service';
import { DecConfirmDialogComponent } from './dec-confirm-dialog.component';
import { DialogAction } from './../dialog/dec-dialog.models';
import { MatDialogRef } from '@angular/material';

@Injectable()
export class DecConfirmDialogService {

  constructor(
    private decDialog: DecDialogService
  ) { }

  open(config: DecConfirmDialogConfig): MatDialogRef<any> {

    config = new DecConfirmDialogConfig(config);

    const actions: DialogAction[] = [{ i18nLabel: config.customButtonTitle, callback: () => ref.close(true), color: 'primary' }];

    if (config.extraButtons) {
      actions.push(...config.extraButtons);
    }

    const ref = this.decDialog.open(DecConfirmDialogComponent, {
      width: config.width,
      height: config.height,
      title: config.title,
      context: config,
      bottomActions: actions,
      hideBackButton: true,
      showCancelButton: true,
      color: config.color
    });

    return ref;

  }

}
