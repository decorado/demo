import { Injectable, ElementRef } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ComponentType } from '@angular/cdk/portal';
import { DecDialogComponent } from './dec-dialog.component';
import { DecDialogOpenConfiguration } from './dec-dialog.models';

@Injectable()
export class DecDialogService {

  private openDialogInstances: {[key: number]: MatDialogRef<any>} = {};

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
        disableClose: config.disableClose,
        autoFocus: config.autoFocus,
      }
    );

    dialogInstance.componentInstance.childComponentType = childComponent;

    dialogInstance.componentInstance.title = config.title;

    dialogInstance.componentInstance.context = config.context;

    dialogInstance.componentInstance.hideBackButton = config.hideBackButton;

    dialogInstance.componentInstance.color = config.color;

    this.registerDialog(config.id, dialogInstance);

    this.watchToUnregisterDialogWhenClosed(config.id, dialogInstance);

    return dialogInstance;

  }

  dialogRef(dialogId) {
    return this.openDialogInstances[dialogId];
  }

  getClosestDialog(element: ElementRef<HTMLElement>, openDialogs: MatDialogRef<any>[]) {

    let parent: HTMLElement | null = element.nativeElement.parentElement;

    while (parent && !parent.classList.contains('mat-dialog-container')) {
      parent = parent.parentElement;
    }

    return parent ? openDialogs.find(dialog => dialog.id === parent.id) : null;

  }

  private registerDialog(dialogId, dialogInstance) {
    this.openDialogInstances[dialogId] = dialogInstance;
  }

  private watchToUnregisterDialogWhenClosed(dialogId, dialogInstance) {
    dialogInstance.afterClosed().subscribe(() => {
      if (this.openDialogInstances[dialogId]) {
        delete this.openDialogInstances[dialogId];
      }
    });
  }
}
