/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input, ViewChild, ElementRef } from '@angular/core';
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLWltYWdlLXpvb20uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL2RlYy1pbWFnZS16b29tL2RlYy1pbWFnZS16b29tLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBaUIsTUFBTSxlQUFlLENBQUM7QUF3QnZGLE1BQU07SUFnREo7O3NCQWZTLEtBQUs7cUJBRU4sQ0FBQzt5QkFFRyxLQUFLO3lCQUNMLElBQUk7dUJBT04sQ0FBQzt1QkFDRCxDQUFDO3dCQVFBLEdBQUcsRUFBRTtZQUNkLHVCQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ2hELElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO1lBQ3BCLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO1lBQ3BCLHFCQUFJLFNBQVMsR0FBRyxLQUFLLENBQUM7WUFDdEIscUJBQUksU0FBUyxHQUFHLEtBQUssQ0FBQztZQUV0QixFQUFFLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3JCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO29CQUNoQix1QkFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQztvQkFDdEIsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUM7b0JBQ2IsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFFaEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztvQkFDL0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FB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QUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLEdBQUcsV0FBVyxDQUFDO1lBQ2pFLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLHFCQUFxQixDQUFDLENBQUM7WUFDbEYsSUFBSSxDQUFDLGVBQWUsR0FBRyxhQUFhLENBQUMsR0FBRyxDQUFDO1lBQ3pDLElBQUksQ0FBQyxZQUFZLEdBQUc7Z0JBQ2xCLEtBQUssRUFBRSxhQUFhLENBQUMsS0FBSztnQkFDMUIsTUFBTSxFQUFFLGFBQWEsQ0FBQyxNQUFNO2FBQzdCLENBQUE7U0FDRixDQUFDO1FBRUYsYUFBYSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7S0FDeEM7Ozs7SUFFTyxXQUFXO1FBQ2pCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ3JDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQztTQUMzQjtRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sTUFBTSxDQUFDLGc1RkFBZzVGLENBQUM7U0FDejVGOzs7O1lBM05KLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsZ0JBQWdCO2dCQUMxQixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7O09BY0w7Z0JBQ0wsTUFBTSxFQUFFLENBQUMsa2RBQWtkLENBQUM7YUFDN2Q7Ozs7O29CQUdFLEtBQUs7bUJBWUwsS0FBSzt1QkFXTCxTQUFTLFNBQUMsZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgVmlld0NoaWxkLCBFbGVtZW50UmVmLCBBZnRlclZpZXdJbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cblxuZXhwb3J0IHR5cGUgWm9vbU1vZGUgPSAnaG92ZXInIHwgJ2NsaWNrJyB8ICd0b2dnbGUnIHwgJ2hvdmVyLWZyZWV6ZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1pbWFnZS16b29tJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwiaW1hZ2VoaWdobGlnaHQtY29udGFpbmVyXCIgZnhMYXlvdXQ9XCJjb2x1bW5cIiBmeExheW91dEFsaWduPVwic3BhY2UtYmV0d2VlbiBzdGFydFwiIGZ4TGF5b3V0R2FwPVwiZ2FwcHhcIj5cbiAgPGRpdiAjaW1hZ2VDb250YWluZXIgY2xhc3M9XCJpbWFnZWhpZ2hsaWdodC1jb250YWluZXJcIj5cbiAgPC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJjb250YWluZXItaW1nLWxpbmtcIj5cbiAgICA8c3BhbiBbbmdDbGFzc109XCJ7J3pvb20taW4tYWN0aXZlJzogZmluYWxab29tLCAnem9vbS1pbic6ICFmaW5hbFpvb219XCIgKGNsaWNrKT1cInpvb21JbigpXCI+XG4gICAgICA8bWF0LWljb24gY2xhc3M9XCJpY29ucy16b29tXCI+YWRkX2NpcmNsZV9vdXRsaW5lPC9tYXQtaWNvbj5cbiAgICA8L3NwYW4+XG4gICAgPHNwYW4gW25nQ2xhc3NdPVwieyd6b29tLW91dC1hY3RpdmUnOiAhaXNab29tLCAnem9vbS1vdXQnOiBpc1pvb219XCIgKGNsaWNrKT1cInpvb21PdXQoKVwiPlxuICAgICAgPG1hdC1pY29uIGNsYXNzPVwiaWNvbnMtem9vbVwiPnJlbW92ZV9jaXJjbGVfb3V0bGluZTwvbWF0LWljb24+XG4gICAgPC9zcGFuPlxuICAgIDxzcGFuICpuZ0lmPVwiaW1nRXh0ZXJuYWxMaW5rXCIgY2xhc3M9XCJpbWctbGlua1wiPlxuICAgICAgPGEgaHJlZj1cInt7IGltZ0V4dGVybmFsTGluayB9fVwiIHRhcmdldD1cIl9ibGFua1wiPnt7ICdsYWJlbC5pbWFnZS1saW5rJyB8IHRyYW5zbGF0ZSB9fTwvYT5cbiAgICA8L3NwYW4+XG4gIDwvZGl2PlxuPC9kaXY+YCxcbiAgc3R5bGVzOiBbYC5pbWFnZWhpZ2hsaWdodC1jb250YWluZXJ7d2lkdGg6MTAwJTtoZWlnaHQ6MTAwJX0uY29udGFpbmVyLWltZy1saW5re3Bvc2l0aW9uOnJlbGF0aXZlO3dpZHRoOjEwMCU7aGVpZ2h0OjIwcHh9Lnpvb20taW57Y3Vyc29yOnBvaW50ZXI7Y29sb3I6cmVkO3Bvc2l0aW9uOmFic29sdXRlO3JpZ2h0OjB9Lnpvb20tb3V0e2N1cnNvcjpwb2ludGVyO2NvbG9yOnJlZDtwb3NpdGlvbjphYnNvbHV0ZTtyaWdodDoyMHB4fS56b29tLWluLWFjdGl2ZXtjb2xvcjpncmF5O3Bvc2l0aW9uOmFic29sdXRlO3JpZ2h0OjB9Lnpvb20tb3V0LWFjdGl2ZXtjb2xvcjpncmF5O3Bvc2l0aW9uOmFic29sdXRlO3JpZ2h0OjIwcHh9Lmljb25zLXpvb217Zm9udC1zaXplOjE4cHh9LmltZy1saW5re3Bvc2l0aW9uOmFic29sdXRlO3JpZ2h0OjUwcHg7Y29sb3I6Z3JheX0uaW1nLWxpbmsgYXtmb250LXNpemU6MTBweDtwYWRkaW5nLXRvcDoycHh9YF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjSW1hZ2Vab29tQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XG5cbiAgQElucHV0KClcbiAgc2V0IGltYWdlKHYpIHtcbiAgICBpZiAodikge1xuICAgICAgdGhpcy5faW1hZ2UgPSB2O1xuICAgICAgdGhpcy5sb2FkSGlnaExpZ2h0SW1hZ2UoKTtcbiAgICB9XG4gIH1cblxuICBnZXQgaW1hZ2UoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2ltYWdlO1xuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IHNpemUodikge1xuICAgIGlmICh2KSB7XG4gICAgICB0aGlzLl9zaXplID0gdjtcbiAgICB9XG4gIH1cblxuICBnZXQgc2l6ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fc2l6ZTtcbiAgfVxuXG4gIEBWaWV3Q2hpbGQoJ2ltYWdlQ29udGFpbmVyJykgZGl2SW1hZ2U6IEVsZW1lbnRSZWY7XG5cbiAgcHJpdmF0ZSBfaW1hZ2U6IGFueTtcbiAgcHJpdmF0ZSBfc2l6ZTogYW55O1xuXG4gIGltZ0V4dGVybmFsTGluazogc3RyaW5nO1xuICBcbiAgLy8gem9vbVxuICBpc1pvb20gPSBmYWxzZTtcbiAgaW1hZ2VTaXplUmF3OiBhbnk7XG4gIHN0ZXBzID0gMTtcbiAgc3RlcHNEaWZmOiBhbnk7XG4gIGZpbmFsWm9vbSA9IGZhbHNlO1xuICBpbWFnZVNpemUgPSAxMDI0O1xuXG4gIC8vIHBvc2l0aW9uIGJhY2tncm91bmRcbiAgZGVsdGFYOiBudW1iZXI7XG4gIGRlbHRhWTogbnVtYmVyO1xuICBsYXN0TW91c2VYOiBudW1iZXI7XG4gIGxhc3RNb3VzZVk6IG51bWJlcjtcbiAgb2Zmc2V0WCA9IDA7XG4gIG9mZnNldFkgPSAwO1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIHRoaXMuaW5pdFpvb20oKTtcbiAgfVxuXG4gIGluaXRab29tID0gKCkgPT4ge1xuICAgIGNvbnN0IGVsID0gdGhpcy5nZXROYXRpdmVFbGVtZW50KHRoaXMuZGl2SW1hZ2UpO1xuICAgIHRoaXMubGFzdE1vdXNlWCA9IDA7XG4gICAgdGhpcy5sYXN0TW91c2VZID0gMDtcbiAgICBsZXQgbW91c2Vkb3duID0gZmFsc2U7XG4gICAgbGV0IG1vdXNlbW92ZSA9IGZhbHNlO1xuXG4gICAgZWwub25tb3VzZWRvd24gPSAoZSkgPT4ge1xuICAgICAgaWYgKHRoaXMuaXNab29tKSB7XG4gICAgICAgIGNvbnN0IGNvb3JkcyA9IGdldFBvcyhlKSxcbiAgICAgICAgICB4ID0gY29vcmRzWzBdLFxuICAgICAgICAgIHkgPSBjb29yZHNbMV07XG5cbiAgICAgICAgdGhpcy5kZWx0YVggPSB4IC0gdGhpcy5vZmZzZXRYO1xuICAgICAgICB0aGlzLmRlbHRhWSA9IHkgLSB0aGlzLm9mZnNldFk7XG4gICAgICAgIG1vdXNlZG93biA9IHRydWU7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdGhpcy5sYXN0TW91c2VYID0gZS5vZmZzZXRYO1xuICAgICAgdGhpcy5sYXN0TW91c2VZID0gZS5vZmZzZXRZO1xuICAgICAgbW91c2Vkb3duID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBlbC5vbm1vdXNlbW92ZSA9IChlKSA9PiB7XG4gICAgICBpZiAodGhpcy5pc1pvb20gJiYgbW91c2Vkb3duKSB7XG4gICAgICAgIGNvbnN0IGNvb3JkcyA9IGdldFBvcyhlKSxcbiAgICAgICAgICB4ID0gY29vcmRzWzBdLFxuICAgICAgICAgIHkgPSBjb29yZHNbMV07XG5cbiAgICAgICAgaWYgKCgoeCAtIHRoaXMuZGVsdGFYKSAqICgtMSkpICsgZWwub2Zmc2V0V2lkdGggPCB0aGlzLmltYWdlU2l6ZSkge1xuICAgICAgICAgIHRoaXMub2Zmc2V0WCA9IHggLSB0aGlzLmRlbHRhWDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgoKHkgLSB0aGlzLmRlbHRhWSkgKiAoLTEpKSArIGVsLm9mZnNldFdpZHRoIDwgdGhpcy5pbWFnZVNpemUpIHtcbiAgICAgICAgICB0aGlzLm9mZnNldFkgPSB5IC0gdGhpcy5kZWx0YVk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5vZmZzZXRZID4gMCkge1xuICAgICAgICAgIHRoaXMub2Zmc2V0WSA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMub2Zmc2V0WCA+IDApIHtcbiAgICAgICAgICB0aGlzLm9mZnNldFggPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgZWwuc3R5bGUuYmFja2dyb3VuZFBvc2l0aW9uID0gdGhpcy5vZmZzZXRYICsgJ3B4ICcgKyB0aGlzLm9mZnNldFkgKyAncHgnO1xuXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBlbC5vbm1vdXNldXAgPSAoKSA9PiB7XG4gICAgICBpZiAodGhpcy5pc1pvb20pIHtcbiAgICAgICAgbW91c2Vkb3duID0gZmFsc2U7XG4gICAgICAgIG1vdXNlbW92ZSA9IGZhbHNlO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGdldFBvcyhlKSB7XG4gICAgICBjb25zdCByID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXG4gICAgICAgIHggPSBlLmNsaWVudFggLSByLmxlZnQsXG4gICAgICAgIHkgPSBlLmNsaWVudFkgLSByLnRvcDtcbiAgICAgIHJldHVybiBbeCwgeV07XG4gICAgfVxuICB9XG5cbiAgem9vbUluKCkge1xuICAgIGlmICh0aGlzLnN0ZXBzID09PSAxKSB7XG4gICAgICB0aGlzLmdldFN0ZXBzRGlmZigpO1xuICAgIH1cbiAgICBpZiAodGhpcy5zdGVwcyA+IDQpIHtcbiAgICAgIHRoaXMuZmluYWxab29tID0gdHJ1ZTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgZWwgPSB0aGlzLmRpdkltYWdlLm5hdGl2ZUVsZW1lbnQ7XG4gICAgdGhpcy5pbWFnZVNpemUgKz0gdGhpcy5zdGVwc0RpZmZcbiAgICBlbC5zdHlsZS5iYWNrZ3JvdW5kU2l6ZSA9IHRoaXMuaW1hZ2VTaXplICsgJ3B4JztcbiAgICB0aGlzLm9mZnNldFggPSAoZWwub2Zmc2V0V2lkdGggLSB0aGlzLmltYWdlU2l6ZSkgLyAyO1xuICAgIHRoaXMub2Zmc2V0WSA9IChlbC5vZmZzZXRIZWlnaHQgLSB0aGlzLmltYWdlU2l6ZSkgLyAyO1xuICAgIGVsLnN0eWxlLmJhY2tncm91bmRQb3NpdGlvbiA9IHRoaXMub2Zmc2V0WCArICdweCAnICsgdGhpcy5vZmZzZXRZICsgJ3B4JztcbiAgICB0aGlzLmlzWm9vbSA9IHRydWU7XG4gICAgdGhpcy5zdGVwcysrO1xuICB9XG5cbiAgem9vbU91dCgpIHtcbiAgICBjb25zdCBlbCA9IHRoaXMuZGl2SW1hZ2UubmF0aXZlRWxlbWVudDtcbiAgICBpZiAodGhpcy5zdGVwcyA9PT0gMikge1xuICAgICAgdGhpcy5pbWFnZVNpemUgPSAxMDI0O1xuICAgICAgZWwuc3R5bGUuYmFja2dyb3VuZFNpemUgPSAnMTAwJSc7XG4gICAgICBlbC5zdHlsZS5iYWNrZ3JvdW5kUG9zaXRpb24gPSAnMHB4IDBweCc7XG4gICAgICB0aGlzLm9mZnNldFggPSAwO1xuICAgICAgdGhpcy5vZmZzZXRZID0gMDtcbiAgICAgIHRoaXMuaXNab29tID0gZmFsc2U7XG4gICAgICB0aGlzLnN0ZXBzID0gMTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuc3RlcHMgPiAxKSB7XG4gICAgICB0aGlzLmltYWdlU2l6ZSAtPSB0aGlzLnN0ZXBzRGlmZjtcbiAgICAgIGVsLnN0eWxlLmJhY2tncm91bmRTaXplID0gdGhpcy5pbWFnZVNpemUgKyAncHgnO1xuICAgICAgdGhpcy5vZmZzZXRYID0gKGVsLm9mZnNldFdpZHRoIC0gdGhpcy5pbWFnZVNpemUpIC8gMjtcbiAgICAgIHRoaXMub2Zmc2V0WSA9IChlbC5vZmZzZXRIZWlnaHQgLSB0aGlzLmltYWdlU2l6ZSkgLyAyO1xuICAgICAgZWwuc3R5bGUuYmFja2dyb3VuZFBvc2l0aW9uID0gdGhpcy5vZmZzZXRYICsgJ3B4ICcgKyB0aGlzLm9mZnNldFkgKyAncHgnO1xuICAgICAgdGhpcy5zdGVwcy0tO1xuICAgICAgdGhpcy5maW5hbFpvb20gPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBnZXRTdGVwc0RpZmYoKSB7XG4gICAgdGhpcy5zdGVwc0RpZmYgPSAodGhpcy5pbWFnZVNpemVSYXcud2lkdGggLyA0KTtcbiAgfVxuXG4gIGdldE5hdGl2ZUVsZW1lbnQoZGl2SW1hZ2UpIHtcbiAgICBpZiAoZGl2SW1hZ2UpIHtcbiAgICAgIHJldHVybiBkaXZJbWFnZS5uYXRpdmVFbGVtZW50O1xuICAgIH1cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuZ2V0TmF0aXZlRWxlbWVudChkaXZJbWFnZSk7XG4gICAgfSwgNDAwKTtcbiAgfVxuXG4gIGxvYWRIaWdoTGlnaHRJbWFnZSgpIHtcbiAgICB0aGlzLmRpdkltYWdlLm5hdGl2ZUVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZFNpemUgPSAnMTAwJSc7XG4gICAgdGhpcy5kaXZJbWFnZS5uYXRpdmVFbGVtZW50LnN0eWxlLmJhY2tncm91bmRQb3NpdGlvbiA9ICcwcHggMHB4JztcbiAgICB0aGlzLmRpdkltYWdlLm5hdGl2ZUVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gJyc7XG4gICAgdGhpcy5pc1pvb20gPSBmYWxzZTtcbiAgICB0aGlzLmRpdkltYWdlLm5hdGl2ZUVsZW1lbnQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdkZWMtc3lzZmlsZS1iZy1sb2FkJyk7XG4gICAgY29uc3QgZG93bmxvYWRJbWFnZSA9IG5ldyBJbWFnZSgpO1xuXG4gICAgZG93bmxvYWRJbWFnZS5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICB0aGlzLmRpdkltYWdlLm5hdGl2ZUVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gJ3VybCgnICsgZG93bmxvYWRJbWFnZS5zcmMgKyAnICknO1xuICAgICAgdGhpcy5kaXZJbWFnZS5uYXRpdmVFbGVtZW50LnN0eWxlLmJhY2tncm91bmRSZXBlYXQgPSAnbm8tcmVwZWF0JztcbiAgICAgIHRoaXMuZGl2SW1hZ2UubmF0aXZlRWxlbWVudC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2RlYy1zeXNmaWxlLWJnLWxvYWQnKTtcbiAgICAgIHRoaXMuaW1nRXh0ZXJuYWxMaW5rID0gZG93bmxvYWRJbWFnZS5zcmM7XG4gICAgICB0aGlzLmltYWdlU2l6ZVJhdyA9IHtcbiAgICAgICAgd2lkdGg6IGRvd25sb2FkSW1hZ2Uud2lkdGgsXG4gICAgICAgIGhlaWdodDogZG93bmxvYWRJbWFnZS5oZWlnaHRcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgZG93bmxvYWRJbWFnZS5zcmMgPSB0aGlzLmdldEltYWdlVXJsKCk7XG4gIH1cblxuICBwcml2YXRlIGdldEltYWdlVXJsKCkge1xuICAgIGlmICh0aGlzLmltYWdlICYmIHRoaXMuaW1hZ2UuZmlsZVVybCkge1xuICAgICAgcmV0dXJuIHRoaXMuaW1hZ2UuZmlsZVVybDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuICdkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUlBQUFBQ0FDQU1BQUFEMDRKSDVBQUFBc1ZCTVZFVUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBazJ3TFNBQUFBT25SU1RsTUFBNFVVQlFnTUVQU0tLK2phR3hjZjk1MHljazg2TmkrbWdiOVhKaU95UlBEczNxS1daMHJLclh4Mys4NWpRVDI0WGVQWDA4VnRhcEdhRUM1Uk53QUFCMTVKUkVGVWVOcnRtMmR6MnpBTWhrbHIyYklsNzVGNDFYRzg0cGxsMS96L1A2eVhWallFa2lLcGtkNzFycytubmlNZEllSUZDRUFxK2M5Ly9wTVYyd3Y4M21HNW5CNTZmdURhNUM5Q2crbm1WR2FZSDZlWGFVREo5eE1PSnl5WnlUQWszMGx3cmpJZHM4MllmQS91QlZiWDJIRHhTT0dNNXl3TmszNnhldWg5c0xTOEg0c3pZYlJpU1pUTExKRmFxeURkUzJULzlqeHNoVkh3VTl1eHhzZjlYR0xLWTFoQTBMOHdqby9GeUphcjFHOExNbjJ3ODJydmlTRjJIWmVvOERvN2hxajJjejMrQTg1Mlo4c2tXV3l3TTByWnhlZ2k4YTBPcHR0cEw5K1FHQzJTRGI4YzMvdFdxZ2ZwMWhpd1BaQXNMT0lQa1Q2b2wzSHoyeG5jVUdMQUpZdVc3YmlBbmtsYXJyRm96dXJESU9hSE5VMG4velhjdXM4UlJhWFlZNlN5QUpMZmJKenZFR2xrc3FCNXYrdms1RTNrNElZSk1RWFUwOHgvb2puZ3pXdnErSHNnUmZBTTBVaE1hRUgwa1dLb3NCc21HY205SjVBWFVoVGcwNEJvdWVmL0NnRUs4MExOTVRhMlNZcGtZcG9TKy9mRGh4YmJSOTNMaEpiNnV1cXQxbk9MTHVvYnQ4eG1Hem5BSjBycSs1L05pUGtYemViUGZWMXpRTjhMRk5YcFlSYUExaWVUOFdscDFLV1BoTWRiMmxaWDZWc21aenRXdXZmalpxZytCVlVjblRmbGxCMmwzN1E2ckVINTJhR2FtSmJ6Yk9TRW1sb20wVVg5cEoxa0twUVNwN2NZNnhJcDd3eHhDdVFLWUFvMDBUTlZib0V2YnFnc0dSeVppaWtCRkU3dUs3SWxvaTF1NllHcFdHb0twTnZ1eXNSOTB4L1dkYWRJQThETlZuSVowZzNYeWliN2tNTUZvSUl6RWFoR0cyQVRNbDdoSm51c05jQzQ0cUJSRXFtS1dRSlZUVjNjWnpkamF0d3pGUmNyVGhCNGZENXBSeGNLSjhkdERCQkdsZzRiQ1dwMEhsZ2FmcHl4amtNb3Q2UWUyRUhDMlNTcE1WeW5NNkV1aThRWndWalIxWEhSZTNndzl0U0RsTEZqS2RpaVFjMWVIZ2VkNkdkWE5aMTZoR2NCa1JoUWsvbUFpKzlCOUpTOGFBK2NHcjM3WDE0YnpCU2MrNStpYnBVZ3RtTG5JRmZqeHNtZ3hxWkU3bHM4VzFLY0pmWUxWdU1ydmQ4MVlHWlVaWFd2Sjh2UkRsbzVRWTF2b0ViTGM4UFJzakpqR2xDekdQM1drK1RoR1k3TUE2U3BUMXo5OFdsa1BEQTNnRVNuelFKcFVOYU1NTFlhd3g3aGdlSGNJNWhncFRjQUx6WWdNZDVrdzVEZlYzbWd4akpXbzgwbldWTUQ5cEVuNDFLWHVZVkVMVHJJSHVmR3hwRHlKMTBpMHBLR2lyb0lKQWF3QnNqZXZXSnhIN0FKU3pNRDZtTFNzNlI1RUJZNmdxc2ZXWnlWejU5b2NxUXhING8yMmRnQVlBY0x0YkFhQjBpTk94TURiUEZFOXVFNmJBQ3dCbnM3bkJvZGZjbU1rNnVZOVZvNkE3QWFiUkE4SnhMeTA4QUFJalpJWFkwQm9ocGhrQ2VJeE5pQW5tQkFRMmtBWG1qTXFYR01SR0prUU5kOEI0QmRDQXZWZENJeDM0RWVwSVlZMnJwN2lYdUlpZ3NpTVJGaFM0d0NXMi9BR0FYVU9WRWt6L293OU1VODRPZ05nRklPRnRLcmtjak80N3FZQ1MyOUFSN2hDRTVZSktQN1RuZWYxSm5Razlpa055Q0k3dmlBRGV4emFyVHVKblIrcU00Q1J4a1lvZ0c0c1M2elNZZ1hBa29PTHhMcElFUmZEOGdZUm4vY29GR1NnOVc0WGRoWUpMSTJ1Q1lwVXVaNkE1cklrUXQ2TndFbjRkbVNnaG81QSthUzh1c1NkVkY2QXhvVWJvRnBsdVFsOThjb0poSVNwd3picmE2S05WT2dhN1NUc1k0TlQ1a21LS2dFeGJka3JXRmZiOEJKR0dtY1FxaktaamczT29wcHBDWHJqRjcwQmpEWVdtL3p0ZDZzN2NJOWRJSFZ1S2VFNXdWOEthcnd6Y0NBOS9pZGptY1RqTWVwY1pvd0NCakl1Mk5MYndBckVUVUJwOGFXTkE5MjVQT0JWNVVCa0FzMCtCOVlOblVDREtFa2xXMU1UV01BbUNreWhJVjROZjRFTlVhMlZSVXpJcjBCckNKcWkxYStacXZRU08zeFVIOUI4VmEvSkUzSk5rWUdzS2NXdit2UmlRUXpLYWVDUjBWVDFNQUZTWFBDaGdNR0tQbnN3aTdRL2lNc3RBUmhyWEg0K0lUUU1vUWJ4MEpRcDNiNE5CajJBeXZ3Ty9NdFM1ajA5emsxaHIxa0ZibkNSSWxsNWpHNDc4MnlpbzhTYUFJRjFueFJ3SEx3N01JMGE4c0VCb3IzQmVDZUJzdERHNHFGa3JLMEJkNjVrZnVLNWFJOHRMRWFnUldSY3VUZWJWNVlIbkNzam5hNHJwTkMzL0Y3YzRzQnVkVklqbFcwQVZMNm5JdmFMRDlYYUpjcWNLRHIzcHpXNko4dHViTGN3RmRVOWtyL01Vc0lKeTYwbWZtQU9mOEdlaHVERjh6VGU1SmRQSlFpS2w5RS96Yjg3V0hScC94cjBiYlI5d09Oa0JTTFZiNkZCbFdYRXVoamorSncza0hnYWtyb3k2dWlvQlBqVDNQbzNkUjVnZXMvM3c5eEEyYzE3blZVWWV1WFdKcFBVNDZLcndIeWZocnJFeFBPNk5UTURmMXBXRTREY01jcGZ5elljQkp1aUNrRGVEMlROeDk0Ty9Cb2xxaGgyeW5KUS84SDhtY1dDOWpWS2VURDlFSEtXd2R3YTNWRXNoSHNZbzlCMGxMQm5aVUczZnZHRFVuUEszby9STkt5bktGMk5ndXRCZ09xeTFSblErK2RBZVdzUHJSUVh6TWIycVlDbXRaUUUrZG1UeUlQWEZNOG9nWm10OHU0SkNONUdEMXhsZmFpcmw1OStNRVF0WHJlVE40V2lyeEtWMTdWdWExTmxYRmNLTW1OTjJFaXAvYlNEeDJiZm1FNzN2aHdYa3ZxMTdWWDJQOHp5c0xuaUJTRy81bCtlWjhVeW5qQTB0Q3NrOEp4WDU5TW05SlhoM3dQNFVWdnc5czVJTitKTjcyV2s5dXdlY2NpZndHM3YyL1crQWVmNzFzZStadFF4NnI3dmU3eDJQUHJsa1ArOCsveUN6R2k3YUZ6cFBVdEFBQUFBRWxGVGtTdVFtQ0MnO1xuICAgIH1cbiAgfVxufVxuIl19