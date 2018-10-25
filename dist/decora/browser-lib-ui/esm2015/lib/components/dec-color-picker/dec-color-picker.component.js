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
const COLOR_PICKER_CONTROL_VALUE_ACCESSOR = {
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
            if (color) {
                this.hexValue = color;
                this.setValueBasedOnColorFormat();
            }
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
                providers: [COLOR_PICKER_CONTROL_VALUE_ACCESSOR]
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLWNvbG9yLXBpY2tlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvZGVjLWNvbG9yLXBpY2tlci9kZWMtY29sb3ItcGlja2VyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxpQkFBaUIsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2hGLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUM5QyxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSwyREFBMkQsQ0FBQztBQUN6RyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxvREFBb0QsQ0FBQztBQUN4RixPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDekUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDBDQUEwQyxDQUFDOztBQUUzRSxNQUFNLElBQUksR0FBRyxHQUFHLEVBQUUsSUFBSSxDQUFDOzs7QUFFdkIsTUFBTSxtQ0FBbUMsR0FBRztJQUMxQyxPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsdUJBQXVCLENBQUM7SUFDdEQsS0FBSyxFQUFFLElBQUk7Q0FDWixDQUFDO0FBaUJGLE1BQU07Ozs7OztJQXFDSixZQUFvQixNQUFpQixFQUFVLGtCQUFzQyxFQUFTLFlBQTZCO1FBQXZHLFdBQU0sR0FBTixNQUFNLENBQVc7UUFBVSx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBQVMsaUJBQVksR0FBWixZQUFZLENBQWlCOzJCQWpDcEcsS0FBSzsyQkFFTCxPQUFPOzRCQUVmLEtBQUs7dUJBRVYsb0NBQW9DO2lDQXVCTixJQUFJO2dDQUVDLElBQUk7S0FFK0U7Ozs7O0lBekJoSSxJQUFJ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QVksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQ3JHO1NBQ0Y7S0FDRjs7OztJQUdPLHdDQUF3Qzs7UUFDOUMsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDO1FBQ3ZDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDVixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQy9CLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUMxRTtZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO2FBQ3ZCO1NBQ0Y7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1NBQ3BCOzs7O1lBakhKLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsa0JBQWtCO2dCQUM1QixRQUFRLEVBQUU7Ozs7Ozs7O0NBUVg7Z0JBQ0MsTUFBTSxFQUFFLENBQUMsd2RBQXdkLENBQUM7Z0JBQ2xlLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2dCQUNyQyxTQUFTLEVBQUUsQ0FBQyxtQ0FBbUMsQ0FBQzthQUNqRDs7OztZQTVCUSxTQUFTO1lBRVQsa0JBQWtCO1lBRWxCLGVBQWU7Ozt1QkEyQnJCLEtBQUs7MEJBRUwsS0FBSzswQkFFTCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBWaWV3RW5jYXBzdWxhdGlvbiwgSW5wdXQsIGZvcndhcmRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1hdERpYWxvZyB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IERlY0NvbG9yUGlja2VyTW9kYWxDb21wb25lbnQgfSBmcm9tICcuL2RlYy1jb2xvci1waWNrZXItbW9kYWwvZGVjLWNvbG9yLXBpY2tlci1tb2RhbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ29sb3JQaWNrZXJTZXJ2aWNlIH0gZnJvbSAnLi8uLi8uLi9zZXJ2aWNlcy9jb2xvci1waWNrZXIvY29sb3ItcGlja2VyLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRGVjQ29sb3JTZXJ2aWNlIH0gZnJvbSAnLi8uLi8uLi9zZXJ2aWNlcy9jb2xvci9kZWMtY29sb3Iuc2VydmljZSc7XG5cbmNvbnN0IG5vb3AgPSAoKSA9PiB7IH07XG5cbmNvbnN0IENPTE9SX1BJQ0tFUl9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gRGVjQ29sb3JQaWNrZXJDb21wb25lbnQpLFxuICBtdWx0aTogdHJ1ZVxufTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLWNvbG9yLXBpY2tlcicsXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cImRlYy1jb2xvci1waWNrZXItd3JhcHBlclwiIGZ4TGF5b3V0PVwicm93XCIgZnhMYXlvdXRBbGlnbj1cInN0YXJ0IGNlbnRlclwiIGZ4TGF5b3V0R2FwPVwiOHB4XCI+XG4gIDxkaXYgZnhGbGV4PVwiMzJweFwiIGNsYXNzPVwiY29sb3ItcGlja2VyXCIgW25nU3R5bGVdPVwieydiYWNrZ3JvdW5kQ29sb3InOiBoZXhWYWx1ZX1cIiAoY2xpY2spPVwib3BlbkNvbG9yQm94KClcIj48L2Rpdj5cbiAgPG1hdC1mb3JtLWZpZWxkPlxuICAgIDxpbnB1dCBtYXRJbnB1dCBbKG5nTW9kZWwpXT1cImhleFZhbHVlXCIgW2Rpc2FibGVkXT1cImRpc2FibGVkXCIgW2F1dG9jb21wbGV0ZV09XCJhdXRvY29tcGxldGVcIiBbcGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXJcIlxuICAgICAgW3BhdHRlcm5dPVwicGF0dGVyblwiIChuZ01vZGVsQ2hhbmdlKT1cInNldFZhbHVlQmFzZWRPbkNvbG9yRm9ybWF0KClcIj5cbiAgICA8ZGVjLWljb24gZm9udD1cIm1hdFwiIG1hdFN1ZmZpeCAoY2xpY2spPVwic3RhcnRDb2xvclBpY2tlcigpXCI+Y29sb3JpemU8L2RlYy1pY29uPlxuICA8L21hdC1mb3JtLWZpZWxkPlxuPC9kaXY+XG5gLFxuICBzdHlsZXM6IFtgLmRlYy1jb2xvci1waWNrZXItd3JhcHBlciAuY29sb3ItcGlja2Vye2N1cnNvcjpwb2ludGVyO2hlaWdodDozMnB4O21hcmdpbi1ib3R0b206MTBweDtib3JkZXI6MnB4IHNvbGlkIHJnYmEoMCwwLDAsLjQyKTtib3JkZXItcmFkaXVzOjJweH0uZGVjLWNvbG9yLXBpY2tlci13cmFwcGVyIC5jb2xvci1waWNrZXI6aG92ZXJ7Ym9yZGVyLWNvbG9yOnJnYmEoMCwwLDAsLjg3KX0uZGVjLWNvbG9yLXBpY2tlci13cmFwcGVyIGRlYy1pY29ue2ZvbnQtc2l6ZToyNHB4O2N1cnNvcjpwb2ludGVyfS5kZWMtY29sb3ItcGlja2VyLXdyYXBwZXIgZGVjLWljb246aG92ZXJ7Y29sb3I6cmdiYSgwLDAsMCwuODcpfSNjb250ZW50QmxvY2tlcntwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDtsZWZ0OjA7d2lkdGg6MTAwdnc7aGVpZ2h0OjEwMHZoO3otaW5kZXg6OTk5OTtvdmVyZmxvdzpoaWRkZW47YmFja2dyb3VuZC1jb2xvcjp0cmFuc3BhcmVudH1gXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgcHJvdmlkZXJzOiBbQ09MT1JfUElDS0VSX0NPTlRST0xfVkFMVUVfQUNDRVNTT1JdXG59KVxuZXhwb3J0IGNsYXNzIERlY0NvbG9yUGlja2VyQ29tcG9uZW50IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuXG4gIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpIGNvbG9yRm9ybWF0ID0gJ3JnYic7XG5cbiAgQElucHV0KCkgcGxhY2Vob2xkZXIgPSAnQ29sb3InO1xuXG4gIGF1dG9jb21wbGV0ZSA9ICdvZmYnO1xuXG4gIHBhdHRlcm4gPSAnXiMoW0EtRmEtZjAtOV17Nn18W0EtRmEtZjAtOV17M30pJCc7XG5cbiAgc2V0IHZhbHVlKHY6IGFueSkge1xuXG4gICAgaWYgKHRoaXMubW9kZWxWYWx1ZVJlZmVyZW5jZSAhPT0gdikge1xuXG4gICAgICB0aGlzLm1vZGVsVmFsdWVSZWZlcmVuY2UgPSB2O1xuXG4gICAgfVxuXG4gICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrKHRoaXMudmFsdWUpO1xuXG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjaygpO1xuXG4gIH1cbiAgZ2V0IHZhbHVlKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMubW9kZWxWYWx1ZVJlZmVyZW5jZTtcbiAgfVxuXG4gIGhleFZhbHVlO1xuXG4gIHByaXZhdGUgbW9kZWxWYWx1ZVJlZmVyZW5jZTogYW55O1xuXG4gIHByaXZhdGUgb25Ub3VjaGVkQ2FsbGJhY2s6ICgpID0+IHZvaWQgPSBub29wO1xuXG4gIHByaXZhdGUgb25DaGFuZ2VDYWxsYmFjazogKF86IGFueSkgPT4gdm9pZCA9IG5vb3A7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBkaWFsb2c6IE1hdERpYWxvZywgcHJpdmF0ZSBjb2xvclBpY2tlclNlcnZpY2U6IENvbG9yUGlja2VyU2VydmljZSwgcHVibGljIGNvbG9yU2VydmljZTogRGVjQ29sb3JTZXJ2aWNlKSB7IH1cblxuICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpOiB2b2lkIHtcblxuICAgIHZhbHVlID0gdmFsdWUgfHwgWzI1NSwgMjU1LCAyNTVdOyAvLyBlbnN1cmUgbW9kYWwgdmFsdWVcblxuICAgIHRoaXMubW9kZWxWYWx1ZVJlZmVyZW5jZSA9IHZhbHVlO1xuXG4gICAgdGhpcy51cGRhdGVIZXhWYWx1ZUJhc2VkT25Nb2RlbFZhbHVlQW5kRm9ybWF0KCk7XG5cbiAgfVxuXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSkge1xuICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayA9IGZuO1xuICB9XG5cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSkge1xuICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIHN0YXJ0Q29sb3JQaWNrZXIoKSB7XG4gICAgdGhpcy5jb2xvclBpY2tlclNlcnZpY2Uuc3RhcnQuc3Vic2NyaWJlKChjb2xvcikgPT4ge1xuICAgICAgdGhpcy5oZXhWYWx1ZSA9IGNvbG9yO1xuICAgICAgdGhpcy5tb2RlbFZhbHVlUmVmZXJlbmNlID0gdGhpcy5oZXhWYWx1ZTtcbiAgICAgIHRoaXMuc2V0VmFsdWVCYXNlZE9uQ29sb3JGb3JtYXQoKTtcbiAgICB9KTtcbiAgfVxuXG4gIG9wZW5Db2xvckJveCgpIHtcbiAgICB0aGlzLmRpYWxvZy5vcGVuKERlY0NvbG9yUGlja2VyTW9kYWxDb21wb25lbnQsIHtcbiAgICAgIGRhdGE6IHsgY29sb3I6IHRoaXMuaGV4VmFsdWUgfSwgd2lkdGg6ICczMjBweCcsIGlkOiAnY29sb3JDb250YWluZXInLCBwYW5lbENsYXNzOiBbJ2NvbG9yLXBpY2tlci1jb250YWluZXInLCAnbm8tcGFkZGluZycsICdib3gtc2hhZG93LW5vbmUnXSwgaGFzQmFja2Ryb3A6IGZhbHNlLCBkaXNhYmxlQ2xvc2U6IHRydWVcbiAgICB9KS5hZnRlckNsb3NlZCgpLnN1YnNjcmliZShjb2xvciA9PiB7XG4gICAgICBpZiAoY29sb3IpIHtcbiAgICAgICAgdGhpcy5oZXhWYWx1ZSA9IGNvbG9yO1xuICAgICAgICB0aGlzLnNldFZhbHVlQmFzZWRPbkNvbG9yRm9ybWF0KCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBzZXRWYWx1ZUJhc2VkT25Db2xvckZvcm1hdCgpIHtcbiAgICBpZiAodGhpcy5tb2RlbFZhbHVlUmVmZXJlbmNlKSB7XG4gICAgICBjb25zdCBsYXN0VmFsdWVBc0hleGEgPSB0aGlzLmNvbG9yRm9ybWF0ID09PSAnaGV4J1xuICAgICAgICA/IHRoaXMubW9kZWxWYWx1ZVJlZmVyZW5jZVxuICAgICAgICA6IHRoaXMuY29sb3JTZXJ2aWNlLnJnYlRvSGV4KHRoaXMubW9kZWxWYWx1ZVJlZmVyZW5jZVswXSB8fCAwLCB0aGlzLm1vZGVsVmFsdWVSZWZlcmVuY2VbMV0gfHwgMCwgdGhpcy5tb2RlbFZhbHVlUmVmZXJlbmNlWzJdIHx8IDApO1xuICAgICAgaWYgKHRoaXMuaGV4VmFsdWUubWF0Y2goL14jKD86WzAtOWEtZl17M30pezEsMn0kL2kpICYmIHRoaXMuaGV4VmFsdWUgIT09IGxhc3RWYWx1ZUFzSGV4YSkge1xuICAgICAgICB0aGlzLnZhbHVlID0gdGhpcy5jb2xvckZvcm1hdCA9PT0gJ2hleCcgPyB0aGlzLmhleFZhbHVlIDogdGhpcy5jb2xvclNlcnZpY2UuaGV4VG9SZ2IodGhpcy5oZXhWYWx1ZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cblxuICBwcml2YXRlIHVwZGF0ZUhleFZhbHVlQmFzZWRPbk1vZGVsVmFsdWVBbmRGb3JtYXQoKSB7XG4gICAgY29uc3QgY29sb3IgPSB0aGlzLm1vZGVsVmFsdWVSZWZlcmVuY2U7XG4gICAgaWYgKGNvbG9yKSB7XG4gICAgICBpZiAodGhpcy5jb2xvckZvcm1hdCA9PT0gJ3JnYicpIHtcbiAgICAgICAgdGhpcy5oZXhWYWx1ZSA9IHRoaXMuY29sb3JTZXJ2aWNlLnJnYlRvSGV4KGNvbG9yWzBdLCBjb2xvclsxXSwgY29sb3JbMl0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5oZXhWYWx1ZSA9IGNvbG9yO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmhleFZhbHVlID0gJyc7XG4gICAgfVxuICB9XG5cbn1cbiJdfQ==