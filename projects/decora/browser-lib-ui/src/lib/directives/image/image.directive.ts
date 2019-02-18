import { Directive, Input, ViewContainerRef, AfterViewInit } from '@angular/core';
import { DecImageSize, SystemFileKey } from './image.directive.models';
import { TransparentImage, ErrorImage, LoadingImage } from './image.directive.constants';
import { DecImageWebWorker } from './image-web-worker';

const worker = new DecImageWebWorker();

@Directive({
  selector: '[decImage]'
})
export class DecImageDirective implements AfterViewInit {

  containerElement: HTMLElement;

  errorOnLoad = false;

  @Input()
  set decImage(v: SystemFileKey | string) {
    this.setInnerValueIfChanged(v);
  }

  // Defines the size of the image to be loaded
  @Input() decImageSize: DecImageSize;

  // Defines if white margins should be cropped
  @Input() trim: boolean;

  // Defines if the image should be cropped or fit the size respecting the aspect ratio
  @Input() fitIn: boolean;

  // Ged redimensioned image from thumbor image resize service
  @Input() thumborize = true;

  private containerElementType: 'IMG' | 'NOT-IMG';

  private innerImage: SystemFileKey | string = TransparentImage;

  private viewInitialized: boolean;

  constructor(private viewContainerRef: ViewContainerRef) {

    this.prepareContainerElement();

  }

  ngAfterViewInit() {

    setTimeout(() => {

      this.viewInitialized = true;

      this.processGivenImage();

    });
  }

  private prepareContainerElement() {

    this.detectContainerElement();

    this.setContainerElementWidth();

  }


  private compareAsString(a = {}, b = {}) {

    const stringA = JSON.stringify(a);

    const stringB = JSON.stringify(b);

    return stringA === stringB;

  }

  private detectContainerElement() {
    this.containerElement = this.viewContainerRef.element.nativeElement;
    this.containerElementType = this.containerElement.tagName === 'IMG' ? 'IMG' : 'NOT-IMG';
  }

  private isImageCached(imageUrl) {

    const imgEle = document.createElement('img');

    imgEle.src = imageUrl;

    return imgEle.complete || (imgEle.width + imgEle.height) > 0;

  }

  private processGivenImage() {

    const containerWidth = this.containerElement.offsetWidth;

    worker.detectImageUrlFromImageType(this.innerImage, this.thumborize, this.decImageSize, containerWidth, this.fitIn, this.trim).subscribe(imageUrl => {

      if (imageUrl !== ErrorImage) {

        const imagesIsCached = this.isImageCached(imageUrl);

        if (imagesIsCached) {

          this.setFinalImageBasedOnContainerType(imageUrl);

        } else {

          worker.tryToLoadImage(imageUrl).then(finalImageUrl => {

            this.setFinalImageBasedOnContainerType(finalImageUrl);

          }, err => {

            this.setFinalImageBasedOnContainerType(ErrorImage);

          });

        }

      } else {

        this.setFinalImageBasedOnContainerType(ErrorImage);

      }

    });

  }

  private setContainerElementWidth() {
    if (this.containerElementType === 'IMG') {
      this.containerElement.setAttribute('width', '100%');
      this.containerElement.setAttribute('max-width', '100%');
    } else {
      this.containerElement.style.backgroundSize = '100%';
      this.containerElement.style.backgroundPosition = 'center';
      this.containerElement.style.backgroundRepeat = 'no-repeat';
    }
  }

  private setInnerValueIfChanged(v) {

    const hasChanged = !this.compareAsString(v, this.innerImage);

    if (hasChanged) {

      this.setTemporaryLoadingImage();

      this.innerImage = v;

      if (this.viewInitialized) {

        this.processGivenImage();

      }

    }

  }

  private setFinalImageBasedOnContainerType(imageUrl) {

    if (this.containerElementType === 'IMG') {

      this.setImageElementSrc(imageUrl);

    } else {

      this.appendImageToBg(imageUrl);

    }

  }

  private setTemporaryLoadingImage() {

    this.setFinalImageBasedOnContainerType(LoadingImage);

  }

  private appendImageToBg(imageUrl) {

    this.containerElement.style.backgroundImage = 'url(' + imageUrl + ')';

    this.containerElement.classList.remove('dec-image-bg-loading');

  }

  private setImageElementSrc(src) {

    this.containerElement.setAttribute('src', src);

  }

}

