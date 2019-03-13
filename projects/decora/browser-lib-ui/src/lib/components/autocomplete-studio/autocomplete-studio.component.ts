import { Component, Input, Output, EventEmitter, forwardRef, ViewChild, OnDestroy, ElementRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DecAutocompleteComponent } from './../autocomplete/autocomplete.component';
import { Subscription, timer } from 'rxjs';

//  Return an empty function to be used as default trigger functions
const noop = () => {
};

//  Used to extend ngForms functions
const AUTOCOMPLETE_ROLES_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => AutocompleteStudioComponent),
  multi: true
};

@Component({
  selector: 'dec-autocomplete-studio',
  templateUrl: './autocomplete-studio.component.html',
  styleUrls: ['./autocomplete-studio.component.scss'],
  providers: [AUTOCOMPLETE_ROLES_CONTROL_VALUE_ACCESSOR]
})
export class AutocompleteStudioComponent implements ControlValueAccessor, OnDestroy {

  endpoint = '/legacy/product/modeling/studio/search';

  valueAttr = 'id';

  labelAttr = 'name';

  touched: boolean;

  @Input() disabled: boolean;

  @Input() required: boolean;

  @Input() name = 'Studio autocomplete';

  @Input() placeholder = 'Studio autocomplete';

  @Input() multi: boolean;

  @Input() notFoundMessage: string;

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
      if (value && value !== undefined && value !== null) {
        this.value = value;
      }
    }
  }

  onAutocompleteBlur($event) {
    this.onTouchedCallback();
    this.blur.emit(this.value);
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

