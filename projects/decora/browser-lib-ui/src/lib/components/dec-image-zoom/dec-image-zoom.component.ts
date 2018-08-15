import { Component, OnInit, Input } from '@angular/core';
import { DecImageSize, SystemFileKey } from './../../directives/image/image.directive.models';
import { ThumborServerHost } from './../../directives/image/image.directive.constants';

export type ZoomMode = 'hover' | 'click' | 'toggle' | 'hover-freeze';

@Component({
  selector: 'dec-image-zoom',
  templateUrl: './dec-image-zoom.component.html',
  styleUrls: ['./dec-image-zoom.component.scss']
})
export class DecImageZoomComponent implements OnInit {

  fullImagePath: any;

  fullImageUrl: any;

  resizedImageUrl: any;

  @Input() zoomMode: ZoomMode = 'click';

  @Input() enableScrollZoom = true;

  @Input() scrollStepSize = 0.1;

  @Input() enableLens = true;

  @Input() lensWidth = 100;

  @Input() lensHeight = 100;

  @Input()
  set systemFile(v: SystemFileKey) {
    if (v !== this._systemFile) {
      this._systemFile = v;
      this.loadImage();
    }
  }

  get systemFile(): SystemFileKey {
    return this._systemFile;
  }

  @Input()
  set size(v: DecImageSize) {
    if (v) {
      this._thumbSize = v;
      this.loadImage();
    }
  }

  get size(): DecImageSize {
    return this._thumbSize;
  }

  private _systemFile: SystemFileKey;

  private _thumbSize: DecImageSize;

  constructor() { }

  ngOnInit() {
  }

  loadImage() {
    if (this.systemFile && this.size) {
      this.setFinalImageUrl();
      this.setOriginalImagePath();
      this.setThumborlUrl();
    }
  }

  private setFinalImageUrl() {
    this.fullImageUrl = this.systemFile.fileBaseUrl + '.' + this.systemFile.extension;
    console.log('setFinalImageUrl', this.fullImageUrl);
  }

  private setOriginalImagePath() {
    this.fullImagePath = this.extractImageUrlFromSysfile();
    console.log('setOriginalImagePath', this.fullImagePath);
  }

  private setThumborlUrl() {
    this.resizedImageUrl = this.getThumborUrl();
    console.log('setThumborlUrl', this.resizedImageUrl);
  }

  private extractImageUrlFromSysfile() {
    try {
      return this.systemFile['fileBasePath'] || undefined;
    } catch (error) {
      return undefined;
    }
  }

  private getImageSize(): string {
    return `${this.size.width || 0}x${this.size.height || 0}`;
  }

  private getThumborUrl() {
    const size = this.getImageSize();
    return `${ThumborServerHost}/${size}/${this.fullImagePath}`;
  }
}
