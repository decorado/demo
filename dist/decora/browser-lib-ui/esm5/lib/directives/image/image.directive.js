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
        downloadingImage.setAttribute('crossOrigin', 'Anonymous');
        downloadingImage.onload = function () {
            _this.imageData = _this.convertImageToDataURI(downloadingImage);
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
        this.containerElement.style.backgroundImage = 'url(' + this.imageData + ')';
        this.containerElement.classList.remove('dec-image-bg-loading');
    };
    /**
     * @return {?}
     */
    DecImageDirective.prototype.setImageelementSrc = /**
     * @return {?}
     */
    function () {
        this.containerElement.setAttribute('src', this.imageData);
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
    /**
     * @param {?} img
     * @return {?}
     */
    DecImageDirective.prototype.convertImageToDataURI = /**
     * @param {?} img
     * @return {?}
     */
    function (img) {
        /** @type {?} */
        var canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        /** @type {?} */
        var ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        return canvas.toDataURL('image/png');
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
    DecImageDirective.prototype.imageData;
    /** @type {?} */
    DecImageDirective.prototype.viewContainerRef;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2UuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS8iLCJzb3VyY2VzIjpbImxpYi9kaXJlY3RpdmVzL2ltYWdlL2ltYWdlLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsZ0JBQWdCLEVBQXlCLE1BQU0sZUFBZSxDQUFDO0FBRTFGLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxpQkFBaUIsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7O0lBNkNwRywyQkFBb0IsZ0JBQWtDO1FBQWxDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7MkJBcEN4QyxLQUFLOzswQkFzQkcsSUFBSTswQkFJbUIsZ0JBQWdCO0tBVUY7SUFsQzNELHNCQUNJLHVDQUFROzs7OztRQURaLFVBQ2EsQ0FBeUI7WUFDcEMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO2dCQUMxQixJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQztnQkFFcEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7b0JBQ3pCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztpQkFDbEI7YUFDRjtTQUNGOzs7T0FBQTs7OztJQTJCRCxvQ0FBUTs7O0lBQVI7UUFDRSxJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztRQUM5QixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7S0FDeEI7Ozs7SUFFRCwyQ0FBZTs7O0lBQWY7UUFBQSxpQkFLQztRQUpDLFVBQVUsQ0FBQztZQUNULEtBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO1lBQzVCLEtBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztTQUNsQixDQUFDLENBQUM7S0FDSjs7OztJQUVPLGtEQUFzQjs7OztRQUM1QixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUM7UUFDcEUsSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQzs7Ozs7SUFHbEYscUNBQVM7Ozs7UUFFZixFQUFFLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxVQUFVLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztZQUV4QyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7U0FFdEM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUVOLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLDBCQUEwQixFQUFFLENBQUM7WUFFbkQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBRW5CLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO2FBRXpDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBRU4sSUFBSSxDQUFDLGFBQWEsR0FBRyxVQUFVLENBQUM7YUFFakM7U0FFRjtRQUVELElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQzs7Ozs7SUFJaEIsc0RBQTBCOzs7O1FBQ2hDLElBQUksQ0FBQztZQUNILE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxJQUFJLFNBQVMsQ0FBQztTQUNyRDtRQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2YsTUFBTSxDQUFDLFNBQVMsQ0FBQztTQUNsQjs7Ozs7SUFHSyx1Q0FBVzs7OztRQUVqQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUVwQixNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1NBRTdCO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFFTixNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBRXhCOzs7OztJQUlLLG9DQUFROzs7O1FBQ2QsTUFBTSxDQUFJLE1BQU0sU0FBSSxJQUFJLENBQUMsU0FBVyxDQUFDOzs7OztJQUcvQix5Q0FBYTs7Ozs7UUFDbkIsSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7O1FBQ2xELElBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQzs7UUFDaEMsSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQzVCLE1BQU0sQ0FBSSxpQkFBaUIsU0FBSSxJQUFJLEdBQUcsTUFBTSxHQUFHLElBQUksU0FBSSxJQUFJLENBQUMsU0FBVyxDQUFDOzs7Ozs7SUFHbEUsd0NBQVk7Ozs7Y0FBQyxZQUErQjtRQUEvQiw2QkFBQSxFQUFBLGlCQUErQjs7UUFFbEQsSUFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQztRQUV6RCxFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsS0FBSyxJQUFJLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQzlDLE1BQU0sQ0FBQyxDQUFHLFlBQVksQ0FBQyxLQUFLLElBQUksQ0FBQyxXQUFJLFlBQVksQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFFLENBQUM7U0FDakU7UUFFRCxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ2IsS0FBSyxjQUFjLEdBQUcsR0FBRztnQkFDdkIsTUFBTSxDQUFDLFNBQVMsQ0FBQztZQUNuQixLQUFLLGNBQWMsR0FBRyxHQUFHO2dCQUN2QixNQUFNLENBQUMsU0FBUyxDQUFDO1lBQ25CLEtBQUssY0FBYyxHQUFHLEdBQUc7Z0JBQ3ZCLE1BQU0sQ0FBQyxTQUFTLENBQUM7WUFDbkIsS0FBSyxjQUFjLEdBQUcsSUFBSTtnQkFDeEIsTUFBTSxDQUFDLFdBQVcsQ0FBQztZQUNyQixLQUFLLGNBQWMsR0FBRyxJQUFJO2dCQUN4QixNQUFNLENBQUMsV0FBVyxDQUFDO1lBQ3JCLEtBQUssY0FBYyxHQUFHLElBQUk7Z0JBQ3hCLE1BQU0sQ0FBQyxXQUFXLENBQUM7WUFDckI7Z0JBQ0UsTUFBTSxDQUFDLFdBQVcsQ0FBQztTQUN0Qjs7Ozs7SUFHSyxxQ0FBUzs7OztRQUNmLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQzs7Ozs7SUFHN0IsbUNBQU87Ozs7UUFDYixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7Ozs7O0lBRzFCLDBDQUFjOzs7Ozs7UUFDcEIsSUFBTSxnQkFBZ0IsR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFDO1FBQ3JDLGdCQUFnQixDQUFDLFlBQVksQ0FBQyxhQUFhLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDMUQsZ0JBQWdCLENBQUMsTUFBTSxHQUFHO1lBQ3hCLEtBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSSxDQUFDLHFCQUFxQixDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFDOUQsS0FBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ3BCLENBQUM7UUFFRixnQkFBZ0IsQ0FBQyxPQUFPLEdBQUc7WUFDekIsS0FBSSxDQUFDLGFBQWEsR0FBRyxVQUFVLENBQUM7WUFDaEMsS0FBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ3BCLENBQUM7UUFFRixnQkFBZ0IsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQzs7Ozs7SUFHcEMsdUNBQVc7Ozs7UUFDakIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLG9CQUFvQixLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDeEMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7U0FDM0I7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztTQUN4Qjs7Ozs7SUFHSywyQ0FBZTs7OztRQUNyQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLGVBQWUsR0FBRyxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUM7UUFDNUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsc0JBQXNCLENBQUMsQ0FBQzs7Ozs7SUFHekQsOENBQWtCOzs7O1FBQ3hCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQzs7Ozs7SUFHcEQsMkNBQWU7Ozs7UUFDckIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLG9CQUFvQixLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDeEMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDcEQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDLENBQUM7U0FDekQ7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsY0FBYyxHQUFHLE1BQU0sQ0FBQztZQUNwRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLGtCQUFrQixHQUFHLFFBQVEsQ0FBQztZQUMxRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLGdCQUFnQixHQUFHLFdBQVcsQ0FBQztTQUM1RDs7Ozs7O0lBR0ssaURBQXFCOzs7O2NBQUMsR0FBRzs7UUFDL0IsSUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNoRCxNQUFNLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUM7UUFDekIsTUFBTSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDOztRQUUzQixJQUFNLEdBQUcsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3BDLEdBQUcsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUV6QixNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQzs7O2dCQS9NeEMsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxZQUFZO2lCQUN2Qjs7OztnQkFOMEIsZ0JBQWdCOzs7MkJBYXhDLEtBQUs7K0JBV0wsS0FBSzt1QkFHTCxLQUFLO3dCQUdMLEtBQUs7NkJBR0wsS0FBSzs7NEJBakNSOztTQU9hLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIFZpZXdDb250YWluZXJSZWYsIEFmdGVyVmlld0luaXQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGVjSW1hZ2VTaXplLCBTeXN0ZW1GaWxlS2V5IH0gZnJvbSAnLi9pbWFnZS5kaXJlY3RpdmUubW9kZWxzJztcbmltcG9ydCB7IFRyYW5zcGFyZW50SW1hZ2UsIFRodW1ib3JTZXJ2ZXJIb3N0LCBFcnJvckltYWdlLCBTM0hvc3QgfSBmcm9tICcuL2ltYWdlLmRpcmVjdGl2ZS5jb25zdGFudHMnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbZGVjSW1hZ2VdJ1xufSlcbmV4cG9ydCBjbGFzcyBEZWNJbWFnZURpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCB7XG5cbiAgY29udGFpbmVyRWxlbWVudDogSFRNTEVsZW1lbnQ7XG5cbiAgZXJyb3JPbkxvYWQgPSBmYWxzZTtcblxuICBASW5wdXQoKVxuICBzZXQgZGVjSW1hZ2UodjogU3lzdGVtRmlsZUtleSB8IHN0cmluZykge1xuICAgIGlmICh2ICE9PSB0aGlzLmlubmVySW1hZ2UpIHtcbiAgICAgIHRoaXMuaW5uZXJJbWFnZSA9IHY7XG5cbiAgICAgIGlmICh0aGlzLnZpZXdJbml0aWFsaXplZCkge1xuICAgICAgICB0aGlzLmxvYWRJbWFnZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIEBJbnB1dCgpIGRlY0ltYWdlU2l6ZTogRGVjSW1hZ2VTaXplO1xuXG4gIC8vIERlZmluZXMgaWYgd2hpdGUgbWFyZ2lucyBzaG91bGQgYmUgY3JvcHBlZFxuICBASW5wdXQoKSB0cmltOiBib29sZWFuO1xuXG4gIC8vIERlZmluZXMgaWYgdGhlIGltYWdlIHNob3VsZCBiZSBjcm9wcGVkIG9yIGZpdCB0aGUgc2l6ZSByZXNwZWN0aW4gdGhlIGFzcGVjdCByYXRpb1xuICBASW5wdXQoKSBmaXRJbjogYm9vbGVhbjtcblxuICAvLyBHZWQgcmVkaW1lbnNpb25lZCBpbWFnZSBmcm9tIHRodW1ib3IgaW1hZ2UgcmVzaXplIHNlcnZpY2VcbiAgQElucHV0KCkgdGh1bWJvcml6ZSA9IHRydWU7XG5cbiAgcHJpdmF0ZSBjb250YWluZXJFbGVtZW50VHlwZTogJ0lNRycgfCAnTk9ULUlNRyc7XG5cbiAgcHJpdmF0ZSBpbm5lckltYWdlOiBTeXN0ZW1GaWxlS2V5IHwgc3RyaW5nID0gVHJhbnNwYXJlbnRJbWFnZTtcblxuICBwcml2YXRlIGltYWdlUGF0aDogc3RyaW5nO1xuXG4gIHByaXZhdGUgZmluYWxJbWFnZVVybDogc3RyaW5nO1xuXG4gIHByaXZhdGUgdmlld0luaXRpYWxpemVkOiBib29sZWFuO1xuXG4gIHByaXZhdGUgaW1hZ2VEYXRhO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZikgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5kZXRlY3RDb250YWluZXJFbGVtZW50KCk7XG4gICAgdGhpcy5zZXRFbGVtZW50V2lkdGgoKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMudmlld0luaXRpYWxpemVkID0gdHJ1ZTtcbiAgICAgIHRoaXMubG9hZEltYWdlKCk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGRldGVjdENvbnRhaW5lckVsZW1lbnQoKSB7XG4gICAgdGhpcy5jb250YWluZXJFbGVtZW50ID0gdGhpcy52aWV3Q29udGFpbmVyUmVmLmVsZW1lbnQubmF0aXZlRWxlbWVudDtcbiAgICB0aGlzLmNvbnRhaW5lckVsZW1lbnRUeXBlID0gdGhpcy5jb250YWluZXJFbGVtZW50LnRhZ05hbWUgPT09ICdJTUcnID8gJ0lNRycgOiAnTk9ULUlNRyc7XG4gIH1cblxuICBwcml2YXRlIGxvYWRJbWFnZSgpIHtcblxuICAgIGlmICh0eXBlb2YgdGhpcy5pbm5lckltYWdlID09PSAnc3RyaW5nJykge1xuXG4gICAgICB0aGlzLmZpbmFsSW1hZ2VVcmwgPSB0aGlzLmlubmVySW1hZ2U7XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICB0aGlzLmltYWdlUGF0aCA9IHRoaXMuZXh0cmFjdEltYWdlVXJsRnJvbVN5c2ZpbGUoKTtcblxuICAgICAgaWYgKHRoaXMuaW1hZ2VQYXRoKSB7XG5cbiAgICAgICAgdGhpcy5maW5hbEltYWdlVXJsID0gdGhpcy5nZXRGaW5hbFVybCgpO1xuXG4gICAgICB9IGVsc2Uge1xuXG4gICAgICAgIHRoaXMuZmluYWxJbWFnZVVybCA9IEVycm9ySW1hZ2U7XG5cbiAgICAgIH1cblxuICAgIH1cblxuICAgIHRoaXMudHJ5VG9Mb2FkSW1hZ2UoKTtcblxuICB9XG5cbiAgcHJpdmF0ZSBleHRyYWN0SW1hZ2VVcmxGcm9tU3lzZmlsZSgpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIHRoaXMuaW5uZXJJbWFnZVsnZmlsZUJhc2VQYXRoJ10gfHwgdW5kZWZpbmVkO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZ2V0RmluYWxVcmwoKSB7XG5cbiAgICBpZiAodGhpcy50aHVtYm9yaXplKSB7XG5cbiAgICAgIHJldHVybiB0aGlzLmdldFRodW1ib3JVcmwoKTtcblxuICAgIH0gZWxzZSB7XG5cbiAgICAgIHJldHVybiB0aGlzLmdldFMzVXJsKCk7XG5cbiAgICB9XG5cbiAgfVxuXG4gIHByaXZhdGUgZ2V0UzNVcmwoKSB7XG4gICAgcmV0dXJuIGAke1MzSG9zdH0vJHt0aGlzLmltYWdlUGF0aH1gO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRUaHVtYm9yVXJsKCkge1xuICAgIGNvbnN0IHNpemUgPSB0aGlzLmdldEltYWdlU2l6ZSh0aGlzLmRlY0ltYWdlU2l6ZSk7XG4gICAgY29uc3QgYXNwZWN0ID0gdGhpcy5nZXRBc3BlY3QoKTtcbiAgICBjb25zdCB0cmltID0gdGhpcy5nZXRUcmltKCk7XG4gICAgcmV0dXJuIGAke1RodW1ib3JTZXJ2ZXJIb3N0fS8ke3NpemV9JHthc3BlY3R9JHt0cmltfS8ke3RoaXMuaW1hZ2VQYXRofWA7XG4gIH1cblxuICBwcml2YXRlIGdldEltYWdlU2l6ZShkZWNJbWFnZVNpemU6IERlY0ltYWdlU2l6ZSA9IHt9KTogc3RyaW5nIHtcblxuICAgIGNvbnN0IGNvbnRhaW5lcldpZHRoID0gdGhpcy5jb250YWluZXJFbGVtZW50Lm9mZnNldFdpZHRoO1xuXG4gICAgaWYgKGRlY0ltYWdlU2l6ZS53aWR0aCAmJiBkZWNJbWFnZVNpemUuaGVpZ2h0KSB7XG4gICAgICByZXR1cm4gYCR7ZGVjSW1hZ2VTaXplLndpZHRoIHx8IDB9eCR7ZGVjSW1hZ2VTaXplLmhlaWdodCB8fCAwfWA7XG4gICAgfVxuXG4gICAgc3dpdGNoICh0cnVlKSB7XG4gICAgICBjYXNlIGNvbnRhaW5lcldpZHRoIDwgMzAwOlxuICAgICAgICByZXR1cm4gYDMwMHgzMDBgO1xuICAgICAgY2FzZSBjb250YWluZXJXaWR0aCA8IDYwMDpcbiAgICAgICAgcmV0dXJuIGA2MDB4NjAwYDtcbiAgICAgIGNhc2UgY29udGFpbmVyV2lkdGggPCA5MDA6XG4gICAgICAgIHJldHVybiBgOTAweDkwMGA7XG4gICAgICBjYXNlIGNvbnRhaW5lcldpZHRoIDwgMTIwMDpcbiAgICAgICAgcmV0dXJuIGAxMjAweDEyMDBgO1xuICAgICAgY2FzZSBjb250YWluZXJXaWR0aCA8IDE1MDA6XG4gICAgICAgIHJldHVybiBgMTUwMHgxNTAwYDtcbiAgICAgIGNhc2UgY29udGFpbmVyV2lkdGggPCAxODAwOlxuICAgICAgICByZXR1cm4gYDE4MDB4MTgwMGA7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gYDIwMDB4MjAwMGA7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBnZXRBc3BlY3QoKSB7XG4gICAgcmV0dXJuIHRoaXMuZml0SW4gPyAnL2ZpdC1pbicgOiAnJztcbiAgfVxuXG4gIHByaXZhdGUgZ2V0VHJpbSgpIHtcbiAgICByZXR1cm4gdGhpcy50cmltID8gJy90cmltJyA6ICcnO1xuICB9XG5cbiAgcHJpdmF0ZSB0cnlUb0xvYWRJbWFnZSgpIHtcbiAgICBjb25zdCBkb3dubG9hZGluZ0ltYWdlID0gbmV3IEltYWdlKCk7XG4gICAgZG93bmxvYWRpbmdJbWFnZS5zZXRBdHRyaWJ1dGUoJ2Nyb3NzT3JpZ2luJywgJ0Fub255bW91cycpO1xuICAgIGRvd25sb2FkaW5nSW1hZ2Uub25sb2FkID0gKCkgPT4ge1xuICAgICAgdGhpcy5pbWFnZURhdGEgPSB0aGlzLmNvbnZlcnRJbWFnZVRvRGF0YVVSSShkb3dubG9hZGluZ0ltYWdlKTtcbiAgICAgIHRoaXMuY3JlYXRlSW1hZ2UoKTtcbiAgICB9O1xuXG4gICAgZG93bmxvYWRpbmdJbWFnZS5vbmVycm9yID0gKCkgPT4ge1xuICAgICAgdGhpcy5maW5hbEltYWdlVXJsID0gRXJyb3JJbWFnZTtcbiAgICAgIHRoaXMuY3JlYXRlSW1hZ2UoKTtcbiAgICB9O1xuXG4gICAgZG93bmxvYWRpbmdJbWFnZS5zcmMgPSB0aGlzLmZpbmFsSW1hZ2VVcmw7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZUltYWdlKCkge1xuICAgIGlmICh0aGlzLmNvbnRhaW5lckVsZW1lbnRUeXBlID09PSAnSU1HJykge1xuICAgICAgdGhpcy5zZXRJbWFnZWVsZW1lbnRTcmMoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hcHBlbmRJbWFnZVRvQmcoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGFwcGVuZEltYWdlVG9CZygpIHtcbiAgICB0aGlzLmNvbnRhaW5lckVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gJ3VybCgnICsgdGhpcy5pbWFnZURhdGEgKyAnKSc7XG4gICAgdGhpcy5jb250YWluZXJFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2RlYy1pbWFnZS1iZy1sb2FkaW5nJyk7XG4gIH1cblxuICBwcml2YXRlIHNldEltYWdlZWxlbWVudFNyYygpIHtcbiAgICB0aGlzLmNvbnRhaW5lckVsZW1lbnQuc2V0QXR0cmlidXRlKCdzcmMnLCB0aGlzLmltYWdlRGF0YSk7XG4gIH1cblxuICBwcml2YXRlIHNldEVsZW1lbnRXaWR0aCgpIHtcbiAgICBpZiAodGhpcy5jb250YWluZXJFbGVtZW50VHlwZSA9PT0gJ0lNRycpIHtcbiAgICAgIHRoaXMuY29udGFpbmVyRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgJzEwMCUnKTtcbiAgICAgIHRoaXMuY29udGFpbmVyRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ21heC13aWR0aCcsICcxMDAlJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY29udGFpbmVyRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kU2l6ZSA9ICcxMDAlJztcbiAgICAgIHRoaXMuY29udGFpbmVyRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kUG9zaXRpb24gPSAnY2VudGVyJztcbiAgICAgIHRoaXMuY29udGFpbmVyRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kUmVwZWF0ID0gJ25vLXJlcGVhdCc7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBjb252ZXJ0SW1hZ2VUb0RhdGFVUkkoaW1nKSB7XG4gICAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgY2FudmFzLndpZHRoID0gaW1nLndpZHRoO1xuICAgIGNhbnZhcy5oZWlnaHQgPSBpbWcuaGVpZ2h0O1xuXG4gICAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgY3R4LmRyYXdJbWFnZShpbWcsIDAsIDApO1xuXG4gICAgcmV0dXJuIGNhbnZhcy50b0RhdGFVUkwoJ2ltYWdlL3BuZycpO1xuICB9XG5cbn1cblxuIl19