import { Component, Input, forwardRef, Output, EventEmitter, AfterViewInit, ViewChild, OnDestroy, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { DecAutocompleteComponent } from './../autocomplete/autocomplete.component';
import { Subscription, timer } from 'rxjs';

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
export class DecAutocompleteProductComponent implements ControlValueAccessor, AfterViewInit, OnDestroy {

  endpoint;

  touched: boolean;

  @Input() valueAttr = 'id';

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

  @Input()
  get companyId() { return this._companyId; }
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

  @Input()
  get modelApproved() { return this._modelApproved; }
  set modelApproved(v: boolean) {
    if (this._modelApproved !== v) {
      this._modelApproved = v;
      if (this.initialized) {
        this.setEndpointBasedOnInputs();
      }
    }
  }

  private _companyId: string;

  private _modelApproved: boolean;

  private params: any = [];

  private initialized;

  private classWatcher: Subscription;

  private classesString: string;

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

  constructor(
    private elementRef: ElementRef<HTMLElement>,
  ) {
    this.subscribeToClassChange();
  }

  ngOnDestroy() {
    this.unsubscribeToClassChange();
  }

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

  private subscribeToClassChange() {
    this.classWatcher = timer(100, 250).subscribe(this.detectClassChanges);
  }

  private detectClassChanges = () => {
    const classesString = this.elementRef.nativeElement.classList.value;
    if (this.classesString !== classesString) {
      this.classesString = classesString;
      const hasTouchedClass = classesString.search('ng-touched') >= 0;
      this.touched = hasTouchedClass;
    }
  }

  private unsubscribeToClassChange() {
    this.classWatcher.unsubscribe();
  }

}
