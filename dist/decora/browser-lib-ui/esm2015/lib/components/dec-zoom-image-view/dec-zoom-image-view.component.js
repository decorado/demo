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
            this.finalImageUrl = this.innerImage.fileBaseUrl + '.' + this.innerImage.extension;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLXpvb20taW1hZ2Utdmlldy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvZGVjLXpvb20taW1hZ2Utdmlldy9kZWMtem9vbS1pbWFnZS12aWV3LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFekQsdUJBQU0saUJBQWlCLEdBQUcsK0NBQStDLENBQUE7QUFvQnpFLE1BQU07SUFxQ0o7O3dCQWxCNEIsT0FBTztnQ0FFRSxJQUFJOzhCQUVQLEdBQUc7MEJBRU4sS0FBSzt5QkFFUCxHQUFHOzBCQUVGLEdBQUc7S0FRaEI7Ozs7O0lBbkNqQixJQUNJLFFBQVEsQ0FBQyxDQUFDO1FBQ1osRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQzFCLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO1lBQ3BCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztTQUNsQjtLQUNGOzs7OztJQUVELElBQ0ksY0FBYyxDQUFDLENBQUM7UUFDbEIsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNOLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO1lBQ25CLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztTQUNsQjtLQUNGOzs7O0lBdUJELFFBQVE7S0FDUDs7OztJQUVELFNBQVM7UUFDUCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ3RDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLDBCQUEwQixFQUFFLENBQUM7WUFDbkQsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUM7WUFDbkYsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7U0FDeEM7S0FDRjs7OztJQUVPLDBCQUEwQjtRQUNoQyxJQUFJLENBQUM7WUFDSCxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsSUFBSSxTQUFTLENBQUM7U0FDckQ7UUFBQyxLQUFLLENBQUMsQ0FBQyxpQkFBQSxLQUFLLEVBQUUsQ0FBQztZQUNmLE1BQU0sQ0FBQyxTQUFTLENBQUM7U0FDbEI7Ozs7OztJQUdLLFlBQVksQ0FBQyxTQUFjO1FBQ2pDLE1BQU0sQ0FBQyxHQUFHLFNBQVMsQ0FBQyxLQUFLLElBQUksQ0FBQyxJQUFJLFNBQVMsQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFLENBQUM7Ozs7O0lBR3BELGFBQWE7UUFDbkIsdUJBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQy9DLE1BQU0sQ0FBQyxHQUFHLGlCQUFpQixJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7Ozs7WUFsRjNELFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUscUJBQXFCO2dCQUMvQixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Q0FhWDtnQkFDQyxNQUFNLEVBQUUsQ0FBQyxrRUFBa0UsQ0FBQzthQUM3RTs7Ozs7dUJBR0UsS0FBSzs2QkFRTCxLQUFLO3VCQVNMLEtBQUs7K0JBRUwsS0FBSzs2QkFFTCxLQUFLO3lCQUVMLEtBQUs7d0JBRUwsS0FBSzt5QkFFTCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmNvbnN0IFRodW1ib3JTZXJ2ZXJIb3N0ID0gJ2h0dHBzOi8vY2FjaGUtdGh1bWJzLmRlY29yYWNvbnRlbnQuY29tL3Vuc2FmZSdcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLXpvb20taW1hZ2UtdmlldycsXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cImltYWdlaGlnaGxpZ2h0LWNvbnRhaW5lclwiID5cbiAgICA8bmd4LWltYWdlLXpvb20gXG4gICAgICAgIFt0aHVtYkltYWdlXT1cInRodW1iSW1hZ2VcIlxuICAgICAgICBbZnVsbEltYWdlXT1cImZpbmFsSW1hZ2VVcmxcIlxuICAgICAgICBbem9vbU1vZGVdPVwiem9vbU1vZGVcIlxuICAgICAgICBbZW5hYmxlU2Nyb2xsWm9vbV09XCJlbmFibGVTY3JvbGxab29tXCJcbiAgICAgICAgW3Njcm9sbFN0ZXBTaXplXT1cInNjcm9sbFN0ZXBTaXplXCJcbiAgICAgICAgW2VuYWJsZUxlbnNdPVwiZW5hYmxlTGVuc1wiXG4gICAgICAgIFtsZW5zV2lkdGhdPVwibGVuc1dpZHRoXCJcbiAgICAgICAgW2xlbnNIZWlnaHRdPVwibGVuc0hlaWdodFwiPlxuICAgIDwvbmd4LWltYWdlLXpvb20+XG48L2Rpdj5cblxuYCxcbiAgc3R5bGVzOiBbYC5pbWFnZWhpZ2hsaWdodC1jb250YWluZXJ7d2lkdGg6MTAwJTtoZWlnaHQ6MTAwJTtjdXJzb3I6em9vbS1pbn1gXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNab29tSW1hZ2VWaWV3Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBASW5wdXQoKVxuICBzZXQgZGVjSW1hZ2Uodikge1xuICAgIGlmICh2ICE9PSB0aGlzLmlubmVySW1hZ2UpIHtcbiAgICAgIHRoaXMuaW5uZXJJbWFnZSA9IHY7XG4gICAgICB0aGlzLmxvYWRJbWFnZSgpO1xuICAgIH1cbiAgfVxuXG4gIEBJbnB1dCgpIFxuICBzZXQgdGh1bWJJbWFnZVNpemUodikge1xuICAgIGlmICh2KSB7XG4gICAgICB0aGlzLnRodW1iU2l6ZSA9IHY7XG4gICAgICB0aGlzLmxvYWRJbWFnZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8vIGhvdmVyIHwgY2xpY2sgfCB0b2dnbGUgfCBob3Zlci1mcmVlemVcbiAgQElucHV0KCkgem9vbU1vZGU6IHN0cmluZyA9ICdjbGljayc7XG5cbiAgQElucHV0KCkgZW5hYmxlU2Nyb2xsWm9vbTogQm9vbGVhbiA9IHRydWU7XG5cbiAgQElucHV0KCkgc2Nyb2xsU3RlcFNpemU6IG51bWJlciA9IDAuMTtcblxuICBASW5wdXQoKSBlbmFibGVMZW5zOiBCb29sZWFuID0gZmFsc2U7XG5cbiAgQElucHV0KCkgbGVuc1dpZHRoOiBudW1iZXIgPSAxMDA7XG5cbiAgQElucHV0KCkgbGVuc0hlaWdodDogbnVtYmVyID0gMTAwO1xuXG4gIGlubmVySW1hZ2U6IGFueTtcbiAgaW1hZ2VQYXRoOiBhbnk7XG4gIGZpbmFsSW1hZ2VVcmw6IGFueTtcbiAgdGh1bWJJbWFnZTogYW55O1xuICB0aHVtYlNpemU6IGFueTtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICB9XG5cbiAgbG9hZEltYWdlKCkge1xuICAgIGlmICh0aGlzLmlubmVySW1hZ2UgJiYgdGhpcy50aHVtYlNpemUpIHtcbiAgICAgIHRoaXMuaW1hZ2VQYXRoID0gdGhpcy5leHRyYWN0SW1hZ2VVcmxGcm9tU3lzZmlsZSgpO1xuICAgICAgdGhpcy5maW5hbEltYWdlVXJsID0gdGhpcy5pbm5lckltYWdlLmZpbGVCYXNlVXJsICsgJy4nICsgdGhpcy5pbm5lckltYWdlLmV4dGVuc2lvbjtcbiAgICAgIHRoaXMudGh1bWJJbWFnZSA9IHRoaXMuZ2V0VGh1bWJvclVybCgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZXh0cmFjdEltYWdlVXJsRnJvbVN5c2ZpbGUoKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiB0aGlzLmlubmVySW1hZ2VbJ2ZpbGVCYXNlUGF0aCddIHx8IHVuZGVmaW5lZDtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGdldEltYWdlU2l6ZSh0aHVtYlNpemU6IGFueSk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGAke3RodW1iU2l6ZS53aWR0aCB8fCAwfXgke3RodW1iU2l6ZS5oZWlnaHQgfHwgMH1gO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRUaHVtYm9yVXJsKCkge1xuICAgIGNvbnN0IHNpemUgPSB0aGlzLmdldEltYWdlU2l6ZSh0aGlzLnRodW1iU2l6ZSk7XG4gICAgcmV0dXJuIGAke1RodW1ib3JTZXJ2ZXJIb3N0fS8ke3NpemV9LyR7dGhpcy5pbWFnZVBhdGh9YDtcbiAgfVxufVxuIl19