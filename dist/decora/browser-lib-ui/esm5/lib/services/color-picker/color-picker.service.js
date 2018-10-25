/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { DecScriptLoaderService } from './../script-loader/dec-script-loader.service';
import { fromEvent, Observable } from 'rxjs';
import { DecColorService } from './../color/dec-color.service';
/** @type {?} */
var HTML2CANVAS_SCRIPT_URL = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/0.5.0-beta4/html2canvas.min.js';
var ColorPickerService = /** @class */ (function () {
    function ColorPickerService(decScriptLoaderService, decColorService) {
        var _this = this;
        this.decScriptLoaderService = decScriptLoaderService;
        this.decColorService = decColorService;
        this.start = new Observable(function (observer) {
            _this._generateContentBloker();
            _this._generatePreviewBloker();
            _this._workaroundForSketchFabFrames();
            _this.html2canvas(document.body).then(function (canvas) {
                /** @type {?} */
                var hex;
                _this.contentBlocker.style.cursor = "url(\"" + _this._getCursorBase64BySize() + "\"), default";
                fromEvent(_this.contentBlocker, 'mousemove').subscribe(function (event) {
                    /** @type {?} */
                    var lensSize = 30;
                    _this.previewHex.style.top = event.pageY + "px";
                    _this.previewHex.style.left = event.pageX + 40 + "px";
                    _this.previewHex.style.display = 'block';
                    /** @type {?} */
                    var imageData = canvas.getContext('2d').getImageData(event.pageX, event.pageY, lensSize, lensSize).data;
                    /** @type {?} */
                    var totals = { r: 0, g: 0, b: 0 };
                    /** @type {?} */
                    var rgbArrays = { r: [], g: [], b: [] };
                    for (var i = 0; i < imageData.length; i += 4) {
                        rgbArrays.r.push(imageData[i]);
                        rgbArrays.g.push(imageData[i + 1]);
                        rgbArrays.b.push(imageData[i + 2]);
                    }
                    totals.r = Math.floor(rgbArrays.r.reduce(function (accum, curr) { return accum + curr; }) / (lensSize * lensSize));
                    totals.g = Math.floor(rgbArrays.g.reduce(function (accum, curr) { return accum + curr; }) / (lensSize * lensSize));
                    totals.b = Math.floor(rgbArrays.b.reduce(function (accum, curr) { return accum + curr; }) / (lensSize * lensSize));
                    hex = '#' + ('000000' + _this.decColorService.rgbToHex(totals.r, totals.g, totals.b)).slice(-6);
                    _this.previewHex.innerText = hex;
                });
                fromEvent(_this.contentBlocker, 'click').subscribe(function () {
                    _this._eventInitClick(observer, hex);
                });
            });
        });
        this.decScriptLoaderService.load(HTML2CANVAS_SCRIPT_URL, 'html2canvas').then(function (res) {
            _this.html2canvas = res;
        });
    }
    /**
     * @return {?}
     */
    ColorPickerService.prototype._generateContentBloker = /**
     * @return {?}
     */
    function () {
        this.contentBlocker = document.createElement('div');
        this.contentBlocker.id = 'contentBlocker';
        this.contentBlocker.style.cursor = 'wait';
        document.body.appendChild(this.contentBlocker);
    };
    /**
     * @return {?}
     */
    ColorPickerService.prototype._generatePreviewBloker = /**
     * @return {?}
     */
    function () {
        this.previewHex = document.createElement('div');
        this.previewHex.style.position = 'absolute';
        this.previewHex.style.display = 'none';
        this.previewHex.style.backgroundColor = '#ffffff';
        this.previewHex.style.color = '#000000';
        this.previewHex.style.border = '2px solid #000000';
        this.previewHex.style.borderRadius = '2px';
        this.previewHex.style.padding = '4px 8px';
        this.previewHex.style.fontWeight = '900';
        this.previewHex.style.fontSize = '18px';
        this.contentBlocker.appendChild(this.previewHex);
    };
    /**
     * @return {?}
     */
    ColorPickerService.prototype._workaroundForSketchFabFrames = /**
     * @return {?}
     */
    function () {
        this.existingSketchFabView = document.querySelector('dec-sketchfab-view');
        if (this.existingSketchFabView) {
            this.sketchFab = document.querySelector('dec-sketchfab-view #api-frame');
            this.overlaySketchFab = document.createElement('div');
            this.overlaySketchFab.style.height = '624px';
            this.overlaySketchFab.style.width = '624px';
            this.overlaySketchFab.style.borderWidth = '2px';
            this.overlaySketchFab.style.borderStyle = 'inset';
            this.overlaySketchFab.style.borderColor = 'initial';
            this.overlaySketchFab.style.borderImage = 'initial';
            this.overlaySketchFab.style.boxSizing = 'border-box';
            this.overlaySketchFab.style.marginBottom = '3px';
            this.existingSketchFabView.appendChild(this.overlaySketchFab);
            this.sketchFab.hidden = true;
        }
    };
    /**
     * @param {?} observer
     * @param {?} hex
     * @return {?}
     */
    ColorPickerService.prototype._eventInitClick = /**
     * @param {?} observer
     * @param {?} hex
     * @return {?}
     */
    function (observer, hex) {
        this.contentBlocker.remove();
        if (this.existingSketchFabView) {
            this.overlaySketchFab.remove();
            this.sketchFab.hidden = false;
        }
        observer.next(hex);
        observer.complete();
    };
    /**
     * @return {?}
     */
    ColorPickerService.prototype._getCursorBase64BySize = /**
     * @return {?}
     */
    function () {
        return 'data:image/png;base64,' +
            'iVBORw0KGgoAAAANSUhEUgAAACI' +
            'AAAAiCAYAAAA6RwvCAAAABHNCSV' +
            'QICAgIfAhkiAAAAJFJREFUWIXt2' +
            'MEJwzAQRNHZ4L7S0nRgp4PteHPJ' +
            '5jAYAnKIFJh3ksCHz0oHoyBZWMB' +
            'tdkDbepGZMSOgT2SZiThEOUQ5RD' +
            'lEOURdDiG5kzymh3zL9vmTcyR3A' +
            'IiIe1VF7zPz8dMQAAEAVRWv9aXf' +
            'iOGQzDyA92Si96P + /4600Tuhl' +
            'pmIQ5RDlEOUQ5RDVPh9RDwB7zMg' +
            '+1NqreMAAAAASUVORK5CYII=';
    };
    ColorPickerService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    ColorPickerService.ctorParameters = function () { return [
        { type: DecScriptLoaderService },
        { type: DecColorService }
    ]; };
    return ColorPickerService;
}());
export { ColorPickerService };
if (false) {
    /** @type {?} */
    ColorPickerService.prototype.html2canvas;
    /** @type {?} */
    ColorPickerService.prototype.contentBlocker;
    /** @type {?} */
    ColorPickerService.prototype.previewHex;
    /** @type {?} */
    ColorPickerService.prototype.sketchFab;
    /** @type {?} */
    ColorPickerService.prototype.overlaySketchFab;
    /** @type {?} */
    ColorPickerService.prototype.existingSketchFabView;
    /** @type {?} */
    ColorPickerService.prototype.start;
    /** @type {?} */
    ColorPickerService.prototype.decScriptLoaderService;
    /** @type {?} */
    ColorPickerService.prototype.decColorService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sb3ItcGlja2VyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL2NvbG9yLXBpY2tlci9jb2xvci1waWNrZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUN0RixPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUM3QyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sOEJBQThCLENBQUM7O0FBRS9ELElBQU0sc0JBQXNCLEdBQUcsbUZBQW1GLENBQUM7O0lBZWpILDRCQUFvQixzQkFBOEMsRUFBVSxlQUFnQztRQUE1RyxpQkFJQztRQUptQiwyQkFBc0IsR0FBdEIsc0JBQXNCLENBQXdCO1FBQVUsb0JBQWUsR0FBZixlQUFlLENBQWlCO3FCQU1wRyxJQUFJLFVBQVUsQ0FBQyxVQUFDLFFBQVE7WUFFOUIsS0FBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7WUFDOUIsS0FBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7WUFDOUIsS0FBSSxDQUFDLDZCQUE2QixFQUFFLENBQUM7WUFFckMsS0FBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsTUFBTTs7Z0JBRXpDLElBQUksR0FBRyxDQUFTO2dCQUVoQixLQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsV0FBUSxLQUFJLENBQUMsc0JBQXNCLEVBQUUsaUJBQWEsQ0FBQztnQkFFdEYsU0FBUyxDQUFDLEtBQUksQ0FBQyxjQUFjLEVBQUUsV0FBVyxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUMsS0FBaUI7O29CQUV0RSxJQUFNLFFBQVEs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VyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQzlELElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztTQUM5Qjs7Ozs7OztJQUdLLDRDQUFlOzs7OztjQUFDLFFBQVEsRUFBRSxHQUFHO1FBQ25DLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDN0IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQztZQUMvQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDL0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1NBQy9CO1FBQ0QsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNuQixRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7Ozs7O0lBR2QsbURBQXNCOzs7O1FBQzVCLE1BQU0sQ0FBQyx3QkFBd0I7WUFDN0IsNkJBQTZCO1lBQzdCLDZCQUE2QjtZQUM3Qiw2QkFBNkI7WUFDN0IsNkJBQTZCO1lBQzdCLDZCQUE2QjtZQUM3Qiw2QkFBNkI7WUFDN0IsNkJBQTZCO1lBQzdCLDZCQUE2QjtZQUM3Qiw2QkFBNkI7WUFDN0IsNkJBQTZCO1lBQzdCLDBCQUEwQixDQUFDOzs7Z0JBOUhoQyxVQUFVOzs7O2dCQU5GLHNCQUFzQjtnQkFFdEIsZUFBZTs7NkJBSHhCOztTQVFhLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERlY1NjcmlwdExvYWRlclNlcnZpY2UgfSBmcm9tICcuLy4uL3NjcmlwdC1sb2FkZXIvZGVjLXNjcmlwdC1sb2FkZXIuc2VydmljZSc7XG5pbXBvcnQgeyBmcm9tRXZlbnQsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IERlY0NvbG9yU2VydmljZSB9IGZyb20gJy4vLi4vY29sb3IvZGVjLWNvbG9yLnNlcnZpY2UnO1xuXG5jb25zdCBIVE1MMkNBTlZBU19TQ1JJUFRfVVJMID0gJ2h0dHBzOi8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL2h0bWwyY2FudmFzLzAuNS4wLWJldGE0L2h0bWwyY2FudmFzLm1pbi5qcyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDb2xvclBpY2tlclNlcnZpY2Uge1xuXG4gIHByaXZhdGUgaHRtbDJjYW52YXM6IGFueTtcblxuICBwcml2YXRlIGNvbnRlbnRCbG9ja2VyOiBIVE1MRGl2RWxlbWVudDtcbiAgcHJpdmF0ZSBwcmV2aWV3SGV4OiBIVE1MRGl2RWxlbWVudDtcblxuICBwcml2YXRlIHNrZXRjaEZhYjogSFRNTENhbnZhc0VsZW1lbnQ7XG4gIHByaXZhdGUgb3ZlcmxheVNrZXRjaEZhYjogSFRNTERpdkVsZW1lbnQ7XG5cbiAgcHJpdmF0ZSBleGlzdGluZ1NrZXRjaEZhYlZpZXc6IEhUTUxEaXZFbGVtZW50O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZGVjU2NyaXB0TG9hZGVyU2VydmljZTogRGVjU2NyaXB0TG9hZGVyU2VydmljZSwgcHJpdmF0ZSBkZWNDb2xvclNlcnZpY2U6IERlY0NvbG9yU2VydmljZSkge1xuICAgIHRoaXMuZGVjU2NyaXB0TG9hZGVyU2VydmljZS5sb2FkKEhUTUwyQ0FOVkFTX1NDUklQVF9VUkwsICdodG1sMmNhbnZhcycpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgdGhpcy5odG1sMmNhbnZhcyA9IHJlcztcbiAgICB9KTtcbiAgfVxuXG4gIHN0YXJ0ID0gbmV3IE9ic2VydmFibGUoKG9ic2VydmVyKSA9PiB7XG5cbiAgICB0aGlzLl9nZW5lcmF0ZUNvbnRlbnRCbG9rZXIoKTtcbiAgICB0aGlzLl9nZW5lcmF0ZVByZXZpZXdCbG9rZXIoKTtcbiAgICB0aGlzLl93b3JrYXJvdW5kRm9yU2tldGNoRmFiRnJhbWVzKCk7XG5cbiAgICB0aGlzLmh0bWwyY2FudmFzKGRvY3VtZW50LmJvZHkpLnRoZW4oY2FudmFzID0+IHtcblxuICAgICAgbGV0IGhleDogc3RyaW5nO1xuXG4gICAgICB0aGlzLmNvbnRlbnRCbG9ja2VyLnN0eWxlLmN1cnNvciA9IGB1cmwoXCIke3RoaXMuX2dldEN1cnNvckJhc2U2NEJ5U2l6ZSgpfVwiKSwgZGVmYXVsdGA7XG5cbiAgICAgIGZyb21FdmVudCh0aGlzLmNvbnRlbnRCbG9ja2VyLCAnbW91c2Vtb3ZlJykuc3Vic2NyaWJlKChldmVudDogTW91c2VFdmVudCkgPT4ge1xuXG4gICAgICAgIGNvbnN0IGxlbnNTaXplID0gMzA7XG5cbiAgICAgICAgdGhpcy5wcmV2aWV3SGV4LnN0eWxlLnRvcCA9IGAke2V2ZW50LnBhZ2VZfXB4YDtcbiAgICAgICAgdGhpcy5wcmV2aWV3SGV4LnN0eWxlLmxlZnQgPSBgJHtldmVudC5wYWdlWCArIDQwfXB4YDtcblxuICAgICAgICB0aGlzLnByZXZpZXdIZXguc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG5cbiAgICAgICAgY29uc3QgaW1hZ2VEYXRhID0gY2FudmFzLmdldENvbnRleHQoJzJkJykuZ2V0SW1hZ2VEYXRhKGV2ZW50LnBhZ2VYLCBldmVudC5wYWdlWSwgbGVuc1NpemUsIGxlbnNTaXplKS5kYXRhO1xuICAgICAgICBjb25zdCB0b3RhbHMgPSB7IHI6IDAsIGc6IDAsIGI6IDAgfTtcbiAgICAgICAgY29uc3QgcmdiQXJyYXlzID0geyByOiBbXSwgZzogW10sIGI6IFtdIH07XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbWFnZURhdGEubGVuZ3RoOyBpICs9IDQpIHtcbiAgICAgICAgICByZ2JBcnJheXMuci5wdXNoKGltYWdlRGF0YVtpXSk7XG4gICAgICAgICAgcmdiQXJyYXlzLmcucHVzaChpbWFnZURhdGFbaSArIDFdKTtcbiAgICAgICAgICByZ2JBcnJheXMuYi5wdXNoKGltYWdlRGF0YVtpICsgMl0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdG90YWxzLnIgPSBNYXRoLmZsb29yKHJnYkFycmF5cy5yLnJlZHVjZSgoYWNjdW0sIGN1cnIpID0+IGFjY3VtICsgY3VycikgLyAobGVuc1NpemUgKiBsZW5zU2l6ZSkpO1xuICAgICAgICB0b3RhbHMuZyA9IE1hdGguZmxvb3IocmdiQXJyYXlzLmcucmVkdWNlKChhY2N1bSwgY3VycikgPT4gYWNjdW0gKyBjdXJyKSAvIChsZW5zU2l6ZSAqIGxlbnNTaXplKSk7XG4gICAgICAgIHRvdGFscy5iID0gTWF0aC5mbG9vcihyZ2JBcnJheXMuYi5yZWR1Y2UoKGFjY3VtLCBjdXJyKSA9PiBhY2N1bSArIGN1cnIpIC8gKGxlbnNTaXplICogbGVuc1NpemUpKTtcblxuICAgICAgICBoZXggPSAnIycgKyAoJzAwMDAwMCcgKyB0aGlzLmRlY0NvbG9yU2VydmljZS5yZ2JUb0hleCh0b3RhbHMuciwgdG90YWxzLmcsIHRvdGFscy5iKSkuc2xpY2UoLTYpO1xuXG4gICAgICAgIHRoaXMucHJldmlld0hleC5pbm5lclRleHQgPSBoZXg7XG4gICAgICB9KTtcblxuICAgICAgZnJvbUV2ZW50KHRoaXMuY29udGVudEJsb2NrZXIsICdjbGljaycpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuX2V2ZW50SW5pdENsaWNrKG9ic2VydmVyLCBoZXgpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIHByaXZhdGUgX2dlbmVyYXRlQ29udGVudEJsb2tlcigpIHtcbiAgICB0aGlzLmNvbnRlbnRCbG9ja2VyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy5jb250ZW50QmxvY2tlci5pZCA9ICdjb250ZW50QmxvY2tlcic7XG4gICAgdGhpcy5jb250ZW50QmxvY2tlci5zdHlsZS5jdXJzb3IgPSAnd2FpdCc7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLmNvbnRlbnRCbG9ja2VyKTtcbiAgfVxuXG4gIHByaXZhdGUgX2dlbmVyYXRlUHJldmlld0Jsb2tlcigpIHtcbiAgICB0aGlzLnByZXZpZXdIZXggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLnByZXZpZXdIZXguc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgIHRoaXMucHJldmlld0hleC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIHRoaXMucHJldmlld0hleC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnI2ZmZmZmZic7XG4gICAgdGhpcy5wcmV2aWV3SGV4LnN0eWxlLmNvbG9yID0gJyMwMDAwMDAnO1xuICAgIHRoaXMucHJldmlld0hleC5zdHlsZS5ib3JkZXIgPSAnMnB4IHNvbGlkICMwMDAwMDAnO1xuICAgIHRoaXMucHJldmlld0hleC5zdHlsZS5ib3JkZXJSYWRpdXMgPSAnMnB4JztcbiAgICB0aGlzLnByZXZpZXdIZXguc3R5bGUucGFkZGluZyA9ICc0cHggOHB4JztcbiAgICB0aGlzLnByZXZpZXdIZXguc3R5bGUuZm9udFdlaWdodCA9ICc5MDAnO1xuICAgIHRoaXMucHJldmlld0hleC5zdHlsZS5mb250U2l6ZSA9ICcxOHB4JztcbiAgICB0aGlzLmNvbnRlbnRCbG9ja2VyLmFwcGVuZENoaWxkKHRoaXMucHJldmlld0hleCk7XG4gIH1cblxuICBwcml2YXRlIF93b3JrYXJvdW5kRm9yU2tldGNoRmFiRnJhbWVzKCkge1xuICAgIHRoaXMuZXhpc3RpbmdTa2V0Y2hGYWJWaWV3ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZGVjLXNrZXRjaGZhYi12aWV3Jyk7XG4gICAgaWYgKHRoaXMuZXhpc3RpbmdTa2V0Y2hGYWJWaWV3KSB7XG4gICAgICB0aGlzLnNrZXRjaEZhYiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2RlYy1za2V0Y2hmYWItdmlldyAjYXBpLWZyYW1lJyk7XG4gICAgICB0aGlzLm92ZXJsYXlTa2V0Y2hGYWIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIHRoaXMub3ZlcmxheVNrZXRjaEZhYi5zdHlsZS5oZWlnaHQgPSAnNjI0cHgnO1xuICAgICAgdGhpcy5vdmVybGF5U2tldGNoRmFiLnN0eWxlLndpZHRoID0gJzYyNHB4JztcbiAgICAgIHRoaXMub3ZlcmxheVNrZXRjaEZhYi5zdHlsZS5ib3JkZXJXaWR0aCA9ICcycHgnO1xuICAgICAgdGhpcy5vdmVybGF5U2tldGNoRmFiLnN0eWxlLmJvcmRlclN0eWxlID0gJ2luc2V0JztcbiAgICAgIHRoaXMub3ZlcmxheVNrZXRjaEZhYi5zdHlsZS5ib3JkZXJDb2xvciA9ICdpbml0aWFsJztcbiAgICAgIHRoaXMub3ZlcmxheVNrZXRjaEZhYi5zdHlsZS5ib3JkZXJJbWFnZSA9ICdpbml0aWFsJztcbiAgICAgIHRoaXMub3ZlcmxheVNrZXRjaEZhYi5zdHlsZS5ib3hTaXppbmcgPSAnYm9yZGVyLWJveCc7XG4gICAgICB0aGlzLm92ZXJsYXlTa2V0Y2hGYWIuc3R5bGUubWFyZ2luQm90dG9tID0gJzNweCc7XG4gICAgICB0aGlzLmV4aXN0aW5nU2tldGNoRmFiVmlldy5hcHBlbmRDaGlsZCh0aGlzLm92ZXJsYXlTa2V0Y2hGYWIpO1xuICAgICAgdGhpcy5za2V0Y2hGYWIuaGlkZGVuID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9ldmVudEluaXRDbGljayhvYnNlcnZlciwgaGV4KSB7XG4gICAgdGhpcy5jb250ZW50QmxvY2tlci5yZW1vdmUoKTtcbiAgICBpZiAodGhpcy5leGlzdGluZ1NrZXRjaEZhYlZpZXcpIHtcbiAgICAgIHRoaXMub3ZlcmxheVNrZXRjaEZhYi5yZW1vdmUoKTtcbiAgICAgIHRoaXMuc2tldGNoRmFiLmhpZGRlbiA9IGZhbHNlO1xuICAgIH1cbiAgICBvYnNlcnZlci5uZXh0KGhleCk7XG4gICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgfVxuXG4gIHByaXZhdGUgX2dldEN1cnNvckJhc2U2NEJ5U2l6ZSgpIHtcbiAgICByZXR1cm4gJ2RhdGE6aW1hZ2UvcG5nO2Jhc2U2NCwnICtcbiAgICAgICdpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBQ0knICtcbiAgICAgICdBQUFBaUNBWUFBQUE2Und2Q0FBQUFCSE5DU1YnICtcbiAgICAgICdRSUNBZ0lmQWhraUFBQUFKRkpSRUZVV0lYdDInICtcbiAgICAgICdNRUp3ekFRUk5IWjRMN1MwblJncDRQdGVIUEonICtcbiAgICAgICc1akFZQW5LSUZKaDNrc0NIejBvSG95QlpXTUInICtcbiAgICAgICd0ZGtEYmVwR1pNU09nVDJTWmlUaEVPVVE1UkQnICtcbiAgICAgICdsRU9VUmREaUc1a3p5bWgzekw5dm1UY3lSM0EnICtcbiAgICAgICdJaUllMVZGN3pQejhkTVFBQUVBVlJXdjlhWGYnICtcbiAgICAgICdpT0dRekR5QTkyU2k5NlAgKyAvNDYwMFR1aGwnICtcbiAgICAgICdwbUlRNVJEbEVPVVE1UkRWUGg5UkR3Qjd6TWcnICtcbiAgICAgICcrMU5xcmVNQUFBQUFTVVZPUks1Q1lJST0nO1xuICB9XG59XG4iXX0=