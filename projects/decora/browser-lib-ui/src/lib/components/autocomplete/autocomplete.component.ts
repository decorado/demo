import { Component, AfterViewInit, Input, forwardRef, ViewChild, Output, EventEmitter, OnDestroy, ContentChild, ElementRef } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { DecApiService } from './../../services/api/decora-api.service';
import { Observable, of, BehaviorSubject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, tap, map } from 'rxjs/operators';
import { LabelFunction, ValueFunction, SelectionEvent, CustomFetchFunction } from './autocomplete.models';
import { MatAutocompleteTrigger, MatChipList } from '@angular/material';
import { DecAutocompleteOptionTemplateComponent } from './dec-autocomplete-option-template/dec-autocomplete-option-template.component';

//  Return an empty function to be used as default trigger functions
const noop = () => {
};

const extractResOptions = (res) => res;

//  Used to extend ngForms functions
const AUTOCOMPLETE_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DecAutocompleteComponent),
  multi: true
};

@Component({
  selector: 'dec-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['autocomplete.component.scss'],
  providers: [AUTOCOMPLETE_CONTROL_VALUE_ACCESSOR]
})
export class DecAutocompleteComponent implements ControlValueAccessor, AfterViewInit, OnDestroy {

  autocompleteInput = new FormControl('');

  options$: Observable<any[]>;

  optionsSelected: any[];

  writtenValue: any;

  separatorKeysCodes: number[] = [ENTER, COMMA];

  @Input() customFetchFunction: CustomFetchFunction;

  @Input() extractRowsFn = extractResOptions;

  @Input() endpoint;

  @Input() multi: boolean;

  @Input() repeat: boolean;

  @Input() labelFn: LabelFunction;

  @Input() labelAttr: string;

  @Input() name = 'autocompleteInput';

  @Input() placeholder = '';

  @Input() valueFn: ValueFunction;

  @Input() valueAttr: string;

  @Input() notFoundMessage: string;

  @Input()
  get required(): boolean { return this._required; }
  set required(v: boolean) {
    this._required = v;
    this.refreshChipsListError();
  }


  @Input()
  get options(): any[] { return this._filteredOptions; }
  set options(v: any[]) {
    this._innerOptions = v;
  }

  @Input()
  get disabled(): boolean { return this._disabled; }
  set disabled(v: boolean) {
    this._disabled = v;
    if (v) {
      this.autocompleteInput.disable();
    } else {
      this.autocompleteInput.enable();
    }
  }

  @Input()
  get touched() { return this._touched; }
  set touched(v: boolean) {
    this._touched = v;
    if (v) {
      this.setTouched();
    } else {
      this.setUntouched();
    }
  }

  // NG_MODEL vvalue
  get value(): any { return this.innerValue; }
  set value(v: any) {
    if (v !== this.innerValue) {
      this.setInnerValue(v);
      this.onChangeCallback(v);
      this.refreshChipsListError();
    }
  }

  // Events
  @Output() blur: EventEmitter<any> = new EventEmitter<any>();

  @Output() optionSelected: EventEmitter<SelectionEvent> = new EventEmitter<SelectionEvent>();

  // View elements
  @ViewChild('termInput') termInput: ElementRef;

  @ViewChild('decAutocompleteForm') decAutocompleteForm: ElementRef;

  @ViewChild('chipList') chipList;

  @ViewChild(MatAutocompleteTrigger) autocompleteTrigger: MatAutocompleteTrigger;

  @ViewChild(MatChipList) decAutocompleteChipList: MatChipList;

  // content elements
  @ContentChild(DecAutocompleteOptionTemplateComponent) optionTemplate: DecAutocompleteOptionTemplateComponent;

  // private data;
  private _disabled: boolean;

  private _filteredOptions: any[];

  private _innerOptions: any[];

  private _touched: boolean;

  private _required: boolean;

  private responses: { [key: string]: any } = {};

  private search$ = new BehaviorSubject<string>(undefined);

  private searchInputSubscription: Subscription;

  private options$Subscription: Subscription;

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
  ) { }

  ngAfterViewInit() {
    this.detectRequiredData()
    .then(() => {
      this.subscribeToInputValueChanges();
      this.subscribeToSearchAndSetOptionsObservable();
      this.subscribeToSearchOptions();
    });
  }

  ngOnDestroy() {
    this.unsubscribeFromInputValueChanges();
    this.unsubscribeFromSearchAndSetOptionsObservable();
    this.unsubscribeFromSearchOptions();
  }

  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

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
      this.optionsSelected = [];
      this.writtenValue = value;
      this.innerValue = value;
      this.populateAutocompleteWithInitialValues(value, true);
    }
  }

  onOptionSelected($event) {
    let shouldEmit = true;
    const selectedOption = $event.option.value;
    const selectedOptionValue = this.extractValue(selectedOption);
    if (selectedOptionValue !== this.value) {
      if (this.multi) {
        shouldEmit = this.addOptionToOptionsSelected(selectedOption);
        this.setInputValue(undefined);
      } else {
        this.value = selectedOptionValue;
      }
      if (shouldEmit) {
        this.optionSelected.emit({
          value: this.value,
          option: selectedOption,
          options: this._innerOptions,
        });
      }
      this.blurInput();
    }
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
    this.optionsSelected = undefined;
    this.setInputValue('');

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
    this.populateAutocompleteWithInitialValues(this.writtenValue);
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

  extractTrimmedLabel = (item: any) => {
    const label = this.extractLabel(item) || '';
    return label.trim();
  }

  remove(option: string): void {
    const index = this.optionsSelected.indexOf(option);
    if (index >= 0) {
      this.optionsSelected.splice(index, 1);
    }
    this.updateValueWithOptionsSelected();
  }

  getSelectableOptions = (options) => {
    const isArray = options ? Array.isArray(options) : false;
    let selectableOptions = [];
    if (isArray && !this.repeat) {
      selectableOptions = [...options].filter(option => {
        const optionValue = this.extractValue(option);
        let alreadySelected: boolean;
        if (this.multi) {
          alreadySelected = this.optionsSelected && this.optionsSelected.find(selected => {
            const selectedValue = this.extractValue(selected);
            return this.compareAsString(selectedValue, optionValue);
          }) ? true : false;
        } else {
          alreadySelected = this.compareAsString(this.value, optionValue);
        }
        return !alreadySelected;
      });
    }
    return selectableOptions;
  }

  showClearButton() {
    const thereIsValueSet = this.detectIfHasValue(this.value);
    const show = !this.disabled && !this.required && thereIsValueSet;
    return show;
  }

  showResetButton() {
    const valueAsString = Array.isArray(this.value) ? JSON.stringify(this.value) : this.value;
    const writtenValueAsString = Array.isArray(this.writtenValue) ? JSON.stringify(this.writtenValue) : this.writtenValue;
    const show = !this.disabled && (valueAsString !== writtenValueAsString);
    return show;
  }

  private setTouched() {
    if (this.multi) {
      this.refreshChipsListError();
    } else {
      this.autocompleteInput.markAsTouched();
    }
  }

  private setUntouched() {
    this.autocompleteInput.markAsUntouched();
    this.refreshChipsListError();
  }

  private refreshChipsListError() {
    if (this.decAutocompleteChipList) {
      const hasMultipleValue = this.value && this.value.length > 0;
      if (this.required && !hasMultipleValue) {
        if (this.touched) {
          this.decAutocompleteChipList.errorState = true;
        } else {
          this.decAutocompleteChipList.errorState = false;
        }
      } else {
        this.decAutocompleteChipList.errorState = false;
      }
    }
  }

  private subscribeToSearchOptions() {
    this.options$Subscription = this.options$.subscribe(options => {
      this._filteredOptions = options;
    });
  }

  private unsubscribeFromSearchOptions() {
    this.options$Subscription.unsubscribe();
  }

  private detectIfHasValue(variable) {
    let thereIsValueSet = false;
    if (variable) {
      const isString = typeof variable === 'string';
      if (isString) {
        thereIsValueSet = variable.length;
      } else {
        const isArray = Array.isArray(variable);
        if (isArray) {
          thereIsValueSet = variable.length;
        } else {
          thereIsValueSet = true;
        }
      }
    }
    return thereIsValueSet;
  }

  private setInputValue(v) {
    this.autocompleteInput.setValue(v);
    if (!v) {
      this.termInput.nativeElement.value = '';
    }
  }

  private searchBasedFetchingType(textSearch, rememberResponse = false): Observable<any[]> {

    if (this._innerOptions) {

      return this.searchInLocalOptions(textSearch);

    } else if (this.customFetchFunction) {

      return this.customFetchFunction(textSearch);

    } else {

      const body = textSearch ? { textSearch } : undefined;

      if (rememberResponse) {

        const dataInMemory = this.responses[textSearch];

        if (dataInMemory) {

          return of(dataInMemory);

        } else {

          return this.getRemoteData(textSearch, body, rememberResponse);

        }

      } else {

        return this.getRemoteData(textSearch, body, rememberResponse);

      }

    }

  }

  private getRemoteData(textSearch: string, body: any, rememberResponse = false) {
    return this.service.get<any[]>(this.endpoint, body).pipe(
      map(res => this.extractRowsFn(res)),
      tap((options: any[]) => {
        if (rememberResponse) {
          this.responses[textSearch] = options;
        }
      })
    );
  }

  private searchInLocalOptions(term: string) {
    const termString = `${term}`;
    let filteredData = this._innerOptions;
    if (termString) {
      filteredData = this._innerOptions.filter(item => {
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

  private blurInput() {
    this.termInput.nativeElement.blur();
  }

  private addOptionToOptionsSelected(option): boolean {
    if (option) {
      let shouldEmit = true;
      if (this.optionsSelected && this.optionsSelected.length) {
        const index = this.optionsSelected.indexOf(option);
        if (index === -1) {
          this.optionsSelected.push(option);
          this.setInputValue(null);
          this.updateValueWithOptionsSelected();
        } else {
          shouldEmit = false;
        }
      } else {
        this.optionsSelected = [option];
        this.updateValueWithOptionsSelected();
      }
      return shouldEmit;
    } else {
      return false;
    }
  }

  private populateAutocompleteWithInitialValues(value, reloadOptions = false) {
    if (value) {
      if (this.multi) {
        const isArray = Array.isArray(value);
        if (isArray) {
          this.optionsSelected = [];
          value.forEach(optionValue => {
            this.loadRemoteObjectByWrittenValue(optionValue).then((option) => {
              this.addOptionToOptionsSelected(option);
            });
          });
        }
      } else {
        this.loadRemoteObjectByWrittenValue(value).then((options) => {
          this.setInnerValue(value);
        });
      }
    }
  }

  private updateValueWithOptionsSelected() {
    if (this.optionsSelected && this.optionsSelected.length) {
      this.value = this.optionsSelected.map(option => this.extractValue(option));
    } else {
      this.value = [];
    }

  }

  private loadRemoteObjectByWrittenValue(writtenValue: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      if (writtenValue) {
        this.searchBasedFetchingType(writtenValue, true)
          .subscribe((res: any[]) => {
            if (Array.isArray(res)) {
              this._filteredOptions = Array.isArray(res) ? res : [];
              resolve(res[0]);
            } else {
              reject();
            }
          });
      } else {
        resolve(writtenValue);
      }
    });
  }

  private detectRequiredData(): Promise<any> {
    return new Promise((resolve, reject) => {
      let error: string;
      if (!this.endpoint && !this._innerOptions && !this.customFetchFunction) {
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
    this.blurInput();
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
    this.setInputValue(option);
  }

  private getOptionBasedOnValue(v: any) {
    return this.options.find(item => {
      const itemValue = this.extractValue(item);
      return this.compareAsString(itemValue, v);
    });
  }

  private subscribeToInputValueChanges() {
    this.searchInputSubscription = this.autocompleteInput.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
      )
      .subscribe(searchText => {
        this.search$.next(searchText);
      });
  }

  private unsubscribeFromInputValueChanges() {
    this.searchInputSubscription.unsubscribe();
  }

  private subscribeToSearchAndSetOptionsObservable() {
    this.options$ = this.search$
      .pipe(
        distinctUntilChanged(),
        switchMap((textSearch: string) => {
          const searchTerm = textSearch || '';
          const isStringTerm = typeof searchTerm === 'string';
          if (isStringTerm) {
            return this.searchBasedFetchingType(searchTerm);
          } else {
            return of(this.options);
          }
        })
      );
  }

  private unsubscribeFromSearchAndSetOptionsObservable() {
    this.searchInputSubscription.unsubscribe();
  }

}
