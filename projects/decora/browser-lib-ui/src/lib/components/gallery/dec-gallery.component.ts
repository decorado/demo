import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'dec-gallery',
  templateUrl: './dec-gallery.component.html',
  styleUrls: ['./dec-gallery.component.scss']
})
export class DecGalleryComponent {

  imageHighlight: any;

  activeImage: Element;

  imgExternalLink: string;

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

  uploadedFunction(event) {
    this.images[this.index] = event;
    this.uploaded.emit({
      sysFile: event,
      index: this.index
    });
  }
}
