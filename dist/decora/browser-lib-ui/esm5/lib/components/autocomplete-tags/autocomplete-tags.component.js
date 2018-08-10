/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { noop } from 'rxjs';
var AutocompleteTagsComponent = /** @class */ (function () {
    function AutocompleteTagsComponent() {
        this.endpoint = 'tags/options';
        this.valueAttr = 'key';
        this.labelAttr = 'value';
        this.name = 'Tags autocomplete';
        this.placeholder = 'Tags autocomplete';
        this.blur = new EventEmitter();
        this.optionSelected = new EventEmitter();
        this.enterButton = new EventEmitter();
        this.innerValue = '';
        this.onTouchedCallback = noop;
        this.onChangeCallback = noop;
    }
    Object.defineProperty(AutocompleteTagsComponent.prototype, "value", {
        /*
        ** ngModel API
        */
        // Get accessor
        get: /**
         * @return {?}
         */
        function () {
            return this.innerValue;
        },
        // Set accessor including call the onchange callback
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            if (v !== this.innerValue) {
                this.innerValue = v;
                this.onChangeCallback(v);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} company
     * @return {?}
     */
    AutocompleteTagsComponent.prototype.labelFn = /**
     * @param {?} company
     * @return {?}
     */
    function (company) {
        return company.value + " #" + company.key;
    };
    // From ControlValueAccessor interface
    /**
     * @param {?} fn
     * @return {?}
     */
    AutocompleteTagsComponent.prototype.registerOnChange = /**
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
    AutocompleteTagsComponent.prototype.registerOnTouched = /**
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
    AutocompleteTagsComponent.prototype.onValueChanged = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.value = event.toString();
    };
    /**
     * @param {?} value
     * @return {?}
     */
    AutocompleteTagsComponent.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if ("" + value !== "" + this.value) {
            // convert to string to avoid problems comparing values
            if (value && value !== undefined && value !== null) {
                this.value = value;
            }
        }
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    AutocompleteTagsComponent.prototype.onAutocompleteBlur = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        this.onTouchedCallback();
        this.blur.emit(this.value);
    };
    AutocompleteTagsComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dec-autocomplete-tags',
                    template: "<dec-autocomplete\n[disabled]=\"disabled\"\n[required]=\"required\"\n[endpoint]=\"endpoint\"\n[name]=\"name\"\n[placeholder]=\"placeholder\"\n(optionSelected)=\"optionSelected.emit($event)\"\n(enterButton)=\"enterButton.emit($event)\"\n[(ngModel)]=\"value\"\n[labelAttr]=\"labelAttr\"\n[valueAttr]=\"valueAttr\"\n(blur)=\"blur.emit($event)\"></dec-autocomplete>",
                    styles: [""]
                },] },
    ];
    /** @nocollapse */
    AutocompleteTagsComponent.ctorParameters = function () { return []; };
    AutocompleteTagsComponent.propDecorators = {
        disabled: [{ type: Input }],
        required: [{ type: Input }],
        name: [{ type: Input }],
        placeholder: [{ type: Input }],
        blur: [{ type: Output }],
        optionSelected: [{ type: Output }],
        enterButton: [{ type: Output }]
    };
    return AutocompleteTagsComponent;
}());
export { AutocompleteTagsComponent };
function AutocompleteTagsComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    AutocompleteTagsComponent.prototype.endpoint;
    /** @type {?} */
    AutocompleteTagsComponent.prototype.valueAttr;
    /** @type {?} */
    AutocompleteTagsComponent.prototype.labelAttr;
    /** @type {?} */
    AutocompleteTagsComponent.prototype.disabled;
    /** @type {?} */
    AutocompleteTagsComponent.prototype.required;
    /** @type {?} */
    AutocompleteTagsComponent.prototype.name;
    /** @type {?} */
    AutocompleteTagsComponent.prototype.placeholder;
    /** @type {?} */
    AutocompleteTagsComponent.prototype.blur;
    /** @type {?} */
    AutocompleteTagsComponent.prototype.optionSelected;
    /** @type {?} */
    AutocompleteTagsComponent.prototype.enterButton;
    /** @type {?} */
    AutocompleteTagsComponent.prototype.innerValue;
    /** @type {?} */
    AutocompleteTagsComponent.prototype.onTouchedCallback;
    /** @type {?} */
    AutocompleteTagsComponent.prototype.onChangeCallback;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b2NvbXBsZXRlLXRhZ3MuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL2F1dG9jb21wbGV0ZS10YWdzL2F1dG9jb21wbGV0ZS10YWdzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUvRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sTUFBTSxDQUFDOztJQW9EMUI7d0JBL0JXLGNBQWM7eUJBRWIsS0FBSzt5QkFFTCxPQUFPO29CQU1ILG1CQUFtQjsyQkFFWixtQkFBbUI7b0JBRU4sSUFBSSxZQUFZLEVBQU87OEJBRWIsSUFBSSxZQUFZLEVBQU87MkJBRTFCLElBQUksWUFBWSxFQUFPOzBCQU94QyxFQUFFO2lDQUVZLElBQUk7Z0NBRUMsSUFBSTtLQUVqQztJQU9oQixzQkFBSSw0Q0FBSztRQUxUOztVQUVFO1FBRUYsZUFBZTs7OztRQUNmO1lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7U0FDeEI7UUFFRCxvREFBb0Q7Ozs7O1FBQ3BELFVBQVUsQ0FBTTtZQUNkLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztnQkFDMUIsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUM7Z0JBQ3BCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUMxQjtTQUNGOzs7T0FSQTs7Ozs7SUFVRCwyQ0FBTzs7OztJQUFQLFVBQVEsT0FBTztRQUNiLE1BQU0sQ0FBSSxPQUFPLENBQUMsS0FBSyxVQUFLLE9BQU8sQ0FBQyxHQUFLLENBQUM7S0FDM0M7SUFFRCxzQ0FBc0M7Ozs7O0lBQ3RDLG9EQUFnQjs7OztJQUFoQixVQUFpQixFQUFPO1FBQ3RCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxFQUFFLENBQUM7S0FDNUI7SUFFRCxzQ0FBc0M7Ozs7O0lBQ3RDLHFEQUFpQjs7OztJQUFqQixVQUFrQixFQUFPO1FBQ3ZCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxFQUFFLENBQUM7S0FDN0I7Ozs7O0lBRUQsa0RBQWM7Ozs7SUFBZCxVQUFlLEtBQVU7UUFDdkIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7S0FDL0I7Ozs7O0lBRUQsOENBQVU7Ozs7SUFBVixVQUFXLEtBQVU7UUFDbkIsRUFBRSxDQUFDLENBQUMsS0FBRyxLQUFPLEtBQUssS0FBRyxJQUFJLENBQUMsS0FBTyxDQUFDLENBQUMsQ0FBQzs7WUFDbkMsRUFBRSxDQUFDLENBQUMsS0FBSyxJQUFJLEtBQUssS0FBSyxTQUFTLElBQUksS0FBSyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ25ELElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO2FBQ3BCO1NBQ0Y7S0FDRjs7Ozs7SUFFRCxzREFBa0I7Ozs7SUFBbEIsVUFBbUIsTUFBTTtRQUN2QixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUN6QixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDNUI7O2dCQWxHRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLHVCQUF1QjtvQkFDakMsUUFBUSxFQUFFLDJXQVdtQztvQkFDN0MsTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDO2lCQUNiOzs7OzsyQkFVRSxLQUFLOzJCQUVMLEtBQUs7dUJBRUwsS0FBSzs4QkFFTCxLQUFLO3VCQUVMLE1BQU07aUNBRU4sTUFBTTs4QkFFTixNQUFNOztvQ0F6Q1Q7O1NBb0JhLHlCQUF5QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgbm9vcCB9IGZyb20gJ3J4anMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtYXV0b2NvbXBsZXRlLXRhZ3MnLFxuICB0ZW1wbGF0ZTogYDxkZWMtYXV0b2NvbXBsZXRlXG5bZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuW3JlcXVpcmVkXT1cInJlcXVpcmVkXCJcbltlbmRwb2ludF09XCJlbmRwb2ludFwiXG5bbmFtZV09XCJuYW1lXCJcbltwbGFjZWhvbGRlcl09XCJwbGFjZWhvbGRlclwiXG4ob3B0aW9uU2VsZWN0ZWQpPVwib3B0aW9uU2VsZWN0ZWQuZW1pdCgkZXZlbnQpXCJcbihlbnRlckJ1dHRvbik9XCJlbnRlckJ1dHRvbi5lbWl0KCRldmVudClcIlxuWyhuZ01vZGVsKV09XCJ2YWx1ZVwiXG5bbGFiZWxBdHRyXT1cImxhYmVsQXR0clwiXG5bdmFsdWVBdHRyXT1cInZhbHVlQXR0clwiXG4oYmx1cik9XCJibHVyLmVtaXQoJGV2ZW50KVwiPjwvZGVjLWF1dG9jb21wbGV0ZT5gLFxuICBzdHlsZXM6IFtgYF1cbn0pXG5leHBvcnQgY2xhc3MgQXV0b2NvbXBsZXRlVGFnc0NvbXBvbmVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcblxuXG4gIGVuZHBvaW50ID0gJ3RhZ3Mvb3B0aW9ucyc7XG5cbiAgdmFsdWVBdHRyID0gJ2tleSc7XG5cbiAgbGFiZWxBdHRyID0gJ3ZhbHVlJztcblxuICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbjtcblxuICBASW5wdXQoKSByZXF1aXJlZDogYm9vbGVhbjtcblxuICBASW5wdXQoKSBuYW1lID0gJ1RhZ3MgYXV0b2NvbXBsZXRlJztcblxuICBASW5wdXQoKSBwbGFjZWhvbGRlciA9ICdUYWdzIGF1dG9jb21wbGV0ZSc7XG5cbiAgQE91dHB1dCgpIGJsdXI6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgQE91dHB1dCgpIG9wdGlvblNlbGVjdGVkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIEBPdXRwdXQoKSBlbnRlckJ1dHRvbjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICAvKlxuICAqKiBuZ01vZGVsIHByb3BlcnRpZVxuICAqKiBVc2VkIHRvIHR3byB3YXkgZGF0YSBiaW5kIHVzaW5nIFsobmdNb2RlbCldXG4gICovXG4gIC8vICBUaGUgaW50ZXJuYWwgZGF0YSBtb2RlbFxuICBwcml2YXRlIGlubmVyVmFsdWU6IGFueSA9ICcnO1xuICAvLyAgUGxhY2Vob2xkZXJzIGZvciB0aGUgY2FsbGJhY2tzIHdoaWNoIGFyZSBsYXRlciBwcm92aWRlZCBieSB0aGUgQ29udHJvbCBWYWx1ZSBBY2Nlc3NvclxuICBwcml2YXRlIG9uVG91Y2hlZENhbGxiYWNrOiAoKSA9PiB2b2lkID0gbm9vcDtcbiAgLy8gIFBsYWNlaG9sZGVycyBmb3IgdGhlIGNhbGxiYWNrcyB3aGljaCBhcmUgbGF0ZXIgcHJvdmlkZWQgYnkgdGhlIENvbnRyb2wgVmFsdWUgQWNjZXNzb3JcbiAgcHJpdmF0ZSBvbkNoYW5nZUNhbGxiYWNrOiAoXzogYW55KSA9PiB2b2lkID0gbm9vcDtcblxuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgLypcbiAgKiogbmdNb2RlbCBBUElcbiAgKi9cblxuICAvLyBHZXQgYWNjZXNzb3JcbiAgZ2V0IHZhbHVlKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuaW5uZXJWYWx1ZTtcbiAgfVxuXG4gIC8vIFNldCBhY2Nlc3NvciBpbmNsdWRpbmcgY2FsbCB0aGUgb25jaGFuZ2UgY2FsbGJhY2tcbiAgc2V0IHZhbHVlKHY6IGFueSkge1xuICAgIGlmICh2ICE9PSB0aGlzLmlubmVyVmFsdWUpIHtcbiAgICAgIHRoaXMuaW5uZXJWYWx1ZSA9IHY7XG4gICAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sodik7XG4gICAgfVxuICB9XG5cbiAgbGFiZWxGbihjb21wYW55KSB7XG4gICAgcmV0dXJuIGAke2NvbXBhbnkudmFsdWV9ICMke2NvbXBhbnkua2V5fWA7XG4gIH1cblxuICAvLyBGcm9tIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGludGVyZmFjZVxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIC8vIEZyb20gQ29udHJvbFZhbHVlQWNjZXNzb3IgaW50ZXJmYWNlXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrID0gZm47XG4gIH1cblxuICBvblZhbHVlQ2hhbmdlZChldmVudDogYW55KSB7XG4gICAgdGhpcy52YWx1ZSA9IGV2ZW50LnRvU3RyaW5nKCk7XG4gIH1cblxuICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICBpZiAoYCR7dmFsdWV9YCAhPT0gYCR7dGhpcy52YWx1ZX1gKSB7IC8vIGNvbnZlcnQgdG8gc3RyaW5nIHRvIGF2b2lkIHByb2JsZW1zIGNvbXBhcmluZyB2YWx1ZXNcbiAgICAgIGlmICh2YWx1ZSAmJiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsKSB7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBvbkF1dG9jb21wbGV0ZUJsdXIoJGV2ZW50KSB7XG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjaygpO1xuICAgIHRoaXMuYmx1ci5lbWl0KHRoaXMudmFsdWUpO1xuICB9XG59XG4iXX0=