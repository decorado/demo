import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-decora-date-picker-demo',
  templateUrl: './decora-date-picker-demo.component.html',
  styleUrls: ['./decora-date-picker-demo.component.scss']
})
export class DecoraDatePickerDemoComponent implements OnInit {

  date = new Date();

  dateTimestamp = 1538742917596;

  constructor() { }

  ngOnInit() {
  }

}
