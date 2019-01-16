import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'dec-label',
  templateUrl: './dec-label.component.html',
  styleUrls: ['./dec-label.component.scss']
})
export class DecLabelComponent implements OnInit {
  @Input() colorHex?: string;
  @Input() colorClass?: string;
  @Input() stretched?: boolean;
  borderColor;

  ngOnInit() {
    if (this.colorHex === '#FFFFFF') {
      this.borderColor = '#999999';
    }
  }
}
