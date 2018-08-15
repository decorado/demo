import { Component, Input, forwardRef, Output, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { DecApiService } from './../../services/api/decora-api.service';
import { Observable } from 'rxjs';
import { HttpUrlEncodingCodec } from '@angular/common/http';

//  Return an empty function to be used as default trigger functions
const noop = () => {
};

const ENDPOINT_TESTE = 'report/accounts/options';

//  Used to extend ngForms functions
const AUTOCOMPLETE_ROLES_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DecAutocompleteAccountComponent),
  multi: true
};

@Component({
  selector: 'dec-autocomplete-account',
  templateUrl: './autocomplete-account.component.html',
  styles: [],
  providers: [AUTOCOMPLETE_ROLES_CONTROL_VALUE_ACCESSOR]
})
export class DecAutocompleteAccountComponent implements ControlValueAccessor {

  endpoint: string;

  labelAttr = 'value';

  valueAttr = 'key';

  @Input()
  set types(v: string[]) {
    if (v !== this._types) {
      this._types = v;
      this.setRolesParams();
    }
  }

  get types(): string[] {
    return this._types;
  }

  _types: string[];
  @Input() disabled: boolean;

  @Input() required: boolean;

  @Input() name = 'Account autocomplete';

  @Input() placeholder = 'Account autocomplete';

  @Output() blur: EventEmitter<any> = new EventEmitter<any>();

  @Output() optionSelected: EventEmitter<any> = new EventEmitter<any>();

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

  constructor(
    private decoraApi: DecApiService
  ) { }

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

  onValueChanged(event: any) {
    this.value = event.toString();
  }

  writeValue(value: any) {
    if (`${value}` !== `${this.value}`) { // convert to string to avoid problems comparing values
      if (value && value !== undefined && value !== null) {
        this.value = value;
      }
    }
  }

  onAutocompleteBlur($event) {
    this.onTouchedCallback();
    this.blur.emit(this.value);
  }

  labelFn(account) {
    return `${account.value} #${account.key}`;
  }

  setRolesParams() {
    const params = [];
    let endpoint = `${ENDPOINT_TESTE}`;

    if (this.types) {
      params.push(`roles=${encodeURI(JSON.stringify(this.types))}`);
    }

    if (params.length) {
      endpoint += `?${params.join('&')}`;
    }

    this.endpoint = endpoint;
  }

}
