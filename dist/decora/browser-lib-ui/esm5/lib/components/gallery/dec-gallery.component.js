/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CarouselConfig } from './carousel-config';
var DecGalleryComponent = /** @class */ (function () {
    function DecGalleryComponent() {
        var _this = this;
        this.carouselConfig = CarouselConfig;
        this.index = 0;
        // ***UPLOAD*** //
        this.permitUpload = false;
        this.resolutions = [];
        this.uploaded = new EventEmitter();
        this._images = [];
        this.onSelectImage = function ($event, sysFile, i) {
            if (_this.activeImage && _this.activeImage !== $event.target) {
                _this.activeImage.className = '';
            }
            $event.target.className = 'active';
            _this.activeImage = $event.target;
            _this.imageHighlight = sysFile;
            _this.index = i;
            _this.setExternalLink();
        };
        this.setExternalLink = function () {
            if (_this.imageHighlight) {
                _this.imgExternalLink = _this.imageHighlight.fileUrl;
            }
        };
    }
    Object.defineProperty(DecGalleryComponent.prototype, "images", {
        get: /**
         * @return {?}
         */
        function () {
            return this._images;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            value = value || new Array();
            if (value && (JSON.stringify(value) !== JSON.stringify(this._images))) {
                this.imageHighlight = value[0];
                this._images = value;
                this.setExternalLink();
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} event
     * @return {?}
     */
    DecGalleryComponent.prototype.onInitDataFn = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.setPrevNextCheckers(event.isFirst, event.items >= this.images.length);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    DecGalleryComponent.prototype.onMoveFn = /**
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
    DecGalleryComponent.prototype.setPrevNextCheckers = /**
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
     * @param {?} event
     * @return {?}
     */
    DecGalleryComponent.prototype.uploadedFunction = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.images[this.index] = event;
        this.uploaded.emit({
            sysFile: event,
            index: this.index
        });
    };
    DecGalleryComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dec-gallery',
                    template: "<div class=\"dec-gallery-wrapper\">\n\n  <div class=\"image-highlighted\">\n    <dec-image-zoom [permitUpload]=\"permitUpload\" (uploaded)=\"uploadedFunction($event)\" [image]=\"imageHighlight\"></dec-image-zoom>\n  </div>\n\n  <ngu-carousel class=\"carousel-wrapper\" [inputs]=\"carouselConfig\" (initData)=\"onInitDataFn($event)\" (onMove)=\"onMoveFn($event)\">\n\n    <ngu-item NguCarouselItem *ngFor=\"let image of images; let i = index;\" [class.active]=\"image == imageHighlight\">\n      <img [decImage]=\"image\" [decImageSize]=\"{width:300, height:300}\" (click)=\"onSelectImage($event,image, i)\">\n      <span *ngIf=\"image.order\">{{ 'label.shot-order' | translate }}: {{ image.order }}</span>\n      <span *ngIf=\"resolutions.length > 0\">{{ 'label.size' | translate }}: {{ resolutions[i]}}</span>\n    </ngu-item>\n\n    <mat-icon NguCarouselPrev class=\"left-previous\" [ngClass]=\"{'disabled': isFirst}\">chevron_left</mat-icon>\n\n    <mat-icon NguCarouselNext class=\"right-next\" [ngClass]=\"{'disabled': isLast}\">chevron_right</mat-icon>\n\n  </ngu-carousel>\n\n</div>\n",
                    styles: [".dec-gallery-wrapper{max-width:624px;overflow:hidden}.dec-gallery-wrapper .image-highlighted{border:2px solid #f5f5f5;width:620px;height:620px}.dec-gallery-wrapper a{font-size:10px;text-decoration:none;color:#929292;cursor:pointer}.dec-gallery-wrapper .carousel-wrapper{margin-top:8px;padding:0 24px}.dec-gallery-wrapper .carousel-wrapper ngu-item{display:flex;align-items:center;flex-flow:column}.dec-gallery-wrapper .carousel-wrapper ngu-item.active img,.dec-gallery-wrapper .carousel-wrapper ngu-item:hover img{border:2px solid #232e38}.dec-gallery-wrapper .carousel-wrapper ngu-item img{max-width:124px;border:2px solid transparent;cursor:pointer}.dec-gallery-wrapper .carousel-wrapper .left-previous,.dec-gallery-wrapper .carousel-wrapper .right-next{display:block!important;position:absolute;top:calc(50% - 24px);cursor:pointer;text-shadow:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.dec-gallery-wrapper .carousel-wrapper .left-previous:hover,.dec-gallery-wrapper .carousel-wrapper .right-next:hover{text-shadow:0 0 6px rgba(0,0,0,.2)}.dec-gallery-wrapper .carousel-wrapper .left-previous.disabled,.dec-gallery-wrapper .carousel-wrapper .right-next.disabled{opacity:.4}.dec-gallery-wrapper .carousel-wrapper .left-previous.disabled:hover,.dec-gallery-wrapper .carousel-wrapper .right-next.disabled:hover{text-shadow:none}.dec-gallery-wrapper .carousel-wrapper .left-previous{left:0}.dec-gallery-wrapper .carousel-wrapper .right-next{right:0}"]
                },] },
    ];
    /** @nocollapse */
    DecGalleryComponent.ctorParameters = function () { return []; };
    DecGalleryComponent.propDecorators = {
        images: [{ type: Input }],
        permitUpload: [{ type: Input }],
        resolutions: [{ type: Input }],
        uploaded: [{ type: Output }]
    };
    return DecGalleryComponent;
}());
export { DecGalleryComponent };
if (false) {
    /** @type {?} */
    DecGalleryComponent.prototype.imageHighlight;
    /** @type {?} */
    DecGalleryComponent.prototype.activeImage;
    /** @type {?} */
    DecGalleryComponent.prototype.imgExternalLink;
    /** @type {?} */
    DecGalleryComponent.prototype.isFirst;
    /** @type {?} */
    DecGalleryComponent.prototype.isLast;
    /** @type {?} */
    DecGalleryComponent.prototype.carouselConfig;
    /** @type {?} */
    DecGalleryComponent.prototype.index;
    /** @type {?} */
    DecGalleryComponent.prototype.permitUpload;
    /** @type {?} */
    DecGalleryComponent.prototype.resolutions;
    /** @type {?} */
    DecGalleryComponent.prototype.uploaded;
    /** @type {?} */
    DecGalleryComponent.prototype._images;
    /** @type {?} */
    DecGalleryComponent.prototype.onSelectImage;
    /** @type {?} */
    DecGalleryComponent.prototype.setExternalLink;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLWdhbGxlcnkuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL2dhbGxlcnkvZGVjLWdhbGxlcnkuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQzs7SUE4RWpEO1FBQUEsaUJBQWlCOzhCQXJDQSxjQUFjO3FCQUV2QixDQUFDOzs0QkEwQmUsS0FBSzsyQkFFSSxFQUFFO3dCQUVkLElBQUksWUFBWSxFQUFFO3VCQUdkLEVBQUU7NkJBSVgsVUFBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLENBQUM7WUFFakMsRUFBRSxDQUFDLENBQUMsS0FBSSxDQUFDLFdBQVcsSUFBSSxLQUFJLENBQUMsV0FBVyxLQUFLLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUUzRCxLQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7YUFFakM7WUFFRCxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7WUFFbkMsS0FBSSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO1lBRWpDLEtBQUksQ0FBQyxjQUFjLEdBQUcsT0FBTyxDQUFDO1lBRTlCLEtBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1lBRWYsS0FBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1NBRXhCOytCQUVpQjtZQUVoQixFQUFFLENBQUMsQ0FBQyxLQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztnQkFFeEIsS0FBSSxDQUFDLGVBQWUsR0FBRyxLQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQzthQUVwRDtTQUVGO0tBOUJnQjtJQWpDakIsc0JBQ0ksdUNBQU07Ozs7UUFnQlY7WUFFRSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztTQUVyQjs7Ozs7UUFyQkQsVUFDVyxLQUFZO1lBRXJCLEtBQUssR0FBRyxLQUFLLElBQUksSUFBSSxLQUFLLEVBQU8sQ0FBQztZQUVsQyxFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxLQUFLLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUV0RSxJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFL0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7Z0JBRXJCLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQzthQUV4QjtTQUVGOzs7T0FBQTs7Ozs7SUFrREQsMENBQVk7Ozs7SUFBWixVQUFhLEtBQXVCO1FBRWxDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUU1RTs7Ozs7SUFFRCxzQ0FBUTs7OztJQUFSLFVBQVMsS0FBdUI7UUFFOUIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBRXZEOzs7Ozs7SUFFRCxpREFBbUI7Ozs7O0lBQW5CLFVBQW9CLEtBQWMsRUFBRSxJQUFhO1FBQWpELGlCQVVDO1FBUkMsVUFBVSxDQUFDO1lBRVQsS0FBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7WUFFckIsS0FBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7U0FFcEIsRUFBRSxDQUFDLENBQUMsQ0FBQztLQUVQOzs7OztJQUVELDhDQUFnQjs7OztJQUFoQixVQUFpQixLQUFLO1FBQ3BCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUssQ0FBQztRQUNoQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztZQUNqQixPQUFPLEVBQUUsS0FBSztZQUNkLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztTQUNsQixDQUFDLENBQUM7S0FDSjs7Z0JBeklGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsYUFBYTtvQkFDdkIsUUFBUSxFQUFFLHFrQ0FxQlg7b0JBQ0MsTUFBTSxFQUFFLENBQUMsdzlDQUF3OUMsQ0FBQztpQkFDbitDOzs7Ozt5QkFpQkUsS0FBSzsrQkF3QkwsS0FBSzs4QkFFTCxLQUFLOzJCQUVMLE1BQU07OzhCQTFFVDs7U0E4QmEsbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENhcm91c2VsQ29uZmlnIH0gZnJvbSAnLi9jYXJvdXNlbC1jb25maWcnO1xuaW1wb3J0IHsgTmd1Q2Fyb3VzZWxTdG9yZSB9IGZyb20gJ0BuZ3UvY2Fyb3VzZWwvc3JjL25ndS1jYXJvdXNlbC9uZ3UtY2Fyb3VzZWwuaW50ZXJmYWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLWdhbGxlcnknLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJkZWMtZ2FsbGVyeS13cmFwcGVyXCI+XG5cbiAgPGRpdiBjbGFzcz1cImltYWdlLWhpZ2hsaWdodGVkXCI+XG4gICAgPGRlYy1pbWFnZS16b29tIFtwZXJtaXRVcGxvYWRdPVwicGVybWl0VXBsb2FkXCIgKHVwbG9hZGVkKT1cInVwbG9hZGVkRnVuY3Rpb24oJGV2ZW50KVwiIFtpbWFnZV09XCJpbWFnZUhpZ2hsaWdodFwiPjwvZGVjLWltYWdlLXpvb20+XG4gIDwvZGl2PlxuXG4gIDxuZ3UtY2Fyb3VzZWwgY2xhc3M9XCJjYXJvdXNlbC13cmFwcGVyXCIgW2lucHV0c109XCJjYXJvdXNlbENvbmZpZ1wiIChpbml0RGF0YSk9XCJvbkluaXREYXRhRm4oJGV2ZW50KVwiIChvbk1vdmUpPVwib25Nb3ZlRm4oJGV2ZW50KVwiPlxuXG4gICAgPG5ndS1pdGVtIE5ndUNhcm91c2VsSXRlbSAqbmdGb3I9XCJsZXQgaW1hZ2Ugb2YgaW1hZ2VzOyBsZXQgaSA9IGluZGV4O1wiIFtjbGFzcy5hY3RpdmVdPVwiaW1hZ2UgPT0gaW1hZ2VIaWdobGlnaHRcIj5cbiAgICAgIDxpbWcgW2RlY0ltYWdlXT1cImltYWdlXCIgW2RlY0ltYWdlU2l6ZV09XCJ7d2lkdGg6MzAwLCBoZWlnaHQ6MzAwfVwiIChjbGljayk9XCJvblNlbGVjdEltYWdlKCRldmVudCxpbWFnZSwgaSlcIj5cbiAgICAgIDxzcGFuICpuZ0lmPVwiaW1hZ2Uub3JkZXJcIj57eyAnbGFiZWwuc2hvdC1vcmRlcicgfCB0cmFuc2xhdGUgfX06IHt7IGltYWdlLm9yZGVyIH19PC9zcGFuPlxuICAgICAgPHNwYW4gKm5nSWY9XCJyZXNvbHV0aW9ucy5sZW5ndGggPiAwXCI+e3sgJ2xhYmVsLnNpemUnIHwgdHJhbnNsYXRlIH19OiB7eyByZXNvbHV0aW9uc1tpXX19PC9zcGFuPlxuICAgIDwvbmd1LWl0ZW0+XG5cbiAgICA8bWF0LWljb24gTmd1Q2Fyb3VzZWxQcmV2IGNsYXNzPVwibGVmdC1wcmV2aW91c1wiIFtuZ0NsYXNzXT1cInsnZGlzYWJsZWQnOiBpc0ZpcnN0fVwiPmNoZXZyb25fbGVmdDwvbWF0LWljb24+XG5cbiAgICA8bWF0LWljb24gTmd1Q2Fyb3VzZWxOZXh0IGNsYXNzPVwicmlnaHQtbmV4dFwiIFtuZ0NsYXNzXT1cInsnZGlzYWJsZWQnOiBpc0xhc3R9XCI+Y2hldnJvbl9yaWdodDwvbWF0LWljb24+XG5cbiAgPC9uZ3UtY2Fyb3VzZWw+XG5cbjwvZGl2PlxuYCxcbiAgc3R5bGVzOiBbYC5kZWMtZ2FsbGVyeS13cmFwcGVye21heC13aWR0aDo2MjRweDtvdmVyZmxvdzpoaWRkZW59LmRlYy1nYWxsZXJ5LXdyYXBwZXIgLmltYWdlLWhpZ2hsaWdodGVke2JvcmRlcjoycHggc29saWQgI2Y1ZjVmNTt3aWR0aDo2MjBweDtoZWlnaHQ6NjIwcHh9LmRlYy1nYWxsZXJ5LXdyYXBwZXIgYXtmb250LXNpemU6MTBweDt0ZXh0LWRlY29yYXRpb246bm9uZTtjb2xvcjojOTI5MjkyO2N1cnNvcjpwb2ludGVyfS5kZWMtZ2FsbGVyeS13cmFwcGVyIC5jYXJvdXNlbC13cmFwcGVye21hcmdpbi10b3A6OHB4O3BhZGRpbmc6MCAyNHB4fS5kZWMtZ2FsbGVyeS13cmFwcGVyIC5jYXJvdXNlbC13cmFwcGVyIG5ndS1pdGVte2Rpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpjZW50ZXI7ZmxleC1mbG93OmNvbHVtbn0uZGVjLWdhbGxlcnktd3JhcHBlciAuY2Fyb3VzZWwtd3JhcHBlciBuZ3UtaXRlbS5hY3RpdmUgaW1nLC5kZWMtZ2FsbGVyeS13cmFwcGVyIC5jYXJvdXNlbC13cmFwcGVyIG5ndS1pdGVtOmhvdmVyIGltZ3tib3JkZXI6MnB4IHNvbGlkICMyMzJlMzh9LmRlYy1nYWxsZXJ5LXdyYXBwZXIgLmNhcm91c2VsLXdyYXBwZXIgbmd1LWl0ZW0gaW1ne21heC13aWR0aDoxMjRweDtib3JkZXI6MnB4IHNvbGlkIHRyYW5zcGFyZW50O2N1cnNvcjpwb2ludGVyfS5kZWMtZ2FsbGVyeS13cmFwcGVyIC5jYXJvdXNlbC13cmFwcGVyIC5sZWZ0LXByZXZpb3VzLC5kZWMtZ2FsbGVyeS13cmFwcGVyIC5jYXJvdXNlbC13cmFwcGVyIC5yaWdodC1uZXh0e2Rpc3BsYXk6YmxvY2shaW1wb3J0YW50O3Bvc2l0aW9uOmFic29sdXRlO3RvcDpjYWxjKDUwJSAtIDI0cHgpO2N1cnNvcjpwb2ludGVyO3RleHQtc2hhZG93Om5vbmU7LXdlYmtpdC11c2VyLXNlbGVjdDpub25lOy1tb3otdXNlci1zZWxlY3Q6bm9uZTstbXMtdXNlci1zZWxlY3Q6bm9uZTt1c2VyLXNlbGVjdDpub25lfS5kZWMtZ2FsbGVyeS13cmFwcGVyIC5jYXJvdXNlbC13cmFwcGVyIC5sZWZ0LXByZXZpb3VzOmhvdmVyLC5kZWMtZ2FsbGVyeS13cmFwcGVyIC5jYXJvdXNlbC13cmFwcGVyIC5yaWdodC1uZXh0OmhvdmVye3RleHQtc2hhZG93OjAgMCA2cHggcmdiYSgwLDAsMCwuMil9LmRlYy1nYWxsZXJ5LXdyYXBwZXIgLmNhcm91c2VsLXdyYXBwZXIgLmxlZnQtcHJldmlvdXMuZGlzYWJsZWQsLmRlYy1nYWxsZXJ5LXdyYXBwZXIgLmNhcm91c2VsLXdyYXBwZXIgLnJpZ2h0LW5leHQuZGlzYWJsZWR7b3BhY2l0eTouNH0uZGVjLWdhbGxlcnktd3JhcHBlciAuY2Fyb3VzZWwtd3JhcHBlciAubGVmdC1wcmV2aW91cy5kaXNhYmxlZDpob3ZlciwuZGVjLWdhbGxlcnktd3JhcHBlciAuY2Fyb3VzZWwtd3JhcHBlciAucmlnaHQtbmV4dC5kaXNhYmxlZDpob3Zlcnt0ZXh0LXNoYWRvdzpub25lfS5kZWMtZ2FsbGVyeS13cmFwcGVyIC5jYXJvdXNlbC13cmFwcGVyIC5sZWZ0LXByZXZpb3Vze2xlZnQ6MH0uZGVjLWdhbGxlcnktd3JhcHBlciAuY2Fyb3VzZWwtd3JhcHBlciAucmlnaHQtbmV4dHtyaWdodDowfWBdXG59KVxuZXhwb3J0IGNsYXNzIERlY0dhbGxlcnlDb21wb25lbnQge1xuXG4gIGltYWdlSGlnaGxpZ2h0OiBhbnk7XG5cbiAgYWN0aXZlSW1hZ2U6IEVsZW1lbnQ7XG5cbiAgaW1nRXh0ZXJuYWxMaW5rOiBzdHJpbmc7XG5cbiAgaXNGaXJzdDogYm9vbGVhbjtcblxuICBpc0xhc3Q6IGJvb2xlYW47XG5cbiAgY2Fyb3VzZWxDb25maWcgPSBDYXJvdXNlbENvbmZpZztcblxuICBpbmRleCA9IDA7XG5cbiAgQElucHV0KClcbiAgc2V0IGltYWdlcyh2YWx1ZTogYW55W10pIHtcblxuICAgIHZhbHVlID0gdmFsdWUgfHwgbmV3IEFycmF5PGFueT4oKTtcblxuICAgIGlmICh2YWx1ZSAmJiAoSlNPTi5zdHJpbmdpZnkodmFsdWUpICE9PSBKU09OLnN0cmluZ2lmeSh0aGlzLl9pbWFnZXMpKSkge1xuXG4gICAgICB0aGlzLmltYWdlSGlnaGxpZ2h0ID0gdmFsdWVbMF07XG5cbiAgICAgIHRoaXMuX2ltYWdlcyA9IHZhbHVlO1xuXG4gICAgICB0aGlzLnNldEV4dGVybmFsTGluaygpO1xuXG4gICAgfVxuXG4gIH1cblxuICBnZXQgaW1hZ2VzKCk6IGFueVtdIHtcblxuICAgIHJldHVybiB0aGlzLl9pbWFnZXM7XG5cbiAgfVxuXG4gIC8vICoqKlVQTE9BRCoqKiAvL1xuICBASW5wdXQoKSBwZXJtaXRVcGxvYWQgPSBmYWxzZTtcblxuICBASW5wdXQoKSByZXNvbHV0aW9uczogc3RyaW5nW10gPSBbXTtcblxuICBAT3V0cHV0KCkgdXBsb2FkZWQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgLy8gKioqRklNIFVQTE9BRCoqKiAvL1xuICBwcml2YXRlIF9pbWFnZXM6IGFueVtdID0gW107XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBvblNlbGVjdEltYWdlID0gKCRldmVudCwgc3lzRmlsZSwgaSkgPT4ge1xuXG4gICAgaWYgKHRoaXMuYWN0aXZlSW1hZ2UgJiYgdGhpcy5hY3RpdmVJbWFnZSAhPT0gJGV2ZW50LnRhcmdldCkge1xuXG4gICAgICB0aGlzLmFjdGl2ZUltYWdlLmNsYXNzTmFtZSA9ICcnO1xuXG4gICAgfVxuXG4gICAgJGV2ZW50LnRhcmdldC5jbGFzc05hbWUgPSAnYWN0aXZlJztcblxuICAgIHRoaXMuYWN0aXZlSW1hZ2UgPSAkZXZlbnQudGFyZ2V0O1xuXG4gICAgdGhpcy5pbWFnZUhpZ2hsaWdodCA9IHN5c0ZpbGU7XG5cbiAgICB0aGlzLmluZGV4ID0gaTtcblxuICAgIHRoaXMuc2V0RXh0ZXJuYWxMaW5rKCk7XG5cbiAgfVxuXG4gIHNldEV4dGVybmFsTGluayA9ICgpID0+IHtcblxuICAgIGlmICh0aGlzLmltYWdlSGlnaGxpZ2h0KSB7XG5cbiAgICAgIHRoaXMuaW1nRXh0ZXJuYWxMaW5rID0gdGhpcy5pbWFnZUhpZ2hsaWdodC5maWxlVXJsO1xuXG4gICAgfVxuXG4gIH1cblxuICBvbkluaXREYXRhRm4oZXZlbnQ6IE5ndUNhcm91c2VsU3RvcmUpIHtcblxuICAgIHRoaXMuc2V0UHJldk5leHRDaGVja2VycyhldmVudC5pc0ZpcnN0LCBldmVudC5pdGVtcyA+PSB0aGlzLmltYWdlcy5sZW5ndGgpO1xuXG4gIH1cblxuICBvbk1vdmVGbihldmVudDogTmd1Q2Fyb3VzZWxTdG9yZSkge1xuXG4gICAgdGhpcy5zZXRQcmV2TmV4dENoZWNrZXJzKGV2ZW50LmlzRmlyc3QsIGV2ZW50LmlzTGFzdCk7XG5cbiAgfVxuXG4gIHNldFByZXZOZXh0Q2hlY2tlcnMoZmlyc3Q6IGJvb2xlYW4sIGxhc3Q6IGJvb2xlYW4pIHtcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuXG4gICAgICB0aGlzLmlzRmlyc3QgPSBmaXJzdDtcblxuICAgICAgdGhpcy5pc0xhc3QgPSBsYXN0O1xuXG4gICAgfSwgMCk7XG5cbiAgfVxuXG4gIHVwbG9hZGVkRnVuY3Rpb24oZXZlbnQpIHtcbiAgICB0aGlzLmltYWdlc1t0aGlzLmluZGV4XSA9IGV2ZW50O1xuICAgIHRoaXMudXBsb2FkZWQuZW1pdCh7XG4gICAgICBzeXNGaWxlOiBldmVudCxcbiAgICAgIGluZGV4OiB0aGlzLmluZGV4XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==