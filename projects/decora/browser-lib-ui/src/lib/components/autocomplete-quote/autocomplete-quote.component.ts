import { Component, Input, forwardRef, Output, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Observable } from 'rxjs';
import { DecApiService } from './../../services/api/decora-api.service';
import { map } from 'rxjs/operators';

//  Return an empty function to be used as default trigger functions
const noop = () => {
};

const QUOTE_ENDPOINT = '/projects/${projectId}/quotes/options';

//  Used to extend ngForms functions
export const AUTOCOMPLETE_QUOTE_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DecAutocompleteQuoteComponent),
  multi: true
};

@Component({
  selector: 'dec-autocomplete-quote',
  templateUrl: './autocomplete-quote.component.html',
  styles: [],
  providers: [AUTOCOMPLETE_QUOTE_CONTROL_VALUE_ACCESSOR]
})
export class DecAutocompleteQuoteComponent implements ControlValueAccessor {

  endpoint: string;

  labelAttr = 'value';

  valueAttr = 'key';

  @Input() disabled: boolean;

  @Input() required: boolean;

  @Input() name = 'Quote autocomplete';

  @Input() placeholder = 'Quote autocomplete';

  @Output() blur: EventEmitter<any> = new EventEmitter<any>();

  @Output() optionSelected: EventEmitter<any> = new EventEmitter<any>();

  @Input()
  set projectId(v: string) {
    this._projectId = v;
    this.setEndpointBasedOnInputs();
  }

  get projectId() {
    return this._projectId;
  }

  @Input()
  set decoraProduct(v: string) {
    this._decoraProduct = v;
    this.setEndpointBasedOnInputs();
  }

  get decoraProduct() {
    return this._decoraProduct;
  }

  @Input()
  set decoraProductVariant(v: string) {
    this._decoraProductVariant = v;
    this.setEndpointBasedOnInputs();
  }

  get decoraProductVariant() {
    return this._decoraProductVariant;
  }

  private _projectId: string;

  private _decoraProduct: string;

  private _decoraProductVariant: string;

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
    if (value !== null && `${value}` !== `${this.value}`) { // convert to string to avoid problems comparing values
      if (value && value !== undefined && value !== null) {
        this.value = value;
      }
    }
  }

  onAutocompleteBlur($event) {
    this.onTouchedCallback();
    this.blur.emit(this.value);
  }

  private setEndpointBasedOnInputs() {

    let endpoint;

    this.value = undefined;

    if (this.projectId) {

      endpoint = QUOTE_ENDPOINT.replace('${projectId}', this.projectId);

      const params = [];

      if (this.decoraProduct) {
        params.push(`productId=${this.decoraProduct}`);
      }

      if (this.decoraProductVariant) {
        params.push(`productVariantId=${this.decoraProductVariant}`);
      }

      if (params.length) {

        endpoint += `?${params.join('&')}`;

      }

    }

    if (this.endpoint !== endpoint) {

      this.endpoint = undefined;

      setTimeout(() => {

        this.endpoint = endpoint;

      }, 0);

    }

  }

}
