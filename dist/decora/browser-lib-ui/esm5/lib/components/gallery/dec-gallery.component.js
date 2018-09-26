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
                    template: "<div class=\"dec-gallery-wrapper\">\n\n  <div class=\"image-highlighted\">\n    <dec-image-zoom [permitUpload]=\"permitUpload\" (uploaded)=\"uploadedFunction($event)\" [image]=\"imageHighlight\"></dec-image-zoom>\n  </div>\n\n  <ngu-carousel class=\"carousel-wrapper\" [inputs]=\"carouselConfig\" (initData)=\"onInitDataFn($event)\" (onMove)=\"onMoveFn($event)\">\n\n    <ngu-item NguCarouselItem *ngFor=\"let image of images; let i = index;\" [class.active]=\"image == imageHighlight\">\n\n      <img [decImage]=\"image\" [decImageSize]=\"{width:300, height:300}\" (click)=\"onSelectImage($event,image, i)\">\n      <span *ngIf=\"image.order\">{{ 'label.shot-order' | translate }}: {{ image.order }}</span>\n      <span *ngIf=\"image.order && image.size\">{{ 'label.size' | translate }}: {{ image.size}}</span>\n    </ngu-item>\n\n    <mat-icon NguCarouselPrev class=\"left-previous\" [ngClass]=\"{'disabled': isFirst}\">chevron_left</mat-icon>\n\n    <mat-icon NguCarouselNext class=\"right-next\" [ngClass]=\"{'disabled': isLast}\">chevron_right</mat-icon>\n\n  </ngu-carousel>\n\n</div>\n",
                    styles: [".dec-gallery-wrapper{max-width:624px;overflow:hidden}.dec-gallery-wrapper .image-highlighted{border:2px solid #f5f5f5;width:620px;height:620px}.dec-gallery-wrapper a{font-size:10px;text-decoration:none;color:#929292;cursor:pointer}.dec-gallery-wrapper .carousel-wrapper{margin-top:8px;padding:0 24px}.dec-gallery-wrapper .carousel-wrapper ngu-item{display:flex;align-items:center;flex-flow:column}.dec-gallery-wrapper .carousel-wrapper ngu-item.active img,.dec-gallery-wrapper .carousel-wrapper ngu-item:hover img{border:2px solid #232e38}.dec-gallery-wrapper .carousel-wrapper ngu-item img{max-width:124px;border:2px solid transparent;cursor:pointer}.dec-gallery-wrapper .carousel-wrapper .left-previous,.dec-gallery-wrapper .carousel-wrapper .right-next{display:block!important;position:absolute;top:calc(50% - 24px);cursor:pointer;text-shadow:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.dec-gallery-wrapper .carousel-wrapper .left-previous:hover,.dec-gallery-wrapper .carousel-wrapper .right-next:hover{text-shadow:0 0 6px rgba(0,0,0,.2)}.dec-gallery-wrapper .carousel-wrapper .left-previous.disabled,.dec-gallery-wrapper .carousel-wrapper .right-next.disabled{opacity:.4}.dec-gallery-wrapper .carousel-wrapper .left-previous.disabled:hover,.dec-gallery-wrapper .carousel-wrapper .right-next.disabled:hover{text-shadow:none}.dec-gallery-wrapper .carousel-wrapper .left-previous{left:0}.dec-gallery-wrapper .carousel-wrapper .right-next{right:0}"]
                },] },
    ];
    /** @nocollapse */
    DecGalleryComponent.ctorParameters = function () { return []; };
    DecGalleryComponent.propDecorators = {
        images: [{ type: Input }],
        permitUpload: [{ type: Input }],
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
    DecGalleryComponent.prototype.uploaded;
    /** @type {?} */
    DecGalleryComponent.prototype._images;
    /** @type {?} */
    DecGalleryComponent.prototype.onSelectImage;
    /** @type {?} */
    DecGalleryComponent.prototype.setExternalLink;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLWdhbGxlcnkuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL2dhbGxlcnkvZGVjLWdhbGxlcnkuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQzs7SUE0RWpEO1FBQUEsaUJBQWlCOzhCQWxDQSxjQUFjO3FCQUV2QixDQUFDOzs0QkEwQmUsS0FBSzt3QkFDUixJQUFJLFlBQVksRUFBRTt1QkFHZCxFQUFFOzZCQUlYLFVBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxDQUFDO1lBRWpDLEVBQUUsQ0FBQyxDQUFDLEtBQUksQ0FBQyxXQUFXLElBQUksS0FBSSxDQUFDLFdBQVcsS0FBSyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFFM0QsS0FBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO2FBRWpDO1lBRUQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO1lBRW5DLEtBQUksQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztZQUVqQyxLQUFJLENBQUMsY0FBYyxHQUFHLE9BQU8sQ0FBQztZQUU5QixLQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztZQUVmLEtBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztTQUV4QjsrQkFFaUI7WUFFaEIsRUFBRSxDQUFDLENBQUMsS0FBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7Z0JBRXhCLEtBQUksQ0FBQyxlQUFlLEdBQUcsS0FBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUM7YUFFcEQ7U0FFRjtLQTlCZ0I7SUE5QmpCLHNCQUNJLHVDQUFNOzs7O1FBZ0JWO1lBRUUsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7U0FFckI7Ozs7O1FBckJELFVBQ1csS0FBWTtZQUVyQixLQUFLLEdBQUcsS0FBSyxJQUFJLElBQUksS0FBSyxFQUFPLENBQUM7WUFFbEMsRUFBRSxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsS0FBSyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFdEUsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBRS9CLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO2dCQUVyQixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7YUFFeEI7U0FFRjs7O09BQUE7Ozs7O0lBK0NELDBDQUFZOzs7O0lBQVosVUFBYSxLQUF1QjtRQUVsQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7S0FFNUU7Ozs7O0lBRUQsc0NBQVE7Ozs7SUFBUixVQUFTLEtBQXVCO1FBRTlCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUV2RDs7Ozs7O0lBRUQsaURBQW1COzs7OztJQUFuQixVQUFvQixLQUFjLEVBQUUsSUFBYTtRQUFqRCxpQkFVQztRQVJDLFVBQVUsQ0FBQztZQUVULEtBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1lBRXJCLEtBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1NBRXBCLEVBQUUsQ0FBQyxDQUFDLENBQUM7S0FFUDs7Ozs7SUFFRCw4Q0FBZ0I7Ozs7SUFBaEIsVUFBaUIsS0FBSztRQUNwQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxLQUFLLENBQUM7UUFDaEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7WUFDakIsT0FBTyxFQUFFLEtBQUs7WUFDZCxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7U0FDbEIsQ0FBQyxDQUFDO0tBQ0o7O2dCQXZJRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGFBQWE7b0JBQ3ZCLFFBQVEsRUFBRSxza0NBc0JYO29CQUNDLE1BQU0sRUFBRSxDQUFDLHc5Q0FBdzlDLENBQUM7aUJBQ24rQzs7Ozs7eUJBaUJFLEtBQUs7K0JBd0JMLEtBQUs7MkJBQ0wsTUFBTTs7OEJBeEVUOztTQStCYSxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2Fyb3VzZWxDb25maWcgfSBmcm9tICcuL2Nhcm91c2VsLWNvbmZpZyc7XG5pbXBvcnQgeyBOZ3VDYXJvdXNlbFN0b3JlIH0gZnJvbSAnQG5ndS9jYXJvdXNlbC9zcmMvbmd1LWNhcm91c2VsL25ndS1jYXJvdXNlbC5pbnRlcmZhY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtZ2FsbGVyeScsXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cImRlYy1nYWxsZXJ5LXdyYXBwZXJcIj5cblxuICA8ZGl2IGNsYXNzPVwiaW1hZ2UtaGlnaGxpZ2h0ZWRcIj5cbiAgICA8ZGVjLWltYWdlLXpvb20gW3Blcm1pdFVwbG9hZF09XCJwZXJtaXRVcGxvYWRcIiAodXBsb2FkZWQpPVwidXBsb2FkZWRGdW5jdGlvbigkZXZlbnQpXCIgW2ltYWdlXT1cImltYWdlSGlnaGxpZ2h0XCI+PC9kZWMtaW1hZ2Utem9vbT5cbiAgPC9kaXY+XG5cbiAgPG5ndS1jYXJvdXNlbCBjbGFzcz1cImNhcm91c2VsLXdyYXBwZXJcIiBbaW5wdXRzXT1cImNhcm91c2VsQ29uZmlnXCIgKGluaXREYXRhKT1cIm9uSW5pdERhdGFGbigkZXZlbnQpXCIgKG9uTW92ZSk9XCJvbk1vdmVGbigkZXZlbnQpXCI+XG5cbiAgICA8bmd1LWl0ZW0gTmd1Q2Fyb3VzZWxJdGVtICpuZ0Zvcj1cImxldCBpbWFnZSBvZiBpbWFnZXM7IGxldCBpID0gaW5kZXg7XCIgW2NsYXNzLmFjdGl2ZV09XCJpbWFnZSA9PSBpbWFnZUhpZ2hsaWdodFwiPlxuXG4gICAgICA8aW1nIFtkZWNJbWFnZV09XCJpbWFnZVwiIFtkZWNJbWFnZVNpemVdPVwie3dpZHRoOjMwMCwgaGVpZ2h0OjMwMH1cIiAoY2xpY2spPVwib25TZWxlY3RJbWFnZSgkZXZlbnQsaW1hZ2UsIGkpXCI+XG4gICAgICA8c3BhbiAqbmdJZj1cImltYWdlLm9yZGVyXCI+e3sgJ2xhYmVsLnNob3Qtb3JkZXInIHwgdHJhbnNsYXRlIH19OiB7eyBpbWFnZS5vcmRlciB9fTwvc3Bhbj5cbiAgICAgIDxzcGFuICpuZ0lmPVwiaW1hZ2Uub3JkZXIgJiYgaW1hZ2Uuc2l6ZVwiPnt7ICdsYWJlbC5zaXplJyB8IHRyYW5zbGF0ZSB9fToge3sgaW1hZ2Uuc2l6ZX19PC9zcGFuPlxuICAgIDwvbmd1LWl0ZW0+XG5cbiAgICA8bWF0LWljb24gTmd1Q2Fyb3VzZWxQcmV2IGNsYXNzPVwibGVmdC1wcmV2aW91c1wiIFtuZ0NsYXNzXT1cInsnZGlzYWJsZWQnOiBpc0ZpcnN0fVwiPmNoZXZyb25fbGVmdDwvbWF0LWljb24+XG5cbiAgICA8bWF0LWljb24gTmd1Q2Fyb3VzZWxOZXh0IGNsYXNzPVwicmlnaHQtbmV4dFwiIFtuZ0NsYXNzXT1cInsnZGlzYWJsZWQnOiBpc0xhc3R9XCI+Y2hldnJvbl9yaWdodDwvbWF0LWljb24+XG5cbiAgPC9uZ3UtY2Fyb3VzZWw+XG5cbjwvZGl2PlxuYCxcbiAgc3R5bGVzOiBbYC5kZWMtZ2FsbGVyeS13cmFwcGVye21heC13aWR0aDo2MjRweDtvdmVyZmxvdzpoaWRkZW59LmRlYy1nYWxsZXJ5LXdyYXBwZXIgLmltYWdlLWhpZ2hsaWdodGVke2JvcmRlcjoycHggc29saWQgI2Y1ZjVmNTt3aWR0aDo2MjBweDtoZWlnaHQ6NjIwcHh9LmRlYy1nYWxsZXJ5LXdyYXBwZXIgYXtmb250LXNpemU6MTBweDt0ZXh0LWRlY29yYXRpb246bm9uZTtjb2xvcjojOTI5MjkyO2N1cnNvcjpwb2ludGVyfS5kZWMtZ2FsbGVyeS13cmFwcGVyIC5jYXJvdXNlbC13cmFwcGVye21hcmdpbi10b3A6OHB4O3BhZGRpbmc6MCAyNHB4fS5kZWMtZ2FsbGVyeS13cmFwcGVyIC5jYXJvdXNlbC13cmFwcGVyIG5ndS1pdGVte2Rpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpjZW50ZXI7ZmxleC1mbG93OmNvbHVtbn0uZGVjLWdhbGxlcnktd3JhcHBlciAuY2Fyb3VzZWwtd3JhcHBlciBuZ3UtaXRlbS5hY3RpdmUgaW1nLC5kZWMtZ2FsbGVyeS13cmFwcGVyIC5jYXJvdXNlbC13cmFwcGVyIG5ndS1pdGVtOmhvdmVyIGltZ3tib3JkZXI6MnB4IHNvbGlkICMyMzJlMzh9LmRlYy1nYWxsZXJ5LXdyYXBwZXIgLmNhcm91c2VsLXdyYXBwZXIgbmd1LWl0ZW0gaW1ne21heC13aWR0aDoxMjRweDtib3JkZXI6MnB4IHNvbGlkIHRyYW5zcGFyZW50O2N1cnNvcjpwb2ludGVyfS5kZWMtZ2FsbGVyeS13cmFwcGVyIC5jYXJvdXNlbC13cmFwcGVyIC5sZWZ0LXByZXZpb3VzLC5kZWMtZ2FsbGVyeS13cmFwcGVyIC5jYXJvdXNlbC13cmFwcGVyIC5yaWdodC1uZXh0e2Rpc3BsYXk6YmxvY2shaW1wb3J0YW50O3Bvc2l0aW9uOmFic29sdXRlO3RvcDpjYWxjKDUwJSAtIDI0cHgpO2N1cnNvcjpwb2ludGVyO3RleHQtc2hhZG93Om5vbmU7LXdlYmtpdC11c2VyLXNlbGVjdDpub25lOy1tb3otdXNlci1zZWxlY3Q6bm9uZTstbXMtdXNlci1zZWxlY3Q6bm9uZTt1c2VyLXNlbGVjdDpub25lfS5kZWMtZ2FsbGVyeS13cmFwcGVyIC5jYXJvdXNlbC13cmFwcGVyIC5sZWZ0LXByZXZpb3VzOmhvdmVyLC5kZWMtZ2FsbGVyeS13cmFwcGVyIC5jYXJvdXNlbC13cmFwcGVyIC5yaWdodC1uZXh0OmhvdmVye3RleHQtc2hhZG93OjAgMCA2cHggcmdiYSgwLDAsMCwuMil9LmRlYy1nYWxsZXJ5LXdyYXBwZXIgLmNhcm91c2VsLXdyYXBwZXIgLmxlZnQtcHJldmlvdXMuZGlzYWJsZWQsLmRlYy1nYWxsZXJ5LXdyYXBwZXIgLmNhcm91c2VsLXdyYXBwZXIgLnJpZ2h0LW5leHQuZGlzYWJsZWR7b3BhY2l0eTouNH0uZGVjLWdhbGxlcnktd3JhcHBlciAuY2Fyb3VzZWwtd3JhcHBlciAubGVmdC1wcmV2aW91cy5kaXNhYmxlZDpob3ZlciwuZGVjLWdhbGxlcnktd3JhcHBlciAuY2Fyb3VzZWwtd3JhcHBlciAucmlnaHQtbmV4dC5kaXNhYmxlZDpob3Zlcnt0ZXh0LXNoYWRvdzpub25lfS5kZWMtZ2FsbGVyeS13cmFwcGVyIC5jYXJvdXNlbC13cmFwcGVyIC5sZWZ0LXByZXZpb3Vze2xlZnQ6MH0uZGVjLWdhbGxlcnktd3JhcHBlciAuY2Fyb3VzZWwtd3JhcHBlciAucmlnaHQtbmV4dHtyaWdodDowfWBdXG59KVxuZXhwb3J0IGNsYXNzIERlY0dhbGxlcnlDb21wb25lbnQge1xuXG4gIGltYWdlSGlnaGxpZ2h0OiBhbnk7XG5cbiAgYWN0aXZlSW1hZ2U6IEVsZW1lbnQ7XG5cbiAgaW1nRXh0ZXJuYWxMaW5rOiBzdHJpbmc7XG5cbiAgaXNGaXJzdDogYm9vbGVhbjtcblxuICBpc0xhc3Q6IGJvb2xlYW47XG5cbiAgY2Fyb3VzZWxDb25maWcgPSBDYXJvdXNlbENvbmZpZztcblxuICBpbmRleCA9IDA7XG5cbiAgQElucHV0KClcbiAgc2V0IGltYWdlcyh2YWx1ZTogYW55W10pIHtcblxuICAgIHZhbHVlID0gdmFsdWUgfHwgbmV3IEFycmF5PGFueT4oKTtcblxuICAgIGlmICh2YWx1ZSAmJiAoSlNPTi5zdHJpbmdpZnkodmFsdWUpICE9PSBKU09OLnN0cmluZ2lmeSh0aGlzLl9pbWFnZXMpKSkge1xuXG4gICAgICB0aGlzLmltYWdlSGlnaGxpZ2h0ID0gdmFsdWVbMF07XG5cbiAgICAgIHRoaXMuX2ltYWdlcyA9IHZhbHVlO1xuXG4gICAgICB0aGlzLnNldEV4dGVybmFsTGluaygpO1xuXG4gICAgfVxuXG4gIH1cblxuICBnZXQgaW1hZ2VzKCk6IGFueVtdIHtcblxuICAgIHJldHVybiB0aGlzLl9pbWFnZXM7XG5cbiAgfVxuXG4gIC8vICoqKlVQTE9BRCoqKiAvL1xuICBASW5wdXQoKSBwZXJtaXRVcGxvYWQgPSBmYWxzZTtcbiAgQE91dHB1dCgpIHVwbG9hZGVkID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIC8vICoqKkZJTSBVUExPQUQqKiogLy9cbiAgcHJpdmF0ZSBfaW1hZ2VzOiBhbnlbXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgb25TZWxlY3RJbWFnZSA9ICgkZXZlbnQsIHN5c0ZpbGUsIGkpID0+IHtcblxuICAgIGlmICh0aGlzLmFjdGl2ZUltYWdlICYmIHRoaXMuYWN0aXZlSW1hZ2UgIT09ICRldmVudC50YXJnZXQpIHtcblxuICAgICAgdGhpcy5hY3RpdmVJbWFnZS5jbGFzc05hbWUgPSAnJztcblxuICAgIH1cblxuICAgICRldmVudC50YXJnZXQuY2xhc3NOYW1lID0gJ2FjdGl2ZSc7XG5cbiAgICB0aGlzLmFjdGl2ZUltYWdlID0gJGV2ZW50LnRhcmdldDtcblxuICAgIHRoaXMuaW1hZ2VIaWdobGlnaHQgPSBzeXNGaWxlO1xuXG4gICAgdGhpcy5pbmRleCA9IGk7XG5cbiAgICB0aGlzLnNldEV4dGVybmFsTGluaygpO1xuXG4gIH1cblxuICBzZXRFeHRlcm5hbExpbmsgPSAoKSA9PiB7XG5cbiAgICBpZiAodGhpcy5pbWFnZUhpZ2hsaWdodCkge1xuXG4gICAgICB0aGlzLmltZ0V4dGVybmFsTGluayA9IHRoaXMuaW1hZ2VIaWdobGlnaHQuZmlsZVVybDtcblxuICAgIH1cblxuICB9XG5cbiAgb25Jbml0RGF0YUZuKGV2ZW50OiBOZ3VDYXJvdXNlbFN0b3JlKSB7XG5cbiAgICB0aGlzLnNldFByZXZOZXh0Q2hlY2tlcnMoZXZlbnQuaXNGaXJzdCwgZXZlbnQuaXRlbXMgPj0gdGhpcy5pbWFnZXMubGVuZ3RoKTtcblxuICB9XG5cbiAgb25Nb3ZlRm4oZXZlbnQ6IE5ndUNhcm91c2VsU3RvcmUpIHtcblxuICAgIHRoaXMuc2V0UHJldk5leHRDaGVja2VycyhldmVudC5pc0ZpcnN0LCBldmVudC5pc0xhc3QpO1xuXG4gIH1cblxuICBzZXRQcmV2TmV4dENoZWNrZXJzKGZpcnN0OiBib29sZWFuLCBsYXN0OiBib29sZWFuKSB7XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcblxuICAgICAgdGhpcy5pc0ZpcnN0ID0gZmlyc3Q7XG5cbiAgICAgIHRoaXMuaXNMYXN0ID0gbGFzdDtcblxuICAgIH0sIDApO1xuXG4gIH1cblxuICB1cGxvYWRlZEZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgdGhpcy5pbWFnZXNbdGhpcy5pbmRleF0gPSBldmVudDtcbiAgICB0aGlzLnVwbG9hZGVkLmVtaXQoe1xuICAgICAgc3lzRmlsZTogZXZlbnQsXG4gICAgICBpbmRleDogdGhpcy5pbmRleFxuICAgIH0pO1xuICB9XG59XG4iXX0=