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
            this.finalImageUrl = this.innerImage.fileBaseUrl + '.' + this.innerImage.extension;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLXpvb20taW1hZ2Utdmlldy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvZGVjLXpvb20taW1hZ2Utdmlldy9kZWMtem9vbS1pbWFnZS12aWV3LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFekQscUJBQU0saUJBQWlCLEdBQUcsK0NBQStDLENBQUE7O0lBeUR2RTs7d0JBbEI0QixPQUFPO2dDQUVFLElBQUk7OEJBRVAsR0FBRzswQkFFTixLQUFLO3lCQUVQLEdBQUc7MEJBRUYsR0FBRztLQVFoQjtJQW5DakIsc0JBQ0ksK0NBQVE7Ozs7O1FBRFosVUFDYSxDQUFDO1lBQ1osRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO2dCQUMxQixJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQztnQkFDcEIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO2FBQ2xCO1NBQ0Y7OztPQUFBO0lBRUQsc0JBQ0kscURBQWM7Ozs7O1FBRGxCLFVBQ21CLENBQUM7WUFDbEIsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDTixJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztnQkFDbkIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO2FBQ2xCO1NBQ0Y7OztPQUFBOzs7O0lBdUJELDRDQUFROzs7SUFBUjtLQUNDOzs7O0lBRUQsNkNBQVM7OztJQUFUO1FBQ0UsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUN0QyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQywwQkFBMEIsRUFBRSxDQUFDO1lBQ25ELElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDO1lBQ25GLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1NBQ3hDO0tBQ0Y7Ozs7SUFFTyw4REFBMEI7Ozs7UUFDaEMsSUFBSSxDQUFDO1lBQ0gsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLElBQUksU0FBUyxDQUFDO1NBQ3JEO1FBQUMsS0FBSyxDQUFDLENBQUMsaUJBQUEsS0FBSyxFQUFFLENBQUM7WUFDZixNQUFNLENBQUMsU0FBUyxDQUFDO1NBQ2xCOzs7Ozs7SUFHSyxnREFBWTs7OztjQUFDLFNBQWM7UUFDakMsTUFBTSxDQUFDLENBQUcsU0FBUyxDQUFDLEtBQUssSUFBSSxDQUFDLFdBQUksU0FBUyxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUUsQ0FBQzs7Ozs7SUFHcEQsaURBQWE7Ozs7UUFDbkIscUJBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQy9DLE1BQU0sQ0FBSSxpQkFBaUIsU0FBSSxJQUFJLFNBQUksSUFBSSxDQUFDLFNBQVcsQ0FBQzs7O2dCQWxGM0QsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxxQkFBcUI7b0JBQy9CLFFBQVEsRUFBRSw2WkFhWDtvQkFDQyxNQUFNLEVBQUUsQ0FBQyxrRUFBa0UsQ0FBQztpQkFDN0U7Ozs7OzJCQUdFLEtBQUs7aUNBUUwsS0FBSzsyQkFTTCxLQUFLO21DQUVMLEtBQUs7aUNBRUwsS0FBSzs2QkFFTCxLQUFLOzRCQUVMLEtBQUs7NkJBRUwsS0FBSzs7b0NBbkRSOztTQXNCYSx5QkFBeUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuY29uc3QgVGh1bWJvclNlcnZlckhvc3QgPSAnaHR0cHM6Ly9jYWNoZS10aHVtYnMuZGVjb3JhY29udGVudC5jb20vdW5zYWZlJ1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtem9vbS1pbWFnZS12aWV3JyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwiaW1hZ2VoaWdobGlnaHQtY29udGFpbmVyXCIgPlxuICAgIDxuZ3gtaW1hZ2Utem9vbSBcbiAgICAgICAgW3RodW1iSW1hZ2VdPVwidGh1bWJJbWFnZVwiXG4gICAgICAgIFtmdWxsSW1hZ2VdPVwiZmluYWxJbWFnZVVybFwiXG4gICAgICAgIFt6b29tTW9kZV09XCJ6b29tTW9kZVwiXG4gICAgICAgIFtlbmFibGVTY3JvbGxab29tXT1cImVuYWJsZVNjcm9sbFpvb21cIlxuICAgICAgICBbc2Nyb2xsU3RlcFNpemVdPVwic2Nyb2xsU3RlcFNpemVcIlxuICAgICAgICBbZW5hYmxlTGVuc109XCJlbmFibGVMZW5zXCJcbiAgICAgICAgW2xlbnNXaWR0aF09XCJsZW5zV2lkdGhcIlxuICAgICAgICBbbGVuc0hlaWdodF09XCJsZW5zSGVpZ2h0XCI+XG4gICAgPC9uZ3gtaW1hZ2Utem9vbT5cbjwvZGl2PlxuXG5gLFxuICBzdHlsZXM6IFtgLmltYWdlaGlnaGxpZ2h0LWNvbnRhaW5lcnt3aWR0aDoxMDAlO2hlaWdodDoxMDAlO2N1cnNvcjp6b29tLWlufWBdXG59KVxuZXhwb3J0IGNsYXNzIERlY1pvb21JbWFnZVZpZXdDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIEBJbnB1dCgpXG4gIHNldCBkZWNJbWFnZSh2KSB7XG4gICAgaWYgKHYgIT09IHRoaXMuaW5uZXJJbWFnZSkge1xuICAgICAgdGhpcy5pbm5lckltYWdlID0gdjtcbiAgICAgIHRoaXMubG9hZEltYWdlKCk7XG4gICAgfVxuICB9XG5cbiAgQElucHV0KCkgXG4gIHNldCB0aHVtYkltYWdlU2l6ZSh2KSB7XG4gICAgaWYgKHYpIHtcbiAgICAgIHRoaXMudGh1bWJTaXplID0gdjtcbiAgICAgIHRoaXMubG9hZEltYWdlKCk7XG4gICAgfVxuICB9XG5cbiAgLy8gaG92ZXIgfCBjbGljayB8IHRvZ2dsZSB8IGhvdmVyLWZyZWV6ZVxuICBASW5wdXQoKSB6b29tTW9kZTogc3RyaW5nID0gJ2NsaWNrJztcblxuICBASW5wdXQoKSBlbmFibGVTY3JvbGxab29tOiBCb29sZWFuID0gdHJ1ZTtcblxuICBASW5wdXQoKSBzY3JvbGxTdGVwU2l6ZTogbnVtYmVyID0gMC4xO1xuXG4gIEBJbnB1dCgpIGVuYWJsZUxlbnM6IEJvb2xlYW4gPSBmYWxzZTtcblxuICBASW5wdXQoKSBsZW5zV2lkdGg6IG51bWJlciA9IDEwMDtcblxuICBASW5wdXQoKSBsZW5zSGVpZ2h0OiBudW1iZXIgPSAxMDA7XG5cbiAgaW5uZXJJbWFnZTogYW55O1xuICBpbWFnZVBhdGg6IGFueTtcbiAgZmluYWxJbWFnZVVybDogYW55O1xuICB0aHVtYkltYWdlOiBhbnk7XG4gIHRodW1iU2l6ZTogYW55O1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxuICBsb2FkSW1hZ2UoKSB7XG4gICAgaWYgKHRoaXMuaW5uZXJJbWFnZSAmJiB0aGlzLnRodW1iU2l6ZSkge1xuICAgICAgdGhpcy5pbWFnZVBhdGggPSB0aGlzLmV4dHJhY3RJbWFnZVVybEZyb21TeXNmaWxlKCk7XG4gICAgICB0aGlzLmZpbmFsSW1hZ2VVcmwgPSB0aGlzLmlubmVySW1hZ2UuZmlsZUJhc2VVcmwgKyAnLicgKyB0aGlzLmlubmVySW1hZ2UuZXh0ZW5zaW9uO1xuICAgICAgdGhpcy50aHVtYkltYWdlID0gdGhpcy5nZXRUaHVtYm9yVXJsKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBleHRyYWN0SW1hZ2VVcmxGcm9tU3lzZmlsZSgpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIHRoaXMuaW5uZXJJbWFnZVsnZmlsZUJhc2VQYXRoJ10gfHwgdW5kZWZpbmVkO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZ2V0SW1hZ2VTaXplKHRodW1iU2l6ZTogYW55KTogc3RyaW5nIHtcbiAgICByZXR1cm4gYCR7dGh1bWJTaXplLndpZHRoIHx8IDB9eCR7dGh1bWJTaXplLmhlaWdodCB8fCAwfWA7XG4gIH1cblxuICBwcml2YXRlIGdldFRodW1ib3JVcmwoKSB7XG4gICAgY29uc3Qgc2l6ZSA9IHRoaXMuZ2V0SW1hZ2VTaXplKHRoaXMudGh1bWJTaXplKTtcbiAgICByZXR1cm4gYCR7VGh1bWJvclNlcnZlckhvc3R9LyR7c2l6ZX0vJHt0aGlzLmltYWdlUGF0aH1gO1xuICB9XG59XG4iXX0=