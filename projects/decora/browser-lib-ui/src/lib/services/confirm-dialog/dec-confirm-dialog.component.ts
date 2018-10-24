import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dec-confirm-dialog',
  templateUrl: './dec-confirm-dialog.component.html',
  styleUrls: ['./dec-confirm-dialog.component.scss']
})
export class DecConfirmDialogComponent implements OnInit {

  message: string;

  customButtonTitle: string;

  constructor() { }

  ngOnInit() {
  }

}
