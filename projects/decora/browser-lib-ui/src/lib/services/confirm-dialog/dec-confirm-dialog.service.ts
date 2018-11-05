import { Injectable } from '@angular/core';
import { DecConfirmDialogConfig } from './dec-confirm-dialog.models';
import { DecDialogService } from './../dialog/dec-dialog.service';
import { DecConfirmDialogComponent } from './dec-confirm-dialog.component';
import { MatDialogRef } from '@angular/material';

@Injectable()
export class DecConfirmDialogService {

  constructor(
    private decDialog: DecDialogService
  ) { }

  open(config: DecConfirmDialogConfig): MatDialogRef<any> {

    config = new DecConfirmDialogConfig(config);

    const dialogRef: MatDialogRef<DecConfirmDialogComponent> = this.decDialog.open(DecConfirmDialogComponent, {
      width: config.width,
      height: config.height,
      hideBackButton: true,
      color: config.color,
      disableClose: config.disableClose,
      context: {
        description: config.description,
        customButtonTitle: config.customButtonTitle,
        requiredMessage: config.requiredMessage,
        optionalMessage: config.optionalMessage,
        message: config.message,
        messagePlaceholder: config.messagePlaceholder,
        title: config.title,
      },
    });

    return dialogRef;

  }

}
