import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-decora-input-time-demo',
  templateUrl: './decora-input-time-demo.component.html',
  styleUrls: ['./decora-input-time-demo.component.scss']
})
export class DecoraInputTimeDemoComponent implements OnInit {

  modelValue = 225;

  modelValue2 = 63;

  modelValue3;

  constructor() { }

  ngOnInit() {
  }

}
