import { Component, Input, ViewChild } from '@angular/core';
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

  @ViewChild(DecImageMarkerComponent) imgMarker: DecImageMarkerComponent;

  @Input() qaModeActive?: boolean;

  @Input()
  set measures(value: any) {
    if (value) {
      this._measures = {};
      this._measures.modelCubeX = {
        cm: `${Math.round(value.modelCubeX).toFixed(2)} cm`,
        in: `${Math.round(value.modelCubeX * 0.39370).toFixed(2)} in`
      };
      this._measures.referenceCubeX = {
        cm: `${Math.round(value.referenceCubeX).toFixed(2)} cm`,
        in: `${Math.round(value.referenceCubeX * 0.39370).toFixed(2)} in`
      };
      this._measures.modelCubeY = {
        cm: `${Math.round(value.modelCubeY).toFixed(2)} cm`,
        in: `${Math.round(value.modelCubeY * 0.39370).toFixed(2)} in`
      };
      this._measures.referenceCubeY = {
        cm: `${Math.round(value.referenceCubeY).toFixed(2)} cm`,
        in: `${Math.round(value.referenceCubeY * 0.39370).toFixed(2)} in`
      };
      this._measures.modelCubeZ = {
        cm: `${Math.round(value.modelCubeZ).toFixed(2)} cm`,
        in: `${Math.round(value.modelCubeZ * 0.39370).toFixed(2)} in`
      };
      this._measures.referenceCubeZ = {
        cm: `${Math.round(value.referenceCubeZ).toFixed(2)} cm`,
        in: `${Math.round(value.referenceCubeZ * 0.39370).toFixed(2)} in`
      };
    }
  }

  get measures(): any {

    return this._measures;

  }

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

  private _measures: any;

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

    if (this.imageHighlight && this.imageHighlight.file) {

      this.imgExternalLink = this.imageHighlight.file.fileUrl;

    }

  }

  getClass(comment) {
    let cssClass = 'tags-item';

    if (comment.coordinates.length === 2) {
      cssClass += ' type-point';
    } else {
      cssClass += ' type-square';
    }

    if (comment.requestByClient) {
      cssClass += ' client';
    }

    return cssClass;
  }

  deleteMark(target, commentIndex, renderIndex) {
    if (this.images.indexOf(this.imageHighlight) === renderIndex) {
      this.imgMarker.deleteMark(target[commentIndex], commentIndex);
    } else {
      this.images[renderIndex].comments.splice(commentIndex, 1);
    }
  }

}
