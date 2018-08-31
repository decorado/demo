import { Component, OnInit, Input, Output, EventEmitter, forwardRef, AfterViewInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

//  Return an empty function to be used as default trigger functions
const noop = () => {
};

//  Used to extend ngForms functions
const AUTOCOMPLETE_ROLES_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => AutocompleteComplexityComponent),
  multi: true
};

const BASIC_ENDPOINT = 'jobs/complexities/options';

@Component({
  selector: 'dec-autocomplete-complexity',
  templateUrl: './autocomplete-complexity.component.html',
  styleUrls: ['./autocomplete-complexity.component.scss'],
  providers: [AUTOCOMPLETE_ROLES_CONTROL_VALUE_ACCESSOR]
})
export class AutocompleteComplexityComponent implements ControlValueAccessor {

  endpoint = 'jobs/complexities/options';

  valueAttr = 'key';

  labelAttr = 'value';

  @Input()
  set type(v) {
    if (v !== this._type) {
      this._type = v;
      this.setTypeParams();
    }
  }

  get type() {
    return this._type;
  }

  private _type: string;

  @Input() disabled: boolean;

  @Input() required: boolean;

  @Input() name = 'Complexity autocomplete';

  @Input() multi: boolean;

  @Input() repeat: boolean;

  @Input() placeholder = 'Complexity autocomplete';

  @Output() blur: EventEmitter<any> = new EventEmitter<any>();

  @Output() optionSelected: EventEmitter<any> = new EventEmitter<any>();

  @Output() enterButton: EventEmitter<any> = new EventEmitter<any>();

  /*
  ** ngModel propertie
  ** Used to two way data bind using [(ngModel)]
  */
  //  The internal data model
  private innerValue: any = '';
  //  Placeholders for the callbacks which are later provided by the Control Value Accessor
  private onTouchedCallback: () => void = noop;
  //  Placeholders for the callbacks which are later provided by the Control Value Accessor
  private onChangeCallback: (_: any) => void = noop;

  constructor() { }

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

  labelFn(complexity) {
    return `${complexity.value} #${complexity.key}`;
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

  writeValue(value: any) {
    if (`${value}` !== `${this.value}`) { // convert to string to avoid problems comparing values
      this.value = value;
    }
  }

  onAutocompleteBlur($event) {
    this.onTouchedCallback();
    this.blur.emit(this.value);
  }

  setTypeParams() {
    const params = [];
    let endpoint = `${BASIC_ENDPOINT}`;

    params.push(`type=${this.type}`);

    endpoint += `?${params.join('&')}`;

    this.endpoint = endpoint;
  }
}
