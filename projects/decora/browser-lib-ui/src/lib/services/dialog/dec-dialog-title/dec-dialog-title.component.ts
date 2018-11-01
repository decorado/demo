import { Component, AfterViewInit, ElementRef, ViewChild, TemplateRef } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { DecDialogService } from './../dec-dialog.service';
import { DecDialogComponent } from './../dec-dialog.component';

@Component({
  selector: 'dec-dialog-title',
  templateUrl: './dec-dialog-title.component.html',
  styleUrls: ['./dec-dialog-title.component.scss']
})
export class DecDialogTitleComponent implements AfterViewInit {

  dialogRef: MatDialogRef<any>;

  @ViewChild(TemplateRef) template: TemplateRef<any>;

  constructor(
    private matDialog: MatDialog,
    private elementRef: ElementRef<HTMLElement>,
    private decDialogService: DecDialogService,
  ) {}

  ngAfterViewInit() {

    this.dialogRef = this.decDialogService.getClosestDialog(this.elementRef, this.matDialog.openDialogs);

    const decDialogComponentInstance: DecDialogComponent = this.dialogRef.componentInstance;

    setTimeout(() => {

      if (!decDialogComponentInstance.title) {

        decDialogComponentInstance.decDialogTitleTemplate = this.template;
      }

    }, 0);

  }

}
