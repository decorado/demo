import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DecZoomMarksComponent } from './../dec-zoom-marks/dec-zoom-marks.component';

@Component({
  selector: 'dec-markdowns-zoom-area',
  templateUrl: './dec-markdowns-zoom-area.component.html',
  styleUrls: ['./dec-markdowns-zoom-area.component.scss']
})
export class DecMarkdownsZoomAreaComponent implements OnInit {

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
  decZoomMarksComponent: DecZoomMarksComponent;

  constructor() { }

  ngOnInit() {
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

  editZoomArea(zoomArea) {
    this.decZoomMarksComponent.openZoomAreaFuncion(zoomArea);
  }

  deleteZoomArea(zoomArea) {
    this.deleteArea.emit(zoomArea);
  }
}
