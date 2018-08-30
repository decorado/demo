import { Component, Input, ViewChild } from '@angular/core';
import { CarouselConfig } from './../gallery/carousel-config';
import { NguCarouselStore } from '@ngu/carousel/src/ngu-carousel/ngu-carousel.interface';
import { DecImageMarkerComponent } from './../dec-image-marker/dec-image-marker.component';

@Component({
  selector: 'dec-gallery-marks',
  templateUrl: './dec-gallery-marks.component.html',
  styleUrls: ['./dec-gallery-marks.component.scss']
})
export class DecGalleryMarksComponent {

  imageHighlight: any;

  activeImage: Element;

  imgExternalLink: string;

  isFirst: boolean;

  isLast: boolean;

  carouselConfig = CarouselConfig;

  @ViewChild(DecImageMarkerComponent) imgMarker: DecImageMarkerComponent;

  @Input() qaModeActive?: boolean;

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

  private _images: any[] = [];

  constructor() { }

  onSelectImage = ($event, sysFile) => {

    if (this.activeImage && this.activeImage !== $event.target) {

      this.activeImage.className = '';

    }

    $event.target.className = 'active';

    this.activeImage = $event.target;

    this.imageHighlight = sysFile;

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

  getClass(coord) {
    if (coord.length === 2) {
      return 'tags-item type-point';
    } else {
      return 'tags-item type-square';
    }
  }

  deleteMark(target, commentIndex, renderIndex) {
    if (this.images.indexOf(this.imageHighlight) === renderIndex) {
      this.imgMarker.deleteMark(target[commentIndex], commentIndex);
    } else {
      this.images[renderIndex].comments.splice(commentIndex, 1);
    }
  }

}
