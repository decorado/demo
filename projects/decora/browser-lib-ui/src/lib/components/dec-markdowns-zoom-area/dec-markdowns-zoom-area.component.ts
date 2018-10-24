import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'dec-markdowns-zoom-area',
  templateUrl: './dec-markdowns-zoom-area.component.html',
  styleUrls: ['./dec-markdowns-zoom-area.component.scss']
})
export class DecMarkdownsZoomAreaComponent implements OnInit {

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

}
