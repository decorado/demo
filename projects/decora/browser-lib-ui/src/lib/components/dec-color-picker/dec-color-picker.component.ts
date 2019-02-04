import { Component, ViewEncapsulation, Input, forwardRef, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DecColorPickerModalComponent } from './dec-color-picker-modal/dec-color-picker-modal.component';
import { ColorPickerService } from './../../services/color-picker/color-picker.service';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgModel } from '@angular/forms';
import { DecColorService } from './../../services/color/dec-color.service';
import { Subscription, timer } from 'rxjs';

const noop = () => { };

const COLOR_PICKER_CONTROL_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DecColorPickerComponent),
  multi: true
};

@Component({
  selector: 'dec-color-picker',
  templateUrl: './dec-color-picker.component.html',
  styleUrls: ['./dec-color-picker.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [COLOR_PICKER_CONTROL_VALUE_ACCESSOR]
})
export class DecColorPickerComponent implements ControlValueAccessor, OnDestroy {

  autocomplete = 'off';

  pattern = '^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$';

  hexValue;

  @Input() disabled: boolean;

  @Input() colorFormat = 'rgb';

  @Input() placeholder = 'Color';

  @ViewChild(NgModel) ngModelElement: NgModel;

  private classWatcher: Subscription;

  private classesString: string;

  private modelValueReference: any;

  private onTouchedCallback: () => void = noop;

  private onChangeCallback: (_: any) => void = noop;

  constructor(
    private dialog: MatDialog,
    private colorPickerService: ColorPickerService,
    public colorService: DecColorService,
    private elementRef: ElementRef<HTMLElement>,
  ) {
    this.subscribeToClassChange();
  }

  ngOnDestroy() {
    this.unsubscribeToClassChange();
  }

  writeValue(value: any): void {

    value = value || [255, 255, 255]; // ensure modal value

    this.modelValueReference = value;

    this.updateHexValueBasedOnModelValueAndFormat();

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

  startColorPicker() {
    this.colorPickerService.start.subscribe((color) => {
      this.hexValue = color;
      this.modelValueReference = this.hexValue;
      this.setValueBasedOnColorFormat();
    });
  }

  openColorBox() {
    this.dialog.open(DecColorPickerModalComponent, {
      data: { color: this.hexValue }, width: '320px', id: 'colorContainer', panelClass: ['color-picker-container', 'no-padding', 'box-shadow-none'], hasBackdrop: false, disableClose: true
    }).afterClosed().subscribe(color => {
      if (color) {
        this.hexValue = color;
        this.setValueBasedOnColorFormat();
      }
    });
  }

  setValueBasedOnColorFormat() {
    if (this.modelValueReference) {
      const lastValueAsHexa = this.colorFormat === 'hex'
        ? this.modelValueReference
        : this.colorService.rgbToHex(this.modelValueReference[0] || 0, this.modelValueReference[1] || 0, this.modelValueReference[2] || 0);
      if (this.hexValue.match(/^#(?:[0-9a-f]{3}){1,2}$/i) && this.hexValue !== lastValueAsHexa) {
        this.value = this.colorFormat === 'hex' ? this.hexValue : this.colorService.hexToRgb(this.hexValue);
      }
    }
  }

  get value(): any { return this.modelValueReference; }
  set value(v: any) {
    if (this.modelValueReference !== v) {
      this.modelValueReference = v;
    }
    this.onChangeCallback(this.value);
    this.onTouchedCallback();
  }

  private updateHexValueBasedOnModelValueAndFormat() {
    const color = this.modelValueReference;
    if (color) {
      if (this.colorFormat === 'rgb') {
        this.hexValue = this.colorService.rgbToHex(color[0], color[1], color[2]);
      } else {
        this.hexValue = color;
      }
    } else {
      this.hexValue = '';
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
