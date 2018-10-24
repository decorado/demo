/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { CarouselZoomConfig } from './../gallery/carousel-config';
import { DecZoomMarksComponent } from './../dec-zoom-marks/dec-zoom-marks.component';
var DecZoomMarksGalleryComponent = /** @class */ (function () {
    function DecZoomMarksGalleryComponent() {
        var _this = this;
        this.carouselConfig = CarouselZoomConfig;
        this.imageIndex = 0;
        this.openZoomArea = new EventEmitter();
        this.onSelectImage = function ($event, sysFile, i) {
            _this.markedObj = _this.markedObjs[i];
            _this.imageIndex = i;
        };
    }
    Object.defineProperty(DecZoomMarksGalleryComponent.prototype, "markedObjs", {
        get: /**
         * @return {?}
         */
        function () {
            return this._markedObjs;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            if (this._markedObjs !== v) {
                this._markedObjs = v;
                this.markedObj = this.markedObjs[0];
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DecZoomMarksGalleryComponent.prototype, "showTags", {
        get: /**
         * @return {?}
         */
        function () {
            return this._showTags;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            if (v) {
                this._showTags = v;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} event
     * @return {?}
     */
    DecZoomMarksGalleryComponent.prototype.onInitDataFn = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.setPrevNextCheckers(event.isFirst, event.items >= this.markedObjs.length);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    DecZoomMarksGalleryComponent.prototype.onMoveFn = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.setPrevNextCheckers(event.isFirst, event.isLast);
    };
    /**
     * @param {?} first
     * @param {?} last
     * @return {?}
     */
    DecZoomMarksGalleryComponent.prototype.setPrevNextCheckers = /**
     * @param {?} first
     * @param {?} last
     * @return {?}
     */
    function (first, last) {
        var _this = this;
        setTimeout(function () {
            _this.isFirst = first;
            _this.isLast = last;
        }, 0);
    };
    /**
     * @return {?}
     */
    DecZoomMarksGalleryComponent.prototype.getFormatedPositionAndScale = /**
     * @return {?}
     */
    function () {
        return this.zoomMarks.getFormatedPositionAndScale();
    };
    /**
     * @param {?} addNewZoomArea
     * @return {?}
     */
    DecZoomMarksGalleryComponent.prototype.addNewZoomArea = /**
     * @param {?} addNewZoomArea
     * @return {?}
     */
    function (addNewZoomArea) {
        this.zoomMarks.addNewZoomArea(addNewZoomArea);
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    DecZoomMarksGalleryComponent.prototype.onOpenZoomArea = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        this.openZoomArea.emit($event);
    };
    /**
     * @return {?}
     */
    DecZoomMarksGalleryComponent.prototype.getImageIndex = /**
     * @return {?}
     */
    function () {
        return this.imageIndex;
    };
    DecZoomMarksGalleryComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dec-zoom-marks-gallery',
                    template: "<div class=\"gallery-size\" fxLayout=\"column\" fxLayoutGap=\"32px\" fxLayoutAlign=\"space-between start\">\n  <dec-zoom-marks fxFlex class=\"gallery-size\" [marker]=\"markedObj\" [qaMode]=\"qaModeActive\" (openZoomArea)=\"onOpenZoomArea($event)\"\n    minZoomLevel=\"1\" maxZoomLevel=\"8\" stepZoomLevel=\"0.1\"></dec-zoom-marks>\n\n  <div class=\"gallery-size\">\n    <ngu-carousel class=\"carousel-wrapper \" [inputs]=\"carouselConfig\" (initData)=\"onInitDataFn($event)\" (onMove)=\"onMoveFn($event)\">\n\n      <ngu-item NguCarouselItem *ngFor=\"let image of markedObjs; let i = index;\" [class.active]=\"image == markedObj\">\n        <img [decImage]=\"image.file\" [decImageSize]=\"{width:300, height:300}\" (click)=\"onSelectImage($event,image, i)\">\n      </ngu-item>\n\n      <mat-icon NguCarouselPrev class=\"left-previous\" [ngClass]=\"{'disabled': isFirst}\">chevron_left</mat-icon>\n\n      <mat-icon NguCarouselNext class=\"right-next\" [ngClass]=\"{'disabled': isLast}\">chevron_right</mat-icon>\n\n    </ngu-carousel>\n  </div>\n\n  <div *ngIf=\"showTags\" class=\"container-comments\" fxLayout=\"column\" fxLayoutGap=\"16px\">\n    <div>\n      <h3><dec-icon class=\"dec-icon-size dec-color-grey\" font=\"mat\">bookmarks</dec-icon>\n        <span class=\"dec-icon-text-size-zoom-area\"> Tags </span>\n      </h3>\n    </div>\n    <dec-markdowns-comment [renders]=\"markedObjs\"></dec-markdowns-comment>\n\n    <div>\n      <h3><dec-icon class=\"dec-icon-size dec-color-grey\" font=\"mat\">error</dec-icon>\n        <span class=\"dec-icon-text-size-zoom-area\"> Zoom areas </span>\n      </h3>\n    </div>\n    <dec-markdowns-zoom-area [renders]=\"markedObjs\"></dec-markdowns-zoom-area>\n  </div>\n</div>",
                    styles: [".image-highlighted{border:2px solid #f5f5f5}a{font-size:10px;text-decoration:none;color:#929292;cursor:pointer}.carousel-wrapper{margin-top:8px;padding:0 24px}.carousel-wrapper ngu-item{display:flex;align-items:center;flex-flow:column}.carousel-wrapper ngu-item.active img,.carousel-wrapper ngu-item:hover img{border:2px solid #232e38}.carousel-wrapper ngu-item img{max-width:62px;border:2px solid transparent;cursor:pointer}.carousel-wrapper .left-previous,.carousel-wrapper .right-next{display:block!important;position:absolute;top:calc(50% - 12px);cursor:pointer;text-shadow:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.carousel-wrapper .left-previous:hover,.carousel-wrapper .right-next:hover{text-shadow:0 0 6px rgba(0,0,0,.2)}.carousel-wrapper .left-previous.disabled,.carousel-wrapper .right-next.disabled{opacity:.4}.carousel-wrapper .left-previous.disabled:hover,.carousel-wrapper .right-next.disabled:hover{text-shadow:none}.carousel-wrapper .left-previous{left:0}.carousel-wrapper .right-next{right:0}.dec-icon-size{font-size:28px}.dec-icon-text-size{font-size:18px;position:relative;top:6px;left:-30px}.container-comments{padding-left:20px}.gallery-size{width:100%}.dec-icon-text-size-zoom-area{font-size:18px;position:relative;top:-4px}"]
                },] },
    ];
    /** @nocollapse */
    DecZoomMarksGalleryComponent.ctorParameters = function () { return []; };
    DecZoomMarksGalleryComponent.propDecorators = {
        markedObjs: [{ type: Input }],
        showTags: [{ type: Input }],
        qaModeActive: [{ type: Input }],
        zoomMarks: [{ type: ViewChild, args: [DecZoomMarksComponent,] }],
        openZoomArea: [{ type: Output }]
    };
    return DecZoomMarksGalleryComponent;
}());
export { DecZoomMarksGalleryComponent };
if (false) {
    /** @type {?} */
    DecZoomMarksGalleryComponent.prototype.carouselConfig;
    /** @type {?} */
    DecZoomMarksGalleryComponent.prototype.imageIndex;
    /** @type {?} */
    DecZoomMarksGalleryComponent.prototype.qaModeActive;
    /** @type {?} */
    DecZoomMarksGalleryComponent.prototype.zoomMarks;
    /** @type {?} */
    DecZoomMarksGalleryComponent.prototype.openZoomArea;
    /** @type {?} */
    DecZoomMarksGalleryComponent.prototype.markedObj;
    /** @type {?} */
    DecZoomMarksGalleryComponent.prototype._markedObjs;
    /** @type {?} */
    DecZoomMarksGalleryComponent.prototype._showTags;
    /** @type {?} */
    DecZoomMarksGalleryComponent.prototype.isFirst;
    /** @type {?} */
    DecZoomMarksGalleryComponent.prototype.isLast;
    /** @type {?} */
    DecZoomMarksGalleryComponent.prototype.onSelectImage;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLXpvb20tbWFya3MtZ2FsbGVyeS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvZGVjLXpvb20tbWFya3MtZ2FsbGVyeS9kZWMtem9vbS1tYXJrcy1nYWxsZXJ5LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFMUYsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDbEUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sOENBQThDLENBQUM7O0lBb0ZuRjtRQUFBLGlCQUFpQjs4QkExQ0Esa0JBQWtCOzBCQXlCdEIsQ0FBQzs0QkFNVyxJQUFJLFlBQVksRUFBRTs2QkF5QjNCLFVBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxDQUFDO1lBQ2pDLEtBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNwQyxLQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQztTQUNyQjtLQWpCZ0I7SUF4Q2pCLHNCQUNJLG9EQUFVOzs7O1FBT2Q7WUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztTQUN6Qjs7Ozs7UUFWRCxVQUNlLENBQUM7WUFDZCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzNCLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO2dCQUNyQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDckM7U0FDRjs7O09BQUE7SUFNRCxzQkFDSSxrREFBUTs7OztRQU1aO1lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7U0FDdkI7Ozs7O1FBVEQsVUFDYSxDQUFDO1lBQ1osRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDTixJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQzthQUNwQjtTQUNGOzs7T0FBQTs7Ozs7SUF5QkQsbURBQVk7Ozs7SUFBWixVQUFhLEtBQXVCO1FBRWxDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUVoRjs7Ozs7SUFFRCwrQ0FBUTs7OztJQUFSLFVBQVMsS0FBdUI7UUFFOUIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBRXZEOzs7Ozs7SUFPRCwwREFBbUI7Ozs7O0lBQW5CLFVBQW9CLEtBQWMsRUFBRSxJQUFhO1FBQWpELGlCQVVDO1FBUkMsVUFBVSxDQUFDO1lBRVQsS0FBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7WUFFckIsS0FBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7U0FFcEIsRUFBRSxDQUFDLENBQUMsQ0FBQztLQUVQOzs7O0lBRU0sa0VBQTJCOzs7O1FBQ2hDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLDJCQUEyQixFQUFFLENBQUM7Ozs7OztJQUkvQyxxREFBYzs7OztjQUFDLGNBQWM7UUFDbEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLENBQUM7Ozs7OztJQUd6QyxxREFBYzs7OztjQUFDLE1BQU07UUFDMUIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7Ozs7O0lBRzFCLG9EQUFhOzs7O1FBQ2xCLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDOzs7Z0JBL0gxQixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLHdCQUF3QjtvQkFDbEMsUUFBUSxFQUFFLDZyREFpQ0w7b0JBQ0wsTUFBTSxFQUFFLENBQUMsaXhDQUFpeEMsQ0FBQztpQkFDNXhDOzs7Ozs2QkFLRSxLQUFLOzJCQVlMLEtBQUs7K0JBYUwsS0FBSzs0QkFFTCxTQUFTLFNBQUMscUJBQXFCOytCQUUvQixNQUFNOzt1Q0E1RVQ7O1NBMkNhLDRCQUE0QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgVmlld0NoaWxkLCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmd1Q2Fyb3VzZWxTdG9yZSB9IGZyb20gJ0BuZ3UvY2Fyb3VzZWwnO1xuaW1wb3J0IHsgQ2Fyb3VzZWxab29tQ29uZmlnIH0gZnJvbSAnLi8uLi9nYWxsZXJ5L2Nhcm91c2VsLWNvbmZpZyc7XG5pbXBvcnQgeyBEZWNab29tTWFya3NDb21wb25lbnQgfSBmcm9tICcuLy4uL2RlYy16b29tLW1hcmtzL2RlYy16b29tLW1hcmtzLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy16b29tLW1hcmtzLWdhbGxlcnknLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJnYWxsZXJ5LXNpemVcIiBmeExheW91dD1cImNvbHVtblwiIGZ4TGF5b3V0R2FwPVwiMzJweFwiIGZ4TGF5b3V0QWxpZ249XCJzcGFjZS1iZXR3ZWVuIHN0YXJ0XCI+XG4gIDxkZWMtem9vbS1tYXJrcyBmeEZsZXggY2xhc3M9XCJnYWxsZXJ5LXNpemVcIiBbbWFya2VyXT1cIm1hcmtlZE9ialwiIFtxYU1vZGVdPVwicWFNb2RlQWN0aXZlXCIgKG9wZW5ab29tQXJlYSk9XCJvbk9wZW5ab29tQXJlYSgkZXZlbnQpXCJcbiAgICBtaW5ab29tTGV2ZWw9XCIxXCIgbWF4Wm9vbUxldmVsPVwiOFwiIHN0ZXBab29tTGV2ZWw9XCIwLjFcIj48L2RlYy16b29tLW1hcmtzPlxuXG4gIDxkaXYgY2xhc3M9XCJnYWxsZXJ5LXNpemVcIj5cbiAgICA8bmd1LWNhcm91c2VsIGNsYXNzPVwiY2Fyb3VzZWwtd3JhcHBlciBcIiBbaW5wdXRzXT1cImNhcm91c2VsQ29uZmlnXCIgKGluaXREYXRhKT1cIm9uSW5pdERhdGFGbigkZXZlbnQpXCIgKG9uTW92ZSk9XCJvbk1vdmVGbigkZXZlbnQpXCI+XG5cbiAgICAgIDxuZ3UtaXRlbSBOZ3VDYXJvdXNlbEl0ZW0gKm5nRm9yPVwibGV0IGltYWdlIG9mIG1hcmtlZE9ianM7IGxldCBpID0gaW5kZXg7XCIgW2NsYXNzLmFjdGl2ZV09XCJpbWFnZSA9PSBtYXJrZWRPYmpcIj5cbiAgICAgICAgPGltZyBbZGVjSW1hZ2VdPVwiaW1hZ2UuZmlsZVwiIFtkZWNJbWFnZVNpemVdPVwie3dpZHRoOjMwMCwgaGVpZ2h0OjMwMH1cIiAoY2xpY2spPVwib25TZWxlY3RJbWFnZSgkZXZlbnQsaW1hZ2UsIGkpXCI+XG4gICAgICA8L25ndS1pdGVtPlxuXG4gICAgICA8bWF0LWljb24gTmd1Q2Fyb3VzZWxQcmV2IGNsYXNzPVwibGVmdC1wcmV2aW91c1wiIFtuZ0NsYXNzXT1cInsnZGlzYWJsZWQnOiBpc0ZpcnN0fVwiPmNoZXZyb25fbGVmdDwvbWF0LWljb24+XG5cbiAgICAgIDxtYXQtaWNvbiBOZ3VDYXJvdXNlbE5leHQgY2xhc3M9XCJyaWdodC1uZXh0XCIgW25nQ2xhc3NdPVwieydkaXNhYmxlZCc6IGlzTGFzdH1cIj5jaGV2cm9uX3JpZ2h0PC9tYXQtaWNvbj5cblxuICAgIDwvbmd1LWNhcm91c2VsPlxuICA8L2Rpdj5cblxuICA8ZGl2ICpuZ0lmPVwic2hvd1RhZ3NcIiBjbGFzcz1cImNvbnRhaW5lci1jb21tZW50c1wiIGZ4TGF5b3V0PVwiY29sdW1uXCIgZnhMYXlvdXRHYXA9XCIxNnB4XCI+XG4gICAgPGRpdj5cbiAgICAgIDxoMz48ZGVjLWljb24gY2xhc3M9XCJkZWMtaWNvbi1zaXplIGRlYy1jb2xvci1ncmV5XCIgZm9udD1cIm1hdFwiPmJvb2ttYXJrczwvZGVjLWljb24+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwiZGVjLWljb24tdGV4dC1zaXplLXpvb20tYXJlYVwiPiBUYWdzIDwvc3Bhbj5cbiAgICAgIDwvaDM+XG4gICAgPC9kaXY+XG4gICAgPGRlYy1tYXJrZG93bnMtY29tbWVudCBbcmVuZGVyc109XCJtYXJrZWRPYmpzXCI+PC9kZWMtbWFya2Rvd25zLWNvbW1lbnQ+XG5cbiAgICA8ZGl2PlxuICAgICAgPGgzPjxkZWMtaWNvbiBjbGFzcz1cImRlYy1pY29uLXNpemUgZGVjLWNvbG9yLWdyZXlcIiBmb250PVwibWF0XCI+ZXJyb3I8L2RlYy1pY29uPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImRlYy1pY29uLXRleHQtc2l6ZS16b29tLWFyZWFcIj4gWm9vbSBhcmVhcyA8L3NwYW4+XG4gICAgICA8L2gzPlxuICAgIDwvZGl2PlxuICAgIDxkZWMtbWFya2Rvd25zLXpvb20tYXJlYSBbcmVuZGVyc109XCJtYXJrZWRPYmpzXCI+PC9kZWMtbWFya2Rvd25zLXpvb20tYXJlYT5cbiAgPC9kaXY+XG48L2Rpdj5gLFxuICBzdHlsZXM6IFtgLmltYWdlLWhpZ2hsaWdodGVke2JvcmRlcjoycHggc29saWQgI2Y1ZjVmNX1he2ZvbnQtc2l6ZToxMHB4O3RleHQtZGVjb3JhdGlvbjpub25lO2NvbG9yOiM5MjkyOTI7Y3Vyc29yOnBvaW50ZXJ9LmNhcm91c2VsLXdyYXBwZXJ7bWFyZ2luLXRvcDo4cHg7cGFkZGluZzowIDI0cHh9LmNhcm91c2VsLXdyYXBwZXIgbmd1LWl0ZW17ZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOmNlbnRlcjtmbGV4LWZsb3c6Y29sdW1ufS5jYXJvdXNlbC13cmFwcGVyIG5ndS1pdGVtLmFjdGl2ZSBpbWcsLmNhcm91c2VsLXdyYXBwZXIgbmd1LWl0ZW06aG92ZXIgaW1ne2JvcmRlcjoycHggc29saWQgIzIzMmUzOH0uY2Fyb3VzZWwtd3JhcHBlciBuZ3UtaXRlbSBpbWd7bWF4LXdpZHRoOjYycHg7Ym9yZGVyOjJweCBzb2xpZCB0cmFuc3BhcmVudDtjdXJzb3I6cG9pbnRlcn0uY2Fyb3VzZWwtd3JhcHBlciAubGVmdC1wcmV2aW91cywuY2Fyb3VzZWwtd3JhcHBlciAucmlnaHQtbmV4dHtkaXNwbGF5OmJsb2NrIWltcG9ydGFudDtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6Y2FsYyg1MCUgLSAxMnB4KTtjdXJzb3I6cG9pbnRlcjt0ZXh0LXNoYWRvdzpub25lOy13ZWJraXQtdXNlci1zZWxlY3Q6bm9uZTstbW96LXVzZXItc2VsZWN0Om5vbmU7LW1zLXVzZXItc2VsZWN0Om5vbmU7dXNlci1zZWxlY3Q6bm9uZX0uY2Fyb3VzZWwtd3JhcHBlciAubGVmdC1wcmV2aW91czpob3ZlciwuY2Fyb3VzZWwtd3JhcHBlciAucmlnaHQtbmV4dDpob3Zlcnt0ZXh0LXNoYWRvdzowIDAgNnB4IHJnYmEoMCwwLDAsLjIpfS5jYXJvdXNlbC13cmFwcGVyIC5sZWZ0LXByZXZpb3VzLmRpc2FibGVkLC5jYXJvdXNlbC13cmFwcGVyIC5yaWdodC1uZXh0LmRpc2FibGVke29wYWNpdHk6LjR9LmNhcm91c2VsLXdyYXBwZXIgLmxlZnQtcHJldmlvdXMuZGlzYWJsZWQ6aG92ZXIsLmNhcm91c2VsLXdyYXBwZXIgLnJpZ2h0LW5leHQuZGlzYWJsZWQ6aG92ZXJ7dGV4dC1zaGFkb3c6bm9uZX0uY2Fyb3VzZWwtd3JhcHBlciAubGVmdC1wcmV2aW91c3tsZWZ0OjB9LmNhcm91c2VsLXdyYXBwZXIgLnJpZ2h0LW5leHR7cmlnaHQ6MH0uZGVjLWljb24tc2l6ZXtmb250LXNpemU6MjhweH0uZGVjLWljb24tdGV4dC1zaXple2ZvbnQtc2l6ZToxOHB4O3Bvc2l0aW9uOnJlbGF0aXZlO3RvcDo2cHg7bGVmdDotMzBweH0uY29udGFpbmVyLWNvbW1lbnRze3BhZGRpbmctbGVmdDoyMHB4fS5nYWxsZXJ5LXNpemV7d2lkdGg6MTAwJX0uZGVjLWljb24tdGV4dC1zaXplLXpvb20tYXJlYXtmb250LXNpemU6MThweDtwb3NpdGlvbjpyZWxhdGl2ZTt0b3A6LTRweH1gXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNab29tTWFya3NHYWxsZXJ5Q29tcG9uZW50IHtcblxuICBjYXJvdXNlbENvbmZpZyA9IENhcm91c2VsWm9vbUNvbmZpZztcblxuICBASW5wdXQoKVxuICBzZXQgbWFya2VkT2Jqcyh2KSB7XG4gICAgaWYgKHRoaXMuX21hcmtlZE9ianMgIT09IHYpIHtcbiAgICAgIHRoaXMuX21hcmtlZE9ianMgPSB2O1xuICAgICAgdGhpcy5tYXJrZWRPYmogPSB0aGlzLm1hcmtlZE9ianNbMF07XG4gICAgfVxuICB9XG5cbiAgZ2V0IG1hcmtlZE9ianMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX21hcmtlZE9ianM7XG4gIH1cblxuICBASW5wdXQoKVxuICBzZXQgc2hvd1RhZ3Modikge1xuICAgIGlmICh2KSB7XG4gICAgICB0aGlzLl9zaG93VGFncyA9IHY7XG4gICAgfVxuICB9XG5cbiAgZ2V0IHNob3dUYWdzKCkge1xuICAgIHJldHVybiB0aGlzLl9zaG93VGFncztcbiAgfVxuXG4gIGltYWdlSW5kZXggPSAwO1xuXG4gIEBJbnB1dCgpIHFhTW9kZUFjdGl2ZTogYm9vbGVhbjtcblxuICBAVmlld0NoaWxkKERlY1pvb21NYXJrc0NvbXBvbmVudCkgem9vbU1hcmtzOiBEZWNab29tTWFya3NDb21wb25lbnQ7IFxuXG4gIEBPdXRwdXQoKSBvcGVuWm9vbUFyZWEgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgbWFya2VkT2JqOiBhbnk7XG4gIF9tYXJrZWRPYmpzOiBhbnk7XG5cbiAgX3Nob3dUYWdzOiBib29sZWFuO1xuXG4gIGlzRmlyc3Q6IGJvb2xlYW47XG5cbiAgaXNMYXN0OiBib29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgb25Jbml0RGF0YUZuKGV2ZW50OiBOZ3VDYXJvdXNlbFN0b3JlKSB7XG5cbiAgICB0aGlzLnNldFByZXZOZXh0Q2hlY2tlcnMoZXZlbnQuaXNGaXJzdCwgZXZlbnQuaXRlbXMgPj0gdGhpcy5tYXJrZWRPYmpzLmxlbmd0aCk7XG5cbiAgfVxuXG4gIG9uTW92ZUZuKGV2ZW50OiBOZ3VDYXJvdXNlbFN0b3JlKSB7XG5cbiAgICB0aGlzLnNldFByZXZOZXh0Q2hlY2tlcnMoZXZlbnQuaXNGaXJzdCwgZXZlbnQuaXNMYXN0KTtcblxuICB9XG5cbiAgb25TZWxlY3RJbWFnZSA9ICgkZXZlbnQsIHN5c0ZpbGUsIGkpID0+IHtcbiAgICB0aGlzLm1hcmtlZE9iaiA9IHRoaXMubWFya2VkT2Jqc1tpXTtcbiAgICB0aGlzLmltYWdlSW5kZXggPSBpO1xuICB9XG5cbiAgc2V0UHJldk5leHRDaGVja2VycyhmaXJzdDogYm9vbGVhbiwgbGFzdDogYm9vbGVhbikge1xuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG5cbiAgICAgIHRoaXMuaXNGaXJzdCA9IGZpcnN0O1xuXG4gICAgICB0aGlzLmlzTGFzdCA9IGxhc3Q7XG5cbiAgICB9LCAwKTtcblxuICB9XG5cbiAgcHVibGljIGdldEZvcm1hdGVkUG9zaXRpb25BbmRTY2FsZSgpIHtcbiAgICByZXR1cm4gdGhpcy56b29tTWFya3MuZ2V0Rm9ybWF0ZWRQb3NpdGlvbkFuZFNjYWxlKCk7XG4gIH1cblxuXG4gIHB1YmxpYyBhZGROZXdab29tQXJlYShhZGROZXdab29tQXJlYSkge1xuICAgIHRoaXMuem9vbU1hcmtzLmFkZE5ld1pvb21BcmVhKGFkZE5ld1pvb21BcmVhKTtcbiAgfVxuXG4gIHB1YmxpYyBvbk9wZW5ab29tQXJlYSgkZXZlbnQpIHtcbiAgICB0aGlzLm9wZW5ab29tQXJlYS5lbWl0KCRldmVudCk7XG4gIH1cblxuICBwdWJsaWMgZ2V0SW1hZ2VJbmRleCgpIHtcbiAgICByZXR1cm4gdGhpcy5pbWFnZUluZGV4O1xuICB9XG59XG4iXX0=