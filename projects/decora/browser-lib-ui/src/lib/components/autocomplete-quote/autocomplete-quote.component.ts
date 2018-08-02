import { Component, Input, forwardRef, Output, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Observable } from 'rxjs';
import { DecApiService } from './../../services/api/decora-api.service';
import { map } from 'rxjs/operators';

//  Return an empty function to be used as default trigger functions
const noop = () => {
};

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

  BASE_ENDPOINT = '/legacy/project/${projectId}/quote';

  endpoint: string;

  labelAttr = 'value';

  valueAttr = 'key';

  @Input()
  set projectId(v: string) {
    this._projectId = v;
    this.value = undefined;
    this.setEndpointBasedOnProjectId();
  }

  get projectId() {
    return this._projectId;
  }

  @Input() disabled: boolean;

  @Input() required: boolean;

  @Input() name = 'Quote autocomplete';

  @Input() placeholder = 'Quote autocomplete';

  @Output() blur: EventEmitter<any> = new EventEmitter<any>();

  @Output() optionSelected: EventEmitter<any> = new EventEmitter<any>();

  private _projectId: string;

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

  setEndpointBasedOnProjectId() {
    this.endpoint = !this.projectId ? undefined : this.BASE_ENDPOINT.replace('${projectId}', this.projectId);
  }

  customFetchFunction = (textSearch): Observable<any> => {
    const params: any = {};
    params.textSearch = textSearch;
    this.setEndpointBasedOnProjectId();
    return this.decoraApi.get(this.endpoint, params)
    .pipe(
      map(response => {
        response = response.map(quotes => {
          return {
            key: quotes.id,
            value: quotes.productVariantId
          };
            });
        return response;
      })
    );
  }

}
