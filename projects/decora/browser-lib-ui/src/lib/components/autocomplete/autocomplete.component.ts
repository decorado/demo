import { Component, AfterViewInit, Input, forwardRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { DecApiService } from './../../services/api/decora-api.service';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, startWith, tap } from 'rxjs/operators';
import { LabelFunction, ValueFunction, SelectionEvent, CustomFetchFunction } from './autocomplete.models';
import { MatAutocompleteTrigger } from '@angular/material';

//  Return an empty function to be used as default trigger functions
const noop = () => {
};

//  Used to extend ngForms functions
export const AUTOCOMPLETE_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DecAutocompleteComponent),
  multi: true
};

@Component({
  selector: 'dec-autocomplete',
  templateUrl: './autocomplete.component.html',
  styles: [],
  providers: [AUTOCOMPLETE_CONTROL_VALUE_ACCESSOR]
})
export class DecAutocompleteComponent implements ControlValueAccessor, AfterViewInit {

  @ViewChild(MatAutocompleteTrigger)  autocompleteTrigger: MatAutocompleteTrigger;

  autocompleteInput: FormControl;

  options$: Observable<any[]>;

  writtenValue: any;

  // Params
  @Input() customFetchFunction: CustomFetchFunction;

  @Input() endpoint;

  @Input()
  set disabled(v: boolean) {
    this._disabled = v;
    if (this.autocompleteInput) {
      if (v) {
        this.autocompleteInput.disable();
      } else {
        this.autocompleteInput.enable();
      }
    }
  }
  get disabled(): boolean {
    return this._disabled;
  }

  @Input() labelFn: LabelFunction;

  @Input() labelAttr: string;

  @Input() name = 'autocompleteInput';

  @Input()
  set options(v: any[]) {
    this._options = v;
    this.innerOptions = v;
  }
  get options(): any[] {
    return this._options;
  }

  @Input() placeholder = '';

  @Input() required: boolean;

  @Input() valueFn: ValueFunction;

  @Input() valueAttr: string;

  // Events
  @Output() blur: EventEmitter<any> = new EventEmitter<any>();

  @Output() optionSelected: EventEmitter<SelectionEvent> = new EventEmitter<SelectionEvent>();

  @Output() enterButton: EventEmitter<SelectionEvent> = new EventEmitter<SelectionEvent>();

  // View elements
  @ViewChild('termInput') termInput;

  // private data;
  private _disabled: boolean;

  private _options: any[];

  private innerOptions: any[] = [];


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
    private service: DecApiService
  ) {
    this.createInput();
  }

  ngAfterViewInit() {
    this.detectRequiredData()
    .then(res => {
      this.subscribeToSearchAndSetOptionsObservable();
    });
  }

  /*
  ** ngModel VALUE
  */
  set value(v: any) {
    if (v !== this.innerValue) {
      this.setInnerValue(v);
      this.onChangeCallback(v);
    }
  }
  get value(): any {
    return this.innerValue;
  }

  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  onValueChanged(event: any) {
    this.value = event.toString();
  }

  writeValue(value: any) {
    if (value !== null && `${value}` !== `${this.value}`) { // convert to string to avoid problems comparing values
      this.loadRemoteObjectByWrittenValue(value)
      .then((options) => {
        this.setInnerValue(value);
      });
    }
  }

  onOptionSelected($event) {
    const selectedOption = $event.option.value;
    const selectedOptionValue = this.extractValue(selectedOption);
    if (selectedOptionValue !== this.value) {
      this.value = selectedOptionValue;
      this.optionSelected.emit({
        value: this.value,
        option: selectedOption,
        options: this.innerOptions,
      });
    }
  }

  onEnterButton($event) {
    this.enterButton.emit($event);
  }

  setFocus() {
    this.termInput.nativeElement.focus();
  }

  openPanel() {
    this.autocompleteTrigger.openPanel();
  }

  closePanel() {
    this.autocompleteTrigger.closePanel();
  }

  onBlur($event) {
    this.onTouchedCallback();
    this.blur.emit(this.value);
  }

  clear(reopen = false) {
    this.value = undefined;
    this.autocompleteInput.setValue('');
    if (this.writtenValue === this.value) {
      this.resetInputControl();
    }
    if (reopen) {
      setTimeout(() => {
        this.openPanel();
      }, 1);
    }
  }

  reset() {
    this.value = this.writtenValue;
    this.setInnerValue(this.writtenValue);
    this.resetInputControl();
  }

  extractLabel: LabelFunction = (item: any): string => {
    let label = item; // use the object itself if no label function or attribute is provided
    if (item) {
      if (this.labelFn) { // Use custom label function if provided
        label = this.labelFn(item);
      } else if (this.labelAttr) { // Use object label attribute if provided
        label = item[this.labelAttr] || undefined;

      }
    }
    label = this.ensureString(label);
    return label;
  }

  private loadRemoteObjectByWrittenValue(writtenValue: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      if (writtenValue) {
        this.searchBasedFetchingType(writtenValue)
        .subscribe((res) => {
          resolve(writtenValue);
        });
      } else {
        resolve(writtenValue);
      }
    });
  }

  private detectRequiredData(): Promise<any> {
    return new Promise((resolve, reject) => {
      let error: string;
      if (!this.endpoint && !this.options && !this.customFetchFunction) {
        error = 'No endpoint | options | customFetchFunction set. You must provide one of them to be able to use the Autocomplete';
      }
      if (error) {
        this.raiseError(error);
        reject(error);
      } else {
        resolve();
      }
    });
  }

  private resetInputControl() {
    this.autocompleteInput.markAsPristine();
    this.autocompleteInput.markAsUntouched();
  }

  private extractValue: ValueFunction = (item: any): any => {
    let value = item; // use the object itself if no value function or attribute is provided
    if (item) {
      if (this.valueFn) { // Use custom value function if provided
        value = this.valueFn(item);
      } else if (this.valueAttr) { // Use object value attribute if provided
        value = item[this.valueAttr] || undefined;
      }
    }
    return value;
  }

  private compareAsString(v1, v2) {
    const string1 = this.ensureString(v1);
    const string2 = this.ensureString(v2);
    return string1 === string2;
  }

  private ensureString(v) {
    if (typeof v !== 'string') {
      if (isNaN(v)) {
        v = JSON.stringify(v);
      } else {
        v = `${v}`;
      }
    }
    return v;
  }

  private setInnerValue(v: any) {
    this.innerValue = v;
    this.setInputValueBasedOnInnerValue(v);
  }

  private setInputValueBasedOnInnerValue(v: any) {
    const option = this.getOptionBasedOnValue(v);
    this.autocompleteInput.setValue(option);
  }

  private getOptionBasedOnValue(v: any) {
    return this.innerOptions.find(item => {
      const itemValue = this.extractValue(item);
      return this.compareAsString(itemValue, v);
    });
  }

  private createInput() {
    this.autocompleteInput = new FormControl('');

    if (this.disabled) {
      this.autocompleteInput.disable();
    }
  }

  private subscribeToSearchAndSetOptionsObservable() {
    this.options$ = this.autocompleteInput.valueChanges
    .pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((textSearch: string) => {
        const isStringTerm = typeof textSearch === 'string';
        if (isStringTerm) {
          return this.searchBasedFetchingType(textSearch);
        } else {
          return of(this.innerOptions);
        }
      })
    );
  }

  private searchBasedFetchingType(textSearch): Observable<any[]> {
    if (this.options) {
      return this.searchInLocalOptions(textSearch);
    } else if (this.customFetchFunction) {
      return this.customFetchFunction(textSearch)
        .pipe(
          tap(options => {
            this.innerOptions = options;
          })
        );
    } else {
      const body = textSearch ? { textSearch } : undefined;
      return this.service.get<any[]>(this.endpoint, body)
        .pipe(
          tap((options: any[]) => {
            this.innerOptions = options;
          })
        );
    }
  }

  private searchInLocalOptions(term: string) {
    const termString = `${term}`;

    let filteredData = this.innerOptions;

    if (termString) {
      filteredData = this.innerOptions
      .filter(item => {
        const label: string = this.extractLabel(item);
        const lowerCaseLabel = label.toLowerCase();
        const lowerCaseTerm = termString.toLowerCase();
        return lowerCaseLabel.search(lowerCaseTerm) >= 0;
      });
    }

    return of(filteredData);
  }

  private raiseError(error: string) {
    throw new Error(`DecAutocompleteComponent Error:: The autocomplete with name "${this.name}" had the follow problem: ${error}`);
  }

}
