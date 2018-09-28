import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DecImageMarksComponent } from './../dec-image-marks/dec-image-marks.component';
import { MatDialog } from '@angular/material';
import { DecCommentDialogComponent } from './dec-comment-dialog/dec-comment-dialog.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'dec-image-marker',
  templateUrl: './dec-image-marker.component.html',
  styleUrls: ['./dec-image-marker.component.scss']
})
export class DecImageMarkerComponent implements OnInit {

  @Input() render: any;

  @Input()
  set qaModeActive(v: boolean) {
    if (this._qaModeActive !== v) {
      this._qaModeActive = v;
      // TODO: fix me
      if (!this.existsEvents) {
        this.addListeners(this.decMarks.marksWrapper.nativeElement, this.decMarks.imgRef.nativeElement);
      }
    }
  }

  get qaModeActive() {
    return this._qaModeActive;
  }

  private _qaModeActive: boolean;

  private existsEvents = false;

  private requestByClient = false;

  // Events controls
  private mousedown = false;

  private mouseup = true;

  private mousemove = false;

  private startX;

  private startY;

  private squareMark: HTMLDivElement;


  @ViewChild(DecImageMarksComponent) decMarks: DecImageMarksComponent;

  constructor(private dialog: MatDialog, private translateService: TranslateService) { }

  ngOnInit() { }

  deleteMark(target, commentIndex) {

    this.removeTag(target);

    this.removeComment(commentIndex);

    this.refreshTagsNumber();

  }

  private removeTag(target) {

    if (target.parentElement && target.parentElement.classList.contains('square-tag')) {

      target.parentElement.remove();

    } else {

      target.remove();

    }

  }

  private removeComment(commentIndex) {

    const index = commentIndex;

    this.render.comments.splice(index, 1);

  }

  private refreshTagsNumber() {

    Array.from(this.decMarks.marksWrapper.nativeElement.querySelectorAll('.point-tag')).forEach((point: Element, idx) => {
      point.innerHTML = (idx + 1).toString();
    });

  }

  private addListeners(wrapperElement: HTMLDivElement, imageElement: HTMLImageElement): any {

    this.onMouseDown(wrapperElement);

    this.onDragStart(wrapperElement);

    this.onMouseMove(wrapperElement);

    this.onMouseUp(wrapperElement, imageElement);

    this.existsEvents = true;

  }

  private onMouseUp(wrapperElement, imageElement) {

    wrapperElement.addEventListener('mouseup', (event) => {

      const inQaMode = this.qaModeActive;

      const mouseWasDown = !this.mouseup;

      const inAPointTag = ((<Element>event.target).classList.contains('point-tag'));
      const notInAPointTag = !inAPointTag;

      const requestByClient = ((<Element>event.target).classList.contains('client'));

      if (inQaMode && mouseWasDown && notInAPointTag) {
        this.createNewTag(imageElement);
      }

      if (inQaMode && inAPointTag && !requestByClient) {
        this.editComment(event);
      }

      this.mousemove = false;
      this.mouseup = true;
    });

  }

  private createNewTag(imageElement) {

    this.mousedown = false;

    const x = Math.round(((this.startX / imageElement.height) * 100) * 100) / 100;

    const y = Math.round(((this.startY / imageElement.width) * 100) * 100) / 100;

    const index = this.render.comments.length + 1;

    if (this.mousemove) {

      this.drawSquareTag(event, imageElement, index, x, y);

    } else {

      this.drawPointTag(index, x, y);

    }

    this.removeSquareMark();

  }

  private editComment(event) {

    const target = <Element>event.target;

    const commentIndex = parseInt(target.innerHTML, 10) - 1;

    const ref = this.dialog.open(DecCommentDialogComponent, {
      data: {
        title: this.translateService.instant('label.markdowns'),
        comment: this.render.comments[commentIndex], editing: true
      },
      width: '615px'
    });

    ref.afterClosed().subscribe(resp => {

      if (resp === 'delete') {

        this.deleteMark(target, commentIndex);

      } else if (resp) {

        this.render.comments[commentIndex].comment = resp;

      }

    });

  }

  private drawPointTag(index, x, y) {

    const ref = this.dialog.open(DecCommentDialogComponent, {
      data: {
        title: this.translateService.instant('label.markdowns'),
        comment: {}
      },
      width: '615px'
    });

    ref.afterClosed().subscribe(resp => {
      if (resp) {
        this.decMarks.createPointTag([x, y], index, this.requestByClient);
        this.render.comments.push({ comment: resp, coordinates: [x, y] });
      }
    });

  }

  private drawSquareTag(event, imageElement, index, x, y) {

    const x2 = Math.round(((event.offsetX / imageElement.width) * 100) * 100) / 100;
    const y2 = Math.round(((event.offsetY / imageElement.height) * 100) * 100) / 100;

    const ref = this.dialog.open(DecCommentDialogComponent, {
      data: {
        title: this.translateService.instant('label.markdowns'),
        comment: {}
      },
      width: '615px'
    });

    ref.afterClosed().subscribe(resp => {
      if (resp) {
        this.decMarks.createSquareTag([x, y, x2, y2], index, this.requestByClient);
        this.render.comments.push({ comment: resp, coordinates: [x, y, x2, y2] });
      }
    });

  }

  private onMouseDown(wrapperElement) {
    wrapperElement.addEventListener('mousedown', (event) => {
      if (this.qaModeActive && !((<Element>event.target.classList.contains('point-tag')))) {
        this.mousedown = true;
        this.mouseup = false;
        this.startX = event.offsetX;
        this.startY = event.offsetY;
      }
    });
  }

  private onDragStart(wrapperElement) {
    wrapperElement.addEventListener('dragstart', (event) => {
      event.preventDefault();
    });
  }

  private onMouseMove(wrapperElement) {

    wrapperElement.addEventListener('mousemove', (event) => {

      const notClickingInAnyTag = !((<Element>event.target.classList.contains('point-tag')));

      const inQaMode = this.qaModeActive;

      const mouseIsDown = this.mousedown && !this.mouseup;

      if (inQaMode && mouseIsDown && notClickingInAnyTag) {

        this.mousemove = true;

        this.ensureNoMark();

        this.squareMark = this.createNewSquareMark(event);

        wrapperElement.appendChild(this.squareMark);
      }

      this.onMouseLeave(wrapperElement);

      this.onMouseOut(wrapperElement);

      event.preventDefault();
    });
  }

  private createNewSquareMark(event) {
    const squareMark = document.createElement('div');
    squareMark.id = 'squareMark';
    squareMark.style.position = 'absolute';
    squareMark.style.pointerEvents = 'none';
    squareMark.style.borderStyle = 'solid';
    squareMark.style.borderColor = '#f33d3c';
    squareMark.style.borderWidth = '2px';
    squareMark.style.width = `${(event.offsetX - this.startX)}px`;
    squareMark.style.height = `${(event.offsetY - this.startY)}px`;
    squareMark.style.top = this.startY > event.offsetY ? `${event.offsetY}px` : `${this.startY}px`;
    squareMark.style.left = this.startX > event.offsetX ? `${event.offsetX}px` : `${this.startX}px`;
    squareMark.style.width = `${Math.abs(this.startX - event.offsetX)}px`;
    squareMark.style.height = `${Math.abs(this.startY - event.offsetY)}px`;
    return squareMark;
  }

  private onMouseLeave(wrapperElement) {

    wrapperElement.onmouseleave = () => {
      if (this.qaModeActive && this.squareMark) {
        this.mousedown = false;
        this.mouseup = true;
        this.squareMark.remove();
      }
    };

  }

  private onMouseOut(wrapperElement) {

    wrapperElement.onmouseout = () => {
      if (this.qaModeActive && this.squareMark) {
        this.mousedown = false;
        this.mouseup = true;
        this.squareMark.remove();
      }
    };

  }

  private ensureNoMark() {

    if (document.getElementById('squareMark')) {

      document.getElementById('squareMark').remove();

    }

  }

  private removeSquareMark() {

    if (this.squareMark) {

      this.squareMark.remove();

    }
  }
}
