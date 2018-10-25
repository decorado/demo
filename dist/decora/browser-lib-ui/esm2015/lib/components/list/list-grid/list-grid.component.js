/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, ContentChild, TemplateRef, Output, EventEmitter, Input } from '@angular/core';
export class DecListGridComponent {
    constructor() {
        this.selected = [];
        this.itemWidth = '280px';
        this.itemGap = '8px';
        this.rowClick = new EventEmitter();
        this._rows = [];
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set rows(v) {
        if (this._rows !== v) {
            this._rows = v;
        }
    }
    /**
     * @return {?}
     */
    get rows() {
        return this._rows;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
    /**
     * @param {?} event
     * @param {?} item
     * @param {?} list
     * @param {?} index
     * @return {?}
     */
    onItemClick(event, item, list, index) {
        this.rowClick.emit({ event, item, list, index });
    }
}
DecListGridComponent.decorators = [
    { type: Component, args: [{
                selector: 'dec-list-grid',
                template: `<div fxLayout="row wrap" [fxLayoutGap]="itemGap" >
  <div *ngFor="let row of rows; let i = index;" (click)="onItemClick($event, row, rows, i)" [fxFlex]="itemWidth">
    <div [ngStyle]="{margin: itemGap}">
      <ng-container
        [ngTemplateOutlet]="templateRef"
        [ngTemplateOutletContext]="{row: row || {}, list: rows || [], index: i}"
      ></ng-container>
    </div>
  </div>
</div>
`,
                styles: [``]
            },] },
];
/** @nocollapse */
DecListGridComponent.ctorParameters = () => [];
DecListGridComponent.propDecorators = {
    templateRef: [{ type: ContentChild, args: [TemplateRef,] }],
    itemWidth: [{ type: Input }],
    itemGap: [{ type: Input }],
    rowClick: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    DecListGridComponent.prototype.selected;
    /** @type {?} */
    DecListGridComponent.prototype.templateRef;
    /** @type {?} */
    DecListGridComponent.prototype.itemWidth;
    /** @type {?} */
    DecListGridComponent.prototype.itemGap;
    /** @type {?} */
    DecListGridComponent.prototype.rowClick;
    /** @type {?} */
    DecListGridComponent.prototype._rows;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1ncmlkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9saXN0L2xpc3QtZ3JpZC9saXN0LWdyaWQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLFlBQVksRUFBRSxXQUFXLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFpQjFHLE1BQU07SUFjSjt3QkFaa0IsRUFBRTt5QkFJQyxPQUFPO3VCQUVULEtBQUs7d0JBRWdCLElBQUksWUFBWSxFQUFPO3FCQUUvQyxFQUFFO0tBRUQ7Ozs7O0lBRWpCLElBQUksSUFBSSxDQUFDLENBQU07UUFDYixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckIsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7U0FDaEI7S0FDRjs7OztJQUVELElBQUksSUFBSTtRQUNOLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO0tBQ25COzs7O0lBRUQsUUFBUTtLQUNQOzs7Ozs7OztJQUVELFdBQVcsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLO1FBRWxDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFDLENBQUMsQ0FBQztLQUVoRDs7O1lBaERGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsZUFBZTtnQkFDekIsUUFBUSxFQUFFOzs7Ozs7Ozs7O0NBVVg7Z0JBQ0MsTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDO2FBQ2I7Ozs7OzBCQUtFLFlBQVksU0FBQyxXQUFXO3dCQUV4QixLQUFLO3NCQUVMLEtBQUs7dUJBRUwsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBDb250ZW50Q2hpbGQsIFRlbXBsYXRlUmVmLCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLWxpc3QtZ3JpZCcsXG4gIHRlbXBsYXRlOiBgPGRpdiBmeExheW91dD1cInJvdyB3cmFwXCIgW2Z4TGF5b3V0R2FwXT1cIml0ZW1HYXBcIiA+XG4gIDxkaXYgKm5nRm9yPVwibGV0IHJvdyBvZiByb3dzOyBsZXQgaSA9IGluZGV4O1wiIChjbGljayk9XCJvbkl0ZW1DbGljaygkZXZlbnQsIHJvdywgcm93cywgaSlcIiBbZnhGbGV4XT1cIml0ZW1XaWR0aFwiPlxuICAgIDxkaXYgW25nU3R5bGVdPVwie21hcmdpbjogaXRlbUdhcH1cIj5cbiAgICAgIDxuZy1jb250YWluZXJcbiAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwidGVtcGxhdGVSZWZcIlxuICAgICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwie3Jvdzogcm93IHx8IHt9LCBsaXN0OiByb3dzIHx8IFtdLCBpbmRleDogaX1cIlxuICAgICAgPjwvbmctY29udGFpbmVyPlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvZGl2PlxuYCxcbiAgc3R5bGVzOiBbYGBdXG59KVxuZXhwb3J0IGNsYXNzIERlY0xpc3RHcmlkQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBzZWxlY3RlZDogYW55W10gPSBbXTsgLy8gZnJvbSBsaXN0IGNvbXBvbmVudFxuXG4gIEBDb250ZW50Q2hpbGQoVGVtcGxhdGVSZWYpIHRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIEBJbnB1dCgpIGl0ZW1XaWR0aCA9ICcyODBweCc7XG5cbiAgQElucHV0KCkgaXRlbUdhcCA9ICc4cHgnO1xuXG4gIEBPdXRwdXQoKSByb3dDbGljazogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBwcml2YXRlIF9yb3dzID0gW107XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBzZXQgcm93cyh2OiBhbnkpIHtcbiAgICBpZiAodGhpcy5fcm93cyAhPT0gdikge1xuICAgICAgdGhpcy5fcm93cyA9IHY7XG4gICAgfVxuICB9XG5cbiAgZ2V0IHJvd3MoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3Jvd3M7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG4gIG9uSXRlbUNsaWNrKGV2ZW50LCBpdGVtLCBsaXN0LCBpbmRleCkge1xuXG4gICAgdGhpcy5yb3dDbGljay5lbWl0KHtldmVudCwgaXRlbSwgbGlzdCwgaW5kZXh9KTtcblxuICB9XG5cbn1cbiJdfQ==