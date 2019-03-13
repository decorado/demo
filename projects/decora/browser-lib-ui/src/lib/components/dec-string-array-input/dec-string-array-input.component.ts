import { Component, forwardRef, Input, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, NgModel } from '@angular/forms';
import { Subscription, timer } from 'rxjs';

//  Return an empty function to be used as default trigger functions
const noop = () => {
};

//  Used to extend ngForms functions
export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DecStringArrayInputComponent),
  multi: true
};

@Component({
  selector: 'dec-string-array-input',
  templateUrl: './dec-string-array-input.component.html',
  styleUrls: ['./dec-string-array-input.component.scss'],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class DecStringArrayInputComponent implements OnDestroy {

  @Input() name;

  @Input() placeholder;

  @Input() mode = 'textarea';

  @Input() rows = 3;

  @ViewChild(NgModel) ngModelElement: NgModel;

  /*
  ** ngModel API
  */

  get value(): string[] { return this.innerArray; }
  set value(v: string[]) {
    if (v !== this.innerArray) {
      this.innerArray = v;
      this.onChangeCallback(v);
    }
  }

  get valueAsString(): string { return this.getArrayAsString(); }
  set valueAsString(v: string) {
    if (v !== this.innerArray) {
      this.value = this.stringToArray(v);
    }
  }

  private classWatcher: Subscription;

  private classesString: string;

  /*
  ** ngModel propertie
  ** Used to two way data bind using [(ngModel)]
  */
  //  The internal data model
  private innerArray: any = '';
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

  getArrayAsString() {

    return this.arrayToString(this.value);

  }

  // From ControlValueAccessor interface
  writeValue(value: string[]) {

    if (value !== this.value) {

      this.value = value;

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

  onValueChanged(event: any) {
    this.value = event.toString();
  }

  private stringToArray(stringOfArray: string): string[] {
    if (stringOfArray) {
      const regExp = /[^,\s][^,\s]*[^,\s]*/g;
      return stringOfArray.match(regExp);
    } else {
      return [];
    }
  }

  private arrayToString(arrayOfstring: string[]): string {
    if (arrayOfstring) {
      return arrayOfstring.join(', ');
    } else {
      return undefined;
    }
  }

  private subscribeToClassChange() {
    this.classWatcher = timer(100, 250).subscribe(this.detectClassChanges);
  }

  private detectClassChanges = () => {
    const classesString = this.elementRef.nativeElement.classList.value;
    if (this.classesString !== classesString) {
      this.classesString = classesString;
      const hasTouchedClass = classesString.search('ng-touched') >= 0;
      if (hasTouchedClass) {
        this.ngModelElement.control.markAsTouched();
      } else {
        this.ngModelElement.control.markAsUntouched();
      }
    }
  }

  private unsubscribeToClassChange() {
    this.classWatcher.unsubscribe();
  }

}
