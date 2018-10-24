import { Component, Input, ViewChild, ElementRef, HostListener, Renderer2, AfterViewChecked, Output, EventEmitter } from '@angular/core';
import { Marker } from './../dec-zoom-marks/models/marker.model';
import { Comment } from './../dec-zoom-marks/models/comment.model';
import { fromEvent } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { DecRenderCommentService } from './../dec-render-comment/dec-render-comment.service';
import { MatDialog } from '@angular/material';
import { DecRenderCommentComponent } from './../dec-render-comment/dec-render-comment.component';

export interface ZoomPosition {
  x: number;
  y: number;
}

@Component({
  selector: 'dec-marks',
  templateUrl: './dec-marks.component.html',
  styleUrls: ['./dec-marks.component.scss']
})
export class DecMarksComponent implements AfterViewChecked {

  @Input() marker: Marker = new Marker();

  @Input() zoomScale: number;

  @Input() zoomPosition: ZoomPosition;

  @Input() noComments = true;

  @Input() parentId = 1;

  @Input() comentIndex;

  @Input()
  set qaMode(value: boolean) {
    if (value !== this._qaMode) {
      this._qaMode = value;
      this.setWrapperCursor();
    }
  }
  get qaMode() {
    return this._qaMode;
  }
  private _qaMode: boolean;

  @Output() link = new EventEmitter();
  @Output() referenceQa = new EventEmitter();

  @ViewChild('canvas') canvas: ElementRef;
  public canvasEl: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  @ViewChild('marksWrapper') marksWrapper: ElementRef;
  public marksWrapperEl: HTMLDivElement;

  private imageElement: HTMLImageElement = new Image();

  private contentDone: boolean;

  private startX: number;
  private startY: number;
  private mouseMoved: boolean;

  @HostListener('window:resize')
  onResize() {
    this.setCanvasSize(this.canvasEl.offsetWidth);
    this.setWrapperSize(this.canvasEl.width);
    this.setupCanvas();
  }

  constructor(private renderer: Renderer2, private dialog: MatDialog, private decRenderCommentService: DecRenderCommentService) { }

  ngAfterViewChecked(): void {
    if (!this.contentDone && this.canvas.nativeElement.parentElement.offsetWidth !== 0) {
      this.setupCanvas();
      this.setupMarksWrapper();
      this.setupMouseEvents();
      this.contentDone = true;
    }
  }

  private setupCanvas(): void {
    this.canvasEl = this.canvas.nativeElement;
    this.setCanvasSize(this.canvasEl.offsetWidth);
    this.ctx = this.canvasEl.getContext('2d');
    this.imageElement.onload = () => {
      this.ctx.clearRect(0, 0, this.canvasEl.width, this.canvasEl.height);
      this.ctx.save();
      this.ctx.translate(this.zoomPosition.x, this.zoomPosition.y);
      this.ctx.scale(this.zoomScale, this.zoomScale);
      this.ctx.drawImage(this.imageElement, -this.zoomPosition.x, -this.zoomPosition.y, this.canvasEl.width, this.canvasEl.height);
      this.ctx.restore();
      this.drawMarks();
    };
    console.log('marks', this.marker);
    this.imageElement.src = this.marker.file.fileUrl;
  }

  private setupMarksWrapper(): void {
    this.marksWrapperEl = this.marksWrapper.nativeElement;
    this.setWrapperSize(this.canvasEl.width);
    this.setWrapperCursor();
  }

  private addInCommentsArray(comment: Comment): void {
    this.marker.comments.push(comment);
  }

  private setupMouseEvents(): void {
    const mouseup = fromEvent(this.marksWrapperEl, 'mouseup');
    mouseup.subscribe((event: MouseEvent) => {
      const target = event.target as HTMLDivElement;
      if (this.qaMode) {
        const x = Math.round(((this.startX / this.marksWrapperEl.offsetHeight) * 100) * 100) / 100;
        const y = Math.round(((this.startY / this.marksWrapperEl.offsetWidth) * 100) * 100) / 100;
        const x2 = Math.round(((event.offsetX / this.marksWrapperEl.offsetHeight) * 100) * 100) / 100;
        const y2 = Math.round(((event.offsetY / this.marksWrapperEl.offsetWidth) * 100) * 100) / 100;
        const index = this.marker.comments.length + 1;
        if (this.mouseMoved) {
          this.enablePointEvents(this.marksWrapperEl.querySelectorAll('.point-tag'));
          this.setMouseMoved(false);
          if (this.noComments) {
            const comment = new Comment({
              coordinates: [x, y, x2, y2],
              id: this.noComments ? this.formatTagId() : index
            });
            this.addInCommentsArray(comment);
            this.createSquareTag([x, y, x2, y2], comment.id);
            this.clearSquare();
            this.referenceQa.emit(false);
            return;
          }
          const dialogRef = this.dialog.open(DecRenderCommentComponent);
          dialogRef.afterClosed().subscribe(result => {
            if (result) {
              const comment = new Comment({
                coordinates: [x, y, x2, y2],
                comment: result.comment,
                description: result.description,
                id: index
              });
              this.addInCommentsArray(comment);
              this.createSquareTag([x, y, x2, y2], comment.id);
              this.clearSquare();
            }
          });
        } else {
          if (!target.classList.contains('point-tag') && !target.classList.contains('link-button')) {
            if (this.noComments) {
              const comment = new Comment({
                coordinates: [x, y],
                id: this.noComments ? this.formatTagId() : index
              });
              this.addInCommentsArray(comment);
              this.createPointTag([x, y], comment.id);
              this.referenceQa.emit(false);
              return;
            }
            const dialogRef = this.dialog.open(DecRenderCommentComponent);
            dialogRef.afterClosed().subscribe(result => {
              if (result) {
                const comment = new Comment({
                  coordinates: [x, y],
                  comment: result.comment,
                  description: result.description,
                  id: index
                });
                this.addInCommentsArray(comment);
                this.createPointTag([x, y], comment.id);
              }
            });
          }
        }
      }
    });

    const mouseleave = fromEvent(this.marksWrapperEl, 'mouseleave');
    mouseleave.subscribe((event: MouseEvent) => {
      this.setWrapperCursor();
      if (this.qaMode) {
        this.setMouseMoved(false);
        this.clearSquare();
      }
    });

    fromEvent(this.marksWrapperEl, 'mousedown').pipe(
      switchMap((event: MouseEvent) => {
        this.startX = event.offsetX;
        this.startY = event.offsetY;
        return fromEvent(this.marksWrapperEl, 'mousemove').pipe(
          takeUntil(mouseup),
          takeUntil(mouseleave)
        );
      })
    ).subscribe((event: MouseEvent) => {
      if (this.qaMode) {
        this.setMouseMoved(true);
        this.disablePointEvents(this.marksWrapperEl.querySelectorAll('.point-tag'));
        this.clearSquare();
        const square = this.renderer.createElement('div');
        square.id = 'squareMark';
        this.configureNoComments(square);
        square.style.top = this.startY > event.offsetY ? `${event.offsetY}px` : `${this.startY}px`;
        square.style.left = this.startX > event.offsetX ? `${event.offsetX}px` : `${this.startX}px`;
        square.style.width = `${Math.abs(this.startX - event.offsetX)}px`;
        square.style.height = `${Math.abs(this.startY - event.offsetY)}px`;
        this.marksWrapperEl.appendChild(square);
      }
    });
  }

  private formatTagId() {
    return `${this.parentId}.${this.comentIndex}`;
  }

  private setCanvasSize(size: number): void {
    this.canvasEl.width = size;
    this.canvasEl.height = size;
  }

  private setWrapperCursor(): void {
    if (this.marksWrapperEl) {
      if (this.qaMode) {
        this.marksWrapperEl.style.cursor = 'crosshair';
      } else {
        this.marksWrapperEl.style.cursor = 'default';
      }
    }
  }

  private setWrapperSize(size: number): void {
    this.marksWrapperEl.style.width = `${size}px`;
    this.marksWrapperEl.style.height = `${size}px`;
  }

  private setMouseMoved(moved: boolean) {
    this.mouseMoved = moved;
  }

  private enablePointEvents(elements: NodeListOf<HTMLDivElement>) {
    Array.from(elements).forEach((element) => {
      element.style.pointerEvents = 'all';
    });
  }

  private disablePointEvents(elements: NodeListOf<HTMLDivElement>) {
    Array.from(elements).forEach((element) => {
      element.style.pointerEvents = 'none';
    });
  }

  private createPointTag(coordinates: number[], index: number): HTMLDivElement {
    const [x, y] = coordinates;
    const tag = this.renderer.createElement('div');
    tag.innerHTML = this.noComments ? index : `${this.parentId}.${index}`;
    tag.className = 'point-tag';
    tag.style.top = `calc(${y}% - 12px)`;
    tag.style.left = `calc(${x}% - 12px)`;
    this.marksWrapperEl.appendChild(tag);
    if (!this.noComments) {
      const link = this.renderer.createElement('div');
      link.className = 'link-button';
      link.innerHTML = '+';
      tag.appendChild(link);
      const comment = this.marker.comments.find(c => c.id === index);
      tag.addEventListener('click', (event: MouseEvent) => {
        const target = event.target as HTMLDivElement;
        if (target.classList.contains('link-button')) {
          this.linkTag(comment);
        } else {
          this.clickEventPointTag(comment);
        }
      });
      tag.addEventListener('mouseover', () => this.addCommentNode(comment));
      tag.addEventListener('mouseout', this.removeCommentNode);
    }
    return tag;
  }

  linkTag(comment) {
    this.link.emit(comment);
  }

  private clickEventPointTag(comment: Comment) {
    const dialogRef = this.dialog.open(DecRenderCommentComponent, { data: { comment: comment.comment, version: comment.version } });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        comment.comment = result.comment;
        comment.description = result.description;
      }
    });
  }

  private createSquareTag(coordinates: number[], index: number): void {
    const [x, y, x2, y2] = coordinates;
    const square = this.renderer.createElement('div');
    square.className = 'square-tag';
    this.configureNoComments(square);
    square.style.width = `${Math.abs(x - x2)}%`;
    square.style.height = `${Math.abs(y - y2)}%`;
    square.style.top = `${y2 > y ? y : y2}%`;
    square.style.left = `${x2 > x ? x : x2}%`;
    const point = this.createPointTag([0, 0], index);
    square.appendChild(point);
    this.marksWrapperEl.appendChild(square);
  }

  private clearSquare(): void {
    if (document.getElementById('squareMark')) {
      document.getElementById('squareMark').remove();
    }
  }

  private addCommentNode = (comment: Comment): void => {
    const span = this.renderer.createElement('span');
    span.innerHTML = `${comment.comment} - ${comment.description}`;
    const commentDiv = this.renderer.createElement('div');
    commentDiv.className = 'comment-hover';
    commentDiv.style.maxWidth = this.canvasEl.width > 340 ? '340px' : 'calc(100% - 20px)';
    commentDiv.appendChild(span);
    this.marksWrapperEl.parentElement.appendChild(commentDiv);
  }

  private removeCommentNode() {
    const commentNode = document.getElementsByClassName('comment-hover')[0];
    if (commentNode) {
      commentNode.parentElement.removeChild(commentNode);
    }
  }

  private drawMarks() {
    this.cleanMarks();
    this.decRenderCommentService.getRenderDescriptionsByCode(this.marker.comments);
    if (this.marker.comments && this.marker.comments.length > 0) {
      this.marker.comments.forEach((comment: Comment) => {
        if (comment.coordinates.length > 2) {
          this.createSquareTag(comment.coordinates, comment.id);
        } else {
          this.createPointTag(comment.coordinates, comment.id);
        }
      });
    }
  }

  private cleanMarks(): void {
    const pointElements = this.marksWrapperEl.getElementsByClassName('point-tag');
    const squareElements = this.marksWrapperEl.getElementsByClassName('square-tag');
    const zoomAreaElements = this.marksWrapperEl.getElementsByClassName('zoom-area-tag');
    while (pointElements[0]) {
      pointElements[0].parentNode.removeChild(pointElements[0]);
    }
    while (squareElements[0]) {
      squareElements[0].parentNode.removeChild(squareElements[0]);
    }
    while (zoomAreaElements[0]) {
      zoomAreaElements[0].parentNode.removeChild(zoomAreaElements[0]);
    }
  }

  private deleteMark(comment) {
    this.marker.comments.splice(this.marker.comments.indexOf(comment), 1);
    this.marker.comments.forEach(c => {
      if (c.id > comment.id) {
        c.id--;
      }
    });
    this.removeCommentNode();
    this.drawMarks();
  }

  private configureNoComments(square: HTMLDivElement): void {
    if (this.noComments) {
      square.style.borderStyle = 'dashed';
    }
  }

}
