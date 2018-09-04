import { Component, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

const S3Host = 'http://s3.amazonaws.com/decora-platform-1-nv';

export type ZoomMode = 'hover' | 'click' | 'toggle' | 'hover-freeze';

@Component({
  selector: 'dec-image-zoom',
  templateUrl: './dec-image-zoom.component.html',
  styleUrls: ['./dec-image-zoom.component.scss']
})
export class DecImageZoomComponent implements AfterViewInit {

  @Input()
  set image(v) {
    if (v) {
      this._image = v;
      this.loadHighLightImage();
    }
  }

  get image() {
    return this._image;
  }

  @Input()
  set size(v) {
    if (v) {
      this._size = v;
    }
  }

  get size() {
    return this._size;
  }

  @ViewChild('imageContainer') divImage: ElementRef;

  private _image: any;
  private _size: any;

  imgExternalLink: string;
  
  // zoom
  isZoom = false;
  imageSizeRaw: any;
  steps = 1;
  stepsDiff: any;
  finalZoom = false;
  imageSize = 1024;

  // position background
  deltaX: number;
  deltaY: number;
  lastMouseX: number;
  lastMouseY: number;
  offsetX = 0;
  offsetY = 0;

  constructor() { }

  ngAfterViewInit(): void {
    this.initZoom();
  }

  initZoom = () => {
    const el = this.getNativeElement(this.divImage);
    this.lastMouseX = 0;
    this.lastMouseY = 0;
    let mousedown = false;
    let mousemove = false;

    el.onmousedown = (e) => {
      if (this.isZoom) {
        const coords = getPos(e),
          x = coords[0],
          y = coords[1];

        this.deltaX = x - this.offsetX;
        this.deltaY = y - this.offsetY;
        mousedown = true;
        return;
      }

      this.lastMouseX = e.offsetX;
      this.lastMouseY = e.offsetY;
      mousedown = true;
    }

    el.onmousemove = (e) => {
      if (this.isZoom && mousedown) {
        const coords = getPos(e),
          x = coords[0],
          y = coords[1];

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
    }

    el.onmouseup = () => {
      if (this.isZoom) {
        mousedown = false;
        mousemove = false;
        return;
      }
    };

    function getPos(e) {
      const r = el.getBoundingClientRect(),
        x = e.clientX - r.left,
        y = e.clientY - r.top;
      return [x, y];
    }
  }

  zoomIn() {
    if (this.steps === 1) {
      this.getStepsDiff();
    }
    if (this.steps > 4) {
      this.finalZoom = true;
      return;
    }
    const el = this.divImage.nativeElement;
    this.imageSize += this.stepsDiff
    el.style.backgroundSize = this.imageSize + 'px';
    this.offsetX = (el.offsetWidth - this.imageSize) / 2;
    this.offsetY = (el.offsetHeight - this.imageSize) / 2;
    el.style.backgroundPosition = this.offsetX + 'px ' + this.offsetY + 'px';
    this.isZoom = true;
    this.steps++;
  }

  zoomOut() {
    const el = this.divImage.nativeElement;
    if (this.steps === 2) {
      this.imageSize = 1024;
      el.style.backgroundSize = '100%';
      el.style.backgroundPosition = '0px 0px';
      this.offsetX = 0;
      this.offsetY = 0;
      this.isZoom = false;
      this.steps = 1;
    } else if (this.steps > 1) {
      this.imageSize -= this.stepsDiff;
      el.style.backgroundSize = this.imageSize + 'px';
      this.offsetX = (el.offsetWidth - this.imageSize) / 2;
      this.offsetY = (el.offsetHeight - this.imageSize) / 2;
      el.style.backgroundPosition = this.offsetX + 'px ' + this.offsetY + 'px';
      this.steps--;
      this.finalZoom = false;
    }
  }

  getStepsDiff() {
    this.stepsDiff = (this.imageSizeRaw.width / 4);
  }

  getNativeElement(divImage) {
    if (divImage) {
      return divImage.nativeElement;
    }
    setTimeout(() => {
      this.getNativeElement(divImage);
    }, 400);
  }

  loadHighLightImage() {
    this.divImage.nativeElement.style.backgroundSize = '100%';
    this.divImage.nativeElement.style.backgroundPosition = '0px 0px';
    this.divImage.nativeElement.style.backgroundImage = '';
    this.isZoom = false;
    this.divImage.nativeElement.parentElement.classList.add('dec-sysfile-bg-load');
    const downloadImage = new Image();

    downloadImage.onload = () => {
      this.divImage.nativeElement.style.backgroundImage = 'url(' + downloadImage.src + ' )';
      this.divImage.nativeElement.style.backgroundRepeat = 'no-repeat';
      this.divImage.nativeElement.parentElement.classList.remove('dec-sysfile-bg-load');
      this.imgExternalLink = downloadImage.src;
      this.imageSizeRaw = {
        width: downloadImage.width,
        height: downloadImage.height
      }
    };

    downloadImage.src = this.getImageUrl();
  }

  private getImageUrl() {
    if (this.image && this.image.fileUrl) {
      return this.image.fileUrl;
    } else if (this.image && this.image.fileBasePath) {
      return `${S3Host}/${this.image.fileBasePath}`;
    }  else {
      return 'data:image/png;base64,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';
    }
  }
}
