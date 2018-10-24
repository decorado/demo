import { Component,  ContentChildren, QueryList, ViewChild, TemplateRef, forwardRef, Input } from '@angular/core';

// In the same file to avoid circular dependency using forwardRef
@Component({
  selector: 'dec-grid-column',
  templateUrl: './dec-grid-column.component.html',
  styleUrls: ['./dec-grid-column.component.scss']
})
export class DecGridColumnComponent {

  @Input() span: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 = 1;

  @ContentChildren(forwardRef(() => DecGridRowComponent)) rows: QueryList<DecGridRowComponent>;

  @ViewChild('content') content: TemplateRef<any>;

  constructor() { }

  get columnWidth() {
    return (100 / 12) * this.span;

  }

}
@Component({
  selector: 'dec-grid-row',
  templateUrl: './dec-grid-row.component.html',
  styleUrls: ['./dec-grid-row.component.scss']
})
export class DecGridRowComponent {

  @ContentChildren(DecGridColumnComponent) columns: QueryList<DecGridColumnComponent>;

  @ViewChild('content') content: TemplateRef<any>;

  constructor() { }

}
