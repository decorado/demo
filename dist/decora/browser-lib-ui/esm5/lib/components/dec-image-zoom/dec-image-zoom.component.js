/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
/** @type {?} */
var S3Host = 'http://s3.amazonaws.com/decora-platform-1-nv';
/** @typedef {?} */
var ZoomMode;
export { ZoomMode };
var DecImageZoomComponent = /** @class */ (function () {
    function DecImageZoomComponent() {
        var _this = this;
        this.permitUpload = false;
        this.uploaded = new EventEmitter();
        this.isZoom = false;
        this.steps = 1;
        this.finalZoom = false;
        this.imageSize = 1024;
        this.offsetX = 0;
        this.offsetY = 0;
        this.initZoom = function () {
            /** @type {?} */
            var el = _this.getNativeElement(_this.divImage);
            _this.lastMouseX = 0;
            _this.lastMouseY = 0;
            /** @type {?} */
            var mousedown = false;
            /** @type {?} */
            var mousemove = false;
            el.onmousedown = function (e) {
                if (_this.isZoom) {
                    /** @type {?} */
                    var coords = getPos(e);
                    /** @type {?} */
                    var x = coords[0];
                    /** @type {?} */
                    var y = coords[1];
                    _this.deltaX = x - _this.offsetX;
                    _this.deltaY = y - _this.offsetY;
                    mousedown = true;
                    return;
                }
                _this.lastMouseX = e.offsetX;
                _this.lastMouseY = e.offsetY;
                mousedown = true;
            };
            el.onmousemove = function (e) {
                if (_this.isZoom && mousedown) {
                    /** @type {?} */
                    var coords = getPos(e);
                    /** @type {?} */
                    var x = coords[0];
                    /** @type {?} */
                    var y = coords[1];
                    if (((x - _this.deltaX) * (-1)) + el.offsetWidth < _this.imageSize) {
                        _this.offsetX = x - _this.deltaX;
                    }
                    if (((y - _this.deltaY) * (-1)) + el.offsetWidth < _this.imageSize) {
                        _this.offsetY = y - _this.deltaY;
                    }
                    if (_this.offsetY > 0) {
                        _this.offsetY = 0;
                    }
                    if (_this.offsetX > 0) {
                        _this.offsetX = 0;
                    }
                    el.style.backgroundPosition = _this.offsetX + 'px ' + _this.offsetY + 'px';
                    return;
                }
            };
            el.onmouseup = function () {
                if (_this.isZoom) {
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
                var r = el.getBoundingClientRect();
                /** @type {?} */
                var x = e.clientX - r.left;
                /** @type {?} */
                var y = e.clientY - r.top;
                return [x, y];
            }
        };
    }
    Object.defineProperty(DecImageZoomComponent.prototype, "image", {
        get: /**
         * @return {?}
         */
        function () {
            return this._image;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            if (v) {
                this._image = v;
                this.loadHighLightImage();
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
            return this._size;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            if (v) {
                this._size = v;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    DecImageZoomComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        this.initZoom();
    };
    /**
     * @return {?}
     */
    DecImageZoomComponent.prototype.zoomIn = /**
     * @return {?}
     */
    function () {
        if (this.steps === 1) {
            this.getStepsDiff();
        }
        if (this.steps > 4) {
            this.finalZoom = true;
            return;
        }
        /** @type {?} */
        var el = this.divImage.nativeElement;
        this.imageSize += this.stepsDiff;
        el.style.backgroundSize = this.imageSize + 'px';
        this.offsetX = (el.offsetWidth - this.imageSize) / 2;
        this.offsetY = (el.offsetHeight - this.imageSize) / 2;
        el.style.backgroundPosition = this.offsetX + 'px ' + this.offsetY + 'px';
        this.isZoom = true;
        this.steps++;
    };
    /**
     * @return {?}
     */
    DecImageZoomComponent.prototype.zoomOut = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var el = this.divImage.nativeElement;
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
    };
    /**
     * @return {?}
     */
    DecImageZoomComponent.prototype.getStepsDiff = /**
     * @return {?}
     */
    function () {
        this.stepsDiff = (this.imageSizeRaw.width / 4);
    };
    /**
     * @param {?} divImage
     * @return {?}
     */
    DecImageZoomComponent.prototype.getNativeElement = /**
     * @param {?} divImage
     * @return {?}
     */
    function (divImage) {
        var _this = this;
        if (divImage) {
            return divImage.nativeElement;
        }
        setTimeout(function () {
            _this.getNativeElement(divImage);
        }, 400);
    };
    /**
     * @return {?}
     */
    DecImageZoomComponent.prototype.loadHighLightImage = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.divImage.nativeElement.style.backgroundSize = '100%';
        this.divImage.nativeElement.style.backgroundPosition = '0px 0px';
        this.divImage.nativeElement.style.backgroundImage = '';
        this.isZoom = false;
        this.divImage.nativeElement.parentElement.classList.add('dec-sysfile-bg-load');
        /** @type {?} */
        var downloadImage = new Image();
        downloadImage.crossOrigin = 'Anonymous';
        downloadImage.onload = function () {
            _this.divImage.nativeElement.style.backgroundImage = 'url(' + _this.convertImageToDataURI(downloadImage) + ')';
            _this.divImage.nativeElement.style.backgroundRepeat = 'no-repeat';
            _this.divImage.nativeElement.parentElement.classList.remove('dec-sysfile-bg-load');
            _this.imgExternalLink = _this.convertImageToDataURI(downloadImage);
            _this.imageSizeRaw = {
                width: downloadImage.width,
                height: downloadImage.height
            };
        };
        downloadImage.src = this.getImageUrl();
    };
    /**
     * @param {?} img
     * @return {?}
     */
    DecImageZoomComponent.prototype.convertImageToDataURI = /**
     * @param {?} img
     * @return {?}
     */
    function (img) {
        /** @type {?} */
        var canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        /** @type {?} */
        var ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        return canvas.toDataURL('image/png');
    };
    /**
     * @return {?}
     */
    DecImageZoomComponent.prototype.getImageUrl = /**
     * @return {?}
     */
    function () {
        if (this.image && this.image.fileUrl) {
            return this.image.fileUrl.replace('http', 'https');
        }
        else if (this.image && this.image.fileBasePath) {
            return S3Host + "/" + this.image.fileBasePath;
        }
        else {
            return 'data:image/png;base64,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';
        }
    };
    // Upload
    /**
     * @param {?} event
     * @return {?}
     */
    DecImageZoomComponent.prototype.uploadedFunction = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.image = event[0];
        this.uploaded.emit(this.image);
    };
    DecImageZoomComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dec-image-zoom',
                    template: "<div class=\"imagehighlight-container\" fxLayout=\"column\" fxLayoutAlign=\"space-between start\" fxLayoutGap=\"gappx\">\n  <div #imageContainer class=\"imagehighlight-container\">\n  </div>\n  <div class=\"container-img-link\">\n    <div *ngIf=\"permitUpload\" class=\"upload-button\">\n      <dec-upload [endpoint]=\"'/files/upload'\" (uploaded)=\"uploadedFunction($event)\">\n        <mat-icon class=\"upload-icon-size\">\n            add_a_photo\n        </mat-icon>\n      </dec-upload>\n    </div>\n\n    <span [ngClass]=\"{'zoom-in-active': finalZoom, 'zoom-in': !finalZoom}\" (click)=\"zoomIn()\">\n      <mat-icon class=\"icons-zoom\">add_circle_outline</mat-icon>\n    </span>\n    <span [ngClass]=\"{'zoom-out-active': !isZoom, 'zoom-out': isZoom}\" (click)=\"zoomOut()\">\n      <mat-icon class=\"icons-zoom\">remove_circle_outline</mat-icon>\n    </span>\n    <span *ngIf=\"imgExternalLink\" class=\"img-link\">\n      <a href=\"{{ imgExternalLink }}\" target=\"_blank\">{{ 'label.image-link' | translate }}</a>\n    </span>\n  </div>\n</div>\n",
                    styles: [".imagehighlight-container{width:100%;height:100%}.container-img-link{position:relative;width:100%;height:20px}.zoom-in{cursor:pointer;color:red;position:absolute;right:0}.zoom-out{cursor:pointer;color:red;position:absolute;right:20px}.zoom-in-active{color:gray;position:absolute;right:0}.zoom-out-active{color:gray;position:absolute;right:20px}.icons-zoom{font-size:18px}.img-link{position:absolute;right:50px;color:gray}.img-link a{font-size:10px;padding-top:2px}.upload-button{width:250px;display:inline-block}.upload-icon-size{font-size:20px;cursor:pointer}"]
                },] },
    ];
    /** @nocollapse */
    DecImageZoomComponent.ctorParameters = function () { return []; };
    DecImageZoomComponent.propDecorators = {
        image: [{ type: Input }],
        size: [{ type: Input }],
        permitUpload: [{ type: Input }],
        divImage: [{ type: ViewChild, args: ['imageContainer',] }],
        uploaded: [{ type: Output }]
    };
    return DecImageZoomComponent;
}());
export { DecImageZoomComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLWltYWdlLXpvb20uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL2RlYy1pbWFnZS16b29tL2RlYy1pbWFnZS16b29tLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBaUIsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFFN0csSUFBTSxNQUFNLEdBQUcsOENBQThDLENBQUM7Ozs7O0lBa0Y1RDtRQUFBLGlCQUFpQjs0QkF6Qk8sS0FBSzt3QkFJUixJQUFJLFlBQVksRUFBRTtzQkFPOUIsS0FBSztxQkFFTixDQUFDO3lCQUVHLEtBQUs7eUJBQ0wsSUFBSTt1QkFNTixDQUFDO3VCQUNELENBQUM7d0JBUUE7O1lBQ1QsSUFBTSxFQUFFLEdBQUcsS0FBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNoRCxLQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQztZQUNwQixLQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQzs7WUFDcEIsSUFBSSxTQUFTLEdBQUcsS0FBSyxDQUFDOztZQUN0QixJQUFJLFNBQVMsR0FBRyxLQUFLLENBQUM7WUFFdEIsRUFBRSxDQUFDLFdBQVcsR0FBRyxVQUFDLENBQUM7Z0JBQ2pCLEVBQUUsQ0FBQyxDQUFDLEtBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDOztvQkFDaEIsSUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUVSOztvQkFGaEIsSUFDRSxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUNDOztvQkFGaEIsSUFFRSxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUVoQixLQUFJLENBQUMs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LENBQUM7UUFFekIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUM7Ozs7O0lBRy9CLDJDQUFXOzs7O1FBQ2pCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ3JDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1NBQ3BEO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1lBQ2pELE1BQU0sQ0FBSSxNQUFNLFNBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFjLENBQUM7U0FDL0M7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLE1BQU0sQ0FBQyxnNUZBQWc1RixDQUFDO1NBQ3o1Rjs7SUFJSCxTQUFTOzs7OztJQUNULGdEQUFnQjs7OztJQUFoQixVQUFpQixLQUFLO1FBQ3BCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUNoQzs7Z0JBNVBGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsZ0JBQWdCO29CQUMxQixRQUFRLEVBQUUsbWlDQXVCWDtvQkFDQyxNQUFNLEVBQUUsQ0FBQyxrakJBQWtqQixDQUFDO2lCQUM3akI7Ozs7O3dCQUdFLEtBQUs7dUJBWUwsS0FBSzsrQkFXTCxLQUFLOzJCQUVMLFNBQVMsU0FBQyxnQkFBZ0I7MkJBRTFCLE1BQU07O2dDQS9EVDs7U0FrQ2EscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgVmlld0NoaWxkLCBFbGVtZW50UmVmLCBBZnRlclZpZXdJbml0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5jb25zdCBTM0hvc3QgPSAnaHR0cDovL3MzLmFtYXpvbmF3cy5jb20vZGVjb3JhLXBsYXRmb3JtLTEtbnYnO1xuXG5leHBvcnQgdHlwZSBab29tTW9kZSA9ICdob3ZlcicgfCAnY2xpY2snIHwgJ3RvZ2dsZScgfCAnaG92ZXItZnJlZXplJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLWltYWdlLXpvb20nLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJpbWFnZWhpZ2hsaWdodC1jb250YWluZXJcIiBmeExheW91dD1cImNvbHVtblwiIGZ4TGF5b3V0QWxpZ249XCJzcGFjZS1iZXR3ZWVuIHN0YXJ0XCIgZnhMYXlvdXRHYXA9XCJnYXBweFwiPlxuICA8ZGl2ICNpbWFnZUNvbnRhaW5lciBjbGFzcz1cImltYWdlaGlnaGxpZ2h0LWNvbnRhaW5lclwiPlxuICA8L2Rpdj5cbiAgPGRpdiBjbGFzcz1cImNvbnRhaW5lci1pbWctbGlua1wiPlxuICAgIDxkaXYgKm5nSWY9XCJwZXJtaXRVcGxvYWRcIiBjbGFzcz1cInVwbG9hZC1idXR0b25cIj5cbiAgICAgIDxkZWMtdXBsb2FkIFtlbmRwb2ludF09XCInL2ZpbGVzL3VwbG9hZCdcIiAodXBsb2FkZWQpPVwidXBsb2FkZWRGdW5jdGlvbigkZXZlbnQpXCI+XG4gICAgICAgIDxtYXQtaWNvbiBjbGFzcz1cInVwbG9hZC1pY29uLXNpemVcIj5cbiAgICAgICAgICAgIGFkZF9hX3Bob3RvXG4gICAgICAgIDwvbWF0LWljb24+XG4gICAgICA8L2RlYy11cGxvYWQ+XG4gICAgPC9kaXY+XG5cbiAgICA8c3BhbiBbbmdDbGFzc109XCJ7J3pvb20taW4tYWN0aXZlJzogZmluYWxab29tLCAnem9vbS1pbic6ICFmaW5hbFpvb219XCIgKGNsaWNrKT1cInpvb21JbigpXCI+XG4gICAgICA8bWF0LWljb24gY2xhc3M9XCJpY29ucy16b29tXCI+YWRkX2NpcmNsZV9vdXRsaW5lPC9tYXQtaWNvbj5cbiAgICA8L3NwYW4+XG4gICAgPHNwYW4gW25nQ2xhc3NdPVwieyd6b29tLW91dC1hY3RpdmUnOiAhaXNab29tLCAnem9vbS1vdXQnOiBpc1pvb219XCIgKGNsaWNrKT1cInpvb21PdXQoKVwiPlxuICAgICAgPG1hdC1pY29uIGNsYXNzPVwiaWNvbnMtem9vbVwiPnJlbW92ZV9jaXJjbGVfb3V0bGluZTwvbWF0LWljb24+XG4gICAgPC9zcGFuPlxuICAgIDxzcGFuICpuZ0lmPVwiaW1nRXh0ZXJuYWxMaW5rXCIgY2xhc3M9XCJpbWctbGlua1wiPlxuICAgICAgPGEgaHJlZj1cInt7IGltZ0V4dGVybmFsTGluayB9fVwiIHRhcmdldD1cIl9ibGFua1wiPnt7ICdsYWJlbC5pbWFnZS1saW5rJyB8IHRyYW5zbGF0ZSB9fTwvYT5cbiAgICA8L3NwYW4+XG4gIDwvZGl2PlxuPC9kaXY+XG5gLFxuICBzdHlsZXM6IFtgLmltYWdlaGlnaGxpZ2h0LWNvbnRhaW5lcnt3aWR0aDoxMDAlO2hlaWdodDoxMDAlfS5jb250YWluZXItaW1nLWxpbmt7cG9zaXRpb246cmVsYXRpdmU7d2lkdGg6MTAwJTtoZWlnaHQ6MjBweH0uem9vbS1pbntjdXJzb3I6cG9pbnRlcjtjb2xvcjpyZWQ7cG9zaXRpb246YWJzb2x1dGU7cmlnaHQ6MH0uem9vbS1vdXR7Y3Vyc29yOnBvaW50ZXI7Y29sb3I6cmVkO3Bvc2l0aW9uOmFic29sdXRlO3JpZ2h0OjIwcHh9Lnpvb20taW4tYWN0aXZle2NvbG9yOmdyYXk7cG9zaXRpb246YWJzb2x1dGU7cmlnaHQ6MH0uem9vbS1vdXQtYWN0aXZle2NvbG9yOmdyYXk7cG9zaXRpb246YWJzb2x1dGU7cmlnaHQ6MjBweH0uaWNvbnMtem9vbXtmb250LXNpemU6MThweH0uaW1nLWxpbmt7cG9zaXRpb246YWJzb2x1dGU7cmlnaHQ6NTBweDtjb2xvcjpncmF5fS5pbWctbGluayBhe2ZvbnQtc2l6ZToxMHB4O3BhZGRpbmctdG9wOjJweH0udXBsb2FkLWJ1dHRvbnt3aWR0aDoyNTBweDtkaXNwbGF5OmlubGluZS1ibG9ja30udXBsb2FkLWljb24tc2l6ZXtmb250LXNpemU6MjBweDtjdXJzb3I6cG9pbnRlcn1gXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNJbWFnZVpvb21Db21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcblxuICBASW5wdXQoKVxuICBzZXQgaW1hZ2Uodikge1xuICAgIGlmICh2KSB7XG4gICAgICB0aGlzLl9pbWFnZSA9IHY7XG4gICAgICB0aGlzLmxvYWRIaWdoTGlnaHRJbWFnZSgpO1xuICAgIH1cbiAgfVxuXG4gIGdldCBpbWFnZSgpIHtcbiAgICByZXR1cm4gdGhpcy5faW1hZ2U7XG4gIH1cblxuICBASW5wdXQoKVxuICBzZXQgc2l6ZSh2KSB7XG4gICAgaWYgKHYpIHtcbiAgICAgIHRoaXMuX3NpemUgPSB2O1xuICAgIH1cbiAgfVxuXG4gIGdldCBzaXplKCkge1xuICAgIHJldHVybiB0aGlzLl9zaXplO1xuICB9XG5cbiAgQElucHV0KCkgcGVybWl0VXBsb2FkID0gZmFsc2U7XG5cbiAgQFZpZXdDaGlsZCgnaW1hZ2VDb250YWluZXInKSBkaXZJbWFnZTogRWxlbWVudFJlZjtcblxuICBAT3V0cHV0KCkgdXBsb2FkZWQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgcHJpdmF0ZSBfaW1hZ2U6IGFueTtcbiAgcHJpdmF0ZSBfc2l6ZTogYW55O1xuXG4gIGltZ0V4dGVybmFsTGluazogc3RyaW5nO1xuXG4gIGlzWm9vbSA9IGZhbHNlO1xuICBpbWFnZVNpemVSYXc6IGFueTtcbiAgc3RlcHMgPSAxO1xuICBzdGVwc0RpZmY6IGFueTtcbiAgZmluYWxab29tID0gZmFsc2U7XG4gIGltYWdlU2l6ZSA9IDEwMjQ7XG5cbiAgZGVsdGFYOiBudW1iZXI7XG4gIGRlbHRhWTogbnVtYmVyO1xuICBsYXN0TW91c2VYOiBudW1iZXI7XG4gIGxhc3RNb3VzZVk6IG51bWJlcjtcbiAgb2Zmc2V0WCA9IDA7XG4gIG9mZnNldFkgPSAwO1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIHRoaXMuaW5pdFpvb20oKTtcbiAgfVxuXG4gIGluaXRab29tID0gKCkgPT4ge1xuICAgIGNvbnN0IGVsID0gdGhpcy5nZXROYXRpdmVFbGVtZW50KHRoaXMuZGl2SW1hZ2UpO1xuICAgIHRoaXMubGFzdE1vdXNlWCA9IDA7XG4gICAgdGhpcy5sYXN0TW91c2VZID0gMDtcbiAgICBsZXQgbW91c2Vkb3duID0gZmFsc2U7XG4gICAgbGV0IG1vdXNlbW92ZSA9IGZhbHNlO1xuXG4gICAgZWwub25tb3VzZWRvd24gPSAoZSkgPT4ge1xuICAgICAgaWYgKHRoaXMuaXNab29tKSB7XG4gICAgICAgIGNvbnN0IGNvb3JkcyA9IGdldFBvcyhlKSxcbiAgICAgICAgICB4ID0gY29vcmRzWzBdLFxuICAgICAgICAgIHkgPSBjb29yZHNbMV07XG5cbiAgICAgICAgdGhpcy5kZWx0YVggPSB4IC0gdGhpcy5vZmZzZXRYO1xuICAgICAgICB0aGlzLmRlbHRhWSA9IHkgLSB0aGlzLm9mZnNldFk7XG4gICAgICAgIG1vdXNlZG93biA9IHRydWU7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdGhpcy5sYXN0TW91c2VYID0gZS5vZmZzZXRYO1xuICAgICAgdGhpcy5sYXN0TW91c2VZID0gZS5vZmZzZXRZO1xuICAgICAgbW91c2Vkb3duID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBlbC5vbm1vdXNlbW92ZSA9IChlKSA9PiB7XG4gICAgICBpZiAodGhpcy5pc1pvb20gJiYgbW91c2Vkb3duKSB7XG4gICAgICAgIGNvbnN0IGNvb3JkcyA9IGdldFBvcyhlKSxcbiAgICAgICAgICB4ID0gY29vcmRzWzBdLFxuICAgICAgICAgIHkgPSBjb29yZHNbMV07XG5cbiAgICAgICAgaWYgKCgoeCAtIHRoaXMuZGVsdGFYKSAqICgtMSkpICsgZWwub2Zmc2V0V2lkdGggPCB0aGlzLmltYWdlU2l6ZSkge1xuICAgICAgICAgIHRoaXMub2Zmc2V0WCA9IHggLSB0aGlzLmRlbHRhWDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgoKHkgLSB0aGlzLmRlbHRhWSkgKiAoLTEpKSArIGVsLm9mZnNldFdpZHRoIDwgdGhpcy5pbWFnZVNpemUpIHtcbiAgICAgICAgICB0aGlzLm9mZnNldFkgPSB5IC0gdGhpcy5kZWx0YVk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5vZmZzZXRZID4gMCkge1xuICAgICAgICAgIHRoaXMub2Zmc2V0WSA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMub2Zmc2V0WCA+IDApIHtcbiAgICAgICAgICB0aGlzLm9mZnNldFggPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgZWwuc3R5bGUuYmFja2dyb3VuZFBvc2l0aW9uID0gdGhpcy5vZmZzZXRYICsgJ3B4ICcgKyB0aGlzLm9mZnNldFkgKyAncHgnO1xuXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBlbC5vbm1vdXNldXAgPSAoKSA9PiB7XG4gICAgICBpZiAodGhpcy5pc1pvb20pIHtcbiAgICAgICAgbW91c2Vkb3duID0gZmFsc2U7XG4gICAgICAgIG1vdXNlbW92ZSA9IGZhbHNlO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGdldFBvcyhlKSB7XG4gICAgICBjb25zdCByID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXG4gICAgICAgIHggPSBlLmNsaWVudFggLSByLmxlZnQsXG4gICAgICAgIHkgPSBlLmNsaWVudFkgLSByLnRvcDtcbiAgICAgIHJldHVybiBbeCwgeV07XG4gICAgfVxuICB9XG5cbiAgem9vbUluKCkge1xuICAgIGlmICh0aGlzLnN0ZXBzID09PSAxKSB7XG4gICAgICB0aGlzLmdldFN0ZXBzRGlmZigpO1xuICAgIH1cbiAgICBpZiAodGhpcy5zdGVwcyA+IDQpIHtcbiAgICAgIHRoaXMuZmluYWxab29tID0gdHJ1ZTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgZWwgPSB0aGlzLmRpdkltYWdlLm5hdGl2ZUVsZW1lbnQ7XG4gICAgdGhpcy5pbWFnZVNpemUgKz0gdGhpcy5zdGVwc0RpZmZcbiAgICBlbC5zdHlsZS5iYWNrZ3JvdW5kU2l6ZSA9IHRoaXMuaW1hZ2VTaXplICsgJ3B4JztcbiAgICB0aGlzLm9mZnNldFggPSAoZWwub2Zmc2V0V2lkdGggLSB0aGlzLmltYWdlU2l6ZSkgLyAyO1xuICAgIHRoaXMub2Zmc2V0WSA9IChlbC5vZmZzZXRIZWlnaHQgLSB0aGlzLmltYWdlU2l6ZSkgLyAyO1xuICAgIGVsLnN0eWxlLmJhY2tncm91bmRQb3NpdGlvbiA9IHRoaXMub2Zmc2V0WCArICdweCAnICsgdGhpcy5vZmZzZXRZICsgJ3B4JztcbiAgICB0aGlzLmlzWm9vbSA9IHRydWU7XG4gICAgdGhpcy5zdGVwcysrO1xuICB9XG5cbiAgem9vbU91dCgpIHtcbiAgICBjb25zdCBlbCA9IHRoaXMuZGl2SW1hZ2UubmF0aXZlRWxlbWVudDtcbiAgICBpZiAodGhpcy5zdGVwcyA9PT0gMikge1xuICAgICAgdGhpcy5pbWFnZVNpemUgPSAxMDI0O1xuICAgICAgZWwuc3R5bGUuYmFja2dyb3VuZFNpemUgPSAnMTAwJSc7XG4gICAgICBlbC5zdHlsZS5iYWNrZ3JvdW5kUG9zaXRpb24gPSAnMHB4IDBweCc7XG4gICAgICB0aGlzLm9mZnNldFggPSAwO1xuICAgICAgdGhpcy5vZmZzZXRZID0gMDtcbiAgICAgIHRoaXMuaXNab29tID0gZmFsc2U7XG4gICAgICB0aGlzLnN0ZXBzID0gMTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuc3RlcHMgPiAxKSB7XG4gICAgICB0aGlzLmltYWdlU2l6ZSAtPSB0aGlzLnN0ZXBzRGlmZjtcbiAgICAgIGVsLnN0eWxlLmJhY2tncm91bmRTaXplID0gdGhpcy5pbWFnZVNpemUgKyAncHgnO1xuICAgICAgdGhpcy5vZmZzZXRYID0gKGVsLm9mZnNldFdpZHRoIC0gdGhpcy5pbWFnZVNpemUpIC8gMjtcbiAgICAgIHRoaXMub2Zmc2V0WSA9IChlbC5vZmZzZXRIZWlnaHQgLSB0aGlzLmltYWdlU2l6ZSkgLyAyO1xuICAgICAgZWwuc3R5bGUuYmFja2dyb3VuZFBvc2l0aW9uID0gdGhpcy5vZmZzZXRYICsgJ3B4ICcgKyB0aGlzLm9mZnNldFkgKyAncHgnO1xuICAgICAgdGhpcy5zdGVwcy0tO1xuICAgICAgdGhpcy5maW5hbFpvb20gPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBnZXRTdGVwc0RpZmYoKSB7XG4gICAgdGhpcy5zdGVwc0RpZmYgPSAodGhpcy5pbWFnZVNpemVSYXcud2lkdGggLyA0KTtcbiAgfVxuXG4gIGdldE5hdGl2ZUVsZW1lbnQoZGl2SW1hZ2UpIHtcbiAgICBpZiAoZGl2SW1hZ2UpIHtcbiAgICAgIHJldHVybiBkaXZJbWFnZS5uYXRpdmVFbGVtZW50O1xuICAgIH1cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuZ2V0TmF0aXZlRWxlbWVudChkaXZJbWFnZSk7XG4gICAgfSwgNDAwKTtcbiAgfVxuXG4gIGxvYWRIaWdoTGlnaHRJbWFnZSgpIHtcbiAgICB0aGlzLmRpdkltYWdlLm5hdGl2ZUVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZFNpemUgPSAnMTAwJSc7XG4gICAgdGhpcy5kaXZJbWFnZS5uYXRpdmVFbGVtZW50LnN0eWxlLmJhY2tncm91bmRQb3NpdGlvbiA9ICcwcHggMHB4JztcbiAgICB0aGlzLmRpdkltYWdlLm5hdGl2ZUVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gJyc7XG4gICAgdGhpcy5pc1pvb20gPSBmYWxzZTtcbiAgICB0aGlzLmRpdkltYWdlLm5hdGl2ZUVsZW1lbnQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdkZWMtc3lzZmlsZS1iZy1sb2FkJyk7XG4gICAgY29uc3QgZG93bmxvYWRJbWFnZSA9IG5ldyBJbWFnZSgpO1xuICAgIGRvd25sb2FkSW1hZ2UuY3Jvc3NPcmlnaW4gPSAnQW5vbnltb3VzJztcblxuICAgIGRvd25sb2FkSW1hZ2Uub25sb2FkID0gKCkgPT4ge1xuICAgICAgdGhpcy5kaXZJbWFnZS5uYXRpdmVFbGVtZW50LnN0eWxlLmJhY2tncm91bmRJbWFnZSA9ICd1cmwoJyArIHRoaXMuY29udmVydEltYWdlVG9EYXRhVVJJKGRvd25sb2FkSW1hZ2UpICsgJyknO1xuICAgICAgdGhpcy5kaXZJbWFnZS5uYXRpdmVFbGVtZW50LnN0eWxlLmJhY2tncm91bmRSZXBlYXQgPSAnbm8tcmVwZWF0JztcbiAgICAgIHRoaXMuZGl2SW1hZ2UubmF0aXZlRWxlbWVudC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2RlYy1zeXNmaWxlLWJnLWxvYWQnKTtcbiAgICAgIHRoaXMuaW1nRXh0ZXJuYWxMaW5rID0gdGhpcy5jb252ZXJ0SW1hZ2VUb0RhdGFVUkkoZG93bmxvYWRJbWFnZSk7XG4gICAgICB0aGlzLmltYWdlU2l6ZVJhdyA9IHtcbiAgICAgICAgd2lkdGg6IGRvd25sb2FkSW1hZ2Uud2lkdGgsXG4gICAgICAgIGhlaWdodDogZG93bmxvYWRJbWFnZS5oZWlnaHRcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgZG93bmxvYWRJbWFnZS5zcmMgPSB0aGlzLmdldEltYWdlVXJsKCk7XG4gIH1cblxuICBwcml2YXRlIGNvbnZlcnRJbWFnZVRvRGF0YVVSSShpbWcpIHtcbiAgICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICBjYW52YXMud2lkdGggPSBpbWcud2lkdGg7XG4gICAgY2FudmFzLmhlaWdodCA9IGltZy5oZWlnaHQ7XG5cbiAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICBjdHguZHJhd0ltYWdlKGltZywgMCwgMCk7XG5cbiAgICByZXR1cm4gY2FudmFzLnRvRGF0YVVSTCgnaW1hZ2UvcG5nJyk7XG4gIH1cblxuICBwcml2YXRlIGdldEltYWdlVXJsKCkge1xuICAgIGlmICh0aGlzLmltYWdlICYmIHRoaXMuaW1hZ2UuZmlsZVVybCkge1xuICAgICAgcmV0dXJuIHRoaXMuaW1hZ2UuZmlsZVVybC5yZXBsYWNlKCdodHRwJywgJ2h0dHBzJyk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmltYWdlICYmIHRoaXMuaW1hZ2UuZmlsZUJhc2VQYXRoKSB7XG4gICAgICByZXR1cm4gYCR7UzNIb3N0fS8ke3RoaXMuaW1hZ2UuZmlsZUJhc2VQYXRofWA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAnZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFJQUFBQUNBQ0FNQUFBRDA0Skg1QUFBQXNWQk1WRVVBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQWsyd0xTQUFBQU9uUlNUbE1BQTRVVUJRZ01FUFNLSytqYUd4Y2Y5NTB5Y2s4Nk5pK21nYjlYSmlPeVJQRHMzcUtXWjByS3JYeDMrODVqUVQyNFhlUFgwOFZ0YXBHYUVDNVJOd0FBQjE1SlJFRlVlTnJ0bTJkejJ6QU1oa2xyMmJJbDc1RjQxWEc4NHBsbDEvei9QNnlYVmpZRWtpS3BrZDcxcnMrbm5pTWRJZUlGQ0VBcStjOS8vcE1WMnd2ODNtRzVuQjU2ZnVEYTVDOUNnK25tVkdhWUg2ZVhhVURKOXhNT0p5eVp5VEFrMzBsd3JqSWRzODJZZkEvdUJWYlgySER4U09HTTV5d05rMzZ4ZXVoOXNMUzhINHN6WWJSaVNaVExMSkZhcXlEZFMyVC85anhzaFZId1U5dXh4c2Y5WEdMS1kxaEEwTDh3am8vRnlKYXIxRzhMTW4ydzgycnZpU0YySFplbzhEbzdocWoyY3ozK0E4NTJaOHNrV1d5d00wclp4ZWdpOGEwT3B0dHBMOStRR0MyU0RiOGMzL3RXcWdmcDFoaXdQWkFzTE9JUGtUNm9sM0h6MnhuY1VHTEFKWXVXN2JpQW5rbGFyckZvenVyRElPYUhOVTBuL3pYY3VzOFJSYVhZWTZTeUFKTGZiSnp2RUdsa3NxQjV2K3ZrNUUzazRJWUpNUVhVMDh4L29qbmd6V3ZxK0hzZ1JmQU0wVWhNYUVIMGtXS29zQnNtR2NtOUo1QVhVaFRnMDRCb3VlZi9DZ0VLODBMTk1UYTJTWXBrWXBvUysvZkRoeGJiUjkzTGhKYjZ1dXF0MW5PTEx1b2J0OHhtR3puQUowcnErNS9OaVBrWHplYlBmVjF6UU44TEZOWHBZUmFBMWllVDhXbHAxS1dQaE1kYjJsWlg2VnNtWnp0V3V2ZmpacWcrQlZVY25UZmxsQjJsMzdRNnJFSDUyYUdhbUpiemJPU0VtbG9tMFVYOXBKMWtLcFFTcDdjWTZ4SXA3d3h4Q3VRS1lBbzAwVE5WYm9FdmJxZ3NHUnlaaWlrQkZFN3VLN0lsb2kxdTZZR3BXR29LcE52dXlzUjkweC9XZGFkSUE4RE5WbklaMGczWHlpYjdrTU1Gb0lJekVhaEdHMkFUTWw3aEpudXNOY0M0NHFCUkVxbUtXUUpWVFYzY1p6ZGphdHd6RlJjclRoQjRmRDVwUnhjS0o4ZHREQkJHbGc0YkNXcDBIbGdhZnB5eGprTW90NlFlMkVIQzJTU3BNVnluTTZFdWk4UVp3VmpSMVhIUmUzZ3c5dFNEbExGaktkaWlRYzFlSGdlZDZHZFhOWjE2aEdjQmtSaFFrL21BaSs5QjlKUzhhQStjR3IzN1gxNGJ6QlNjKzUraWJwVWd0bUxuSUZmanhzbWd4cVpFN2xzOFcxS2NKZllMVnVNcnZkODFZR1pVWlhXdko4dlJEbG81UVkxdm9FYkxjOFBSc2pKakdsQ3pHUDNXaytUaEdZN01BNlNwVDF6OThXbGtQREEzZ0VTbnpRSnBVTmFNTUxZYXd4N2hnZUhjSTVoZ3BUY0FMellnTWQ1a3c1RGZWM21neGpKV284MG5XVk1EOXBFbjQxS1h1WVZFTFRySUh1Zkd4cER5SjEwaTBwS0dpcm9JSkFhd0JzamV2V0p4SDdBSlN6TUQ2bUxTczZSNUVCWTZncXNmV1p5Vno1OW9jcVF4SDRvMjJkZ0FZQWNMdGJBYUIwaU5PeE1EYlBGRTl1RTZiQUN3Qm5zN25Cb2RmY21NazZ1WTlWbzZBN0FhYlJBOEp4THkwOEFBSWpaSVhZMEJvaHBoa0NlSXhOaUFubUJBUTJrQVhtak1xWEdNUkdKa1FOZDhCNEJkQ0F2VmRDSXgzNEVlcElZWTJycDdpWHVJaWdzaU1SRmhTNHdDVzIvQUdBWFVPVkVrei9vdzlNVTg0T2dOZ0ZJT0Z0S3JrY2pPNDdxWUNTMjlBUjdoQ0U1WUpLUDdUbmVmMUpuUWs5aWtOeUNJN3ZpQURleHphclR1Sm5SK3FNNENSeGtZb2dHNHNTNnpTWWdYQWtvT0x4THBJRVJmRDhnWVJuL2NvRkdTZzlXNFhkaFlKTEkydUNZcFV1WjZBNXJJa1F0Nk53RW40ZG1TZ2hvNUErYVM4dXNTZFZGNkF4b1Vib0ZwbHVRbDk4Y29KaElTcHd6YnJhNktOVk9nYTdTVHNZNE5UNWttS0tnRXhiZGtyV0ZmYjhCSkdHbWNRcWpLWmpnM09vcHBwQ1hyakY3MEJqRFlXbS96dGQ2czdjSTlkSUhWdUtlRTV3VjhLYXJ3emNDQTkvaWRqbWNUak1lcGNab3dDQmpJdTJOTGJ3QXJFVFVCcDhhV05BOTI1UE9CVjVVQmtBczArQjlZTm5VQ0RLRWtsVzFNVFdNQW1Da3loSVY0TmY0RU5VYTJWUlV6SXIwQnJDSnFpMWErWnF2UVNPM3hVSDlCOFZhL0pFM0pOa1lHc0tjV3YrdlJpUVF6S2FlQ1IwVlQxTUFGU1hQQ2hnTUdLUG5zd2k3US9pTXN0QVJoclhINCtJVFFNb1FieDBKUXAzYjROQmoyQXl2d08vTXRTNWowOXprMWhyMWtGYm5DUklsbDVqRzQ3ODJ5aW84U2FBSUYxbnhSd0hMdzdNSTBhOHNFQm9yM0JlQ2VCc3RERzRxRmtySzBCZDY1a2Z1SzVhSTh0TEVhZ1JXUmN1VGViVjVZSG5Dc2puYTRycE5DMy9GN2M0c0J1ZFZJamxXMEFWTDZuSXZhTEQ5WGFKY3FjS0RyM3B6VzZKOHR1Ykxjd0ZkVTlrci9NVXNJSnk2MG1mbUFPZjhHZWh1REY4elRlNUpkUEpRaUtsOUUvemI4N1dIUnAveHIwYmJSOXdPTmtCU0xWYjZGQmxXWEV1aGpqK0p3M2tIZ2Frcm95NnVpb0JQalQzUG8zZFI1Z2VzLzN3OXhBMmMxN25WVVlldVhXSnBQVTQ2S3J3SHlmaHJyRXhQTzZOVE1EZjFwV0U0RGNNY3BmeXpZY0JKdWlDa0RlRDJUTng5NE8vQm9scWhoMnluSlEvOEg4bWNXQzlqVktlVEQ5RUhLV3dkd2EzVkVzaEhzWW85QjBsTEJuWlVHM2Z2R0RVblBLM28vUk5LeW5LRjJOZ3V0QmdPcXkxUm5RKytkQWVXc1ByUlFYek1iMnFZQ210WlFFK2RtVHlJUFhGTThvZ1ptdDh1NEpDTjVHRDF4bGZhaXJsNTkrTUVRdFhyZVRONFdpcnhLVjE3VnVhMU5sWEZjS01tTk4yRWlwL2JTRHgyYmZtRTczdmh3WGt2cTE3VlgyUDh6eXNMbmlCU0cvNWwrZVo4VXluakEwdENzazhKeFg1OU1tOUpYaDN3UDRVVnZ3OXM1SU4rSk43MldrOXV3ZWNjaWZ3RzN2Mi9XK0FlZjcxc2UrWnRReDZyN3ZlN3gyUFBybGtQKzgrL3lDekdpN2FGenBQVXRBQUFBQUVsRlRrU3VRbUNDJztcbiAgICB9XG4gIH1cblxuXG4gIC8vIFVwbG9hZFxuICB1cGxvYWRlZEZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgdGhpcy5pbWFnZSA9IGV2ZW50WzBdO1xuICAgIHRoaXMudXBsb2FkZWQuZW1pdCh0aGlzLmltYWdlKTtcbiAgfVxufVxuIl19