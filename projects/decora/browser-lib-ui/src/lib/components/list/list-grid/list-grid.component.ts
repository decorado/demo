import { Component, OnInit, ContentChild, TemplateRef, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'dec-list-grid',
  templateUrl: './list-grid.component.html',
  styleUrls: ['./list-grid.component.scss']
})
export class DecListGridComponent implements OnInit {

  selected: any[] = []; // from list component

  @ContentChild(TemplateRef) templateRef: TemplateRef<any>;

  @Input() itemWidth = '280px';

  @Input() itemGap = '8px';

  @Output() rowClick: EventEmitter<any> = new EventEmitter<any>();

  private _rows = [];

  constructor() { }

  set rows(v: any) {
    if (this._rows !== v) {
      this._rows = v;
    }
  }

  get rows() {
    return this._rows;
  }

  ngOnInit() {
  }

  onItemClick(event, item, list, index) {

    this.rowClick.emit({event, item, list, index});

  }

}
