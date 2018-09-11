/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input, ViewChild, ElementRef } from '@angular/core';
var /** @type {?} */ S3Host = 'http://s3.amazonaws.com/decora-platform-1-nv';
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
        else if (this.image && this.image.fileBasePath) {
            return S3Host + "/" + this.image.fileBasePath;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLWltYWdlLXpvb20uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL2RlYy1pbWFnZS16b29tL2RlYy1pbWFnZS16b29tLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFFdkYscUJBQU0sTUFBTSxHQUFHLDhDQUE4QyxDQUFDOztJQXVFNUQ7UUFBQSxpQkFBaUI7O3NCQWZSLEtBQUs7cUJBRU4sQ0FBQzt5QkFFRyxLQUFLO3lCQUNMLElBQUk7dUJBT04sQ0FBQzt1QkFDRCxDQUFDO3dCQVFBO1lBQ1QscUJBQU0sRUFBRSxHQUFHLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDaEQsS0FBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUM7WUFDcEIsS0FBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUM7WUFDcEIscUJBQUksU0FBUyxHQUFHLEtBQUssQ0FBQztZQUN0QixxQkFBSSxTQUFTLEdBQUcsS0FBSyxDQUFDO1lBRXRCLEVBQUUsQ0FBQyxXQUFXLEdBQUcsVUFBQyxDQUFDO2dCQUNqQixFQUFFLENBQUMsQ0FBQyxLQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztvQkFDaEIscUJBQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUM7b0JBQ3RCLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDO29CQUNiLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBRWhCLEtBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLEtBQUksQ0FBQyxPQUFPLENBQUM7b0JBQy9CLEtBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLEtB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LEtBQUs7MkJBV0wsU0FBUyxTQUFDLGdCQUFnQjs7Z0NBbEQ3Qjs7U0F5QmEscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgVmlld0NoaWxkLCBFbGVtZW50UmVmLCBBZnRlclZpZXdJbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmNvbnN0IFMzSG9zdCA9ICdodHRwOi8vczMuYW1hem9uYXdzLmNvbS9kZWNvcmEtcGxhdGZvcm0tMS1udic7XG5cbmV4cG9ydCB0eXBlIFpvb21Nb2RlID0gJ2hvdmVyJyB8ICdjbGljaycgfCAndG9nZ2xlJyB8ICdob3Zlci1mcmVlemUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtaW1hZ2Utem9vbScsXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cImltYWdlaGlnaGxpZ2h0LWNvbnRhaW5lclwiIGZ4TGF5b3V0PVwiY29sdW1uXCIgZnhMYXlvdXRBbGlnbj1cInNwYWNlLWJldHdlZW4gc3RhcnRcIiBmeExheW91dEdhcD1cImdhcHB4XCI+XG4gIDxkaXYgI2ltYWdlQ29udGFpbmVyIGNsYXNzPVwiaW1hZ2VoaWdobGlnaHQtY29udGFpbmVyXCI+XG4gIDwvZGl2PlxuICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyLWltZy1saW5rXCI+XG4gICAgPHNwYW4gW25nQ2xhc3NdPVwieyd6b29tLWluLWFjdGl2ZSc6IGZpbmFsWm9vbSwgJ3pvb20taW4nOiAhZmluYWxab29tfVwiIChjbGljayk9XCJ6b29tSW4oKVwiPlxuICAgICAgPG1hdC1pY29uIGNsYXNzPVwiaWNvbnMtem9vbVwiPmFkZF9jaXJjbGVfb3V0bGluZTwvbWF0LWljb24+XG4gICAgPC9zcGFuPlxuICAgIDxzcGFuIFtuZ0NsYXNzXT1cInsnem9vbS1vdXQtYWN0aXZlJzogIWlzWm9vbSwgJ3pvb20tb3V0JzogaXNab29tfVwiIChjbGljayk9XCJ6b29tT3V0KClcIj5cbiAgICAgIDxtYXQtaWNvbiBjbGFzcz1cImljb25zLXpvb21cIj5yZW1vdmVfY2lyY2xlX291dGxpbmU8L21hdC1pY29uPlxuICAgIDwvc3Bhbj5cbiAgICA8c3BhbiAqbmdJZj1cImltZ0V4dGVybmFsTGlua1wiIGNsYXNzPVwiaW1nLWxpbmtcIj5cbiAgICAgIDxhIGhyZWY9XCJ7eyBpbWdFeHRlcm5hbExpbmsgfX1cIiB0YXJnZXQ9XCJfYmxhbmtcIj57eyAnbGFiZWwuaW1hZ2UtbGluaycgfCB0cmFuc2xhdGUgfX08L2E+XG4gICAgPC9zcGFuPlxuICA8L2Rpdj5cbjwvZGl2PmAsXG4gIHN0eWxlczogW2AuaW1hZ2VoaWdobGlnaHQtY29udGFpbmVye3dpZHRoOjEwMCU7aGVpZ2h0OjEwMCV9LmNvbnRhaW5lci1pbWctbGlua3twb3NpdGlvbjpyZWxhdGl2ZTt3aWR0aDoxMDAlO2hlaWdodDoyMHB4fS56b29tLWlue2N1cnNvcjpwb2ludGVyO2NvbG9yOnJlZDtwb3NpdGlvbjphYnNvbHV0ZTtyaWdodDowfS56b29tLW91dHtjdXJzb3I6cG9pbnRlcjtjb2xvcjpyZWQ7cG9zaXRpb246YWJzb2x1dGU7cmlnaHQ6MjBweH0uem9vbS1pbi1hY3RpdmV7Y29sb3I6Z3JheTtwb3NpdGlvbjphYnNvbHV0ZTtyaWdodDowfS56b29tLW91dC1hY3RpdmV7Y29sb3I6Z3JheTtwb3NpdGlvbjphYnNvbHV0ZTtyaWdodDoyMHB4fS5pY29ucy16b29te2ZvbnQtc2l6ZToxOHB4fS5pbWctbGlua3twb3NpdGlvbjphYnNvbHV0ZTtyaWdodDo1MHB4O2NvbG9yOmdyYXl9LmltZy1saW5rIGF7Zm9udC1zaXplOjEwcHg7cGFkZGluZy10b3A6MnB4fWBdXG59KVxuZXhwb3J0IGNsYXNzIERlY0ltYWdlWm9vbUNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xuXG4gIEBJbnB1dCgpXG4gIHNldCBpbWFnZSh2KSB7XG4gICAgaWYgKHYpIHtcbiAgICAgIHRoaXMuX2ltYWdlID0gdjtcbiAgICAgIHRoaXMubG9hZEhpZ2hMaWdodEltYWdlKCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0IGltYWdlKCkge1xuICAgIHJldHVybiB0aGlzLl9pbWFnZTtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCBzaXplKHYpIHtcbiAgICBpZiAodikge1xuICAgICAgdGhpcy5fc2l6ZSA9IHY7XG4gICAgfVxuICB9XG5cbiAgZ2V0IHNpemUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3NpemU7XG4gIH1cblxuICBAVmlld0NoaWxkKCdpbWFnZUNvbnRhaW5lcicpIGRpdkltYWdlOiBFbGVtZW50UmVmO1xuXG4gIHByaXZhdGUgX2ltYWdlOiBhbnk7XG4gIHByaXZhdGUgX3NpemU6IGFueTtcblxuICBpbWdFeHRlcm5hbExpbms6IHN0cmluZztcbiAgXG4gIC8vIHpvb21cbiAgaXNab29tID0gZmFsc2U7XG4gIGltYWdlU2l6ZVJhdzogYW55O1xuICBzdGVwcyA9IDE7XG4gIHN0ZXBzRGlmZjogYW55O1xuICBmaW5hbFpvb20gPSBmYWxzZTtcbiAgaW1hZ2VTaXplID0gMTAyNDtcblxuICAvLyBwb3NpdGlvbiBiYWNrZ3JvdW5kXG4gIGRlbHRhWDogbnVtYmVyO1xuICBkZWx0YVk6IG51bWJlcjtcbiAgbGFzdE1vdXNlWDogbnVtYmVyO1xuICBsYXN0TW91c2VZOiBudW1iZXI7XG4gIG9mZnNldFggPSAwO1xuICBvZmZzZXRZID0gMDtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmluaXRab29tKCk7XG4gIH1cblxuICBpbml0Wm9vbSA9ICgpID0+IHtcbiAgICBjb25zdCBlbCA9IHRoaXMuZ2V0TmF0aXZlRWxlbWVudCh0aGlzLmRpdkltYWdlKTtcbiAgICB0aGlzLmxhc3RNb3VzZVggPSAwO1xuICAgIHRoaXMubGFzdE1vdXNlWSA9IDA7XG4gICAgbGV0IG1vdXNlZG93biA9IGZhbHNlO1xuICAgIGxldCBtb3VzZW1vdmUgPSBmYWxzZTtcblxuICAgIGVsLm9ubW91c2Vkb3duID0gKGUpID0+IHtcbiAgICAgIGlmICh0aGlzLmlzWm9vbSkge1xuICAgICAgICBjb25zdCBjb29yZHMgPSBnZXRQb3MoZSksXG4gICAgICAgICAgeCA9IGNvb3Jkc1swXSxcbiAgICAgICAgICB5ID0gY29vcmRzWzFdO1xuXG4gICAgICAgIHRoaXMuZGVsdGFYID0geCAtIHRoaXMub2Zmc2V0WDtcbiAgICAgICAgdGhpcy5kZWx0YVkgPSB5IC0gdGhpcy5vZmZzZXRZO1xuICAgICAgICBtb3VzZWRvd24gPSB0cnVlO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHRoaXMubGFzdE1vdXNlWCA9IGUub2Zmc2V0WDtcbiAgICAgIHRoaXMubGFzdE1vdXNlWSA9IGUub2Zmc2V0WTtcbiAgICAgIG1vdXNlZG93biA9IHRydWU7XG4gICAgfVxuXG4gICAgZWwub25tb3VzZW1vdmUgPSAoZSkgPT4ge1xuICAgICAgaWYgKHRoaXMuaXNab29tICYmIG1vdXNlZG93bikge1xuICAgICAgICBjb25zdCBjb29yZHMgPSBnZXRQb3MoZSksXG4gICAgICAgICAgeCA9IGNvb3Jkc1swXSxcbiAgICAgICAgICB5ID0gY29vcmRzWzFdO1xuXG4gICAgICAgIGlmICgoKHggLSB0aGlzLmRlbHRhWCkgKiAoLTEpKSArIGVsLm9mZnNldFdpZHRoIDwgdGhpcy5pbWFnZVNpemUpIHtcbiAgICAgICAgICB0aGlzLm9mZnNldFggPSB4IC0gdGhpcy5kZWx0YVg7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoKCh5IC0gdGhpcy5kZWx0YVkpICogKC0xKSkgKyBlbC5vZmZzZXRXaWR0aCA8IHRoaXMuaW1hZ2VTaXplKSB7XG4gICAgICAgICAgdGhpcy5vZmZzZXRZID0geSAtIHRoaXMuZGVsdGFZO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMub2Zmc2V0WSA+IDApIHtcbiAgICAgICAgICB0aGlzLm9mZnNldFkgPSAwO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLm9mZnNldFggPiAwKSB7XG4gICAgICAgICAgdGhpcy5vZmZzZXRYID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGVsLnN0eWxlLmJhY2tncm91bmRQb3NpdGlvbiA9IHRoaXMub2Zmc2V0WCArICdweCAnICsgdGhpcy5vZmZzZXRZICsgJ3B4JztcblxuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuXG4gICAgZWwub25tb3VzZXVwID0gKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuaXNab29tKSB7XG4gICAgICAgIG1vdXNlZG93biA9IGZhbHNlO1xuICAgICAgICBtb3VzZW1vdmUgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBmdW5jdGlvbiBnZXRQb3MoZSkge1xuICAgICAgY29uc3QgciA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxuICAgICAgICB4ID0gZS5jbGllbnRYIC0gci5sZWZ0LFxuICAgICAgICB5ID0gZS5jbGllbnRZIC0gci50b3A7XG4gICAgICByZXR1cm4gW3gsIHldO1xuICAgIH1cbiAgfVxuXG4gIHpvb21JbigpIHtcbiAgICBpZiAodGhpcy5zdGVwcyA9PT0gMSkge1xuICAgICAgdGhpcy5nZXRTdGVwc0RpZmYoKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuc3RlcHMgPiA0KSB7XG4gICAgICB0aGlzLmZpbmFsWm9vbSA9IHRydWU7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGVsID0gdGhpcy5kaXZJbWFnZS5uYXRpdmVFbGVtZW50O1xuICAgIHRoaXMuaW1hZ2VTaXplICs9IHRoaXMuc3RlcHNEaWZmXG4gICAgZWwuc3R5bGUuYmFja2dyb3VuZFNpemUgPSB0aGlzLmltYWdlU2l6ZSArICdweCc7XG4gICAgdGhpcy5vZmZzZXRYID0gKGVsLm9mZnNldFdpZHRoIC0gdGhpcy5pbWFnZVNpemUpIC8gMjtcbiAgICB0aGlzLm9mZnNldFkgPSAoZWwub2Zmc2V0SGVpZ2h0IC0gdGhpcy5pbWFnZVNpemUpIC8gMjtcbiAgICBlbC5zdHlsZS5iYWNrZ3JvdW5kUG9zaXRpb24gPSB0aGlzLm9mZnNldFggKyAncHggJyArIHRoaXMub2Zmc2V0WSArICdweCc7XG4gICAgdGhpcy5pc1pvb20gPSB0cnVlO1xuICAgIHRoaXMuc3RlcHMrKztcbiAgfVxuXG4gIHpvb21PdXQoKSB7XG4gICAgY29uc3QgZWwgPSB0aGlzLmRpdkltYWdlLm5hdGl2ZUVsZW1lbnQ7XG4gICAgaWYgKHRoaXMuc3RlcHMgPT09IDIpIHtcbiAgICAgIHRoaXMuaW1hZ2VTaXplID0gMTAyNDtcbiAgICAgIGVsLnN0eWxlLmJhY2tncm91bmRTaXplID0gJzEwMCUnO1xuICAgICAgZWwuc3R5bGUuYmFja2dyb3VuZFBvc2l0aW9uID0gJzBweCAwcHgnO1xuICAgICAgdGhpcy5vZmZzZXRYID0gMDtcbiAgICAgIHRoaXMub2Zmc2V0WSA9IDA7XG4gICAgICB0aGlzLmlzWm9vbSA9IGZhbHNlO1xuICAgICAgdGhpcy5zdGVwcyA9IDE7XG4gICAgfSBlbHNlIGlmICh0aGlzLnN0ZXBzID4gMSkge1xuICAgICAgdGhpcy5pbWFnZVNpemUgLT0gdGhpcy5zdGVwc0RpZmY7XG4gICAgICBlbC5zdHlsZS5iYWNrZ3JvdW5kU2l6ZSA9IHRoaXMuaW1hZ2VTaXplICsgJ3B4JztcbiAgICAgIHRoaXMub2Zmc2V0WCA9IChlbC5vZmZzZXRXaWR0aCAtIHRoaXMuaW1hZ2VTaXplKSAvIDI7XG4gICAgICB0aGlzLm9mZnNldFkgPSAoZWwub2Zmc2V0SGVpZ2h0IC0gdGhpcy5pbWFnZVNpemUpIC8gMjtcbiAgICAgIGVsLnN0eWxlLmJhY2tncm91bmRQb3NpdGlvbiA9IHRoaXMub2Zmc2V0WCArICdweCAnICsgdGhpcy5vZmZzZXRZICsgJ3B4JztcbiAgICAgIHRoaXMuc3RlcHMtLTtcbiAgICAgIHRoaXMuZmluYWxab29tID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgZ2V0U3RlcHNEaWZmKCkge1xuICAgIHRoaXMuc3RlcHNEaWZmID0gKHRoaXMuaW1hZ2VTaXplUmF3LndpZHRoIC8gNCk7XG4gIH1cblxuICBnZXROYXRpdmVFbGVtZW50KGRpdkltYWdlKSB7XG4gICAgaWYgKGRpdkltYWdlKSB7XG4gICAgICByZXR1cm4gZGl2SW1hZ2UubmF0aXZlRWxlbWVudDtcbiAgICB9XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLmdldE5hdGl2ZUVsZW1lbnQoZGl2SW1hZ2UpO1xuICAgIH0sIDQwMCk7XG4gIH1cblxuICBsb2FkSGlnaExpZ2h0SW1hZ2UoKSB7XG4gICAgdGhpcy5kaXZJbWFnZS5uYXRpdmVFbGVtZW50LnN0eWxlLmJhY2tncm91bmRTaXplID0gJzEwMCUnO1xuICAgIHRoaXMuZGl2SW1hZ2UubmF0aXZlRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kUG9zaXRpb24gPSAnMHB4IDBweCc7XG4gICAgdGhpcy5kaXZJbWFnZS5uYXRpdmVFbGVtZW50LnN0eWxlLmJhY2tncm91bmRJbWFnZSA9ICcnO1xuICAgIHRoaXMuaXNab29tID0gZmFsc2U7XG4gICAgdGhpcy5kaXZJbWFnZS5uYXRpdmVFbGVtZW50LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnZGVjLXN5c2ZpbGUtYmctbG9hZCcpO1xuICAgIGNvbnN0IGRvd25sb2FkSW1hZ2UgPSBuZXcgSW1hZ2UoKTtcblxuICAgIGRvd25sb2FkSW1hZ2Uub25sb2FkID0gKCkgPT4ge1xuICAgICAgdGhpcy5kaXZJbWFnZS5uYXRpdmVFbGVtZW50LnN0eWxlLmJhY2tncm91bmRJbWFnZSA9ICd1cmwoJyArIGRvd25sb2FkSW1hZ2Uuc3JjICsgJyApJztcbiAgICAgIHRoaXMuZGl2SW1hZ2UubmF0aXZlRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kUmVwZWF0ID0gJ25vLXJlcGVhdCc7XG4gICAgICB0aGlzLmRpdkltYWdlLm5hdGl2ZUVsZW1lbnQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdkZWMtc3lzZmlsZS1iZy1sb2FkJyk7XG4gICAgICB0aGlzLmltZ0V4dGVybmFsTGluayA9IGRvd25sb2FkSW1hZ2Uuc3JjO1xuICAgICAgdGhpcy5pbWFnZVNpemVSYXcgPSB7XG4gICAgICAgIHdpZHRoOiBkb3dubG9hZEltYWdlLndpZHRoLFxuICAgICAgICBoZWlnaHQ6IGRvd25sb2FkSW1hZ2UuaGVpZ2h0XG4gICAgICB9XG4gICAgfTtcblxuICAgIGRvd25sb2FkSW1hZ2Uuc3JjID0gdGhpcy5nZXRJbWFnZVVybCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRJbWFnZVVybCgpIHtcbiAgICBpZiAodGhpcy5pbWFnZSAmJiB0aGlzLmltYWdlLmZpbGVVcmwpIHtcbiAgICAgIHJldHVybiB0aGlzLmltYWdlLmZpbGVVcmw7XG4gICAgfSBlbHNlIGlmICh0aGlzLmltYWdlICYmIHRoaXMuaW1hZ2UuZmlsZUJhc2VQYXRoKSB7XG4gICAgICByZXR1cm4gYCR7UzNIb3N0fS8ke3RoaXMuaW1hZ2UuZmlsZUJhc2VQYXRofWA7XG4gICAgfSAgZWxzZSB7XG4gICAgICByZXR1cm4gJ2RhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBSUFBQUFDQUNBTUFBQUQwNEpINUFBQUFzVkJNVkVVQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFrMndMU0FBQUFPblJTVGxNQUE0VVVCUWdNRVBTS0sramFHeGNmOTUweWNrODZOaSttZ2I5WEppT3lSUERzM3FLV1owcktyWHgzKzg1alFUMjRYZVBYMDhWdGFwR2FFQzVSTndBQUIxNUpSRUZVZU5ydG0yZHoyekFNaGtscjJiSWw3NUY0MVhHODRwbGwxL3ovUDZ5WFZqWUVraUtwa2Q3MXJzK25uaU1kSWVJRkNFQXErYzkvL3BNVjJ3djgzbUc1bkI1NmZ1RGE1QzlDZytubVZHYVlINmVYYVVESjl4TU9KeXlaeVRBazMwbHdyaklkczgyWWZBL3VCVmJYMkhEeFNPR001eXdOazM2eGV1aDlzTFM4SDRzelliUmlTWlRMTEpGYXF5RGRTMlQvOWp4c2hWSHdVOXV4eHNmOVhHTEtZMWhBMEw4d2pvL0Z5SmFyMUc4TE1uMnc4MnJ2aVNGMkhaZW84RG83aHFqMmN6MytBODUyWjhza1dXeXdNMHJaeGVnaThhME9wdHRwTDkrUUdDMlNEYjhjMy90V3FnZnAxaGl3UFpBc0xPSVBrVDZvbDNIejJ4bmNVR0xBSll1VzdiaUFua2xhcnJGb3p1ckRJT2FITlUwbi96WGN1czhSUmFYWVk2U3lBSkxmYkp6dkVHbGtzcUI1dit2azVFM2s0SVlKTVFYVTA4eC9vam5neld2cStIc2dSZkFNMFVoTWFFSDBrV0tvc0JzbUdjbTlKNUFYVWhUZzA0Qm91ZWYvQ2dFSzgwTE5NVGEyU1lwa1lwb1MrL2ZEaHhiYlI5M0xoSmI2dXVxdDFuT0xMdW9idDh4bUd6bkFKMHJxKzUvTmlQa1h6ZWJQZlYxelFOOExGTlhwWVJhQTFpZVQ4V2xwMUtXUGhNZGIybFpYNlZzbVp6dFd1dmZqWnFnK0JWVWNuVGZsbEIybDM3UTZyRUg1MmFHYW1KYnpiT1NFbWxvbTBVWDlwSjFrS3BRU3A3Y1k2eElwN3d4eEN1UUtZQW8wMFROVmJvRXZicWdzR1J5Wmlpa0JGRTd1SzdJbG9pMXU2WUdwV0dvS3BOdnV5c1I5MHgvV2RhZElBOEROVm5JWjBnM1h5aWI3a01NRm9JSXpFYWhHRzJBVE1sN2hKbnVzTmNDNDRxQlJFcW1LV1FKVlRWM2NaemRqYXR3ekZSY3JUaEI0ZkQ1cFJ4Y0tKOGR0REJCR2xnNGJDV3AwSGxnYWZweXhqa01vdDZRZTJFSEMyU1NwTVZ5bk02RXVpOFFad1ZqUjFYSFJlM2d3OXRTRGxMRmpLZGlpUWMxZUhnZWQ2R2RYTloxNmhHY0JrUmhRay9tQWkrOUI5SlM4YUErY0dyMzdYMTRiekJTYys1K2licFVndG1MbklGZmp4c21neHFaRTdsczhXMUtjSmZZTFZ1TXJ2ZDgxWUdaVVpYV3ZKOHZSRGxvNVFZMXZvRWJMYzhQUnNqSmpHbEN6R1AzV2srVGhHWTdNQTZTcFQxejk4V2xrUERBM2dFU256UUpwVU5hTU1MWWF3eDdoZ2VIY0k1aGdwVGNBTHpZZ01kNWt3NURmVjNtZ3hqSldvODBuV1ZNRDlwRW40MUtYdVlWRUxUcklIdWZHeHBEeUoxMGkwcEtHaXJvSUpBYXdCc2pldldKeEg3QUpTek1ENm1MU3M2UjVFQlk2Z3FzZldaeVZ6NTlvY3FReEg0bzIyZGdBWUFjTHRiQWFCMGlOT3hNRGJQRkU5dUU2YkFDd0JuczduQm9kZmNtTWs2dVk5Vm82QTdBYWJSQThKeEx5MDhBQUlqWklYWTBCb2hwaGtDZUl4TmlBbm1CQVEya0FYbWpNcVhHTVJHSmtRTmQ4QjRCZENBdlZkQ0l4MzRFZXBJWVkycnA3aVh1SWlnc2lNUkZoUzR3Q1cyL0FHQVhVT1ZFa3ovb3c5TVU4NE9nTmdGSU9GdEtya2NqTzQ3cVlDUzI5QVI3aENFNVlKS1A3VG5lZjFKblFrOWlrTnlDSTd2aUFEZXh6YXJUdUpuUitxTTRDUnhrWW9nRzRzUzZ6U1lnWEFrb09MeExwSUVSZkQ4Z1lSbi9jb0ZHU2c5VzRYZGhZSkxJMnVDWXBVdVo2QTVySWtRdDZOd0VuNGRtU2dobzVBK2FTOHVzU2RWRjZBeG9VYm9GcGx1UWw5OGNvSmhJU3B3emJyYTZLTlZPZ2E3U1RzWTROVDVrbUtLZ0V4YmRrcldGZmI4QkpHR21jUXFqS1pqZzNPb3BwcENYcmpGNzBCakRZV20venRkNnM3Y0k5ZElIVnVLZUU1d1Y4S2Fyd3pjQ0E5L2lkam1jVGpNZXBjWm93Q0JqSXUyTkxid0FyRVRVQnA4YVdOQTkyNVBPQlY1VUJrQXMwK0I5WU5uVUNES0VrbFcxTVRXTUFtQ2t5aElWNE5mNEVOVWEyVlJVeklyMEJyQ0pxaTFhK1pxdlFTTzN4VUg5QjhWYS9KRTNKTmtZR3NLY1d2K3ZSaVFRekthZUNSMFZUMU1BRlNYUENoZ01HS1Buc3dpN1EvaU1zdEFSaHJYSDQrSVRRTW9RYngwSlFwM2I0TkJqMkF5dndPL010UzVqMDl6azFocjFrRmJuQ1JJbGw1akc0NzgyeWlvOFNhQUlGMW54UndITHc3TUkwYThzRUJvcjNCZUNlQnN0REc0cUZrckswQmQ2NWtmdUs1YUk4dExFYWdSV1JjdVRlYlY1WUhuQ3NqbmE0cnBOQzMvRjdjNHNCdWRWSWpsVzBBVkw2bkl2YUxEOVhhSmNxY0tEcjNwelc2Sjh0dWJMY3dGZFU5a3IvTVVzSUp5NjBtZm1BT2Y4R2VodURGOHpUZTVKZFBKUWlLbDlFL3piODdXSFJwL3hyMGJiUjl3T05rQlNMVmI2RkJsV1hFdWhqaitKdzNrSGdha3JveTZ1aW9CUGpUM1BvM2RSNWdlcy8zdzl4QTJjMTduVlVZZXVYV0pwUFU0Nktyd0h5ZmhyckV4UE82TlRNRGYxcFdFNERjTWNwZnl6WWNCSnVpQ2tEZUQyVE54OTRPL0JvbHFoaDJ5bkpRLzhIOG1jV0M5alZLZVREOUVIS1d3ZHdhM1ZFc2hIc1lvOUIwbExCblpVRzNmdkdEVW5QSzNvL1JOS3luS0YyTmd1dEJnT3F5MVJuUSsrZEFlV3NQclJRWHpNYjJxWUNtdFpRRStkbVR5SVBYRk04b2dabXQ4dTRKQ041R0QxeGxmYWlybDU5K01FUXRYcmVUTjRXaXJ4S1YxN1Z1YTFObFhGY0tNbU5OMkVpcC9iU0R4MmJmbUU3M3Zod1hrdnExN1ZYMlA4enlzTG5pQlNHLzVsK2VaOFV5bmpBMHRDc2s4SnhYNTlNbTlKWGgzd1A0VVZ2dzlzNUlOK0pONzJXazl1d2VjY2lmd0czdjIvVytBZWY3MXNlK1p0UXg2cjd2ZTd4MlBQcmxrUCs4Ky95Q3pHaTdhRnpwUFV0QUFBQUFFbEZUa1N1UW1DQyc7XG4gICAgfVxuICB9XG59XG4iXX0=