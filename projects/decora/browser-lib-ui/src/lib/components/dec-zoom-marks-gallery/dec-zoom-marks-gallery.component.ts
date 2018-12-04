import { DecRenderCommentService } from './../dec-render-comment/dec-render-comment.service';
import { Component, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { NguCarouselStore } from '@ngu/carousel';
import { CarouselZoomConfig } from './../gallery/carousel-config';
import { DecZoomMarksComponent } from './../dec-zoom-marks/dec-zoom-marks.component';

@Component({
  selector: 'dec-zoom-marks-gallery',
  templateUrl: './dec-zoom-marks-gallery.component.html',
  styleUrls: ['./dec-zoom-marks-gallery.component.scss']
})
export class DecZoomMarksGalleryComponent {

  carouselConfig = CarouselZoomConfig;

  @Input() jobType;

  @Input()
  set markedObjs(v) {
    if (this._markedObjs !== v) {
      this._markedObjs = v;
      this.generateCacheForImages(v);
      this.markedObj = this.markedObjs[0];
      this.sortRenders();
      this.bindRenderDescriptions();
    }
  }

  get markedObjs() {
    return this._markedObjs;
  }

  @Input()
  set showTags(v) {
    this._showTags = v;
  }

  get showTags() {
    return this._showTags;
  }

  private _reviewers: any;
  public get reviewers(): any {
    return this._reviewers;
  }
  @Input()
  public set reviewers(v: any) {
    this._reviewers = v;
  }

  @Input()
  set maxFile(v) {
    if (v) {
      this._maxFile = v;
    }
  }

  get maxFile() {
    return this._maxFile;
  }

  @Input()
  public isProfessional: boolean;


  @Output() deleteZoomArea = new EventEmitter();

  _maxFile: any;

  imageIndex = 0;

  @ViewChild('carouselGallery') carouselGallery;

  @Input() qaModeActive: boolean;

  @ViewChild(DecZoomMarksComponent) zoomMarks: DecZoomMarksComponent;

  @Output() openZoomArea = new EventEmitter();

  markedObj: any;
  _markedObjs: any;

  _showTags: boolean;

  isFirst: boolean;

  isLast: boolean;

  constructor(private decRenderCommentService: DecRenderCommentService) { }

  private bindRenderDescriptions(): void {
    this.markedObjs.forEach(item => {
      this.decRenderCommentService.getRenderDescriptionsByCode(item.tags);

      if (item.zoomAreas) {
        item.zoomAreas.forEach(zoomArea => {
          this.decRenderCommentService.getRenderDescriptionsByCode(zoomArea.renderShot.tags);
        });
      }

    });
  }

  private generateCacheForImages(renders) {
    renders.forEach(mark => {
      const image = new Image();
      image.src = mark.file.fileUrl;
    });
  }

  onSwipe(event) {
    const orientation = Math.abs(event.deltaX) > 40 ? (event.deltaX > 0 ? 'right' : 'left') : '';
    let direction;
    if (orientation === 'left') {
      direction = this.carouselGallery.next.nativeElement;
    } else if (orientation === 'right') {
      direction = this.carouselGallery.prev.nativeElement;
    } else {
      return false;
    }

    direction.click();
    if (Math.abs(event.deltaX) > 100) {
      direction.click();
      if (Math.abs(event.deltaX) > 150) {
        direction.click();
        if (Math.abs(event.deltaX) > 200) {
          direction.click();
          if (Math.abs(event.deltaX) > 250) {
            direction.click();
          }
        }
      }
    }
  }

  onInitDataFn(event: NguCarouselStore) {
    if (!this.markedObjs || this.markedObjs.length === 0) {
      return;
    }
    this.setPrevNextCheckers(event.isFirst, event.items >= this.markedObjs.length);
  }

  onMoveFn(event: NguCarouselStore) {
    this.setPrevNextCheckers(event.isFirst, event.isLast);
  }

  onSelectImage = ($event, sysFile, i) => {
    this.markedObj = this.markedObjs[i];
    this.imageIndex = i;
  }

  setPrevNextCheckers(first: boolean, last: boolean) {

    setTimeout(() => {

      this.isFirst = first;

      this.isLast = last;

    }, 0);

  }

  public getFormatedPositionAndScale() {
    return this.zoomMarks.getFormatedPositionAndScale();
  }

  public addNewZoomArea(addNewZoomArea) {
    this.zoomMarks.addNewZoomArea(addNewZoomArea);
  }

  public onOpenZoomArea($event) {
    this.openZoomArea.emit($event);
  }

  public getImageIndex() {
    return this.imageIndex;
  }

  sortRenders() {
    const aux = [];
    for (let i = 0; i < this.markedObjs.length; i++) {
      if ((this.markedObjs[i].tags && this.markedObjs[i].tags.length > 0) ||
        (this.markedObjs[i].zoomAreas && this.markedObjs[i].zoomAreas.length > 0)) {
        aux.push(this.markedObjs.splice(i, 1));
        i = 0;
      }
    }
    for (let i = (aux.length - 1); i >= 0; i--) {
      this.markedObjs.splice(0, 0, aux[i][0]);
    }
  }

  deleteArea($event) {
    this.deleteZoomArea.emit($event);
  }
}
