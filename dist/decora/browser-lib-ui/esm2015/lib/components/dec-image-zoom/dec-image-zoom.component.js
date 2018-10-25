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
        downloadImage.crossOrigin = 'Anonymous';
        downloadImage.onload = () => {
            this.divImage.nativeElement.style.backgroundImage = 'url(' + this.convertImageToDataURI(downloadImage) + ')';
            this.divImage.nativeElement.style.backgroundRepeat = 'no-repeat';
            this.divImage.nativeElement.parentElement.classList.remove('dec-sysfile-bg-load');
            this.imgExternalLink = this.convertImageToDataURI(downloadImage);
            this.imageSizeRaw = {
                width: downloadImage.width,
                height: downloadImage.height
            };
        };
        downloadImage.src = this.getImageUrl();
    }
    /**
     * @param {?} img
     * @return {?}
     */
    convertImageToDataURI(img) {
        /** @type {?} */
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        /** @type {?} */
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        return canvas.toDataURL('image/png');
    }
    /**
     * @return {?}
     */
    getImageUrl() {
        if (this.image && this.image.fileUrl) {
            return this.image.fileUrl.replace('http', 'https');
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLWltYWdlLXpvb20uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL2RlYy1pbWFnZS16b29tL2RlYy1pbWFnZS16b29tLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBaUIsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFFN0csTUFBTSxNQUFNLEdBQUcsOENBQThDLENBQUM7Ozs7QUFnQzlELE1BQU07SUFrREo7NEJBekJ3QixLQUFLO3dCQUlSLElBQUksWUFBWSxFQUFFO3NCQU85QixLQUFLO3FCQUVOLENBQUM7eUJBRUcsS0FBSzt5QkFDTCxJQUFJO3VCQU1OLENBQUM7dUJBQ0QsQ0FBQzt3QkFRQSxHQUFHLEVBQUU7O1lBQ2QsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNoRCxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQztZQUNwQixJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQzs7WUFDcEIsSUFBSSxTQUFTLEdBQUcsS0FBSyxDQUFDOztZQUN0QixJQUFJLFNBQVMsR0FBRyxLQUFLLENBQUM7WUFFdEIsRUFBRSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFO2dCQUNyQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQzs7b0JBQ2hCLE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FFUjs7b0JBRmhCLE1BQ0UsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FDQzs7b0JBRmhCLE1BRUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFFaEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztvQkFDL0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztvQkFDL0IsU0FBUyxHQUFHLElBQUksQ0FBQztvQkFDakIsTUFBTSxDQUFDO2lCQUNSO2dCQUVELElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQztnQkFDNUIsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDO2dCQUM1QixTQUFTLEdBQUcsSUFBSSxDQUFDO2FBQ2xCLENBQUM7WUFFRixFQUFFLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3JCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksU0FBUyxDQUFDLENBQUMsQ0FBQzs7b0JBQzdCLE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FFUjs7b0JBRmhCLE1BQ0UsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FDQzs7b0JBRmhCLE1BRUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFFaEIsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQzt3QkFDakUsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztxQkFDaEM7b0JBRUQsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQzt3QkFDakUsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztxQkFDaEM7b0JBRUQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNyQixJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztxQkFDbEI7b0JBQ0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNyQixJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztxQkFDbEI7b0JBRUQsRUFBRSxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztvQkFFekUsTUFBTSxDQUFDO2lCQUNSO2FBQ0YsQ0FBQztZQUVGLEVBQUUsQ0FBQyxTQUFTLEdBQUcsR0FBRyxFQUFFO2dCQUNsQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztvQkFDaEIsU0FBUyxHQUFHLEtBQUssQ0FBQztvQkFDbEIsU0FBUyxHQUFHLEtBQUssQ0FBQztvQkFDbEIsTUFBTSxDQUFDO2lCQUNSO2FBQ0YsQ0FBQzs7Ozs7WUFFRixnQkFBZ0IsQ0FBQzs7Z0JBQ2YsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLHFCQUFxQixFQUFFLENBRVo7O2dCQUZ4QixNQUNFLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQ0E7O2dCQUZ4QixNQUVFLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7Z0JBQ3hCLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQzthQUNmO1NBQ0Y7S0F2RWdCOzs7OztJQWhEakIsSUFDSSxLQUFLLENBQUMsQ0FBQztRQUNULEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDTixJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztZQUNoQixJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztTQUMzQjtLQUNGOzs7O0lBRUQsSUFBSSxLQUFLO1FBQ1AsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7S0FDcEI7Ozs7O0lBRUQsSUFDSSxJQUFJLENBQUMsQ0FBQztRQUNSLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDTixJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztTQUNoQjtLQUNGOzs7O0lBRUQsSUFBSSxJQUFJO1FBQ04sTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7S0FDbkI7Ozs7SUE2QkQsZUFBZTtRQUNiLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztLQUNqQjs7OztJQXFFRCxNQUFNO1FBQ0osRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztTQUNyQjtRQUNELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNuQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztZQUN0QixNQUFNLENBQUM7U0FDUjs7UUFDRCxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQztRQUN2QyxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDakMsRUFBRSxDQUFDLEtBQUssQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDaEQsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLEVBQUUsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNyRCxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsRUFBRSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3RELEVBQUUsQ0FBQyxLQUFLLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDekUsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDbkIsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO0tBQ2Q7Ozs7SUFFRCxPQUFPOztRQUNMLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDO1FBQ3ZDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNyQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztZQUN0QixFQUFFLENBQUMsS0FBSyxDQUFDLGNBQWMsR0FBRyxNQUFNLENBQUM7WUFDakMsRUFBRSxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsR0FBRyxTQUFTLENBQUM7WUFDeEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7WUFDakIsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7WUFDakIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDcEIsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7U0FDaEI7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzFCLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQztZQUNqQyxFQUFFLENBQUMsS0FBSyxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztZQUNoRCxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsRUFBRSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3JELElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxFQUFFLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDdEQsRUFBRSxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztZQUN6RSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDYixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztTQUN4QjtLQUNGOzs7O0lBRUQsWUFBWTtRQUNWLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztLQUNoRDs7Ozs7SUFFRCxnQkFBZ0IsQ0FBQyxRQUFRO1FBQ3ZCLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDYixNQUFNLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQztTQUMvQjtRQUNELFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDZCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDakMsRUFBRSxHQUFHLENBQUMsQ0FBQztLQUNUOzs7O0lBRUQsa0JBQWtCO1FBQ2hCLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxjQUFjLEdBQUcsTUFBTSxDQUFDO1FBQzFELElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsR0FBRyxTQUFTLENBQUM7UUFDakUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLGVBQWUsR0FBRyxFQUFFLENBQUM7UUFDdkQsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDcEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUMsQ0FBQzs7UUFDL0UsTUFBTSxhQUFhLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBQztRQUNsQyxhQUFhLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztRQUV4QyxhQUFhLENBQUMsTUFBTSxHQUFHLEdBQUcsRUFBRTtZQUMxQixJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsZUFBZSxHQUFHLE1BQU0sR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUMsYUFBYSxDQUFDLEdBQUcsR0FBRyxDQUFDO1lBQzdHLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsR0FBRyxXQUFXLENBQUM7WUFDakUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMscUJBQXFCLENBQUMsQ0FBQztZQUNsRixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUNqRSxJQUFJLENBQUMsWUFBWSxHQUFHO2dCQUNsQixLQUFLLEVBQUUsYUFBYSxDQUFDLEtBQUs7Z0JBQzFCLE1BQU0sRUFBRSxhQUFhLENBQUMsTUFBTTthQUM3QixDQUFDO1NBQ0gsQ0FBQztRQUVGLGFBQWEsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0tBQ3hDOzs7OztJQUVPLHFCQUFxQixDQUFDLEdBQUc7O1FBQy9CLE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDaEQsTUFBTSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDO1FBQ3pCLE1BQU0sQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQzs7UUFFM0IsTUFBTSxHQUFHLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNwQyxHQUFHLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFFekIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUM7Ozs7O0lBRy9CLFdBQVc7UUFDakIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDckMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7U0FDcEQ7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7WUFDakQsTUFBTSxDQUFDLEdBQUcsTUFBTSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFLENBQUM7U0FDL0M7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLE1BQU0sQ0FBQyxnNUZBQWc1RixDQUFDO1NBQ3o1Rjs7Ozs7O0lBS0gsZ0JBQWdCLENBQUMsS0FBSztRQUNwQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN0QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDaEM7OztZQTVQRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGdCQUFnQjtnQkFDMUIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQXVCWDtnQkFDQyxNQUFNLEVBQUUsQ0FBQyxrakJBQWtqQixDQUFDO2FBQzdqQjs7Ozs7b0JBR0UsS0FBSzttQkFZTCxLQUFLOzJCQVdMLEtBQUs7dUJBRUwsU0FBUyxTQUFDLGdCQUFnQjt1QkFFMUIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIFZpZXdDaGlsZCwgRWxlbWVudFJlZiwgQWZ0ZXJWaWV3SW5pdCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuY29uc3QgUzNIb3N0ID0gJ2h0dHA6Ly9zMy5hbWF6b25hd3MuY29tL2RlY29yYS1wbGF0Zm9ybS0xLW52JztcblxuZXhwb3J0IHR5cGUgWm9vbU1vZGUgPSAnaG92ZXInIHwgJ2NsaWNrJyB8ICd0b2dnbGUnIHwgJ2hvdmVyLWZyZWV6ZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1pbWFnZS16b29tJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwiaW1hZ2VoaWdobGlnaHQtY29udGFpbmVyXCIgZnhMYXlvdXQ9XCJjb2x1bW5cIiBmeExheW91dEFsaWduPVwic3BhY2UtYmV0d2VlbiBzdGFydFwiIGZ4TGF5b3V0R2FwPVwiZ2FwcHhcIj5cbiAgPGRpdiAjaW1hZ2VDb250YWluZXIgY2xhc3M9XCJpbWFnZWhpZ2hsaWdodC1jb250YWluZXJcIj5cbiAgPC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJjb250YWluZXItaW1nLWxpbmtcIj5cbiAgICA8ZGl2ICpuZ0lmPVwicGVybWl0VXBsb2FkXCIgY2xhc3M9XCJ1cGxvYWQtYnV0dG9uXCI+XG4gICAgICA8ZGVjLXVwbG9hZCBbZW5kcG9pbnRdPVwiJy9maWxlcy91cGxvYWQnXCIgKHVwbG9hZGVkKT1cInVwbG9hZGVkRnVuY3Rpb24oJGV2ZW50KVwiPlxuICAgICAgICA8bWF0LWljb24gY2xhc3M9XCJ1cGxvYWQtaWNvbi1zaXplXCI+XG4gICAgICAgICAgICBhZGRfYV9waG90b1xuICAgICAgICA8L21hdC1pY29uPlxuICAgICAgPC9kZWMtdXBsb2FkPlxuICAgIDwvZGl2PlxuXG4gICAgPHNwYW4gW25nQ2xhc3NdPVwieyd6b29tLWluLWFjdGl2ZSc6IGZpbmFsWm9vbSwgJ3pvb20taW4nOiAhZmluYWxab29tfVwiIChjbGljayk9XCJ6b29tSW4oKVwiPlxuICAgICAgPG1hdC1pY29uIGNsYXNzPVwiaWNvbnMtem9vbVwiPmFkZF9jaXJjbGVfb3V0bGluZTwvbWF0LWljb24+XG4gICAgPC9zcGFuPlxuICAgIDxzcGFuIFtuZ0NsYXNzXT1cInsnem9vbS1vdXQtYWN0aXZlJzogIWlzWm9vbSwgJ3pvb20tb3V0JzogaXNab29tfVwiIChjbGljayk9XCJ6b29tT3V0KClcIj5cbiAgICAgIDxtYXQtaWNvbiBjbGFzcz1cImljb25zLXpvb21cIj5yZW1vdmVfY2lyY2xlX291dGxpbmU8L21hdC1pY29uPlxuICAgIDwvc3Bhbj5cbiAgICA8c3BhbiAqbmdJZj1cImltZ0V4dGVybmFsTGlua1wiIGNsYXNzPVwiaW1nLWxpbmtcIj5cbiAgICAgIDxhIGhyZWY9XCJ7eyBpbWdFeHRlcm5hbExpbmsgfX1cIiB0YXJnZXQ9XCJfYmxhbmtcIj57eyAnbGFiZWwuaW1hZ2UtbGluaycgfCB0cmFuc2xhdGUgfX08L2E+XG4gICAgPC9zcGFuPlxuICA8L2Rpdj5cbjwvZGl2PlxuYCxcbiAgc3R5bGVzOiBbYC5pbWFnZWhpZ2hsaWdodC1jb250YWluZXJ7d2lkdGg6MTAwJTtoZWlnaHQ6MTAwJX0uY29udGFpbmVyLWltZy1saW5re3Bvc2l0aW9uOnJlbGF0aXZlO3dpZHRoOjEwMCU7aGVpZ2h0OjIwcHh9Lnpvb20taW57Y3Vyc29yOnBvaW50ZXI7Y29sb3I6cmVkO3Bvc2l0aW9uOmFic29sdXRlO3JpZ2h0OjB9Lnpvb20tb3V0e2N1cnNvcjpwb2ludGVyO2NvbG9yOnJlZDtwb3NpdGlvbjphYnNvbHV0ZTtyaWdodDoyMHB4fS56b29tLWluLWFjdGl2ZXtjb2xvcjpncmF5O3Bvc2l0aW9uOmFic29sdXRlO3JpZ2h0OjB9Lnpvb20tb3V0LWFjdGl2ZXtjb2xvcjpncmF5O3Bvc2l0aW9uOmFic29sdXRlO3JpZ2h0OjIwcHh9Lmljb25zLXpvb217Zm9udC1zaXplOjE4cHh9LmltZy1saW5re3Bvc2l0aW9uOmFic29sdXRlO3JpZ2h0OjUwcHg7Y29sb3I6Z3JheX0uaW1nLWxpbmsgYXtmb250LXNpemU6MTBweDtwYWRkaW5nLXRvcDoycHh9LnVwbG9hZC1idXR0b257d2lkdGg6MjUwcHg7ZGlzcGxheTppbmxpbmUtYmxvY2t9LnVwbG9hZC1pY29uLXNpemV7Zm9udC1zaXplOjIwcHg7Y3Vyc29yOnBvaW50ZXJ9YF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjSW1hZ2Vab29tQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XG5cbiAgQElucHV0KClcbiAgc2V0IGltYWdlKHYpIHtcbiAgICBpZiAodikge1xuICAgICAgdGhpcy5faW1hZ2UgPSB2O1xuICAgICAgdGhpcy5sb2FkSGlnaExpZ2h0SW1hZ2UoKTtcbiAgICB9XG4gIH1cblxuICBnZXQgaW1hZ2UoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2ltYWdlO1xuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IHNpemUodikge1xuICAgIGlmICh2KSB7XG4gICAgICB0aGlzLl9zaXplID0gdjtcbiAgICB9XG4gIH1cblxuICBnZXQgc2l6ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fc2l6ZTtcbiAgfVxuXG4gIEBJbnB1dCgpIHBlcm1pdFVwbG9hZCA9IGZhbHNlO1xuXG4gIEBWaWV3Q2hpbGQoJ2ltYWdlQ29udGFpbmVyJykgZGl2SW1hZ2U6IEVsZW1lbnRSZWY7XG5cbiAgQE91dHB1dCgpIHVwbG9hZGVkID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIHByaXZhdGUgX2ltYWdlOiBhbnk7XG4gIHByaXZhdGUgX3NpemU6IGFueTtcblxuICBpbWdFeHRlcm5hbExpbms6IHN0cmluZztcblxuICBpc1pvb20gPSBmYWxzZTtcbiAgaW1hZ2VTaXplUmF3OiBhbnk7XG4gIHN0ZXBzID0gMTtcbiAgc3RlcHNEaWZmOiBhbnk7XG4gIGZpbmFsWm9vbSA9IGZhbHNlO1xuICBpbWFnZVNpemUgPSAxMDI0O1xuXG4gIGRlbHRhWDogbnVtYmVyO1xuICBkZWx0YVk6IG51bWJlcjtcbiAgbGFzdE1vdXNlWDogbnVtYmVyO1xuICBsYXN0TW91c2VZOiBudW1iZXI7XG4gIG9mZnNldFggPSAwO1xuICBvZmZzZXRZID0gMDtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmluaXRab29tKCk7XG4gIH1cblxuICBpbml0Wm9vbSA9ICgpID0+IHtcbiAgICBjb25zdCBlbCA9IHRoaXMuZ2V0TmF0aXZlRWxlbWVudCh0aGlzLmRpdkltYWdlKTtcbiAgICB0aGlzLmxhc3RNb3VzZVggPSAwO1xuICAgIHRoaXMubGFzdE1vdXNlWSA9IDA7XG4gICAgbGV0IG1vdXNlZG93biA9IGZhbHNlO1xuICAgIGxldCBtb3VzZW1vdmUgPSBmYWxzZTtcblxuICAgIGVsLm9ubW91c2Vkb3duID0gKGUpID0+IHtcbiAgICAgIGlmICh0aGlzLmlzWm9vbSkge1xuICAgICAgICBjb25zdCBjb29yZHMgPSBnZXRQb3MoZSksXG4gICAgICAgICAgeCA9IGNvb3Jkc1swXSxcbiAgICAgICAgICB5ID0gY29vcmRzWzFdO1xuXG4gICAgICAgIHRoaXMuZGVsdGFYID0geCAtIHRoaXMub2Zmc2V0WDtcbiAgICAgICAgdGhpcy5kZWx0YVkgPSB5IC0gdGhpcy5vZmZzZXRZO1xuICAgICAgICBtb3VzZWRvd24gPSB0cnVlO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHRoaXMubGFzdE1vdXNlWCA9IGUub2Zmc2V0WDtcbiAgICAgIHRoaXMubGFzdE1vdXNlWSA9IGUub2Zmc2V0WTtcbiAgICAgIG1vdXNlZG93biA9IHRydWU7XG4gICAgfTtcblxuICAgIGVsLm9ubW91c2Vtb3ZlID0gKGUpID0+IHtcbiAgICAgIGlmICh0aGlzLmlzWm9vbSAmJiBtb3VzZWRvd24pIHtcbiAgICAgICAgY29uc3QgY29vcmRzID0gZ2V0UG9zKGUpLFxuICAgICAgICAgIHggPSBjb29yZHNbMF0sXG4gICAgICAgICAgeSA9IGNvb3Jkc1sxXTtcblxuICAgICAgICBpZiAoKCh4IC0gdGhpcy5kZWx0YVgpICogKC0xKSkgKyBlbC5vZmZzZXRXaWR0aCA8IHRoaXMuaW1hZ2VTaXplKSB7XG4gICAgICAgICAgdGhpcy5vZmZzZXRYID0geCAtIHRoaXMuZGVsdGFYO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCgoeSAtIHRoaXMuZGVsdGFZKSAqICgtMSkpICsgZWwub2Zmc2V0V2lkdGggPCB0aGlzLmltYWdlU2l6ZSkge1xuICAgICAgICAgIHRoaXMub2Zmc2V0WSA9IHkgLSB0aGlzLmRlbHRhWTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm9mZnNldFkgPiAwKSB7XG4gICAgICAgICAgdGhpcy5vZmZzZXRZID0gMDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5vZmZzZXRYID4gMCkge1xuICAgICAgICAgIHRoaXMub2Zmc2V0WCA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICBlbC5zdHlsZS5iYWNrZ3JvdW5kUG9zaXRpb24gPSB0aGlzLm9mZnNldFggKyAncHggJyArIHRoaXMub2Zmc2V0WSArICdweCc7XG5cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBlbC5vbm1vdXNldXAgPSAoKSA9PiB7XG4gICAgICBpZiAodGhpcy5pc1pvb20pIHtcbiAgICAgICAgbW91c2Vkb3duID0gZmFsc2U7XG4gICAgICAgIG1vdXNlbW92ZSA9IGZhbHNlO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGdldFBvcyhlKSB7XG4gICAgICBjb25zdCByID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXG4gICAgICAgIHggPSBlLmNsaWVudFggLSByLmxlZnQsXG4gICAgICAgIHkgPSBlLmNsaWVudFkgLSByLnRvcDtcbiAgICAgIHJldHVybiBbeCwgeV07XG4gICAgfVxuICB9XG5cbiAgem9vbUluKCkge1xuICAgIGlmICh0aGlzLnN0ZXBzID09PSAxKSB7XG4gICAgICB0aGlzLmdldFN0ZXBzRGlmZigpO1xuICAgIH1cbiAgICBpZiAodGhpcy5zdGVwcyA+IDQpIHtcbiAgICAgIHRoaXMuZmluYWxab29tID0gdHJ1ZTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgZWwgPSB0aGlzLmRpdkltYWdlLm5hdGl2ZUVsZW1lbnQ7XG4gICAgdGhpcy5pbWFnZVNpemUgKz0gdGhpcy5zdGVwc0RpZmY7XG4gICAgZWwuc3R5bGUuYmFja2dyb3VuZFNpemUgPSB0aGlzLmltYWdlU2l6ZSArICdweCc7XG4gICAgdGhpcy5vZmZzZXRYID0gKGVsLm9mZnNldFdpZHRoIC0gdGhpcy5pbWFnZVNpemUpIC8gMjtcbiAgICB0aGlzLm9mZnNldFkgPSAoZWwub2Zmc2V0SGVpZ2h0IC0gdGhpcy5pbWFnZVNpemUpIC8gMjtcbiAgICBlbC5zdHlsZS5iYWNrZ3JvdW5kUG9zaXRpb24gPSB0aGlzLm9mZnNldFggKyAncHggJyArIHRoaXMub2Zmc2V0WSArICdweCc7XG4gICAgdGhpcy5pc1pvb20gPSB0cnVlO1xuICAgIHRoaXMuc3RlcHMrKztcbiAgfVxuXG4gIHpvb21PdXQoKSB7XG4gICAgY29uc3QgZWwgPSB0aGlzLmRpdkltYWdlLm5hdGl2ZUVsZW1lbnQ7XG4gICAgaWYgKHRoaXMuc3RlcHMgPT09IDIpIHtcbiAgICAgIHRoaXMuaW1hZ2VTaXplID0gMTAyNDtcbiAgICAgIGVsLnN0eWxlLmJhY2tncm91bmRTaXplID0gJzEwMCUnO1xuICAgICAgZWwuc3R5bGUuYmFja2dyb3VuZFBvc2l0aW9uID0gJzBweCAwcHgnO1xuICAgICAgdGhpcy5vZmZzZXRYID0gMDtcbiAgICAgIHRoaXMub2Zmc2V0WSA9IDA7XG4gICAgICB0aGlzLmlzWm9vbSA9IGZhbHNlO1xuICAgICAgdGhpcy5zdGVwcyA9IDE7XG4gICAgfSBlbHNlIGlmICh0aGlzLnN0ZXBzID4gMSkge1xuICAgICAgdGhpcy5pbWFnZVNpemUgLT0gdGhpcy5zdGVwc0RpZmY7XG4gICAgICBlbC5zdHlsZS5iYWNrZ3JvdW5kU2l6ZSA9IHRoaXMuaW1hZ2VTaXplICsgJ3B4JztcbiAgICAgIHRoaXMub2Zmc2V0WCA9IChlbC5vZmZzZXRXaWR0aCAtIHRoaXMuaW1hZ2VTaXplKSAvIDI7XG4gICAgICB0aGlzLm9mZnNldFkgPSAoZWwub2Zmc2V0SGVpZ2h0IC0gdGhpcy5pbWFnZVNpemUpIC8gMjtcbiAgICAgIGVsLnN0eWxlLmJhY2tncm91bmRQb3NpdGlvbiA9IHRoaXMub2Zmc2V0WCArICdweCAnICsgdGhpcy5vZmZzZXRZICsgJ3B4JztcbiAgICAgIHRoaXMuc3RlcHMtLTtcbiAgICAgIHRoaXMuZmluYWxab29tID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgZ2V0U3RlcHNEaWZmKCkge1xuICAgIHRoaXMuc3RlcHNEaWZmID0gKHRoaXMuaW1hZ2VTaXplUmF3LndpZHRoIC8gNCk7XG4gIH1cblxuICBnZXROYXRpdmVFbGVtZW50KGRpdkltYWdlKSB7XG4gICAgaWYgKGRpdkltYWdlKSB7XG4gICAgICByZXR1cm4gZGl2SW1hZ2UubmF0aXZlRWxlbWVudDtcbiAgICB9XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLmdldE5hdGl2ZUVsZW1lbnQoZGl2SW1hZ2UpO1xuICAgIH0sIDQwMCk7XG4gIH1cblxuICBsb2FkSGlnaExpZ2h0SW1hZ2UoKSB7XG4gICAgdGhpcy5kaXZJbWFnZS5uYXRpdmVFbGVtZW50LnN0eWxlLmJhY2tncm91bmRTaXplID0gJzEwMCUnO1xuICAgIHRoaXMuZGl2SW1hZ2UubmF0aXZlRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kUG9zaXRpb24gPSAnMHB4IDBweCc7XG4gICAgdGhpcy5kaXZJbWFnZS5uYXRpdmVFbGVtZW50LnN0eWxlLmJhY2tncm91bmRJbWFnZSA9ICcnO1xuICAgIHRoaXMuaXNab29tID0gZmFsc2U7XG4gICAgdGhpcy5kaXZJbWFnZS5uYXRpdmVFbGVtZW50LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnZGVjLXN5c2ZpbGUtYmctbG9hZCcpO1xuICAgIGNvbnN0IGRvd25sb2FkSW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgICBkb3dubG9hZEltYWdlLmNyb3NzT3JpZ2luID0gJ0Fub255bW91cyc7XG5cbiAgICBkb3dubG9hZEltYWdlLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgIHRoaXMuZGl2SW1hZ2UubmF0aXZlRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSAndXJsKCcgKyB0aGlzLmNvbnZlcnRJbWFnZVRvRGF0YVVSSShkb3dubG9hZEltYWdlKSArICcpJztcbiAgICAgIHRoaXMuZGl2SW1hZ2UubmF0aXZlRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kUmVwZWF0ID0gJ25vLXJlcGVhdCc7XG4gICAgICB0aGlzLmRpdkltYWdlLm5hdGl2ZUVsZW1lbnQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdkZWMtc3lzZmlsZS1iZy1sb2FkJyk7XG4gICAgICB0aGlzLmltZ0V4dGVybmFsTGluayA9IHRoaXMuY29udmVydEltYWdlVG9EYXRhVVJJKGRvd25sb2FkSW1hZ2UpO1xuICAgICAgdGhpcy5pbWFnZVNpemVSYXcgPSB7XG4gICAgICAgIHdpZHRoOiBkb3dubG9hZEltYWdlLndpZHRoLFxuICAgICAgICBoZWlnaHQ6IGRvd25sb2FkSW1hZ2UuaGVpZ2h0XG4gICAgICB9O1xuICAgIH07XG5cbiAgICBkb3dubG9hZEltYWdlLnNyYyA9IHRoaXMuZ2V0SW1hZ2VVcmwoKTtcbiAgfVxuXG4gIHByaXZhdGUgY29udmVydEltYWdlVG9EYXRhVVJJKGltZykge1xuICAgIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgIGNhbnZhcy53aWR0aCA9IGltZy53aWR0aDtcbiAgICBjYW52YXMuaGVpZ2h0ID0gaW1nLmhlaWdodDtcblxuICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgIGN0eC5kcmF3SW1hZ2UoaW1nLCAwLCAwKTtcblxuICAgIHJldHVybiBjYW52YXMudG9EYXRhVVJMKCdpbWFnZS9wbmcnKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0SW1hZ2VVcmwoKSB7XG4gICAgaWYgKHRoaXMuaW1hZ2UgJiYgdGhpcy5pbWFnZS5maWxlVXJsKSB7XG4gICAgICByZXR1cm4gdGhpcy5pbWFnZS5maWxlVXJsLnJlcGxhY2UoJ2h0dHAnLCAnaHR0cHMnKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuaW1hZ2UgJiYgdGhpcy5pbWFnZS5maWxlQmFzZVBhdGgpIHtcbiAgICAgIHJldHVybiBgJHtTM0hvc3R9LyR7dGhpcy5pbWFnZS5maWxlQmFzZVBhdGh9YDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuICdkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUlBQUFBQ0FDQU1BQUFEMDRKSDVBQUFBc1ZCTVZFVUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBazJ3TFNBQUFBT25SU1RsTUFBNFVVQlFnTUVQU0tLK2phR3hjZjk1MHljazg2TmkrbWdiOVhKaU95UlBEczNxS1daMHJLclh4Mys4NWpRVDI0WGVQWDA4VnRhcEdhRUM1Uk53QUFCMTVKUkVGVWVOcnRtMmR6MnpBTWhrbHIyYklsNzVGNDFYRzg0cGxsMS96L1A2eVhWallFa2lLcGtkNzFycytubmlNZEllSUZDRUFxK2M5Ly9wTVYyd3Y4M21HNW5CNTZmdURhNUM5Q2crbm1WR2FZSDZlWGFVREo5eE1PSnl5WnlUQWszMGx3cmpJZHM4MllmQS91QlZiWDJIRHhTT0dNNXl3TmszNnhldWg5c0xTOEg0c3pZYlJpU1pUTExKRmFxeURkUzJULzlqeHNoVkh3VTl1eHhzZjlYR0xLWTFoQTBMOHdqby9GeUphcjFHOExNbjJ3ODJydmlTRjJIWmVvOERvN2hxajJjejMrQTg1Mlo4c2tXV3l3TTByWnhlZ2k4YTBPcHR0cEw5K1FHQzJTRGI4YzMvdFdxZ2ZwMWhpd1BaQXNMT0lQa1Q2b2wzSHoyeG5jVUdMQUpZdVc3YmlBbmtsYXJyRm96dXJESU9hSE5VMG4velhjdXM4UlJhWFlZNlN5QUpMZmJKenZFR2xrc3FCNXYrdms1RTNrNElZSk1RWFUwOHgvb2puZ3pXdnErSHNnUmZBTTBVaE1hRUgwa1dLb3NCc21HY205SjVBWFVoVGcwNEJvdWVmL0NnRUs4MExOTVRhMlNZcGtZcG9TKy9mRGh4YmJSOTNMaEpiNnV1cXQxbk9MTHVvYnQ4eG1Hem5BSjBycSs1L05pUGtYemViUGZWMXpRTjhMRk5YcFlSYUExaWVUOFdscDFLV1BoTWRiMmxaWDZWc21aenRXdXZmalpxZytCVlVjblRmbGxCMmwzN1E2ckVINTJhR2FtSmJ6Yk9TRW1sb20wVVg5cEoxa0twUVNwN2NZNnhJcDd3eHhDdVFLWUFvMDBUTlZib0V2YnFnc0dSeVppaWtCRkU3dUs3SWxvaTF1NllHcFdHb0twTnZ1eXNSOTB4L1dkYWRJQThETlZuSVowZzNYeWliN2tNTUZvSUl6RWFoR0cyQVRNbDdoSm51c05jQzQ0cUJSRXFtS1dRSlZUVjNjWnpkamF0d3pGUmNyVGhCNGZENXBSeGNLSjhkdERCQkdsZzRiQ1dwMEhsZ2FmcHl4amtNb3Q2UWUyRUhDMlNTcE1WeW5NNkV1aThRWndWalIxWEhSZTNndzl0U0RsTEZqS2RpaVFjMWVIZ2VkNkdkWE5aMTZoR2NCa1JoUWsvbUFpKzlCOUpTOGFBK2NHcjM3WDE0YnpCU2MrNStpYnBVZ3RtTG5JRmZqeHNtZ3hxWkU3bHM4VzFLY0pmWUxWdU1ydmQ4MVlHWlVaWFd2Sjh2UkRsbzVRWTF2b0ViTGM4UFJzakpqR2xDekdQM1drK1RoR1k3TUE2U3BUMXo5OFdsa1BEQTNnRVNuelFKcFVOYU1NTFlhd3g3aGdlSGNJNWhncFRjQUx6WWdNZDVrdzVEZlYzbWd4akpXbzgwbldWTUQ5cEVuNDFLWHVZVkVMVHJJSHVmR3hwRHlKMTBpMHBLR2lyb0lKQWF3QnNqZXZXSnhIN0FKU3pNRDZtTFNzNlI1RUJZNmdxc2ZXWnlWejU5b2NxUXhING8yMmRnQVlBY0x0YkFhQjBpTk94TURiUEZFOXVFNmJBQ3dCbnM3bkJvZGZjbU1rNnVZOVZvNkE3QWFiUkE4SnhMeTA4QUFJalpJWFkwQm9ocGhrQ2VJeE5pQW5tQkFRMmtBWG1qTXFYR01SR0prUU5kOEI0QmRDQXZWZENJeDM0RWVwSVlZMnJwN2lYdUlpZ3NpTVJGaFM0d0NXMi9BR0FYVU9WRWt6L293OU1VODRPZ05nRklPRnRLcmtjak80N3FZQ1MyOUFSN2hDRTVZSktQN1RuZWYxSm5Razlpa055Q0k3dmlBRGV4emFyVHVKblIrcU00Q1J4a1lvZ0c0c1M2elNZZ1hBa29PTHhMcElFUmZEOGdZUm4vY29GR1NnOVc0WGRoWUpMSTJ1Q1lwVXVaNkE1cklrUXQ2TndFbjRkbVNnaG81QSthUzh1c1NkVkY2QXhvVWJvRnBsdVFsOThjb0poSVNwd3picmE2S05WT2dhN1NUc1k0TlQ1a21LS2dFeGJka3JXRmZiOEJKR0dtY1FxaktaamczT29wcHBDWHJqRjcwQmpEWVdtL3p0ZDZzN2NJOWRJSFZ1S2VFNXdWOEthcnd6Y0NBOS9pZGptY1RqTWVwY1pvd0NCakl1Mk5MYndBckVUVUJwOGFXTkE5MjVQT0JWNVVCa0FzMCtCOVlOblVDREtFa2xXMU1UV01BbUNreWhJVjROZjRFTlVhMlZSVXpJcjBCckNKcWkxYStacXZRU08zeFVIOUI4VmEvSkUzSk5rWUdzS2NXdit2UmlRUXpLYWVDUjBWVDFNQUZTWFBDaGdNR0tQbnN3aTdRL2lNc3RBUmhyWEg0K0lUUU1vUWJ4MEpRcDNiNE5CajJBeXZ3Ty9NdFM1ajA5emsxaHIxa0ZibkNSSWxsNWpHNDc4MnlpbzhTYUFJRjFueFJ3SEx3N01JMGE4c0VCb3IzQmVDZUJzdERHNHFGa3JLMEJkNjVrZnVLNWFJOHRMRWFnUldSY3VUZWJWNVlIbkNzam5hNHJwTkMzL0Y3YzRzQnVkVklqbFcwQVZMNm5JdmFMRDlYYUpjcWNLRHIzcHpXNko4dHViTGN3RmRVOWtyL01Vc0lKeTYwbWZtQU9mOEdlaHVERjh6VGU1SmRQSlFpS2w5RS96Yjg3V0hScC94cjBiYlI5d09Oa0JTTFZiNkZCbFdYRXVoamorSncza0hnYWtyb3k2dWlvQlBqVDNQbzNkUjVnZXMvM3c5eEEyYzE3blZVWWV1WFdKcFBVNDZLcndIeWZocnJFeFBPNk5UTURmMXBXRTREY01jcGZ5elljQkp1aUNrRGVEMlROeDk0Ty9Cb2xxaGgyeW5KUS84SDhtY1dDOWpWS2VURDlFSEtXd2R3YTNWRXNoSHNZbzlCMGxMQm5aVUczZnZHRFVuUEszby9STkt5bktGMk5ndXRCZ09xeTFSblErK2RBZVdzUHJSUVh6TWIycVlDbXRaUUUrZG1UeUlQWEZNOG9nWm10OHU0SkNONUdEMXhsZmFpcmw1OStNRVF0WHJlVE40V2lyeEtWMTdWdWExTmxYRmNLTW1OTjJFaXAvYlNEeDJiZm1FNzN2aHdYa3ZxMTdWWDJQOHp5c0xuaUJTRy81bCtlWjhVeW5qQTB0Q3NrOEp4WDU5TW05SlhoM3dQNFVWdnc5czVJTitKTjcyV2s5dXdlY2NpZndHM3YyL1crQWVmNzFzZStadFF4NnI3dmU3eDJQUHJsa1ArOCsveUN6R2k3YUZ6cFBVdEFBQUFBRWxGVGtTdVFtQ0MnO1xuICAgIH1cbiAgfVxuXG5cbiAgLy8gVXBsb2FkXG4gIHVwbG9hZGVkRnVuY3Rpb24oZXZlbnQpIHtcbiAgICB0aGlzLmltYWdlID0gZXZlbnRbMF07XG4gICAgdGhpcy51cGxvYWRlZC5lbWl0KHRoaXMuaW1hZ2UpO1xuICB9XG59XG4iXX0=