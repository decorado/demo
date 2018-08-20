/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { ThumborServerHost } from './../../directives/image/image.directive.constants';
export class DecImageZoomComponent {
    constructor() {
        this.zoomMode = 'click';
        this.enableScrollZoom = true;
        this.scrollStepSize = 0.1;
        this.enableLens = true;
        this.lensWidth = 100;
        this.lensHeight = 100;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set systemFile(v) {
        if (v !== this._systemFile) {
            this._systemFile = v;
            this.loadImage();
        }
    }
    /**
     * @return {?}
     */
    get systemFile() {
        return this._systemFile;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set size(v) {
        if (v) {
            this._thumbSize = v;
            this.loadImage();
        }
    }
    /**
     * @return {?}
     */
    get size() {
        return this._thumbSize;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
    /**
     * @return {?}
     */
    loadImage() {
        if (this.systemFile && this.size) {
            this.setFinalImageUrl();
            this.setOriginalImagePath();
            this.setThumborlUrl();
        }
    }
    /**
     * @return {?}
     */
    setFinalImageUrl() {
        this.fullImageUrl = this.systemFile.fileBaseUrl + '.' + this.systemFile.extension;
        console.log('setFinalImageUrl', this.fullImageUrl);
    }
    /**
     * @return {?}
     */
    setOriginalImagePath() {
        this.fullImagePath = this.extractImageUrlFromSysfile();
        console.log('setOriginalImagePath', this.fullImagePath);
    }
    /**
     * @return {?}
     */
    setThumborlUrl() {
        this.resizedImageUrl = this.getThumborUrl();
        console.log('setThumborlUrl', this.resizedImageUrl);
    }
    /**
     * @return {?}
     */
    extractImageUrlFromSysfile() {
        try {
            return this.systemFile['fileBasePath'] || undefined;
        }
        catch (/** @type {?} */ error) {
            return undefined;
        }
    }
    /**
     * @return {?}
     */
    getImageSize() {
        return `${this.size.width || 0}x${this.size.height || 0}`;
    }
    /**
     * @return {?}
     */
    getThumborUrl() {
        const /** @type {?} */ size = this.getImageSize();
        return `${ThumborServerHost}/${size}/${this.fullImagePath}`;
    }
}
DecImageZoomComponent.decorators = [
    { type: Component, args: [{
                selector: 'dec-image-zoom',
                template: `<div class="imagehighlight-container" >
  <ngx-image-zoom
    [thumbImage]="resizedImageUrl"
    [fullImage]="fullImageUrl"
    [zoomMode]="zoomMode"
    [enableScrollZoom]="enableScrollZoom"
    [scrollStepSize]="scrollStepSize"
    [enableLens]="enableLens"
    [lensWidth]="lensWidth"
    [lensHeight]="lensHeight"
  ></ngx-image-zoom>
</div>

`,
                styles: [`.imagehighlight-container{width:100%;height:100%;cursor:zoom-in}`]
            },] },
];
/** @nocollapse */
DecImageZoomComponent.ctorParameters = () => [];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLWltYWdlLXpvb20uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL2RlYy1pbWFnZS16b29tL2RlYy1pbWFnZS16b29tLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFekQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sb0RBQW9ELENBQUM7QUFzQnZGLE1BQU07SUFnREo7d0JBeEM4QixPQUFPO2dDQUVULElBQUk7OEJBRU4sR0FBRzswQkFFUCxJQUFJO3lCQUVMLEdBQUc7MEJBRUYsR0FBRztLQThCUjs7Ozs7SUE1QmpCLElBQ0ksVUFBVSxDQUFDLENBQWdCO1FBQzdCLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUMzQixJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztZQUNyQixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7U0FDbEI7S0FDRjs7OztJQUVELElBQUksVUFBVTtRQUNaLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDO0tBQ3pCOzs7OztJQUVELElBQ0ksSUFBSSxDQUFDLENBQWU7UUFDdEIsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNOLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO1lBQ3BCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztTQUNsQjtLQUNGOzs7O0lBRUQsSUFBSSxJQUFJO1FBQ04sTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7S0FDeEI7Ozs7SUFRRCxRQUFRO0tBQ1A7Ozs7SUFFRCxTQUFTO1FBQ1AsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNqQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztZQUN4QixJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztZQUM1QixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7U0FDdkI7S0FDRjs7OztJQUVPLGdCQUFnQjtRQUN0QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQztRQUNsRixPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQzs7Ozs7SUFHN0Msb0JBQW9CO1FBQzFCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLDBCQUEwQixFQUFFLENBQUM7UUFDdkQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7Ozs7O0lBR2xELGNBQWM7UUFDcEIsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDNUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7Ozs7O0lBRzlDLDBCQUEwQjtRQUNoQyxJQUFJLENBQUM7WUFDSCxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsSUFBSSxTQUFTLENBQUM7U0FDckQ7UUFBQyxLQUFLLENBQUMsQ0FBQyxpQkFBQSxLQUFLLEVBQUUsQ0FBQztZQUNmLE1BQU0sQ0FBQyxTQUFTLENBQUM7U0FDbEI7Ozs7O0lBR0ssWUFBWTtRQUNsQixNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFLENBQUM7Ozs7O0lBR3BELGFBQWE7UUFDbkIsdUJBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNqQyxNQUFNLENBQUMsR0FBRyxpQkFBaUIsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDOzs7O1lBNUcvRCxTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGdCQUFnQjtnQkFDMUIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7O0NBYVg7Z0JBQ0MsTUFBTSxFQUFFLENBQUMsa0VBQWtFLENBQUM7YUFDN0U7Ozs7O3VCQVNFLEtBQUs7K0JBRUwsS0FBSzs2QkFFTCxLQUFLO3lCQUVMLEtBQUs7d0JBRUwsS0FBSzt5QkFFTCxLQUFLO3lCQUVMLEtBQUs7bUJBWUwsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGVjSW1hZ2VTaXplLCBTeXN0ZW1GaWxlS2V5IH0gZnJvbSAnLi8uLi8uLi9kaXJlY3RpdmVzL2ltYWdlL2ltYWdlLmRpcmVjdGl2ZS5tb2RlbHMnO1xuaW1wb3J0IHsgVGh1bWJvclNlcnZlckhvc3QgfSBmcm9tICcuLy4uLy4uL2RpcmVjdGl2ZXMvaW1hZ2UvaW1hZ2UuZGlyZWN0aXZlLmNvbnN0YW50cyc7XG5cbmV4cG9ydCB0eXBlIFpvb21Nb2RlID0gJ2hvdmVyJyB8ICdjbGljaycgfCAndG9nZ2xlJyB8ICdob3Zlci1mcmVlemUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtaW1hZ2Utem9vbScsXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cImltYWdlaGlnaGxpZ2h0LWNvbnRhaW5lclwiID5cbiAgPG5neC1pbWFnZS16b29tXG4gICAgW3RodW1iSW1hZ2VdPVwicmVzaXplZEltYWdlVXJsXCJcbiAgICBbZnVsbEltYWdlXT1cImZ1bGxJbWFnZVVybFwiXG4gICAgW3pvb21Nb2RlXT1cInpvb21Nb2RlXCJcbiAgICBbZW5hYmxlU2Nyb2xsWm9vbV09XCJlbmFibGVTY3JvbGxab29tXCJcbiAgICBbc2Nyb2xsU3RlcFNpemVdPVwic2Nyb2xsU3RlcFNpemVcIlxuICAgIFtlbmFibGVMZW5zXT1cImVuYWJsZUxlbnNcIlxuICAgIFtsZW5zV2lkdGhdPVwibGVuc1dpZHRoXCJcbiAgICBbbGVuc0hlaWdodF09XCJsZW5zSGVpZ2h0XCJcbiAgPjwvbmd4LWltYWdlLXpvb20+XG48L2Rpdj5cblxuYCxcbiAgc3R5bGVzOiBbYC5pbWFnZWhpZ2hsaWdodC1jb250YWluZXJ7d2lkdGg6MTAwJTtoZWlnaHQ6MTAwJTtjdXJzb3I6em9vbS1pbn1gXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNJbWFnZVpvb21Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIGZ1bGxJbWFnZVBhdGg6IGFueTtcblxuICBmdWxsSW1hZ2VVcmw6IGFueTtcblxuICByZXNpemVkSW1hZ2VVcmw6IGFueTtcblxuICBASW5wdXQoKSB6b29tTW9kZTogWm9vbU1vZGUgPSAnY2xpY2snO1xuXG4gIEBJbnB1dCgpIGVuYWJsZVNjcm9sbFpvb20gPSB0cnVlO1xuXG4gIEBJbnB1dCgpIHNjcm9sbFN0ZXBTaXplID0gMC4xO1xuXG4gIEBJbnB1dCgpIGVuYWJsZUxlbnMgPSB0cnVlO1xuXG4gIEBJbnB1dCgpIGxlbnNXaWR0aCA9IDEwMDtcblxuICBASW5wdXQoKSBsZW5zSGVpZ2h0ID0gMTAwO1xuXG4gIEBJbnB1dCgpXG4gIHNldCBzeXN0ZW1GaWxlKHY6IFN5c3RlbUZpbGVLZXkpIHtcbiAgICBpZiAodiAhPT0gdGhpcy5fc3lzdGVtRmlsZSkge1xuICAgICAgdGhpcy5fc3lzdGVtRmlsZSA9IHY7XG4gICAgICB0aGlzLmxvYWRJbWFnZSgpO1xuICAgIH1cbiAgfVxuXG4gIGdldCBzeXN0ZW1GaWxlKCk6IFN5c3RlbUZpbGVLZXkge1xuICAgIHJldHVybiB0aGlzLl9zeXN0ZW1GaWxlO1xuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IHNpemUodjogRGVjSW1hZ2VTaXplKSB7XG4gICAgaWYgKHYpIHtcbiAgICAgIHRoaXMuX3RodW1iU2l6ZSA9IHY7XG4gICAgICB0aGlzLmxvYWRJbWFnZSgpO1xuICAgIH1cbiAgfVxuXG4gIGdldCBzaXplKCk6IERlY0ltYWdlU2l6ZSB7XG4gICAgcmV0dXJuIHRoaXMuX3RodW1iU2l6ZTtcbiAgfVxuXG4gIHByaXZhdGUgX3N5c3RlbUZpbGU6IFN5c3RlbUZpbGVLZXk7XG5cbiAgcHJpdmF0ZSBfdGh1bWJTaXplOiBEZWNJbWFnZVNpemU7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG4gIGxvYWRJbWFnZSgpIHtcbiAgICBpZiAodGhpcy5zeXN0ZW1GaWxlICYmIHRoaXMuc2l6ZSkge1xuICAgICAgdGhpcy5zZXRGaW5hbEltYWdlVXJsKCk7XG4gICAgICB0aGlzLnNldE9yaWdpbmFsSW1hZ2VQYXRoKCk7XG4gICAgICB0aGlzLnNldFRodW1ib3JsVXJsKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzZXRGaW5hbEltYWdlVXJsKCkge1xuICAgIHRoaXMuZnVsbEltYWdlVXJsID0gdGhpcy5zeXN0ZW1GaWxlLmZpbGVCYXNlVXJsICsgJy4nICsgdGhpcy5zeXN0ZW1GaWxlLmV4dGVuc2lvbjtcbiAgICBjb25zb2xlLmxvZygnc2V0RmluYWxJbWFnZVVybCcsIHRoaXMuZnVsbEltYWdlVXJsKTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0T3JpZ2luYWxJbWFnZVBhdGgoKSB7XG4gICAgdGhpcy5mdWxsSW1hZ2VQYXRoID0gdGhpcy5leHRyYWN0SW1hZ2VVcmxGcm9tU3lzZmlsZSgpO1xuICAgIGNvbnNvbGUubG9nKCdzZXRPcmlnaW5hbEltYWdlUGF0aCcsIHRoaXMuZnVsbEltYWdlUGF0aCk7XG4gIH1cblxuICBwcml2YXRlIHNldFRodW1ib3JsVXJsKCkge1xuICAgIHRoaXMucmVzaXplZEltYWdlVXJsID0gdGhpcy5nZXRUaHVtYm9yVXJsKCk7XG4gICAgY29uc29sZS5sb2coJ3NldFRodW1ib3JsVXJsJywgdGhpcy5yZXNpemVkSW1hZ2VVcmwpO1xuICB9XG5cbiAgcHJpdmF0ZSBleHRyYWN0SW1hZ2VVcmxGcm9tU3lzZmlsZSgpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIHRoaXMuc3lzdGVtRmlsZVsnZmlsZUJhc2VQYXRoJ10gfHwgdW5kZWZpbmVkO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZ2V0SW1hZ2VTaXplKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGAke3RoaXMuc2l6ZS53aWR0aCB8fCAwfXgke3RoaXMuc2l6ZS5oZWlnaHQgfHwgMH1gO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRUaHVtYm9yVXJsKCkge1xuICAgIGNvbnN0IHNpemUgPSB0aGlzLmdldEltYWdlU2l6ZSgpO1xuICAgIHJldHVybiBgJHtUaHVtYm9yU2VydmVySG9zdH0vJHtzaXplfS8ke3RoaXMuZnVsbEltYWdlUGF0aH1gO1xuICB9XG59XG4iXX0=