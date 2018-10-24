import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-decora-color-picker-demo',
  templateUrl: './decora-color-picker-demo.component.html',
  styleUrls: ['./decora-color-picker-demo.component.scss']
})
export class DecoraColorPickerDemoComponent {

  rgbColor = [255, 255, 0];
  hexColor = '#f3f400';

  empty: any;

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      colorHex: ['#000123'],
      colorRgb: [[255, 121, 67]],
    });
  }


}
