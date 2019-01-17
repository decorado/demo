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
      const firstFourNumbers = this.getFirstFourNumbers(value);
      const maskedValue = this.maskValue(firstFourNumbers);
      this.setValueBasedOnInput(firstFourNumbers);
      this.timeForm.controls.time.setValue(maskedValue);
    });
  }

  private getFirstFourNumbers(value) {
    const numbersArray = `${value}`.match(/[0-9]/gi);
    const firstFourNumbersArray = numbersArray ? numbersArray.slice(0, 4) : [];
    return firstFourNumbersArray.join('');
  }

  private maskValue(value) {
    const totalNumbers = value.length;
    if (totalNumbers >= 3) {
      return `${value[0]}${value[1] || 0}h${value[2] || 0}${value[3] || 0}m`;
    } else if (totalNumbers > 0) {
      return `${value}h`;
    } else {
      return '';
    }
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
      const hoursString = `${hours}`.length === 2 ? `${hours}` : `${hours}`.length === 1 ? `0${hours}` : '';
      return `${hoursString}h${minutesString}m`;
    } else {
      return '';
    }
  }

  private setValueBasedOnInput(firstFourNumbers) {
    const totalMinutes = this.getMinutesFromInputNumbersArray(firstFourNumbers);
    this.value = totalMinutes;
  }

  private getMinutesFromInputNumbersArray(firstFourNumbers) {
    const totalNumbers = firstFourNumbers.length;
    let hours = 0;
    let minutes = 0;

    if (totalNumbers === 4) {
      hours = parseInt(`${firstFourNumbers[0]}${firstFourNumbers[1]}`, 10);
      minutes = parseInt(`${firstFourNumbers[2]}${firstFourNumbers[3]}`, 10);
    } else if (totalNumbers === 3) {
      hours = parseInt(`${firstFourNumbers[0]}${firstFourNumbers[1]}`, 10);
      minutes = parseInt(`${firstFourNumbers[2]}0`, 10);
    } else if (totalNumbers === 2) {
      hours = parseInt(`${firstFourNumbers[0]}${firstFourNumbers[1]}`, 10);
    } else if (totalNumbers === 1) {
      hours = parseInt(firstFourNumbers[0], 10);
    }

    const totalMinutes = (hours * 60) + minutes;

    return totalMinutes || '';
  }

}
