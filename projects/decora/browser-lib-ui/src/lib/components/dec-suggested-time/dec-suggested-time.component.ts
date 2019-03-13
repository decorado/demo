import { Component, forwardRef, Input, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, NgModel } from '@angular/forms';
import { Subscription, timer } from 'rxjs';


//  Return an empty function to be used as default trigger functions
const noop = () => {
};

//  Used to extend ngForms functions
const SUGGESTED_TIME_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DecSuggestedTimeComponent),
  multi: true
};

@Component({
  selector: 'dec-suggested-time',
  templateUrl: './dec-suggested-time.component.html',
  styleUrls: ['./dec-suggested-time.component.scss'],
  providers: [SUGGESTED_TIME_CONTROL_VALUE_ACCESSOR]
})
export class DecSuggestedTimeComponent implements ControlValueAccessor, OnDestroy {

  timeArray = [];

  ngModelValue;

  @Input() disabled: boolean;

  @Input() required: boolean;

  @Input() placeholder: string;

  @Input()
  get time(): number { return this._time; }
  set time(v: number) {
    if (v) {
      this._time = v;
      this.formatTimeArray();
    } else {
      this.timeArray = [];
      this.value = '';
      this._selected = '';
    }
  }

  @Input()
  get interval(): number { return this._interval; }
  set interval(v: number) {
    if (v) {
      this._interval = v;
      this.formatTimeArray();
    }
  }

  @Input()
  get selected(): number { return this._selected; }
  set selected(v: number) {
    if (v && v !== this._selected) {
      this._selected = v;
      this.value = v * 60;
    }
  }

  @ViewChild(NgModel) ngModelElement: NgModel;

  private _time: number;

  private _interval: number;

  private _selected;

  private classWatcher: Subscription;

  private classesString: string;

 /*
 ** ngModel propertie
 ** Used to two way data bind using [(ngModel)]
 */
 private innerValue: any;
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

  writeValue(value: any) {
    if (`${value}` !== `${this.value}`) {
      this.value = value;
    }
  }

  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  onSelectionChange() {
    this.onChangeCallback(this.innerValue || 0);
  }

  get value(): any { return this.innerValue; }
  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.selected = v / 60;
    }
  }

  private formatTimeArray() {
    if (!this.time || !this.interval) {
      return;
    }
    let min = ((this.time / 60) - this.interval);
    const interator = (this.interval * 2) * 2;
    let aux = [];

    for (let i = 0; i <= interator; i++) {
      aux.push({
        value: min,
        label: min % 1 > 0 ? this.getFirstNumber(min) + ':30' : min + ':00'
      });
      min += 0.5;
    }
    aux = aux.filter(x => x.value > 0);

    this.timeArray = aux.reverse();

  }

  private getFirstNumber(number) {
    return number.toString().split('.')[0];
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
