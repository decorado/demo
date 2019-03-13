import { Component, Input, Output, EventEmitter, forwardRef, AfterViewInit, ViewChild, OnDestroy, ElementRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DecAutocompleteComponent } from './../autocomplete/autocomplete.component';
import { Subscription, timer } from 'rxjs';

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
export class AutocompleteComplexityComponent implements ControlValueAccessor, OnDestroy {

  endpoint = 'jobs/complexities/options';

  valueAttr = 'key';

  labelAttr = 'value';

  touched: boolean;

  @Input()
  get type() { return this._type; }
  set type(v) {
    if (v !== this._type) {
      this._type = v;
      this.value = undefined;
      this.endpoint = undefined; // enforce autocomplete reload
      setTimeout(() => { // ensures a digest cicle before reseting the endpoint
        this.setEndpointBasedOnInputs();
      });
    }
  }

  @Input() disabled: boolean;

  @Input() required: boolean;

  @Input() name = 'Complexity autocomplete';

  @Input() multi: boolean;

  @Input() notFoundMessage: string;

  @Input() repeat: boolean;

  @Input() placeholder = 'Complexity autocomplete';

  @Output() blur: EventEmitter<any> = new EventEmitter<any>();

  @Output() optionSelected: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild(DecAutocompleteComponent) autocompleteComponent: DecAutocompleteComponent;

  private _type: string;

  private classWatcher: Subscription;

  private classesString: string;

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
    private elementRef: ElementRef<HTMLElement>,
  ) {
    this.subscribeToClassChange();
  }

  ngOnDestroy() {
    this.unsubscribeToClassChange();
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

  setEndpointBasedOnInputs() {
    const params = [];
    let endpoint = `${BASIC_ENDPOINT}`;

    params.push(`type=${this.type}`);

    endpoint += `?${params.join('&')}`;

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
