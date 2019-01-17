import { Component, Input, forwardRef, Output, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { DecApiService } from './../../services/api/decora-api.service';

export const BASE_AUTOCOMPLETE_PROJECT_ENDPOINT = '/projects/options';

//  Return an empty function to be used as default trigger functions
const noop = () => {
};

//  Used to extend ngForms functions
const AUTOCOMPLETE_PROJECT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DecAutocompleteProjectComponent),
  multi: true
};

@Component({
  selector: 'dec-autocomplete-project',
  templateUrl: './autocomplete-project.component.html',
  styles: [],
  providers: [AUTOCOMPLETE_PROJECT_CONTROL_VALUE_ACCESSOR]
})
export class DecAutocompleteProjectComponent implements ControlValueAccessor {

  endpoint;

  valueAttr = 'key';

  @Input()
  set companyId(v: string) {
    if (this._companyId !== v) {
      this._companyId = v;
      this.value = undefined;
      this.endpoint = undefined; // enforce autocomplete reload
      setTimeout(() => { // ensures a digest cicle before reseting the endpoint
        this.setEndpointBasedOnInputs();
      }, 0);
    }
  }

  get companyId() {
    return this._companyId;
  }

  @Input() disabled: boolean;

  @Input() required: boolean;

  @Input() name = 'Project autocomplete';

  @Input() placeholder = 'Project autocomplete';

  @Input() multi: boolean;

  @Input() repeat: boolean;

  @Output() blur: EventEmitter<any> = new EventEmitter<any>();

  @Output() optionSelected: EventEmitter<any> = new EventEmitter<any>();

  private _companyId: string;

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

  constructor(private decoraApi: DecApiService) { }

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

  labelFn(company) {
    return `${company.value} #${company.key}`;
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

  setEndpointBasedOnInputs() {
    if (this.companyId) {
      this.endpoint = BASE_AUTOCOMPLETE_PROJECT_ENDPOINT + '?companyId=' + this.companyId;
    } else {
      this.endpoint = BASE_AUTOCOMPLETE_PROJECT_ENDPOINT;
    }
  }

  onAutocompleteBlur($event) {
    this.onTouchedCallback();
    this.blur.emit(this.value);
  }

}
