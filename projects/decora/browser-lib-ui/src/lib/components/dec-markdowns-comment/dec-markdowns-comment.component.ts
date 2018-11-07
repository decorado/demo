import { Component, Input } from '@angular/core';

@Component({
  selector: 'dec-markdowns-comment',
  templateUrl: './dec-markdowns-comment.component.html',
  styleUrls: ['./dec-markdowns-comment.component.scss']
})
export class DecMarkdownsCommentComponent {

  @Input()
  set renders(v) {
    if (v) {
      this._renders = v;
    }
  }

  get renders() {
    return this._renders;
  }

  @Input()
  set parentId(v) {
    if (v) {
      this._parentId = v;
    }
  }

  get parentId() {
    return this._parentId;
  }

  _parentId: any;
  _renders: any;

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
