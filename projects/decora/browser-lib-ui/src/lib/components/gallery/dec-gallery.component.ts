import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CarouselConfig } from './carousel-config';
import { NguCarouselStore } from '@ngu/carousel/src/ngu-carousel/ngu-carousel.interface';

@Component({
  selector: 'dec-gallery',
  templateUrl: './dec-gallery.component.html',
  styleUrls: ['./dec-gallery.component.scss']
})
export class DecGalleryComponent {

  imageHighlight: any;

  activeImage: Element;

  imgExternalLink: string;

  isFirst: boolean;

  isLast: boolean;

  carouselConfig = CarouselConfig;

  index = 0;

  @Input()
  set images(value: any[]) {

    value = value || new Array<any>();

    if (value && (JSON.stringify(value) !== JSON.stringify(this._images))) {

      this.imageHighlight = value[0];

      this._images = value;

      this.setExternalLink();

    }

  }

  get images(): any[] {

    return this._images;

  }

  // ***UPLOAD*** //
  @Input() permitUpload = false;

  @Input() showThumbIndex = false;

  @Input() resolutions: string[] = [];

  @Output() uploaded = new EventEmitter();

  // ***FIM UPLOAD*** //
  private _images: any[] = [];

  constructor() { }

  onSelectImage = ($event, sysFile, i) => {

    if (this.activeImage && this.activeImage !== $event.target) {

      this.activeImage.className = '';

    }

    $event.target.className = 'active';

    this.activeImage = $event.target;

    this.imageHighlight = sysFile;

    this.index = i;

    this.setExternalLink();

  }

  setExternalLink = () => {

    if (this.imageHighlight) {

      this.imgExternalLink = this.imageHighlight.fileUrl;

    }

  }

  onInitDataFn(event: NguCarouselStore) {

    this.setPrevNextCheckers(event.isFirst, event.items >= this.images.length);

  }

  onMoveFn(event: NguCarouselStore) {

    this.setPrevNextCheckers(event.isFirst, event.isLast);

  }

  setPrevNextCheckers(first: boolean, last: boolean) {

    setTimeout(() => {

      this.isFirst = first;

      this.isLast = last;

    }, 0);

  }

  uploadedFunction(event) {
    this.images[this.index] = event;
    this.uploaded.emit({
      sysFile: event,
      index: this.index
    });
  }
}
