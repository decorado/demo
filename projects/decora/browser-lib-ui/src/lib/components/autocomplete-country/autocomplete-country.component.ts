import { Component, Input, forwardRef, Output, EventEmitter, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { DecAutocompleteComponent } from './../autocomplete/autocomplete.component';
import { FAKE_DATA } from './hard-coded-countries';

//  Return an empty function to be used as default trigger functions
const noop = () => {
};

//  Used to extend ngForms functions
const AUTOCOMPLETE_COUNTRY_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DecAutocompleteCountryComponent),
  multi: true
};

@Component({
  selector: 'dec-autocomplete-country',
  templateUrl: './autocomplete-country.component.html',
  styles: [],
  providers: [AUTOCOMPLETE_COUNTRY_CONTROL_VALUE_ACCESSOR]
})
export class DecAutocompleteCountryComponent implements ControlValueAccessor {

  countries$: Observable<any>;

  @Input() lang: 'en' | 'pt-br' = 'en';

  @Input() disabled: boolean;

  @Input() required: boolean;

  @Input() name = 'Country autocomplete';

  @Input() placeholder = 'Country autocomplete';

  @Input() multi: boolean;

  @Input() notFoundMessage: string;

  @Input() repeat: boolean;

  @Output() blur: EventEmitter<any> = new EventEmitter<any>();

  @Output() optionSelected: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild(DecAutocompleteComponent) autocompleteComponent: DecAutocompleteComponent;

  /*
  ** ngModel propertie
  ** Used to two way data bind using [(ngModel)]
  */
  //  The internal data model
  private innerValue: any;
  //  Placeholders for the callbacks which are later provided by the Control Value Accessor
  private onTouchedCallback: () => void = noop;
  //  Placeholders for the callbacks which are later provided by the Control Value Accessor
  private onChangeCallback: (_: any) => void = noop;

  constructor() {
    this.countries$ = of(FAKE_DATA);
  }

  /*
  ** ngModel API
  */

  // Get accessor
  get value(): any {
    return this.innerValue;
  }

  // Set accessor including call the onchange callback
  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCallback(v);
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

  // From ControlValueAccessor interface
  setDisabledState(disabled = false) {
    this.disabled = disabled;
  }

  onValueChanged(event: any) {
    this.value = event.toString();
  }

  writeValue(value: any) {
    if (`${value}` !== `${this.value}`) { // convert to string to avoid problems comparing values
      this.value = value;
    }
  }

  onAutocompleteBlur($event) {
    this.onTouchedCallback();
    this.blur.emit(this.value);
  }

  labelFn = (item) => {
    return item ? item.name : item;
  }

  valueFn = (item) => {
    return item ? item.code : item;
  }

}
