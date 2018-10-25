/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
/** @type {?} */
var noop = function () {
};
var ɵ0 = noop;
/** @type {?} */
export var CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return DecStringArrayInputComponent; }),
    multi: true
};
var DecStringArrayInputComponent = /** @class */ (function () {
    function DecStringArrayInputComponent() {
        this.mode = 'textarea';
        this.rows = 3;
        this.innerArray = '';
        this.onTouchedCallback = noop;
        this.onChangeCallback = noop;
    }
    Object.defineProperty(DecStringArrayInputComponent.prototype, "value", {
        /*
        ** ngModel API
        */
        // Get accessor
        get: /**
         * @return {?}
         */
        function () {
            return this.innerArray;
        },
        // Set accessor including call the onchange callback
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            if (v !== this.innerArray) {
                this.innerArray = v;
                this.onChangeCallback(v);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DecStringArrayInputComponent.prototype, "valueAsString", {
        get: /**
         * @return {?}
         */
        function () {
            return this.getArrayAsString();
        },
        // Set accessor including call the onchange callback
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            if (v !== this.innerArray) {
                this.value = this.stringToArray(v);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    DecStringArrayInputComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    //
    /**
     * @return {?}
     */
    DecStringArrayInputComponent.prototype.getArrayAsString = /**
     * @return {?}
     */
    function () {
        return this.arrayToString(this.value);
    };
    // From ControlValueAccessor interface
    /**
     * @param {?} value
     * @return {?}
     */
    DecStringArrayInputComponent.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (value !== this.value) {
            this.value = value;
        }
    };
    // From ControlValueAccessor interface
    /**
     * @param {?} fn
     * @return {?}
     */
    DecStringArrayInputComponent.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onChangeCallback = fn;
    };
    // From ControlValueAccessor interface
    /**
     * @param {?} fn
     * @return {?}
     */
    DecStringArrayInputComponent.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onTouchedCallback = fn;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    DecStringArrayInputComponent.prototype.onValueChanged = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.value = event.toString();
    };
    /**
     * @param {?} stringOfArray
     * @return {?}
     */
    DecStringArrayInputComponent.prototype.stringToArray = /**
     * @param {?} stringOfArray
     * @return {?}
     */
    function (stringOfArray) {
        if (stringOfArray) {
            /** @type {?} */
            var regExp = /[^,\s][^,\s]*[^,\s]*/g;
            return stringOfArray.match(regExp);
        }
        else {
            return [];
        }
    };
    /**
     * @param {?} arrayOfstring
     * @return {?}
     */
    DecStringArrayInputComponent.prototype.arrayToString = /**
     * @param {?} arrayOfstring
     * @return {?}
     */
    function (arrayOfstring) {
        if (arrayOfstring) {
            return arrayOfstring.join(', ');
        }
        else {
            return undefined;
        }
    };
    DecStringArrayInputComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dec-string-array-input',
                    template: "<ng-container [ngSwitch]=\"mode == 'input'\">\n\n  <mat-form-field *ngSwitchCase=\"true\">\n    <input matInput\n    type=\"text\"\n    [name]=\"name\"\n    [(ngModel)]=\"valueAsString\"\n    [placeholder]=\"placeholder\">\n  </mat-form-field>\n\n  <mat-form-field *ngSwitchCase=\"false\">\n    <textarea matInput\n    [rows]=\"rows\"\n    [name]=\"name\"\n    [(ngModel)]=\"valueAsString\"\n    [placeholder]=\"placeholder\">\n    </textarea>\n  </mat-form-field>\n\n</ng-container>\n",
                    styles: [""],
                    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
                },] },
    ];
    /** @nocollapse */
    DecStringArrayInputComponent.ctorParameters = function () { return []; };
    DecStringArrayInputComponent.propDecorators = {
        name: [{ type: Input }],
        placeholder: [{ type: Input }],
        mode: [{ type: Input }],
        rows: [{ type: Input }]
    };
    return DecStringArrayInputComponent;
}());
export { DecStringArrayInputComponent };
if (false) {
    /** @type {?} */
    DecStringArrayInputComponent.prototype.name;
    /** @type {?} */
    DecStringArrayInputComponent.prototype.placeholder;
    /** @type {?} */
    DecStringArrayInputComponent.prototype.mode;
    /** @type {?} */
    DecStringArrayInputComponent.prototype.rows;
    /** @type {?} */
    DecStringArrayInputComponent.prototype.innerArray;
    /** @type {?} */
    DecStringArrayInputComponent.prototype.onTouchedCallback;
    /** @type {?} */
    DecStringArrayInputComponent.prototype.onChangeCallback;
}
export { ɵ0 };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLXN0cmluZy1hcnJheS1pbnB1dC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvZGVjLXN0cmluZy1hcnJheS1pbnB1dC9kZWMtc3RyaW5nLWFycmF5LWlucHV0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxVQUFVLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDOztBQUduRCxJQUFNLElBQUksR0FBRztDQUNaLENBQUM7OztBQUdGLFdBQWEsbUNBQW1DLEdBQVE7SUFDdEQsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLGNBQU0sT0FBQSw0QkFBNEIsRUFBNUIsQ0FBNEIsQ0FBQztJQUMzRCxLQUFLLEVBQUUsSUFBSTtDQUNaLENBQUM7O0lBMEZBO29CQXhEZ0IsVUFBVTtvQkFFVixDQUFDOzBCQWdEUyxFQUFFO2lDQUVZLElBQUk7Z0NBRUMsSUFBSTtLQUVoQztJQS9DakIsc0JBQUksK0NBQUs7UUFMVDs7VUFFRTtRQUVGLGVBQWU7Ozs7UUFDZjtZQUVFLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO1NBRXhCO1FBRUQsb0RBQW9EOzs7OztRQUNwRCxVQUFVLENBQVc7WUFFbkIsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO2dCQUUxQixJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQztnQkFFcEIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDO2FBRTFCO1NBRUY7OztPQWJBO0lBZUQsc0JBQUksdURBQWE7Ozs7UUFBakI7WUFFRSxNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7U0FFaEM7UUFFRCxvREFBb0Q7Ozs7O1FBQ3BELFVBQWtCLENBQVM7WUFFekIsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO2dCQUUxQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFFcEM7U0FFRjs7O09BWEE7Ozs7SUEwQkQsK0NBQVE7OztJQUFSO0tBQ0M7SUFFRCxFQUFFOzs7O0lBQ0YsdURBQWdCOzs7SUFBaEI7UUFFRSxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7S0FFdkM7SUFFRCxzQ0FBc0M7Ozs7O0lBQ3RDLGlEQUFVOzs7O0lBQVYsVUFBVyxLQUFlO1FBRXhCLEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUV6QixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztTQUVwQjtLQUVGO0lBRUQsc0NBQXNDOzs7OztJQUN0Qyx1REFBZ0I7Ozs7SUFBaEIsVUFBaUIsRUFBTztRQUN0QixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsRUFBRSxDQUFDO0tBQzVCO0lBRUQsc0NBQXNDOzs7OztJQUN0Qyx3REFBaUI7Ozs7SUFBakIsVUFBa0IsRUFBTztRQUN2QixJQUFJLENBQUMsaUJBQWlCLEdBQUcsRUFBRSxDQUFDO0tBQzdCOzs7OztJQUVELHFEQUFjOzs7O0lBQWQsVUFBZSxLQUFVO1FBQ3ZCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO0tBQy9COzs7OztJQUVPLG9EQUFhOzs7O2NBQUMsYUFBcUI7UUFDekMsRUFBRSxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQzs7WUFFbEIsSUFBTSxNQUFNLEdBQUcsdUJBQXVCLENBQUM7WUFFdkMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7U0FFcEM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUVOLE1BQU0sQ0FBQyxFQUFFLENBQUM7U0FFWDs7Ozs7O0lBR0ssb0RBQWE7Ozs7Y0FBQyxhQUF1QjtRQUUzQyxFQUFFLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1lBRWxCLE1BQU0sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBRWpDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFFTixNQUFNLENBQUMsU0FBUyxDQUFDO1NBRWxCOzs7Z0JBckpKLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsd0JBQXdCO29CQUNsQyxRQUFRLEVBQUUsdWVBb0JYO29CQUNDLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQztvQkFDWixTQUFTLEVBQUUsQ0FBQyxtQ0FBbUMsQ0FBQztpQkFDakQ7Ozs7O3VCQUdFLEtBQUs7OEJBRUwsS0FBSzt1QkFFTCxLQUFLO3VCQUVMLEtBQUs7O3VDQWhEUjs7U0F3Q2EsNEJBQTRCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIGZvcndhcmRSZWYsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuLy8gIFJldHVybiBhbiBlbXB0eSBmdW5jdGlvbiB0byBiZSB1c2VkIGFzIGRlZmF1bHQgdHJpZ2dlciBmdW5jdGlvbnNcbmNvbnN0IG5vb3AgPSAoKSA9PiB7XG59O1xuXG4vLyAgVXNlZCB0byBleHRlbmQgbmdGb3JtcyBmdW5jdGlvbnNcbmV4cG9ydCBjb25zdCBDVVNUT01fSU5QVVRfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gRGVjU3RyaW5nQXJyYXlJbnB1dENvbXBvbmVudCksXG4gIG11bHRpOiB0cnVlXG59O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtc3RyaW5nLWFycmF5LWlucHV0JyxcbiAgdGVtcGxhdGU6IGA8bmctY29udGFpbmVyIFtuZ1N3aXRjaF09XCJtb2RlID09ICdpbnB1dCdcIj5cblxuICA8bWF0LWZvcm0tZmllbGQgKm5nU3dpdGNoQ2FzZT1cInRydWVcIj5cbiAgICA8aW5wdXQgbWF0SW5wdXRcbiAgICB0eXBlPVwidGV4dFwiXG4gICAgW25hbWVdPVwibmFtZVwiXG4gICAgWyhuZ01vZGVsKV09XCJ2YWx1ZUFzU3RyaW5nXCJcbiAgICBbcGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXJcIj5cbiAgPC9tYXQtZm9ybS1maWVsZD5cblxuICA8bWF0LWZvcm0tZmllbGQgKm5nU3dpdGNoQ2FzZT1cImZhbHNlXCI+XG4gICAgPHRleHRhcmVhIG1hdElucHV0XG4gICAgW3Jvd3NdPVwicm93c1wiXG4gICAgW25hbWVdPVwibmFtZVwiXG4gICAgWyhuZ01vZGVsKV09XCJ2YWx1ZUFzU3RyaW5nXCJcbiAgICBbcGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXJcIj5cbiAgICA8L3RleHRhcmVhPlxuICA8L21hdC1mb3JtLWZpZWxkPlxuXG48L25nLWNvbnRhaW5lcj5cbmAsXG4gIHN0eWxlczogW2BgXSxcbiAgcHJvdmlkZXJzOiBbQ1VTVE9NX0lOUFVUX0NPTlRST0xfVkFMVUVfQUNDRVNTT1JdXG59KVxuZXhwb3J0IGNsYXNzIERlY1N0cmluZ0FycmF5SW5wdXRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIEBJbnB1dCgpIG5hbWU7XG5cbiAgQElucHV0KCkgcGxhY2Vob2xkZXI7XG5cbiAgQElucHV0KCkgbW9kZSA9ICd0ZXh0YXJlYSc7XG5cbiAgQElucHV0KCkgcm93cyA9IDM7XG5cbiAgLypcbiAgKiogbmdNb2RlbCBBUElcbiAgKi9cblxuICAvLyBHZXQgYWNjZXNzb3JcbiAgZ2V0IHZhbHVlKCk6IHN0cmluZ1tdIHtcblxuICAgIHJldHVybiB0aGlzLmlubmVyQXJyYXk7XG5cbiAgfVxuXG4gIC8vIFNldCBhY2Nlc3NvciBpbmNsdWRpbmcgY2FsbCB0aGUgb25jaGFuZ2UgY2FsbGJhY2tcbiAgc2V0IHZhbHVlKHY6IHN0cmluZ1tdKSB7XG5cbiAgICBpZiAodiAhPT0gdGhpcy5pbm5lckFycmF5KSB7XG5cbiAgICAgIHRoaXMuaW5uZXJBcnJheSA9IHY7XG5cbiAgICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayh2KTtcblxuICAgIH1cblxuICB9XG5cbiAgZ2V0IHZhbHVlQXNTdHJpbmcoKTogc3RyaW5nIHtcblxuICAgIHJldHVybiB0aGlzLmdldEFycmF5QXNTdHJpbmcoKTtcblxuICB9XG5cbiAgLy8gU2V0IGFjY2Vzc29yIGluY2x1ZGluZyBjYWxsIHRoZSBvbmNoYW5nZSBjYWxsYmFja1xuICBzZXQgdmFsdWVBc1N0cmluZyh2OiBzdHJpbmcpIHtcblxuICAgIGlmICh2ICE9PSB0aGlzLmlubmVyQXJyYXkpIHtcblxuICAgICAgdGhpcy52YWx1ZSA9IHRoaXMuc3RyaW5nVG9BcnJheSh2KTtcblxuICAgIH1cblxuICB9XG5cbiAgLypcbiAgKiogbmdNb2RlbCBwcm9wZXJ0aWVcbiAgKiogVXNlZCB0byB0d28gd2F5IGRhdGEgYmluZCB1c2luZyBbKG5nTW9kZWwpXVxuICAqL1xuICAvLyAgVGhlIGludGVybmFsIGRhdGEgbW9kZWxcbiAgcHJpdmF0ZSBpbm5lckFycmF5OiBhbnkgPSAnJztcbiAgLy8gIFBsYWNlaG9sZGVycyBmb3IgdGhlIGNhbGxiYWNrcyB3aGljaCBhcmUgbGF0ZXIgcHJvdmlkZWQgYnkgdGhlIENvbnRyb2wgVmFsdWUgQWNjZXNzb3JcbiAgcHJpdmF0ZSBvblRvdWNoZWRDYWxsYmFjazogKCkgPT4gdm9pZCA9IG5vb3A7XG4gIC8vICBQbGFjZWhvbGRlcnMgZm9yIHRoZSBjYWxsYmFja3Mgd2hpY2ggYXJlIGxhdGVyIHByb3ZpZGVkIGJ5IHRoZSBDb250cm9sIFZhbHVlIEFjY2Vzc29yXG4gIHByaXZhdGUgb25DaGFuZ2VDYWxsYmFjazogKF86IGFueSkgPT4gdm9pZCA9IG5vb3A7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG4gIC8vXG4gIGdldEFycmF5QXNTdHJpbmcoKSB7XG5cbiAgICByZXR1cm4gdGhpcy5hcnJheVRvU3RyaW5nKHRoaXMudmFsdWUpO1xuXG4gIH1cblxuICAvLyBGcm9tIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGludGVyZmFjZVxuICB3cml0ZVZhbHVlKHZhbHVlOiBzdHJpbmdbXSkge1xuXG4gICAgaWYgKHZhbHVlICE9PSB0aGlzLnZhbHVlKSB7XG5cbiAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcblxuICAgIH1cblxuICB9XG5cbiAgLy8gRnJvbSBDb250cm9sVmFsdWVBY2Nlc3NvciBpbnRlcmZhY2VcbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KSB7XG4gICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrID0gZm47XG4gIH1cblxuICAvLyBGcm9tIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGludGVyZmFjZVxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KSB7XG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjayA9IGZuO1xuICB9XG5cbiAgb25WYWx1ZUNoYW5nZWQoZXZlbnQ6IGFueSkge1xuICAgIHRoaXMudmFsdWUgPSBldmVudC50b1N0cmluZygpO1xuICB9XG5cbiAgcHJpdmF0ZSBzdHJpbmdUb0FycmF5KHN0cmluZ09mQXJyYXk6IHN0cmluZyk6IHN0cmluZ1tdIHtcbiAgICBpZiAoc3RyaW5nT2ZBcnJheSkge1xuXG4gICAgICBjb25zdCByZWdFeHAgPSAvW14sXFxzXVteLFxcc10qW14sXFxzXSovZztcblxuICAgICAgcmV0dXJuIHN0cmluZ09mQXJyYXkubWF0Y2gocmVnRXhwKTtcblxuICAgIH0gZWxzZSB7XG5cbiAgICAgIHJldHVybiBbXTtcblxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYXJyYXlUb1N0cmluZyhhcnJheU9mc3RyaW5nOiBzdHJpbmdbXSk6IHN0cmluZyB7XG5cbiAgICBpZiAoYXJyYXlPZnN0cmluZykge1xuXG4gICAgICByZXR1cm4gYXJyYXlPZnN0cmluZy5qb2luKCcsICcpO1xuXG4gICAgfSBlbHNlIHtcblxuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcblxuICAgIH1cblxuXG4gIH1cblxufVxuIl19