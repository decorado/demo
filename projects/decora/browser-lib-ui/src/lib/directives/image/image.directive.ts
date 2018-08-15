import { Directive, Input, ViewContainerRef } from '@angular/core';
import { DecImageSize, SystemFileKey } from './image.directive.models';
import { TransparentImage, ThumborServerHost, ErrorImage, S3Host } from './image.directive.constants';

@Directive({
  selector: '[decImage]'
})
export class DecImageDirective {

  containerElement: HTMLElement;

  errorOnLoad = false;

  @Input()
  set decImage(v: SystemFileKey | string) {
    if (v !== this.innerImage) {
      this.innerImage = v;
      this.loadImage();
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

  constructor(public viewContainerRef: ViewContainerRef) {
    this.detectContainerElement();
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
    return `${decImageSize.width || 0}x${decImageSize.height || 0}`;
  }

  private getAspect() {
    return this.fitIn ? '/fit-in'  : '';
  }

  private getTrim() {
    return this.trim ? '/trim' : '';
  }

  private tryToLoadImage() {
    const downloadingImage = new Image();
    downloadingImage.onload = () => {
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
    this.containerElement.style.backgroundImage = 'url(' + this.finalImageUrl + ')';
    this.containerElement.style.backgroundPosition = 'center';
    this.containerElement.style.backgroundRepeat = 'no-repeat';
    this.containerElement.style.backgroundSize = '100%';
    this.containerElement.classList.remove('dec-image-bg-loading');
  }

  private setImageelementSrc() {
    this.containerElement.setAttribute('src', this.finalImageUrl);
  }

}

