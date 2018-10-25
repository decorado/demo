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
var noop = function () { };
var ɵ0 = noop;
/** @type {?} */
var COLOR_PICKER_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return DecColorPickerComponent; }),
    multi: true
};
var DecColorPickerComponent = /** @class */ (function () {
    function DecColorPickerComponent(dialog, colorPickerService, colorService) {
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
    Object.defineProperty(DecColorPickerComponent.prototype, "value", {
        get: /**
         * @return {?}
         */
        function () {
            return this.modelValueReference;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            if (this.modelValueReference !== v) {
                this.modelValueReference = v;
            }
            this.onChangeCallback(this.value);
            this.onTouchedCallback();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} value
     * @return {?}
     */
    DecColorPickerComponent.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        value = value || [255, 255, 255]; // ensure modal value
        this.modelValueReference = value;
        this.updateHexValueBasedOnModelValueAndFormat();
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    DecColorPickerComponent.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onChangeCallback = fn;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    DecColorPickerComponent.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onTouchedCallback = fn;
    };
    /**
     * @return {?}
     */
    DecColorPickerComponent.prototype.startColorPicker = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.colorPickerService.start.subscribe(function (color) {
            _this.hexValue = color;
            _this.modelValueReference = _this.hexValue;
            _this.setValueBasedOnColorFormat();
        });
    };
    /**
     * @return {?}
     */
    DecColorPickerComponent.prototype.openColorBox = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.dialog.open(DecColorPickerModalComponent, {
            data: { color: this.hexValue }, width: '320px', id: 'colorContainer', panelClass: ['color-picker-container', 'no-padding', 'box-shadow-none'], hasBackdrop: false, disableClose: true
        }).afterClosed().subscribe(function (color) {
            if (color) {
                _this.hexValue = color;
                _this.setValueBasedOnColorFormat();
            }
        });
    };
    /**
     * @return {?}
     */
    DecColorPickerComponent.prototype.setValueBasedOnColorFormat = /**
     * @return {?}
     */
    function () {
        if (this.modelValueReference) {
            /** @type {?} */
            var lastValueAsHexa = this.colorFormat === 'hex'
                ? this.modelValueReference
                : this.colorService.rgbToHex(this.modelValueReference[0] || 0, this.modelValueReference[1] || 0, this.modelValueReference[2] || 0);
            if (this.hexValue.match(/^#(?:[0-9a-f]{3}){1,2}$/i) && this.hexValue !== lastValueAsHexa) {
                this.value = this.colorFormat === 'hex' ? this.hexValue : this.colorService.hexToRgb(this.hexValue);
            }
        }
    };
    /**
     * @return {?}
     */
    DecColorPickerComponent.prototype.updateHexValueBasedOnModelValueAndFormat = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var color = this.modelValueReference;
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
    };
    DecColorPickerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dec-color-picker',
                    template: "<div class=\"dec-color-picker-wrapper\" fxLayout=\"row\" fxLayoutAlign=\"start center\" fxLayoutGap=\"8px\">\n  <div fxFlex=\"32px\" class=\"color-picker\" [ngStyle]=\"{'backgroundColor': hexValue}\" (click)=\"openColorBox()\"></div>\n  <mat-form-field>\n    <input matInput [(ngModel)]=\"hexValue\" [disabled]=\"disabled\" [autocomplete]=\"autocomplete\" [placeholder]=\"placeholder\"\n      [pattern]=\"pattern\" (ngModelChange)=\"setValueBasedOnColorFormat()\">\n    <dec-icon font=\"mat\" matSuffix (click)=\"startColorPicker()\">colorize</dec-icon>\n  </mat-form-field>\n</div>\n",
                    styles: [".dec-color-picker-wrapper .color-picker{cursor:pointer;height:32px;margin-bottom:10px;border:2px solid rgba(0,0,0,.42);border-radius:2px}.dec-color-picker-wrapper .color-picker:hover{border-color:rgba(0,0,0,.87)}.dec-color-picker-wrapper dec-icon{font-size:24px;cursor:pointer}.dec-color-picker-wrapper dec-icon:hover{color:rgba(0,0,0,.87)}#contentBlocker{position:absolute;top:0;left:0;width:100vw;height:100vh;z-index:9999;overflow:hidden;background-color:transparent}"],
                    encapsulation: ViewEncapsulation.None,
                    providers: [COLOR_PICKER_CONTROL_VALUE_ACCESSOR]
                },] },
    ];
    /** @nocollapse */
    DecColorPickerComponent.ctorParameters = function () { return [
        { type: MatDialog },
        { type: ColorPickerService },
        { type: DecColorService }
    ]; };
    DecColorPickerComponent.propDecorators = {
        disabled: [{ type: Input }],
        colorFormat: [{ type: Input }],
        placeholder: [{ type: Input }]
    };
    return DecColorPickerComponent;
}());
export { DecColorPickerComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLWNvbG9yLXBpY2tlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvZGVjLWNvbG9yLXBpY2tlci9kZWMtY29sb3ItcGlja2VyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxpQkFBaUIsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2hGLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUM5QyxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSwyREFBMkQsQ0FBQztBQUN6RyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxvREFBb0QsQ0FBQztBQUN4RixPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDekUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDBDQUEwQyxDQUFDOztBQUUzRSxJQUFNLElBQUksR0FBRyxlQUFTLENBQUM7OztBQUV2QixJQUFNLG1DQUFtQyxHQUFHO0lBQzFDLE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxjQUFNLE9BQUEsdUJBQXVCLEVBQXZCLENBQXVCLENBQUM7SUFDdEQsS0FBSyxFQUFFLElBQUk7Q0FDWixDQUFDOztJQXNEQSxpQ0FBb0IsTUFBaUIsRUFBVSxrQkFBc0MsRUFBUyxZQUE2QjtRQUF2RyxXQUFNLEdBQU4sTUFBTSxDQUFXO1FBQVUsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtRQUFTLGlCQUFZLEdBQVosWUFBWSxDQUFpQjsyQkFqQ3BHLEtBQUs7MkJBRUwsT0FBTzs0QkFFZixLQUFLO3VCQUVWLG9DQUFvQztpQ0F1Qk4sSUFBSTtnQ0FFQyxJQUFJO0tBRStFO0lBekJoSSxzQkFBSSwwQ0FBSzs7OztRQWFUO1lBQ0Us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Q0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDckc7U0FDRjtLQUNGOzs7O0lBR08sMEVBQXdDOzs7OztRQUM5QyxJQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUM7UUFDdkMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNWLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDL0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQzFFO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7YUFDdkI7U0FDRjtRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7U0FDcEI7OztnQkFqSEosU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxrQkFBa0I7b0JBQzVCLFFBQVEsRUFBRSwwa0JBUVg7b0JBQ0MsTUFBTSxFQUFFLENBQUMsd2RBQXdkLENBQUM7b0JBQ2xlLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxTQUFTLEVBQUUsQ0FBQyxtQ0FBbUMsQ0FBQztpQkFDakQ7Ozs7Z0JBNUJRLFNBQVM7Z0JBRVQsa0JBQWtCO2dCQUVsQixlQUFlOzs7MkJBMkJyQixLQUFLOzhCQUVMLEtBQUs7OEJBRUwsS0FBSzs7a0NBcENSOztTQThCYSx1QkFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIFZpZXdFbmNhcHN1bGF0aW9uLCBJbnB1dCwgZm9yd2FyZFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWF0RGlhbG9nIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgRGVjQ29sb3JQaWNrZXJNb2RhbENvbXBvbmVudCB9IGZyb20gJy4vZGVjLWNvbG9yLXBpY2tlci1tb2RhbC9kZWMtY29sb3ItcGlja2VyLW1vZGFsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb2xvclBpY2tlclNlcnZpY2UgfSBmcm9tICcuLy4uLy4uL3NlcnZpY2VzL2NvbG9yLXBpY2tlci9jb2xvci1waWNrZXIuc2VydmljZSc7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBEZWNDb2xvclNlcnZpY2UgfSBmcm9tICcuLy4uLy4uL3NlcnZpY2VzL2NvbG9yL2RlYy1jb2xvci5zZXJ2aWNlJztcblxuY29uc3Qgbm9vcCA9ICgpID0+IHsgfTtcblxuY29uc3QgQ09MT1JfUElDS0VSX0NPTlRST0xfVkFMVUVfQUNDRVNTT1IgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBEZWNDb2xvclBpY2tlckNvbXBvbmVudCksXG4gIG11bHRpOiB0cnVlXG59O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtY29sb3ItcGlja2VyJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwiZGVjLWNvbG9yLXBpY2tlci13cmFwcGVyXCIgZnhMYXlvdXQ9XCJyb3dcIiBmeExheW91dEFsaWduPVwic3RhcnQgY2VudGVyXCIgZnhMYXlvdXRHYXA9XCI4cHhcIj5cbiAgPGRpdiBmeEZsZXg9XCIzMnB4XCIgY2xhc3M9XCJjb2xvci1waWNrZXJcIiBbbmdTdHlsZV09XCJ7J2JhY2tncm91bmRDb2xvcic6IGhleFZhbHVlfVwiIChjbGljayk9XCJvcGVuQ29sb3JCb3goKVwiPjwvZGl2PlxuICA8bWF0LWZvcm0tZmllbGQ+XG4gICAgPGlucHV0IG1hdElucHV0IFsobmdNb2RlbCldPVwiaGV4VmFsdWVcIiBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIiBbYXV0b2NvbXBsZXRlXT1cImF1dG9jb21wbGV0ZVwiIFtwbGFjZWhvbGRlcl09XCJwbGFjZWhvbGRlclwiXG4gICAgICBbcGF0dGVybl09XCJwYXR0ZXJuXCIgKG5nTW9kZWxDaGFuZ2UpPVwic2V0VmFsdWVCYXNlZE9uQ29sb3JGb3JtYXQoKVwiPlxuICAgIDxkZWMtaWNvbiBmb250PVwibWF0XCIgbWF0U3VmZml4IChjbGljayk9XCJzdGFydENvbG9yUGlja2VyKClcIj5jb2xvcml6ZTwvZGVjLWljb24+XG4gIDwvbWF0LWZvcm0tZmllbGQ+XG48L2Rpdj5cbmAsXG4gIHN0eWxlczogW2AuZGVjLWNvbG9yLXBpY2tlci13cmFwcGVyIC5jb2xvci1waWNrZXJ7Y3Vyc29yOnBvaW50ZXI7aGVpZ2h0OjMycHg7bWFyZ2luLWJvdHRvbToxMHB4O2JvcmRlcjoycHggc29saWQgcmdiYSgwLDAsMCwuNDIpO2JvcmRlci1yYWRpdXM6MnB4fS5kZWMtY29sb3ItcGlja2VyLXdyYXBwZXIgLmNvbG9yLXBpY2tlcjpob3Zlcntib3JkZXItY29sb3I6cmdiYSgwLDAsMCwuODcpfS5kZWMtY29sb3ItcGlja2VyLXdyYXBwZXIgZGVjLWljb257Zm9udC1zaXplOjI0cHg7Y3Vyc29yOnBvaW50ZXJ9LmRlYy1jb2xvci1waWNrZXItd3JhcHBlciBkZWMtaWNvbjpob3Zlcntjb2xvcjpyZ2JhKDAsMCwwLC44Nyl9I2NvbnRlbnRCbG9ja2Vye3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO2xlZnQ6MDt3aWR0aDoxMDB2dztoZWlnaHQ6MTAwdmg7ei1pbmRleDo5OTk5O292ZXJmbG93OmhpZGRlbjtiYWNrZ3JvdW5kLWNvbG9yOnRyYW5zcGFyZW50fWBdLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBwcm92aWRlcnM6IFtDT0xPUl9QSUNLRVJfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUl1cbn0pXG5leHBvcnQgY2xhc3MgRGVjQ29sb3JQaWNrZXJDb21wb25lbnQgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG5cbiAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW47XG5cbiAgQElucHV0KCkgY29sb3JGb3JtYXQgPSAncmdiJztcblxuICBASW5wdXQoKSBwbGFjZWhvbGRlciA9ICdDb2xvcic7XG5cbiAgYXV0b2NvbXBsZXRlID0gJ29mZic7XG5cbiAgcGF0dGVybiA9ICdeIyhbQS1GYS1mMC05XXs2fXxbQS1GYS1mMC05XXszfSkkJztcblxuICBzZXQgdmFsdWUodjogYW55KSB7XG5cbiAgICBpZiAodGhpcy5tb2RlbFZhbHVlUmVmZXJlbmNlICE9PSB2KSB7XG5cbiAgICAgIHRoaXMubW9kZWxWYWx1ZVJlZmVyZW5jZSA9IHY7XG5cbiAgICB9XG5cbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sodGhpcy52YWx1ZSk7XG5cbiAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrKCk7XG5cbiAgfVxuICBnZXQgdmFsdWUoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5tb2RlbFZhbHVlUmVmZXJlbmNlO1xuICB9XG5cbiAgaGV4VmFsdWU7XG5cbiAgcHJpdmF0ZSBtb2RlbFZhbHVlUmVmZXJlbmNlOiBhbnk7XG5cbiAgcHJpdmF0ZSBvblRvdWNoZWRDYWxsYmFjazogKCkgPT4gdm9pZCA9IG5vb3A7XG5cbiAgcHJpdmF0ZSBvbkNoYW5nZUNhbGxiYWNrOiAoXzogYW55KSA9PiB2b2lkID0gbm9vcDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRpYWxvZzogTWF0RGlhbG9nLCBwcml2YXRlIGNvbG9yUGlja2VyU2VydmljZTogQ29sb3JQaWNrZXJTZXJ2aWNlLCBwdWJsaWMgY29sb3JTZXJ2aWNlOiBEZWNDb2xvclNlcnZpY2UpIHsgfVxuXG4gIHdyaXRlVmFsdWUodmFsdWU6IGFueSk6IHZvaWQge1xuXG4gICAgdmFsdWUgPSB2YWx1ZSB8fCBbMjU1LCAyNTUsIDI1NV07IC8vIGVuc3VyZSBtb2RhbCB2YWx1ZVxuXG4gICAgdGhpcy5tb2RlbFZhbHVlUmVmZXJlbmNlID0gdmFsdWU7XG5cbiAgICB0aGlzLnVwZGF0ZUhleFZhbHVlQmFzZWRPbk1vZGVsVmFsdWVBbmRGb3JtYXQoKTtcblxuICB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KSB7XG4gICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrID0gZm47XG4gIH1cblxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KSB7XG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjayA9IGZuO1xuICB9XG5cbiAgc3RhcnRDb2xvclBpY2tlcigpIHtcbiAgICB0aGlzLmNvbG9yUGlja2VyU2VydmljZS5zdGFydC5zdWJzY3JpYmUoKGNvbG9yKSA9PiB7XG4gICAgICB0aGlzLmhleFZhbHVlID0gY29sb3I7XG4gICAgICB0aGlzLm1vZGVsVmFsdWVSZWZlcmVuY2UgPSB0aGlzLmhleFZhbHVlO1xuICAgICAgdGhpcy5zZXRWYWx1ZUJhc2VkT25Db2xvckZvcm1hdCgpO1xuICAgIH0pO1xuICB9XG5cbiAgb3BlbkNvbG9yQm94KCkge1xuICAgIHRoaXMuZGlhbG9nLm9wZW4oRGVjQ29sb3JQaWNrZXJNb2RhbENvbXBvbmVudCwge1xuICAgICAgZGF0YTogeyBjb2xvcjogdGhpcy5oZXhWYWx1ZSB9LCB3aWR0aDogJzMyMHB4JywgaWQ6ICdjb2xvckNvbnRhaW5lcicsIHBhbmVsQ2xhc3M6IFsnY29sb3ItcGlja2VyLWNvbnRhaW5lcicsICduby1wYWRkaW5nJywgJ2JveC1zaGFkb3ctbm9uZSddLCBoYXNCYWNrZHJvcDogZmFsc2UsIGRpc2FibGVDbG9zZTogdHJ1ZVxuICAgIH0pLmFmdGVyQ2xvc2VkKCkuc3Vic2NyaWJlKGNvbG9yID0+IHtcbiAgICAgIGlmIChjb2xvcikge1xuICAgICAgICB0aGlzLmhleFZhbHVlID0gY29sb3I7XG4gICAgICAgIHRoaXMuc2V0VmFsdWVCYXNlZE9uQ29sb3JGb3JtYXQoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHNldFZhbHVlQmFzZWRPbkNvbG9yRm9ybWF0KCkge1xuICAgIGlmICh0aGlzLm1vZGVsVmFsdWVSZWZlcmVuY2UpIHtcbiAgICAgIGNvbnN0IGxhc3RWYWx1ZUFzSGV4YSA9IHRoaXMuY29sb3JGb3JtYXQgPT09ICdoZXgnXG4gICAgICAgID8gdGhpcy5tb2RlbFZhbHVlUmVmZXJlbmNlXG4gICAgICAgIDogdGhpcy5jb2xvclNlcnZpY2UucmdiVG9IZXgodGhpcy5tb2RlbFZhbHVlUmVmZXJlbmNlWzBdIHx8IDAsIHRoaXMubW9kZWxWYWx1ZVJlZmVyZW5jZVsxXSB8fCAwLCB0aGlzLm1vZGVsVmFsdWVSZWZlcmVuY2VbMl0gfHwgMCk7XG4gICAgICBpZiAodGhpcy5oZXhWYWx1ZS5tYXRjaCgvXiMoPzpbMC05YS1mXXszfSl7MSwyfSQvaSkgJiYgdGhpcy5oZXhWYWx1ZSAhPT0gbGFzdFZhbHVlQXNIZXhhKSB7XG4gICAgICAgIHRoaXMudmFsdWUgPSB0aGlzLmNvbG9yRm9ybWF0ID09PSAnaGV4JyA/IHRoaXMuaGV4VmFsdWUgOiB0aGlzLmNvbG9yU2VydmljZS5oZXhUb1JnYih0aGlzLmhleFZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuXG4gIHByaXZhdGUgdXBkYXRlSGV4VmFsdWVCYXNlZE9uTW9kZWxWYWx1ZUFuZEZvcm1hdCgpIHtcbiAgICBjb25zdCBjb2xvciA9IHRoaXMubW9kZWxWYWx1ZVJlZmVyZW5jZTtcbiAgICBpZiAoY29sb3IpIHtcbiAgICAgIGlmICh0aGlzLmNvbG9yRm9ybWF0ID09PSAncmdiJykge1xuICAgICAgICB0aGlzLmhleFZhbHVlID0gdGhpcy5jb2xvclNlcnZpY2UucmdiVG9IZXgoY29sb3JbMF0sIGNvbG9yWzFdLCBjb2xvclsyXSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmhleFZhbHVlID0gY29sb3I7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaGV4VmFsdWUgPSAnJztcbiAgICB9XG4gIH1cblxufVxuIl19