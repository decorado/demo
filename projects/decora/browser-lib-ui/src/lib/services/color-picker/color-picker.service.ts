import { Injectable } from '@angular/core';
import { DecScriptLoaderService } from './../script-loader/dec-script-loader.service';
import { fromEvent, Observable } from 'rxjs';
import { DecColorService } from './../color/dec-color.service';

const HTML2CANVAS_SCRIPT_URL = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/0.5.0-beta4/html2canvas.min.js';

@Injectable()
export class ColorPickerService {

  private html2canvas: any;

  private contentBlocker: HTMLDivElement;
  private previewHex: HTMLDivElement;

  private sketchFab: HTMLCanvasElement;
  private overlaySketchFab: HTMLDivElement;

  private existingSketchFabView: HTMLDivElement;

  constructor(private decScriptLoaderService: DecScriptLoaderService, private decColorService: DecColorService) {
    this.decScriptLoaderService.load(HTML2CANVAS_SCRIPT_URL, 'html2canvas').then((res) => {
      this.html2canvas = res;
    });
  }

  start = new Observable((observer) => {

    this._generateContentBloker();
    this._generatePreviewBloker();
    this._workaroundForSketchFabFrames();

    this.html2canvas(document.body).then(canvas => {

      let hex: string;

      this.contentBlocker.style.cursor = `url("${this._getCursorBase64BySize()}"), default`;

      fromEvent(this.contentBlocker, 'mousemove').subscribe((event: MouseEvent) => {

        const lensSize = 30;

        this.previewHex.style.top = `${event.pageY}px`;
        this.previewHex.style.left = `${event.pageX + 40}px`;

        this.previewHex.style.display = 'block';

        const imageData = canvas.getContext('2d').getImageData(event.pageX, event.pageY, lensSize, lensSize).data;
        const totals = { r: 0, g: 0, b: 0 };
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

  private _generateContentBloker() {
    this.contentBlocker = document.createElement('div');
    this.contentBlocker.id = 'contentBlocker';
    this.contentBlocker.style.cursor = 'wait';
    document.body.appendChild(this.contentBlocker);
  }

  private _generatePreviewBloker() {
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

  private _workaroundForSketchFabFrames() {
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

  private _eventInitClick(observer, hex) {
    this.contentBlocker.remove();
    if (this.existingSketchFabView) {
      this.overlaySketchFab.remove();
      this.sketchFab.hidden = false;
    }
    observer.next(hex);
    observer.complete();
  }

  private _getCursorBase64BySize() {
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
