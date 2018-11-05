import { Directive, OnInit, ElementRef, HostListener, Optional, Input } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { DecDialogService } from './../dec-dialog.service';

@Directive({
  selector: '[decDialogClose]',
  exportAs: 'decDialogClose'
})
export class DecDialogCloseDirective implements OnInit {

  @Input('decDialogClose') decDialogCloseContent: any;

  constructor(
    @Optional() public dialogRef: MatDialogRef<any>,
    private decDialogService: DecDialogService,
    private elementRef: ElementRef<HTMLElement>,
    private matDialog: MatDialog
  ) {}

  ngOnInit() {
    if (!this.dialogRef) {
      this.dialogRef = this.decDialogService.getClosestDialog(this.elementRef, this.matDialog.openDialogs);
    }
  }

  @HostListener('click') closeDialog() {
    this.dialogRef.close(this.decDialogCloseContent);
  }
}
