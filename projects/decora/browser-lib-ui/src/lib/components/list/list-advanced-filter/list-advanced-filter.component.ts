import { Component, OnInit, ContentChild, TemplateRef } from '@angular/core';

@Component({
  selector: 'dec-list-advanced-filter',
  templateUrl: './list-advanced-filter.component.html',
  styleUrls: ['./list-advanced-filter.component.scss']
})
export class DecListAdvancedFilterComponent implements OnInit {

  form: any = {};

  set opened(v) {
    this._opened = this._opened || v;
  }

  get opened() {
    return this._opened;
  }

  private _opened: boolean;

  @ContentChild(TemplateRef) templateRef: TemplateRef<any>;

  onSearch = () => {};

  onClear = () => {};

  constructor() { }

  ngOnInit() {
  }

  reset() {
    this.onClear();
  }

  submit() {
    this.onSearch();
  }

}
