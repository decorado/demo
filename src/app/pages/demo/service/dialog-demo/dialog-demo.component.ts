import { Component, OnInit } from '@angular/core';
import { DecDialogService } from '@projects/decora/browser-lib-ui/src/public_api';
import { DialogContentDemoComponentComponent } from '@app/pages/demo/service/dialog-demo/dialog-content-demo-component/dialog-content-demo-component.component';

@Component({
  selector: 'app-dialog-demo',
  templateUrl: './dialog-demo.component.html',
  styleUrls: ['./dialog-demo.component.scss']
})
export class DialogDemoComponent implements OnInit {

  constructor(
    private decDialog: DecDialogService,
  ) { }

  ngOnInit() {
  }

  open(color, title) {

    this.decDialog.open(DialogContentDemoComponentComponent, { color, context: { color }, title });

  }

}
