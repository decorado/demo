import { Component, Input, forwardRef, Output, EventEmitter, AfterViewInit, ViewChild, OnDestroy, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { DecAutocompleteComponent } from './../autocomplete/autocomplete.component';
import { Subscription, timer } from 'rxjs';

//  Return an empty function to be used as default trigger functions
const noop = () => {
};

const ACCOUNTS_ENDPOINT = 'accounts/options';

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
export class DecAutocompleteAccountComponent implements ControlValueAccessor, AfterViewInit, OnDestroy {

  endpoint: string;

  valueAttr = 'key';

  touched: boolean;

  @Input()
  set types(v: string[]) {
    if (v !== this._types) {
      this._types = v;
      this.value = undefined;
      this.endpoint = undefined; // enforce autocomplete reload
      if (this.initialized) {
        setTimeout(() => { // ensures a digest cicle before reseting the endpoint
          this.setEndpointBasedOnInputs();
        });
      }
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

  @Input() multi: boolean;

  @Input() notFoundMessage: string;

  @Input() repeat: boolean;

  @Output() blur: EventEmitter<any> = new EventEmitter<any>();

  @Output() optionSelected: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild(DecAutocompleteComponent) autocompleteComponent: DecAutocompleteComponent;

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

  private initialized: boolean;

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

  labelFn(account) {
    return `${account.value} #${account.key}`;
  }

  setEndpointBasedOnInputs() {
    const params = [];
    let endpoint = `${ACCOUNTS_ENDPOINT}`;

    if (this.types && this.types.length) {
      params.push(`roles=${encodeURI(JSON.stringify(this.types))}`);
    }

    if (params.length) {
      endpoint += `?${params.join('&')}`;
    }

    this.endpoint = endpoint;
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
