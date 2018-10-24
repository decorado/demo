import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-decora-product-measures-comparison-demo',
  templateUrl: './decora-product-measures-comparison-demo.component.html',
  styleUrls: ['./decora-product-measures-comparison-demo.component.scss']
})
export class DecoraProductMeasuresComparisonDemoComponent implements OnInit {

  measures = {
    referenceCubeX: 22,
    referenceCubeY: 12,
    referenceCubeZ: 23,
    modelCubeX: 22,
    modelCubeY: 12,
    modelCubeZ: 23
  }

  constructor() { }

  ngOnInit() {
  }

}
