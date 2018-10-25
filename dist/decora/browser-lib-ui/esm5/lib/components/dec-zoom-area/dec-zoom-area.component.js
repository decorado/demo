/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { DecMarksComponent } from './../dec-marks/dec-marks.component';
var DecZoomAreaComponent = /** @class */ (function () {
    function DecZoomAreaComponent() {
        this.save = new EventEmitter();
        this.cancel = new EventEmitter();
        this.referenceQaMode = false;
        this.renderMarkdons = [];
    }
    Object.defineProperty(DecZoomAreaComponent.prototype, "reference", {
        get: /**
         * @return {?}
         */
        function () {
            return this._reference;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            if (v) {
                this._reference = v;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DecZoomAreaComponent.prototype, "render", {
        get: /**
         * @return {?}
         */
        function () {
            return this._render;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            if (v) {
                this._render = v;
                this.renderMarkdons.push(this._render);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    DecZoomAreaComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    /**
     * @return {?}
     */
    DecZoomAreaComponent.prototype.onSave = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var saveObj = {
            coordinates: [],
            id: this.parentId,
            descripition: this.descripition,
            renderShot: this.renderZoom.marker,
            referenceShot: this.referenceZoom.marker
        };
        console.log(saveObj);
        this.save.emit(saveObj);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    DecZoomAreaComponent.prototype.onLinkTag = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.referenceQaMode = true;
        this.commentIndex = event.id;
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    DecZoomAreaComponent.prototype.onReferenceQa = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        this.referenceQaMode = false;
    };
    /**
     * @return {?}
     */
    DecZoomAreaComponent.prototype.onCancel = /**
     * @return {?}
     */
    function () {
        this.cancel.emit();
    };
    DecZoomAreaComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dec-zoom-area',
                    template: "<div class=\"main-container\" fxLayout=\"column\" fxLayoutGap=\"16px\">\n  <div fxLayout=\"row\" fxLayoutAlign=\"start start\">\n\n    <div fxFlex=\"50\" class=\"zoom-container\" fxLayout=\"column\" fxLayoutGap=\"16px\">\n      <dec-marks class=\"zoom-container\" #referenceZoom [noComments]=\"true\" [marker]=\"reference\" [qaMode]=\"referenceQaMode\" [parentId]=\"parentId\"\n        (referenceQa)=\"onReferenceQa($event)\" [comentIndex]=\"commentIndex\" [zoomScale]=\"reference?.zoomScale\" [zoomPosition]=\"reference?.position\">\n      </dec-marks>\n      <div class=\"fake-div\">\n\n      </div>\n      <div div fxLayout=\"row\" fxLayoutAlign=\"start center\">\n        <h2 class=\"dec-color-grey\">\n          <dec-icon font=\"mat\">description</dec-icon>{{ 'label.observations' | translate }}\n        </h2>\n      </div>\n      <textarea [(ngModel)]=\"descripition\" class=\"text-area\"></textarea>\n    </div>\n\n\n    <div fxFlex=\"50\" fxLayout=\"column\" fxLayoutGap=\"16px\" class=\"zoom-container\">\n      <dec-marks #renderZoom [noComments]=\"false\" [marker]=\"render\" [parentId]=\"parentId\" [qaMode]=\"true\" (link)=\"onLinkTag($event)\"\n        [zoomScale]=\"render?.zoomScale\" [zoomPosition]=\"render?.position\">\n      </dec-marks>\n\n      <div fxLayout=\"row\" fxLayoutAlign=\"end center\" fxLayoutGap=\"16px\" class=\"fake-div\">\n        <button mat-button (click)=\"onCancel()\"> {{ 'label.cancel' | translate }} </button>\n        <button mat-flat-button color=\"primary\" (click)=\"onSave()\"> {{ 'label.save' | translate }} </button>\n      </div>\n\n      <div class=\"container-comments\" fxLayout=\"column\" fxLayoutGap=\"16px\">\n        <div fxLayout=\"row\" fxLayoutGap=\"8px\">\n          <h2 class=\"dec-color-grey\">\n            <dec-icon font=\"mat\">bookmarks</dec-icon>Tags\n          </h2>\n        </div>\n        <dec-markdowns-comment [parentId]=\"parentId\" [renders]=\"renderMarkdons\"></dec-markdowns-comment>\n      </div>\n    </div>\n  </div>\n</div>",
                    styles: [".text-area{width:95%;height:185px;padding:15px}.zoom-container{width:100%}.main-container{position:relative;background-color:#fff}.button-save{position:absolute;z-index:5;right:0;top:45%}.fake-div{width:100%;height:36px}.container-comments{padding-left:20px}"]
                },] },
    ];
    /** @nocollapse */
    DecZoomAreaComponent.ctorParameters = function () { return []; };
    DecZoomAreaComponent.propDecorators = {
        reference: [{ type: Input }],
        render: [{ type: Input }],
        save: [{ type: Output }],
        cancel: [{ type: Output }],
        parentId: [{ type: Input }],
        renderZoom: [{ type: ViewChild, args: ['renderZoom',] }],
        referenceZoom: [{ type: ViewChild, args: ['referenceZoom',] }]
    };
    return DecZoomAreaComponent;
}());
export { DecZoomAreaComponent };
if (false) {
    /** @type {?} */
    DecZoomAreaComponent.prototype.save;
    /** @type {?} */
    DecZoomAreaComponent.prototype.cancel;
    /** @type {?} */
    DecZoomAreaComponent.prototype._reference;
    /** @type {?} */
    DecZoomAreaComponent.prototype._render;
    /** @type {?} */
    DecZoomAreaComponent.prototype.parentId;
    /** @type {?} */
    DecZoomAreaComponent.prototype.commentIndex;
    /** @type {?} */
    DecZoomAreaComponent.prototype.referenceQaMode;
    /** @type {?} */
    DecZoomAreaComponent.prototype.descripition;
    /** @type {?} */
    DecZoomAreaComponent.prototype.renderMarkdons;
    /** @type {?} */
    DecZoomAreaComponent.prototype.renderZoom;
    /** @type {?} */
    DecZoomAreaComponent.prototype.referenceZoom;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLXpvb20tYXJlYS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvZGVjLXpvb20tYXJlYS9kZWMtem9vbS1hcmVhLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUYsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7O0lBMkZyRTtvQkFwQmlCLElBQUksWUFBWSxFQUFFO3NCQUVoQixJQUFJLFlBQVksRUFBRTsrQkFRbkIsS0FBSzs4QkFJTixFQUFFO0tBTUY7SUEzQ2pCLHNCQUNJLDJDQUFTOzs7O1FBTWI7WUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztTQUN4Qjs7Ozs7UUFURCxVQUNjLENBQUM7WUFDYixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNOLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO2FBQ3JCO1NBQ0Y7OztPQUFBO0lBTUQsc0JBQ0ksd0NBQU07Ozs7UUFPVjtZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1NBQ3JCOzs7OztRQVZELFVBQ1csQ0FBQztZQUNWLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ04sSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7Z0JBQ2pCLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUN4QztTQUNGOzs7T0FBQTs7OztJQTRCRCx1Q0FBUTs7O0lBQVI7S0FDQzs7OztJQUVELHFDQUFNOzs7SUFBTjs7UUFDRSxJQUFNLE9BQU8sR0FBRztZQUNkLFdBQVcsRUFBRSxFQUFFO1lBQ2YsRUFBRSxFQUFFLElBQUksQ0FBQyxRQUFRO1lBQ2pCLFlBQVksRUFBRSxJQUFJLENBQUMsWUFBWTtZQUMvQixVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNO1lBQ2xDLGFBQWEsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU07U0FDekMsQ0FBQTtRQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDckIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDekI7Ozs7O0lBRUQsd0NBQVM7Ozs7SUFBVCxVQUFVLEtBQUs7UUFDYixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztRQUM1QixJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQyxFQUFFLENBQUM7S0FDOUI7Ozs7O0lBRUQsNENBQWE7Ozs7SUFBYixVQUFjLE1BQU07UUFDbEIsSUFBSSxDQUFDLGVBQWUsR0FBRyxLQUFLLENBQUM7S0FDOUI7Ozs7SUFFRCx1Q0FBUTs7O0lBQVI7UUFDRSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO0tBQ3BCOztnQkFySEYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxlQUFlO29CQUN6QixRQUFRLEVBQUUsMDlEQXVDTDtvQkFDTCxNQUFNLEVBQUUsQ0FBQyxvUUFBb1EsQ0FBQztpQkFDL1E7Ozs7OzRCQUdFLEtBQUs7eUJBV0wsS0FBSzt1QkFZTCxNQUFNO3lCQUVOLE1BQU07MkJBS04sS0FBSzs2QkFTTCxTQUFTLFNBQUMsWUFBWTtnQ0FFdEIsU0FBUyxTQUFDLGVBQWU7OytCQTFGNUI7O1NBK0NhLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgVmlld0NoaWxkLCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGVjTWFya3NDb21wb25lbnQgfSBmcm9tICcuLy4uL2RlYy1tYXJrcy9kZWMtbWFya3MuY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLXpvb20tYXJlYScsXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cIm1haW4tY29udGFpbmVyXCIgZnhMYXlvdXQ9XCJjb2x1bW5cIiBmeExheW91dEdhcD1cIjE2cHhcIj5cbiAgPGRpdiBmeExheW91dD1cInJvd1wiIGZ4TGF5b3V0QWxpZ249XCJzdGFydCBzdGFydFwiPlxuXG4gICAgPGRpdiBmeEZsZXg9XCI1MFwiIGNsYXNzPVwiem9vbS1jb250YWluZXJcIiBmeExheW91dD1cImNvbHVtblwiIGZ4TGF5b3V0R2FwPVwiMTZweFwiPlxuICAgICAgPGRlYy1tYXJrcyBjbGFzcz1cInpvb20tY29udGFpbmVyXCIgI3JlZmVyZW5jZVpvb20gW25vQ29tbWVudHNdPVwidHJ1ZVwiIFttYXJrZXJdPVwicmVmZXJlbmNlXCIgW3FhTW9kZV09XCJyZWZlcmVuY2VRYU1vZGVcIiBbcGFyZW50SWRdPVwicGFyZW50SWRcIlxuICAgICAgICAocmVmZXJlbmNlUWEpPVwib25SZWZlcmVuY2VRYSgkZXZlbnQpXCIgW2NvbWVudEluZGV4XT1cImNvbW1lbnRJbmRleFwiIFt6b29tU2NhbGVdPVwicmVmZXJlbmNlPy56b29tU2NhbGVcIiBbem9vbVBvc2l0aW9uXT1cInJlZmVyZW5jZT8ucG9zaXRpb25cIj5cbiAgICAgIDwvZGVjLW1hcmtzPlxuICAgICAgPGRpdiBjbGFzcz1cImZha2UtZGl2XCI+XG5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBkaXYgZnhMYXlvdXQ9XCJyb3dcIiBmeExheW91dEFsaWduPVwic3RhcnQgY2VudGVyXCI+XG4gICAgICAgIDxoMiBjbGFzcz1cImRlYy1jb2xvci1ncmV5XCI+XG4gICAgICAgICAgPGRlYy1pY29uIGZvbnQ9XCJtYXRcIj5kZXNjcmlwdGlvbjwvZGVjLWljb24+e3sgJ2xhYmVsLm9ic2VydmF0aW9ucycgfCB0cmFuc2xhdGUgfX1cbiAgICAgICAgPC9oMj5cbiAgICAgIDwvZGl2PlxuICAgICAgPHRleHRhcmVhIFsobmdNb2RlbCldPVwiZGVzY3JpcGl0aW9uXCIgY2xhc3M9XCJ0ZXh0LWFyZWFcIj48L3RleHRhcmVhPlxuICAgIDwvZGl2PlxuXG5cbiAgICA8ZGl2IGZ4RmxleD1cIjUwXCIgZnhMYXlvdXQ9XCJjb2x1bW5cIiBmeExheW91dEdhcD1cIjE2cHhcIiBjbGFzcz1cInpvb20tY29udGFpbmVyXCI+XG4gICAgICA8ZGVjLW1hcmtzICNyZW5kZXJab29tIFtub0NvbW1lbnRzXT1cImZhbHNlXCIgW21hcmtlcl09XCJyZW5kZXJcIiBbcGFyZW50SWRdPVwicGFyZW50SWRcIiBbcWFNb2RlXT1cInRydWVcIiAobGluayk9XCJvbkxpbmtUYWcoJGV2ZW50KVwiXG4gICAgICAgIFt6b29tU2NhbGVdPVwicmVuZGVyPy56b29tU2NhbGVcIiBbem9vbVBvc2l0aW9uXT1cInJlbmRlcj8ucG9zaXRpb25cIj5cbiAgICAgIDwvZGVjLW1hcmtzPlxuXG4gICAgICA8ZGl2IGZ4TGF5b3V0PVwicm93XCIgZnhMYXlvdXRBbGlnbj1cImVuZCBjZW50ZXJcIiBmeExheW91dEdhcD1cIjE2cHhcIiBjbGFzcz1cImZha2UtZGl2XCI+XG4gICAgICAgIDxidXR0b24gbWF0LWJ1dHRvbiAoY2xpY2spPVwib25DYW5jZWwoKVwiPiB7eyAnbGFiZWwuY2FuY2VsJyB8IHRyYW5zbGF0ZSB9fSA8L2J1dHRvbj5cbiAgICAgICAgPGJ1dHRvbiBtYXQtZmxhdC1idXR0b24gY29sb3I9XCJwcmltYXJ5XCIgKGNsaWNrKT1cIm9uU2F2ZSgpXCI+IHt7ICdsYWJlbC5zYXZlJyB8IHRyYW5zbGF0ZSB9fSA8L2J1dHRvbj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyLWNvbW1lbnRzXCIgZnhMYXlvdXQ9XCJjb2x1bW5cIiBmeExheW91dEdhcD1cIjE2cHhcIj5cbiAgICAgICAgPGRpdiBmeExheW91dD1cInJvd1wiIGZ4TGF5b3V0R2FwPVwiOHB4XCI+XG4gICAgICAgICAgPGgyIGNsYXNzPVwiZGVjLWNvbG9yLWdyZXlcIj5cbiAgICAgICAgICAgIDxkZWMtaWNvbiBmb250PVwibWF0XCI+Ym9va21hcmtzPC9kZWMtaWNvbj5UYWdzXG4gICAgICAgICAgPC9oMj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkZWMtbWFya2Rvd25zLWNvbW1lbnQgW3BhcmVudElkXT1cInBhcmVudElkXCIgW3JlbmRlcnNdPVwicmVuZGVyTWFya2RvbnNcIj48L2RlYy1tYXJrZG93bnMtY29tbWVudD5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvZGl2PmAsXG4gIHN0eWxlczogW2AudGV4dC1hcmVhe3dpZHRoOjk1JTtoZWlnaHQ6MTg1cHg7cGFkZGluZzoxNXB4fS56b29tLWNvbnRhaW5lcnt3aWR0aDoxMDAlfS5tYWluLWNvbnRhaW5lcntwb3NpdGlvbjpyZWxhdGl2ZTtiYWNrZ3JvdW5kLWNvbG9yOiNmZmZ9LmJ1dHRvbi1zYXZle3Bvc2l0aW9uOmFic29sdXRlO3otaW5kZXg6NTtyaWdodDowO3RvcDo0NSV9LmZha2UtZGl2e3dpZHRoOjEwMCU7aGVpZ2h0OjM2cHh9LmNvbnRhaW5lci1jb21tZW50c3twYWRkaW5nLWxlZnQ6MjBweH1gXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNab29tQXJlYUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgQElucHV0KClcbiAgc2V0IHJlZmVyZW5jZSh2KSB7XG4gICAgaWYgKHYpIHtcbiAgICAgIHRoaXMuX3JlZmVyZW5jZSA9IHY7XG4gICAgfVxuICB9XG5cbiAgZ2V0IHJlZmVyZW5jZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fcmVmZXJlbmNlO1xuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IHJlbmRlcih2KSB7XG4gICAgaWYgKHYpIHtcbiAgICAgIHRoaXMuX3JlbmRlciA9IHY7XG4gICAgICB0aGlzLnJlbmRlck1hcmtkb25zLnB1c2godGhpcy5fcmVuZGVyKTtcbiAgICB9XG4gIH1cblxuICBnZXQgcmVuZGVyKCkge1xuICAgIHJldHVybiB0aGlzLl9yZW5kZXI7XG4gIH1cblxuICBAT3V0cHV0KCkgc2F2ZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBAT3V0cHV0KCkgY2FuY2VsID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBcbiAgcHJpdmF0ZSBfcmVmZXJlbmNlO1xuICBwcml2YXRlIF9yZW5kZXI7XG5cbiAgQElucHV0KCkgcGFyZW50SWQ6IG51bWJlcjtcblxuICBjb21tZW50SW5kZXg7XG4gIHJlZmVyZW5jZVFhTW9kZSA9IGZhbHNlO1xuXG4gIGRlc2NyaXBpdGlvbjogYW55O1xuXG4gIHJlbmRlck1hcmtkb25zID0gW107XG5cbiAgQFZpZXdDaGlsZCgncmVuZGVyWm9vbScpIHJlbmRlclpvb206IERlY01hcmtzQ29tcG9uZW50O1xuXG4gIEBWaWV3Q2hpbGQoJ3JlZmVyZW5jZVpvb20nKSByZWZlcmVuY2Vab29tOiBEZWNNYXJrc0NvbXBvbmVudDtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICB9XG5cbiAgb25TYXZlKCkge1xuICAgIGNvbnN0IHNhdmVPYmogPSB7XG4gICAgICBjb29yZGluYXRlczogW10sXG4gICAgICBpZDogdGhpcy5wYXJlbnRJZCxcbiAgICAgIGRlc2NyaXBpdGlvbjogdGhpcy5kZXNjcmlwaXRpb24sXG4gICAgICByZW5kZXJTaG90OiB0aGlzLnJlbmRlclpvb20ubWFya2VyLFxuICAgICAgcmVmZXJlbmNlU2hvdDogdGhpcy5yZWZlcmVuY2Vab29tLm1hcmtlclxuICAgIH1cbiAgICBjb25zb2xlLmxvZyhzYXZlT2JqKTtcbiAgICB0aGlzLnNhdmUuZW1pdChzYXZlT2JqKTtcbiAgfVxuXG4gIG9uTGlua1RhZyhldmVudCkge1xuICAgIHRoaXMucmVmZXJlbmNlUWFNb2RlID0gdHJ1ZTtcbiAgICB0aGlzLmNvbW1lbnRJbmRleCA9IGV2ZW50LmlkO1xuICB9XG5cbiAgb25SZWZlcmVuY2VRYSgkZXZlbnQpIHtcbiAgICB0aGlzLnJlZmVyZW5jZVFhTW9kZSA9IGZhbHNlO1xuICB9XG5cbiAgb25DYW5jZWwoKSB7XG4gICAgdGhpcy5jYW5jZWwuZW1pdCgpO1xuICB9XG59XG4iXX0=