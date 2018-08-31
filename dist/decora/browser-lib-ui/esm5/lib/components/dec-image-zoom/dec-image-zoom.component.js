/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { ThumborServerHost } from './../../directives/image/image.directive.constants';
/** @typedef {?} */
var ZoomMode;
export { ZoomMode };
var DecImageZoomComponent = /** @class */ (function () {
    function DecImageZoomComponent() {
        this.zoomMode = 'click';
        this.enableScrollZoom = true;
        this.scrollStepSize = 0.1;
        this.enableLens = false;
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
        this.fullImageUrl = this.systemFile.fileUrl;
    };
    /**
     * @return {?}
     */
    DecImageZoomComponent.prototype.setOriginalImagePath = /**
     * @return {?}
     */
    function () {
        this.fullImagePath = this.extractImageUrlFromSysfile();
    };
    /**
     * @return {?}
     */
    DecImageZoomComponent.prototype.setThumborlUrl = /**
     * @return {?}
     */
    function () {
        this.resizedImageUrl = this.getThumborUrl();
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
        catch (error) {
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
        /** @type {?} */
        var size = this.getImageSize();
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
if (false) {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLWltYWdlLXpvb20uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL2RlYy1pbWFnZS16b29tL2RlYy1pbWFnZS16b29tLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFekQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sb0RBQW9ELENBQUM7Ozs7O0lBc0VyRjt3QkF4QzhCLE9BQU87Z0NBRVQsSUFBSTs4QkFFTixHQUFHOzBCQUVQLEtBQUs7eUJBRU4sR0FBRzswQkFFRixHQUFHO0tBOEJSO0lBNUJqQixzQkFDSSw2Q0FBVTs7OztRQU9kO1lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7U0FDekI7Ozs7O1FBVkQsVUFDZSxDQUFnQjtZQUM3QixFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7Z0JBQzNCLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO2dCQUNyQixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7YUFDbEI7U0FDRjs7O09BQUE7SUFNRCxzQkFDSSx1Q0FBSTs7OztRQU9SO1lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7U0FDeEI7Ozs7O1FBVkQsVUFDUyxDQUFlO1lBQ3RCLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ04sSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUM7Z0JBQ3BCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQzthQUNsQjtTQUNGOzs7T0FBQTs7OztJQVlELHdDQUFROzs7SUFBUjtLQUNDOzs7O0lBRUQseUNBQVM7OztJQUFUO1FBQ0UsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNqQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztZQUN4QixJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztZQUM1QixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7U0FDdkI7S0FDRjs7OztJQUVPLGdEQUFnQjs7OztRQUN0QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDOzs7OztJQUd0QyxvREFBb0I7Ozs7UUFDMUIsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsMEJBQTBCLEVBQUUsQ0FBQzs7Ozs7SUFHakQsOENBQWM7Ozs7UUFDcEIsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7Ozs7O0lBR3RDLDBEQUEwQjs7OztRQUNoQyxJQUFJLENBQUM7WUFDSCxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsSUFBSSxTQUFTLENBQUM7U0FDckQ7UUFBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNmLE1BQU0sQ0FBQyxTQUFTLENBQUM7U0FDbEI7Ozs7O0lBR0ssNENBQVk7Ozs7UUFDbEIsTUFBTSxDQUFDLENBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxXQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBRSxDQUFDOzs7OztJQUdwRCw2Q0FBYTs7Ozs7UUFDbkIsSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ2pDLE1BQU0sQ0FBSSxpQkFBaUIsU0FBSSxJQUFJLFNBQUksSUFBSSxDQUFDLGFBQWUsQ0FBQzs7O2dCQXpHL0QsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxnQkFBZ0I7b0JBQzFCLFFBQVEsRUFBRSw0WEFhWDtvQkFDQyxNQUFNLEVBQUUsQ0FBQyxrRUFBa0UsQ0FBQztpQkFDN0U7Ozs7OzJCQVNFLEtBQUs7bUNBRUwsS0FBSztpQ0FFTCxLQUFLOzZCQUVMLEtBQUs7NEJBRUwsS0FBSzs2QkFFTCxLQUFLOzZCQUVMLEtBQUs7dUJBWUwsS0FBSzs7Z0NBeERSOztTQXdCYSxxQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERlY0ltYWdlU2l6ZSwgU3lzdGVtRmlsZUtleSB9IGZyb20gJy4vLi4vLi4vZGlyZWN0aXZlcy9pbWFnZS9pbWFnZS5kaXJlY3RpdmUubW9kZWxzJztcbmltcG9ydCB7IFRodW1ib3JTZXJ2ZXJIb3N0IH0gZnJvbSAnLi8uLi8uLi9kaXJlY3RpdmVzL2ltYWdlL2ltYWdlLmRpcmVjdGl2ZS5jb25zdGFudHMnO1xuXG5leHBvcnQgdHlwZSBab29tTW9kZSA9ICdob3ZlcicgfCAnY2xpY2snIHwgJ3RvZ2dsZScgfCAnaG92ZXItZnJlZXplJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLWltYWdlLXpvb20nLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJpbWFnZWhpZ2hsaWdodC1jb250YWluZXJcIiA+XG4gIDxuZ3gtaW1hZ2Utem9vbVxuICAgIFt0aHVtYkltYWdlXT1cInJlc2l6ZWRJbWFnZVVybFwiXG4gICAgW2Z1bGxJbWFnZV09XCJmdWxsSW1hZ2VVcmxcIlxuICAgIFt6b29tTW9kZV09XCJ6b29tTW9kZVwiXG4gICAgW2VuYWJsZVNjcm9sbFpvb21dPVwiZW5hYmxlU2Nyb2xsWm9vbVwiXG4gICAgW3Njcm9sbFN0ZXBTaXplXT1cInNjcm9sbFN0ZXBTaXplXCJcbiAgICBbZW5hYmxlTGVuc109XCJlbmFibGVMZW5zXCJcbiAgICBbbGVuc1dpZHRoXT1cImxlbnNXaWR0aFwiXG4gICAgW2xlbnNIZWlnaHRdPVwibGVuc0hlaWdodFwiXG4gID48L25neC1pbWFnZS16b29tPlxuPC9kaXY+XG5cbmAsXG4gIHN0eWxlczogW2AuaW1hZ2VoaWdobGlnaHQtY29udGFpbmVye3dpZHRoOjEwMCU7aGVpZ2h0OjEwMCU7Y3Vyc29yOnpvb20taW59YF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjSW1hZ2Vab29tQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBmdWxsSW1hZ2VQYXRoOiBhbnk7XG5cbiAgZnVsbEltYWdlVXJsOiBhbnk7XG5cbiAgcmVzaXplZEltYWdlVXJsOiBhbnk7XG5cbiAgQElucHV0KCkgem9vbU1vZGU6IFpvb21Nb2RlID0gJ2NsaWNrJztcblxuICBASW5wdXQoKSBlbmFibGVTY3JvbGxab29tID0gdHJ1ZTtcblxuICBASW5wdXQoKSBzY3JvbGxTdGVwU2l6ZSA9IDAuMTtcblxuICBASW5wdXQoKSBlbmFibGVMZW5zID0gZmFsc2U7XG5cbiAgQElucHV0KCkgbGVuc1dpZHRoID0gMTAwO1xuXG4gIEBJbnB1dCgpIGxlbnNIZWlnaHQgPSAxMDA7XG5cbiAgQElucHV0KClcbiAgc2V0IHN5c3RlbUZpbGUodjogU3lzdGVtRmlsZUtleSkge1xuICAgIGlmICh2ICE9PSB0aGlzLl9zeXN0ZW1GaWxlKSB7XG4gICAgICB0aGlzLl9zeXN0ZW1GaWxlID0gdjtcbiAgICAgIHRoaXMubG9hZEltYWdlKCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0IHN5c3RlbUZpbGUoKTogU3lzdGVtRmlsZUtleSB7XG4gICAgcmV0dXJuIHRoaXMuX3N5c3RlbUZpbGU7XG4gIH1cblxuICBASW5wdXQoKVxuICBzZXQgc2l6ZSh2OiBEZWNJbWFnZVNpemUpIHtcbiAgICBpZiAodikge1xuICAgICAgdGhpcy5fdGh1bWJTaXplID0gdjtcbiAgICAgIHRoaXMubG9hZEltYWdlKCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0IHNpemUoKTogRGVjSW1hZ2VTaXplIHtcbiAgICByZXR1cm4gdGhpcy5fdGh1bWJTaXplO1xuICB9XG5cbiAgcHJpdmF0ZSBfc3lzdGVtRmlsZTogU3lzdGVtRmlsZUtleTtcblxuICBwcml2YXRlIF90aHVtYlNpemU6IERlY0ltYWdlU2l6ZTtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICB9XG5cbiAgbG9hZEltYWdlKCkge1xuICAgIGlmICh0aGlzLnN5c3RlbUZpbGUgJiYgdGhpcy5zaXplKSB7XG4gICAgICB0aGlzLnNldEZpbmFsSW1hZ2VVcmwoKTtcbiAgICAgIHRoaXMuc2V0T3JpZ2luYWxJbWFnZVBhdGgoKTtcbiAgICAgIHRoaXMuc2V0VGh1bWJvcmxVcmwoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNldEZpbmFsSW1hZ2VVcmwoKSB7XG4gICAgdGhpcy5mdWxsSW1hZ2VVcmwgPSB0aGlzLnN5c3RlbUZpbGUuZmlsZVVybDtcbiAgfVxuXG4gIHByaXZhdGUgc2V0T3JpZ2luYWxJbWFnZVBhdGgoKSB7XG4gICAgdGhpcy5mdWxsSW1hZ2VQYXRoID0gdGhpcy5leHRyYWN0SW1hZ2VVcmxGcm9tU3lzZmlsZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRUaHVtYm9ybFVybCgpIHtcbiAgICB0aGlzLnJlc2l6ZWRJbWFnZVVybCA9IHRoaXMuZ2V0VGh1bWJvclVybCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBleHRyYWN0SW1hZ2VVcmxGcm9tU3lzZmlsZSgpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIHRoaXMuc3lzdGVtRmlsZVsnZmlsZUJhc2VQYXRoJ10gfHwgdW5kZWZpbmVkO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZ2V0SW1hZ2VTaXplKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGAke3RoaXMuc2l6ZS53aWR0aCB8fCAwfXgke3RoaXMuc2l6ZS5oZWlnaHQgfHwgMH1gO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRUaHVtYm9yVXJsKCkge1xuICAgIGNvbnN0IHNpemUgPSB0aGlzLmdldEltYWdlU2l6ZSgpO1xuICAgIHJldHVybiBgJHtUaHVtYm9yU2VydmVySG9zdH0vJHtzaXplfS8ke3RoaXMuZnVsbEltYWdlUGF0aH1gO1xuICB9XG59XG4iXX0=