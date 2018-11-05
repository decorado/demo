import { Component, AfterViewInit, ViewChild, TemplateRef, ElementRef } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { DecDialogService } from './../dec-dialog.service';
import { DecDialogComponent } from './../dec-dialog.component';

@Component({
  selector: 'dec-dialog-actions',
  templateUrl: './dec-dialog-actions.component.html',
  styleUrls: ['./dec-dialog-actions.component.scss']
})
export class DecDialogActionsComponent implements AfterViewInit {

  dialogRef: MatDialogRef<any>;

  @ViewChild(TemplateRef) template: TemplateRef<any>;

  constructor(
    private matDialog: MatDialog,
    private elementRef: ElementRef<HTMLElement>,
    private decDialogService: DecDialogService,
  ) { }

  ngAfterViewInit() {

    this.dialogRef = this.decDialogService.getClosestDialog(this.elementRef, this.matDialog.openDialogs);

    const decDialogComponentInstance: DecDialogComponent = this.dialogRef.componentInstance;

    setTimeout(() => {

      decDialogComponentInstance.decDialogActionsTemplate = this.template;

    }, 0);

  }

}
