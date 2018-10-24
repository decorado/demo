import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'dec-product-measures-comparison',
  templateUrl: './dec-product-measures-comparison.component.html',
  styleUrls: ['./dec-product-measures-comparison.component.scss']
})
export class DecProductMeasuresComparisonComponent implements OnInit {

  @Input()
  set measures(v) {
    if (v) {
      this._measures = v;
      this.formatMasures(v);
    }
  }

  get measures() {
    return this._measures;
  }

  private _measures;
  formatedMeasures;

  constructor() { }

  ngOnInit() {
  }

  formatMasures(measures) {
    this.formatedMeasures = [];

    const width = {
      label: 'label.cubeX',
      product: this.printMeasure(this.measures.referenceCubeX.toFixed(2)),
      model: this.printMeasure(this.measures.modelCubeX),
      productIn: this.printMeasureInches(this.measures.referenceCubeX),
      modelIn: this.printMeasureInches(this.measures.modelCubeX)
    };

    const depth = {
      label: 'label.cubeY',
      product: this.printMeasure(this.measures.referenceCubeY.toFixed(2)),
      model: this.printMeasure(this.measures.modelCubeY),
      productIn: this.printMeasureInches(this.measures.referenceCubeY),
      modelIn: this.printMeasureInches(this.measures.modelCubeY)
    };

    const height = {
      label: 'label.cubeZ',
      product: this.printMeasure(this.measures.referenceCubeZ.toFixed(2)),
      model: this.printMeasure(this.measures.modelCubeZ),
      productIn: this.printMeasureInches(this.measures.referenceCubeZ),
      modelIn: this.printMeasureInches(this.measures.modelCubeZ)
    };

    this.formatedMeasures.push(width);
    this.formatedMeasures.push(depth);
    this.formatedMeasures.push(height);
  }


  private printMeasure(measure: number): string {
    if (measure) {
      return measure + ' cm';
    }
    return '-';
  }

  private printMeasureInches(measure: number): string {
    if (measure) {
      return (Math.round(measure * 0.39370)).toFixed(2) + ' in';
    }
    return '-';
  }
}
