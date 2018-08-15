/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input } from '@angular/core';
const /** @type {?} */ ThumborServerHost = 'https://cache-thumbs.decoracontent.com/unsafe';
export class DecZoomImageViewComponent {
    constructor() {
        // hover | click | toggle | hover-freeze
        this.zoomMode = 'click';
        this.enableScrollZoom = true;
        this.scrollStepSize = 0.1;
        this.enableLens = false;
        this.lensWidth = 100;
        this.lensHeight = 100;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set decImage(v) {
        if (v !== this.innerImage) {
            this.innerImage = v;
            this.loadImage();
        }
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set thumbImageSize(v) {
        if (v) {
            this.thumbSize = v;
            this.loadImage();
        }
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
        if (this.innerImage && this.thumbSize) {
            this.imagePath = this.extractImageUrlFromSysfile();
            this.finalImageUrl = this.innerImage.fileUrl;
            this.thumbImage = this.getThumborUrl();
        }
    }
    /**
     * @return {?}
     */
    extractImageUrlFromSysfile() {
        try {
            return this.innerImage['fileBasePath'] || undefined;
        }
        catch (/** @type {?} */ error) {
            return undefined;
        }
    }
    /**
     * @param {?} thumbSize
     * @return {?}
     */
    getImageSize(thumbSize) {
        return `${thumbSize.width || 0}x${thumbSize.height || 0}`;
    }
    /**
     * @return {?}
     */
    getThumborUrl() {
        const /** @type {?} */ size = this.getImageSize(this.thumbSize);
        return `${ThumborServerHost}/${size}/${this.imagePath}`;
    }
}
DecZoomImageViewComponent.decorators = [
    { type: Component, args: [{
                selector: 'dec-zoom-image-view',
                template: `<div class="imagehighlight-container" >
    <ngx-image-zoom 
        [thumbImage]="thumbImage"
        [fullImage]="finalImageUrl"
        [zoomMode]="zoomMode"
        [enableScrollZoom]="enableScrollZoom"
        [scrollStepSize]="scrollStepSize"
        [enableLens]="enableLens"
        [lensWidth]="lensWidth"
        [lensHeight]="lensHeight">
    </ngx-image-zoom>
</div>

`,
                styles: [`.imagehighlight-container{width:100%;height:100%;cursor:zoom-in}`]
            },] },
];
/** @nocollapse */
DecZoomImageViewComponent.ctorParameters = () => [];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLXpvb20taW1hZ2Utdmlldy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvZGVjLXpvb20taW1hZ2Utdmlldy9kZWMtem9vbS1pbWFnZS12aWV3LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFekQsdUJBQU0saUJBQWlCLEdBQUcsK0NBQStDLENBQUE7QUFvQnpFLE1BQU07SUFxQ0o7O3dCQWxCNEIsT0FBTztnQ0FFRSxJQUFJOzhCQUVQLEdBQUc7MEJBRU4sS0FBSzt5QkFFUCxHQUFHOzBCQUVGLEdBQUc7S0FRaEI7Ozs7O0lBbkNqQixJQUNJLFFBQVEsQ0FBQyxDQUFDO1FBQ1osRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQzFCLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO1lBQ3BCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztTQUNsQjtLQUNGOzs7OztJQUVELElBQ0ksY0FBYyxDQUFDLENBQUM7UUFDbEIsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNOLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO1lBQ25CLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztTQUNsQjtLQUNGOzs7O0lBdUJELFFBQVE7S0FDUDs7OztJQUVELFNBQVM7UUFDUCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ3RDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLDBCQUEwQixFQUFFLENBQUM7WUFDbkQsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQztZQUM3QyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztTQUN4QztLQUNGOzs7O0lBRU8sMEJBQTBCO1FBQ2hDLElBQUksQ0FBQztZQUNILE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxJQUFJLFNBQVMsQ0FBQztTQUNyRDtRQUFDLEtBQUssQ0FBQyxDQUFDLGlCQUFBLEtBQUssRUFBRSxDQUFDO1lBQ2YsTUFBTSxDQUFDLFNBQVMsQ0FBQztTQUNsQjs7Ozs7O0lBR0ssWUFBWSxDQUFDLFNBQWM7UUFDakMsTUFBTSxDQUFDLEdBQUcsU0FBUyxDQUFDLEtBQUssSUFBSSxDQUFDLElBQUksU0FBUyxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUUsQ0FBQzs7Ozs7SUFHcEQsYUFBYTtRQUNuQix1QkFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDL0MsTUFBTSxDQUFDLEdBQUcsaUJBQWlCLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQzs7OztZQWxGM0QsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxxQkFBcUI7Z0JBQy9CLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7OztDQWFYO2dCQUNDLE1BQU0sRUFBRSxDQUFDLGtFQUFrRSxDQUFDO2FBQzdFOzs7Ozt1QkFHRSxLQUFLOzZCQVFMLEtBQUs7dUJBU0wsS0FBSzsrQkFFTCxLQUFLOzZCQUVMLEtBQUs7eUJBRUwsS0FBSzt3QkFFTCxLQUFLO3lCQUVMLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuY29uc3QgVGh1bWJvclNlcnZlckhvc3QgPSAnaHR0cHM6Ly9jYWNoZS10aHVtYnMuZGVjb3JhY29udGVudC5jb20vdW5zYWZlJ1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtem9vbS1pbWFnZS12aWV3JyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwiaW1hZ2VoaWdobGlnaHQtY29udGFpbmVyXCIgPlxuICAgIDxuZ3gtaW1hZ2Utem9vbSBcbiAgICAgICAgW3RodW1iSW1hZ2VdPVwidGh1bWJJbWFnZVwiXG4gICAgICAgIFtmdWxsSW1hZ2VdPVwiZmluYWxJbWFnZVVybFwiXG4gICAgICAgIFt6b29tTW9kZV09XCJ6b29tTW9kZVwiXG4gICAgICAgIFtlbmFibGVTY3JvbGxab29tXT1cImVuYWJsZVNjcm9sbFpvb21cIlxuICAgICAgICBbc2Nyb2xsU3RlcFNpemVdPVwic2Nyb2xsU3RlcFNpemVcIlxuICAgICAgICBbZW5hYmxlTGVuc109XCJlbmFibGVMZW5zXCJcbiAgICAgICAgW2xlbnNXaWR0aF09XCJsZW5zV2lkdGhcIlxuICAgICAgICBbbGVuc0hlaWdodF09XCJsZW5zSGVpZ2h0XCI+XG4gICAgPC9uZ3gtaW1hZ2Utem9vbT5cbjwvZGl2PlxuXG5gLFxuICBzdHlsZXM6IFtgLmltYWdlaGlnaGxpZ2h0LWNvbnRhaW5lcnt3aWR0aDoxMDAlO2hlaWdodDoxMDAlO2N1cnNvcjp6b29tLWlufWBdXG59KVxuZXhwb3J0IGNsYXNzIERlY1pvb21JbWFnZVZpZXdDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIEBJbnB1dCgpXG4gIHNldCBkZWNJbWFnZSh2KSB7XG4gICAgaWYgKHYgIT09IHRoaXMuaW5uZXJJbWFnZSkge1xuICAgICAgdGhpcy5pbm5lckltYWdlID0gdjtcbiAgICAgIHRoaXMubG9hZEltYWdlKCk7XG4gICAgfVxuICB9XG5cbiAgQElucHV0KCkgXG4gIHNldCB0aHVtYkltYWdlU2l6ZSh2KSB7XG4gICAgaWYgKHYpIHtcbiAgICAgIHRoaXMudGh1bWJTaXplID0gdjtcbiAgICAgIHRoaXMubG9hZEltYWdlKCk7XG4gICAgfVxuICB9XG5cbiAgLy8gaG92ZXIgfCBjbGljayB8IHRvZ2dsZSB8IGhvdmVyLWZyZWV6ZVxuICBASW5wdXQoKSB6b29tTW9kZTogc3RyaW5nID0gJ2NsaWNrJztcblxuICBASW5wdXQoKSBlbmFibGVTY3JvbGxab29tOiBCb29sZWFuID0gdHJ1ZTtcblxuICBASW5wdXQoKSBzY3JvbGxTdGVwU2l6ZTogbnVtYmVyID0gMC4xO1xuXG4gIEBJbnB1dCgpIGVuYWJsZUxlbnM6IEJvb2xlYW4gPSBmYWxzZTtcblxuICBASW5wdXQoKSBsZW5zV2lkdGg6IG51bWJlciA9IDEwMDtcblxuICBASW5wdXQoKSBsZW5zSGVpZ2h0OiBudW1iZXIgPSAxMDA7XG5cbiAgaW5uZXJJbWFnZTogYW55O1xuICBpbWFnZVBhdGg6IGFueTtcbiAgZmluYWxJbWFnZVVybDogYW55O1xuICB0aHVtYkltYWdlOiBhbnk7XG4gIHRodW1iU2l6ZTogYW55O1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxuICBsb2FkSW1hZ2UoKSB7XG4gICAgaWYgKHRoaXMuaW5uZXJJbWFnZSAmJiB0aGlzLnRodW1iU2l6ZSkge1xuICAgICAgdGhpcy5pbWFnZVBhdGggPSB0aGlzLmV4dHJhY3RJbWFnZVVybEZyb21TeXNmaWxlKCk7XG4gICAgICB0aGlzLmZpbmFsSW1hZ2VVcmwgPSB0aGlzLmlubmVySW1hZ2UuZmlsZVVybDtcbiAgICAgIHRoaXMudGh1bWJJbWFnZSA9IHRoaXMuZ2V0VGh1bWJvclVybCgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZXh0cmFjdEltYWdlVXJsRnJvbVN5c2ZpbGUoKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiB0aGlzLmlubmVySW1hZ2VbJ2ZpbGVCYXNlUGF0aCddIHx8IHVuZGVmaW5lZDtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGdldEltYWdlU2l6ZSh0aHVtYlNpemU6IGFueSk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGAke3RodW1iU2l6ZS53aWR0aCB8fCAwfXgke3RodW1iU2l6ZS5oZWlnaHQgfHwgMH1gO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRUaHVtYm9yVXJsKCkge1xuICAgIGNvbnN0IHNpemUgPSB0aGlzLmdldEltYWdlU2l6ZSh0aGlzLnRodW1iU2l6ZSk7XG4gICAgcmV0dXJuIGAke1RodW1ib3JTZXJ2ZXJIb3N0fS8ke3NpemV9LyR7dGhpcy5pbWFnZVBhdGh9YDtcbiAgfVxufVxuIl19