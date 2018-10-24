/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { DecScriptLoaderService } from './../script-loader/dec-script-loader.service';
import { fromEvent, Observable } from 'rxjs';
import { DecColorService } from './../color/dec-color.service';
/** @type {?} */
const HTML2CANVAS_SCRIPT_URL = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/0.5.0-beta4/html2canvas.min.js';
export class ColorPickerService {
    /**
     * @param {?} decScriptLoaderService
     * @param {?} decColorService
     */
    constructor(decScriptLoaderService, decColorService) {
        this.decScriptLoaderService = decScriptLoaderService;
        this.decColorService = decColorService;
        this.start = new Observable((observer) => {
            this._generateContentBloker();
            this._generatePreviewBloker();
            this._workaroundForSketchFabFrames();
            this.html2canvas(document.body).then(canvas => {
                /** @type {?} */
                let hex;
                this.contentBlocker.style.cursor = `url("${this._getCursorBase64BySize()}"), default`;
                fromEvent(this.contentBlocker, 'mousemove').subscribe((event) => {
                    /** @type {?} */
                    const lensSize = 30;
                    this.previewHex.style.top = `${event.pageY}px`;
                    this.previewHex.style.left = `${event.pageX + 40}px`;
                    this.previewHex.style.display = 'block';
                    /** @type {?} */
                    const imageData = canvas.getContext('2d').getImageData(event.pageX, event.pageY, lensSize, lensSize).data;
                    /** @type {?} */
                    const totals = { r: 0, g: 0, b: 0 };
                    /** @type {?} */
                    const rgbArrays = { r: [], g: [], b: [] };
                    for (let i = 0; i < imageData.length; i += 4) {
                        rgbArrays.r.push(imageData[i]);
                        rgbArrays.g.push(imageData[i + 1]);
                        rgbArrays.b.push(imageData[i + 2]);
                    }
                    totals.r = Math.floor(rgbArrays.r.reduce((accum, curr) => accum + curr) / (lensSize * lensSize));
                    totals.g = Math.floor(rgbArrays.g.reduce((accum, curr) => accum + curr) / (lensSize * lensSize));
                    totals.b = Math.floor(rgbArrays.b.reduce((accum, curr) => accum + curr) / (lensSize * lensSize));
                    hex = '#' + ('000000' + this.decColorService.rgbToHex(totals.r, totals.g, totals.b)).slice(-6);
                    this.previewHex.innerText = hex;
                });
                fromEvent(this.contentBlocker, 'click').subscribe(() => {
                    this._eventInitClick(observer, hex);
                });
            });
        });
        this.decScriptLoaderService.load(HTML2CANVAS_SCRIPT_URL, 'html2canvas').then((res) => {
            this.html2canvas = res;
        });
    }
    /**
     * @return {?}
     */
    _generateContentBloker() {
        this.contentBlocker = document.createElement('div');
        this.contentBlocker.id = 'contentBlocker';
        this.contentBlocker.style.cursor = 'wait';
        document.body.appendChild(this.contentBlocker);
    }
    /**
     * @return {?}
     */
    _generatePreviewBloker() {
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
    }
    /**
     * @return {?}
     */
    _workaroundForSketchFabFrames() {
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
    }
    /**
     * @param {?} observer
     * @param {?} hex
     * @return {?}
     */
    _eventInitClick(observer, hex) {
        this.contentBlocker.remove();
        if (this.existingSketchFabView) {
            this.overlaySketchFab.remove();
            this.sketchFab.hidden = false;
        }
        observer.next(hex);
        observer.complete();
    }
    /**
     * @return {?}
     */
    _getCursorBase64BySize() {
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
    }
}
ColorPickerService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
ColorPickerService.ctorParameters = () => [
    { type: DecScriptLoaderService },
    { type: DecColorService }
];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sb3ItcGlja2VyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL2NvbG9yLXBpY2tlci9jb2xvci1waWNrZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUN0RixPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUM3QyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sOEJBQThCLENBQUM7O0FBRS9ELE1BQU0sc0JBQXNCLEdBQUcsbUZBQW1GLENBQUM7QUFHbkgsTUFBTTs7Ozs7SUFZSixZQUFvQixzQkFBOEMsRUFBVSxlQUFnQztRQUF4RiwyQkFBc0IsR0FBdEIsc0JBQXNCLENBQXdCO1FBQVUsb0JBQWUsR0FBZixlQUFlLENBQWlCO3FCQU1wRyxJQUFJLFVBQVUsQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFO1lBRWxDLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO1lBQzlCLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO1lBQzlCLElBQUksQ0FBQyw2QkFBNkIsRUFBRSxDQUFDO1lBRXJDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRTs7Z0JBRTVDLElBQUksR0FBRyxDQUFTO2dCQUVoQixJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsUUFBUSxJQUFJLENBQUMsc0JBQXNCLEVBQUUsYUFBYSxDQUFDO2dCQUV0RixTQUFTLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxXQUFXLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxLQUFpQixFQUFF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QUNqRCxJQUFJLENBQUMscUJBQXFCLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQzlELElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztTQUM5Qjs7Ozs7OztJQUdLLGVBQWUsQ0FBQyxRQUFRLEVBQUUsR0FBRztRQUNuQyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQzdCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUM7WUFDL0IsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQy9CLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztTQUMvQjtRQUNELFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbkIsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDOzs7OztJQUdkLHNCQUFzQjtRQUM1QixNQUFNLENBQUMsd0JBQXdCO1lBQzdCLDZCQUE2QjtZQUM3Qiw2QkFBNkI7WUFDN0IsNkJBQTZCO1lBQzdCLDZCQUE2QjtZQUM3Qiw2QkFBNkI7WUFDN0IsNkJBQTZCO1lBQzdCLDZCQUE2QjtZQUM3Qiw2QkFBNkI7WUFDN0IsNkJBQTZCO1lBQzdCLDZCQUE2QjtZQUM3QiwwQkFBMEIsQ0FBQzs7OztZQTlIaEMsVUFBVTs7OztZQU5GLHNCQUFzQjtZQUV0QixlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGVjU2NyaXB0TG9hZGVyU2VydmljZSB9IGZyb20gJy4vLi4vc2NyaXB0LWxvYWRlci9kZWMtc2NyaXB0LWxvYWRlci5zZXJ2aWNlJztcbmltcG9ydCB7IGZyb21FdmVudCwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgRGVjQ29sb3JTZXJ2aWNlIH0gZnJvbSAnLi8uLi9jb2xvci9kZWMtY29sb3Iuc2VydmljZSc7XG5cbmNvbnN0IEhUTUwyQ0FOVkFTX1NDUklQVF9VUkwgPSAnaHR0cHM6Ly9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvaHRtbDJjYW52YXMvMC41LjAtYmV0YTQvaHRtbDJjYW52YXMubWluLmpzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENvbG9yUGlja2VyU2VydmljZSB7XG5cbiAgcHJpdmF0ZSBodG1sMmNhbnZhczogYW55O1xuXG4gIHByaXZhdGUgY29udGVudEJsb2NrZXI6IEhUTUxEaXZFbGVtZW50O1xuICBwcml2YXRlIHByZXZpZXdIZXg6IEhUTUxEaXZFbGVtZW50O1xuXG4gIHByaXZhdGUgc2tldGNoRmFiOiBIVE1MQ2FudmFzRWxlbWVudDtcbiAgcHJpdmF0ZSBvdmVybGF5U2tldGNoRmFiOiBIVE1MRGl2RWxlbWVudDtcblxuICBwcml2YXRlIGV4aXN0aW5nU2tldGNoRmFiVmlldzogSFRNTERpdkVsZW1lbnQ7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBkZWNTY3JpcHRMb2FkZXJTZXJ2aWNlOiBEZWNTY3JpcHRMb2FkZXJTZXJ2aWNlLCBwcml2YXRlIGRlY0NvbG9yU2VydmljZTogRGVjQ29sb3JTZXJ2aWNlKSB7XG4gICAgdGhpcy5kZWNTY3JpcHRMb2FkZXJTZXJ2aWNlLmxvYWQoSFRNTDJDQU5WQVNfU0NSSVBUX1VSTCwgJ2h0bWwyY2FudmFzJykudGhlbigocmVzKSA9PiB7XG4gICAgICB0aGlzLmh0bWwyY2FudmFzID0gcmVzO1xuICAgIH0pO1xuICB9XG5cbiAgc3RhcnQgPSBuZXcgT2JzZXJ2YWJsZSgob2JzZXJ2ZXIpID0+IHtcblxuICAgIHRoaXMuX2dlbmVyYXRlQ29udGVudEJsb2tlcigpO1xuICAgIHRoaXMuX2dlbmVyYXRlUHJldmlld0Jsb2tlcigpO1xuICAgIHRoaXMuX3dvcmthcm91bmRGb3JTa2V0Y2hGYWJGcmFtZXMoKTtcblxuICAgIHRoaXMuaHRtbDJjYW52YXMoZG9jdW1lbnQuYm9keSkudGhlbihjYW52YXMgPT4ge1xuXG4gICAgICBsZXQgaGV4OiBzdHJpbmc7XG5cbiAgICAgIHRoaXMuY29udGVudEJsb2NrZXIuc3R5bGUuY3Vyc29yID0gYHVybChcIiR7dGhpcy5fZ2V0Q3Vyc29yQmFzZTY0QnlTaXplKCl9XCIpLCBkZWZhdWx0YDtcblxuICAgICAgZnJvbUV2ZW50KHRoaXMuY29udGVudEJsb2NrZXIsICdtb3VzZW1vdmUnKS5zdWJzY3JpYmUoKGV2ZW50OiBNb3VzZUV2ZW50KSA9PiB7XG5cbiAgICAgICAgY29uc3QgbGVuc1NpemUgPSAzMDtcblxuICAgICAgICB0aGlzLnByZXZpZXdIZXguc3R5bGUudG9wID0gYCR7ZXZlbnQucGFnZVl9cHhgO1xuICAgICAgICB0aGlzLnByZXZpZXdIZXguc3R5bGUubGVmdCA9IGAke2V2ZW50LnBhZ2VYICsgNDB9cHhgO1xuXG4gICAgICAgIHRoaXMucHJldmlld0hleC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcblxuICAgICAgICBjb25zdCBpbWFnZURhdGEgPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKS5nZXRJbWFnZURhdGEoZXZlbnQucGFnZVgsIGV2ZW50LnBhZ2VZLCBsZW5zU2l6ZSwgbGVuc1NpemUpLmRhdGE7XG4gICAgICAgIGNvbnN0IHRvdGFscyA9IHsgcjogMCwgZzogMCwgYjogMCB9O1xuICAgICAgICBjb25zdCByZ2JBcnJheXMgPSB7IHI6IFtdLCBnOiBbXSwgYjogW10gfTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGltYWdlRGF0YS5sZW5ndGg7IGkgKz0gNCkge1xuICAgICAgICAgIHJnYkFycmF5cy5yLnB1c2goaW1hZ2VEYXRhW2ldKTtcbiAgICAgICAgICByZ2JBcnJheXMuZy5wdXNoKGltYWdlRGF0YVtpICsgMV0pO1xuICAgICAgICAgIHJnYkFycmF5cy5iLnB1c2goaW1hZ2VEYXRhW2kgKyAyXSk7XG4gICAgICAgIH1cblxuICAgICAgICB0b3RhbHMuciA9IE1hdGguZmxvb3IocmdiQXJyYXlzLnIucmVkdWNlKChhY2N1bSwgY3VycikgPT4gYWNjdW0gKyBjdXJyKSAvIChsZW5zU2l6ZSAqIGxlbnNTaXplKSk7XG4gICAgICAgIHRvdGFscy5nID0gTWF0aC5mbG9vcihyZ2JBcnJheXMuZy5yZWR1Y2UoKGFjY3VtLCBjdXJyKSA9PiBhY2N1bSArIGN1cnIpIC8gKGxlbnNTaXplICogbGVuc1NpemUpKTtcbiAgICAgICAgdG90YWxzLmIgPSBNYXRoLmZsb29yKHJnYkFycmF5cy5iLnJlZHVjZSgoYWNjdW0sIGN1cnIpID0+IGFjY3VtICsgY3VycikgLyAobGVuc1NpemUgKiBsZW5zU2l6ZSkpO1xuXG4gICAgICAgIGhleCA9ICcjJyArICgnMDAwMDAwJyArIHRoaXMuZGVjQ29sb3JTZXJ2aWNlLnJnYlRvSGV4KHRvdGFscy5yLCB0b3RhbHMuZywgdG90YWxzLmIpKS5zbGljZSgtNik7XG5cbiAgICAgICAgdGhpcy5wcmV2aWV3SGV4LmlubmVyVGV4dCA9IGhleDtcbiAgICAgIH0pO1xuXG4gICAgICBmcm9tRXZlbnQodGhpcy5jb250ZW50QmxvY2tlciwgJ2NsaWNrJykuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5fZXZlbnRJbml0Q2xpY2sob2JzZXJ2ZXIsIGhleCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgcHJpdmF0ZSBfZ2VuZXJhdGVDb250ZW50Qmxva2VyKCkge1xuICAgIHRoaXMuY29udGVudEJsb2NrZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLmNvbnRlbnRCbG9ja2VyLmlkID0gJ2NvbnRlbnRCbG9ja2VyJztcbiAgICB0aGlzLmNvbnRlbnRCbG9ja2VyLnN0eWxlLmN1cnNvciA9ICd3YWl0JztcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMuY29udGVudEJsb2NrZXIpO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2VuZXJhdGVQcmV2aWV3Qmxva2VyKCkge1xuICAgIHRoaXMucHJldmlld0hleCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMucHJldmlld0hleC5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gICAgdGhpcy5wcmV2aWV3SGV4LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgdGhpcy5wcmV2aWV3SGV4LnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICcjZmZmZmZmJztcbiAgICB0aGlzLnByZXZpZXdIZXguc3R5bGUuY29sb3IgPSAnIzAwMDAwMCc7XG4gICAgdGhpcy5wcmV2aWV3SGV4LnN0eWxlLmJvcmRlciA9ICcycHggc29saWQgIzAwMDAwMCc7XG4gICAgdGhpcy5wcmV2aWV3SGV4LnN0eWxlLmJvcmRlclJhZGl1cyA9ICcycHgnO1xuICAgIHRoaXMucHJldmlld0hleC5zdHlsZS5wYWRkaW5nID0gJzRweCA4cHgnO1xuICAgIHRoaXMucHJldmlld0hleC5zdHlsZS5mb250V2VpZ2h0ID0gJzkwMCc7XG4gICAgdGhpcy5wcmV2aWV3SGV4LnN0eWxlLmZvbnRTaXplID0gJzE4cHgnO1xuICAgIHRoaXMuY29udGVudEJsb2NrZXIuYXBwZW5kQ2hpbGQodGhpcy5wcmV2aWV3SGV4KTtcbiAgfVxuXG4gIHByaXZhdGUgX3dvcmthcm91bmRGb3JTa2V0Y2hGYWJGcmFtZXMoKSB7XG4gICAgdGhpcy5leGlzdGluZ1NrZXRjaEZhYlZpZXcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdkZWMtc2tldGNoZmFiLXZpZXcnKTtcbiAgICBpZiAodGhpcy5leGlzdGluZ1NrZXRjaEZhYlZpZXcpIHtcbiAgICAgIHRoaXMuc2tldGNoRmFiID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZGVjLXNrZXRjaGZhYi12aWV3ICNhcGktZnJhbWUnKTtcbiAgICAgIHRoaXMub3ZlcmxheVNrZXRjaEZhYiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgdGhpcy5vdmVybGF5U2tldGNoRmFiLnN0eWxlLmhlaWdodCA9ICc2MjRweCc7XG4gICAgICB0aGlzLm92ZXJsYXlTa2V0Y2hGYWIuc3R5bGUud2lkdGggPSAnNjI0cHgnO1xuICAgICAgdGhpcy5vdmVybGF5U2tldGNoRmFiLnN0eWxlLmJvcmRlcldpZHRoID0gJzJweCc7XG4gICAgICB0aGlzLm92ZXJsYXlTa2V0Y2hGYWIuc3R5bGUuYm9yZGVyU3R5bGUgPSAnaW5zZXQnO1xuICAgICAgdGhpcy5vdmVybGF5U2tldGNoRmFiLnN0eWxlLmJvcmRlckNvbG9yID0gJ2luaXRpYWwnO1xuICAgICAgdGhpcy5vdmVybGF5U2tldGNoRmFiLnN0eWxlLmJvcmRlckltYWdlID0gJ2luaXRpYWwnO1xuICAgICAgdGhpcy5vdmVybGF5U2tldGNoRmFiLnN0eWxlLmJveFNpemluZyA9ICdib3JkZXItYm94JztcbiAgICAgIHRoaXMub3ZlcmxheVNrZXRjaEZhYi5zdHlsZS5tYXJnaW5Cb3R0b20gPSAnM3B4JztcbiAgICAgIHRoaXMuZXhpc3RpbmdTa2V0Y2hGYWJWaWV3LmFwcGVuZENoaWxkKHRoaXMub3ZlcmxheVNrZXRjaEZhYik7XG4gICAgICB0aGlzLnNrZXRjaEZhYi5oaWRkZW4gPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2V2ZW50SW5pdENsaWNrKG9ic2VydmVyLCBoZXgpIHtcbiAgICB0aGlzLmNvbnRlbnRCbG9ja2VyLnJlbW92ZSgpO1xuICAgIGlmICh0aGlzLmV4aXN0aW5nU2tldGNoRmFiVmlldykge1xuICAgICAgdGhpcy5vdmVybGF5U2tldGNoRmFiLnJlbW92ZSgpO1xuICAgICAgdGhpcy5za2V0Y2hGYWIuaGlkZGVuID0gZmFsc2U7XG4gICAgfVxuICAgIG9ic2VydmVyLm5leHQoaGV4KTtcbiAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0Q3Vyc29yQmFzZTY0QnlTaXplKCkge1xuICAgIHJldHVybiAnZGF0YTppbWFnZS9wbmc7YmFzZTY0LCcgK1xuICAgICAgJ2lWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFDSScgK1xuICAgICAgJ0FBQUFpQ0FZQUFBQTZSd3ZDQUFBQUJITkNTVicgK1xuICAgICAgJ1FJQ0FnSWZBaGtpQUFBQUpGSlJFRlVXSVh0MicgK1xuICAgICAgJ01FSnd6QVFSTkhaNEw3UzBuUmdwNFB0ZUhQSicgK1xuICAgICAgJzVqQVlBbktJRkpoM2tzQ0h6MG9Ib3lCWldNQicgK1xuICAgICAgJ3Rka0RiZXBHWk1TT2dUMlNaaVRoRU9VUTVSRCcgK1xuICAgICAgJ2xFT1VSZERpRzVrenltaDN6TDl2bVRjeVIzQScgK1xuICAgICAgJ0lpSWUxVkY3elB6OGRNUUFBRUFWUld2OWFYZicgK1xuICAgICAgJ2lPR1F6RHlBOTJTaTk2UCArIC80NjAwVHVobCcgK1xuICAgICAgJ3BtSVE1UkRsRU9VUTVSRFZQaDlSRHdCN3pNZycgK1xuICAgICAgJysxTnFyZU1BQUFBQVNVVk9SSzVDWUlJPSc7XG4gIH1cbn1cbiJdfQ==