import { Component, AfterViewInit, Input, OnDestroy, ElementRef, forwardRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { timer, Subscription } from 'rxjs';
import { NG_VALUE_ACCESSOR, NgForm, ControlValueAccessor, NgControl } from '@angular/forms';

type i18nLanguage = 'pt' | 'en';

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

  selectedLanguage: i18nLanguage = 'pt';

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

  @Output() changeLanguage = new EventEmitter();

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

  private _lastValueEmitted;

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
  writeValue(value: any = {}) {
    if (JSON.stringify(value) !== JSON.stringify(this.value)) {
      this.value = value;
      this.setLastValueEmitted(this.value);
    }
  }

  selectLanguage(language: i18nLanguage, inputElement: any) {
    this.selectedLanguage = language;
    this.changeLanguage.emit(language);
    this.detectAndEmitChange();
    setTimeout(() => {
      inputElement.focus();
    }, 0);
  }

  showInvalidStyle(control: NgControl): boolean {
    return control ? control.invalid && control.touched : false;
  }

  detectAndEmitChange() {
    const lastValue = JSON.stringify(this._lastValueEmitted);
    const newValue = JSON.stringify(this.value);
    if (newValue !== lastValue) {
      this.setLastValueEmitted(this.value);
      this.onChangeCallback(this.value);
    }
  }

  private setLastValueEmitted(v) {
    this._lastValueEmitted = JSON.parse(JSON.stringify(v));
  }

  private checkContentPresence() {
    setTimeout(() => {
      this.thereIsContent = this.contentContainer ? this.contentContainer.nativeElement.innerHTML.trim().length : false;
    }, 0);
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
