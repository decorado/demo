import { Component, Input, Output, EventEmitter, forwardRef, ViewChild, OnDestroy, ElementRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DecAutocompleteComponent } from './../autocomplete/autocomplete.component';
import { timer, Subscription } from 'rxjs';

//  Return an empty function to be used as default trigger functions
const noop = () => {
};

//  Used to extend ngForms functions
const AUTOCOMPLETE_ROLES_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => AutocompleteSquadsComponent),
  multi: true
};

@Component({
  selector: 'dec-autocomplete-squads',
  templateUrl: './autocomplete-squads.component.html',
  styleUrls: ['./autocomplete-squads.component.scss'],
  providers: [AUTOCOMPLETE_ROLES_CONTROL_VALUE_ACCESSOR]
})
export class AutocompleteSquadsComponent implements ControlValueAccessor, OnDestroy {

  endpoint = 'jobs/squads/options';

  valueAttr = 'key';

  labelAttr = 'value';

  touched: boolean;

  @Input() disabled: boolean;

  @Input() required: boolean;

  @Input() name = 'Squads autocomplete';

  @Input() placeholder = 'Squads autocomplete';

  @Input() multi: boolean;

  @Input() notFoundMessage: string;

  @Output() blur: EventEmitter<any> = new EventEmitter<any>();

  @Output() optionSelected: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild(DecAutocompleteComponent) autocompleteComponent: DecAutocompleteComponent;

  @Input()
  get type(): string { return this._type; }
  set type(v: string) {
    if (this._type !== v) {
      this._type = v;
      this.setEndpointBasedOnInputs();
    }
  }

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

  labelFn(squads) {
    return `${squads.value} #${squads.key}`;
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

  setEndpointBasedOnInputs() {
    const params = [];
    let endpoint = `${this.endpoint}`;

    if (this.type) {
      params.push(`type=${this.type}`);
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
