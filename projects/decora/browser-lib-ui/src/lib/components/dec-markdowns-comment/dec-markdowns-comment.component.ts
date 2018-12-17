import { DecZoomMarksComponent } from './../dec-zoom-marks/dec-zoom-marks.component';
import { Component, Input } from '@angular/core';
import { Tag } from '../dec-zoom-marks/models/tag.model';
import { DecMarksComponent } from './../dec-marks/dec-marks.component';

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
  public get qaMode(): boolean {
    return this._qaMode;
  }
  public set qaMode(v: boolean) {
    this._qaMode = v;
  }
  private _qaMode: boolean;


  @Input()
  decZoomMarksComponent: DecZoomMarksComponent;

  @Input()
  decMarksComponent: DecMarksComponent;

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

  getDescription(tag) {
    const arrCompleteTag = [
      tag.comment
    ];
    if (tag.description) { arrCompleteTag.push(tag.description); }

    return arrCompleteTag.join(' - ');
  }

  deleteTag(indexRender: number, tag: Tag): void {
    if (this.parentId) {
      this.decMarksComponent.removeTag(tag);
      this.decMarksComponent.drawMarks();
    } else {
      const indexTag = this.renders[indexRender].tags.indexOf(tag);
      this.renders[indexRender].tags.splice(indexTag, 1);
      this.decZoomMarksComponent.recalculateReferences(tag);
      this.decZoomMarksComponent.drawMarks();
    }
  }

  editTag(indexRender, tag) {
    if (this.parentId) {
      this.decMarksComponent.editTags(tag);
    } else {
      this.decZoomMarksComponent.editTags(tag);
    }
  }
}
