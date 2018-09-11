/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input, ViewChild, ElementRef } from '@angular/core';
const /** @type {?} */ S3Host = 'http://s3.amazonaws.com/decora-platform-1-nv';
export class DecImageZoomComponent {
    constructor() {
        // zoom
        this.isZoom = false;
        this.steps = 1;
        this.finalZoom = false;
        this.imageSize = 1024;
        this.offsetX = 0;
        this.offsetY = 0;
        this.initZoom = () => {
            const /** @type {?} */ el = this.getNativeElement(this.divImage);
            this.lastMouseX = 0;
            this.lastMouseY = 0;
            let /** @type {?} */ mousedown = false;
            let /** @type {?} */ mousemove = false;
            el.onmousedown = (e) => {
                if (this.isZoom) {
                    const /** @type {?} */ coords = getPos(e), /** @type {?} */
                    x = coords[0], /** @type {?} */
                    y = coords[1];
                    this.deltaX = x - this.offsetX;
                    this.deltaY = y - this.offsetY;
                    mousedown = true;
                    return;
                }
                this.lastMouseX = e.offsetX;
                this.lastMouseY = e.offsetY;
                mousedown = true;
            };
            el.onmousemove = (e) => {
                if (this.isZoom && mousedown) {
                    const /** @type {?} */ coords = getPos(e), /** @type {?} */
                    x = coords[0], /** @type {?} */
                    y = coords[1];
                    if (((x - this.deltaX) * (-1)) + el.offsetWidth < this.imageSize) {
                        this.offsetX = x - this.deltaX;
                    }
                    if (((y - this.deltaY) * (-1)) + el.offsetWidth < this.imageSize) {
                        this.offsetY = y - this.deltaY;
                    }
                    if (this.offsetY > 0) {
                        this.offsetY = 0;
                    }
                    if (this.offsetX > 0) {
                        this.offsetX = 0;
                    }
                    el.style.backgroundPosition = this.offsetX + 'px ' + this.offsetY + 'px';
                    return;
                }
            };
            el.onmouseup = () => {
                if (this.isZoom) {
                    mousedown = false;
                    mousemove = false;
                    return;
                }
            };
            /**
             * @param {?} e
             * @return {?}
             */
            function getPos(e) {
                const /** @type {?} */ r = el.getBoundingClientRect(), /** @type {?} */
                x = e.clientX - r.left, /** @type {?} */
                y = e.clientY - r.top;
                return [x, y];
            }
        };
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set image(v) {
        if (v) {
            this._image = v;
            this.loadHighLightImage();
        }
    }
    /**
     * @return {?}
     */
    get image() {
        return this._image;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set size(v) {
        if (v) {
            this._size = v;
        }
    }
    /**
     * @return {?}
     */
    get size() {
        return this._size;
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.initZoom();
    }
    /**
     * @return {?}
     */
    zoomIn() {
        if (this.steps === 1) {
            this.getStepsDiff();
        }
        if (this.steps > 4) {
            this.finalZoom = true;
            return;
        }
        const /** @type {?} */ el = this.divImage.nativeElement;
        this.imageSize += this.stepsDiff;
        el.style.backgroundSize = this.imageSize + 'px';
        this.offsetX = (el.offsetWidth - this.imageSize) / 2;
        this.offsetY = (el.offsetHeight - this.imageSize) / 2;
        el.style.backgroundPosition = this.offsetX + 'px ' + this.offsetY + 'px';
        this.isZoom = true;
        this.steps++;
    }
    /**
     * @return {?}
     */
    zoomOut() {
        const /** @type {?} */ el = this.divImage.nativeElement;
        if (this.steps === 2) {
            this.imageSize = 1024;
            el.style.backgroundSize = '100%';
            el.style.backgroundPosition = '0px 0px';
            this.offsetX = 0;
            this.offsetY = 0;
            this.isZoom = false;
            this.steps = 1;
        }
        else if (this.steps > 1) {
            this.imageSize -= this.stepsDiff;
            el.style.backgroundSize = this.imageSize + 'px';
            this.offsetX = (el.offsetWidth - this.imageSize) / 2;
            this.offsetY = (el.offsetHeight - this.imageSize) / 2;
            el.style.backgroundPosition = this.offsetX + 'px ' + this.offsetY + 'px';
            this.steps--;
            this.finalZoom = false;
        }
    }
    /**
     * @return {?}
     */
    getStepsDiff() {
        this.stepsDiff = (this.imageSizeRaw.width / 4);
    }
    /**
     * @param {?} divImage
     * @return {?}
     */
    getNativeElement(divImage) {
        if (divImage) {
            return divImage.nativeElement;
        }
        setTimeout(() => {
            this.getNativeElement(divImage);
        }, 400);
    }
    /**
     * @return {?}
     */
    loadHighLightImage() {
        this.divImage.nativeElement.style.backgroundSize = '100%';
        this.divImage.nativeElement.style.backgroundPosition = '0px 0px';
        this.divImage.nativeElement.style.backgroundImage = '';
        this.isZoom = false;
        this.divImage.nativeElement.parentElement.classList.add('dec-sysfile-bg-load');
        const /** @type {?} */ downloadImage = new Image();
        downloadImage.onload = () => {
            this.divImage.nativeElement.style.backgroundImage = 'url(' + downloadImage.src + ' )';
            this.divImage.nativeElement.style.backgroundRepeat = 'no-repeat';
            this.divImage.nativeElement.parentElement.classList.remove('dec-sysfile-bg-load');
            this.imgExternalLink = downloadImage.src;
            this.imageSizeRaw = {
                width: downloadImage.width,
                height: downloadImage.height
            };
        };
        downloadImage.src = this.getImageUrl();
    }
    /**
     * @return {?}
     */
    getImageUrl() {
        if (this.image && this.image.fileUrl) {
            return this.image.fileUrl;
        }
        else if (this.image && this.image.fileBasePath) {
            return `${S3Host}/${this.image.fileBasePath}`;
        }
        else {
            return 'data:image/png;base64,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';
        }
    }
}
DecImageZoomComponent.decorators = [
    { type: Component, args: [{
                selector: 'dec-image-zoom',
                template: `<div class="imagehighlight-container" fxLayout="column" fxLayoutAlign="space-between start" fxLayoutGap="gappx">
  <div #imageContainer class="imagehighlight-container">
  </div>
  <div class="container-img-link">
    <span [ngClass]="{'zoom-in-active': finalZoom, 'zoom-in': !finalZoom}" (click)="zoomIn()">
      <mat-icon class="icons-zoom">add_circle_outline</mat-icon>
    </span>
    <span [ngClass]="{'zoom-out-active': !isZoom, 'zoom-out': isZoom}" (click)="zoomOut()">
      <mat-icon class="icons-zoom">remove_circle_outline</mat-icon>
    </span>
    <span *ngIf="imgExternalLink" class="img-link">
      <a href="{{ imgExternalLink }}" target="_blank">{{ 'label.image-link' | translate }}</a>
    </span>
  </div>
</div>`,
                styles: [`.imagehighlight-container{width:100%;height:100%}.container-img-link{position:relative;width:100%;height:20px}.zoom-in{cursor:pointer;color:red;position:absolute;right:0}.zoom-out{cursor:pointer;color:red;position:absolute;right:20px}.zoom-in-active{color:gray;position:absolute;right:0}.zoom-out-active{color:gray;position:absolute;right:20px}.icons-zoom{font-size:18px}.img-link{position:absolute;right:50px;color:gray}.img-link a{font-size:10px;padding-top:2px}`]
            },] },
];
/** @nocollapse */
DecImageZoomComponent.ctorParameters = () => [];
DecImageZoomComponent.propDecorators = {
    image: [{ type: Input }],
    size: [{ type: Input }],
    divImage: [{ type: ViewChild, args: ['imageContainer',] }]
};
function DecImageZoomComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    DecImageZoomComponent.prototype.divImage;
    /** @type {?} */
    DecImageZoomComponent.prototype._image;
    /** @type {?} */
    DecImageZoomComponent.prototype._size;
    /** @type {?} */
    DecImageZoomComponent.prototype.imgExternalLink;
    /** @type {?} */
    DecImageZoomComponent.prototype.isZoom;
    /** @type {?} */
    DecImageZoomComponent.prototype.imageSizeRaw;
    /** @type {?} */
    DecImageZoomComponent.prototype.steps;
    /** @type {?} */
    DecImageZoomComponent.prototype.stepsDiff;
    /** @type {?} */
    DecImageZoomComponent.prototype.finalZoom;
    /** @type {?} */
    DecImageZoomComponent.prototype.imageSize;
    /** @type {?} */
    DecImageZoomComponent.prototype.deltaX;
    /** @type {?} */
    DecImageZoomComponent.prototype.deltaY;
    /** @type {?} */
    DecImageZoomComponent.prototype.lastMouseX;
    /** @type {?} */
    DecImageZoomComponent.prototype.lastMouseY;
    /** @type {?} */
    DecImageZoomComponent.prototype.offsetX;
    /** @type {?} */
    DecImageZoomComponent.prototype.offsetY;
    /** @type {?} */
    DecImageZoomComponent.prototype.initZoom;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLWltYWdlLXpvb20uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL2RlYy1pbWFnZS16b29tL2RlYy1pbWFnZS16b29tLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFFdkYsdUJBQU0sTUFBTSxHQUFHLDhDQUE4QyxDQUFDO0FBdUI5RCxNQUFNO0lBZ0RKOztzQkFmUyxLQUFLO3FCQUVOLENBQUM7eUJBRUcsS0FBSzt5QkFDTCxJQUFJO3VCQU9OLENBQUM7dUJBQ0QsQ0FBQzt3QkFRQSxHQUFHLEVBQUU7WUFDZCx1QkFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNoRCxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQztZQUNwQixJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQztZQUNwQixxQkFBSSxTQUFTLEdBQUcsS0FBSyxDQUFDO1lBQ3RCLHFCQUFJLFNBQVMsR0FBRyxLQUFLLENBQUM7WUFFdEIsRUFBRSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFO2dCQUNyQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztvQkFDaEIsdUJBQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUM7b0JBQ3RCLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDO29CQUNiLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBRWhCLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7b0JBQy9CLElBQUksQ0FBQyxNQUFN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V0wsU0FBUyxTQUFDLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIFZpZXdDaGlsZCwgRWxlbWVudFJlZiwgQWZ0ZXJWaWV3SW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5jb25zdCBTM0hvc3QgPSAnaHR0cDovL3MzLmFtYXpvbmF3cy5jb20vZGVjb3JhLXBsYXRmb3JtLTEtbnYnO1xuXG5leHBvcnQgdHlwZSBab29tTW9kZSA9ICdob3ZlcicgfCAnY2xpY2snIHwgJ3RvZ2dsZScgfCAnaG92ZXItZnJlZXplJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLWltYWdlLXpvb20nLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJpbWFnZWhpZ2hsaWdodC1jb250YWluZXJcIiBmeExheW91dD1cImNvbHVtblwiIGZ4TGF5b3V0QWxpZ249XCJzcGFjZS1iZXR3ZWVuIHN0YXJ0XCIgZnhMYXlvdXRHYXA9XCJnYXBweFwiPlxuICA8ZGl2ICNpbWFnZUNvbnRhaW5lciBjbGFzcz1cImltYWdlaGlnaGxpZ2h0LWNvbnRhaW5lclwiPlxuICA8L2Rpdj5cbiAgPGRpdiBjbGFzcz1cImNvbnRhaW5lci1pbWctbGlua1wiPlxuICAgIDxzcGFuIFtuZ0NsYXNzXT1cInsnem9vbS1pbi1hY3RpdmUnOiBmaW5hbFpvb20sICd6b29tLWluJzogIWZpbmFsWm9vbX1cIiAoY2xpY2spPVwiem9vbUluKClcIj5cbiAgICAgIDxtYXQtaWNvbiBjbGFzcz1cImljb25zLXpvb21cIj5hZGRfY2lyY2xlX291dGxpbmU8L21hdC1pY29uPlxuICAgIDwvc3Bhbj5cbiAgICA8c3BhbiBbbmdDbGFzc109XCJ7J3pvb20tb3V0LWFjdGl2ZSc6ICFpc1pvb20sICd6b29tLW91dCc6IGlzWm9vbX1cIiAoY2xpY2spPVwiem9vbU91dCgpXCI+XG4gICAgICA8bWF0LWljb24gY2xhc3M9XCJpY29ucy16b29tXCI+cmVtb3ZlX2NpcmNsZV9vdXRsaW5lPC9tYXQtaWNvbj5cbiAgICA8L3NwYW4+XG4gICAgPHNwYW4gKm5nSWY9XCJpbWdFeHRlcm5hbExpbmtcIiBjbGFzcz1cImltZy1saW5rXCI+XG4gICAgICA8YSBocmVmPVwie3sgaW1nRXh0ZXJuYWxMaW5rIH19XCIgdGFyZ2V0PVwiX2JsYW5rXCI+e3sgJ2xhYmVsLmltYWdlLWxpbmsnIHwgdHJhbnNsYXRlIH19PC9hPlxuICAgIDwvc3Bhbj5cbiAgPC9kaXY+XG48L2Rpdj5gLFxuICBzdHlsZXM6IFtgLmltYWdlaGlnaGxpZ2h0LWNvbnRhaW5lcnt3aWR0aDoxMDAlO2hlaWdodDoxMDAlfS5jb250YWluZXItaW1nLWxpbmt7cG9zaXRpb246cmVsYXRpdmU7d2lkdGg6MTAwJTtoZWlnaHQ6MjBweH0uem9vbS1pbntjdXJzb3I6cG9pbnRlcjtjb2xvcjpyZWQ7cG9zaXRpb246YWJzb2x1dGU7cmlnaHQ6MH0uem9vbS1vdXR7Y3Vyc29yOnBvaW50ZXI7Y29sb3I6cmVkO3Bvc2l0aW9uOmFic29sdXRlO3JpZ2h0OjIwcHh9Lnpvb20taW4tYWN0aXZle2NvbG9yOmdyYXk7cG9zaXRpb246YWJzb2x1dGU7cmlnaHQ6MH0uem9vbS1vdXQtYWN0aXZle2NvbG9yOmdyYXk7cG9zaXRpb246YWJzb2x1dGU7cmlnaHQ6MjBweH0uaWNvbnMtem9vbXtmb250LXNpemU6MThweH0uaW1nLWxpbmt7cG9zaXRpb246YWJzb2x1dGU7cmlnaHQ6NTBweDtjb2xvcjpncmF5fS5pbWctbGluayBhe2ZvbnQtc2l6ZToxMHB4O3BhZGRpbmctdG9wOjJweH1gXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNJbWFnZVpvb21Db21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcblxuICBASW5wdXQoKVxuICBzZXQgaW1hZ2Uodikge1xuICAgIGlmICh2KSB7XG4gICAgICB0aGlzLl9pbWFnZSA9IHY7XG4gICAgICB0aGlzLmxvYWRIaWdoTGlnaHRJbWFnZSgpO1xuICAgIH1cbiAgfVxuXG4gIGdldCBpbWFnZSgpIHtcbiAgICByZXR1cm4gdGhpcy5faW1hZ2U7XG4gIH1cblxuICBASW5wdXQoKVxuICBzZXQgc2l6ZSh2KSB7XG4gICAgaWYgKHYpIHtcbiAgICAgIHRoaXMuX3NpemUgPSB2O1xuICAgIH1cbiAgfVxuXG4gIGdldCBzaXplKCkge1xuICAgIHJldHVybiB0aGlzLl9zaXplO1xuICB9XG5cbiAgQFZpZXdDaGlsZCgnaW1hZ2VDb250YWluZXInKSBkaXZJbWFnZTogRWxlbWVudFJlZjtcblxuICBwcml2YXRlIF9pbWFnZTogYW55O1xuICBwcml2YXRlIF9zaXplOiBhbnk7XG5cbiAgaW1nRXh0ZXJuYWxMaW5rOiBzdHJpbmc7XG4gIFxuICAvLyB6b29tXG4gIGlzWm9vbSA9IGZhbHNlO1xuICBpbWFnZVNpemVSYXc6IGFueTtcbiAgc3RlcHMgPSAxO1xuICBzdGVwc0RpZmY6IGFueTtcbiAgZmluYWxab29tID0gZmFsc2U7XG4gIGltYWdlU2l6ZSA9IDEwMjQ7XG5cbiAgLy8gcG9zaXRpb24gYmFja2dyb3VuZFxuICBkZWx0YVg6IG51bWJlcjtcbiAgZGVsdGFZOiBudW1iZXI7XG4gIGxhc3RNb3VzZVg6IG51bWJlcjtcbiAgbGFzdE1vdXNlWTogbnVtYmVyO1xuICBvZmZzZXRYID0gMDtcbiAgb2Zmc2V0WSA9IDA7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgdGhpcy5pbml0Wm9vbSgpO1xuICB9XG5cbiAgaW5pdFpvb20gPSAoKSA9PiB7XG4gICAgY29uc3QgZWwgPSB0aGlzLmdldE5hdGl2ZUVsZW1lbnQodGhpcy5kaXZJbWFnZSk7XG4gICAgdGhpcy5sYXN0TW91c2VYID0gMDtcbiAgICB0aGlzLmxhc3RNb3VzZVkgPSAwO1xuICAgIGxldCBtb3VzZWRvd24gPSBmYWxzZTtcbiAgICBsZXQgbW91c2Vtb3ZlID0gZmFsc2U7XG5cbiAgICBlbC5vbm1vdXNlZG93biA9IChlKSA9PiB7XG4gICAgICBpZiAodGhpcy5pc1pvb20pIHtcbiAgICAgICAgY29uc3QgY29vcmRzID0gZ2V0UG9zKGUpLFxuICAgICAgICAgIHggPSBjb29yZHNbMF0sXG4gICAgICAgICAgeSA9IGNvb3Jkc1sxXTtcblxuICAgICAgICB0aGlzLmRlbHRhWCA9IHggLSB0aGlzLm9mZnNldFg7XG4gICAgICAgIHRoaXMuZGVsdGFZID0geSAtIHRoaXMub2Zmc2V0WTtcbiAgICAgICAgbW91c2Vkb3duID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmxhc3RNb3VzZVggPSBlLm9mZnNldFg7XG4gICAgICB0aGlzLmxhc3RNb3VzZVkgPSBlLm9mZnNldFk7XG4gICAgICBtb3VzZWRvd24gPSB0cnVlO1xuICAgIH1cblxuICAgIGVsLm9ubW91c2Vtb3ZlID0gKGUpID0+IHtcbiAgICAgIGlmICh0aGlzLmlzWm9vbSAmJiBtb3VzZWRvd24pIHtcbiAgICAgICAgY29uc3QgY29vcmRzID0gZ2V0UG9zKGUpLFxuICAgICAgICAgIHggPSBjb29yZHNbMF0sXG4gICAgICAgICAgeSA9IGNvb3Jkc1sxXTtcblxuICAgICAgICBpZiAoKCh4IC0gdGhpcy5kZWx0YVgpICogKC0xKSkgKyBlbC5vZmZzZXRXaWR0aCA8IHRoaXMuaW1hZ2VTaXplKSB7XG4gICAgICAgICAgdGhpcy5vZmZzZXRYID0geCAtIHRoaXMuZGVsdGFYO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCgoeSAtIHRoaXMuZGVsdGFZKSAqICgtMSkpICsgZWwub2Zmc2V0V2lkdGggPCB0aGlzLmltYWdlU2l6ZSkge1xuICAgICAgICAgIHRoaXMub2Zmc2V0WSA9IHkgLSB0aGlzLmRlbHRhWTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm9mZnNldFkgPiAwKSB7XG4gICAgICAgICAgdGhpcy5vZmZzZXRZID0gMDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5vZmZzZXRYID4gMCkge1xuICAgICAgICAgIHRoaXMub2Zmc2V0WCA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICBlbC5zdHlsZS5iYWNrZ3JvdW5kUG9zaXRpb24gPSB0aGlzLm9mZnNldFggKyAncHggJyArIHRoaXMub2Zmc2V0WSArICdweCc7XG5cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cblxuICAgIGVsLm9ubW91c2V1cCA9ICgpID0+IHtcbiAgICAgIGlmICh0aGlzLmlzWm9vbSkge1xuICAgICAgICBtb3VzZWRvd24gPSBmYWxzZTtcbiAgICAgICAgbW91c2Vtb3ZlID0gZmFsc2U7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gZ2V0UG9zKGUpIHtcbiAgICAgIGNvbnN0IHIgPSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcbiAgICAgICAgeCA9IGUuY2xpZW50WCAtIHIubGVmdCxcbiAgICAgICAgeSA9IGUuY2xpZW50WSAtIHIudG9wO1xuICAgICAgcmV0dXJuIFt4LCB5XTtcbiAgICB9XG4gIH1cblxuICB6b29tSW4oKSB7XG4gICAgaWYgKHRoaXMuc3RlcHMgPT09IDEpIHtcbiAgICAgIHRoaXMuZ2V0U3RlcHNEaWZmKCk7XG4gICAgfVxuICAgIGlmICh0aGlzLnN0ZXBzID4gNCkge1xuICAgICAgdGhpcy5maW5hbFpvb20gPSB0cnVlO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBlbCA9IHRoaXMuZGl2SW1hZ2UubmF0aXZlRWxlbWVudDtcbiAgICB0aGlzLmltYWdlU2l6ZSArPSB0aGlzLnN0ZXBzRGlmZlxuICAgIGVsLnN0eWxlLmJhY2tncm91bmRTaXplID0gdGhpcy5pbWFnZVNpemUgKyAncHgnO1xuICAgIHRoaXMub2Zmc2V0WCA9IChlbC5vZmZzZXRXaWR0aCAtIHRoaXMuaW1hZ2VTaXplKSAvIDI7XG4gICAgdGhpcy5vZmZzZXRZID0gKGVsLm9mZnNldEhlaWdodCAtIHRoaXMuaW1hZ2VTaXplKSAvIDI7XG4gICAgZWwuc3R5bGUuYmFja2dyb3VuZFBvc2l0aW9uID0gdGhpcy5vZmZzZXRYICsgJ3B4ICcgKyB0aGlzLm9mZnNldFkgKyAncHgnO1xuICAgIHRoaXMuaXNab29tID0gdHJ1ZTtcbiAgICB0aGlzLnN0ZXBzKys7XG4gIH1cblxuICB6b29tT3V0KCkge1xuICAgIGNvbnN0IGVsID0gdGhpcy5kaXZJbWFnZS5uYXRpdmVFbGVtZW50O1xuICAgIGlmICh0aGlzLnN0ZXBzID09PSAyKSB7XG4gICAgICB0aGlzLmltYWdlU2l6ZSA9IDEwMjQ7XG4gICAgICBlbC5zdHlsZS5iYWNrZ3JvdW5kU2l6ZSA9ICcxMDAlJztcbiAgICAgIGVsLnN0eWxlLmJhY2tncm91bmRQb3NpdGlvbiA9ICcwcHggMHB4JztcbiAgICAgIHRoaXMub2Zmc2V0WCA9IDA7XG4gICAgICB0aGlzLm9mZnNldFkgPSAwO1xuICAgICAgdGhpcy5pc1pvb20gPSBmYWxzZTtcbiAgICAgIHRoaXMuc3RlcHMgPSAxO1xuICAgIH0gZWxzZSBpZiAodGhpcy5zdGVwcyA+IDEpIHtcbiAgICAgIHRoaXMuaW1hZ2VTaXplIC09IHRoaXMuc3RlcHNEaWZmO1xuICAgICAgZWwuc3R5bGUuYmFja2dyb3VuZFNpemUgPSB0aGlzLmltYWdlU2l6ZSArICdweCc7XG4gICAgICB0aGlzLm9mZnNldFggPSAoZWwub2Zmc2V0V2lkdGggLSB0aGlzLmltYWdlU2l6ZSkgLyAyO1xuICAgICAgdGhpcy5vZmZzZXRZID0gKGVsLm9mZnNldEhlaWdodCAtIHRoaXMuaW1hZ2VTaXplKSAvIDI7XG4gICAgICBlbC5zdHlsZS5iYWNrZ3JvdW5kUG9zaXRpb24gPSB0aGlzLm9mZnNldFggKyAncHggJyArIHRoaXMub2Zmc2V0WSArICdweCc7XG4gICAgICB0aGlzLnN0ZXBzLS07XG4gICAgICB0aGlzLmZpbmFsWm9vbSA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGdldFN0ZXBzRGlmZigpIHtcbiAgICB0aGlzLnN0ZXBzRGlmZiA9ICh0aGlzLmltYWdlU2l6ZVJhdy53aWR0aCAvIDQpO1xuICB9XG5cbiAgZ2V0TmF0aXZlRWxlbWVudChkaXZJbWFnZSkge1xuICAgIGlmIChkaXZJbWFnZSkge1xuICAgICAgcmV0dXJuIGRpdkltYWdlLm5hdGl2ZUVsZW1lbnQ7XG4gICAgfVxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5nZXROYXRpdmVFbGVtZW50KGRpdkltYWdlKTtcbiAgICB9LCA0MDApO1xuICB9XG5cbiAgbG9hZEhpZ2hMaWdodEltYWdlKCkge1xuICAgIHRoaXMuZGl2SW1hZ2UubmF0aXZlRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kU2l6ZSA9ICcxMDAlJztcbiAgICB0aGlzLmRpdkltYWdlLm5hdGl2ZUVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZFBvc2l0aW9uID0gJzBweCAwcHgnO1xuICAgIHRoaXMuZGl2SW1hZ2UubmF0aXZlRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSAnJztcbiAgICB0aGlzLmlzWm9vbSA9IGZhbHNlO1xuICAgIHRoaXMuZGl2SW1hZ2UubmF0aXZlRWxlbWVudC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2RlYy1zeXNmaWxlLWJnLWxvYWQnKTtcbiAgICBjb25zdCBkb3dubG9hZEltYWdlID0gbmV3IEltYWdlKCk7XG5cbiAgICBkb3dubG9hZEltYWdlLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgIHRoaXMuZGl2SW1hZ2UubmF0aXZlRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSAndXJsKCcgKyBkb3dubG9hZEltYWdlLnNyYyArICcgKSc7XG4gICAgICB0aGlzLmRpdkltYWdlLm5hdGl2ZUVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZFJlcGVhdCA9ICduby1yZXBlYXQnO1xuICAgICAgdGhpcy5kaXZJbWFnZS5uYXRpdmVFbGVtZW50LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnZGVjLXN5c2ZpbGUtYmctbG9hZCcpO1xuICAgICAgdGhpcy5pbWdFeHRlcm5hbExpbmsgPSBkb3dubG9hZEltYWdlLnNyYztcbiAgICAgIHRoaXMuaW1hZ2VTaXplUmF3ID0ge1xuICAgICAgICB3aWR0aDogZG93bmxvYWRJbWFnZS53aWR0aCxcbiAgICAgICAgaGVpZ2h0OiBkb3dubG9hZEltYWdlLmhlaWdodFxuICAgICAgfVxuICAgIH07XG5cbiAgICBkb3dubG9hZEltYWdlLnNyYyA9IHRoaXMuZ2V0SW1hZ2VVcmwoKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0SW1hZ2VVcmwoKSB7XG4gICAgaWYgKHRoaXMuaW1hZ2UgJiYgdGhpcy5pbWFnZS5maWxlVXJsKSB7XG4gICAgICByZXR1cm4gdGhpcy5pbWFnZS5maWxlVXJsO1xuICAgIH0gZWxzZSBpZiAodGhpcy5pbWFnZSAmJiB0aGlzLmltYWdlLmZpbGVCYXNlUGF0aCkge1xuICAgICAgcmV0dXJuIGAke1MzSG9zdH0vJHt0aGlzLmltYWdlLmZpbGVCYXNlUGF0aH1gO1xuICAgIH0gIGVsc2Uge1xuICAgICAgcmV0dXJuICdkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUlBQUFBQ0FDQU1BQUFEMDRKSDVBQUFBc1ZCTVZFVUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBazJ3TFNBQUFBT25SU1RsTUFBNFVVQlFnTUVQU0tLK2phR3hjZjk1MHljazg2TmkrbWdiOVhKaU95UlBEczNxS1daMHJLclh4Mys4NWpRVDI0WGVQWDA4VnRhcEdhRUM1Uk53QUFCMTVKUkVGVWVOcnRtMmR6MnpBTWhrbHIyYklsNzVGNDFYRzg0cGxsMS96L1A2eVhWallFa2lLcGtkNzFycytubmlNZEllSUZDRUFxK2M5Ly9wTVYyd3Y4M21HNW5CNTZmdURhNUM5Q2crbm1WR2FZSDZlWGFVREo5eE1PSnl5WnlUQWszMGx3cmpJZHM4MllmQS91QlZiWDJIRHhTT0dNNXl3TmszNnhldWg5c0xTOEg0c3pZYlJpU1pUTExKRmFxeURkUzJULzlqeHNoVkh3VTl1eHhzZjlYR0xLWTFoQTBMOHdqby9GeUphcjFHOExNbjJ3ODJydmlTRjJIWmVvOERvN2hxajJjejMrQTg1Mlo4c2tXV3l3TTByWnhlZ2k4YTBPcHR0cEw5K1FHQzJTRGI4YzMvdFdxZ2ZwMWhpd1BaQXNMT0lQa1Q2b2wzSHoyeG5jVUdMQUpZdVc3YmlBbmtsYXJyRm96dXJESU9hSE5VMG4velhjdXM4UlJhWFlZNlN5QUpMZmJKenZFR2xrc3FCNXYrdms1RTNrNElZSk1RWFUwOHgvb2puZ3pXdnErSHNnUmZBTTBVaE1hRUgwa1dLb3NCc21HY205SjVBWFVoVGcwNEJvdWVmL0NnRUs4MExOTVRhMlNZcGtZcG9TKy9mRGh4YmJSOTNMaEpiNnV1cXQxbk9MTHVvYnQ4eG1Hem5BSjBycSs1L05pUGtYemViUGZWMXpRTjhMRk5YcFlSYUExaWVUOFdscDFLV1BoTWRiMmxaWDZWc21aenRXdXZmalpxZytCVlVjblRmbGxCMmwzN1E2ckVINTJhR2FtSmJ6Yk9TRW1sb20wVVg5cEoxa0twUVNwN2NZNnhJcDd3eHhDdVFLWUFvMDBUTlZib0V2YnFnc0dSeVppaWtCRkU3dUs3SWxvaTF1NllHcFdHb0twTnZ1eXNSOTB4L1dkYWRJQThETlZuSVowZzNYeWliN2tNTUZvSUl6RWFoR0cyQVRNbDdoSm51c05jQzQ0cUJSRXFtS1dRSlZUVjNjWnpkamF0d3pGUmNyVGhCNGZENXBSeGNLSjhkdERCQkdsZzRiQ1dwMEhsZ2FmcHl4amtNb3Q2UWUyRUhDMlNTcE1WeW5NNkV1aThRWndWalIxWEhSZTNndzl0U0RsTEZqS2RpaVFjMWVIZ2VkNkdkWE5aMTZoR2NCa1JoUWsvbUFpKzlCOUpTOGFBK2NHcjM3WDE0YnpCU2MrNStpYnBVZ3RtTG5JRmZqeHNtZ3hxWkU3bHM4VzFLY0pmWUxWdU1ydmQ4MVlHWlVaWFd2Sjh2UkRsbzVRWTF2b0ViTGM4UFJzakpqR2xDekdQM1drK1RoR1k3TUE2U3BUMXo5OFdsa1BEQTNnRVNuelFKcFVOYU1NTFlhd3g3aGdlSGNJNWhncFRjQUx6WWdNZDVrdzVEZlYzbWd4akpXbzgwbldWTUQ5cEVuNDFLWHVZVkVMVHJJSHVmR3hwRHlKMTBpMHBLR2lyb0lKQWF3QnNqZXZXSnhIN0FKU3pNRDZtTFNzNlI1RUJZNmdxc2ZXWnlWejU5b2NxUXhING8yMmRnQVlBY0x0YkFhQjBpTk94TURiUEZFOXVFNmJBQ3dCbnM3bkJvZGZjbU1rNnVZOVZvNkE3QWFiUkE4SnhMeTA4QUFJalpJWFkwQm9ocGhrQ2VJeE5pQW5tQkFRMmtBWG1qTXFYR01SR0prUU5kOEI0QmRDQXZWZENJeDM0RWVwSVlZMnJwN2lYdUlpZ3NpTVJGaFM0d0NXMi9BR0FYVU9WRWt6L293OU1VODRPZ05nRklPRnRLcmtjak80N3FZQ1MyOUFSN2hDRTVZSktQN1RuZWYxSm5Razlpa055Q0k3dmlBRGV4emFyVHVKblIrcU00Q1J4a1lvZ0c0c1M2elNZZ1hBa29PTHhMcElFUmZEOGdZUm4vY29GR1NnOVc0WGRoWUpMSTJ1Q1lwVXVaNkE1cklrUXQ2TndFbjRkbVNnaG81QSthUzh1c1NkVkY2QXhvVWJvRnBsdVFsOThjb0poSVNwd3picmE2S05WT2dhN1NUc1k0TlQ1a21LS2dFeGJka3JXRmZiOEJKR0dtY1FxaktaamczT29wcHBDWHJqRjcwQmpEWVdtL3p0ZDZzN2NJOWRJSFZ1S2VFNXdWOEthcnd6Y0NBOS9pZGptY1RqTWVwY1pvd0NCakl1Mk5MYndBckVUVUJwOGFXTkE5MjVQT0JWNVVCa0FzMCtCOVlOblVDREtFa2xXMU1UV01BbUNreWhJVjROZjRFTlVhMlZSVXpJcjBCckNKcWkxYStacXZRU08zeFVIOUI4VmEvSkUzSk5rWUdzS2NXdit2UmlRUXpLYWVDUjBWVDFNQUZTWFBDaGdNR0tQbnN3aTdRL2lNc3RBUmhyWEg0K0lUUU1vUWJ4MEpRcDNiNE5CajJBeXZ3Ty9NdFM1ajA5emsxaHIxa0ZibkNSSWxsNWpHNDc4MnlpbzhTYUFJRjFueFJ3SEx3N01JMGE4c0VCb3IzQmVDZUJzdERHNHFGa3JLMEJkNjVrZnVLNWFJOHRMRWFnUldSY3VUZWJWNVlIbkNzam5hNHJwTkMzL0Y3YzRzQnVkVklqbFcwQVZMNm5JdmFMRDlYYUpjcWNLRHIzcHpXNko4dHViTGN3RmRVOWtyL01Vc0lKeTYwbWZtQU9mOEdlaHVERjh6VGU1SmRQSlFpS2w5RS96Yjg3V0hScC94cjBiYlI5d09Oa0JTTFZiNkZCbFdYRXVoamorSncza0hnYWtyb3k2dWlvQlBqVDNQbzNkUjVnZXMvM3c5eEEyYzE3blZVWWV1WFdKcFBVNDZLcndIeWZocnJFeFBPNk5UTURmMXBXRTREY01jcGZ5elljQkp1aUNrRGVEMlROeDk0Ty9Cb2xxaGgyeW5KUS84SDhtY1dDOWpWS2VURDlFSEtXd2R3YTNWRXNoSHNZbzlCMGxMQm5aVUczZnZHRFVuUEszby9STkt5bktGMk5ndXRCZ09xeTFSblErK2RBZVdzUHJSUVh6TWIycVlDbXRaUUUrZG1UeUlQWEZNOG9nWm10OHU0SkNONUdEMXhsZmFpcmw1OStNRVF0WHJlVE40V2lyeEtWMTdWdWExTmxYRmNLTW1OTjJFaXAvYlNEeDJiZm1FNzN2aHdYa3ZxMTdWWDJQOHp5c0xuaUJTRy81bCtlWjhVeW5qQTB0Q3NrOEp4WDU5TW05SlhoM3dQNFVWdnc5czVJTitKTjcyV2s5dXdlY2NpZndHM3YyL1crQWVmNzFzZStadFF4NnI3dmU3eDJQUHJsa1ArOCsveUN6R2k3YUZ6cFBVdEFBQUFBRWxGVGtTdVFtQ0MnO1xuICAgIH1cbiAgfVxufVxuIl19