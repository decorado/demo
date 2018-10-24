import { Component, OnInit } from '@angular/core';
import { DecConfirmDialogService } from '@projects/decora/browser-lib-ui/src/public_api';

@Component({
  selector: 'app-confirm-dialog-demo',
  templateUrl: './confirm-dialog-demo.component.html',
  styleUrls: ['./confirm-dialog-demo.component.scss']
})
export class ConfirmDialogDemoComponent implements OnInit {

  constructor(
    private confirmDialog: DecConfirmDialogService,
  ) { }

  ngOnInit() {
  }

  open(color: any = 'transparent') {
    this.confirmDialog.open({
      title: 'Transparent confirmation',
      message: 'Confirm message',
      color: color,
    });
  }

}
