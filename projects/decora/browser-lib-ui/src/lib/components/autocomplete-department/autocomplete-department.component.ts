import { Component, Input, forwardRef, Output, EventEmitter, ViewChild, OnDestroy, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { DecAutocompleteComponent } from './../autocomplete/autocomplete.component';
import { Subscription, timer } from 'rxjs';

export const BASE_ENDPOINT = 'companies/${companyId}/departments/options';

//  Return an empty function to be used as default trigger functions
const noop = () => {
};

//  Used to extend ngForms functions
const AUTOCOMPLETE_DEPARTMENT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DecAutocompleteDepartmentComponent),
  multi: true
};

@Component({
  selector: 'dec-autocomplete-department',
  templateUrl: './autocomplete-department.component.html',
  styles: [],
  providers: [AUTOCOMPLETE_DEPARTMENT_CONTROL_VALUE_ACCESSOR]
})
export class DecAutocompleteDepartmentComponent implements ControlValueAccessor, OnDestroy {

  endpoint: string;

  labelAttr = 'value';

  valueAttr = 'key';

  touched: boolean;

  @Input()
  get companyId() { return this._companyId; }
  set companyId(v: string) {
    this._companyId = v;
    this.value = undefined;
    this.endpoint = undefined; // enforce autocomplete reload
    setTimeout(() => { // ensures a digest cicle before reseting the endpoint
      this.setEndpointBasedInputs();
    });
  }

  @Input() disabled: boolean;

  @Input() required: boolean;

  @Input() name = 'Department autocomplete';

  @Input() placeholder = 'Department autocomplete';

  @Input() multi: boolean;

  @Input() notFoundMessage: string;

  @Input() repeat: boolean;

  @Output() blur: EventEmitter<any> = new EventEmitter<any>();

  @Output() optionSelected: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild(DecAutocompleteComponent) autocompleteComponent: DecAutocompleteComponent;

  private _companyId: string;

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

  setEndpointBasedInputs() {
    this.endpoint = !this.companyId ? undefined : BASE_ENDPOINT.replace('${companyId}', this.companyId);
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
