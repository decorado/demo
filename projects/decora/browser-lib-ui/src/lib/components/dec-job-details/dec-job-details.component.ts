import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'dec-job-details',
  templateUrl: './dec-job-details.component.html',
  styleUrls: ['./dec-job-details.component.scss']
})
export class DecJobDetailsComponent implements OnInit {

  @Input() 
  set job(v) {
    if (v) {
      this._job = v;
    }
  }

  get job() {
    return this._job;
  }

  @Input()
  set product(v) {
    if (v) {
      this._product = v;
    }
  }

  get product() {
    return this._product;
  }

  _job: any;
  _product: any;


  constructor() { }

  ngOnInit() {
  }

}
