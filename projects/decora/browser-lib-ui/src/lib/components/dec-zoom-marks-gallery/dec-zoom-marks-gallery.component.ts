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

  @Input()
  set markedObjs(v) {
    if (this._markedObjs !== v) {
      this._markedObjs = v;
      this.markedObj = this.markedObjs[0];
      this.bindRenderDescriptions();
    }
  }

  get markedObjs() {
    return this._markedObjs;
  }

  @Input()
  set showTags(v) {
    if (v) {
      this._showTags = v;
    }
  }

  get showTags() {
    return this._showTags;
  }

  imageIndex = 0;

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
    });
  }

  onInitDataFn(event: NguCarouselStore) {

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
}
