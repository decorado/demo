import { Component, Input, ContentChild, TemplateRef } from '@angular/core';

/** @description Dec List Table Column.
 *  @param colSpan The number of columns span the column will use
 *  @param minWidth The minimum width in pixels the column can use
 *  @param maxWidth The maximum width in pixels the column can use
 */
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

  @Input() set minWidth(v) {
    const number = +v;
    this._minWidth = isNaN(number) ? undefined : number;
  }

  get minWidth(): number {
    return this._minWidth;
  }

  @Input() set maxWidth(v) {
    const number = +v;
    this._maxWidth = isNaN(number) ? undefined : number;
  }

  get maxWidth(): number {
    return this._maxWidth;
  }

  private _minWidth: number = undefined;

  private _maxWidth: number = undefined;

  private _colSpan = 1;
}
