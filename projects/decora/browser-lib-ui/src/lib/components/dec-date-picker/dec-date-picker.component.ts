import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

const noop = () => { };

const DATE_PICKER_CONTROL_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DecDatePickerComponent),
  multi: true
};

@Component({
  selector: 'dec-date-picker',
  templateUrl: './dec-date-picker.component.html',
  styleUrls: ['./dec-date-picker.component.scss'],
  providers: [DATE_PICKER_CONTROL_VALUE_ACCESSOR]
})
export class DecDatePickerComponent implements ControlValueAccessor {

  @Input() placeholder = 'Date';

  @Input() mode: 'date' | 'timestamp' = 'date';

  set dateValue(v: Date) {

    if (this.innerDateValue !== v) {

      this.innerDateValue = v;

      this.innerValue = this.mode === 'date' ? v : v.getTime();

      this.onChangeCallback(this.innerValue);

    }

  }

  get dateValue(): Date {

    return this.innerDateValue;

  }

  private innerDateValue: Date;

  private innerValue: Date | number;

  private onTouchedCallback: () => void = noop;

  private onChangeCallback: (_: any) => void = noop;

  constructor() { }

  writeValue(value: Date | number): void {

    this.detectModeBasedOnInputType(value);

    this.innerValue = value;

    this.innerDateValue = new Date(value as any); // value as any avoids type compilation error

  }

  registerOnChange(fn: any) {

    this.onChangeCallback = fn;

  }

  registerOnTouched(fn: any) {

    this.onTouchedCallback = fn;

  }

  onInputBlur(event) {

    this.onTouchedCallback();

  }

  private detectModeBasedOnInputType(value) {

    if (value) {

      const isTimestamp = /^\d+$/.test(value);

      if (isTimestamp) {

        this.mode = 'timestamp';

      } else {

        this.mode = 'date';

      }

    }

  }

}
