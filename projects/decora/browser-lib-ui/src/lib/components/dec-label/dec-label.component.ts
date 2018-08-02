import { Component, Input } from '@angular/core';

@Component({
  selector: 'dec-label',
  templateUrl: './dec-label.component.html',
  styleUrls: ['./dec-label.component.scss']
})
export class DecLabelComponent {

  @Input() colorHex = '#D3D3D3';

}
