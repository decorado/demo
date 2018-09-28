/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
/** @type {?} */
const S3Host = 'http://s3.amazonaws.com/decora-platform-1-nv';
/** @typedef {?} */
var ZoomMode;
export { ZoomMode };
export class DecImageZoomComponent {
    constructor() {
        this.permitUpload = false;
        this.uploaded = new EventEmitter();
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
        else if (this.image && this.image.fileBasePath) {
            return `${S3Host}/${this.image.fileBasePath}`;
        }
        else {
            return 'data:image/png;base64,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';
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    uploadedFunction(event) {
        this.image = event[0];
        this.uploaded.emit(this.image);
    }
}
DecImageZoomComponent.decorators = [
    { type: Component, args: [{
                selector: 'dec-image-zoom',
                template: `<div class="imagehighlight-container" fxLayout="column" fxLayoutAlign="space-between start" fxLayoutGap="gappx">
  <div #imageContainer class="imagehighlight-container">
  </div>
  <div class="container-img-link">
    <div *ngIf="permitUpload" class="upload-button">
      <dec-upload [endpoint]="'/files/upload'" (uploaded)="uploadedFunction($event)">
        <mat-icon class="upload-icon-size">
            add_a_photo
        </mat-icon>
      </dec-upload>
    </div>

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
</div>
`,
                styles: [`.imagehighlight-container{width:100%;height:100%}.container-img-link{position:relative;width:100%;height:20px}.zoom-in{cursor:pointer;color:red;position:absolute;right:0}.zoom-out{cursor:pointer;color:red;position:absolute;right:20px}.zoom-in-active{color:gray;position:absolute;right:0}.zoom-out-active{color:gray;position:absolute;right:20px}.icons-zoom{font-size:18px}.img-link{position:absolute;right:50px;color:gray}.img-link a{font-size:10px;padding-top:2px}.upload-button{width:250px;display:inline-block}.upload-icon-size{font-size:20px;cursor:pointer}`]
            },] },
];
/** @nocollapse */
DecImageZoomComponent.ctorParameters = () => [];
DecImageZoomComponent.propDecorators = {
    image: [{ type: Input }],
    size: [{ type: Input }],
    permitUpload: [{ type: Input }],
    divImage: [{ type: ViewChild, args: ['imageContainer',] }],
    uploaded: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    DecImageZoomComponent.prototype.permitUpload;
    /** @type {?} */
    DecImageZoomComponent.prototype.divImage;
    /** @type {?} */
    DecImageZoomComponent.prototype.uploaded;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLWltYWdlLXpvb20uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL2RlYy1pbWFnZS16b29tL2RlYy1pbWFnZS16b29tLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBaUIsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFFN0csTUFBTSxNQUFNLEdBQUcsOENBQThDLENBQUM7Ozs7QUFnQzlELE1BQU07SUFvREo7NEJBM0J3QixLQUFLO3dCQUlSLElBQUksWUFBWSxFQUFFOztzQkFROUIsS0FBSztxQkFFTixDQUFDO3lCQUVHLEtBQUs7eUJBQ0wsSUFBSTt1QkFPTixDQUFDO3VCQUNELENBQUM7d0JBUUEsR0FBRyxFQUFFOztZQUNkLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDaEQsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUM7WUFDcEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUM7O1lBQ3BCLElBQUksU0FBUyxHQUFHLEtBQUssQ0FBQzs7WUFDdEIsSUFBSSxTQUFTLEdBQUcsS0FBSyxDQUFDO1lBRXRCLEVBQUUsQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRTtnQkFDckIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7O29CQUNoQixNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBRVI7O29CQUZoQixNQUNFLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQ0M7O29CQUZoQixNQUVFLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBRWhCLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7b0JBQy9CLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7b0JBQy9CLFNBQVMsR0FBRyxJQUFJLENBQUM7b0JBQ2pCLE1BQU0sQ0FBQztpQkFDUjtnQkFFRCxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUM7Z0JBQzVCLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQztnQkFDNUIsU0FBUyxHQUFHLElBQUksQ0FBQzthQUNsQixDQUFBO1lBRUQsRUFBRSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFO2dCQUNyQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUM7O29CQUM3QixNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBRVI7O29CQUZoQixNQUNFLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQ0M7O29CQUZoQixNQUVFLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBRWhCLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7d0JBQ2pFLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7cUJBQ2hDO29CQUVELEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7d0JBQ2pFLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7cUJBQ2hDO29CQUVELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDckIsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7cUJBQ2xCO29CQUNELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDckIsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7cUJBQ2xCO29CQUVELEVBQUUsQ0FBQyxLQUFLLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7b0JBRXpFLE1BQU0sQ0FBQztpQkFDUjthQUNGLENBQUE7WUFFRCxFQUFFLENBQUMsU0FBUyxHQUFHLEdBQUcsRUFBRTtnQkFDbEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7b0JBQ2hCLFNBQVMsR0FBRyxLQUFLLENBQUM7b0JBQ2xCLFNBQVMsR0FBRyxLQUFLLENBQUM7b0JBQ2xCLE1BQU0sQ0FBQztpQkFDUjthQUNGLENBQUM7Ozs7O1lBRUYsZ0JBQWdCLENBQUM7O2dCQUNmLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxxQkFBcUIsRUFBRSxDQUVaOztnQkFGeEIsTUFDRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsSUFBSSxDQUNBOztnQkFGeEIsTUFFRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO2dCQUN4QixNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7YUFDZjtTQUNGO0tBdkVnQjs7Ozs7SUFsRGpCLElBQ0ksS0FBSyxDQUFDLENBQUM7UUFDVCxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ04sSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7WUFDaEIsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7U0FDM0I7S0FDRjs7OztJQUVELElBQUksS0FBSztRQUNQLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO0tBQ3BCOzs7OztJQUVELElBQ0ksSUFBSSxDQUFDLENBQUM7UUFDUixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ04sSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7U0FDaEI7S0FDRjs7OztJQUVELElBQUksSUFBSTtRQUNOLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO0tBQ25COzs7O0lBK0JELGVBQWU7UUFDYixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7S0FDakI7Ozs7SUFxRUQsTUFBTTtRQUNKLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNyQixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7U0FDckI7UUFDRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7WUFDdEIsTUFBTSxDQUFDO1NBQ1I7O1FBQ0QsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUM7UUFDdkMsSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFBO1FBQ2hDLEVBQUUsQ0FBQyxLQUFLLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ2hELElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxFQUFFLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDckQsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLEVBQUUsQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN0RCxFQUFFLENBQUMsS0FBSyxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ3pFLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ25CLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztLQUNkOzs7O0lBRUQsT0FBTzs7UUFDTCxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQztRQUN2QyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7WUFDdEIsRUFBRSxDQUFDLEtBQUssQ0FBQyxjQUFjLEdBQUcsTUFBTSxDQUFDO1lBQ2pDLEVBQUUsQ0FBQyxLQUFLLENBQUMsa0JBQWtCLEdBQUcsU0FBUyxDQUFDO1lBQ3hDLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO1lBQ2pCLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO1lBQ2pCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1lBQ3BCLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1NBQ2hCO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMxQixJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUM7WUFDakMsRUFBRSxDQUFDLEtBQUssQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7WUFDaEQsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLEVBQUUsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNyRCxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsRUFBRSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3RELEVBQUUsQ0FBQyxLQUFLLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7WUFDekUsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2IsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7U0FDeEI7S0FDRjs7OztJQUVELFlBQVk7UUFDVixJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7S0FDaEQ7Ozs7O0lBRUQsZ0JBQWdCLENBQUMsUUFBUTtRQUN2QixFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ2IsTUFBTSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUM7U0FDL0I7UUFDRCxVQUFVLENBQUMsR0FBRyxFQUFFO1lBQ2QsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ2pDLEVBQUUsR0FBRyxDQUFDLENBQUM7S0FDVDs7OztJQUVELGtCQUFrQjtRQUNoQixJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsY0FBYyxHQUFHLE1BQU0sQ0FBQztRQUMxRCxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsa0JBQWtCLEdBQUcsU0FBUyxDQUFDO1FBQ2pFLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxlQUFlLEdBQUcsRUFBRSxDQUFDO1FBQ3ZELElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLENBQUM7O1FBQy9FLE1BQU0sYUFBYSxHQUFHLElBQUksS0FBSyxFQUFFLENBQUM7UUFFbEMsYUFBYSxDQUFDLE1BQU0sR0FBRyxHQUFHLEVBQUU7WUFDMUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLGVBQWUsR0FBRyxNQUFNLEdBQUcsYUFBYSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUM7WUFDdEYsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLGdCQUFnQixHQUFHLFdBQVcsQ0FBQztZQUNqRSxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1lBQ2xGLElBQUksQ0FBQyxlQUFlLEdBQUcsYUFBYSxDQUFDLEdBQUcsQ0FBQztZQUN6QyxJQUFJLENBQUMsWUFBWSxHQUFHO2dCQUNsQixLQUFLLEVBQUUsYUFBYSxDQUFDLEtBQUs7Z0JBQzFCLE1BQU0sRUFBRSxhQUFhLENBQUMsTUFBTTthQUM3QixDQUFBO1NBQ0YsQ0FBQztRQUVGLGFBQWEsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0tBQ3hDOzs7O0lBRU8sV0FBVztRQUNqQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNyQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUM7U0FDM0I7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7WUFDakQsTUFBTSxDQUFDLEdBQUcsTUFBTSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFLENBQUM7U0FDL0M7UUFBRSxJQUFJLENBQUMsQ0FBQztZQUNQLE1BQU0sQ0FBQyxnNUZBQWc1RixDQUFDO1NBQ3o1Rjs7Ozs7O0lBS0gsZ0JBQWdCLENBQUMsS0FBSztRQUNwQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN0QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDaEM7OztZQWxQRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGdCQUFnQjtnQkFDMUIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQXVCWDtnQkFDQyxNQUFNLEVBQUUsQ0FBQyxrakJBQWtqQixDQUFDO2FBQzdqQjs7Ozs7b0JBR0UsS0FBSzttQkFZTCxLQUFLOzJCQVdMLEtBQUs7dUJBRUwsU0FBUyxTQUFDLGdCQUFnQjt1QkFFMUIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIFZpZXdDaGlsZCwgRWxlbWVudFJlZiwgQWZ0ZXJWaWV3SW5pdCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuY29uc3QgUzNIb3N0ID0gJ2h0dHA6Ly9zMy5hbWF6b25hd3MuY29tL2RlY29yYS1wbGF0Zm9ybS0xLW52JztcblxuZXhwb3J0IHR5cGUgWm9vbU1vZGUgPSAnaG92ZXInIHwgJ2NsaWNrJyB8ICd0b2dnbGUnIHwgJ2hvdmVyLWZyZWV6ZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1pbWFnZS16b29tJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwiaW1hZ2VoaWdobGlnaHQtY29udGFpbmVyXCIgZnhMYXlvdXQ9XCJjb2x1bW5cIiBmeExheW91dEFsaWduPVwic3BhY2UtYmV0d2VlbiBzdGFydFwiIGZ4TGF5b3V0R2FwPVwiZ2FwcHhcIj5cbiAgPGRpdiAjaW1hZ2VDb250YWluZXIgY2xhc3M9XCJpbWFnZWhpZ2hsaWdodC1jb250YWluZXJcIj5cbiAgPC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJjb250YWluZXItaW1nLWxpbmtcIj5cbiAgICA8ZGl2ICpuZ0lmPVwicGVybWl0VXBsb2FkXCIgY2xhc3M9XCJ1cGxvYWQtYnV0dG9uXCI+XG4gICAgICA8ZGVjLXVwbG9hZCBbZW5kcG9pbnRdPVwiJy9maWxlcy91cGxvYWQnXCIgKHVwbG9hZGVkKT1cInVwbG9hZGVkRnVuY3Rpb24oJGV2ZW50KVwiPlxuICAgICAgICA8bWF0LWljb24gY2xhc3M9XCJ1cGxvYWQtaWNvbi1zaXplXCI+XG4gICAgICAgICAgICBhZGRfYV9waG90b1xuICAgICAgICA8L21hdC1pY29uPlxuICAgICAgPC9kZWMtdXBsb2FkPlxuICAgIDwvZGl2PlxuXG4gICAgPHNwYW4gW25nQ2xhc3NdPVwieyd6b29tLWluLWFjdGl2ZSc6IGZpbmFsWm9vbSwgJ3pvb20taW4nOiAhZmluYWxab29tfVwiIChjbGljayk9XCJ6b29tSW4oKVwiPlxuICAgICAgPG1hdC1pY29uIGNsYXNzPVwiaWNvbnMtem9vbVwiPmFkZF9jaXJjbGVfb3V0bGluZTwvbWF0LWljb24+XG4gICAgPC9zcGFuPlxuICAgIDxzcGFuIFtuZ0NsYXNzXT1cInsnem9vbS1vdXQtYWN0aXZlJzogIWlzWm9vbSwgJ3pvb20tb3V0JzogaXNab29tfVwiIChjbGljayk9XCJ6b29tT3V0KClcIj5cbiAgICAgIDxtYXQtaWNvbiBjbGFzcz1cImljb25zLXpvb21cIj5yZW1vdmVfY2lyY2xlX291dGxpbmU8L21hdC1pY29uPlxuICAgIDwvc3Bhbj5cbiAgICA8c3BhbiAqbmdJZj1cImltZ0V4dGVybmFsTGlua1wiIGNsYXNzPVwiaW1nLWxpbmtcIj5cbiAgICAgIDxhIGhyZWY9XCJ7eyBpbWdFeHRlcm5hbExpbmsgfX1cIiB0YXJnZXQ9XCJfYmxhbmtcIj57eyAnbGFiZWwuaW1hZ2UtbGluaycgfCB0cmFuc2xhdGUgfX08L2E+XG4gICAgPC9zcGFuPlxuICA8L2Rpdj5cbjwvZGl2PlxuYCxcbiAgc3R5bGVzOiBbYC5pbWFnZWhpZ2hsaWdodC1jb250YWluZXJ7d2lkdGg6MTAwJTtoZWlnaHQ6MTAwJX0uY29udGFpbmVyLWltZy1saW5re3Bvc2l0aW9uOnJlbGF0aXZlO3dpZHRoOjEwMCU7aGVpZ2h0OjIwcHh9Lnpvb20taW57Y3Vyc29yOnBvaW50ZXI7Y29sb3I6cmVkO3Bvc2l0aW9uOmFic29sdXRlO3JpZ2h0OjB9Lnpvb20tb3V0e2N1cnNvcjpwb2ludGVyO2NvbG9yOnJlZDtwb3NpdGlvbjphYnNvbHV0ZTtyaWdodDoyMHB4fS56b29tLWluLWFjdGl2ZXtjb2xvcjpncmF5O3Bvc2l0aW9uOmFic29sdXRlO3JpZ2h0OjB9Lnpvb20tb3V0LWFjdGl2ZXtjb2xvcjpncmF5O3Bvc2l0aW9uOmFic29sdXRlO3JpZ2h0OjIwcHh9Lmljb25zLXpvb217Zm9udC1zaXplOjE4cHh9LmltZy1saW5re3Bvc2l0aW9uOmFic29sdXRlO3JpZ2h0OjUwcHg7Y29sb3I6Z3JheX0uaW1nLWxpbmsgYXtmb250LXNpemU6MTBweDtwYWRkaW5nLXRvcDoycHh9LnVwbG9hZC1idXR0b257d2lkdGg6MjUwcHg7ZGlzcGxheTppbmxpbmUtYmxvY2t9LnVwbG9hZC1pY29uLXNpemV7Zm9udC1zaXplOjIwcHg7Y3Vyc29yOnBvaW50ZXJ9YF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjSW1hZ2Vab29tQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XG5cbiAgQElucHV0KClcbiAgc2V0IGltYWdlKHYpIHtcbiAgICBpZiAodikge1xuICAgICAgdGhpcy5faW1hZ2UgPSB2O1xuICAgICAgdGhpcy5sb2FkSGlnaExpZ2h0SW1hZ2UoKTtcbiAgICB9XG4gIH1cblxuICBnZXQgaW1hZ2UoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2ltYWdlO1xuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IHNpemUodikge1xuICAgIGlmICh2KSB7XG4gICAgICB0aGlzLl9zaXplID0gdjtcbiAgICB9XG4gIH1cblxuICBnZXQgc2l6ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fc2l6ZTtcbiAgfVxuXG4gIEBJbnB1dCgpIHBlcm1pdFVwbG9hZCA9IGZhbHNlO1xuXG4gIEBWaWV3Q2hpbGQoJ2ltYWdlQ29udGFpbmVyJykgZGl2SW1hZ2U6IEVsZW1lbnRSZWY7XG5cbiAgQE91dHB1dCgpIHVwbG9hZGVkID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIHByaXZhdGUgX2ltYWdlOiBhbnk7XG4gIHByaXZhdGUgX3NpemU6IGFueTtcblxuICBpbWdFeHRlcm5hbExpbms6IHN0cmluZztcblxuICAvLyB6b29tXG4gIGlzWm9vbSA9IGZhbHNlO1xuICBpbWFnZVNpemVSYXc6IGFueTtcbiAgc3RlcHMgPSAxO1xuICBzdGVwc0RpZmY6IGFueTtcbiAgZmluYWxab29tID0gZmFsc2U7XG4gIGltYWdlU2l6ZSA9IDEwMjQ7XG5cbiAgLy8gcG9zaXRpb24gYmFja2dyb3VuZFxuICBkZWx0YVg6IG51bWJlcjtcbiAgZGVsdGFZOiBudW1iZXI7XG4gIGxhc3RNb3VzZVg6IG51bWJlcjtcbiAgbGFzdE1vdXNlWTogbnVtYmVyO1xuICBvZmZzZXRYID0gMDtcbiAgb2Zmc2V0WSA9IDA7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgdGhpcy5pbml0Wm9vbSgpO1xuICB9XG5cbiAgaW5pdFpvb20gPSAoKSA9PiB7XG4gICAgY29uc3QgZWwgPSB0aGlzLmdldE5hdGl2ZUVsZW1lbnQodGhpcy5kaXZJbWFnZSk7XG4gICAgdGhpcy5sYXN0TW91c2VYID0gMDtcbiAgICB0aGlzLmxhc3RNb3VzZVkgPSAwO1xuICAgIGxldCBtb3VzZWRvd24gPSBmYWxzZTtcbiAgICBsZXQgbW91c2Vtb3ZlID0gZmFsc2U7XG5cbiAgICBlbC5vbm1vdXNlZG93biA9IChlKSA9PiB7XG4gICAgICBpZiAodGhpcy5pc1pvb20pIHtcbiAgICAgICAgY29uc3QgY29vcmRzID0gZ2V0UG9zKGUpLFxuICAgICAgICAgIHggPSBjb29yZHNbMF0sXG4gICAgICAgICAgeSA9IGNvb3Jkc1sxXTtcblxuICAgICAgICB0aGlzLmRlbHRhWCA9IHggLSB0aGlzLm9mZnNldFg7XG4gICAgICAgIHRoaXMuZGVsdGFZID0geSAtIHRoaXMub2Zmc2V0WTtcbiAgICAgICAgbW91c2Vkb3duID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmxhc3RNb3VzZVggPSBlLm9mZnNldFg7XG4gICAgICB0aGlzLmxhc3RNb3VzZVkgPSBlLm9mZnNldFk7XG4gICAgICBtb3VzZWRvd24gPSB0cnVlO1xuICAgIH1cblxuICAgIGVsLm9ubW91c2Vtb3ZlID0gKGUpID0+IHtcbiAgICAgIGlmICh0aGlzLmlzWm9vbSAmJiBtb3VzZWRvd24pIHtcbiAgICAgICAgY29uc3QgY29vcmRzID0gZ2V0UG9zKGUpLFxuICAgICAgICAgIHggPSBjb29yZHNbMF0sXG4gICAgICAgICAgeSA9IGNvb3Jkc1sxXTtcblxuICAgICAgICBpZiAoKCh4IC0gdGhpcy5kZWx0YVgpICogKC0xKSkgKyBlbC5vZmZzZXRXaWR0aCA8IHRoaXMuaW1hZ2VTaXplKSB7XG4gICAgICAgICAgdGhpcy5vZmZzZXRYID0geCAtIHRoaXMuZGVsdGFYO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCgoeSAtIHRoaXMuZGVsdGFZKSAqICgtMSkpICsgZWwub2Zmc2V0V2lkdGggPCB0aGlzLmltYWdlU2l6ZSkge1xuICAgICAgICAgIHRoaXMub2Zmc2V0WSA9IHkgLSB0aGlzLmRlbHRhWTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm9mZnNldFkgPiAwKSB7XG4gICAgICAgICAgdGhpcy5vZmZzZXRZID0gMDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5vZmZzZXRYID4gMCkge1xuICAgICAgICAgIHRoaXMub2Zmc2V0WCA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICBlbC5zdHlsZS5iYWNrZ3JvdW5kUG9zaXRpb24gPSB0aGlzLm9mZnNldFggKyAncHggJyArIHRoaXMub2Zmc2V0WSArICdweCc7XG5cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cblxuICAgIGVsLm9ubW91c2V1cCA9ICgpID0+IHtcbiAgICAgIGlmICh0aGlzLmlzWm9vbSkge1xuICAgICAgICBtb3VzZWRvd24gPSBmYWxzZTtcbiAgICAgICAgbW91c2Vtb3ZlID0gZmFsc2U7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gZ2V0UG9zKGUpIHtcbiAgICAgIGNvbnN0IHIgPSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcbiAgICAgICAgeCA9IGUuY2xpZW50WCAtIHIubGVmdCxcbiAgICAgICAgeSA9IGUuY2xpZW50WSAtIHIudG9wO1xuICAgICAgcmV0dXJuIFt4LCB5XTtcbiAgICB9XG4gIH1cblxuICB6b29tSW4oKSB7XG4gICAgaWYgKHRoaXMuc3RlcHMgPT09IDEpIHtcbiAgICAgIHRoaXMuZ2V0U3RlcHNEaWZmKCk7XG4gICAgfVxuICAgIGlmICh0aGlzLnN0ZXBzID4gNCkge1xuICAgICAgdGhpcy5maW5hbFpvb20gPSB0cnVlO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBlbCA9IHRoaXMuZGl2SW1hZ2UubmF0aXZlRWxlbWVudDtcbiAgICB0aGlzLmltYWdlU2l6ZSArPSB0aGlzLnN0ZXBzRGlmZlxuICAgIGVsLnN0eWxlLmJhY2tncm91bmRTaXplID0gdGhpcy5pbWFnZVNpemUgKyAncHgnO1xuICAgIHRoaXMub2Zmc2V0WCA9IChlbC5vZmZzZXRXaWR0aCAtIHRoaXMuaW1hZ2VTaXplKSAvIDI7XG4gICAgdGhpcy5vZmZzZXRZID0gKGVsLm9mZnNldEhlaWdodCAtIHRoaXMuaW1hZ2VTaXplKSAvIDI7XG4gICAgZWwuc3R5bGUuYmFja2dyb3VuZFBvc2l0aW9uID0gdGhpcy5vZmZzZXRYICsgJ3B4ICcgKyB0aGlzLm9mZnNldFkgKyAncHgnO1xuICAgIHRoaXMuaXNab29tID0gdHJ1ZTtcbiAgICB0aGlzLnN0ZXBzKys7XG4gIH1cblxuICB6b29tT3V0KCkge1xuICAgIGNvbnN0IGVsID0gdGhpcy5kaXZJbWFnZS5uYXRpdmVFbGVtZW50O1xuICAgIGlmICh0aGlzLnN0ZXBzID09PSAyKSB7XG4gICAgICB0aGlzLmltYWdlU2l6ZSA9IDEwMjQ7XG4gICAgICBlbC5zdHlsZS5iYWNrZ3JvdW5kU2l6ZSA9ICcxMDAlJztcbiAgICAgIGVsLnN0eWxlLmJhY2tncm91bmRQb3NpdGlvbiA9ICcwcHggMHB4JztcbiAgICAgIHRoaXMub2Zmc2V0WCA9IDA7XG4gICAgICB0aGlzLm9mZnNldFkgPSAwO1xuICAgICAgdGhpcy5pc1pvb20gPSBmYWxzZTtcbiAgICAgIHRoaXMuc3RlcHMgPSAxO1xuICAgIH0gZWxzZSBpZiAodGhpcy5zdGVwcyA+IDEpIHtcbiAgICAgIHRoaXMuaW1hZ2VTaXplIC09IHRoaXMuc3RlcHNEaWZmO1xuICAgICAgZWwuc3R5bGUuYmFja2dyb3VuZFNpemUgPSB0aGlzLmltYWdlU2l6ZSArICdweCc7XG4gICAgICB0aGlzLm9mZnNldFggPSAoZWwub2Zmc2V0V2lkdGggLSB0aGlzLmltYWdlU2l6ZSkgLyAyO1xuICAgICAgdGhpcy5vZmZzZXRZID0gKGVsLm9mZnNldEhlaWdodCAtIHRoaXMuaW1hZ2VTaXplKSAvIDI7XG4gICAgICBlbC5zdHlsZS5iYWNrZ3JvdW5kUG9zaXRpb24gPSB0aGlzLm9mZnNldFggKyAncHggJyArIHRoaXMub2Zmc2V0WSArICdweCc7XG4gICAgICB0aGlzLnN0ZXBzLS07XG4gICAgICB0aGlzLmZpbmFsWm9vbSA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGdldFN0ZXBzRGlmZigpIHtcbiAgICB0aGlzLnN0ZXBzRGlmZiA9ICh0aGlzLmltYWdlU2l6ZVJhdy53aWR0aCAvIDQpO1xuICB9XG5cbiAgZ2V0TmF0aXZlRWxlbWVudChkaXZJbWFnZSkge1xuICAgIGlmIChkaXZJbWFnZSkge1xuICAgICAgcmV0dXJuIGRpdkltYWdlLm5hdGl2ZUVsZW1lbnQ7XG4gICAgfVxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5nZXROYXRpdmVFbGVtZW50KGRpdkltYWdlKTtcbiAgICB9LCA0MDApO1xuICB9XG5cbiAgbG9hZEhpZ2hMaWdodEltYWdlKCkge1xuICAgIHRoaXMuZGl2SW1hZ2UubmF0aXZlRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kU2l6ZSA9ICcxMDAlJztcbiAgICB0aGlzLmRpdkltYWdlLm5hdGl2ZUVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZFBvc2l0aW9uID0gJzBweCAwcHgnO1xuICAgIHRoaXMuZGl2SW1hZ2UubmF0aXZlRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSAnJztcbiAgICB0aGlzLmlzWm9vbSA9IGZhbHNlO1xuICAgIHRoaXMuZGl2SW1hZ2UubmF0aXZlRWxlbWVudC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2RlYy1zeXNmaWxlLWJnLWxvYWQnKTtcbiAgICBjb25zdCBkb3dubG9hZEltYWdlID0gbmV3IEltYWdlKCk7XG5cbiAgICBkb3dubG9hZEltYWdlLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgIHRoaXMuZGl2SW1hZ2UubmF0aXZlRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSAndXJsKCcgKyBkb3dubG9hZEltYWdlLnNyYyArICcgKSc7XG4gICAgICB0aGlzLmRpdkltYWdlLm5hdGl2ZUVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZFJlcGVhdCA9ICduby1yZXBlYXQnO1xuICAgICAgdGhpcy5kaXZJbWFnZS5uYXRpdmVFbGVtZW50LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnZGVjLXN5c2ZpbGUtYmctbG9hZCcpO1xuICAgICAgdGhpcy5pbWdFeHRlcm5hbExpbmsgPSBkb3dubG9hZEltYWdlLnNyYztcbiAgICAgIHRoaXMuaW1hZ2VTaXplUmF3ID0ge1xuICAgICAgICB3aWR0aDogZG93bmxvYWRJbWFnZS53aWR0aCxcbiAgICAgICAgaGVpZ2h0OiBkb3dubG9hZEltYWdlLmhlaWdodFxuICAgICAgfVxuICAgIH07XG5cbiAgICBkb3dubG9hZEltYWdlLnNyYyA9IHRoaXMuZ2V0SW1hZ2VVcmwoKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0SW1hZ2VVcmwoKSB7XG4gICAgaWYgKHRoaXMuaW1hZ2UgJiYgdGhpcy5pbWFnZS5maWxlVXJsKSB7XG4gICAgICByZXR1cm4gdGhpcy5pbWFnZS5maWxlVXJsO1xuICAgIH0gZWxzZSBpZiAodGhpcy5pbWFnZSAmJiB0aGlzLmltYWdlLmZpbGVCYXNlUGF0aCkge1xuICAgICAgcmV0dXJuIGAke1MzSG9zdH0vJHt0aGlzLmltYWdlLmZpbGVCYXNlUGF0aH1gO1xuICAgIH0gIGVsc2Uge1xuICAgICAgcmV0dXJuICdkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUlBQUFBQ0FDQU1BQUFEMDRKSDVBQUFBc1ZCTVZFVUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBazJ3TFNBQUFBT25SU1RsTUFBNFVVQlFnTUVQU0tLK2phR3hjZjk1MHljazg2TmkrbWdiOVhKaU95UlBEczNxS1daMHJLclh4Mys4NWpRVDI0WGVQWDA4VnRhcEdhRUM1Uk53QUFCMTVKUkVGVWVOcnRtMmR6MnpBTWhrbHIyYklsNzVGNDFYRzg0cGxsMS96L1A2eVhWallFa2lLcGtkNzFycytubmlNZEllSUZDRUFxK2M5Ly9wTVYyd3Y4M21HNW5CNTZmdURhNUM5Q2crbm1WR2FZSDZlWGFVREo5eE1PSnl5WnlUQWszMGx3cmpJZHM4MllmQS91QlZiWDJIRHhTT0dNNXl3TmszNnhldWg5c0xTOEg0c3pZYlJpU1pUTExKRmFxeURkUzJULzlqeHNoVkh3VTl1eHhzZjlYR0xLWTFoQTBMOHdqby9GeUphcjFHOExNbjJ3ODJydmlTRjJIWmVvOERvN2hxajJjejMrQTg1Mlo4c2tXV3l3TTByWnhlZ2k4YTBPcHR0cEw5K1FHQzJTRGI4YzMvdFdxZ2ZwMWhpd1BaQXNMT0lQa1Q2b2wzSHoyeG5jVUdMQUpZdVc3YmlBbmtsYXJyRm96dXJESU9hSE5VMG4velhjdXM4UlJhWFlZNlN5QUpMZmJKenZFR2xrc3FCNXYrdms1RTNrNElZSk1RWFUwOHgvb2puZ3pXdnErSHNnUmZBTTBVaE1hRUgwa1dLb3NCc21HY205SjVBWFVoVGcwNEJvdWVmL0NnRUs4MExOTVRhMlNZcGtZcG9TKy9mRGh4YmJSOTNMaEpiNnV1cXQxbk9MTHVvYnQ4eG1Hem5BSjBycSs1L05pUGtYemViUGZWMXpRTjhMRk5YcFlSYUExaWVUOFdscDFLV1BoTWRiMmxaWDZWc21aenRXdXZmalpxZytCVlVjblRmbGxCMmwzN1E2ckVINTJhR2FtSmJ6Yk9TRW1sb20wVVg5cEoxa0twUVNwN2NZNnhJcDd3eHhDdVFLWUFvMDBUTlZib0V2YnFnc0dSeVppaWtCRkU3dUs3SWxvaTF1NllHcFdHb0twTnZ1eXNSOTB4L1dkYWRJQThETlZuSVowZzNYeWliN2tNTUZvSUl6RWFoR0cyQVRNbDdoSm51c05jQzQ0cUJSRXFtS1dRSlZUVjNjWnpkamF0d3pGUmNyVGhCNGZENXBSeGNLSjhkdERCQkdsZzRiQ1dwMEhsZ2FmcHl4amtNb3Q2UWUyRUhDMlNTcE1WeW5NNkV1aThRWndWalIxWEhSZTNndzl0U0RsTEZqS2RpaVFjMWVIZ2VkNkdkWE5aMTZoR2NCa1JoUWsvbUFpKzlCOUpTOGFBK2NHcjM3WDE0YnpCU2MrNStpYnBVZ3RtTG5JRmZqeHNtZ3hxWkU3bHM4VzFLY0pmWUxWdU1ydmQ4MVlHWlVaWFd2Sjh2UkRsbzVRWTF2b0ViTGM4UFJzakpqR2xDekdQM1drK1RoR1k3TUE2U3BUMXo5OFdsa1BEQTNnRVNuelFKcFVOYU1NTFlhd3g3aGdlSGNJNWhncFRjQUx6WWdNZDVrdzVEZlYzbWd4akpXbzgwbldWTUQ5cEVuNDFLWHVZVkVMVHJJSHVmR3hwRHlKMTBpMHBLR2lyb0lKQWF3QnNqZXZXSnhIN0FKU3pNRDZtTFNzNlI1RUJZNmdxc2ZXWnlWejU5b2NxUXhING8yMmRnQVlBY0x0YkFhQjBpTk94TURiUEZFOXVFNmJBQ3dCbnM3bkJvZGZjbU1rNnVZOVZvNkE3QWFiUkE4SnhMeTA4QUFJalpJWFkwQm9ocGhrQ2VJeE5pQW5tQkFRMmtBWG1qTXFYR01SR0prUU5kOEI0QmRDQXZWZENJeDM0RWVwSVlZMnJwN2lYdUlpZ3NpTVJGaFM0d0NXMi9BR0FYVU9WRWt6L293OU1VODRPZ05nRklPRnRLcmtjak80N3FZQ1MyOUFSN2hDRTVZSktQN1RuZWYxSm5Razlpa055Q0k3dmlBRGV4emFyVHVKblIrcU00Q1J4a1lvZ0c0c1M2elNZZ1hBa29PTHhMcElFUmZEOGdZUm4vY29GR1NnOVc0WGRoWUpMSTJ1Q1lwVXVaNkE1cklrUXQ2TndFbjRkbVNnaG81QSthUzh1c1NkVkY2QXhvVWJvRnBsdVFsOThjb0poSVNwd3picmE2S05WT2dhN1NUc1k0TlQ1a21LS2dFeGJka3JXRmZiOEJKR0dtY1FxaktaamczT29wcHBDWHJqRjcwQmpEWVdtL3p0ZDZzN2NJOWRJSFZ1S2VFNXdWOEthcnd6Y0NBOS9pZGptY1RqTWVwY1pvd0NCakl1Mk5MYndBckVUVUJwOGFXTkE5MjVQT0JWNVVCa0FzMCtCOVlOblVDREtFa2xXMU1UV01BbUNreWhJVjROZjRFTlVhMlZSVXpJcjBCckNKcWkxYStacXZRU08zeFVIOUI4VmEvSkUzSk5rWUdzS2NXdit2UmlRUXpLYWVDUjBWVDFNQUZTWFBDaGdNR0tQbnN3aTdRL2lNc3RBUmhyWEg0K0lUUU1vUWJ4MEpRcDNiNE5CajJBeXZ3Ty9NdFM1ajA5emsxaHIxa0ZibkNSSWxsNWpHNDc4MnlpbzhTYUFJRjFueFJ3SEx3N01JMGE4c0VCb3IzQmVDZUJzdERHNHFGa3JLMEJkNjVrZnVLNWFJOHRMRWFnUldSY3VUZWJWNVlIbkNzam5hNHJwTkMzL0Y3YzRzQnVkVklqbFcwQVZMNm5JdmFMRDlYYUpjcWNLRHIzcHpXNko4dHViTGN3RmRVOWtyL01Vc0lKeTYwbWZtQU9mOEdlaHVERjh6VGU1SmRQSlFpS2w5RS96Yjg3V0hScC94cjBiYlI5d09Oa0JTTFZiNkZCbFdYRXVoamorSncza0hnYWtyb3k2dWlvQlBqVDNQbzNkUjVnZXMvM3c5eEEyYzE3blZVWWV1WFdKcFBVNDZLcndIeWZocnJFeFBPNk5UTURmMXBXRTREY01jcGZ5elljQkp1aUNrRGVEMlROeDk0Ty9Cb2xxaGgyeW5KUS84SDhtY1dDOWpWS2VURDlFSEtXd2R3YTNWRXNoSHNZbzlCMGxMQm5aVUczZnZHRFVuUEszby9STkt5bktGMk5ndXRCZ09xeTFSblErK2RBZVdzUHJSUVh6TWIycVlDbXRaUUUrZG1UeUlQWEZNOG9nWm10OHU0SkNONUdEMXhsZmFpcmw1OStNRVF0WHJlVE40V2lyeEtWMTdWdWExTmxYRmNLTW1OTjJFaXAvYlNEeDJiZm1FNzN2aHdYa3ZxMTdWWDJQOHp5c0xuaUJTRy81bCtlWjhVeW5qQTB0Q3NrOEp4WDU5TW05SlhoM3dQNFVWdnc5czVJTitKTjcyV2s5dXdlY2NpZndHM3YyL1crQWVmNzFzZStadFF4NnI3dmU3eDJQUHJsa1ArOCsveUN6R2k3YUZ6cFBVdEFBQUFBRWxGVGtTdVFtQ0MnO1xuICAgIH1cbiAgfVxuXG5cbiAgLy8gVXBsb2FkXG4gIHVwbG9hZGVkRnVuY3Rpb24oZXZlbnQpIHtcbiAgICB0aGlzLmltYWdlID0gZXZlbnRbMF07XG4gICAgdGhpcy51cGxvYWRlZC5lbWl0KHRoaXMuaW1hZ2UpO1xuICB9XG59XG4iXX0=