import { Component, OnInit } from '@angular/core';
import { DecSnackBarService } from '@projects/decora/browser-lib-ui/src/public_api';

@Component({
  selector: 'app-decora-snack-bar-demo',
  templateUrl: './decora-snack-bar-demo.component.html',
  styleUrls: ['./decora-snack-bar-demo.component.css']
})
export class DecoraSnackBarDemoComponent implements OnInit {

  constructor(private snackBarService: DecSnackBarService) { }

  ngOnInit() {
  }


  openSnack(msg, type) {
    const s = this.snackBarService.open(msg, type);
  }

}
