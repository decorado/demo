/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Directive, Input, ViewContainerRef } from '@angular/core';
import { TransparentImage, ThumborServerHost, ErrorImage, S3Host } from './image.directive.constants';
var DecImageDirective = /** @class */ (function () {
    function DecImageDirective(viewContainerRef) {
        this.viewContainerRef = viewContainerRef;
        this.errorOnLoad = false;
        // Ged redimensioned image from thumbor image resize service
        this.thumborize = true;
        this.innerImage = TransparentImage;
    }
    Object.defineProperty(DecImageDirective.prototype, "decImage", {
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            if (v !== this.innerImage) {
                this.innerImage = v;
                if (this.viewInitialized) {
                    this.loadImage();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    DecImageDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.detectContainerElement();
        this.setElementWidth();
    };
    /**
     * @return {?}
     */
    DecImageDirective.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        setTimeout(function () {
            _this.viewInitialized = true;
            _this.loadImage();
        });
    };
    /**
     * @return {?}
     */
    DecImageDirective.prototype.detectContainerElement = /**
     * @return {?}
     */
    function () {
        this.containerElement = this.viewContainerRef.element.nativeElement;
        this.containerElementType = this.containerElement.tagName === 'IMG' ? 'IMG' : 'NOT-IMG';
    };
    /**
     * @return {?}
     */
    DecImageDirective.prototype.loadImage = /**
     * @return {?}
     */
    function () {
        if (typeof this.innerImage === 'string') {
            this.finalImageUrl = this.innerImage;
        }
        else {
            this.imagePath = this.extractImageUrlFromSysfile();
            if (this.imagePath) {
                this.finalImageUrl = this.getFinalUrl();
            }
            else {
                this.finalImageUrl = ErrorImage;
            }
        }
        this.tryToLoadImage();
    };
    /**
     * @return {?}
     */
    DecImageDirective.prototype.extractImageUrlFromSysfile = /**
     * @return {?}
     */
    function () {
        try {
            return this.innerImage['fileBasePath'] || undefined;
        }
        catch (error) {
            return undefined;
        }
    };
    /**
     * @return {?}
     */
    DecImageDirective.prototype.getFinalUrl = /**
     * @return {?}
     */
    function () {
        if (this.thumborize) {
            return this.getThumborUrl();
        }
        else {
            return this.getS3Url();
        }
    };
    /**
     * @return {?}
     */
    DecImageDirective.prototype.getS3Url = /**
     * @return {?}
     */
    function () {
        return S3Host + "/" + this.imagePath;
    };
    /**
     * @return {?}
     */
    DecImageDirective.prototype.getThumborUrl = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var size = this.getImageSize(this.decImageSize);
        /** @type {?} */
        var aspect = this.getAspect();
        /** @type {?} */
        var trim = this.getTrim();
        return ThumborServerHost + "/" + size + aspect + trim + "/" + this.imagePath;
    };
    /**
     * @param {?=} decImageSize
     * @return {?}
     */
    DecImageDirective.prototype.getImageSize = /**
     * @param {?=} decImageSize
     * @return {?}
     */
    function (decImageSize) {
        if (decImageSize === void 0) { decImageSize = {}; }
        /** @type {?} */
        var containerWidth = this.containerElement.offsetWidth;
        if (decImageSize.width && decImageSize.height) {
            return (decImageSize.width || 0) + "x" + (decImageSize.height || 0);
        }
        switch (true) {
            case containerWidth < 300:
                return "300x300";
            case containerWidth < 600:
                return "600x600";
            case containerWidth < 900:
                return "900x900";
            case containerWidth < 1200:
                return "1200x1200";
            case containerWidth < 1500:
                return "1500x1500";
            case containerWidth < 1800:
                return "1800x1800";
            default:
                return "2000x2000";
        }
    };
    /**
     * @return {?}
     */
    DecImageDirective.prototype.getAspect = /**
     * @return {?}
     */
    function () {
        return this.fitIn ? '/fit-in' : '';
    };
    /**
     * @return {?}
     */
    DecImageDirective.prototype.getTrim = /**
     * @return {?}
     */
    function () {
        return this.trim ? '/trim' : '';
    };
    /**
     * @return {?}
     */
    DecImageDirective.prototype.tryToLoadImage = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var downloadingImage = new Image();
        downloadingImage.onload = function () {
            _this.createImage();
        };
        downloadingImage.onerror = function () {
            _this.finalImageUrl = ErrorImage;
            _this.createImage();
        };
        downloadingImage.src = this.finalImageUrl;
    };
    /**
     * @return {?}
     */
    DecImageDirective.prototype.createImage = /**
     * @return {?}
     */
    function () {
        if (this.containerElementType === 'IMG') {
            this.setImageelementSrc();
        }
        else {
            this.appendImageToBg();
        }
    };
    /**
     * @return {?}
     */
    DecImageDirective.prototype.appendImageToBg = /**
     * @return {?}
     */
    function () {
        this.containerElement.style.backgroundImage = 'url(' + this.finalImageUrl + ')';
        this.containerElement.classList.remove('dec-image-bg-loading');
    };
    /**
     * @return {?}
     */
    DecImageDirective.prototype.setImageelementSrc = /**
     * @return {?}
     */
    function () {
        this.containerElement.setAttribute('src', this.finalImageUrl);
    };
    /**
     * @return {?}
     */
    DecImageDirective.prototype.setElementWidth = /**
     * @return {?}
     */
    function () {
        if (this.containerElementType === 'IMG') {
            this.containerElement.setAttribute('width', '100%');
            this.containerElement.setAttribute('max-width', '100%');
        }
        else {
            this.containerElement.style.backgroundSize = '100%';
            this.containerElement.style.backgroundPosition = 'center';
            this.containerElement.style.backgroundRepeat = 'no-repeat';
        }
    };
    DecImageDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[decImage]'
                },] },
    ];
    /** @nocollapse */
    DecImageDirective.ctorParameters = function () { return [
        { type: ViewContainerRef }
    ]; };
    DecImageDirective.propDecorators = {
        decImage: [{ type: Input }],
        decImageSize: [{ type: Input }],
        trim: [{ type: Input }],
        fitIn: [{ type: Input }],
        thumborize: [{ type: Input }]
    };
    return DecImageDirective;
}());
export { DecImageDirective };
if (false) {
    /** @type {?} */
    DecImageDirective.prototype.containerElement;
    /** @type {?} */
    DecImageDirective.prototype.errorOnLoad;
    /** @type {?} */
    DecImageDirective.prototype.decImageSize;
    /** @type {?} */
    DecImageDirective.prototype.trim;
    /** @type {?} */
    DecImageDirective.prototype.fitIn;
    /** @type {?} */
    DecImageDirective.prototype.thumborize;
    /** @type {?} */
    DecImageDirective.prototype.containerElementType;
    /** @type {?} */
    DecImageDirective.prototype.innerImage;
    /** @type {?} */
    DecImageDirective.prototype.imagePath;
    /** @type {?} */
    DecImageDirective.prototype.finalImageUrl;
    /** @type {?} */
    DecImageDirective.prototype.viewInitialized;
    /** @type {?} */
    DecImageDirective.prototype.viewContainerRef;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2UuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS8iLCJzb3VyY2VzIjpbImxpYi9kaXJlY3RpdmVzL2ltYWdlL2ltYWdlLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsZ0JBQWdCLEVBQXlCLE1BQU0sZUFBZSxDQUFDO0FBRTFGLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxpQkFBaUIsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7O0lBMkNwRywyQkFBb0IsZ0JBQWtDO1FBQWxDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7MkJBbEN4QyxLQUFLOzswQkFzQkcsSUFBSTswQkFJbUIsZ0JBQWdCO0tBUUY7SUFoQzNELHNCQUNJLHVDQUFROzs7OztRQURaLFVBQ2EsQ0FBeUI7WUFDcEMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO2dCQUMxQixJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQztnQkFFcEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7b0JBQ3pCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztpQkFDbEI7YUFDRjtTQUNGOzs7T0FBQTs7OztJQXlCRCxvQ0FBUTs7O0lBQVI7UUFDRSxJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztRQUM5QixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7S0FDeEI7Ozs7SUFFRCwyQ0FBZTs7O0lBQWY7UUFBQSxpQkFLQztRQUpDLFVBQVUsQ0FBQztZQUNULEtBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO1lBQzVCLEtBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztTQUNsQixDQUFDLENBQUM7S0FDSjs7OztJQUVPLGtEQUFzQjs7OztRQUM1QixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUM7UUFDcEUsSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQzs7Ozs7SUFHbEYscUNBQVM7Ozs7UUFFZixFQUFFLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxVQUFVLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztZQUV4QyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7U0FFdEM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUVOLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLDBCQUEwQixFQUFFLENBQUM7WUFFbkQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBRW5CLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO2FBRXpDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBRU4sSUFBSSxDQUFDLGFBQWEsR0FBRyxVQUFVLENBQUM7YUFFakM7U0FFRjtRQUVELElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQzs7Ozs7SUFJaEIsc0RBQTBCOzs7O1FBQ2hDLElBQUksQ0FBQztZQUNILE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxJQUFJLFNBQVMsQ0FBQztTQUNyRDtRQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2YsTUFBTSxDQUFDLFNBQVMsQ0FBQztTQUNsQjs7Ozs7SUFHSyx1Q0FBVzs7OztRQUVqQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUVwQixNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1NBRTdCO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFFTixNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBRXhCOzs7OztJQUlLLG9DQUFROzs7O1FBQ2QsTUFBTSxDQUFJLE1BQU0sU0FBSSxJQUFJLENBQUMsU0FBVyxDQUFDOzs7OztJQUcvQix5Q0FBYTs7Ozs7UUFDbkIsSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7O1FBQ2xELElBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQzs7UUFDaEMsSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQzVCLE1BQU0sQ0FBSSxpQkFBaUIsU0FBSSxJQUFJLEdBQUcsTUFBTSxHQUFHLElBQUksU0FBSSxJQUFJLENBQUMsU0FBVyxDQUFDOzs7Ozs7SUFHbEUsd0NBQVk7Ozs7Y0FBQyxZQUErQjtRQUEvQiw2QkFBQSxFQUFBLGlCQUErQjs7UUFFbEQsSUFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQztRQUV6RCxFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsS0FBSyxJQUFJLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQzlDLE1BQU0sQ0FBQyxDQUFHLFlBQVksQ0FBQyxLQUFLLElBQUksQ0FBQyxXQUFJLFlBQVksQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFFLENBQUM7U0FDakU7UUFFRCxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ2IsS0FBSyxjQUFjLEdBQUcsR0FBRztnQkFDdkIsTUFBTSxDQUFDLFNBQVMsQ0FBQztZQUNuQixLQUFLLGNBQWMsR0FBRyxHQUFHO2dCQUN2QixNQUFNLENBQUMsU0FBUyxDQUFDO1lBQ25CLEtBQUssY0FBYyxHQUFHLEdBQUc7Z0JBQ3ZCLE1BQU0sQ0FBQyxTQUFTLENBQUM7WUFDbkIsS0FBSyxjQUFjLEdBQUcsSUFBSTtnQkFDeEIsTUFBTSxDQUFDLFdBQVcsQ0FBQztZQUNyQixLQUFLLGNBQWMsR0FBRyxJQUFJO2dCQUN4QixNQUFNLENBQUMsV0FBVyxDQUFDO1lBQ3JCLEtBQUssY0FBYyxHQUFHLElBQUk7Z0JBQ3hCLE1BQU0sQ0FBQyxXQUFXLENBQUM7WUFDckI7Z0JBQ0UsTUFBTSxDQUFDLFdBQVcsQ0FBQztTQUN0Qjs7Ozs7SUFHSyxxQ0FBUzs7OztRQUNmLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQzs7Ozs7SUFHN0IsbUNBQU87Ozs7UUFDYixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7Ozs7O0lBRzFCLDBDQUFjOzs7Ozs7UUFDcEIsSUFBTSxnQkFBZ0IsR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFDO1FBQ3JDLGdCQUFnQixDQUFDLE1BQU0sR0FBRztZQUN4QixLQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDcEIsQ0FBQztRQUVGLGdCQUFnQixDQUFDLE9BQU8sR0FBRztZQUN6QixLQUFJLENBQUMsYUFBYSxHQUFHLFVBQVUsQ0FBQztZQUNoQyxLQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDcEIsQ0FBQztRQUVGLGdCQUFnQixDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDOzs7OztJQUdwQyx1Q0FBVzs7OztRQUNqQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQztZQUN4QyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztTQUMzQjtRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1NBQ3hCOzs7OztJQUdLLDJDQUFlOzs7O1FBQ3JCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsZUFBZSxHQUFHLE1BQU0sR0FBRyxJQUFJLENBQUMsYUFBYSxHQUFHLEdBQUcsQ0FBQztRQUNoRixJQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDOzs7OztJQUd6RCw4Q0FBa0I7Ozs7UUFDeEIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDOzs7OztJQUd4RCwyQ0FBZTs7OztRQUNyQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQztZQUN4QyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQztZQUNwRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsQ0FBQztTQUN6RDtRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxjQUFjLEdBQUcsTUFBTSxDQUFDO1lBQ3BELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsa0JBQWtCLEdBQUcsUUFBUSxDQUFDO1lBQzFELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLEdBQUcsV0FBVyxDQUFDO1NBQzVEOzs7Z0JBaE1KLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsWUFBWTtpQkFDdkI7Ozs7Z0JBTjBCLGdCQUFnQjs7OzJCQWF4QyxLQUFLOytCQVdMLEtBQUs7dUJBR0wsS0FBSzt3QkFHTCxLQUFLOzZCQUdMLEtBQUs7OzRCQWpDUjs7U0FPYSxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0LCBWaWV3Q29udGFpbmVyUmVmLCBBZnRlclZpZXdJbml0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERlY0ltYWdlU2l6ZSwgU3lzdGVtRmlsZUtleSB9IGZyb20gJy4vaW1hZ2UuZGlyZWN0aXZlLm1vZGVscyc7XG5pbXBvcnQgeyBUcmFuc3BhcmVudEltYWdlLCBUaHVtYm9yU2VydmVySG9zdCwgRXJyb3JJbWFnZSwgUzNIb3N0IH0gZnJvbSAnLi9pbWFnZS5kaXJlY3RpdmUuY29uc3RhbnRzJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2RlY0ltYWdlXSdcbn0pXG5leHBvcnQgY2xhc3MgRGVjSW1hZ2VEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQge1xuXG4gIGNvbnRhaW5lckVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuXG4gIGVycm9yT25Mb2FkID0gZmFsc2U7XG5cbiAgQElucHV0KClcbiAgc2V0IGRlY0ltYWdlKHY6IFN5c3RlbUZpbGVLZXkgfCBzdHJpbmcpIHtcbiAgICBpZiAodiAhPT0gdGhpcy5pbm5lckltYWdlKSB7XG4gICAgICB0aGlzLmlubmVySW1hZ2UgPSB2O1xuXG4gICAgICBpZiAodGhpcy52aWV3SW5pdGlhbGl6ZWQpIHtcbiAgICAgICAgdGhpcy5sb2FkSW1hZ2UoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBASW5wdXQoKSBkZWNJbWFnZVNpemU6IERlY0ltYWdlU2l6ZTtcblxuICAvLyBEZWZpbmVzIGlmIHdoaXRlIG1hcmdpbnMgc2hvdWxkIGJlIGNyb3BwZWRcbiAgQElucHV0KCkgdHJpbTogYm9vbGVhbjtcblxuICAvLyBEZWZpbmVzIGlmIHRoZSBpbWFnZSBzaG91bGQgYmUgY3JvcHBlZCBvciBmaXQgdGhlIHNpemUgcmVzcGVjdGluIHRoZSBhc3BlY3QgcmF0aW9cbiAgQElucHV0KCkgZml0SW46IGJvb2xlYW47XG5cbiAgLy8gR2VkIHJlZGltZW5zaW9uZWQgaW1hZ2UgZnJvbSB0aHVtYm9yIGltYWdlIHJlc2l6ZSBzZXJ2aWNlXG4gIEBJbnB1dCgpIHRodW1ib3JpemUgPSB0cnVlO1xuXG4gIHByaXZhdGUgY29udGFpbmVyRWxlbWVudFR5cGU6ICdJTUcnIHwgJ05PVC1JTUcnO1xuXG4gIHByaXZhdGUgaW5uZXJJbWFnZTogU3lzdGVtRmlsZUtleSB8IHN0cmluZyA9IFRyYW5zcGFyZW50SW1hZ2U7XG5cbiAgcHJpdmF0ZSBpbWFnZVBhdGg6IHN0cmluZztcblxuICBwcml2YXRlIGZpbmFsSW1hZ2VVcmw6IHN0cmluZztcblxuICBwcml2YXRlIHZpZXdJbml0aWFsaXplZDogYm9vbGVhbjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuZGV0ZWN0Q29udGFpbmVyRWxlbWVudCgpO1xuICAgIHRoaXMuc2V0RWxlbWVudFdpZHRoKCk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLnZpZXdJbml0aWFsaXplZCA9IHRydWU7XG4gICAgICB0aGlzLmxvYWRJbWFnZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBkZXRlY3RDb250YWluZXJFbGVtZW50KCkge1xuICAgIHRoaXMuY29udGFpbmVyRWxlbWVudCA9IHRoaXMudmlld0NvbnRhaW5lclJlZi5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XG4gICAgdGhpcy5jb250YWluZXJFbGVtZW50VHlwZSA9IHRoaXMuY29udGFpbmVyRWxlbWVudC50YWdOYW1lID09PSAnSU1HJyA/ICdJTUcnIDogJ05PVC1JTUcnO1xuICB9XG5cbiAgcHJpdmF0ZSBsb2FkSW1hZ2UoKSB7XG5cbiAgICBpZiAodHlwZW9mIHRoaXMuaW5uZXJJbWFnZSA9PT0gJ3N0cmluZycpIHtcblxuICAgICAgdGhpcy5maW5hbEltYWdlVXJsID0gdGhpcy5pbm5lckltYWdlO1xuXG4gICAgfSBlbHNlIHtcblxuICAgICAgdGhpcy5pbWFnZVBhdGggPSB0aGlzLmV4dHJhY3RJbWFnZVVybEZyb21TeXNmaWxlKCk7XG5cbiAgICAgIGlmICh0aGlzLmltYWdlUGF0aCkge1xuXG4gICAgICAgIHRoaXMuZmluYWxJbWFnZVVybCA9IHRoaXMuZ2V0RmluYWxVcmwoKTtcblxuICAgICAgfSBlbHNlIHtcblxuICAgICAgICB0aGlzLmZpbmFsSW1hZ2VVcmwgPSBFcnJvckltYWdlO1xuXG4gICAgICB9XG5cbiAgICB9XG5cbiAgICB0aGlzLnRyeVRvTG9hZEltYWdlKCk7XG5cbiAgfVxuXG4gIHByaXZhdGUgZXh0cmFjdEltYWdlVXJsRnJvbVN5c2ZpbGUoKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiB0aGlzLmlubmVySW1hZ2VbJ2ZpbGVCYXNlUGF0aCddIHx8IHVuZGVmaW5lZDtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGdldEZpbmFsVXJsKCkge1xuXG4gICAgaWYgKHRoaXMudGh1bWJvcml6ZSkge1xuXG4gICAgICByZXR1cm4gdGhpcy5nZXRUaHVtYm9yVXJsKCk7XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICByZXR1cm4gdGhpcy5nZXRTM1VybCgpO1xuXG4gICAgfVxuXG4gIH1cblxuICBwcml2YXRlIGdldFMzVXJsKCkge1xuICAgIHJldHVybiBgJHtTM0hvc3R9LyR7dGhpcy5pbWFnZVBhdGh9YDtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0VGh1bWJvclVybCgpIHtcbiAgICBjb25zdCBzaXplID0gdGhpcy5nZXRJbWFnZVNpemUodGhpcy5kZWNJbWFnZVNpemUpO1xuICAgIGNvbnN0IGFzcGVjdCA9IHRoaXMuZ2V0QXNwZWN0KCk7XG4gICAgY29uc3QgdHJpbSA9IHRoaXMuZ2V0VHJpbSgpO1xuICAgIHJldHVybiBgJHtUaHVtYm9yU2VydmVySG9zdH0vJHtzaXplfSR7YXNwZWN0fSR7dHJpbX0vJHt0aGlzLmltYWdlUGF0aH1gO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRJbWFnZVNpemUoZGVjSW1hZ2VTaXplOiBEZWNJbWFnZVNpemUgPSB7fSk6IHN0cmluZyB7XG5cbiAgICBjb25zdCBjb250YWluZXJXaWR0aCA9IHRoaXMuY29udGFpbmVyRWxlbWVudC5vZmZzZXRXaWR0aDtcblxuICAgIGlmIChkZWNJbWFnZVNpemUud2lkdGggJiYgZGVjSW1hZ2VTaXplLmhlaWdodCkge1xuICAgICAgcmV0dXJuIGAke2RlY0ltYWdlU2l6ZS53aWR0aCB8fCAwfXgke2RlY0ltYWdlU2l6ZS5oZWlnaHQgfHwgMH1gO1xuICAgIH1cblxuICAgIHN3aXRjaCAodHJ1ZSkge1xuICAgICAgY2FzZSBjb250YWluZXJXaWR0aCA8IDMwMDpcbiAgICAgICAgcmV0dXJuIGAzMDB4MzAwYDtcbiAgICAgIGNhc2UgY29udGFpbmVyV2lkdGggPCA2MDA6XG4gICAgICAgIHJldHVybiBgNjAweDYwMGA7XG4gICAgICBjYXNlIGNvbnRhaW5lcldpZHRoIDwgOTAwOlxuICAgICAgICByZXR1cm4gYDkwMHg5MDBgO1xuICAgICAgY2FzZSBjb250YWluZXJXaWR0aCA8IDEyMDA6XG4gICAgICAgIHJldHVybiBgMTIwMHgxMjAwYDtcbiAgICAgIGNhc2UgY29udGFpbmVyV2lkdGggPCAxNTAwOlxuICAgICAgICByZXR1cm4gYDE1MDB4MTUwMGA7XG4gICAgICBjYXNlIGNvbnRhaW5lcldpZHRoIDwgMTgwMDpcbiAgICAgICAgcmV0dXJuIGAxODAweDE4MDBgO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIGAyMDAweDIwMDBgO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZ2V0QXNwZWN0KCkge1xuICAgIHJldHVybiB0aGlzLmZpdEluID8gJy9maXQtaW4nIDogJyc7XG4gIH1cblxuICBwcml2YXRlIGdldFRyaW0oKSB7XG4gICAgcmV0dXJuIHRoaXMudHJpbSA/ICcvdHJpbScgOiAnJztcbiAgfVxuXG4gIHByaXZhdGUgdHJ5VG9Mb2FkSW1hZ2UoKSB7XG4gICAgY29uc3QgZG93bmxvYWRpbmdJbWFnZSA9IG5ldyBJbWFnZSgpO1xuICAgIGRvd25sb2FkaW5nSW1hZ2Uub25sb2FkID0gKCkgPT4ge1xuICAgICAgdGhpcy5jcmVhdGVJbWFnZSgpO1xuICAgIH07XG5cbiAgICBkb3dubG9hZGluZ0ltYWdlLm9uZXJyb3IgPSAoKSA9PiB7XG4gICAgICB0aGlzLmZpbmFsSW1hZ2VVcmwgPSBFcnJvckltYWdlO1xuICAgICAgdGhpcy5jcmVhdGVJbWFnZSgpO1xuICAgIH07XG5cbiAgICBkb3dubG9hZGluZ0ltYWdlLnNyYyA9IHRoaXMuZmluYWxJbWFnZVVybDtcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlSW1hZ2UoKSB7XG4gICAgaWYgKHRoaXMuY29udGFpbmVyRWxlbWVudFR5cGUgPT09ICdJTUcnKSB7XG4gICAgICB0aGlzLnNldEltYWdlZWxlbWVudFNyYygpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFwcGVuZEltYWdlVG9CZygpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYXBwZW5kSW1hZ2VUb0JnKCkge1xuICAgIHRoaXMuY29udGFpbmVyRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSAndXJsKCcgKyB0aGlzLmZpbmFsSW1hZ2VVcmwgKyAnKSc7XG4gICAgdGhpcy5jb250YWluZXJFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2RlYy1pbWFnZS1iZy1sb2FkaW5nJyk7XG4gIH1cblxuICBwcml2YXRlIHNldEltYWdlZWxlbWVudFNyYygpIHtcbiAgICB0aGlzLmNvbnRhaW5lckVsZW1lbnQuc2V0QXR0cmlidXRlKCdzcmMnLCB0aGlzLmZpbmFsSW1hZ2VVcmwpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRFbGVtZW50V2lkdGgoKSB7XG4gICAgaWYgKHRoaXMuY29udGFpbmVyRWxlbWVudFR5cGUgPT09ICdJTUcnKSB7XG4gICAgICB0aGlzLmNvbnRhaW5lckVsZW1lbnQuc2V0QXR0cmlidXRlKCd3aWR0aCcsICcxMDAlJyk7XG4gICAgICB0aGlzLmNvbnRhaW5lckVsZW1lbnQuc2V0QXR0cmlidXRlKCdtYXgtd2lkdGgnLCAnMTAwJScpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNvbnRhaW5lckVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZFNpemUgPSAnMTAwJSc7XG4gICAgICB0aGlzLmNvbnRhaW5lckVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZFBvc2l0aW9uID0gJ2NlbnRlcic7XG4gICAgICB0aGlzLmNvbnRhaW5lckVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZFJlcGVhdCA9ICduby1yZXBlYXQnO1xuICAgIH1cbiAgfVxuXG59XG5cbiJdfQ==