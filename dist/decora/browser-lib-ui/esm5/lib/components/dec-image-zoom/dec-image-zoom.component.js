/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input, ViewChild, ElementRef } from '@angular/core';
var DecImageZoomComponent = /** @class */ (function () {
    function DecImageZoomComponent() {
        var _this = this;
        // zoom
        this.isZoom = false;
        this.steps = 1;
        this.finalZoom = false;
        this.imageSize = 1024;
        this.offsetX = 0;
        this.offsetY = 0;
        this.initZoom = function () {
            var /** @type {?} */ el = _this.getNativeElement(_this.divImage);
            _this.lastMouseX = 0;
            _this.lastMouseY = 0;
            var /** @type {?} */ mousedown = false;
            var /** @type {?} */ mousemove = false;
            el.onmousedown = function (e) {
                if (_this.isZoom) {
                    var /** @type {?} */ coords = getPos(e), /** @type {?} */
                    x = coords[0], /** @type {?} */
                    y = coords[1];
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
                    var /** @type {?} */ coords = getPos(e), /** @type {?} */
                    x = coords[0], /** @type {?} */
                    y = coords[1];
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
                var /** @type {?} */ r = el.getBoundingClientRect(), /** @type {?} */
                x = e.clientX - r.left, /** @type {?} */
                y = e.clientY - r.top;
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
        var /** @type {?} */ el = this.divImage.nativeElement;
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
        var /** @type {?} */ el = this.divImage.nativeElement;
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
        var /** @type {?} */ downloadImage = new Image();
        downloadImage.onload = function () {
            _this.divImage.nativeElement.style.backgroundImage = 'url(' + downloadImage.src + ' )';
            _this.divImage.nativeElement.style.backgroundRepeat = 'no-repeat';
            _this.divImage.nativeElement.parentElement.classList.remove('dec-sysfile-bg-load');
            _this.imgExternalLink = downloadImage.src;
            _this.imageSizeRaw = {
                width: downloadImage.width,
                height: downloadImage.height
            };
        };
        downloadImage.src = this.getImageUrl();
    };
    /**
     * @return {?}
     */
    DecImageZoomComponent.prototype.getImageUrl = /**
     * @return {?}
     */
    function () {
        if (this.image && this.image.fileUrl) {
            return this.image.fileUrl;
        }
        else {
            return 'data:image/png;base64,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';
        }
    };
    DecImageZoomComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dec-image-zoom',
                    template: "<div class=\"imagehighlight-container\" fxLayout=\"column\" fxLayoutAlign=\"space-between start\" fxLayoutGap=\"gappx\">\n  <div #imageContainer class=\"imagehighlight-container\">\n  </div>\n  <div class=\"container-img-link\">\n    <span [ngClass]=\"{'zoom-in-active': finalZoom, 'zoom-in': !finalZoom}\" (click)=\"zoomIn()\">\n      <mat-icon class=\"icons-zoom\">add_circle_outline</mat-icon>\n    </span>\n    <span [ngClass]=\"{'zoom-out-active': !isZoom, 'zoom-out': isZoom}\" (click)=\"zoomOut()\">\n      <mat-icon class=\"icons-zoom\">remove_circle_outline</mat-icon>\n    </span>\n    <span *ngIf=\"imgExternalLink\" class=\"img-link\">\n      <a href=\"{{ imgExternalLink }}\" target=\"_blank\">{{ 'label.image-link' | translate }}</a>\n    </span>\n  </div>\n</div>",
                    styles: [".imagehighlight-container{width:100%;height:100%}.container-img-link{position:relative;width:100%;height:20px}.zoom-in{cursor:pointer;color:red;position:absolute;right:0}.zoom-out{cursor:pointer;color:red;position:absolute;right:20px}.zoom-in-active{color:gray;position:absolute;right:0}.zoom-out-active{color:gray;position:absolute;right:20px}.icons-zoom{font-size:18px}.img-link{position:absolute;right:50px;color:gray}.img-link a{font-size:10px;padding-top:2px}"]
                },] },
    ];
    /** @nocollapse */
    DecImageZoomComponent.ctorParameters = function () { return []; };
    DecImageZoomComponent.propDecorators = {
        image: [{ type: Input }],
        size: [{ type: Input }],
        divImage: [{ type: ViewChild, args: ['imageContainer',] }]
    };
    return DecImageZoomComponent;
}());
export { DecImageZoomComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLWltYWdlLXpvb20uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL2RlYy1pbWFnZS16b29tL2RlYy1pbWFnZS16b29tLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBaUIsTUFBTSxlQUFlLENBQUM7O0lBd0VyRjtRQUFBLGlCQUFpQjs7c0JBZlIsS0FBSztxQkFFTixDQUFDO3lCQUVHLEtBQUs7eUJBQ0wsSUFBSTt1QkFPTixDQUFDO3VCQUNELENBQUM7d0JBUUE7WUFDVCxxQkFBTSxFQUFFLEdBQUcsS0FBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNoRCxLQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQztZQUNwQixLQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQztZQUNwQixxQkFBSSxTQUFTLEdBQUcsS0FBSyxDQUFDO1lBQ3RCLHFCQUFJLFNBQVMsR0FBRyxLQUFLLENBQUM7WUFFdEIsRUFBRSxDQUFDLFdBQVcsR0FBRyxVQUFDLENBQUM7Z0JBQ2pCLEVBQUUsQ0FBQyxDQUFDLEtBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO29CQUNoQixxQkFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQztvQkFDdEIsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUM7b0JBQ2IsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFFaEIsS0FBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsS0FBSSxDQUFDLE9BQU8sQ0FBQztvQkFDL0IsS0FBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsS0FBSSxDQUFDLE9BQU8sQ0FBQztvQkFDL0IsU0FBUyxHQUFH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QUcsR0FBRyxJQUFJLENBQUM7WUFDdEYsS0FBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLGdCQUFnQixHQUFHLFdBQVcsQ0FBQztZQUNqRSxLQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1lBQ2xGLEtBQUksQ0FBQyxlQUFlLEdBQUcsYUFBYSxDQUFDLEdBQUcsQ0FBQztZQUN6QyxLQUFJLENBQUMsWUFBWSxHQUFHO2dCQUNsQixLQUFLLEVBQUUsYUFBYSxDQUFDLEtBQUs7Z0JBQzFCLE1BQU0sRUFBRSxhQUFhLENBQUMsTUFBTTthQUM3QixDQUFBO1NBQ0YsQ0FBQztRQUVGLGFBQWEsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0tBQ3hDOzs7O0lBRU8sMkNBQVc7Ozs7UUFDakIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDckMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDO1NBQzNCO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixNQUFNLENBQUMsZzVGQUFnNUYsQ0FBQztTQUN6NUY7OztnQkEzTkosU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxnQkFBZ0I7b0JBQzFCLFFBQVEsRUFBRSw0d0JBY0w7b0JBQ0wsTUFBTSxFQUFFLENBQUMsa2RBQWtkLENBQUM7aUJBQzdkOzs7Ozt3QkFHRSxLQUFLO3VCQVlMLEtBQUs7MkJBV0wsU0FBUyxTQUFDLGdCQUFnQjs7Z0NBakQ3Qjs7U0F3QmEscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgVmlld0NoaWxkLCBFbGVtZW50UmVmLCBBZnRlclZpZXdJbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cblxuZXhwb3J0IHR5cGUgWm9vbU1vZGUgPSAnaG92ZXInIHwgJ2NsaWNrJyB8ICd0b2dnbGUnIHwgJ2hvdmVyLWZyZWV6ZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1pbWFnZS16b29tJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwiaW1hZ2VoaWdobGlnaHQtY29udGFpbmVyXCIgZnhMYXlvdXQ9XCJjb2x1bW5cIiBmeExheW91dEFsaWduPVwic3BhY2UtYmV0d2VlbiBzdGFydFwiIGZ4TGF5b3V0R2FwPVwiZ2FwcHhcIj5cbiAgPGRpdiAjaW1hZ2VDb250YWluZXIgY2xhc3M9XCJpbWFnZWhpZ2hsaWdodC1jb250YWluZXJcIj5cbiAgPC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJjb250YWluZXItaW1nLWxpbmtcIj5cbiAgICA8c3BhbiBbbmdDbGFzc109XCJ7J3pvb20taW4tYWN0aXZlJzogZmluYWxab29tLCAnem9vbS1pbic6ICFmaW5hbFpvb219XCIgKGNsaWNrKT1cInpvb21JbigpXCI+XG4gICAgICA8bWF0LWljb24gY2xhc3M9XCJpY29ucy16b29tXCI+YWRkX2NpcmNsZV9vdXRsaW5lPC9tYXQtaWNvbj5cbiAgICA8L3NwYW4+XG4gICAgPHNwYW4gW25nQ2xhc3NdPVwieyd6b29tLW91dC1hY3RpdmUnOiAhaXNab29tLCAnem9vbS1vdXQnOiBpc1pvb219XCIgKGNsaWNrKT1cInpvb21PdXQoKVwiPlxuICAgICAgPG1hdC1pY29uIGNsYXNzPVwiaWNvbnMtem9vbVwiPnJlbW92ZV9jaXJjbGVfb3V0bGluZTwvbWF0LWljb24+XG4gICAgPC9zcGFuPlxuICAgIDxzcGFuICpuZ0lmPVwiaW1nRXh0ZXJuYWxMaW5rXCIgY2xhc3M9XCJpbWctbGlua1wiPlxuICAgICAgPGEgaHJlZj1cInt7IGltZ0V4dGVybmFsTGluayB9fVwiIHRhcmdldD1cIl9ibGFua1wiPnt7ICdsYWJlbC5pbWFnZS1saW5rJyB8IHRyYW5zbGF0ZSB9fTwvYT5cbiAgICA8L3NwYW4+XG4gIDwvZGl2PlxuPC9kaXY+YCxcbiAgc3R5bGVzOiBbYC5pbWFnZWhpZ2hsaWdodC1jb250YWluZXJ7d2lkdGg6MTAwJTtoZWlnaHQ6MTAwJX0uY29udGFpbmVyLWltZy1saW5re3Bvc2l0aW9uOnJlbGF0aXZlO3dpZHRoOjEwMCU7aGVpZ2h0OjIwcHh9Lnpvb20taW57Y3Vyc29yOnBvaW50ZXI7Y29sb3I6cmVkO3Bvc2l0aW9uOmFic29sdXRlO3JpZ2h0OjB9Lnpvb20tb3V0e2N1cnNvcjpwb2ludGVyO2NvbG9yOnJlZDtwb3NpdGlvbjphYnNvbHV0ZTtyaWdodDoyMHB4fS56b29tLWluLWFjdGl2ZXtjb2xvcjpncmF5O3Bvc2l0aW9uOmFic29sdXRlO3JpZ2h0OjB9Lnpvb20tb3V0LWFjdGl2ZXtjb2xvcjpncmF5O3Bvc2l0aW9uOmFic29sdXRlO3JpZ2h0OjIwcHh9Lmljb25zLXpvb217Zm9udC1zaXplOjE4cHh9LmltZy1saW5re3Bvc2l0aW9uOmFic29sdXRlO3JpZ2h0OjUwcHg7Y29sb3I6Z3JheX0uaW1nLWxpbmsgYXtmb250LXNpemU6MTBweDtwYWRkaW5nLXRvcDoycHh9YF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjSW1hZ2Vab29tQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XG5cbiAgQElucHV0KClcbiAgc2V0IGltYWdlKHYpIHtcbiAgICBpZiAodikge1xuICAgICAgdGhpcy5faW1hZ2UgPSB2O1xuICAgICAgdGhpcy5sb2FkSGlnaExpZ2h0SW1hZ2UoKTtcbiAgICB9XG4gIH1cblxuICBnZXQgaW1hZ2UoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2ltYWdlO1xuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IHNpemUodikge1xuICAgIGlmICh2KSB7XG4gICAgICB0aGlzLl9zaXplID0gdjtcbiAgICB9XG4gIH1cblxuICBnZXQgc2l6ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fc2l6ZTtcbiAgfVxuXG4gIEBWaWV3Q2hpbGQoJ2ltYWdlQ29udGFpbmVyJykgZGl2SW1hZ2U6IEVsZW1lbnRSZWY7XG5cbiAgcHJpdmF0ZSBfaW1hZ2U6IGFueTtcbiAgcHJpdmF0ZSBfc2l6ZTogYW55O1xuXG4gIGltZ0V4dGVybmFsTGluazogc3RyaW5nO1xuICBcbiAgLy8gem9vbVxuICBpc1pvb20gPSBmYWxzZTtcbiAgaW1hZ2VTaXplUmF3OiBhbnk7XG4gIHN0ZXBzID0gMTtcbiAgc3RlcHNEaWZmOiBhbnk7XG4gIGZpbmFsWm9vbSA9IGZhbHNlO1xuICBpbWFnZVNpemUgPSAxMDI0O1xuXG4gIC8vIHBvc2l0aW9uIGJhY2tncm91bmRcbiAgZGVsdGFYOiBudW1iZXI7XG4gIGRlbHRhWTogbnVtYmVyO1xuICBsYXN0TW91c2VYOiBudW1iZXI7XG4gIGxhc3RNb3VzZVk6IG51bWJlcjtcbiAgb2Zmc2V0WCA9IDA7XG4gIG9mZnNldFkgPSAwO1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIHRoaXMuaW5pdFpvb20oKTtcbiAgfVxuXG4gIGluaXRab29tID0gKCkgPT4ge1xuICAgIGNvbnN0IGVsID0gdGhpcy5nZXROYXRpdmVFbGVtZW50KHRoaXMuZGl2SW1hZ2UpO1xuICAgIHRoaXMubGFzdE1vdXNlWCA9IDA7XG4gICAgdGhpcy5sYXN0TW91c2VZID0gMDtcbiAgICBsZXQgbW91c2Vkb3duID0gZmFsc2U7XG4gICAgbGV0IG1vdXNlbW92ZSA9IGZhbHNlO1xuXG4gICAgZWwub25tb3VzZWRvd24gPSAoZSkgPT4ge1xuICAgICAgaWYgKHRoaXMuaXNab29tKSB7XG4gICAgICAgIGNvbnN0IGNvb3JkcyA9IGdldFBvcyhlKSxcbiAgICAgICAgICB4ID0gY29vcmRzWzBdLFxuICAgICAgICAgIHkgPSBjb29yZHNbMV07XG5cbiAgICAgICAgdGhpcy5kZWx0YVggPSB4IC0gdGhpcy5vZmZzZXRYO1xuICAgICAgICB0aGlzLmRlbHRhWSA9IHkgLSB0aGlzLm9mZnNldFk7XG4gICAgICAgIG1vdXNlZG93biA9IHRydWU7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdGhpcy5sYXN0TW91c2VYID0gZS5vZmZzZXRYO1xuICAgICAgdGhpcy5sYXN0TW91c2VZID0gZS5vZmZzZXRZO1xuICAgICAgbW91c2Vkb3duID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBlbC5vbm1vdXNlbW92ZSA9IChlKSA9PiB7XG4gICAgICBpZiAodGhpcy5pc1pvb20gJiYgbW91c2Vkb3duKSB7XG4gICAgICAgIGNvbnN0IGNvb3JkcyA9IGdldFBvcyhlKSxcbiAgICAgICAgICB4ID0gY29vcmRzWzBdLFxuICAgICAgICAgIHkgPSBjb29yZHNbMV07XG5cbiAgICAgICAgaWYgKCgoeCAtIHRoaXMuZGVsdGFYKSAqICgtMSkpICsgZWwub2Zmc2V0V2lkdGggPCB0aGlzLmltYWdlU2l6ZSkge1xuICAgICAgICAgIHRoaXMub2Zmc2V0WCA9IHggLSB0aGlzLmRlbHRhWDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgoKHkgLSB0aGlzLmRlbHRhWSkgKiAoLTEpKSArIGVsLm9mZnNldFdpZHRoIDwgdGhpcy5pbWFnZVNpemUpIHtcbiAgICAgICAgICB0aGlzLm9mZnNldFkgPSB5IC0gdGhpcy5kZWx0YVk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5vZmZzZXRZID4gMCkge1xuICAgICAgICAgIHRoaXMub2Zmc2V0WSA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMub2Zmc2V0WCA+IDApIHtcbiAgICAgICAgICB0aGlzLm9mZnNldFggPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgZWwuc3R5bGUuYmFja2dyb3VuZFBvc2l0aW9uID0gdGhpcy5vZmZzZXRYICsgJ3B4ICcgKyB0aGlzLm9mZnNldFkgKyAncHgnO1xuXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBlbC5vbm1vdXNldXAgPSAoKSA9PiB7XG4gICAgICBpZiAodGhpcy5pc1pvb20pIHtcbiAgICAgICAgbW91c2Vkb3duID0gZmFsc2U7XG4gICAgICAgIG1vdXNlbW92ZSA9IGZhbHNlO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGdldFBvcyhlKSB7XG4gICAgICBjb25zdCByID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXG4gICAgICAgIHggPSBlLmNsaWVudFggLSByLmxlZnQsXG4gICAgICAgIHkgPSBlLmNsaWVudFkgLSByLnRvcDtcbiAgICAgIHJldHVybiBbeCwgeV07XG4gICAgfVxuICB9XG5cbiAgem9vbUluKCkge1xuICAgIGlmICh0aGlzLnN0ZXBzID09PSAxKSB7XG4gICAgICB0aGlzLmdldFN0ZXBzRGlmZigpO1xuICAgIH1cbiAgICBpZiAodGhpcy5zdGVwcyA+IDQpIHtcbiAgICAgIHRoaXMuZmluYWxab29tID0gdHJ1ZTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgZWwgPSB0aGlzLmRpdkltYWdlLm5hdGl2ZUVsZW1lbnQ7XG4gICAgdGhpcy5pbWFnZVNpemUgKz0gdGhpcy5zdGVwc0RpZmZcbiAgICBlbC5zdHlsZS5iYWNrZ3JvdW5kU2l6ZSA9IHRoaXMuaW1hZ2VTaXplICsgJ3B4JztcbiAgICB0aGlzLm9mZnNldFggPSAoZWwub2Zmc2V0V2lkdGggLSB0aGlzLmltYWdlU2l6ZSkgLyAyO1xuICAgIHRoaXMub2Zmc2V0WSA9IChlbC5vZmZzZXRIZWlnaHQgLSB0aGlzLmltYWdlU2l6ZSkgLyAyO1xuICAgIGVsLnN0eWxlLmJhY2tncm91bmRQb3NpdGlvbiA9IHRoaXMub2Zmc2V0WCArICdweCAnICsgdGhpcy5vZmZzZXRZICsgJ3B4JztcbiAgICB0aGlzLmlzWm9vbSA9IHRydWU7XG4gICAgdGhpcy5zdGVwcysrO1xuICB9XG5cbiAgem9vbU91dCgpIHtcbiAgICBjb25zdCBlbCA9IHRoaXMuZGl2SW1hZ2UubmF0aXZlRWxlbWVudDtcbiAgICBpZiAodGhpcy5zdGVwcyA9PT0gMikge1xuICAgICAgdGhpcy5pbWFnZVNpemUgPSAxMDI0O1xuICAgICAgZWwuc3R5bGUuYmFja2dyb3VuZFNpemUgPSAnMTAwJSc7XG4gICAgICBlbC5zdHlsZS5iYWNrZ3JvdW5kUG9zaXRpb24gPSAnMHB4IDBweCc7XG4gICAgICB0aGlzLm9mZnNldFggPSAwO1xuICAgICAgdGhpcy5vZmZzZXRZID0gMDtcbiAgICAgIHRoaXMuaXNab29tID0gZmFsc2U7XG4gICAgICB0aGlzLnN0ZXBzID0gMTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuc3RlcHMgPiAxKSB7XG4gICAgICB0aGlzLmltYWdlU2l6ZSAtPSB0aGlzLnN0ZXBzRGlmZjtcbiAgICAgIGVsLnN0eWxlLmJhY2tncm91bmRTaXplID0gdGhpcy5pbWFnZVNpemUgKyAncHgnO1xuICAgICAgdGhpcy5vZmZzZXRYID0gKGVsLm9mZnNldFdpZHRoIC0gdGhpcy5pbWFnZVNpemUpIC8gMjtcbiAgICAgIHRoaXMub2Zmc2V0WSA9IChlbC5vZmZzZXRIZWlnaHQgLSB0aGlzLmltYWdlU2l6ZSkgLyAyO1xuICAgICAgZWwuc3R5bGUuYmFja2dyb3VuZFBvc2l0aW9uID0gdGhpcy5vZmZzZXRYICsgJ3B4ICcgKyB0aGlzLm9mZnNldFkgKyAncHgnO1xuICAgICAgdGhpcy5zdGVwcy0tO1xuICAgICAgdGhpcy5maW5hbFpvb20gPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBnZXRTdGVwc0RpZmYoKSB7XG4gICAgdGhpcy5zdGVwc0RpZmYgPSAodGhpcy5pbWFnZVNpemVSYXcud2lkdGggLyA0KTtcbiAgfVxuXG4gIGdldE5hdGl2ZUVsZW1lbnQoZGl2SW1hZ2UpIHtcbiAgICBpZiAoZGl2SW1hZ2UpIHtcbiAgICAgIHJldHVybiBkaXZJbWFnZS5uYXRpdmVFbGVtZW50O1xuICAgIH1cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuZ2V0TmF0aXZlRWxlbWVudChkaXZJbWFnZSk7XG4gICAgfSwgNDAwKTtcbiAgfVxuXG4gIGxvYWRIaWdoTGlnaHRJbWFnZSgpIHtcbiAgICB0aGlzLmRpdkltYWdlLm5hdGl2ZUVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZFNpemUgPSAnMTAwJSc7XG4gICAgdGhpcy5kaXZJbWFnZS5uYXRpdmVFbGVtZW50LnN0eWxlLmJhY2tncm91bmRQb3NpdGlvbiA9ICcwcHggMHB4JztcbiAgICB0aGlzLmRpdkltYWdlLm5hdGl2ZUVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gJyc7XG4gICAgdGhpcy5pc1pvb20gPSBmYWxzZTtcbiAgICB0aGlzLmRpdkltYWdlLm5hdGl2ZUVsZW1lbnQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdkZWMtc3lzZmlsZS1iZy1sb2FkJyk7XG4gICAgY29uc3QgZG93bmxvYWRJbWFnZSA9IG5ldyBJbWFnZSgpO1xuXG4gICAgZG93bmxvYWRJbWFnZS5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICB0aGlzLmRpdkltYWdlLm5hdGl2ZUVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gJ3VybCgnICsgZG93bmxvYWRJbWFnZS5zcmMgKyAnICknO1xuICAgICAgdGhpcy5kaXZJbWFnZS5uYXRpdmVFbGVtZW50LnN0eWxlLmJhY2tncm91bmRSZXBlYXQgPSAnbm8tcmVwZWF0JztcbiAgICAgIHRoaXMuZGl2SW1hZ2UubmF0aXZlRWxlbWVudC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2RlYy1zeXNmaWxlLWJnLWxvYWQnKTtcbiAgICAgIHRoaXMuaW1nRXh0ZXJuYWxMaW5rID0gZG93bmxvYWRJbWFnZS5zcmM7XG4gICAgICB0aGlzLmltYWdlU2l6ZVJhdyA9IHtcbiAgICAgICAgd2lkdGg6IGRvd25sb2FkSW1hZ2Uud2lkdGgsXG4gICAgICAgIGhlaWdodDogZG93bmxvYWRJbWFnZS5oZWlnaHRcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgZG93bmxvYWRJbWFnZS5zcmMgPSB0aGlzLmdldEltYWdlVXJsKCk7XG4gIH1cblxuICBwcml2YXRlIGdldEltYWdlVXJsKCkge1xuICAgIGlmICh0aGlzLmltYWdlICYmIHRoaXMuaW1hZ2UuZmlsZVVybCkge1xuICAgICAgcmV0dXJuIHRoaXMuaW1hZ2UuZmlsZVVybDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuICdkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUlBQUFBQ0FDQU1BQUFEMDRKSDVBQUFBc1ZCTVZFVUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBazJ3TFNBQUFBT25SU1RsTUFBNFVVQlFnTUVQU0tLK2phR3hjZjk1MHljazg2TmkrbWdiOVhKaU95UlBEczNxS1daMHJLclh4Mys4NWpRVDI0WGVQWDA4VnRhcEdhRUM1Uk53QUFCMTVKUkVGVWVOcnRtMmR6MnpBTWhrbHIyYklsNzVGNDFYRzg0cGxsMS96L1A2eVhWallFa2lLcGtkNzFycytubmlNZEllSUZDRUFxK2M5Ly9wTVYyd3Y4M21HNW5CNTZmdURhNUM5Q2crbm1WR2FZSDZlWGFVREo5eE1PSnl5WnlUQWszMGx3cmpJZHM4MllmQS91QlZiWDJIRHhTT0dNNXl3TmszNnhldWg5c0xTOEg0c3pZYlJpU1pUTExKRmFxeURkUzJULzlqeHNoVkh3VTl1eHhzZjlYR0xLWTFoQTBMOHdqby9GeUphcjFHOExNbjJ3ODJydmlTRjJIWmVvOERvN2hxajJjejMrQTg1Mlo4c2tXV3l3TTByWnhlZ2k4YTBPcHR0cEw5K1FHQzJTRGI4YzMvdFdxZ2ZwMWhpd1BaQXNMT0lQa1Q2b2wzSHoyeG5jVUdMQUpZdVc3YmlBbmtsYXJyRm96dXJESU9hSE5VMG4velhjdXM4UlJhWFlZNlN5QUpMZmJKenZFR2xrc3FCNXYrdms1RTNrNElZSk1RWFUwOHgvb2puZ3pXdnErSHNnUmZBTTBVaE1hRUgwa1dLb3NCc21HY205SjVBWFVoVGcwNEJvdWVmL0NnRUs4MExOTVRhMlNZcGtZcG9TKy9mRGh4YmJSOTNMaEpiNnV1cXQxbk9MTHVvYnQ4eG1Hem5BSjBycSs1L05pUGtYemViUGZWMXpRTjhMRk5YcFlSYUExaWVUOFdscDFLV1BoTWRiMmxaWDZWc21aenRXdXZmalpxZytCVlVjblRmbGxCMmwzN1E2ckVINTJhR2FtSmJ6Yk9TRW1sb20wVVg5cEoxa0twUVNwN2NZNnhJcDd3eHhDdVFLWUFvMDBUTlZib0V2YnFnc0dSeVppaWtCRkU3dUs3SWxvaTF1NllHcFdHb0twTnZ1eXNSOTB4L1dkYWRJQThETlZuSVowZzNYeWliN2tNTUZvSUl6RWFoR0cyQVRNbDdoSm51c05jQzQ0cUJSRXFtS1dRSlZUVjNjWnpkamF0d3pGUmNyVGhCNGZENXBSeGNLSjhkdERCQkdsZzRiQ1dwMEhsZ2FmcHl4amtNb3Q2UWUyRUhDMlNTcE1WeW5NNkV1aThRWndWalIxWEhSZTNndzl0U0RsTEZqS2RpaVFjMWVIZ2VkNkdkWE5aMTZoR2NCa1JoUWsvbUFpKzlCOUpTOGFBK2NHcjM3WDE0YnpCU2MrNStpYnBVZ3RtTG5JRmZqeHNtZ3hxWkU3bHM4VzFLY0pmWUxWdU1ydmQ4MVlHWlVaWFd2Sjh2UkRsbzVRWTF2b0ViTGM4UFJzakpqR2xDekdQM1drK1RoR1k3TUE2U3BUMXo5OFdsa1BEQTNnRVNuelFKcFVOYU1NTFlhd3g3aGdlSGNJNWhncFRjQUx6WWdNZDVrdzVEZlYzbWd4akpXbzgwbldWTUQ5cEVuNDFLWHVZVkVMVHJJSHVmR3hwRHlKMTBpMHBLR2lyb0lKQWF3QnNqZXZXSnhIN0FKU3pNRDZtTFNzNlI1RUJZNmdxc2ZXWnlWejU5b2NxUXhING8yMmRnQVlBY0x0YkFhQjBpTk94TURiUEZFOXVFNmJBQ3dCbnM3bkJvZGZjbU1rNnVZOVZvNkE3QWFiUkE4SnhMeTA4QUFJalpJWFkwQm9ocGhrQ2VJeE5pQW5tQkFRMmtBWG1qTXFYR01SR0prUU5kOEI0QmRDQXZWZENJeDM0RWVwSVlZMnJwN2lYdUlpZ3NpTVJGaFM0d0NXMi9BR0FYVU9WRWt6L293OU1VODRPZ05nRklPRnRLcmtjak80N3FZQ1MyOUFSN2hDRTVZSktQN1RuZWYxSm5Razlpa055Q0k3dmlBRGV4emFyVHVKblIrcU00Q1J4a1lvZ0c0c1M2elNZZ1hBa29PTHhMcElFUmZEOGdZUm4vY29GR1NnOVc0WGRoWUpMSTJ1Q1lwVXVaNkE1cklrUXQ2TndFbjRkbVNnaG81QSthUzh1c1NkVkY2QXhvVWJvRnBsdVFsOThjb0poSVNwd3picmE2S05WT2dhN1NUc1k0TlQ1a21LS2dFeGJka3JXRmZiOEJKR0dtY1FxaktaamczT29wcHBDWHJqRjcwQmpEWVdtL3p0ZDZzN2NJOWRJSFZ1S2VFNXdWOEthcnd6Y0NBOS9pZGptY1RqTWVwY1pvd0NCakl1Mk5MYndBckVUVUJwOGFXTkE5MjVQT0JWNVVCa0FzMCtCOVlOblVDREtFa2xXMU1UV01BbUNreWhJVjROZjRFTlVhMlZSVXpJcjBCckNKcWkxYStacXZRU08zeFVIOUI4VmEvSkUzSk5rWUdzS2NXdit2UmlRUXpLYWVDUjBWVDFNQUZTWFBDaGdNR0tQbnN3aTdRL2lNc3RBUmhyWEg0K0lUUU1vUWJ4MEpRcDNiNE5CajJBeXZ3Ty9NdFM1ajA5emsxaHIxa0ZibkNSSWxsNWpHNDc4MnlpbzhTYUFJRjFueFJ3SEx3N01JMGE4c0VCb3IzQmVDZUJzdERHNHFGa3JLMEJkNjVrZnVLNWFJOHRMRWFnUldSY3VUZWJWNVlIbkNzam5hNHJwTkMzL0Y3YzRzQnVkVklqbFcwQVZMNm5JdmFMRDlYYUpjcWNLRHIzcHpXNko4dHViTGN3RmRVOWtyL01Vc0lKeTYwbWZtQU9mOEdlaHVERjh6VGU1SmRQSlFpS2w5RS96Yjg3V0hScC94cjBiYlI5d09Oa0JTTFZiNkZCbFdYRXVoamorSncza0hnYWtyb3k2dWlvQlBqVDNQbzNkUjVnZXMvM3c5eEEyYzE3blZVWWV1WFdKcFBVNDZLcndIeWZocnJFeFBPNk5UTURmMXBXRTREY01jcGZ5elljQkp1aUNrRGVEMlROeDk0Ty9Cb2xxaGgyeW5KUS84SDhtY1dDOWpWS2VURDlFSEtXd2R3YTNWRXNoSHNZbzlCMGxMQm5aVUczZnZHRFVuUEszby9STkt5bktGMk5ndXRCZ09xeTFSblErK2RBZVdzUHJSUVh6TWIycVlDbXRaUUUrZG1UeUlQWEZNOG9nWm10OHU0SkNONUdEMXhsZmFpcmw1OStNRVF0WHJlVE40V2lyeEtWMTdWdWExTmxYRmNLTW1OTjJFaXAvYlNEeDJiZm1FNzN2aHdYa3ZxMTdWWDJQOHp5c0xuaUJTRy81bCtlWjhVeW5qQTB0Q3NrOEp4WDU5TW05SlhoM3dQNFVWdnc5czVJTitKTjcyV2s5dXdlY2NpZndHM3YyL1crQWVmNzFzZStadFF4NnI3dmU3eDJQUHJsa1ArOCsveUN6R2k3YUZ6cFBVdEFBQUFBRWxGVGtTdVFtQ0MnO1xuICAgIH1cbiAgfVxufVxuIl19