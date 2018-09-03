/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input, forwardRef, Output, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DecApiService } from './../../services/api/decora-api.service';
import { map } from 'rxjs/operators';
export const /** @type {?} */ BASE_AUTOCOMPLETE_PROJECT_ENDPOINT = '/legacy/project/search/keyValue';
//  Return an empty function to be used as default trigger functions
const /** @type {?} */ noop = () => {
};
const ɵ0 = noop;
//  Used to extend ngForms functions
export const /** @type {?} */ AUTOCOMPLETE_PROJECT_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DecAutocompleteProjectComponent),
    multi: true
};
export class DecAutocompleteProjectComponent {
    /**
     * @param {?} decoraApi
     */
    constructor(decoraApi) {
        this.decoraApi = decoraApi;
        this.valueAttr = 'key';
        this.name = 'Project autocomplete';
        this.placeholder = 'Project autocomplete';
        this.blur = new EventEmitter();
        this.optionSelected = new EventEmitter();
        this.onTouchedCallback = noop;
        this.onChangeCallback = noop;
        this.customFetchFunction = (textSearch) => {
            const /** @type {?} */ params = {};
            params.textSearch = textSearch;
            this.setEndpointBasedOnCompanyId();
            return this.decoraApi.get(this.endpoint, params)
                .pipe(map(projects => {
                return projects;
            }));
        };
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set companyId(v) {
        if (this._companyId !== v) {
            this._companyId = v;
            this.value = undefined;
            this.endpoint = undefined;
            setTimeout(() => {
                // ensures a digest cicle before reseting the endpoint
                this.setEndpointBasedOnCompanyId();
            }, 0);
        }
    }
    /**
     * @return {?}
     */
    get companyId() {
        return this._companyId;
    }
    /**
     * @return {?}
     */
    get value() {
        return this.innerValue;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set value(v) {
        if (v !== this.innerValue) {
            this.innerValue = v;
            this.onChangeCallback(v);
        }
    }
    /**
     * @param {?} company
     * @return {?}
     */
    labelFn(company) {
        return `${company.value} #${company.key}`;
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
     * @param {?} event
     * @return {?}
     */
    onValueChanged(event) {
        this.value = event.toString();
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        if (value !== null && `${value}` !== `${this.value}`) {
            // convert to string to avoid problems comparing values
            this.value = value;
        }
    }
    /**
     * @return {?}
     */
    setEndpointBasedOnCompanyId() {
        if (this.companyId) {
            this.endpoint = BASE_AUTOCOMPLETE_PROJECT_ENDPOINT + '?companyId=' + this.companyId;
        }
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    onAutocompleteBlur($event) {
        this.onTouchedCallback();
        this.blur.emit(this.value);
    }
}
DecAutocompleteProjectComponent.decorators = [
    { type: Component, args: [{
                selector: 'dec-autocomplete-project',
                template: `<div *ngIf="(endpoint && companyId) else fakeDisabled">
  <dec-autocomplete
  #autocomplete
  [endpoint]="endpoint"
  [labelFn]="labelFn"
  [name]="name"
  [multi]="multi"
  [repeat]="repeat"
  [placeholder]="placeholder"
  [required]="required"
  [valueAttr]="valueAttr"
  [(ngModel)]="value"
  [disabled]="disabled"
  [customFetchFunction]="customFetchFunction"
  (optionSelected)="optionSelected.emit($event)"
  (blur)="blur.emit($event)"></dec-autocomplete>
</div>

<ng-template #fakeDisabled>
  <mat-form-field>
    <input matInput
    [attr.aria-label]="name"
    [name]="name"
    [required]="required"
    [disabled]="true"
    [placeholder]="placeholder">
  </mat-form-field>
</ng-template>

`,
                styles: [],
                providers: [AUTOCOMPLETE_PROJECT_CONTROL_VALUE_ACCESSOR]
            },] },
];
/** @nocollapse */
DecAutocompleteProjectComponent.ctorParameters = () => [
    { type: DecApiService }
];
DecAutocompleteProjectComponent.propDecorators = {
    companyId: [{ type: Input }],
    disabled: [{ type: Input }],
    required: [{ type: Input }],
    name: [{ type: Input }],
    placeholder: [{ type: Input }],
    multi: [{ type: Input }],
    repeat: [{ type: Input }],
    blur: [{ type: Output }],
    optionSelected: [{ type: Output }]
};
function DecAutocompleteProjectComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    DecAutocompleteProjectComponent.prototype.endpoint;
    /** @type {?} */
    DecAutocompleteProjectComponent.prototype.valueAttr;
    /** @type {?} */
    DecAutocompleteProjectComponent.prototype.disabled;
    /** @type {?} */
    DecAutocompleteProjectComponent.prototype.required;
    /** @type {?} */
    DecAutocompleteProjectComponent.prototype.name;
    /** @type {?} */
    DecAutocompleteProjectComponent.prototype.placeholder;
    /** @type {?} */
    DecAutocompleteProjectComponent.prototype.multi;
    /** @type {?} */
    DecAutocompleteProjectComponent.prototype.repeat;
    /** @type {?} */
    DecAutocompleteProjectComponent.prototype.blur;
    /** @type {?} */
    DecAutocompleteProjectComponent.prototype.optionSelected;
    /** @type {?} */
    DecAutocompleteProjectComponent.prototype._companyId;
    /** @type {?} */
    DecAutocompleteProjectComponent.prototype.innerValue;
    /** @type {?} */
    DecAutocompleteProjectComponent.prototype.onTouchedCallback;
    /** @type {?} */
    DecAutocompleteProjectComponent.prototype.onChangeCallback;
    /** @type {?} */
    DecAutocompleteProjectComponent.prototype.customFetchFunction;
    /** @type {?} */
    DecAutocompleteProjectComponent.prototype.decoraApi;
}
export { ɵ0 };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b2NvbXBsZXRlLXByb2plY3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL2F1dG9jb21wbGV0ZS1wcm9qZWN0L2F1dG9jb21wbGV0ZS1wcm9qZWN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkYsT0FBTyxFQUFFLGlCQUFpQixFQUF3QixNQUFNLGdCQUFnQixDQUFDO0FBRXpFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUN4RSxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFckMsTUFBTSxDQUFDLHVCQUFNLGtDQUFrQyxHQUFHLGlDQUFpQyxDQUFDOztBQUdwRix1QkFBTSxJQUFJLEdBQUcsR0FBRyxFQUFFO0NBQ2pCLENBQUM7OztBQUdGLE1BQU0sQ0FBQyx1QkFBTSwyQ0FBMkMsR0FBUTtJQUM5RCxPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsK0JBQStCLENBQUM7SUFDOUQsS0FBSyxFQUFFLElBQUk7Q0FDWixDQUFDO0FBcUNGLE1BQU07Ozs7SUFtREosWUFBb0IsU0FBd0I7UUFBeEIsY0FBUyxHQUFULFNBQVMsQ0FBZTt5QkEvQ2hDLEtBQUs7b0JBc0JELHNCQUFzQjsyQkFFZixzQkFBc0I7b0JBTVQsSUFBSSxZQUFZLEVBQU87OEJBRWIsSUFBSSxZQUFZLEVBQU87aUNBVzdCLElBQUk7Z0NBRUMsSUFBSTttQ0F3RDNCLENBQUMsVUFBVSxFQUFtQixFQUFFO1lBQ3BELHVCQUFNLE1BQU0sR0FBUSxFQUFFLENBQUM7WUFDdkIsTUFBTSxDQUFDLFVBQVUs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S0FBSztvQkFFTCxLQUFLO3FCQUVMLEtBQUs7bUJBRUwsTUFBTTs2QkFFTixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgZm9yd2FyZFJlZiwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5HX1ZBTFVFX0FDQ0VTU09SLCBDb250cm9sVmFsdWVBY2Nlc3NvciB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IERlY0FwaVNlcnZpY2UgfSBmcm9tICcuLy4uLy4uL3NlcnZpY2VzL2FwaS9kZWNvcmEtYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5leHBvcnQgY29uc3QgQkFTRV9BVVRPQ09NUExFVEVfUFJPSkVDVF9FTkRQT0lOVCA9ICcvbGVnYWN5L3Byb2plY3Qvc2VhcmNoL2tleVZhbHVlJztcblxuLy8gIFJldHVybiBhbiBlbXB0eSBmdW5jdGlvbiB0byBiZSB1c2VkIGFzIGRlZmF1bHQgdHJpZ2dlciBmdW5jdGlvbnNcbmNvbnN0IG5vb3AgPSAoKSA9PiB7XG59O1xuXG4vLyAgVXNlZCB0byBleHRlbmQgbmdGb3JtcyBmdW5jdGlvbnNcbmV4cG9ydCBjb25zdCBBVVRPQ09NUExFVEVfUFJPSkVDVF9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBEZWNBdXRvY29tcGxldGVQcm9qZWN0Q29tcG9uZW50KSxcbiAgbXVsdGk6IHRydWVcbn07XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1hdXRvY29tcGxldGUtcHJvamVjdCcsXG4gIHRlbXBsYXRlOiBgPGRpdiAqbmdJZj1cIihlbmRwb2ludCAmJiBjb21wYW55SWQpIGVsc2UgZmFrZURpc2FibGVkXCI+XG4gIDxkZWMtYXV0b2NvbXBsZXRlXG4gICNhdXRvY29tcGxldGVcbiAgW2VuZHBvaW50XT1cImVuZHBvaW50XCJcbiAgW2xhYmVsRm5dPVwibGFiZWxGblwiXG4gIFtuYW1lXT1cIm5hbWVcIlxuICBbbXVsdGldPVwibXVsdGlcIlxuICBbcmVwZWF0XT1cInJlcGVhdFwiXG4gIFtwbGFjZWhvbGRlcl09XCJwbGFjZWhvbGRlclwiXG4gIFtyZXF1aXJlZF09XCJyZXF1aXJlZFwiXG4gIFt2YWx1ZUF0dHJdPVwidmFsdWVBdHRyXCJcbiAgWyhuZ01vZGVsKV09XCJ2YWx1ZVwiXG4gIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiXG4gIFtjdXN0b21GZXRjaEZ1bmN0aW9uXT1cImN1c3RvbUZldGNoRnVuY3Rpb25cIlxuICAob3B0aW9uU2VsZWN0ZWQpPVwib3B0aW9uU2VsZWN0ZWQuZW1pdCgkZXZlbnQpXCJcbiAgKGJsdXIpPVwiYmx1ci5lbWl0KCRldmVudClcIj48L2RlYy1hdXRvY29tcGxldGU+XG48L2Rpdj5cblxuPG5nLXRlbXBsYXRlICNmYWtlRGlzYWJsZWQ+XG4gIDxtYXQtZm9ybS1maWVsZD5cbiAgICA8aW5wdXQgbWF0SW5wdXRcbiAgICBbYXR0ci5hcmlhLWxhYmVsXT1cIm5hbWVcIlxuICAgIFtuYW1lXT1cIm5hbWVcIlxuICAgIFtyZXF1aXJlZF09XCJyZXF1aXJlZFwiXG4gICAgW2Rpc2FibGVkXT1cInRydWVcIlxuICAgIFtwbGFjZWhvbGRlcl09XCJwbGFjZWhvbGRlclwiPlxuICA8L21hdC1mb3JtLWZpZWxkPlxuPC9uZy10ZW1wbGF0ZT5cblxuYCxcbiAgc3R5bGVzOiBbXSxcbiAgcHJvdmlkZXJzOiBbQVVUT0NPTVBMRVRFX1BST0pFQ1RfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUl1cbn0pXG5leHBvcnQgY2xhc3MgRGVjQXV0b2NvbXBsZXRlUHJvamVjdENvbXBvbmVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcblxuICBlbmRwb2ludDtcblxuICB2YWx1ZUF0dHIgPSAna2V5JztcblxuICBASW5wdXQoKVxuICBzZXQgY29tcGFueUlkKHY6IHN0cmluZykge1xuICAgIGlmICh0aGlzLl9jb21wYW55SWQgIT09IHYpIHtcbiAgICAgIHRoaXMuX2NvbXBhbnlJZCA9IHY7XG4gICAgICB0aGlzLnZhbHVlID0gdW5kZWZpbmVkO1xuICAgICAgdGhpcy5lbmRwb2ludCA9IHVuZGVmaW5lZDtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4geyAvLyBlbnN1cmVzIGEgZGlnZXN0IGNpY2xlIGJlZm9yZSByZXNldGluZyB0aGUgZW5kcG9pbnRcbiAgICAgICAgdGhpcy5zZXRFbmRwb2ludEJhc2VkT25Db21wYW55SWQoKTtcbiAgICAgIH0sIDApO1xuICAgIH1cbiAgfVxuXG4gIGdldCBjb21wYW55SWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbXBhbnlJZDtcbiAgfVxuXG4gIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpIHJlcXVpcmVkOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpIG5hbWUgPSAnUHJvamVjdCBhdXRvY29tcGxldGUnO1xuXG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyID0gJ1Byb2plY3QgYXV0b2NvbXBsZXRlJztcblxuICBASW5wdXQoKSBtdWx0aTogYm9vbGVhbjtcblxuICBASW5wdXQoKSByZXBlYXQ6IGJvb2xlYW47XG5cbiAgQE91dHB1dCgpIGJsdXI6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgQE91dHB1dCgpIG9wdGlvblNlbGVjdGVkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIHByaXZhdGUgX2NvbXBhbnlJZDogc3RyaW5nO1xuXG4gIC8qXG4gICoqIG5nTW9kZWwgcHJvcGVydGllXG4gICoqIFVzZWQgdG8gdHdvIHdheSBkYXRhIGJpbmQgdXNpbmcgWyhuZ01vZGVsKV1cbiAgKi9cbiAgLy8gIFRoZSBpbnRlcm5hbCBkYXRhIG1vZGVsXG4gIHByaXZhdGUgaW5uZXJWYWx1ZTogYW55O1xuICAvLyAgUGxhY2Vob2xkZXJzIGZvciB0aGUgY2FsbGJhY2tzIHdoaWNoIGFyZSBsYXRlciBwcm92aWRlZCBieSB0aGUgQ29udHJvbCBWYWx1ZSBBY2Nlc3NvclxuICBwcml2YXRlIG9uVG91Y2hlZENhbGxiYWNrOiAoKSA9PiB2b2lkID0gbm9vcDtcbiAgLy8gIFBsYWNlaG9sZGVycyBmb3IgdGhlIGNhbGxiYWNrcyB3aGljaCBhcmUgbGF0ZXIgcHJvdmlkZWQgYnkgdGhlIENvbnRyb2wgVmFsdWUgQWNjZXNzb3JcbiAgcHJpdmF0ZSBvbkNoYW5nZUNhbGxiYWNrOiAoXzogYW55KSA9PiB2b2lkID0gbm9vcDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRlY29yYUFwaTogRGVjQXBpU2VydmljZSkgeyB9XG5cbiAgLypcbiAgKiogbmdNb2RlbCBBUElcbiAgKi9cblxuICAvLyBHZXQgYWNjZXNzb3JcbiAgZ2V0IHZhbHVlKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuaW5uZXJWYWx1ZTtcbiAgfVxuXG4gIC8vIFNldCBhY2Nlc3NvciBpbmNsdWRpbmcgY2FsbCB0aGUgb25jaGFuZ2UgY2FsbGJhY2tcbiAgc2V0IHZhbHVlKHY6IGFueSkge1xuICAgIGlmICh2ICE9PSB0aGlzLmlubmVyVmFsdWUpIHtcbiAgICAgIHRoaXMuaW5uZXJWYWx1ZSA9IHY7XG4gICAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sodik7XG4gICAgfVxuICB9XG5cbiAgbGFiZWxGbihjb21wYW55KSB7XG4gICAgcmV0dXJuIGAke2NvbXBhbnkudmFsdWV9ICMke2NvbXBhbnkua2V5fWA7XG4gIH1cblxuICAvLyBGcm9tIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGludGVyZmFjZVxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIC8vIEZyb20gQ29udHJvbFZhbHVlQWNjZXNzb3IgaW50ZXJmYWNlXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrID0gZm47XG4gIH1cblxuICBvblZhbHVlQ2hhbmdlZChldmVudDogYW55KSB7XG4gICAgdGhpcy52YWx1ZSA9IGV2ZW50LnRvU3RyaW5nKCk7XG4gIH1cblxuICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICBpZiAodmFsdWUgIT09IG51bGwgJiYgYCR7dmFsdWV9YCAhPT0gYCR7dGhpcy52YWx1ZX1gKSB7IC8vIGNvbnZlcnQgdG8gc3RyaW5nIHRvIGF2b2lkIHByb2JsZW1zIGNvbXBhcmluZyB2YWx1ZXNcbiAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICBzZXRFbmRwb2ludEJhc2VkT25Db21wYW55SWQoKSB7XG4gICAgaWYgKHRoaXMuY29tcGFueUlkKSB7XG4gICAgICB0aGlzLmVuZHBvaW50ID0gQkFTRV9BVVRPQ09NUExFVEVfUFJPSkVDVF9FTkRQT0lOVCArICc/Y29tcGFueUlkPScgKyB0aGlzLmNvbXBhbnlJZDtcbiAgICB9XG4gIH1cblxuICBvbkF1dG9jb21wbGV0ZUJsdXIoJGV2ZW50KSB7XG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjaygpO1xuICAgIHRoaXMuYmx1ci5lbWl0KHRoaXMudmFsdWUpO1xuICB9XG5cbiAgY3VzdG9tRmV0Y2hGdW5jdGlvbiA9ICh0ZXh0U2VhcmNoKTogT2JzZXJ2YWJsZTxhbnk+ID0+IHtcbiAgICBjb25zdCBwYXJhbXM6IGFueSA9IHt9O1xuICAgIHBhcmFtcy50ZXh0U2VhcmNoID0gdGV4dFNlYXJjaDtcbiAgICB0aGlzLnNldEVuZHBvaW50QmFzZWRPbkNvbXBhbnlJZCgpO1xuICAgIHJldHVybiB0aGlzLmRlY29yYUFwaS5nZXQodGhpcy5lbmRwb2ludCwgcGFyYW1zKVxuICAgIC5waXBlKFxuICAgICAgbWFwKHByb2plY3RzID0+IHtcbiAgICAgICAgcmV0dXJuIHByb2plY3RzO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbn1cbiJdfQ==