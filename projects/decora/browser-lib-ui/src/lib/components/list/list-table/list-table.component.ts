import { Component, ContentChildren, QueryList, ViewChild, EventEmitter, Output, Input } from '@angular/core';
import { DecListTableColumnComponent } from './../list-table-column/list-table-column.component';
import { DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  selector: 'dec-list-table',
  templateUrl: './list-table.component.html',
  styleUrls: ['./list-table.component.scss']
})
export class DecListTableComponent {

  @Input()
  set rows(v) {
    if (this._rows !== v) {
      this._rows = v;
    }
  }

  get rows() {
    return this._rows;
  }

  @ViewChild(DatatableComponent) tableComponent: DatatableComponent;

  columnsSortConfig: any;

  private _rows: Array<any> = [];

  @ContentChildren(DecListTableColumnComponent) columns: QueryList<DecListTableColumnComponent>;

  @Output() sort: EventEmitter<any> = new EventEmitter<any>();

  @Output() rowClick: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  onSort(event) {

    const sortConfig = [{
      property: event.sorts[0].prop,
      order: {type: event.sorts[0].dir}
    }];

    if (sortConfig !== this.columnsSortConfig) {

      this.columnsSortConfig = sortConfig;

      this.sort.emit(this.columnsSortConfig);

    }

  }

  onItemClick($event) {

    const event = $event;

    const item = $event.row;

    const list = this.rows;

    const index = $event.row.$$index;

    this.rowClick.emit({event, item, list, index});

  }
}
