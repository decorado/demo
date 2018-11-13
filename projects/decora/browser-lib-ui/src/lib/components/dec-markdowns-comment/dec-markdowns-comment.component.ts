import { DecZoomMarksComponent } from './../dec-zoom-marks/dec-zoom-marks.component';
import { Component, Input } from '@angular/core';
import { Tag } from '../dec-zoom-marks/models/tag.model';

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
  _renders: any;

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


  @Input()
  public get qaMode(): string {
    return this._qaMode;
  }
  public set qaMode(v: string) {
    this._qaMode = v;
  }
  private _qaMode: string;


  @Input()
  decZoomMarksComponent: DecZoomMarksComponent;

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

  deleteTag(indexRender: number, tag: Tag): void {
    const indexTag = this.renders[indexRender].tags.indexOf(tag);
    this.renders[indexRender].tags.splice(indexTag, 1);

    this.decZoomMarksComponent.recalculateReferences(tag);
    this.decZoomMarksComponent.drawMarks();
  }

}
