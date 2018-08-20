/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { ThumborServerHost } from './../../directives/image/image.directive.constants';
var DecImageZoomComponent = /** @class */ (function () {
    function DecImageZoomComponent() {
        this.zoomMode = 'click';
        this.enableScrollZoom = true;
        this.scrollStepSize = 0.1;
        this.enableLens = true;
        this.lensWidth = 100;
        this.lensHeight = 100;
    }
    Object.defineProperty(DecImageZoomComponent.prototype, "systemFile", {
        get: /**
         * @return {?}
         */
        function () {
            return this._systemFile;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            if (v !== this._systemFile) {
                this._systemFile = v;
                this.loadImage();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DecImageZoomComponent.prototype, "size", {
        get: /**
         * @return {?}
         */
        function () {
            return this._thumbSize;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            if (v) {
                this._thumbSize = v;
                this.loadImage();
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    DecImageZoomComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    /**
     * @return {?}
     */
    DecImageZoomComponent.prototype.loadImage = /**
     * @return {?}
     */
    function () {
        if (this.systemFile && this.size) {
            this.setFinalImageUrl();
            this.setOriginalImagePath();
            this.setThumborlUrl();
        }
    };
    /**
     * @return {?}
     */
    DecImageZoomComponent.prototype.setFinalImageUrl = /**
     * @return {?}
     */
    function () {
        this.fullImageUrl = this.systemFile.fileBaseUrl + '.' + this.systemFile.extension;
        console.log('setFinalImageUrl', this.fullImageUrl);
    };
    /**
     * @return {?}
     */
    DecImageZoomComponent.prototype.setOriginalImagePath = /**
     * @return {?}
     */
    function () {
        this.fullImagePath = this.extractImageUrlFromSysfile();
        console.log('setOriginalImagePath', this.fullImagePath);
    };
    /**
     * @return {?}
     */
    DecImageZoomComponent.prototype.setThumborlUrl = /**
     * @return {?}
     */
    function () {
        this.resizedImageUrl = this.getThumborUrl();
        console.log('setThumborlUrl', this.resizedImageUrl);
    };
    /**
     * @return {?}
     */
    DecImageZoomComponent.prototype.extractImageUrlFromSysfile = /**
     * @return {?}
     */
    function () {
        try {
            return this.systemFile['fileBasePath'] || undefined;
        }
        catch (/** @type {?} */ error) {
            return undefined;
        }
    };
    /**
     * @return {?}
     */
    DecImageZoomComponent.prototype.getImageSize = /**
     * @return {?}
     */
    function () {
        return (this.size.width || 0) + "x" + (this.size.height || 0);
    };
    /**
     * @return {?}
     */
    DecImageZoomComponent.prototype.getThumborUrl = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ size = this.getImageSize();
        return ThumborServerHost + "/" + size + "/" + this.fullImagePath;
    };
    DecImageZoomComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dec-image-zoom',
                    template: "<div class=\"imagehighlight-container\" >\n  <ngx-image-zoom\n    [thumbImage]=\"resizedImageUrl\"\n    [fullImage]=\"fullImageUrl\"\n    [zoomMode]=\"zoomMode\"\n    [enableScrollZoom]=\"enableScrollZoom\"\n    [scrollStepSize]=\"scrollStepSize\"\n    [enableLens]=\"enableLens\"\n    [lensWidth]=\"lensWidth\"\n    [lensHeight]=\"lensHeight\"\n  ></ngx-image-zoom>\n</div>\n\n",
                    styles: [".imagehighlight-container{width:100%;height:100%;cursor:zoom-in}"]
                },] },
    ];
    /** @nocollapse */
    DecImageZoomComponent.ctorParameters = function () { return []; };
    DecImageZoomComponent.propDecorators = {
        zoomMode: [{ type: Input }],
        enableScrollZoom: [{ type: Input }],
        scrollStepSize: [{ type: Input }],
        enableLens: [{ type: Input }],
        lensWidth: [{ type: Input }],
        lensHeight: [{ type: Input }],
        systemFile: [{ type: Input }],
        size: [{ type: Input }]
    };
    return DecImageZoomComponent;
}());
export { DecImageZoomComponent };
function DecImageZoomComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    DecImageZoomComponent.prototype.fullImagePath;
    /** @type {?} */
    DecImageZoomComponent.prototype.fullImageUrl;
    /** @type {?} */
    DecImageZoomComponent.prototype.resizedImageUrl;
    /** @type {?} */
    DecImageZoomComponent.prototype.zoomMode;
    /** @type {?} */
    DecImageZoomComponent.prototype.enableScrollZoom;
    /** @type {?} */
    DecImageZoomComponent.prototype.scrollStepSize;
    /** @type {?} */
    DecImageZoomComponent.prototype.enableLens;
    /** @type {?} */
    DecImageZoomComponent.prototype.lensWidth;
    /** @type {?} */
    DecImageZoomComponent.prototype.lensHeight;
    /** @type {?} */
    DecImageZoomComponent.prototype._systemFile;
    /** @type {?} */
    DecImageZoomComponent.prototype._thumbSize;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLWltYWdlLXpvb20uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL2RlYy1pbWFnZS16b29tL2RlYy1pbWFnZS16b29tLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFekQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sb0RBQW9ELENBQUM7O0lBc0VyRjt3QkF4QzhCLE9BQU87Z0NBRVQsSUFBSTs4QkFFTixHQUFHOzBCQUVQLElBQUk7eUJBRUwsR0FBRzswQkFFRixHQUFHO0tBOEJSO0lBNUJqQixzQkFDSSw2Q0FBVTs7OztRQU9kO1lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7U0FDekI7Ozs7O1FBVkQsVUFDZSxDQUFnQjtZQUM3QixFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7Z0JBQzNCLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO2dCQUNyQixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7YUFDbEI7U0FDRjs7O09BQUE7SUFNRCxzQkFDSSx1Q0FBSTs7OztRQU9SO1lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7U0FDeEI7Ozs7O1FBVkQsVUFDUyxDQUFlO1lBQ3RCLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ04sSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUM7Z0JBQ3BCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQzthQUNsQjtTQUNGOzs7T0FBQTs7OztJQVlELHdDQUFROzs7SUFBUjtLQUNDOzs7O0lBRUQseUNBQVM7OztJQUFUO1FBQ0UsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNqQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztZQUN4QixJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztZQUM1QixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7U0FDdkI7S0FDRjs7OztJQUVPLGdEQUFnQjs7OztRQUN0QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQztRQUNsRixPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQzs7Ozs7SUFHN0Msb0RBQW9COzs7O1FBQzFCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLDBCQUEwQixFQUFFLENBQUM7UUFDdkQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7Ozs7O0lBR2xELDhDQUFjOzs7O1FBQ3BCLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQzVDLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDOzs7OztJQUc5QywwREFBMEI7Ozs7UUFDaEMsSUFBSSxDQUFDO1lBQ0gsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLElBQUksU0FBUyxDQUFDO1NBQ3JEO1FBQUMsS0FBSyxDQUFDLENBQUMsaUJBQUEsS0FBSyxFQUFFLENBQUM7WUFDZixNQUFNLENBQUMsU0FBUyxDQUFDO1NBQ2xCOzs7OztJQUdLLDRDQUFZOzs7O1FBQ2xCLE1BQU0sQ0FBQyxDQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsV0FBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUUsQ0FBQzs7Ozs7SUFHcEQsNkNBQWE7Ozs7UUFDbkIscUJBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNqQyxNQUFNLENBQUksaUJBQWlCLFNBQUksSUFBSSxTQUFJLElBQUksQ0FBQyxhQUFlLENBQUM7OztnQkE1Ry9ELFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsZ0JBQWdCO29CQUMxQixRQUFRLEVBQUUsNFhBYVg7b0JBQ0MsTUFBTSxFQUFFLENBQUMsa0VBQWtFLENBQUM7aUJBQzdFOzs7OzsyQkFTRSxLQUFLO21DQUVMLEtBQUs7aUNBRUwsS0FBSzs2QkFFTCxLQUFLOzRCQUVMLEtBQUs7NkJBRUwsS0FBSzs2QkFFTCxLQUFLO3VCQVlMLEtBQUs7O2dDQXhEUjs7U0F3QmEscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEZWNJbWFnZVNpemUsIFN5c3RlbUZpbGVLZXkgfSBmcm9tICcuLy4uLy4uL2RpcmVjdGl2ZXMvaW1hZ2UvaW1hZ2UuZGlyZWN0aXZlLm1vZGVscyc7XG5pbXBvcnQgeyBUaHVtYm9yU2VydmVySG9zdCB9IGZyb20gJy4vLi4vLi4vZGlyZWN0aXZlcy9pbWFnZS9pbWFnZS5kaXJlY3RpdmUuY29uc3RhbnRzJztcblxuZXhwb3J0IHR5cGUgWm9vbU1vZGUgPSAnaG92ZXInIHwgJ2NsaWNrJyB8ICd0b2dnbGUnIHwgJ2hvdmVyLWZyZWV6ZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1pbWFnZS16b29tJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwiaW1hZ2VoaWdobGlnaHQtY29udGFpbmVyXCIgPlxuICA8bmd4LWltYWdlLXpvb21cbiAgICBbdGh1bWJJbWFnZV09XCJyZXNpemVkSW1hZ2VVcmxcIlxuICAgIFtmdWxsSW1hZ2VdPVwiZnVsbEltYWdlVXJsXCJcbiAgICBbem9vbU1vZGVdPVwiem9vbU1vZGVcIlxuICAgIFtlbmFibGVTY3JvbGxab29tXT1cImVuYWJsZVNjcm9sbFpvb21cIlxuICAgIFtzY3JvbGxTdGVwU2l6ZV09XCJzY3JvbGxTdGVwU2l6ZVwiXG4gICAgW2VuYWJsZUxlbnNdPVwiZW5hYmxlTGVuc1wiXG4gICAgW2xlbnNXaWR0aF09XCJsZW5zV2lkdGhcIlxuICAgIFtsZW5zSGVpZ2h0XT1cImxlbnNIZWlnaHRcIlxuICA+PC9uZ3gtaW1hZ2Utem9vbT5cbjwvZGl2PlxuXG5gLFxuICBzdHlsZXM6IFtgLmltYWdlaGlnaGxpZ2h0LWNvbnRhaW5lcnt3aWR0aDoxMDAlO2hlaWdodDoxMDAlO2N1cnNvcjp6b29tLWlufWBdXG59KVxuZXhwb3J0IGNsYXNzIERlY0ltYWdlWm9vbUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgZnVsbEltYWdlUGF0aDogYW55O1xuXG4gIGZ1bGxJbWFnZVVybDogYW55O1xuXG4gIHJlc2l6ZWRJbWFnZVVybDogYW55O1xuXG4gIEBJbnB1dCgpIHpvb21Nb2RlOiBab29tTW9kZSA9ICdjbGljayc7XG5cbiAgQElucHV0KCkgZW5hYmxlU2Nyb2xsWm9vbSA9IHRydWU7XG5cbiAgQElucHV0KCkgc2Nyb2xsU3RlcFNpemUgPSAwLjE7XG5cbiAgQElucHV0KCkgZW5hYmxlTGVucyA9IHRydWU7XG5cbiAgQElucHV0KCkgbGVuc1dpZHRoID0gMTAwO1xuXG4gIEBJbnB1dCgpIGxlbnNIZWlnaHQgPSAxMDA7XG5cbiAgQElucHV0KClcbiAgc2V0IHN5c3RlbUZpbGUodjogU3lzdGVtRmlsZUtleSkge1xuICAgIGlmICh2ICE9PSB0aGlzLl9zeXN0ZW1GaWxlKSB7XG4gICAgICB0aGlzLl9zeXN0ZW1GaWxlID0gdjtcbiAgICAgIHRoaXMubG9hZEltYWdlKCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0IHN5c3RlbUZpbGUoKTogU3lzdGVtRmlsZUtleSB7XG4gICAgcmV0dXJuIHRoaXMuX3N5c3RlbUZpbGU7XG4gIH1cblxuICBASW5wdXQoKVxuICBzZXQgc2l6ZSh2OiBEZWNJbWFnZVNpemUpIHtcbiAgICBpZiAodikge1xuICAgICAgdGhpcy5fdGh1bWJTaXplID0gdjtcbiAgICAgIHRoaXMubG9hZEltYWdlKCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0IHNpemUoKTogRGVjSW1hZ2VTaXplIHtcbiAgICByZXR1cm4gdGhpcy5fdGh1bWJTaXplO1xuICB9XG5cbiAgcHJpdmF0ZSBfc3lzdGVtRmlsZTogU3lzdGVtRmlsZUtleTtcblxuICBwcml2YXRlIF90aHVtYlNpemU6IERlY0ltYWdlU2l6ZTtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICB9XG5cbiAgbG9hZEltYWdlKCkge1xuICAgIGlmICh0aGlzLnN5c3RlbUZpbGUgJiYgdGhpcy5zaXplKSB7XG4gICAgICB0aGlzLnNldEZpbmFsSW1hZ2VVcmwoKTtcbiAgICAgIHRoaXMuc2V0T3JpZ2luYWxJbWFnZVBhdGgoKTtcbiAgICAgIHRoaXMuc2V0VGh1bWJvcmxVcmwoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNldEZpbmFsSW1hZ2VVcmwoKSB7XG4gICAgdGhpcy5mdWxsSW1hZ2VVcmwgPSB0aGlzLnN5c3RlbUZpbGUuZmlsZUJhc2VVcmwgKyAnLicgKyB0aGlzLnN5c3RlbUZpbGUuZXh0ZW5zaW9uO1xuICAgIGNvbnNvbGUubG9nKCdzZXRGaW5hbEltYWdlVXJsJywgdGhpcy5mdWxsSW1hZ2VVcmwpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRPcmlnaW5hbEltYWdlUGF0aCgpIHtcbiAgICB0aGlzLmZ1bGxJbWFnZVBhdGggPSB0aGlzLmV4dHJhY3RJbWFnZVVybEZyb21TeXNmaWxlKCk7XG4gICAgY29uc29sZS5sb2coJ3NldE9yaWdpbmFsSW1hZ2VQYXRoJywgdGhpcy5mdWxsSW1hZ2VQYXRoKTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0VGh1bWJvcmxVcmwoKSB7XG4gICAgdGhpcy5yZXNpemVkSW1hZ2VVcmwgPSB0aGlzLmdldFRodW1ib3JVcmwoKTtcbiAgICBjb25zb2xlLmxvZygnc2V0VGh1bWJvcmxVcmwnLCB0aGlzLnJlc2l6ZWRJbWFnZVVybCk7XG4gIH1cblxuICBwcml2YXRlIGV4dHJhY3RJbWFnZVVybEZyb21TeXNmaWxlKCkge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gdGhpcy5zeXN0ZW1GaWxlWydmaWxlQmFzZVBhdGgnXSB8fCB1bmRlZmluZWQ7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBnZXRJbWFnZVNpemUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gYCR7dGhpcy5zaXplLndpZHRoIHx8IDB9eCR7dGhpcy5zaXplLmhlaWdodCB8fCAwfWA7XG4gIH1cblxuICBwcml2YXRlIGdldFRodW1ib3JVcmwoKSB7XG4gICAgY29uc3Qgc2l6ZSA9IHRoaXMuZ2V0SW1hZ2VTaXplKCk7XG4gICAgcmV0dXJuIGAke1RodW1ib3JTZXJ2ZXJIb3N0fS8ke3NpemV9LyR7dGhpcy5mdWxsSW1hZ2VQYXRofWA7XG4gIH1cbn1cbiJdfQ==