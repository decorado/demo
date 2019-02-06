import { Component, AfterViewInit, Input, OnDestroy, ElementRef, forwardRef, ViewChild } from '@angular/core';
import { timer, Subscription } from 'rxjs';
import { NG_VALUE_ACCESSOR, NgForm, ControlValueAccessor, NgControl } from '@angular/forms';

type i18nLanguage = 'PT' | 'EN';

type i18nInputType = 'input' | 'textarea';

export interface I18nInput { en: string; pt: string; }

const noop = () => {
};

//  Used to extend ngForms functions
const INPUT_I18N_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DecI18nInputComponent),
  multi: true
};

@Component({
  selector: 'dec-i18n-input',
  templateUrl: './dec-i18n-input.component.html',
  styleUrls: ['./dec-i18n-input.component.scss'],
  providers: [INPUT_I18N_CONTROL_VALUE_ACCESSOR]
})
export class DecI18nInputComponent implements ControlValueAccessor, AfterViewInit, OnDestroy {

  selectedLanguage: i18nLanguage = 'PT';

  thereIsContent: boolean;

  @Input() type: i18nInputType = 'input';

  @Input() placeholder;

  @Input() name = 'time';

  @Input() rows = 5;

  @Input()
  get required() { return this._required; }
  set required(v: boolean) {
    this._required = v;
  }

  @Input()
  get disabled() { return this._disabled; }
  set disabled(v: boolean) {
    this._disabled = v;
  }

  @ViewChild(NgForm) i18nInputForm: NgForm;

  @ViewChild('contentContainer')
  get contentContainer() { return this._contentContainer; }
  set contentContainer(v: ElementRef) {
    this._contentContainer = v;
    this.checkContentPresence();
  }

  private _contentContainer;

  private classWatcher: Subscription;

  private classesString: string;

  private _required;

  private _disabled;

  //  The internal data model
  private innerValue: I18nInput = { pt: '', en: '' };
  //  Placeholders for the callbacks which are later provided by the Control Value Accessor
  private onTouchedCallback: () => void = noop;
  //  Placeholders for the callbacks which are later provided by the Control Value Accessor
  private onChangeCallback: (_: any) => void = noop;

  constructor(
    private elementRef: ElementRef<HTMLElement>,
  ) { }

  ngOnDestroy() {
    this.unsubscribeToClassChange();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.subscribeToClassChange();
    }, 0);
  }

  set value(v: I18nInput) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCallback(v);
    }
  }

  get value(): I18nInput {
    return this.innerValue;
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

  // From ControlValueAccessor interface
  writeValue(value: any) {
    value = this.ensureValueStructure(value);
    if (JSON.stringify(value) !== JSON.stringify(this.value)) {
      this.value = value;
    }
  }

  selectLanguage(language: i18nLanguage, inputElement: any) {
    this.selectedLanguage = language;

    setTimeout(() => {
      inputElement.focus();
    }, 0);
  }

  showInvalidStyle(control: NgControl): boolean {

    return control ? control.invalid && control.touched : false;

  }

  private checkContentPresence() {
    setTimeout(() => {
      this.thereIsContent = this.contentContainer ? this.contentContainer.nativeElement.innerHTML.trim().length : false;
    }, 0);
  }

  private ensureValueStructure(value: any) {
    value = !value ? {} : value; // v7 bug. remove it when the issue is closed: https://github.com/angular/angular/issues/14988
    if (!value.pt && !value.en) {
      value = { pt: undefined, en: undefined };
    }
    return value;
  }

  private subscribeToClassChange() {
    this.classWatcher = timer(100, 250).subscribe(this.detectClassChanges);
  }

  private detectClassChanges = () => {
    const classesString = this.elementRef.nativeElement.classList.value;
    if ((this.classesString !== classesString)) {
      this.classesString = classesString;
      const hasTouchedClass = classesString.search('ng-touched') >= 0;
      Object.values(this.i18nInputForm.controls).forEach(control => {
        if (hasTouchedClass) {
          control.markAsTouched();
        } else {
          control.markAsUntouched();
        }
      });
    }
  }

  private unsubscribeToClassChange() {
    this.classWatcher.unsubscribe();
  }
}
