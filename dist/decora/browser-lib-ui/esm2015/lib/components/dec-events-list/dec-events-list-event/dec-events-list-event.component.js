/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input, ViewChild, TemplateRef } from '@angular/core';
export class DecEventsListEventComponent {
    constructor() { }
}
DecEventsListEventComponent.decorators = [
    { type: Component, args: [{
                selector: 'dec-events-list-event',
                template: `<ng-template #contentTemplate>
  <span #ref>
    <ng-content></ng-content>
  </span>
  <span *ngIf="!ref.innerHTML.trim()">
    -
  </span>
</ng-template>
`,
                styles: [``]
            },] },
];
/** @nocollapse */
DecEventsListEventComponent.ctorParameters = () => [];
DecEventsListEventComponent.propDecorators = {
    label: [{ type: Input }],
    contentTemplate: [{ type: ViewChild, args: ['contentTemplate',] }]
};
if (false) {
    /** @type {?} */
    DecEventsListEventComponent.prototype.label;
    /** @type {?} */
    DecEventsListEventComponent.prototype.contentTemplate;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLWV2ZW50cy1saXN0LWV2ZW50LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9kZWMtZXZlbnRzLWxpc3QvZGVjLWV2ZW50cy1saXN0LWV2ZW50L2RlYy1ldmVudHMtbGlzdC1ldmVudC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFlekUsTUFBTTtJQU1KLGlCQUFpQjs7O1lBbkJsQixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHVCQUF1QjtnQkFDakMsUUFBUSxFQUFFOzs7Ozs7OztDQVFYO2dCQUNDLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQzthQUNiOzs7OztvQkFHRSxLQUFLOzhCQUVMLFNBQVMsU0FBQyxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBWaWV3Q2hpbGQsIFRlbXBsYXRlUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1ldmVudHMtbGlzdC1ldmVudCcsXG4gIHRlbXBsYXRlOiBgPG5nLXRlbXBsYXRlICNjb250ZW50VGVtcGxhdGU+XG4gIDxzcGFuICNyZWY+XG4gICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICA8L3NwYW4+XG4gIDxzcGFuICpuZ0lmPVwiIXJlZi5pbm5lckhUTUwudHJpbSgpXCI+XG4gICAgLVxuICA8L3NwYW4+XG48L25nLXRlbXBsYXRlPlxuYCxcbiAgc3R5bGVzOiBbYGBdXG59KVxuZXhwb3J0IGNsYXNzIERlY0V2ZW50c0xpc3RFdmVudENvbXBvbmVudCB7XG5cbiAgQElucHV0KCkgbGFiZWw6IHN0cmluZztcblxuICBAVmlld0NoaWxkKCdjb250ZW50VGVtcGxhdGUnKSBjb250ZW50VGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxufVxuIl19