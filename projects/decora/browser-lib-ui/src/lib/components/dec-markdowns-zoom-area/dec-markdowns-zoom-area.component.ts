import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DecZoomMarksComponent } from './../dec-zoom-marks/dec-zoom-marks.component';

@Component({
  selector: 'dec-markdowns-zoom-area',
  templateUrl: './dec-markdowns-zoom-area.component.html',
  styleUrls: ['./dec-markdowns-zoom-area.component.scss']
})
export class DecMarkdownsZoomAreaComponent {

  @Input() zoomAreas;

  @Output() deleteArea = new EventEmitter();

  @Input()
  set renders(v) {
    if (v) {
      this._renders = v;
    }
  }

  get renders() {
    return this._renders;
  }

  private _renders;

  @Input()
  public get qaMode(): boolean {
    return this._qaMode;
  }
  public set qaMode(v: boolean) {
    this._qaMode = v;
  }
  private _qaMode: boolean;

  @Input()
  decZoomMarksComponent: DecZoomMarksComponent;

  constructor() { }

  getClass(comment) {
    let cssClass = 'tags-item';

    if (comment.requestByClient) {
      cssClass += ' client';
    }

    return cssClass;
  }

  getDescription(tag) {
    const arrCompleteTag = [
      tag.comment
    ];
    if (tag.description) { arrCompleteTag.push(tag.description); }

    return arrCompleteTag.join(' - ');
  }

  editZoomArea(zoomArea) {
    this.decZoomMarksComponent.openZoomAreaFuncion(zoomArea);
  }

  deleteZoomArea(zoomArea) {
    this.deleteArea.emit(zoomArea);
  }
}
