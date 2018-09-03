/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input, ViewChild, ElementRef } from '@angular/core';
/** @typedef {?} */
var ZoomMode;
export { ZoomMode };
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
            /** @type {?} */
            const el = this.getNativeElement(this.divImage);
            this.lastMouseX = 0;
            this.lastMouseY = 0;
            /** @type {?} */
            let mousedown = false;
            /** @type {?} */
            let mousemove = false;
            el.onmousedown = (e) => {
                if (this.isZoom) {
                    /** @type {?} */
                    const coords = getPos(e);
                    /** @type {?} */
                    const x = coords[0];
                    /** @type {?} */
                    const y = coords[1];
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
                    /** @type {?} */
                    const coords = getPos(e);
                    /** @type {?} */
                    const x = coords[0];
                    /** @type {?} */
                    const y = coords[1];
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
                /** @type {?} */
                const r = el.getBoundingClientRect();
                /** @type {?} */
                const x = e.clientX - r.left;
                /** @type {?} */
                const y = e.clientY - r.top;
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
        /** @type {?} */
        const el = this.divImage.nativeElement;
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
        /** @type {?} */
        const el = this.divImage.nativeElement;
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
        /** @type {?} */
        const downloadImage = new Image();
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
if (false) {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLWltYWdlLXpvb20uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL2RlYy1pbWFnZS16b29tL2RlYy1pbWFnZS16b29tLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBaUIsTUFBTSxlQUFlLENBQUM7Ozs7QUF3QnZGLE1BQU07SUFnREo7O3NCQWZTLEtBQUs7cUJBRU4sQ0FBQzt5QkFFRyxLQUFLO3lCQUNMLElBQUk7dUJBT04sQ0FBQzt1QkFDRCxDQUFDO3dCQVFBLEdBQUcsRUFBRTs7WUFDZCxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ2hELElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO1lBQ3BCLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDOztZQUNwQixJQUFJLFNBQVMsR0FBRyxLQUFLLENBQUM7O1lBQ3RCLElBQUksU0FBUyxHQUFHLEtBQUssQ0FBQztZQUV0QixFQUFFLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3JCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDOztvQkFDaEIsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUVSOztvQkFGaEIsTUFDRSxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUNDOztvQkFGaEIsTUFFRSxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUVoQixJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO29CQUMvQixJQUFJLENBQUMsTUFBTSxHQUFHLENB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QUFDLEtBQUssQ0FBQyxlQUFlLEdBQUcsTUFBTSxHQUFHLGFBQWEsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDO1lBQ3RGLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsR0FBRyxXQUFXLENBQUM7WUFDakUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMscUJBQXFCLENBQUMsQ0FBQztZQUNsRixJQUFJLENBQUMsZUFBZSxHQUFHLGFBQWEsQ0FBQyxHQUFHLENBQUM7WUFDekMsSUFBSSxDQUFDLFlBQVksR0FBRztnQkFDbEIsS0FBSyxFQUFFLGFBQWEsQ0FBQyxLQUFLO2dCQUMxQixNQUFNLEVBQUUsYUFBYSxDQUFDLE1BQU07YUFDN0IsQ0FBQTtTQUNGLENBQUM7UUFFRixhQUFhLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztLQUN4Qzs7OztJQUVPLFdBQVc7UUFDakIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDckMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDO1NBQzNCO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixNQUFNLENBQUMsZzVGQUFnNUYsQ0FBQztTQUN6NUY7Ozs7WUEzTkosU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxnQkFBZ0I7Z0JBQzFCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7T0FjTDtnQkFDTCxNQUFNLEVBQUUsQ0FBQyxrZEFBa2QsQ0FBQzthQUM3ZDs7Ozs7b0JBR0UsS0FBSzttQkFZTCxLQUFLO3VCQVdMLFNBQVMsU0FBQyxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBWaWV3Q2hpbGQsIEVsZW1lbnRSZWYsIEFmdGVyVmlld0luaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuXG5leHBvcnQgdHlwZSBab29tTW9kZSA9ICdob3ZlcicgfCAnY2xpY2snIHwgJ3RvZ2dsZScgfCAnaG92ZXItZnJlZXplJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLWltYWdlLXpvb20nLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJpbWFnZWhpZ2hsaWdodC1jb250YWluZXJcIiBmeExheW91dD1cImNvbHVtblwiIGZ4TGF5b3V0QWxpZ249XCJzcGFjZS1iZXR3ZWVuIHN0YXJ0XCIgZnhMYXlvdXRHYXA9XCJnYXBweFwiPlxuICA8ZGl2ICNpbWFnZUNvbnRhaW5lciBjbGFzcz1cImltYWdlaGlnaGxpZ2h0LWNvbnRhaW5lclwiPlxuICA8L2Rpdj5cbiAgPGRpdiBjbGFzcz1cImNvbnRhaW5lci1pbWctbGlua1wiPlxuICAgIDxzcGFuIFtuZ0NsYXNzXT1cInsnem9vbS1pbi1hY3RpdmUnOiBmaW5hbFpvb20sICd6b29tLWluJzogIWZpbmFsWm9vbX1cIiAoY2xpY2spPVwiem9vbUluKClcIj5cbiAgICAgIDxtYXQtaWNvbiBjbGFzcz1cImljb25zLXpvb21cIj5hZGRfY2lyY2xlX291dGxpbmU8L21hdC1pY29uPlxuICAgIDwvc3Bhbj5cbiAgICA8c3BhbiBbbmdDbGFzc109XCJ7J3pvb20tb3V0LWFjdGl2ZSc6ICFpc1pvb20sICd6b29tLW91dCc6IGlzWm9vbX1cIiAoY2xpY2spPVwiem9vbU91dCgpXCI+XG4gICAgICA8bWF0LWljb24gY2xhc3M9XCJpY29ucy16b29tXCI+cmVtb3ZlX2NpcmNsZV9vdXRsaW5lPC9tYXQtaWNvbj5cbiAgICA8L3NwYW4+XG4gICAgPHNwYW4gKm5nSWY9XCJpbWdFeHRlcm5hbExpbmtcIiBjbGFzcz1cImltZy1saW5rXCI+XG4gICAgICA8YSBocmVmPVwie3sgaW1nRXh0ZXJuYWxMaW5rIH19XCIgdGFyZ2V0PVwiX2JsYW5rXCI+e3sgJ2xhYmVsLmltYWdlLWxpbmsnIHwgdHJhbnNsYXRlIH19PC9hPlxuICAgIDwvc3Bhbj5cbiAgPC9kaXY+XG48L2Rpdj5gLFxuICBzdHlsZXM6IFtgLmltYWdlaGlnaGxpZ2h0LWNvbnRhaW5lcnt3aWR0aDoxMDAlO2hlaWdodDoxMDAlfS5jb250YWluZXItaW1nLWxpbmt7cG9zaXRpb246cmVsYXRpdmU7d2lkdGg6MTAwJTtoZWlnaHQ6MjBweH0uem9vbS1pbntjdXJzb3I6cG9pbnRlcjtjb2xvcjpyZWQ7cG9zaXRpb246YWJzb2x1dGU7cmlnaHQ6MH0uem9vbS1vdXR7Y3Vyc29yOnBvaW50ZXI7Y29sb3I6cmVkO3Bvc2l0aW9uOmFic29sdXRlO3JpZ2h0OjIwcHh9Lnpvb20taW4tYWN0aXZle2NvbG9yOmdyYXk7cG9zaXRpb246YWJzb2x1dGU7cmlnaHQ6MH0uem9vbS1vdXQtYWN0aXZle2NvbG9yOmdyYXk7cG9zaXRpb246YWJzb2x1dGU7cmlnaHQ6MjBweH0uaWNvbnMtem9vbXtmb250LXNpemU6MThweH0uaW1nLWxpbmt7cG9zaXRpb246YWJzb2x1dGU7cmlnaHQ6NTBweDtjb2xvcjpncmF5fS5pbWctbGluayBhe2ZvbnQtc2l6ZToxMHB4O3BhZGRpbmctdG9wOjJweH1gXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNJbWFnZVpvb21Db21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcblxuICBASW5wdXQoKVxuICBzZXQgaW1hZ2Uodikge1xuICAgIGlmICh2KSB7XG4gICAgICB0aGlzLl9pbWFnZSA9IHY7XG4gICAgICB0aGlzLmxvYWRIaWdoTGlnaHRJbWFnZSgpO1xuICAgIH1cbiAgfVxuXG4gIGdldCBpbWFnZSgpIHtcbiAgICByZXR1cm4gdGhpcy5faW1hZ2U7XG4gIH1cblxuICBASW5wdXQoKVxuICBzZXQgc2l6ZSh2KSB7XG4gICAgaWYgKHYpIHtcbiAgICAgIHRoaXMuX3NpemUgPSB2O1xuICAgIH1cbiAgfVxuXG4gIGdldCBzaXplKCkge1xuICAgIHJldHVybiB0aGlzLl9zaXplO1xuICB9XG5cbiAgQFZpZXdDaGlsZCgnaW1hZ2VDb250YWluZXInKSBkaXZJbWFnZTogRWxlbWVudFJlZjtcblxuICBwcml2YXRlIF9pbWFnZTogYW55O1xuICBwcml2YXRlIF9zaXplOiBhbnk7XG5cbiAgaW1nRXh0ZXJuYWxMaW5rOiBzdHJpbmc7XG4gIFxuICAvLyB6b29tXG4gIGlzWm9vbSA9IGZhbHNlO1xuICBpbWFnZVNpemVSYXc6IGFueTtcbiAgc3RlcHMgPSAxO1xuICBzdGVwc0RpZmY6IGFueTtcbiAgZmluYWxab29tID0gZmFsc2U7XG4gIGltYWdlU2l6ZSA9IDEwMjQ7XG5cbiAgLy8gcG9zaXRpb24gYmFja2dyb3VuZFxuICBkZWx0YVg6IG51bWJlcjtcbiAgZGVsdGFZOiBudW1iZXI7XG4gIGxhc3RNb3VzZVg6IG51bWJlcjtcbiAgbGFzdE1vdXNlWTogbnVtYmVyO1xuICBvZmZzZXRYID0gMDtcbiAgb2Zmc2V0WSA9IDA7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgdGhpcy5pbml0Wm9vbSgpO1xuICB9XG5cbiAgaW5pdFpvb20gPSAoKSA9PiB7XG4gICAgY29uc3QgZWwgPSB0aGlzLmdldE5hdGl2ZUVsZW1lbnQodGhpcy5kaXZJbWFnZSk7XG4gICAgdGhpcy5sYXN0TW91c2VYID0gMDtcbiAgICB0aGlzLmxhc3RNb3VzZVkgPSAwO1xuICAgIGxldCBtb3VzZWRvd24gPSBmYWxzZTtcbiAgICBsZXQgbW91c2Vtb3ZlID0gZmFsc2U7XG5cbiAgICBlbC5vbm1vdXNlZG93biA9IChlKSA9PiB7XG4gICAgICBpZiAodGhpcy5pc1pvb20pIHtcbiAgICAgICAgY29uc3QgY29vcmRzID0gZ2V0UG9zKGUpLFxuICAgICAgICAgIHggPSBjb29yZHNbMF0sXG4gICAgICAgICAgeSA9IGNvb3Jkc1sxXTtcblxuICAgICAgICB0aGlzLmRlbHRhWCA9IHggLSB0aGlzLm9mZnNldFg7XG4gICAgICAgIHRoaXMuZGVsdGFZID0geSAtIHRoaXMub2Zmc2V0WTtcbiAgICAgICAgbW91c2Vkb3duID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmxhc3RNb3VzZVggPSBlLm9mZnNldFg7XG4gICAgICB0aGlzLmxhc3RNb3VzZVkgPSBlLm9mZnNldFk7XG4gICAgICBtb3VzZWRvd24gPSB0cnVlO1xuICAgIH1cblxuICAgIGVsLm9ubW91c2Vtb3ZlID0gKGUpID0+IHtcbiAgICAgIGlmICh0aGlzLmlzWm9vbSAmJiBtb3VzZWRvd24pIHtcbiAgICAgICAgY29uc3QgY29vcmRzID0gZ2V0UG9zKGUpLFxuICAgICAgICAgIHggPSBjb29yZHNbMF0sXG4gICAgICAgICAgeSA9IGNvb3Jkc1sxXTtcblxuICAgICAgICBpZiAoKCh4IC0gdGhpcy5kZWx0YVgpICogKC0xKSkgKyBlbC5vZmZzZXRXaWR0aCA8IHRoaXMuaW1hZ2VTaXplKSB7XG4gICAgICAgICAgdGhpcy5vZmZzZXRYID0geCAtIHRoaXMuZGVsdGFYO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCgoeSAtIHRoaXMuZGVsdGFZKSAqICgtMSkpICsgZWwub2Zmc2V0V2lkdGggPCB0aGlzLmltYWdlU2l6ZSkge1xuICAgICAgICAgIHRoaXMub2Zmc2V0WSA9IHkgLSB0aGlzLmRlbHRhWTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm9mZnNldFkgPiAwKSB7XG4gICAgICAgICAgdGhpcy5vZmZzZXRZID0gMDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5vZmZzZXRYID4gMCkge1xuICAgICAgICAgIHRoaXMub2Zmc2V0WCA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICBlbC5zdHlsZS5iYWNrZ3JvdW5kUG9zaXRpb24gPSB0aGlzLm9mZnNldFggKyAncHggJyArIHRoaXMub2Zmc2V0WSArICdweCc7XG5cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cblxuICAgIGVsLm9ubW91c2V1cCA9ICgpID0+IHtcbiAgICAgIGlmICh0aGlzLmlzWm9vbSkge1xuICAgICAgICBtb3VzZWRvd24gPSBmYWxzZTtcbiAgICAgICAgbW91c2Vtb3ZlID0gZmFsc2U7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gZ2V0UG9zKGUpIHtcbiAgICAgIGNvbnN0IHIgPSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcbiAgICAgICAgeCA9IGUuY2xpZW50WCAtIHIubGVmdCxcbiAgICAgICAgeSA9IGUuY2xpZW50WSAtIHIudG9wO1xuICAgICAgcmV0dXJuIFt4LCB5XTtcbiAgICB9XG4gIH1cblxuICB6b29tSW4oKSB7XG4gICAgaWYgKHRoaXMuc3RlcHMgPT09IDEpIHtcbiAgICAgIHRoaXMuZ2V0U3RlcHNEaWZmKCk7XG4gICAgfVxuICAgIGlmICh0aGlzLnN0ZXBzID4gNCkge1xuICAgICAgdGhpcy5maW5hbFpvb20gPSB0cnVlO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBlbCA9IHRoaXMuZGl2SW1hZ2UubmF0aXZlRWxlbWVudDtcbiAgICB0aGlzLmltYWdlU2l6ZSArPSB0aGlzLnN0ZXBzRGlmZlxuICAgIGVsLnN0eWxlLmJhY2tncm91bmRTaXplID0gdGhpcy5pbWFnZVNpemUgKyAncHgnO1xuICAgIHRoaXMub2Zmc2V0WCA9IChlbC5vZmZzZXRXaWR0aCAtIHRoaXMuaW1hZ2VTaXplKSAvIDI7XG4gICAgdGhpcy5vZmZzZXRZID0gKGVsLm9mZnNldEhlaWdodCAtIHRoaXMuaW1hZ2VTaXplKSAvIDI7XG4gICAgZWwuc3R5bGUuYmFja2dyb3VuZFBvc2l0aW9uID0gdGhpcy5vZmZzZXRYICsgJ3B4ICcgKyB0aGlzLm9mZnNldFkgKyAncHgnO1xuICAgIHRoaXMuaXNab29tID0gdHJ1ZTtcbiAgICB0aGlzLnN0ZXBzKys7XG4gIH1cblxuICB6b29tT3V0KCkge1xuICAgIGNvbnN0IGVsID0gdGhpcy5kaXZJbWFnZS5uYXRpdmVFbGVtZW50O1xuICAgIGlmICh0aGlzLnN0ZXBzID09PSAyKSB7XG4gICAgICB0aGlzLmltYWdlU2l6ZSA9IDEwMjQ7XG4gICAgICBlbC5zdHlsZS5iYWNrZ3JvdW5kU2l6ZSA9ICcxMDAlJztcbiAgICAgIGVsLnN0eWxlLmJhY2tncm91bmRQb3NpdGlvbiA9ICcwcHggMHB4JztcbiAgICAgIHRoaXMub2Zmc2V0WCA9IDA7XG4gICAgICB0aGlzLm9mZnNldFkgPSAwO1xuICAgICAgdGhpcy5pc1pvb20gPSBmYWxzZTtcbiAgICAgIHRoaXMuc3RlcHMgPSAxO1xuICAgIH0gZWxzZSBpZiAodGhpcy5zdGVwcyA+IDEpIHtcbiAgICAgIHRoaXMuaW1hZ2VTaXplIC09IHRoaXMuc3RlcHNEaWZmO1xuICAgICAgZWwuc3R5bGUuYmFja2dyb3VuZFNpemUgPSB0aGlzLmltYWdlU2l6ZSArICdweCc7XG4gICAgICB0aGlzLm9mZnNldFggPSAoZWwub2Zmc2V0V2lkdGggLSB0aGlzLmltYWdlU2l6ZSkgLyAyO1xuICAgICAgdGhpcy5vZmZzZXRZID0gKGVsLm9mZnNldEhlaWdodCAtIHRoaXMuaW1hZ2VTaXplKSAvIDI7XG4gICAgICBlbC5zdHlsZS5iYWNrZ3JvdW5kUG9zaXRpb24gPSB0aGlzLm9mZnNldFggKyAncHggJyArIHRoaXMub2Zmc2V0WSArICdweCc7XG4gICAgICB0aGlzLnN0ZXBzLS07XG4gICAgICB0aGlzLmZpbmFsWm9vbSA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGdldFN0ZXBzRGlmZigpIHtcbiAgICB0aGlzLnN0ZXBzRGlmZiA9ICh0aGlzLmltYWdlU2l6ZVJhdy53aWR0aCAvIDQpO1xuICB9XG5cbiAgZ2V0TmF0aXZlRWxlbWVudChkaXZJbWFnZSkge1xuICAgIGlmIChkaXZJbWFnZSkge1xuICAgICAgcmV0dXJuIGRpdkltYWdlLm5hdGl2ZUVsZW1lbnQ7XG4gICAgfVxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5nZXROYXRpdmVFbGVtZW50KGRpdkltYWdlKTtcbiAgICB9LCA0MDApO1xuICB9XG5cbiAgbG9hZEhpZ2hMaWdodEltYWdlKCkge1xuICAgIHRoaXMuZGl2SW1hZ2UubmF0aXZlRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kU2l6ZSA9ICcxMDAlJztcbiAgICB0aGlzLmRpdkltYWdlLm5hdGl2ZUVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZFBvc2l0aW9uID0gJzBweCAwcHgnO1xuICAgIHRoaXMuZGl2SW1hZ2UubmF0aXZlRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSAnJztcbiAgICB0aGlzLmlzWm9vbSA9IGZhbHNlO1xuICAgIHRoaXMuZGl2SW1hZ2UubmF0aXZlRWxlbWVudC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2RlYy1zeXNmaWxlLWJnLWxvYWQnKTtcbiAgICBjb25zdCBkb3dubG9hZEltYWdlID0gbmV3IEltYWdlKCk7XG5cbiAgICBkb3dubG9hZEltYWdlLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgIHRoaXMuZGl2SW1hZ2UubmF0aXZlRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSAndXJsKCcgKyBkb3dubG9hZEltYWdlLnNyYyArICcgKSc7XG4gICAgICB0aGlzLmRpdkltYWdlLm5hdGl2ZUVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZFJlcGVhdCA9ICduby1yZXBlYXQnO1xuICAgICAgdGhpcy5kaXZJbWFnZS5uYXRpdmVFbGVtZW50LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnZGVjLXN5c2ZpbGUtYmctbG9hZCcpO1xuICAgICAgdGhpcy5pbWdFeHRlcm5hbExpbmsgPSBkb3dubG9hZEltYWdlLnNyYztcbiAgICAgIHRoaXMuaW1hZ2VTaXplUmF3ID0ge1xuICAgICAgICB3aWR0aDogZG93bmxvYWRJbWFnZS53aWR0aCxcbiAgICAgICAgaGVpZ2h0OiBkb3dubG9hZEltYWdlLmhlaWdodFxuICAgICAgfVxuICAgIH07XG5cbiAgICBkb3dubG9hZEltYWdlLnNyYyA9IHRoaXMuZ2V0SW1hZ2VVcmwoKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0SW1hZ2VVcmwoKSB7XG4gICAgaWYgKHRoaXMuaW1hZ2UgJiYgdGhpcy5pbWFnZS5maWxlVXJsKSB7XG4gICAgICByZXR1cm4gdGhpcy5pbWFnZS5maWxlVXJsO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gJ2RhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBSUFBQUFDQUNBTUFBQUQwNEpINUFBQUFzVkJNVkVVQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFrMndMU0FBQUFPblJTVGxNQUE0VVVCUWdNRVBTS0sramFHeGNmOTUweWNrODZOaSttZ2I5WEppT3lSUERzM3FLV1owcktyWHgzKzg1alFUMjRYZVBYMDhWdGFwR2FFQzVSTndBQUIxNUpSRUZVZU5ydG0yZHoyekFNaGtscjJiSWw3NUY0MVhHODRwbGwxL3ovUDZ5WFZqWUVraUtwa2Q3MXJzK25uaU1kSWVJRkNFQXErYzkvL3BNVjJ3djgzbUc1bkI1NmZ1RGE1QzlDZytubVZHYVlINmVYYVVESjl4TU9KeXlaeVRBazMwbHdyaklkczgyWWZBL3VCVmJYMkhEeFNPR001eXdOazM2eGV1aDlzTFM4SDRzelliUmlTWlRMTEpGYXF5RGRTMlQvOWp4c2hWSHdVOXV4eHNmOVhHTEtZMWhBMEw4d2pvL0Z5SmFyMUc4TE1uMnc4MnJ2aVNGMkhaZW84RG83aHFqMmN6MytBODUyWjhza1dXeXdNMHJaeGVnaThhME9wdHRwTDkrUUdDMlNEYjhjMy90V3FnZnAxaGl3UFpBc0xPSVBrVDZvbDNIejJ4bmNVR0xBSll1VzdiaUFua2xhcnJGb3p1ckRJT2FITlUwbi96WGN1czhSUmFYWVk2U3lBSkxmYkp6dkVHbGtzcUI1dit2azVFM2s0SVlKTVFYVTA4eC9vam5neld2cStIc2dSZkFNMFVoTWFFSDBrV0tvc0JzbUdjbTlKNUFYVWhUZzA0Qm91ZWYvQ2dFSzgwTE5NVGEyU1lwa1lwb1MrL2ZEaHhiYlI5M0xoSmI2dXVxdDFuT0xMdW9idDh4bUd6bkFKMHJxKzUvTmlQa1h6ZWJQZlYxelFOOExGTlhwWVJhQTFpZVQ4V2xwMUtXUGhNZGIybFpYNlZzbVp6dFd1dmZqWnFnK0JWVWNuVGZsbEIybDM3UTZyRUg1MmFHYW1KYnpiT1NFbWxvbTBVWDlwSjFrS3BRU3A3Y1k2eElwN3d4eEN1UUtZQW8wMFROVmJvRXZicWdzR1J5Wmlpa0JGRTd1SzdJbG9pMXU2WUdwV0dvS3BOdnV5c1I5MHgvV2RhZElBOEROVm5JWjBnM1h5aWI3a01NRm9JSXpFYWhHRzJBVE1sN2hKbnVzTmNDNDRxQlJFcW1LV1FKVlRWM2NaemRqYXR3ekZSY3JUaEI0ZkQ1cFJ4Y0tKOGR0REJCR2xnNGJDV3AwSGxnYWZweXhqa01vdDZRZTJFSEMyU1NwTVZ5bk02RXVpOFFad1ZqUjFYSFJlM2d3OXRTRGxMRmpLZGlpUWMxZUhnZWQ2R2RYTloxNmhHY0JrUmhRay9tQWkrOUI5SlM4YUErY0dyMzdYMTRiekJTYys1K2licFVndG1MbklGZmp4c21neHFaRTdsczhXMUtjSmZZTFZ1TXJ2ZDgxWUdaVVpYV3ZKOHZSRGxvNVFZMXZvRWJMYzhQUnNqSmpHbEN6R1AzV2srVGhHWTdNQTZTcFQxejk4V2xrUERBM2dFU256UUpwVU5hTU1MWWF3eDdoZ2VIY0k1aGdwVGNBTHpZZ01kNWt3NURmVjNtZ3hqSldvODBuV1ZNRDlwRW40MUtYdVlWRUxUcklIdWZHeHBEeUoxMGkwcEtHaXJvSUpBYXdCc2pldldKeEg3QUpTek1ENm1MU3M2UjVFQlk2Z3FzZldaeVZ6NTlvY3FReEg0bzIyZGdBWUFjTHRiQWFCMGlOT3hNRGJQRkU5dUU2YkFDd0JuczduQm9kZmNtTWs2dVk5Vm82QTdBYWJSQThKeEx5MDhBQUlqWklYWTBCb2hwaGtDZUl4TmlBbm1CQVEya0FYbWpNcVhHTVJHSmtRTmQ4QjRCZENBdlZkQ0l4MzRFZXBJWVkycnA3aVh1SWlnc2lNUkZoUzR3Q1cyL0FHQVhVT1ZFa3ovb3c5TVU4NE9nTmdGSU9GdEtya2NqTzQ3cVlDUzI5QVI3aENFNVlKS1A3VG5lZjFKblFrOWlrTnlDSTd2aUFEZXh6YXJUdUpuUitxTTRDUnhrWW9nRzRzUzZ6U1lnWEFrb09MeExwSUVSZkQ4Z1lSbi9jb0ZHU2c5VzRYZGhZSkxJMnVDWXBVdVo2QTVySWtRdDZOd0VuNGRtU2dobzVBK2FTOHVzU2RWRjZBeG9VYm9GcGx1UWw5OGNvSmhJU3B3emJyYTZLTlZPZ2E3U1RzWTROVDVrbUtLZ0V4YmRrcldGZmI4QkpHR21jUXFqS1pqZzNPb3BwcENYcmpGNzBCakRZV20venRkNnM3Y0k5ZElIVnVLZUU1d1Y4S2Fyd3pjQ0E5L2lkam1jVGpNZXBjWm93Q0JqSXUyTkxid0FyRVRVQnA4YVdOQTkyNVBPQlY1VUJrQXMwK0I5WU5uVUNES0VrbFcxTVRXTUFtQ2t5aElWNE5mNEVOVWEyVlJVeklyMEJyQ0pxaTFhK1pxdlFTTzN4VUg5QjhWYS9KRTNKTmtZR3NLY1d2K3ZSaVFRekthZUNSMFZUMU1BRlNYUENoZ01HS1Buc3dpN1EvaU1zdEFSaHJYSDQrSVRRTW9RYngwSlFwM2I0TkJqMkF5dndPL010UzVqMDl6azFocjFrRmJuQ1JJbGw1akc0NzgyeWlvOFNhQUlGMW54UndITHc3TUkwYThzRUJvcjNCZUNlQnN0REc0cUZrckswQmQ2NWtmdUs1YUk4dExFYWdSV1JjdVRlYlY1WUhuQ3NqbmE0cnBOQzMvRjdjNHNCdWRWSWpsVzBBVkw2bkl2YUxEOVhhSmNxY0tEcjNwelc2Sjh0dWJMY3dGZFU5a3IvTVVzSUp5NjBtZm1BT2Y4R2VodURGOHpUZTVKZFBKUWlLbDlFL3piODdXSFJwL3hyMGJiUjl3T05rQlNMVmI2RkJsV1hFdWhqaitKdzNrSGdha3JveTZ1aW9CUGpUM1BvM2RSNWdlcy8zdzl4QTJjMTduVlVZZXVYV0pwUFU0Nktyd0h5ZmhyckV4UE82TlRNRGYxcFdFNERjTWNwZnl6WWNCSnVpQ2tEZUQyVE54OTRPL0JvbHFoaDJ5bkpRLzhIOG1jV0M5alZLZVREOUVIS1d3ZHdhM1ZFc2hIc1lvOUIwbExCblpVRzNmdkdEVW5QSzNvL1JOS3luS0YyTmd1dEJnT3F5MVJuUSsrZEFlV3NQclJRWHpNYjJxWUNtdFpRRStkbVR5SVBYRk04b2dabXQ4dTRKQ041R0QxeGxmYWlybDU5K01FUXRYcmVUTjRXaXJ4S1YxN1Z1YTFObFhGY0tNbU5OMkVpcC9iU0R4MmJmbUU3M3Zod1hrdnExN1ZYMlA4enlzTG5pQlNHLzVsK2VaOFV5bmpBMHRDc2s4SnhYNTlNbTlKWGgzd1A0VVZ2dzlzNUlOK0pONzJXazl1d2VjY2lmd0czdjIvVytBZWY3MXNlK1p0UXg2cjd2ZTd4MlBQcmxrUCs4Ky95Q3pHaTdhRnpwUFV0QUFBQUFFbEZUa1N1UW1DQyc7XG4gICAgfVxuICB9XG59XG4iXX0=