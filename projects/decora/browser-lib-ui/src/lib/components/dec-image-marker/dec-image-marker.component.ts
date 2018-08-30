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
      //TODO: fix me
      if (!this.existsEvents) {
        this.addListeners(this.decMarks.marksWrapper.nativeElement, this.decMarks.imgRef.nativeElement);
      }
    }
  }

  get qaModeActive() {
    return this._qaModeActive;
  }

  private _qaModeActive: boolean;

  private existsEvents: boolean = false;

  @ViewChild(DecImageMarksComponent) decMarks: DecImageMarksComponent;

  constructor(private dialog: MatDialog, private translateService: TranslateService) { }

  ngOnInit() { }

  deleteMark(target, commentIndex) {
    if (target.parentElement && target.parentElement.className === 'square-tag') {
      target.parentElement.remove();
    } else {
      target.remove();
    }
    const index = commentIndex;
    this.render.comments.splice(index, 1);
    Array.from(this.decMarks.marksWrapper.nativeElement.querySelectorAll('.point-tag')).forEach((point: Element, idx) => {
      point.innerHTML = (idx + 1).toString();
    });
  }

  addListeners(wrapperElement: HTMLDivElement, imageElement: HTMLImageElement): any {

    let mousedown = false;
    let mouseup = true;
    let mousemove = false;

    let startX, startY;

    let squareMark: HTMLDivElement;

    wrapperElement.addEventListener('mousedown', (event) => {
      if (this.qaModeActive && !((<Element>event.target).className === 'point-tag')) {
        mousedown = true;
        mouseup = false;
        startX = event.offsetX;
        startY = event.offsetY;
      }
    });

    wrapperElement.addEventListener('dragstart', (event) => {
      event.preventDefault();
    });

    wrapperElement.addEventListener('mousemove', (event) => {
      if (this.qaModeActive && mousedown && !mouseup && !((<Element>event.target).className === 'point-tag')) {
        mousemove = true;
        if (document.getElementById('squareMark')) {
          document.getElementById('squareMark').remove();
        }
        squareMark = document.createElement('div');
        squareMark.id = 'squareMark';
        squareMark.style.position = 'absolute';
        squareMark.style.pointerEvents = 'none';
        squareMark.style.borderStyle = 'solid';
        squareMark.style.borderColor = '#f33d3c';
        squareMark.style.borderWidth = '2px';
        squareMark.style.width = `${(event.offsetX - startX)}px`;
        squareMark.style.height = `${(event.offsetY - startY)}px`;

        squareMark.style.top = startY > event.offsetY ? `${event.offsetY}px` : `${startY}px`;
        squareMark.style.left = startX > event.offsetX ? `${event.offsetX}px` : `${startX}px`;

        squareMark.style.width = `${Math.abs(startX - event.offsetX)}px`;
        squareMark.style.height = `${Math.abs(startY - event.offsetY)}px`;

        wrapperElement.appendChild(squareMark);
      }
      wrapperElement.onmouseleave = () => {
        if (this.qaModeActive && squareMark) {
          mousedown = false;
          mouseup = true;
          squareMark.remove();
        }
      };
      wrapperElement.onmouseout = () => {
        if (this.qaModeActive && squareMark) {
          mousedown = false;
          mouseup = true;
          squareMark.remove();
        }
      };
      event.preventDefault();
    });

    wrapperElement.addEventListener('mouseup', (event) => {

      if (this.qaModeActive && !mouseup && !((<Element>event.target).className === 'point-tag')) {

        mousedown = false;

        const x = Math.round(((startX / imageElement.height) * 100) * 100) / 100;
        const y = Math.round(((startY / imageElement.width) * 100) * 100) / 100;

        const index = this.render.comments.length + 1;

        if (mousemove) {
          const x2 = Math.round(((event.offsetX / imageElement.width) * 100) * 100) / 100;
          const y2 = Math.round(((event.offsetY / imageElement.height) * 100) * 100) / 100;

          const ref = this.dialog.open(DecCommentDialogComponent,
            {
              data: {
                title: this.translateService.instant('label.markdowns'),
                comment: {}
              },
              width: '615px'
            });
          ref.afterClosed().subscribe(resp => {
            if (resp) {
              this.decMarks.createSquareTag(x, y, x2, y2, index);
              this.render.comments.push({ comment: resp, coordinates: [x, y, x2, y2] });
            }
          });
        } else {
          const ref = this.dialog.open(DecCommentDialogComponent,
            {
              data: {
                title: this.translateService.instant('label.markdowns'),
                comment: {}
              },
              width: '615px'
            });
          ref.afterClosed().subscribe(resp => {
            if (resp) {
              this.decMarks.createPointTag(x, y, index);
              this.render.comments.push({ comment: resp, coordinates: [x, y] });
            }
          });
        }

        if (squareMark) {
          squareMark.remove();
        }

      }

      if (this.qaModeActive && ((<Element>event.target).className === 'point-tag')) {

        const target = <Element>event.target;
        const commentIndex = parseInt(target.innerHTML, 10) - 1;

        const ref = this.dialog.open(DecCommentDialogComponent,
          {
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

      mousemove = false;
      mouseup = true;

    });
    this.existsEvents = true;
  }
}
