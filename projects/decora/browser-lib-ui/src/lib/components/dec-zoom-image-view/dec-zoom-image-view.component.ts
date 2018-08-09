import { Component, OnInit, Input } from '@angular/core';

const ThumborServerHost = 'https://cache-thumbs.decoracontent.com/unsafe'

@Component({
  selector: 'dec-zoom-image-view',
  templateUrl: './dec-zoom-image-view.component.html',
  styleUrls: ['./dec-zoom-image-view.component.scss']
})
export class DecZoomImageViewComponent implements OnInit {

  @Input()
  set decImage(v) {
    if (v !== this.innerImage) {
      this.innerImage = v;
      this.loadImage();
    }
  }

  @Input() 
  set thumbImageSize(v) {
    if (v) {
      this.thumbSize = v;
      this.loadImage();
    }
  }

  // hover | click | toggle | hover-freeze
  @Input() zoomMode: string = 'click';

  @Input() enableScrollZoom: Boolean = true;

  @Input() scrollStepSize: number = 0.1;

  @Input() enableLens: Boolean = false;

  @Input() lensWidth: number = 100;

  @Input() lensHeight: number = 100;

  innerImage: any;
  imagePath: any;
  finalImageUrl: any;
  thumbImage: any;
  thumbSize: any;

  constructor() { }

  ngOnInit() {
  }

  loadImage() {
    if (this.innerImage && this.thumbSize) {
      this.imagePath = this.extractImageUrlFromSysfile();
      this.finalImageUrl = this.innerImage.fileBaseUrl + '.' + this.innerImage.extension;
      this.thumbImage = this.getThumborUrl();
    }
  }

  private extractImageUrlFromSysfile() {
    try {
      return this.innerImage['fileBasePath'] || undefined;
    } catch (error) {
      return undefined;
    }
  }

  private getImageSize(thumbSize: any): string {
    return `${thumbSize.width || 0}x${thumbSize.height || 0}`;
  }

  private getThumborUrl() {
    const size = this.getImageSize(this.thumbSize);
    return `${ThumborServerHost}/${size}/${this.imagePath}`;
  }
}
