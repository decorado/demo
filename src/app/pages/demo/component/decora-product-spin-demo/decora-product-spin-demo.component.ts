import {Component, OnInit} from '@angular/core';
import { spinMock, spinMockWithInterval } from './spin-mock';

@Component({
  selector: 'app-decora-product-spin-demo',
  templateUrl: './decora-product-spin-demo.component.html',
  styleUrls: ['./decora-product-spin-demo.component.css']
})
export class DecoraProductSpinDemoComponent implements OnInit {

  spin = spinMock;

  spinWithInterval = spinMockWithInterval;

  constructor() {
  }

  ngOnInit() {
  }

}
