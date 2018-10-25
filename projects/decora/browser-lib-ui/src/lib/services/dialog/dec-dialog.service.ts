import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ComponentType } from '@angular/cdk/portal';
import { DecDialogComponent } from './dec-dialog.component';
import { DecDialogOpenConfiguration } from './dec-dialog.models';

@Injectable()
export class DecDialogService {

  constructor(
    private dialog: MatDialog
  ) { }


  open(childComponent: ComponentType<any>, config: DecDialogOpenConfiguration) {

    config = new DecDialogOpenConfiguration(config);

    const fullscreen = !(config.width || config.height);

    const dialogInstance: MatDialogRef<any> = this.dialog.open(
      DecDialogComponent,
      {
        width: fullscreen ? '100vw' : config.width,
        height: fullscreen ? '100vh' : config.height,
        panelClass: fullscreen ? 'dec-dialog-container-full-screen' : 'dec-dialog-container',
      }
    );

    dialogInstance.componentInstance.childComponentType = childComponent;

    dialogInstance.componentInstance.topActions = config.topActions;

    dialogInstance.componentInstance.bottomActions = config.bottomActions;

    dialogInstance.componentInstance.title = config.title;

    dialogInstance.componentInstance.context = config.context;

    dialogInstance.componentInstance.hideBackButton = config.hideBackButton;

    dialogInstance.componentInstance.showCancelButton = config.showCancelButton;

    dialogInstance.componentInstance.color = config.color;

    return dialogInstance;

  }
}
