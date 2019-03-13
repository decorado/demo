import { Component, Input, Output, EventEmitter, forwardRef, ViewChild, OnDestroy, ElementRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DecAutocompleteComponent } from './../autocomplete/autocomplete.component';
import { Subscription, timer } from 'rxjs';

//  Return an empty function to be used as default trigger functions
const noop = () => {
};

//  Used to extend ngForms functions
const AUTOCOMPLETE_TAGS_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DecAutocompleteTagsComponent),
  multi: true
};

@Component({
  selector: 'dec-autocomplete-tags',
  templateUrl: './autocomplete-tags.component.html',
  styleUrls: ['./autocomplete-tags.component.css'],
  providers: [AUTOCOMPLETE_TAGS_CONTROL_VALUE_ACCESSOR]
})
export class DecAutocompleteTagsComponent implements ControlValueAccessor, OnDestroy {

  valueAttr = 'key';

  labelAttr = 'value';

  touched: boolean;

  @Input() disabled: boolean;

  @Input() required: boolean;

  @Input() name = 'Tags autocomplete';

  @Input() placeholder = 'Tags autocomplete';

  @Input() multi: boolean;

  @Input() notFoundMessage: string;

  @Input() repeat: boolean;

  @Output() blur: EventEmitter<any> = new EventEmitter<any>();

  @Output() optionSelected: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild(DecAutocompleteComponent) autocompleteComponent: DecAutocompleteComponent;

  @Input()
  get endpoint() { return this._endpoint; }
  set endpoint(v) {
    if (v && v !== this._endpoint) {
      this.value = undefined;
      this._endpoint = undefined; // enforce autocomplete reload
      setTimeout(() => { // ensures a digest cicle before reseting the endpoint
        this._endpoint = v;
      }, 0);
    }
  }


  private classWatcher: Subscription;

  private classesString: string;

  private _endpoint: string;

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

  labelFn(tags) {
    return `${tags.value} #${tags.key}`;
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
