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

  onSearch = () => { };

  onClear = () => { };

  constructor() { }

  ngOnInit() {
  }

  private clearEmptyKeys() {

    const emptyKeys = Object.keys(this.form).filter(key => {
      const value = this.form[key];
      if (typeof value === 'string') {
        return value === '' || value === undefined;
      } else if (Array.isArray(value)) {
        return value.length === 0;
      } else {
        return false;
      }
    });

    emptyKeys.forEach(key => {
      delete this.form[key];
    });

  }

  reset() {
    this.onClear();
  }

  submit() {

    this.clearEmptyKeys();

    this.onSearch();

  }
}
