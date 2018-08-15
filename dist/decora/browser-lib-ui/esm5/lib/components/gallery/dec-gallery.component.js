/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { CarouselConfig } from './carousel-config';
var DecGalleryComponent = /** @class */ (function () {
    function DecGalleryComponent() {
        var _this = this;
        this.carouselConfig = CarouselConfig;
        this._images = [];
        this.onSelectImage = function ($event, sysFile) {
            if (_this.activeImage && _this.activeImage !== $event.target) {
                _this.activeImage.className = '';
            }
            $event.target.className = 'active';
            _this.activeImage = $event.target;
            _this.imageHighlight = sysFile;
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
    DecGalleryComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dec-gallery',
                    template: "<div class=\"dec-gallery-wrapper\">\n\n  <div class=\"image-highlighted\">\n      <dec-image-zoom\n        [size]=\"{width: 620, height: 620}\"\n        [systemFile]=\"imageHighlight\">\n      </dec-image-zoom>\n  </div>\n\n  <div class=\"text-right\" *ngIf=\"imgExternalLink\">\n\n    <a href=\"{{ imgExternalLink }}\" target=\"_blank\">{{ 'label.image-link' | translate }}</a>\n\n  </div>\n\n  <ngu-carousel class=\"carousel-wrapper\" [inputs]=\"carouselConfig\" (initData)=\"onInitDataFn($event)\" (onMove)=\"onMoveFn($event)\">\n\n    <ngu-item NguCarouselItem *ngFor=\"let image of images\" [class.active]=\"image == imageHighlight\">\n\n      <img [decImage]=\"image\" [decImageSize]=\"{width:300, height:300}\" (click)=\"onSelectImage($event,image)\">\n\n    </ngu-item>\n\n    <mat-icon NguCarouselPrev class=\"left-previous\" [ngClass]=\"{'disabled': isFirst}\">chevron_left</mat-icon>\n\n    <mat-icon NguCarouselNext class=\"right-next\" [ngClass]=\"{'disabled': isLast}\">chevron_right</mat-icon>\n\n  </ngu-carousel>\n\n</div>\n",
                    styles: [".dec-gallery-wrapper{max-width:624px;overflow:hidden}.dec-gallery-wrapper .image-highlighted{border:2px solid #f5f5f5;width:620px;height:620px}.dec-gallery-wrapper a{font-size:10px;text-decoration:none;color:#929292;cursor:pointer}.dec-gallery-wrapper .carousel-wrapper{margin-top:8px;padding:0 24px;height:128px}.dec-gallery-wrapper .carousel-wrapper ngu-item{display:flex;justify-content:center;align-items:center;height:124px;padding:2px;margin-right:2px}.dec-gallery-wrapper .carousel-wrapper ngu-item.active,.dec-gallery-wrapper .carousel-wrapper ngu-item:hover{padding:0;border:2px solid #232e38}.dec-gallery-wrapper .carousel-wrapper ngu-item img{max-width:124px;cursor:pointer}.dec-gallery-wrapper .carousel-wrapper .left-previous,.dec-gallery-wrapper .carousel-wrapper .right-next{display:block!important;position:absolute;top:calc(50% - 12px);cursor:pointer;text-shadow:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.dec-gallery-wrapper .carousel-wrapper .left-previous:hover,.dec-gallery-wrapper .carousel-wrapper .right-next:hover{text-shadow:0 0 6px rgba(0,0,0,.2)}.dec-gallery-wrapper .carousel-wrapper .left-previous.disabled,.dec-gallery-wrapper .carousel-wrapper .right-next.disabled{opacity:.4}.dec-gallery-wrapper .carousel-wrapper .left-previous.disabled:hover,.dec-gallery-wrapper .carousel-wrapper .right-next.disabled:hover{text-shadow:none}.dec-gallery-wrapper .carousel-wrapper .left-previous{left:0}.dec-gallery-wrapper .carousel-wrapper .right-next{right:0}"]
                },] },
    ];
    /** @nocollapse */
    DecGalleryComponent.ctorParameters = function () { return []; };
    DecGalleryComponent.propDecorators = {
        images: [{ type: Input }]
    };
    return DecGalleryComponent;
}());
export { DecGalleryComponent };
function DecGalleryComponent_tsickle_Closure_declarations() {
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
    DecGalleryComponent.prototype._images;
    /** @type {?} */
    DecGalleryComponent.prototype.onSelectImage;
    /** @type {?} */
    DecGalleryComponent.prototype.setExternalLink;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLWdhbGxlcnkuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL2dhbGxlcnkvZGVjLWdhbGxlcnkuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNqRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7O0lBNkVqRDtRQUFBLGlCQUFpQjs4QkEzQkEsY0FBYzt1QkF5Qk4sRUFBRTs2QkFJWCxVQUFDLE1BQU0sRUFBRSxPQUFPO1lBRTlCLEVBQUUsQ0FBQyxDQUFDLEtBQUksQ0FBQyxXQUFXLElBQUksS0FBSSxDQUFDLFdBQVcsS0FBSyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFFM0QsS0FBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO2FBRWpDO1lBRUQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO1lBRW5DLEtBQUksQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztZQUVqQyxLQUFJLENBQUMsY0FBYyxHQUFHLE9BQU8sQ0FBQztZQUU5QixLQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7U0FFeEI7K0JBRWlCO1lBRWhCLEVBQUUsQ0FBQyxDQUFDLEtBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO2dCQUV4QixLQUFJLENBQUMsZUFBZSxHQUFHLEtBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDO2FBRXBEO1NBRUY7S0E1QmdCO0lBekJqQixzQkFDSSx1Q0FBTTs7OztRQWdCVjtZQUVFLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1NBRXJCOzs7OztRQXJCRCxVQUNXLEtBQVk7WUFFckIsS0FBSyxHQUFHLEtBQUssSUFBSSxJQUFJLEtBQUssRUFBTyxDQUFDO1lBRWxDLEVBQUUsQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEtBQUssSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBRXRFLElBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUUvQixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztnQkFFckIsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO2FBRXhCO1NBRUY7OztPQUFBOzs7OztJQXdDRCwwQ0FBWTs7OztJQUFaLFVBQWEsS0FBdUI7UUFFbEMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBRTVFOzs7OztJQUVELHNDQUFROzs7O0lBQVIsVUFBUyxLQUF1QjtRQUU5QixJQUFJLENBQUMsbUJBQW1CLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7S0FFdkQ7Ozs7OztJQUVELGlEQUFtQjs7Ozs7SUFBbkIsVUFBb0IsS0FBYyxFQUFFLElBQWE7UUFBakQsaUJBVUM7UUFSQyxVQUFVLENBQUM7WUFFVCxLQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztZQUVyQixLQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztTQUVwQixFQUFFLENBQUMsQ0FBQyxDQUFDO0tBRVA7O2dCQTlIRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGFBQWE7b0JBQ3ZCLFFBQVEsRUFBRSxtaENBOEJYO29CQUNDLE1BQU0sRUFBRSxDQUFDLDAvQ0FBMC9DLENBQUM7aUJBQ3JnRDs7Ozs7eUJBZUUsS0FBSzs7OEJBckRSOztTQXVDYSxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDYXJvdXNlbENvbmZpZyB9IGZyb20gJy4vY2Fyb3VzZWwtY29uZmlnJztcbmltcG9ydCB7IE5ndUNhcm91c2VsU3RvcmUgfSBmcm9tICdAbmd1L2Nhcm91c2VsL3NyYy9uZ3UtY2Fyb3VzZWwvbmd1LWNhcm91c2VsLmludGVyZmFjZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1nYWxsZXJ5JyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwiZGVjLWdhbGxlcnktd3JhcHBlclwiPlxuXG4gIDxkaXYgY2xhc3M9XCJpbWFnZS1oaWdobGlnaHRlZFwiPlxuICAgICAgPGRlYy1pbWFnZS16b29tXG4gICAgICAgIFtzaXplXT1cInt3aWR0aDogNjIwLCBoZWlnaHQ6IDYyMH1cIlxuICAgICAgICBbc3lzdGVtRmlsZV09XCJpbWFnZUhpZ2hsaWdodFwiPlxuICAgICAgPC9kZWMtaW1hZ2Utem9vbT5cbiAgPC9kaXY+XG5cbiAgPGRpdiBjbGFzcz1cInRleHQtcmlnaHRcIiAqbmdJZj1cImltZ0V4dGVybmFsTGlua1wiPlxuXG4gICAgPGEgaHJlZj1cInt7IGltZ0V4dGVybmFsTGluayB9fVwiIHRhcmdldD1cIl9ibGFua1wiPnt7ICdsYWJlbC5pbWFnZS1saW5rJyB8IHRyYW5zbGF0ZSB9fTwvYT5cblxuICA8L2Rpdj5cblxuICA8bmd1LWNhcm91c2VsIGNsYXNzPVwiY2Fyb3VzZWwtd3JhcHBlclwiIFtpbnB1dHNdPVwiY2Fyb3VzZWxDb25maWdcIiAoaW5pdERhdGEpPVwib25Jbml0RGF0YUZuKCRldmVudClcIiAob25Nb3ZlKT1cIm9uTW92ZUZuKCRldmVudClcIj5cblxuICAgIDxuZ3UtaXRlbSBOZ3VDYXJvdXNlbEl0ZW0gKm5nRm9yPVwibGV0IGltYWdlIG9mIGltYWdlc1wiIFtjbGFzcy5hY3RpdmVdPVwiaW1hZ2UgPT0gaW1hZ2VIaWdobGlnaHRcIj5cblxuICAgICAgPGltZyBbZGVjSW1hZ2VdPVwiaW1hZ2VcIiBbZGVjSW1hZ2VTaXplXT1cInt3aWR0aDozMDAsIGhlaWdodDozMDB9XCIgKGNsaWNrKT1cIm9uU2VsZWN0SW1hZ2UoJGV2ZW50LGltYWdlKVwiPlxuXG4gICAgPC9uZ3UtaXRlbT5cblxuICAgIDxtYXQtaWNvbiBOZ3VDYXJvdXNlbFByZXYgY2xhc3M9XCJsZWZ0LXByZXZpb3VzXCIgW25nQ2xhc3NdPVwieydkaXNhYmxlZCc6IGlzRmlyc3R9XCI+Y2hldnJvbl9sZWZ0PC9tYXQtaWNvbj5cblxuICAgIDxtYXQtaWNvbiBOZ3VDYXJvdXNlbE5leHQgY2xhc3M9XCJyaWdodC1uZXh0XCIgW25nQ2xhc3NdPVwieydkaXNhYmxlZCc6IGlzTGFzdH1cIj5jaGV2cm9uX3JpZ2h0PC9tYXQtaWNvbj5cblxuICA8L25ndS1jYXJvdXNlbD5cblxuPC9kaXY+XG5gLFxuICBzdHlsZXM6IFtgLmRlYy1nYWxsZXJ5LXdyYXBwZXJ7bWF4LXdpZHRoOjYyNHB4O292ZXJmbG93OmhpZGRlbn0uZGVjLWdhbGxlcnktd3JhcHBlciAuaW1hZ2UtaGlnaGxpZ2h0ZWR7Ym9yZGVyOjJweCBzb2xpZCAjZjVmNWY1O3dpZHRoOjYyMHB4O2hlaWdodDo2MjBweH0uZGVjLWdhbGxlcnktd3JhcHBlciBhe2ZvbnQtc2l6ZToxMHB4O3RleHQtZGVjb3JhdGlvbjpub25lO2NvbG9yOiM5MjkyOTI7Y3Vyc29yOnBvaW50ZXJ9LmRlYy1nYWxsZXJ5LXdyYXBwZXIgLmNhcm91c2VsLXdyYXBwZXJ7bWFyZ2luLXRvcDo4cHg7cGFkZGluZzowIDI0cHg7aGVpZ2h0OjEyOHB4fS5kZWMtZ2FsbGVyeS13cmFwcGVyIC5jYXJvdXNlbC13cmFwcGVyIG5ndS1pdGVte2Rpc3BsYXk6ZmxleDtqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO2FsaWduLWl0ZW1zOmNlbnRlcjtoZWlnaHQ6MTI0cHg7cGFkZGluZzoycHg7bWFyZ2luLXJpZ2h0OjJweH0uZGVjLWdhbGxlcnktd3JhcHBlciAuY2Fyb3VzZWwtd3JhcHBlciBuZ3UtaXRlbS5hY3RpdmUsLmRlYy1nYWxsZXJ5LXdyYXBwZXIgLmNhcm91c2VsLXdyYXBwZXIgbmd1LWl0ZW06aG92ZXJ7cGFkZGluZzowO2JvcmRlcjoycHggc29saWQgIzIzMmUzOH0uZGVjLWdhbGxlcnktd3JhcHBlciAuY2Fyb3VzZWwtd3JhcHBlciBuZ3UtaXRlbSBpbWd7bWF4LXdpZHRoOjEyNHB4O2N1cnNvcjpwb2ludGVyfS5kZWMtZ2FsbGVyeS13cmFwcGVyIC5jYXJvdXNlbC13cmFwcGVyIC5sZWZ0LXByZXZpb3VzLC5kZWMtZ2FsbGVyeS13cmFwcGVyIC5jYXJvdXNlbC13cmFwcGVyIC5yaWdodC1uZXh0e2Rpc3BsYXk6YmxvY2shaW1wb3J0YW50O3Bvc2l0aW9uOmFic29sdXRlO3RvcDpjYWxjKDUwJSAtIDEycHgpO2N1cnNvcjpwb2ludGVyO3RleHQtc2hhZG93Om5vbmU7LXdlYmtpdC11c2VyLXNlbGVjdDpub25lOy1tb3otdXNlci1zZWxlY3Q6bm9uZTstbXMtdXNlci1zZWxlY3Q6bm9uZTt1c2VyLXNlbGVjdDpub25lfS5kZWMtZ2FsbGVyeS13cmFwcGVyIC5jYXJvdXNlbC13cmFwcGVyIC5sZWZ0LXByZXZpb3VzOmhvdmVyLC5kZWMtZ2FsbGVyeS13cmFwcGVyIC5jYXJvdXNlbC13cmFwcGVyIC5yaWdodC1uZXh0OmhvdmVye3RleHQtc2hhZG93OjAgMCA2cHggcmdiYSgwLDAsMCwuMil9LmRlYy1nYWxsZXJ5LXdyYXBwZXIgLmNhcm91c2VsLXdyYXBwZXIgLmxlZnQtcHJldmlvdXMuZGlzYWJsZWQsLmRlYy1nYWxsZXJ5LXdyYXBwZXIgLmNhcm91c2VsLXdyYXBwZXIgLnJpZ2h0LW5leHQuZGlzYWJsZWR7b3BhY2l0eTouNH0uZGVjLWdhbGxlcnktd3JhcHBlciAuY2Fyb3VzZWwtd3JhcHBlciAubGVmdC1wcmV2aW91cy5kaXNhYmxlZDpob3ZlciwuZGVjLWdhbGxlcnktd3JhcHBlciAuY2Fyb3VzZWwtd3JhcHBlciAucmlnaHQtbmV4dC5kaXNhYmxlZDpob3Zlcnt0ZXh0LXNoYWRvdzpub25lfS5kZWMtZ2FsbGVyeS13cmFwcGVyIC5jYXJvdXNlbC13cmFwcGVyIC5sZWZ0LXByZXZpb3Vze2xlZnQ6MH0uZGVjLWdhbGxlcnktd3JhcHBlciAuY2Fyb3VzZWwtd3JhcHBlciAucmlnaHQtbmV4dHtyaWdodDowfWBdXG59KVxuZXhwb3J0IGNsYXNzIERlY0dhbGxlcnlDb21wb25lbnQge1xuXG4gIGltYWdlSGlnaGxpZ2h0OiBhbnk7XG5cbiAgYWN0aXZlSW1hZ2U6IEVsZW1lbnQ7XG5cbiAgaW1nRXh0ZXJuYWxMaW5rOiBzdHJpbmc7XG5cbiAgaXNGaXJzdDogYm9vbGVhbjtcblxuICBpc0xhc3Q6IGJvb2xlYW47XG5cbiAgY2Fyb3VzZWxDb25maWcgPSBDYXJvdXNlbENvbmZpZztcblxuICBASW5wdXQoKVxuICBzZXQgaW1hZ2VzKHZhbHVlOiBhbnlbXSkge1xuXG4gICAgdmFsdWUgPSB2YWx1ZSB8fCBuZXcgQXJyYXk8YW55PigpO1xuXG4gICAgaWYgKHZhbHVlICYmIChKU09OLnN0cmluZ2lmeSh2YWx1ZSkgIT09IEpTT04uc3RyaW5naWZ5KHRoaXMuX2ltYWdlcykpKSB7XG5cbiAgICAgIHRoaXMuaW1hZ2VIaWdobGlnaHQgPSB2YWx1ZVswXTtcblxuICAgICAgdGhpcy5faW1hZ2VzID0gdmFsdWU7XG5cbiAgICAgIHRoaXMuc2V0RXh0ZXJuYWxMaW5rKCk7XG5cbiAgICB9XG5cbiAgfVxuXG4gIGdldCBpbWFnZXMoKTogYW55W10ge1xuXG4gICAgcmV0dXJuIHRoaXMuX2ltYWdlcztcblxuICB9XG5cbiAgcHJpdmF0ZSBfaW1hZ2VzOiBhbnlbXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgb25TZWxlY3RJbWFnZSA9ICgkZXZlbnQsIHN5c0ZpbGUpID0+IHtcblxuICAgIGlmICh0aGlzLmFjdGl2ZUltYWdlICYmIHRoaXMuYWN0aXZlSW1hZ2UgIT09ICRldmVudC50YXJnZXQpIHtcblxuICAgICAgdGhpcy5hY3RpdmVJbWFnZS5jbGFzc05hbWUgPSAnJztcblxuICAgIH1cblxuICAgICRldmVudC50YXJnZXQuY2xhc3NOYW1lID0gJ2FjdGl2ZSc7XG5cbiAgICB0aGlzLmFjdGl2ZUltYWdlID0gJGV2ZW50LnRhcmdldDtcblxuICAgIHRoaXMuaW1hZ2VIaWdobGlnaHQgPSBzeXNGaWxlO1xuXG4gICAgdGhpcy5zZXRFeHRlcm5hbExpbmsoKTtcblxuICB9XG5cbiAgc2V0RXh0ZXJuYWxMaW5rID0gKCkgPT4ge1xuXG4gICAgaWYgKHRoaXMuaW1hZ2VIaWdobGlnaHQpIHtcblxuICAgICAgdGhpcy5pbWdFeHRlcm5hbExpbmsgPSB0aGlzLmltYWdlSGlnaGxpZ2h0LmZpbGVVcmw7XG5cbiAgICB9XG5cbiAgfVxuXG4gIG9uSW5pdERhdGFGbihldmVudDogTmd1Q2Fyb3VzZWxTdG9yZSkge1xuXG4gICAgdGhpcy5zZXRQcmV2TmV4dENoZWNrZXJzKGV2ZW50LmlzRmlyc3QsIGV2ZW50Lml0ZW1zID49IHRoaXMuaW1hZ2VzLmxlbmd0aCk7XG5cbiAgfVxuXG4gIG9uTW92ZUZuKGV2ZW50OiBOZ3VDYXJvdXNlbFN0b3JlKSB7XG5cbiAgICB0aGlzLnNldFByZXZOZXh0Q2hlY2tlcnMoZXZlbnQuaXNGaXJzdCwgZXZlbnQuaXNMYXN0KTtcblxuICB9XG5cbiAgc2V0UHJldk5leHRDaGVja2VycyhmaXJzdDogYm9vbGVhbiwgbGFzdDogYm9vbGVhbikge1xuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG5cbiAgICAgIHRoaXMuaXNGaXJzdCA9IGZpcnN0O1xuXG4gICAgICB0aGlzLmlzTGFzdCA9IGxhc3Q7XG5cbiAgICB9LCAwKTtcblxuICB9XG5cbn1cbiJdfQ==