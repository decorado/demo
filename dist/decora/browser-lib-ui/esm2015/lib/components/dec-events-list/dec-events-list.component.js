/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, ContentChildren, QueryList } from '@angular/core';
import { DecEventsListEventComponent } from './dec-events-list-event/dec-events-list-event.component';
export class DecEventsListComponent {
    constructor() { }
}
DecEventsListComponent.decorators = [
    { type: Component, args: [{
                selector: 'dec-events-list',
                template: `<div fxLayout="column">
  <div fxFlex *ngFor="let event of events">
    <div fxLayout="row" fxLayoutGap="8px">
      <div fxFlex="72px" class="text-right">{{ event.label }}</div>
      <div fxFlex="80px">
        <strong>
          <ng-container [ngTemplateOutlet]="event.contentTemplate"></ng-container>
        </strong>
      </div>
    </div>
  </div>
</div>
`,
                styles: [``]
            },] },
];
/** @nocollapse */
DecEventsListComponent.ctorParameters = () => [];
DecEventsListComponent.propDecorators = {
    events: [{ type: ContentChildren, args: [DecEventsListEventComponent,] }]
};
if (false) {
    /** @type {?} */
    DecEventsListComponent.prototype.events;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLWV2ZW50cy1saXN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9kZWMtZXZlbnRzLWxpc3QvZGVjLWV2ZW50cy1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxlQUFlLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3RFLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLHlEQUF5RCxDQUFDO0FBbUJ0RyxNQUFNO0lBSUosaUJBQWlCOzs7WUFyQmxCLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsaUJBQWlCO2dCQUMzQixRQUFRLEVBQUU7Ozs7Ozs7Ozs7OztDQVlYO2dCQUNDLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQzthQUNiOzs7OztxQkFHRSxlQUFlLFNBQUMsMkJBQTJCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBDb250ZW50Q2hpbGRyZW4sIFF1ZXJ5TGlzdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGVjRXZlbnRzTGlzdEV2ZW50Q29tcG9uZW50IH0gZnJvbSAnLi9kZWMtZXZlbnRzLWxpc3QtZXZlbnQvZGVjLWV2ZW50cy1saXN0LWV2ZW50LmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1ldmVudHMtbGlzdCcsXG4gIHRlbXBsYXRlOiBgPGRpdiBmeExheW91dD1cImNvbHVtblwiPlxuICA8ZGl2IGZ4RmxleCAqbmdGb3I9XCJsZXQgZXZlbnQgb2YgZXZlbnRzXCI+XG4gICAgPGRpdiBmeExheW91dD1cInJvd1wiIGZ4TGF5b3V0R2FwPVwiOHB4XCI+XG4gICAgICA8ZGl2IGZ4RmxleD1cIjcycHhcIiBjbGFzcz1cInRleHQtcmlnaHRcIj57eyBldmVudC5sYWJlbCB9fTwvZGl2PlxuICAgICAgPGRpdiBmeEZsZXg9XCI4MHB4XCI+XG4gICAgICAgIDxzdHJvbmc+XG4gICAgICAgICAgPG5nLWNvbnRhaW5lciBbbmdUZW1wbGF0ZU91dGxldF09XCJldmVudC5jb250ZW50VGVtcGxhdGVcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9zdHJvbmc+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L2Rpdj5cbmAsXG4gIHN0eWxlczogW2BgXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNFdmVudHNMaXN0Q29tcG9uZW50IHtcblxuICBAQ29udGVudENoaWxkcmVuKERlY0V2ZW50c0xpc3RFdmVudENvbXBvbmVudCkgZXZlbnRzOiBRdWVyeUxpc3Q8RGVjRXZlbnRzTGlzdEV2ZW50Q29tcG9uZW50PjtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG59XG4iXX0=