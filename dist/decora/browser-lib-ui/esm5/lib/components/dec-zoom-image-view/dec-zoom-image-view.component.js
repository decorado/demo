/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input } from '@angular/core';
var /** @type {?} */ ThumborServerHost = 'https://cache-thumbs.decoracontent.com/unsafe';
var DecZoomImageViewComponent = /** @class */ (function () {
    function DecZoomImageViewComponent() {
        // hover | click | toggle | hover-freeze
        this.zoomMode = 'click';
        this.enableScrollZoom = true;
        this.scrollStepSize = 0.1;
        this.enableLens = false;
        this.lensWidth = 100;
        this.lensHeight = 100;
    }
    Object.defineProperty(DecZoomImageViewComponent.prototype, "decImage", {
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            if (v !== this.innerImage) {
                this.innerImage = v;
                this.loadImage();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DecZoomImageViewComponent.prototype, "thumbImageSize", {
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            if (v) {
                this.thumbSize = v;
                this.loadImage();
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    DecZoomImageViewComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    /**
     * @return {?}
     */
    DecZoomImageViewComponent.prototype.loadImage = /**
     * @return {?}
     */
    function () {
        if (this.innerImage && this.thumbSize) {
            this.imagePath = this.extractImageUrlFromSysfile();
            this.finalImageUrl = this.innerImage.fileUrl;
            this.thumbImage = this.getThumborUrl();
        }
    };
    /**
     * @return {?}
     */
    DecZoomImageViewComponent.prototype.extractImageUrlFromSysfile = /**
     * @return {?}
     */
    function () {
        try {
            return this.innerImage['fileBasePath'] || undefined;
        }
        catch (/** @type {?} */ error) {
            return undefined;
        }
    };
    /**
     * @param {?} thumbSize
     * @return {?}
     */
    DecZoomImageViewComponent.prototype.getImageSize = /**
     * @param {?} thumbSize
     * @return {?}
     */
    function (thumbSize) {
        return (thumbSize.width || 0) + "x" + (thumbSize.height || 0);
    };
    /**
     * @return {?}
     */
    DecZoomImageViewComponent.prototype.getThumborUrl = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ size = this.getImageSize(this.thumbSize);
        return ThumborServerHost + "/" + size + "/" + this.imagePath;
    };
    DecZoomImageViewComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dec-zoom-image-view',
                    template: "<div class=\"imagehighlight-container\" >\n    <ngx-image-zoom \n        [thumbImage]=\"thumbImage\"\n        [fullImage]=\"finalImageUrl\"\n        [zoomMode]=\"zoomMode\"\n        [enableScrollZoom]=\"enableScrollZoom\"\n        [scrollStepSize]=\"scrollStepSize\"\n        [enableLens]=\"enableLens\"\n        [lensWidth]=\"lensWidth\"\n        [lensHeight]=\"lensHeight\">\n    </ngx-image-zoom>\n</div>\n\n",
                    styles: [".imagehighlight-container{width:100%;height:100%;cursor:zoom-in}"]
                },] },
    ];
    /** @nocollapse */
    DecZoomImageViewComponent.ctorParameters = function () { return []; };
    DecZoomImageViewComponent.propDecorators = {
        decImage: [{ type: Input }],
        thumbImageSize: [{ type: Input }],
        zoomMode: [{ type: Input }],
        enableScrollZoom: [{ type: Input }],
        scrollStepSize: [{ type: Input }],
        enableLens: [{ type: Input }],
        lensWidth: [{ type: Input }],
        lensHeight: [{ type: Input }]
    };
    return DecZoomImageViewComponent;
}());
export { DecZoomImageViewComponent };
function DecZoomImageViewComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    DecZoomImageViewComponent.prototype.zoomMode;
    /** @type {?} */
    DecZoomImageViewComponent.prototype.enableScrollZoom;
    /** @type {?} */
    DecZoomImageViewComponent.prototype.scrollStepSize;
    /** @type {?} */
    DecZoomImageViewComponent.prototype.enableLens;
    /** @type {?} */
    DecZoomImageViewComponent.prototype.lensWidth;
    /** @type {?} */
    DecZoomImageViewComponent.prototype.lensHeight;
    /** @type {?} */
    DecZoomImageViewComponent.prototype.innerImage;
    /** @type {?} */
    DecZoomImageViewComponent.prototype.imagePath;
    /** @type {?} */
    DecZoomImageViewComponent.prototype.finalImageUrl;
    /** @type {?} */
    DecZoomImageViewComponent.prototype.thumbImage;
    /** @type {?} */
    DecZoomImageViewComponent.prototype.thumbSize;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLXpvb20taW1hZ2Utdmlldy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvZGVjLXpvb20taW1hZ2Utdmlldy9kZWMtem9vbS1pbWFnZS12aWV3LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFekQscUJBQU0saUJBQWlCLEdBQUcsK0NBQStDLENBQUE7O0lBeUR2RTs7d0JBbEI0QixPQUFPO2dDQUVFLElBQUk7OEJBRVAsR0FBRzswQkFFTixLQUFLO3lCQUVQLEdBQUc7MEJBRUYsR0FBRztLQVFoQjtJQW5DakIsc0JBQ0ksK0NBQVE7Ozs7O1FBRFosVUFDYSxDQUFDO1lBQ1osRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO2dCQUMxQixJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQztnQkFDcEIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO2FBQ2xCO1NBQ0Y7OztPQUFBO0lBRUQsc0JBQ0kscURBQWM7Ozs7O1FBRGxCLFVBQ21CLENBQUM7WUFDbEIsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDTixJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztnQkFDbkIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO2FBQ2xCO1NBQ0Y7OztPQUFBOzs7O0lBdUJELDRDQUFROzs7SUFBUjtLQUNDOzs7O0lBRUQsNkNBQVM7OztJQUFUO1FBQ0UsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUN0QyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQywwQkFBMEIsRUFBRSxDQUFDO1lBQ25ELElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUM7WUFDN0MsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7U0FDeEM7S0FDRjs7OztJQUVPLDhEQUEwQjs7OztRQUNoQyxJQUFJLENBQUM7WUFDSCxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsSUFBSSxTQUFTLENBQUM7U0FDckQ7UUFBQyxLQUFLLENBQUMsQ0FBQyxpQkFBQSxLQUFLLEVBQUUsQ0FBQztZQUNmLE1BQU0sQ0FBQyxTQUFTLENBQUM7U0FDbEI7Ozs7OztJQUdLLGdEQUFZOzs7O2NBQUMsU0FBYztRQUNqQyxNQUFNLENBQUMsQ0FBRyxTQUFTLENBQUMsS0FBSyxJQUFJLENBQUMsV0FBSSxTQUFTLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBRSxDQUFDOzs7OztJQUdwRCxpREFBYTs7OztRQUNuQixxQkFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDL0MsTUFBTSxDQUFJLGlCQUFpQixTQUFJLElBQUksU0FBSSxJQUFJLENBQUMsU0FBVyxDQUFDOzs7Z0JBbEYzRCxTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLHFCQUFxQjtvQkFDL0IsUUFBUSxFQUFFLDZaQWFYO29CQUNDLE1BQU0sRUFBRSxDQUFDLGtFQUFrRSxDQUFDO2lCQUM3RTs7Ozs7MkJBR0UsS0FBSztpQ0FRTCxLQUFLOzJCQVNMLEtBQUs7bUNBRUwsS0FBSztpQ0FFTCxLQUFLOzZCQUVMLEtBQUs7NEJBRUwsS0FBSzs2QkFFTCxLQUFLOztvQ0FuRFI7O1NBc0JhLHlCQUF5QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5jb25zdCBUaHVtYm9yU2VydmVySG9zdCA9ICdodHRwczovL2NhY2hlLXRodW1icy5kZWNvcmFjb250ZW50LmNvbS91bnNhZmUnXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy16b29tLWltYWdlLXZpZXcnLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJpbWFnZWhpZ2hsaWdodC1jb250YWluZXJcIiA+XG4gICAgPG5neC1pbWFnZS16b29tIFxuICAgICAgICBbdGh1bWJJbWFnZV09XCJ0aHVtYkltYWdlXCJcbiAgICAgICAgW2Z1bGxJbWFnZV09XCJmaW5hbEltYWdlVXJsXCJcbiAgICAgICAgW3pvb21Nb2RlXT1cInpvb21Nb2RlXCJcbiAgICAgICAgW2VuYWJsZVNjcm9sbFpvb21dPVwiZW5hYmxlU2Nyb2xsWm9vbVwiXG4gICAgICAgIFtzY3JvbGxTdGVwU2l6ZV09XCJzY3JvbGxTdGVwU2l6ZVwiXG4gICAgICAgIFtlbmFibGVMZW5zXT1cImVuYWJsZUxlbnNcIlxuICAgICAgICBbbGVuc1dpZHRoXT1cImxlbnNXaWR0aFwiXG4gICAgICAgIFtsZW5zSGVpZ2h0XT1cImxlbnNIZWlnaHRcIj5cbiAgICA8L25neC1pbWFnZS16b29tPlxuPC9kaXY+XG5cbmAsXG4gIHN0eWxlczogW2AuaW1hZ2VoaWdobGlnaHQtY29udGFpbmVye3dpZHRoOjEwMCU7aGVpZ2h0OjEwMCU7Y3Vyc29yOnpvb20taW59YF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjWm9vbUltYWdlVmlld0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgQElucHV0KClcbiAgc2V0IGRlY0ltYWdlKHYpIHtcbiAgICBpZiAodiAhPT0gdGhpcy5pbm5lckltYWdlKSB7XG4gICAgICB0aGlzLmlubmVySW1hZ2UgPSB2O1xuICAgICAgdGhpcy5sb2FkSW1hZ2UoKTtcbiAgICB9XG4gIH1cblxuICBASW5wdXQoKSBcbiAgc2V0IHRodW1iSW1hZ2VTaXplKHYpIHtcbiAgICBpZiAodikge1xuICAgICAgdGhpcy50aHVtYlNpemUgPSB2O1xuICAgICAgdGhpcy5sb2FkSW1hZ2UoKTtcbiAgICB9XG4gIH1cblxuICAvLyBob3ZlciB8IGNsaWNrIHwgdG9nZ2xlIHwgaG92ZXItZnJlZXplXG4gIEBJbnB1dCgpIHpvb21Nb2RlOiBzdHJpbmcgPSAnY2xpY2snO1xuXG4gIEBJbnB1dCgpIGVuYWJsZVNjcm9sbFpvb206IEJvb2xlYW4gPSB0cnVlO1xuXG4gIEBJbnB1dCgpIHNjcm9sbFN0ZXBTaXplOiBudW1iZXIgPSAwLjE7XG5cbiAgQElucHV0KCkgZW5hYmxlTGVuczogQm9vbGVhbiA9IGZhbHNlO1xuXG4gIEBJbnB1dCgpIGxlbnNXaWR0aDogbnVtYmVyID0gMTAwO1xuXG4gIEBJbnB1dCgpIGxlbnNIZWlnaHQ6IG51bWJlciA9IDEwMDtcblxuICBpbm5lckltYWdlOiBhbnk7XG4gIGltYWdlUGF0aDogYW55O1xuICBmaW5hbEltYWdlVXJsOiBhbnk7XG4gIHRodW1iSW1hZ2U6IGFueTtcbiAgdGh1bWJTaXplOiBhbnk7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG4gIGxvYWRJbWFnZSgpIHtcbiAgICBpZiAodGhpcy5pbm5lckltYWdlICYmIHRoaXMudGh1bWJTaXplKSB7XG4gICAgICB0aGlzLmltYWdlUGF0aCA9IHRoaXMuZXh0cmFjdEltYWdlVXJsRnJvbVN5c2ZpbGUoKTtcbiAgICAgIHRoaXMuZmluYWxJbWFnZVVybCA9IHRoaXMuaW5uZXJJbWFnZS5maWxlVXJsO1xuICAgICAgdGhpcy50aHVtYkltYWdlID0gdGhpcy5nZXRUaHVtYm9yVXJsKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBleHRyYWN0SW1hZ2VVcmxGcm9tU3lzZmlsZSgpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIHRoaXMuaW5uZXJJbWFnZVsnZmlsZUJhc2VQYXRoJ10gfHwgdW5kZWZpbmVkO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZ2V0SW1hZ2VTaXplKHRodW1iU2l6ZTogYW55KTogc3RyaW5nIHtcbiAgICByZXR1cm4gYCR7dGh1bWJTaXplLndpZHRoIHx8IDB9eCR7dGh1bWJTaXplLmhlaWdodCB8fCAwfWA7XG4gIH1cblxuICBwcml2YXRlIGdldFRodW1ib3JVcmwoKSB7XG4gICAgY29uc3Qgc2l6ZSA9IHRoaXMuZ2V0SW1hZ2VTaXplKHRoaXMudGh1bWJTaXplKTtcbiAgICByZXR1cm4gYCR7VGh1bWJvclNlcnZlckhvc3R9LyR7c2l6ZX0vJHt0aGlzLmltYWdlUGF0aH1gO1xuICB9XG59XG4iXX0=