import { Component, Input, ContentChildren, QueryList, forwardRef } from '@angular/core';
import { DecGridRowComponent } from './dec-grid-row/dec-grid-row.component';


@Component({
  selector: 'dec-grid',
  templateUrl: './dec-grid.component.html',
  styleUrls: ['./dec-grid.component.scss']
})
export class DecGridComponent {

  @Input() gap = '24px';

  @ContentChildren(forwardRef(() => DecGridRowComponent)) rows: QueryList<DecGridRowComponent>;

  constructor() { }

}
