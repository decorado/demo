import { Component, Input, forwardRef, Output, EventEmitter, AfterViewInit, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { DecApiService } from './../../services/api/decora-api.service';
import { DecAutocompleteComponent } from './../autocomplete/autocomplete.component';

const BASE_AUTOCOMPLETE_PRODUCT_ENDPOINT = '/legacy/product/search';

//  Return an empty function to be used as default trigger functions
const noop = () => {
};

//  Used to extend ngForms functions
const AUTOCOMPLETE_PRODUCT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DecAutocompleteProductComponent),
  multi: true
};

@Component({
  selector: 'dec-autocomplete-product',
  templateUrl: './autocomplete-product.component.html',
  styleUrls: ['./autocomplete-product.component.scss'],
  providers: [AUTOCOMPLETE_PRODUCT_CONTROL_VALUE_ACCESSOR]
})
export class DecAutocompleteProductComponent implements ControlValueAccessor, AfterViewInit {

  endpoint;

  @Input() valueAttr = 'id';

  @Input()
  set companyId(v: string) {
    if (this._companyId !== v) {
      this._companyId = v;
      this.value = undefined;
      this.endpoint = undefined; // enforce autocomplete reload
      if (this.initialized) {
        this.setEndpointBasedOnInputs();
      }
    }
  }

  get companyId() {
    return this._companyId;
  }

  @Input()
  set modelApproved(v: boolean) {
    if (this._modelApproved !== v) {
      this._modelApproved = v;
      if (this.initialized) {
        this.setEndpointBasedOnInputs();
      }
    }
  }

  get modelApproved() {
    return this._modelApproved;
  }

  @Input() disabled: boolean;

  @Input() required: boolean;

  @Input() name = 'Product autocomplete';

  @Input() placeholder = 'Product autocomplete';

  @Input() multi: boolean;

  @Input() notFoundMessage: string;

  @Input() repeat: boolean;

  @Output() blur: EventEmitter<any> = new EventEmitter<any>();

  @Output() optionSelected: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild(DecAutocompleteComponent) autocompleteComponent: DecAutocompleteComponent;

  private _companyId: string;

  private _modelApproved: boolean;

  private params: any = [];

  private initialized;

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

  ngAfterViewInit() {
    this.initialized = true;

    setTimeout(() => {
      this.setEndpointBasedOnInputs();
    }, 0);

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

  labelFn(company) {
    return `#${company.sku} - ${company.name}`;
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
    this.indentifyParams();
    let endpoint = BASE_AUTOCOMPLETE_PRODUCT_ENDPOINT;
    if (this.params.length > 0) {
      this.params.forEach((param, index) => {
        const paramName = Object.keys(param)[0];
        const paramValue = param[paramName];
        endpoint += index === 0 ? '?' : '&';
        endpoint += paramName;
        endpoint += '=';
        endpoint += paramValue;
      });
    }
    this.endpoint = endpoint;
  }

  onAutocompleteBlur($event) {
    this.onTouchedCallback();
    this.blur.emit(this.value);
  }

  private indentifyParams() {

    this.params = [];

    if (this.companyId) {
      this.params.push({
        companyId: this.companyId
      });
    }

    if (this.modelApproved) {
      this.params.push({
        modelApproved: this.modelApproved
      });
    }
  }

}
