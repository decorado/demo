/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, ViewEncapsulation, Input, forwardRef } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DecColorPickerModalComponent } from './dec-color-picker-modal/dec-color-picker-modal.component';
import { ColorPickerService } from './../../services/color-picker/color-picker.service';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DecColorService } from './../../services/color/dec-color.service';
/** @type {?} */
const noop = () => { };
const ɵ0 = noop;
/** @type {?} */
const CLOCK_PICKER_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DecColorPickerComponent),
    multi: true
};
export class DecColorPickerComponent {
    /**
     * @param {?} dialog
     * @param {?} colorPickerService
     * @param {?} colorService
     */
    constructor(dialog, colorPickerService, colorService) {
        this.dialog = dialog;
        this.colorPickerService = colorPickerService;
        this.colorService = colorService;
        this.colorFormat = 'rgb';
        this.placeholder = 'Color';
        this.autocomplete = 'off';
        this.pattern = '^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$';
        this.onTouchedCallback = noop;
        this.onChangeCallback = noop;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set value(v) {
        if (this.modelValueReference !== v) {
            this.modelValueReference = v;
        }
        this.onChangeCallback(this.value);
        this.onTouchedCallback();
    }
    /**
     * @return {?}
     */
    get value() {
        return this.modelValueReference;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        value = value || [255, 255, 255]; // ensure modal value
        this.modelValueReference = value;
        this.updateHexValueBasedOnModelValueAndFormat();
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onChangeCallback = fn;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onTouchedCallback = fn;
    }
    /**
     * @return {?}
     */
    startColorPicker() {
        this.colorPickerService.start.subscribe((color) => {
            this.hexValue = color;
            this.modelValueReference = this.hexValue;
            this.setValueBasedOnColorFormat();
        });
    }
    /**
     * @return {?}
     */
    openColorBox() {
        this.dialog.open(DecColorPickerModalComponent, {
            data: { color: this.hexValue }, width: '320px', id: 'colorContainer', panelClass: ['color-picker-container', 'no-padding', 'box-shadow-none'], hasBackdrop: false, disableClose: true
        }).afterClosed().subscribe(color => {
            this.hexValue = color;
            this.setValueBasedOnColorFormat();
        });
    }
    /**
     * @return {?}
     */
    setValueBasedOnColorFormat() {
        if (this.modelValueReference) {
            /** @type {?} */
            const lastValueAsHexa = this.colorFormat === 'hex'
                ? this.modelValueReference
                : this.colorService.rgbToHex(this.modelValueReference[0] || 0, this.modelValueReference[1] || 0, this.modelValueReference[2] || 0);
            if (this.hexValue.match(/^#(?:[0-9a-f]{3}){1,2}$/i) && this.hexValue !== lastValueAsHexa) {
                this.value = this.colorFormat === 'hex' ? this.hexValue : this.colorService.hexToRgb(this.hexValue);
            }
        }
    }
    /**
     * @return {?}
     */
    updateHexValueBasedOnModelValueAndFormat() {
        /** @type {?} */
        const color = this.modelValueReference;
        if (color) {
            if (this.colorFormat === 'rgb') {
                this.hexValue = this.colorService.rgbToHex(color[0], color[1], color[2]);
            }
            else {
                this.hexValue = color;
            }
        }
        else {
            this.hexValue = '';
        }
    }
}
DecColorPickerComponent.decorators = [
    { type: Component, args: [{
                selector: 'dec-color-picker',
                template: `<div class="dec-color-picker-wrapper" fxLayout="row" fxLayoutAlign="start center" fxLayoutGap="8px">
  <div fxFlex="32px" class="color-picker" [ngStyle]="{'backgroundColor': hexValue}" (click)="openColorBox()"></div>
  <mat-form-field>
    <input matInput [(ngModel)]="hexValue" [disabled]="disabled" [autocomplete]="autocomplete" [placeholder]="placeholder"
      [pattern]="pattern" (ngModelChange)="setValueBasedOnColorFormat()">
    <dec-icon font="mat" matSuffix (click)="startColorPicker()">colorize</dec-icon>
  </mat-form-field>
</div>
`,
                styles: [`.dec-color-picker-wrapper .color-picker{cursor:pointer;height:32px;margin-bottom:10px;border:2px solid rgba(0,0,0,.42);border-radius:2px}.dec-color-picker-wrapper .color-picker:hover{border-color:rgba(0,0,0,.87)}.dec-color-picker-wrapper dec-icon{font-size:24px;cursor:pointer}.dec-color-picker-wrapper dec-icon:hover{color:rgba(0,0,0,.87)}#contentBlocker{position:absolute;top:0;left:0;width:100vw;height:100vh;z-index:9999;overflow:hidden;background-color:transparent}`],
                encapsulation: ViewEncapsulation.None,
                providers: [CLOCK_PICKER_CONTROL_VALUE_ACCESSOR]
            },] },
];
/** @nocollapse */
DecColorPickerComponent.ctorParameters = () => [
    { type: MatDialog },
    { type: ColorPickerService },
    { type: DecColorService }
];
DecColorPickerComponent.propDecorators = {
    disabled: [{ type: Input }],
    colorFormat: [{ type: Input }],
    placeholder: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    DecColorPickerComponent.prototype.disabled;
    /** @type {?} */
    DecColorPickerComponent.prototype.colorFormat;
    /** @type {?} */
    DecColorPickerComponent.prototype.placeholder;
    /** @type {?} */
    DecColorPickerComponent.prototype.autocomplete;
    /** @type {?} */
    DecColorPickerComponent.prototype.pattern;
    /** @type {?} */
    DecColorPickerComponent.prototype.hexValue;
    /** @type {?} */
    DecColorPickerComponent.prototype.modelValueReference;
    /** @type {?} */
    DecColorPickerComponent.prototype.onTouchedCallback;
    /** @type {?} */
    DecColorPickerComponent.prototype.onChangeCallback;
    /** @type {?} */
    DecColorPickerComponent.prototype.dialog;
    /** @type {?} */
    DecColorPickerComponent.prototype.colorPickerService;
    /** @type {?} */
    DecColorPickerComponent.prototype.colorService;
}
export { ɵ0 };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLWNvbG9yLXBpY2tlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvZGVjLWNvbG9yLXBpY2tlci9kZWMtY29sb3ItcGlja2VyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxpQkFBaUIsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2hGLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUM5QyxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSwyREFBMkQsQ0FBQztBQUN6RyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxvREFBb0QsQ0FBQztBQUN4RixPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDekUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDBDQUEwQyxDQUFDOztBQUUzRSxNQUFNLElBQUksR0FBRyxHQUFHLEVBQUUsSUFBSSxDQUFDOzs7QUFFdkIsTUFBTSxtQ0FBbUMsR0FBRztJQUMxQyxPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsdUJBQXVCLENBQUM7SUFDdEQsS0FBSyxFQUFFLElBQUk7Q0FDWixDQUFDO0FBaUJGLE1BQU07Ozs7OztJQXFDSixZQUFvQixNQUFpQixFQUFVLGtCQUFzQyxFQUFTLFlBQTZCO1FBQXZHLFdBQU0sR0FBTixNQUFNLENBQVc7UUFBVSx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBQVMsaUJBQVksR0FBWixZQUFZLENBQWlCOzJCQWpDcEcsS0FBSzsyQkFFTCxPQUFPOzRCQUVmLEtBQUs7dUJBRVYsb0NBQW9DO2lDQXVCTixJQUFJO2dDQUVDLElBQUk7S0FFK0U7Ozs7O0lBekJoSSxJQUFJ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RztTQUNGO0tBQ0Y7Ozs7SUFHTyx3Q0FBd0M7O1FBQzlDLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQztRQUN2QyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ1YsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUMvQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDMUU7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQzthQUN2QjtTQUNGO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztTQUNwQjs7OztZQS9HSixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGtCQUFrQjtnQkFDNUIsUUFBUSxFQUFFOzs7Ozs7OztDQVFYO2dCQUNDLE1BQU0sRUFBRSxDQUFDLHdkQUF3ZCxDQUFDO2dCQUNsZSxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsU0FBUyxFQUFFLENBQUMsbUNBQW1DLENBQUM7YUFDakQ7Ozs7WUE1QlEsU0FBUztZQUVULGtCQUFrQjtZQUVsQixlQUFlOzs7dUJBMkJyQixLQUFLOzBCQUVMLEtBQUs7MEJBRUwsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgVmlld0VuY2Fwc3VsYXRpb24sIElucHV0LCBmb3J3YXJkUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXREaWFsb2cgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBEZWNDb2xvclBpY2tlck1vZGFsQ29tcG9uZW50IH0gZnJvbSAnLi9kZWMtY29sb3ItcGlja2VyLW1vZGFsL2RlYy1jb2xvci1waWNrZXItbW9kYWwuY29tcG9uZW50JztcbmltcG9ydCB7IENvbG9yUGlja2VyU2VydmljZSB9IGZyb20gJy4vLi4vLi4vc2VydmljZXMvY29sb3ItcGlja2VyL2NvbG9yLXBpY2tlci5zZXJ2aWNlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IERlY0NvbG9yU2VydmljZSB9IGZyb20gJy4vLi4vLi4vc2VydmljZXMvY29sb3IvZGVjLWNvbG9yLnNlcnZpY2UnO1xuXG5jb25zdCBub29wID0gKCkgPT4geyB9O1xuXG5jb25zdCBDTE9DS19QSUNLRVJfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUiA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IERlY0NvbG9yUGlja2VyQ29tcG9uZW50KSxcbiAgbXVsdGk6IHRydWVcbn07XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1jb2xvci1waWNrZXInLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJkZWMtY29sb3ItcGlja2VyLXdyYXBwZXJcIiBmeExheW91dD1cInJvd1wiIGZ4TGF5b3V0QWxpZ249XCJzdGFydCBjZW50ZXJcIiBmeExheW91dEdhcD1cIjhweFwiPlxuICA8ZGl2IGZ4RmxleD1cIjMycHhcIiBjbGFzcz1cImNvbG9yLXBpY2tlclwiIFtuZ1N0eWxlXT1cInsnYmFja2dyb3VuZENvbG9yJzogaGV4VmFsdWV9XCIgKGNsaWNrKT1cIm9wZW5Db2xvckJveCgpXCI+PC9kaXY+XG4gIDxtYXQtZm9ybS1maWVsZD5cbiAgICA8aW5wdXQgbWF0SW5wdXQgWyhuZ01vZGVsKV09XCJoZXhWYWx1ZVwiIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiIFthdXRvY29tcGxldGVdPVwiYXV0b2NvbXBsZXRlXCIgW3BsYWNlaG9sZGVyXT1cInBsYWNlaG9sZGVyXCJcbiAgICAgIFtwYXR0ZXJuXT1cInBhdHRlcm5cIiAobmdNb2RlbENoYW5nZSk9XCJzZXRWYWx1ZUJhc2VkT25Db2xvckZvcm1hdCgpXCI+XG4gICAgPGRlYy1pY29uIGZvbnQ9XCJtYXRcIiBtYXRTdWZmaXggKGNsaWNrKT1cInN0YXJ0Q29sb3JQaWNrZXIoKVwiPmNvbG9yaXplPC9kZWMtaWNvbj5cbiAgPC9tYXQtZm9ybS1maWVsZD5cbjwvZGl2PlxuYCxcbiAgc3R5bGVzOiBbYC5kZWMtY29sb3ItcGlja2VyLXdyYXBwZXIgLmNvbG9yLXBpY2tlcntjdXJzb3I6cG9pbnRlcjtoZWlnaHQ6MzJweDttYXJnaW4tYm90dG9tOjEwcHg7Ym9yZGVyOjJweCBzb2xpZCByZ2JhKDAsMCwwLC40Mik7Ym9yZGVyLXJhZGl1czoycHh9LmRlYy1jb2xvci1waWNrZXItd3JhcHBlciAuY29sb3ItcGlja2VyOmhvdmVye2JvcmRlci1jb2xvcjpyZ2JhKDAsMCwwLC44Nyl9LmRlYy1jb2xvci1waWNrZXItd3JhcHBlciBkZWMtaWNvbntmb250LXNpemU6MjRweDtjdXJzb3I6cG9pbnRlcn0uZGVjLWNvbG9yLXBpY2tlci13cmFwcGVyIGRlYy1pY29uOmhvdmVye2NvbG9yOnJnYmEoMCwwLDAsLjg3KX0jY29udGVudEJsb2NrZXJ7cG9zaXRpb246YWJzb2x1dGU7dG9wOjA7bGVmdDowO3dpZHRoOjEwMHZ3O2hlaWdodDoxMDB2aDt6LWluZGV4Ojk5OTk7b3ZlcmZsb3c6aGlkZGVuO2JhY2tncm91bmQtY29sb3I6dHJhbnNwYXJlbnR9YF0sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIHByb3ZpZGVyczogW0NMT0NLX1BJQ0tFUl9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNDb2xvclBpY2tlckNvbXBvbmVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcblxuICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbjtcblxuICBASW5wdXQoKSBjb2xvckZvcm1hdCA9ICdyZ2InO1xuXG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyID0gJ0NvbG9yJztcblxuICBhdXRvY29tcGxldGUgPSAnb2ZmJztcblxuICBwYXR0ZXJuID0gJ14jKFtBLUZhLWYwLTldezZ9fFtBLUZhLWYwLTldezN9KSQnO1xuXG4gIHNldCB2YWx1ZSh2OiBhbnkpIHtcblxuICAgIGlmICh0aGlzLm1vZGVsVmFsdWVSZWZlcmVuY2UgIT09IHYpIHtcblxuICAgICAgdGhpcy5tb2RlbFZhbHVlUmVmZXJlbmNlID0gdjtcblxuICAgIH1cblxuICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayh0aGlzLnZhbHVlKTtcblxuICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2soKTtcblxuICB9XG4gIGdldCB2YWx1ZSgpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLm1vZGVsVmFsdWVSZWZlcmVuY2U7XG4gIH1cblxuICBoZXhWYWx1ZTtcblxuICBwcml2YXRlIG1vZGVsVmFsdWVSZWZlcmVuY2U6IGFueTtcblxuICBwcml2YXRlIG9uVG91Y2hlZENhbGxiYWNrOiAoKSA9PiB2b2lkID0gbm9vcDtcblxuICBwcml2YXRlIG9uQ2hhbmdlQ2FsbGJhY2s6IChfOiBhbnkpID0+IHZvaWQgPSBub29wO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZGlhbG9nOiBNYXREaWFsb2csIHByaXZhdGUgY29sb3JQaWNrZXJTZXJ2aWNlOiBDb2xvclBpY2tlclNlcnZpY2UsIHB1YmxpYyBjb2xvclNlcnZpY2U6IERlY0NvbG9yU2VydmljZSkgeyB9XG5cbiAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KTogdm9pZCB7XG5cbiAgICB2YWx1ZSA9IHZhbHVlIHx8IFsyNTUsIDI1NSwgMjU1XTsgLy8gZW5zdXJlIG1vZGFsIHZhbHVlXG5cbiAgICB0aGlzLm1vZGVsVmFsdWVSZWZlcmVuY2UgPSB2YWx1ZTtcblxuICAgIHRoaXMudXBkYXRlSGV4VmFsdWVCYXNlZE9uTW9kZWxWYWx1ZUFuZEZvcm1hdCgpO1xuXG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrID0gZm47XG4gIH1cblxuICBzdGFydENvbG9yUGlja2VyKCkge1xuICAgIHRoaXMuY29sb3JQaWNrZXJTZXJ2aWNlLnN0YXJ0LnN1YnNjcmliZSgoY29sb3IpID0+IHtcbiAgICAgIHRoaXMuaGV4VmFsdWUgPSBjb2xvcjtcbiAgICAgIHRoaXMubW9kZWxWYWx1ZVJlZmVyZW5jZSA9IHRoaXMuaGV4VmFsdWU7XG4gICAgICB0aGlzLnNldFZhbHVlQmFzZWRPbkNvbG9yRm9ybWF0KCk7XG4gICAgfSk7XG4gIH1cblxuICBvcGVuQ29sb3JCb3goKSB7XG4gICAgdGhpcy5kaWFsb2cub3BlbihEZWNDb2xvclBpY2tlck1vZGFsQ29tcG9uZW50LCB7XG4gICAgICBkYXRhOiB7IGNvbG9yOiB0aGlzLmhleFZhbHVlIH0sIHdpZHRoOiAnMzIwcHgnLCBpZDogJ2NvbG9yQ29udGFpbmVyJywgcGFuZWxDbGFzczogWydjb2xvci1waWNrZXItY29udGFpbmVyJywgJ25vLXBhZGRpbmcnLCAnYm94LXNoYWRvdy1ub25lJ10sIGhhc0JhY2tkcm9wOiBmYWxzZSwgZGlzYWJsZUNsb3NlOiB0cnVlXG4gICAgfSkuYWZ0ZXJDbG9zZWQoKS5zdWJzY3JpYmUoY29sb3IgPT4ge1xuICAgICAgdGhpcy5oZXhWYWx1ZSA9IGNvbG9yO1xuICAgICAgdGhpcy5zZXRWYWx1ZUJhc2VkT25Db2xvckZvcm1hdCgpO1xuICAgIH0pO1xuICB9XG5cbiAgc2V0VmFsdWVCYXNlZE9uQ29sb3JGb3JtYXQoKSB7XG4gICAgaWYgKHRoaXMubW9kZWxWYWx1ZVJlZmVyZW5jZSkge1xuICAgICAgY29uc3QgbGFzdFZhbHVlQXNIZXhhID0gdGhpcy5jb2xvckZvcm1hdCA9PT0gJ2hleCdcbiAgICAgICAgPyB0aGlzLm1vZGVsVmFsdWVSZWZlcmVuY2VcbiAgICAgICAgOiB0aGlzLmNvbG9yU2VydmljZS5yZ2JUb0hleCh0aGlzLm1vZGVsVmFsdWVSZWZlcmVuY2VbMF0gfHwgMCwgdGhpcy5tb2RlbFZhbHVlUmVmZXJlbmNlWzFdIHx8IDAsIHRoaXMubW9kZWxWYWx1ZVJlZmVyZW5jZVsyXSB8fCAwKTtcbiAgICAgIGlmICh0aGlzLmhleFZhbHVlLm1hdGNoKC9eIyg/OlswLTlhLWZdezN9KXsxLDJ9JC9pKSAmJiB0aGlzLmhleFZhbHVlICE9PSBsYXN0VmFsdWVBc0hleGEpIHtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHRoaXMuY29sb3JGb3JtYXQgPT09ICdoZXgnID8gdGhpcy5oZXhWYWx1ZSA6IHRoaXMuY29sb3JTZXJ2aWNlLmhleFRvUmdiKHRoaXMuaGV4VmFsdWUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG5cbiAgcHJpdmF0ZSB1cGRhdGVIZXhWYWx1ZUJhc2VkT25Nb2RlbFZhbHVlQW5kRm9ybWF0KCkge1xuICAgIGNvbnN0IGNvbG9yID0gdGhpcy5tb2RlbFZhbHVlUmVmZXJlbmNlO1xuICAgIGlmIChjb2xvcikge1xuICAgICAgaWYgKHRoaXMuY29sb3JGb3JtYXQgPT09ICdyZ2InKSB7XG4gICAgICAgIHRoaXMuaGV4VmFsdWUgPSB0aGlzLmNvbG9yU2VydmljZS5yZ2JUb0hleChjb2xvclswXSwgY29sb3JbMV0sIGNvbG9yWzJdKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuaGV4VmFsdWUgPSBjb2xvcjtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5oZXhWYWx1ZSA9ICcnO1xuICAgIH1cbiAgfVxuXG59XG4iXX0=