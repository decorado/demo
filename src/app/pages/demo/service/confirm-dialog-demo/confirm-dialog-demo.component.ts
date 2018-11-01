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

  open(color: any = 'basic') {
    const dialogRef = this.confirmDialog.open({
      title: `${color} confirmation`,
      description: 'Confirm description',
      color: color,
      height: '300px',
    });

    dialogRef.afterClosed().subscribe(res => {
      console.log('Closed with res: ', res);
    });
  }


  openWithOptionalMessage(color: any = 'basic') {
    const dialogRef = this.confirmDialog.open({
      title: `${color} confirmation`,
      description: 'Confirm description',
      optionalMessage: true,
      color: color,
      height: '300px',
    });

    dialogRef.afterClosed().subscribe(res => {
      console.log('Closed with res: ', res);
    });
  }

  openWithRequiredMessage(color: any = 'basic') {
    const dialogRef = this.confirmDialog.open({
      title: `${color} confirmation`,
      description: 'Confirm description',
      requiredMessage: true,
      color: color,
      height: '300px',
    });

    dialogRef.afterClosed().subscribe(res => {
      console.log('Closed with res: ', res);
    });
  }
}
