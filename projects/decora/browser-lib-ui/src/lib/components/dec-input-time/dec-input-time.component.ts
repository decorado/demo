import { Component, AfterViewInit, Input, forwardRef } from '@angular/core';
import { Validators, FormGroup, FormBuilder, NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

const noop = () => {
};

//  Used to extend ngForms functions
const INPUT_TIME_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DecInputTimeComponent),
  multi: true
};

@Component({
  selector: 'dec-input-time',
  templateUrl: './dec-input-time.component.html',
  styleUrls: ['./dec-input-time.component.scss'],
  providers: [INPUT_TIME_CONTROL_VALUE_ACCESSOR]
})
export class DecInputTimeComponent implements ControlValueAccessor, AfterViewInit {

  timeForm: FormGroup;

  @Input() placeholder = 'Time';

  @Input() name = 'time';

  @Input() set required(v: boolean) {
    this._required = v;
    this.bindRequiredAndDisabled();
  }

  get required() {
    return this._required;
  }

  @Input() set disabled(v: boolean) {
    this._disabled = v;
    this.bindRequiredAndDisabled();
  }

  get disabled() {
    return this._disabled;
  }

  private _required;

  private _disabled;

  //  The internal data model
  private innerValue: number;
  //  Placeholders for the callbacks which are later provided by the Control Value Accessor
  private onTouchedCallback: () => void = noop;
  //  Placeholders for the callbacks which are later provided by the Control Value Accessor
  private onChangeCallback: (_: any) => void = noop;

  constructor(
    private fb: FormBuilder,
  ) {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.initInputControl();
    }, 0);
  }

  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCallback(v);
      if (this.timeForm) {
        this.setInputBasedOnValue();
      }
    }
  }

  get value(): any {
    return this.innerValue;
  }

  // From ControlValueAccessor interface
  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  // From ControlValueAccessor interface
  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  // From ControlValueAccessor interface
  setDisabledState(disabled = false) {
    this.disabled = disabled;
  }

  // From ControlValueAccessor interface
  writeValue(value: any) {
    value = value === null ? '' : value; // v7 bug. remove it when the issue is closed: https://github.com/angular/angular/issues/14988
    if (`${value}` !== `${this.value}`) { // convert to string to avoid problems comparing values
      this.value = value;
    }
  }

  private bindRequiredAndDisabled() {
    if (this.timeForm) {
      if (this.disabled) {
        this.timeForm.disable();
      } else {
        this.timeForm.enable();
      }
      if (this.required) {
        this.timeForm.setValidators([Validators.required]);
      } else {
        this.timeForm.clearValidators();
      }
    }
  }

  private initInputControl() {
    if (!this.timeForm) {
      this.timeForm = this.fb.group({
        time: new FormControl({ value: this.value, disabled: this.disabled }, this.required ? [Validators.required] : []),
      });
      this.setInputBasedOnValue();
      this.subscribeToInputchanges();
    }
  }

  private subscribeToInputchanges() {
    this.timeForm.controls.time.valueChanges
    .pipe(
      debounceTime(300),
      distinctUntilChanged(),
    )
    .subscribe(value => {

      const numbers = this.getNumbers(value);

      const maskedValue = this.maskValue(numbers);

      this.setValueBasedOnInput(numbers);

      this.timeForm.controls.time.setValue(maskedValue);

    });
  }

  private getNumbers(value) {
    const numbersArray = `${value}`.replace(/[a-zA-Z]/g, '');
    return parseInt(numbersArray, 10);
  }

  private maskValue(value) {

    const valueString = `${value}`;

    const totalNumbers = valueString.length;

    let maskedValue;

    if (totalNumbers === 1) {

      maskedValue = `0${valueString}m`;

    } else if (totalNumbers === 2) {

      maskedValue = `${valueString}m`;

    } else {

      const minutes = valueString.slice(totalNumbers - 2, totalNumbers);

      const hours = valueString.slice(0, totalNumbers - 2);

      maskedValue = `${hours}h${minutes}m`;

    }

    return maskedValue;
  }

  private setInputBasedOnValue() {
    const time = this.getMaskedInnerValue();
    this.timeForm.controls.time.setValue(time);
  }

  private getMaskedInnerValue() {
    if (this.innerValue > 0) {
      const minutes = (this.innerValue % 60);
      const hours = (this.innerValue - minutes) / 60;
      const minutesString = `${minutes}`.length === 2 ? `${minutes}` : `${minutes}`.length === 1 ? `0${minutes}` : '';
      const hoursString = `${hours}`.length >= 2 ? `${hours}` : `${hours}`.length === 1 ? `0${hours}` : '';
      return `${hoursString}h${minutesString}m`;
    } else {
      return '';

    }
  }

  private setValueBasedOnInput(numbers) {
    const totalMinutes = this.getMinutesFromInputNumbersArray(numbers);
    this.value = totalMinutes;
  }

  private getMinutesFromInputNumbersArray(numbers) {
    const numbersAsString = `${numbers}`;
    const totalNumbers = numbersAsString.length;
    let totalMinutes = 0;
    if (totalNumbers < 3) {
      totalMinutes = numbers;
    } else {
      const minutesString = numbersAsString.slice(totalNumbers - 2, totalNumbers);
      const minutes = parseInt(minutesString, 10);
      const hoursString = numbersAsString.slice(0, totalNumbers - 2);
      const hours = parseInt(hoursString, 10);
      totalMinutes = (hours * 60) + minutes;
    }
    return totalMinutes;
  }

}
