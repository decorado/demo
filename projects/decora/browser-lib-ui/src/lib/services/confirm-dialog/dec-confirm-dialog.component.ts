import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dec-confirm-dialog',
  templateUrl: './dec-confirm-dialog.component.html',
  styleUrls: ['./dec-confirm-dialog.component.scss']
})
export class DecConfirmDialogComponent implements OnInit {

  description: string;

  customButtonTitle: string;

  requiredMessage: boolean;

  optionalMessage: boolean;

  message: string;

  messagePlaceholder: string;

  title: string;

  constructor() { }

  ngOnInit() {
  }

}
