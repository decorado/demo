import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ComponentType } from '@angular/cdk/portal';
import { DecDialogComponent } from './dec-dialog.component';
import { OpenConfiguration } from './dec-dialog.models';

@Injectable()
export class DecDialogService {

  constructor(
    private dialog: MatDialog
  ) { }


  open(childComponent: ComponentType<any>, config: OpenConfiguration) {

    const dialogInstance: MatDialogRef<any> = this.dialog.open(
      DecDialogComponent,
      {
        width: config.width || '100vw',
        height: config.heigth || '100vh',
        panelClass: 'full-screen-dialog'
      }
    );

    dialogInstance.componentInstance.childComponentType = childComponent;

    dialogInstance.componentInstance.actions = config.actions;

    dialogInstance.componentInstance.title = config.title;

    dialogInstance.componentInstance.context = config.context;

    return dialogInstance;

  }
}
