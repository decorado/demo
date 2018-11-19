import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'dec-product-features',
  templateUrl: './dec-product-features.component.html',
  styleUrls: ['./dec-product-features.component.scss']
})
export class DecProductFeaturesComponent implements OnInit {

  objectKeys = Object.keys;

  @Input()
  set product(v){
    if (v) {
      this._product = v;
    }
  }

  get product() {
    return this._product;
  }

  _product: any;

  constructor() { }

  ngOnInit() {
  }

}
