import { Component, Input, ContentChild, TemplateRef } from '@angular/core';

@Component({
  selector: 'dec-list-table-column',
  templateUrl: './list-table-column.component.html',
  styleUrls: ['./list-table-column.component.scss']
})
export class DecListTableColumnComponent {

  @ContentChild(TemplateRef) template: TemplateRef<any>;

  @Input() prop;

  @Input() title = '';

  @Input() set colSpan(v) {
    const number = +v;
    this._colSpan = isNaN(number) ? 1 : number;
  }

  get colSpan(): number {
    return this._colSpan;
  }

  private _colSpan = 1;
}
