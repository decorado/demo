import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

//  Return an empty function to be used as default trigger functions
const noop = () => {
};

//  Used to extend ngForms functions
export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DecStringArrayInputComponent),
  multi: true
};

@Component({
  selector: 'dec-string-array-input',
  templateUrl: './dec-string-array-input.component.html',
  styleUrls: ['./dec-string-array-input.component.scss'],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class DecStringArrayInputComponent implements OnInit {

  @Input() name;

  @Input() placeholder;

  @Input() mode = 'textarea';

  @Input() rows = 3;

  /*
  ** ngModel API
  */

  // Get accessor
  get value(): string[] {

    return this.innerArray;

  }

  // Set accessor including call the onchange callback
  set value(v: string[]) {

    if (v !== this.innerArray) {

      this.innerArray = v;

      this.onChangeCallback(v);

    }

  }

  get valueAsString(): string {

    return this.getArrayAsString();

  }

  // Set accessor including call the onchange callback
  set valueAsString(v: string) {

    if (v !== this.innerArray) {

      this.value = this.stringToArray(v);

    }

  }

  /*
  ** ngModel propertie
  ** Used to two way data bind using [(ngModel)]
  */
  //  The internal data model
  private innerArray: any = '';
  //  Placeholders for the callbacks which are later provided by the Control Value Accessor
  private onTouchedCallback: () => void = noop;
  //  Placeholders for the callbacks which are later provided by the Control Value Accessor
  private onChangeCallback: (_: any) => void = noop;

  constructor() { }

  ngOnInit() {
  }

  //
  getArrayAsString() {

    return this.arrayToString(this.value);

  }

  // From ControlValueAccessor interface
  writeValue(value: string[]) {

    if (value !== this.value) {

      this.value = value;

    }

  }

  // From ControlValueAccessor interface
  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  // From ControlValueAccessor interface
  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  onValueChanged(event: any) {
    this.value = event.toString();
  }

  private stringToArray(stringOfArray: string): string[] {
    if (stringOfArray) {

      const regExp = /[^,\s][^,\s]*[^,\s]*/g;

      return stringOfArray.match(regExp);

    }
  }

  private arrayToString(arrayOfstring: string[]): string {

    if (arrayOfstring) {

      return arrayOfstring.join(', ');

    }


  }

}
