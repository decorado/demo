import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'dec-product-briefing',
  templateUrl: './dec-product-briefing.component.html',
  styleUrls: ['./dec-product-briefing.component.scss']
})
export class DecProductBriefingComponent implements OnInit {

  @Input()
  set briefingUrl(v) {
    if (v) {
      this._briefingUrl = v;
    }
  }

  get briefingUrl() {
    return this._briefingUrl;
  }

  private _briefingUrl;

  constructor() { }

  ngOnInit() {
  }

}
