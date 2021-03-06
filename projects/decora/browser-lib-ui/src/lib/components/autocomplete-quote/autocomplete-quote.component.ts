import { Component, Input, forwardRef, Output, EventEmitter, AfterViewInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { DecAutocompleteComponent } from './../autocomplete/autocomplete.component';
import { Subscription, timer } from 'rxjs';

//  Return an empty function to be used as default trigger functions
const noop = () => {
};

const QUOTE_ENDPOINT = '/projects/${projectId}/quotes/options';

//  Used to extend ngForms functions
const AUTOCOMPLETE_QUOTE_CONTROL_VALUE_ACCESSOR: any = {
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
export class DecAutocompleteQuoteComponent implements ControlValueAccessor, AfterViewInit, OnDestroy {

  endpoint: string;

  valueAttr = 'key';

  touched: boolean;

  @Input() disabled: boolean;

  @Input() required: boolean;

  @Input() name = 'Quote autocomplete';

  @Input() placeholder = 'Quote autocomplete';

  @Input() multi: boolean;

  @Input() notFoundMessage: string;

  @Input() repeat: boolean;

  @Output() blur: EventEmitter<any> = new EventEmitter<any>();

  @Output() optionSelected: EventEmitter<any> = new EventEmitter<any>();

  @Input()
  get projectId() { return this._projectId; }
  set projectId(v: string) {
    if (this._projectId !== v) {
      this._projectId = v;
      this.value = undefined;
      this.endpoint = undefined; // enforce autocomplete reload
      setTimeout(() => { // ensures a digest cicle before reseting the endpoint
        this.setEndpointBasedOnInputs();
      }, 0);
    }
  }

  @Input()
  get decoraProduct() { return this._decoraProduct; }
  set decoraProduct(v: string) {
    if (this._decoraProduct !== v) {
      this._decoraProduct = v;

      if (this.viewInitialized) {
        this.setEndpointBasedOnInputs();
      }
    }
  }

  @Input()
  get decoraProductVariant() { return this._decoraProductVariant; }
  set decoraProductVariant(v: string) {
    if (this._decoraProductVariant !== v) {
      this._decoraProductVariant = v;

      if (this.viewInitialized) {
        this.setEndpointBasedOnInputs();
      }
    }
  }

  @ViewChild(DecAutocompleteComponent) autocompleteComponent: DecAutocompleteComponent;

  private _projectId: string;

  private _decoraProduct: string;

  private _decoraProductVariant: string;

  private viewInitialized: boolean;

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
    this.viewInitialized = true;
    this.setEndpointBasedOnInputs();
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
    value = value === null ? undefined : value; // v7 bug. remove it when the issue is closed: https://github.com/angular/angular/issues/14988
    if (`${value}` !== `${this.value}`) { // convert to string to avoid problems comparing values
      this.value = value;
    }
  }

  onAutocompleteBlur($event) {
    this.onTouchedCallback();
    this.blur.emit(this.value);
  }

  labelFn(item: any = {}) {
    return `${item.value} #${item.key}`;
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

  private setEndpointBasedOnInputs() {
    let endpoint;
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
      setTimeout(() => {
        this.endpoint = endpoint;
      }, 0);
    }
  }

}
