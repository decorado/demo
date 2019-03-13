import { Component, Input, forwardRef, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, NgModel } from '@angular/forms';
import { timer, Subscription } from 'rxjs';

const noop = () => { };

const DATE_PICKER_CONTROL_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DecDatePickerComponent),
  multi: true
};

@Component({
  selector: 'dec-date-picker',
  templateUrl: './dec-date-picker.component.html',
  styleUrls: ['./dec-date-picker.component.scss'],
  providers: [DATE_PICKER_CONTROL_VALUE_ACCESSOR]
})
export class DecDatePickerComponent implements ControlValueAccessor, OnDestroy {

  @Input() placeholder = 'Date';

  @Input() mode: 'date' | 'timestamp' = 'date';

  @ViewChild(NgModel) ngModelElement: NgModel;

  private classWatcher: Subscription;

  private classesString: string;

  private innerDateValue: Date;

  private innerValue: Date | number;

  private onTouchedCallback: () => void = noop;

  private onChangeCallback: (_: any) => void = noop;

  constructor(
    private elementRef: ElementRef<HTMLElement>,
  ) {
    this.subscribeToClassChange();
  }

  ngOnDestroy() {
    this.unsubscribeToClassChange();
  }

  writeValue(value: Date | number): void {

    this.detectModeBasedOnInputType(value);

    this.innerValue = value;

    this.innerDateValue = new Date(value as any); // value as any avoids type compilation error

  }

  registerOnChange(fn: any) {

    this.onChangeCallback = fn;

  }

  registerOnTouched(fn: any) {

    this.onTouchedCallback = fn;

  }

  onInputBlur(event) {

    this.onTouchedCallback();

  }

  get dateValue(): Date { return this.innerDateValue; }
  set dateValue(v: Date) {
    if (this.innerDateValue !== v) {
      this.innerDateValue = v;
      this.innerValue = this.mode === 'date' ? v : v.getTime();
      this.onChangeCallback(this.innerValue);
    }
  }

  private detectModeBasedOnInputType(value) {

    if (value) {

      const isTimestamp = /^\d+$/.test(value);

      if (isTimestamp) {

        this.mode = 'timestamp';

      } else {

        this.mode = 'date';

      }

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
