import { Directive, Input, ViewContainerRef, AfterViewInit, OnInit } from '@angular/core';
import { DecImageSize, SystemFileKey } from './image.directive.models';
import { TransparentImage, ThumborServerHost, ErrorImage, S3Host } from './image.directive.constants';

@Directive({
  selector: '[decImage]'
})
export class DecImageDirective implements OnInit, AfterViewInit {

  containerElement: HTMLElement;

  errorOnLoad = false;

  @Input()
  set decImage(v: SystemFileKey | string) {
    if (v !== this.innerImage) {
      this.innerImage = v;

      if (this.viewInitialized) {
        this.loadImage();
      }
    }
  }

  @Input() decImageSize: DecImageSize;

  // Defines if white margins should be cropped
  @Input() trim: boolean;

  // Defines if the image should be cropped or fit the size respectin the aspect ratio
  @Input() fitIn: boolean;

  // Ged redimensioned image from thumbor image resize service
  @Input() thumborize = true;

  private containerElementType: 'IMG' | 'NOT-IMG';

  private innerImage: SystemFileKey | string = TransparentImage;

  private imagePath: string;

  private finalImageUrl: string;

  private viewInitialized: boolean;

  private imageData;

  constructor(private viewContainerRef: ViewContainerRef) { }

  ngOnInit() {
    this.detectContainerElement();
    this.setElementWidth();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.viewInitialized = true;
      this.loadImage();
    });
  }

  private detectContainerElement() {
    this.containerElement = this.viewContainerRef.element.nativeElement;
    this.containerElementType = this.containerElement.tagName === 'IMG' ? 'IMG' : 'NOT-IMG';
  }

  private loadImage() {

    if (typeof this.innerImage === 'string') {

      this.finalImageUrl = this.innerImage;

    } else {

      this.imagePath = this.extractImageUrlFromSysfile();

      if (this.imagePath) {

        this.finalImageUrl = this.getFinalUrl();

      } else {

        this.finalImageUrl = ErrorImage;

      }

    }

    this.tryToLoadImage();

  }

  private extractImageUrlFromSysfile() {
    try {
      return this.innerImage['fileBasePath'] || undefined;
    } catch (error) {
      return undefined;
    }
  }

  private getFinalUrl() {

    if (this.thumborize) {

      return this.getThumborUrl();

    } else {

      return this.getS3Url();

    }

  }

  private getS3Url() {
    return `${S3Host}/${this.imagePath}`;
  }

  private getThumborUrl() {
    const size = this.getImageSize(this.decImageSize);
    const aspect = this.getAspect();
    const trim = this.getTrim();
    return `${ThumborServerHost}/${size}${aspect}${trim}/${this.imagePath}`;
  }

  private getImageSize(decImageSize: DecImageSize = {}): string {

    const containerWidth = this.containerElement.offsetWidth;

    if (decImageSize.width && decImageSize.height) {
      return `${decImageSize.width || 0}x${decImageSize.height || 0}`;
    }

    switch (true) {
      case containerWidth < 300:
        return `300x300`;
      case containerWidth < 600:
        return `600x600`;
      case containerWidth < 900:
        return `900x900`;
      case containerWidth < 1200:
        return `1200x1200`;
      case containerWidth < 1500:
        return `1500x1500`;
      case containerWidth < 1800:
        return `1800x1800`;
      default:
        return `2000x2000`;
    }
  }

  private getAspect() {
    return this.fitIn ? '/fit-in' : '';
  }

  private getTrim() {
    return this.trim ? '/trim' : '';
  }

  private tryToLoadImage() {
    const downloadingImage = new Image();
    downloadingImage.setAttribute('crossOrigin', 'Anonymous');
    downloadingImage.onload = () => {
      this.imageData = this.convertImageToDataURI(downloadingImage);
      this.createImage();
    };

    downloadingImage.onerror = () => {
      this.finalImageUrl = ErrorImage;
      this.createImage();
    };

    downloadingImage.src = this.finalImageUrl;
  }

  private createImage() {
    if (this.containerElementType === 'IMG') {
      this.setImageelementSrc();
    } else {
      this.appendImageToBg();
    }
  }

  private appendImageToBg() {
    this.containerElement.style.backgroundImage = 'url(' + this.imageData + ')';
    this.containerElement.classList.remove('dec-image-bg-loading');
  }

  private setImageelementSrc() {
    this.containerElement.setAttribute('src', this.imageData);
  }

  private setElementWidth() {
    if (this.containerElementType === 'IMG') {
      this.containerElement.setAttribute('width', '100%');
      this.containerElement.setAttribute('max-width', '100%');
    } else {
      this.containerElement.style.backgroundSize = '100%';
      this.containerElement.style.backgroundPosition = 'center';
      this.containerElement.style.backgroundRepeat = 'no-repeat';
    }
  }

  private convertImageToDataURI(img) {
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;

    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    return canvas.toDataURL('image/png');
  }

}

