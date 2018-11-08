import { Component, AfterViewChecked, Input, ViewChild, ElementRef, HostListener, Renderer2, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Marker } from './models/marker.model';
import { Tag } from './models/tag.model';
import { ZoomPosition } from './models/zoom-position.interface';
import { fromEvent, Observable } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { ZoomArea } from './models/zoom-area.model';
import { DecRenderCommentComponent } from './../dec-render-comment/dec-render-comment.component';

@Component({
  selector: 'dec-zoom-marks',
  templateUrl: './dec-zoom-marks.component.html',
  styleUrls: ['./dec-zoom-marks.component.scss']
})
export class DecZoomMarksComponent implements AfterViewChecked {

  @Input() minZoomLevel: any;
  @Input() maxZoomLevel: any;
  @Input() stepZoomLevel: any;

  @Input()
  set marker(value: Marker) {
    if (value !== this._marker) {
      this._marker = value;
      if (this.contentDone) {
        this.setupCanvas();
      }
    }
  }
  get marker() {
    return this._marker;
  }
  private _marker: Marker;

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

  @Output() openZoomArea = new EventEmitter();

  private _qaMode: boolean;

  private imageElement: HTMLImageElement = new Image();

  private commentsArraySize: number;

  private contentDone: boolean;

  private zoomPosition: ZoomPosition;
  private startX: number;
  private startY: number;
  private mouseMoved: boolean;

  public zoomScale: number;

  @ViewChild('canvas') canvas: ElementRef;
  public canvasEl: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  @ViewChild('marksWrapper') marksWrapper: ElementRef;
  public marksWrapperEl: HTMLDivElement;

  @ViewChild('loadingContainer') loadingContainer: ElementRef;
  public loadingContainerEl: HTMLDivElement;

  @HostListener('window:resize')
  onResize() {
    this.setCanvasSize(this.canvasEl.offsetWidth);
    this.setWrapperSize(this.canvasEl.width);
    this.zoom(this.zoomScale);
  }

  constructor(private renderer: Renderer2, private dialog: MatDialog) {
    this.zoomPosition = { x: 0, y: 0 };
    this.zoomScale = 1;
  }

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
    this.cleanMarks();
    this.setupLoadingContainer();
    this.ctx = this.canvasEl.getContext('2d');
    this.imageElement.onload = () => {
      this.loadingContainerEl.style.display = 'none';
      this.ctx.drawImage(this.imageElement, 0, 0, this.canvasEl.width, this.canvasEl.width);
      this.drawMarks();
      this.setZoomPosition(this.canvasEl.width * 0.5, this.canvasEl.width * 0.5);
    };
    this.imageElement.src = this.marker.file.fileUrl;
  }

  private setupLoadingContainer(): void {
    this.loadingContainerEl = this.loadingContainer.nativeElement;
    this.loadingContainerEl.style.width = `${this.canvasEl.offsetWidth}px`;
    this.loadingContainerEl.style.height = `${this.canvasEl.offsetWidth}px`;
    this.loadingContainerEl.style.display = 'flex';
  }

  private setupMarksWrapper(): void {
    this.marksWrapperEl = this.marksWrapper.nativeElement;
    this.setWrapperSize(this.canvasEl.width);
    this.setWrapperCursor();
  }

  private setupMouseEvents(): void {
    this.wheelEvent();
    this.mousedownEvent();
  }

  private wheelEvent(): void {
    fromEvent(this.marksWrapperEl, 'wheel').subscribe((event: WheelEvent) => {
      const usedCtrlKey = event.ctrlKey;
      const usedMetaKey = event.metaKey;
      if (usedCtrlKey || usedMetaKey) {
        event.preventDefault();
        const target = event.target as HTMLDivElement;
        if (!target.classList.contains('point-tag') && !target.classList.contains('zoom-area-tag')) {
          this.setZoomPosition(
            ((100 * event.offsetX) / this.marksWrapperEl.offsetWidth * this.canvasEl.offsetWidth) / 100,
            ((100 * event.offsetY) / this.marksWrapperEl.offsetHeight * this.canvasEl.offsetHeight) / 100);
          if (event.deltaY < 0) {
            this.zoomIn(0.5);
          }
          event.deltaY < 0 ? this.zoomIn(0.5) : this.zoomOut(0.5);
          this.startX = ((100 * event.offsetX) / this.marksWrapperEl.offsetWidth * this.canvasEl.offsetWidth) / 100 * this.zoomScale + this.canvasEl.offsetWidth / 2;
          this.startY = ((100 * event.offsetY) / this.marksWrapperEl.offsetHeight * this.canvasEl.offsetHeight) / 100 * this.zoomScale + this.canvasEl.offsetHeight / 2;
        }
      }
    });
  }

  private mouseleaveEvent(): Observable<Event> {
    return fromEvent(this.marksWrapperEl, 'mouseleave');
  }

  private mouseupEvent(): Observable<Event> {
    return fromEvent(this.marksWrapperEl, 'mouseup');
  }

  private addInCommentsArray(comment: Tag): void {
    if (!this.marker.tags) {
      this.marker.tags = [];
    }
    this.marker.tags.push(comment);
    this.commentsArraySize++;
  }

  private mousedownEvent(): void {
    const mouseup = this.mouseupEvent();
    mouseup.subscribe((event: MouseEvent) => {
      this.setWrapperCursor();
      const target = event.target as HTMLDivElement;
      this.enablePointEvents(this.marksWrapperEl.querySelectorAll('.point-tag'));
      if (this.qaMode && this.zoomScale === 1) {
        const x = Math.round(((this.startX / this.marksWrapperEl.offsetHeight) * 100) * 100) / 100;
        const y = Math.round(((this.startY / this.marksWrapperEl.offsetWidth) * 100) * 100) / 100;
        const x2 = Math.round(((event.offsetX / this.marksWrapperEl.offsetHeight) * 100) * 100) / 100;
        const y2 = Math.round(((event.offsetY / this.marksWrapperEl.offsetWidth) * 100) * 100) / 100;
        if (this.mouseMoved) {
          this.setMouseMoved(false);
          const dialogRef = this.dialog.open(DecRenderCommentComponent);
          dialogRef.afterClosed().subscribe(result => {
            if (result) {
              const comment = new Tag({
                coordinates: [x, y, x2, y2],
                comment: result.comment,
                description: result.description,
                reference: this.commentsArraySize + 1
              });
              this.addInCommentsArray(comment);
              this.createSquareTag([x, y, x2, y2], comment.reference);
              this.clearSquare();
            }
          });
        } else {
          if (!target.classList.contains('point-tag') && !target.classList.contains('zoom-area-tag')) {
            const dialogRef = this.dialog.open(DecRenderCommentComponent);
            dialogRef.afterClosed().subscribe(result => {
              if (result) {
                const comment = new Tag({
                  coordinates: [x, y],
                  comment: result.comment,
                  description: result.description,
                  reference: this.commentsArraySize + 1
                });
                this.addInCommentsArray(comment);
                this.createPointTag([x, y], comment.reference);
              }
            });
          }
        }
      }
    });

    const mouseleave = this.mouseleaveEvent();
    mouseleave.subscribe((event: MouseEvent) => {
      this.setWrapperCursor();
      this.enablePointEvents(this.marksWrapperEl.querySelectorAll('.point-tag'));
      if (this.qaMode) {
        this.setMouseMoved(false);
        this.clearSquare();
      }
    });

    fromEvent(this.marksWrapperEl, 'mousedown').pipe(
      switchMap((event: MouseEvent) => {
        this.startX = event.offsetX;
        this.startY = event.offsetY;
        this.setWrapperCursor(true);
        return fromEvent(this.marksWrapperEl, 'mousemove').pipe(
          takeUntil(mouseup),
          takeUntil(mouseleave)
        );
      })
    ).subscribe((event: MouseEvent) => {
      if (this.qaMode && this.zoomScale === 1) {
        this.setMouseMoved(true);
        this.disablePointEvents(this.marksWrapperEl.querySelectorAll('.point-tag'));
        this.clearSquare();
        const square = this.renderer.createElement('div');
        square.id = 'squareMark';
        square.style.top = this.startY > event.offsetY ? `${event.offsetY}px` : `${this.startY}px`;
        square.style.left = this.startX > event.offsetX ? `${event.offsetX}px` : `${this.startX}px`;
        square.style.width = `${Math.abs(this.startX - event.offsetX)}px`;
        square.style.height = `${Math.abs(this.startY - event.offsetY)}px`;
        this.marksWrapperEl.appendChild(square);
      } else {
        this.zoomPosition.x -= event.movementX;
        this.zoomPosition.y -= event.movementY;
        if (this.zoomPosition.x < 0) {
          this.zoomPosition.x = 0;
        }
        if (this.zoomPosition.y < 0) {
          this.zoomPosition.y = 0;
        }
        if (this.zoomPosition.x > this.canvasEl.width) {
          this.zoomPosition.x = this.canvasEl.width;
        }
        if (this.zoomPosition.y > this.canvasEl.height) {
          this.zoomPosition.y = this.canvasEl.height;
        }
        this.resizeMarker(this.zoomScale);
        this.ctx.clearRect(0, 0, this.canvasEl.width, this.canvasEl.height);
        this.ctx.save();
        this.ctx.translate(this.zoomPosition.x, this.zoomPosition.y);
        this.ctx.scale(this.zoomScale, this.zoomScale);
        this.ctx.translate(-this.zoomPosition.x, -this.zoomPosition.y);
        this.ctx.drawImage(this.imageElement, 0, 0, this.canvasEl.width, this.canvasEl.height);
        this.ctx.restore();
      }
    });
  }

  public drawMarks() {
    this.cleanMarks();

    this.commentsArraySize = 0;

    if (this.marker.tags && this.marker.tags.length > 0) {
      this.marker.tags.forEach((tag: Tag) => {
        if (tag.coordinates.length > 2) {
          this.createSquareTag(tag.coordinates, tag.reference);
        } else {
          this.createPointTag(tag.coordinates, tag.reference);
        }
      });
      this.commentsArraySize += this.marker.tags.length;
    }

    if (this.marker.zoomAreas && this.marker.zoomAreas.length > 0) {
      this.marker.zoomAreas.forEach((zoomArea: ZoomArea) => {
        this.createZoomAreaTag(zoomArea.coordinates, zoomArea.reference);
      });
      this.commentsArraySize += this.marker.zoomAreas.length;
    }
  }

  private resizeMarker(zoomScale) {
    const diffX = this.canvasEl.width * zoomScale - this.canvasEl.width;
    const diffY = this.canvasEl.height * zoomScale - this.canvasEl.height;
    this.marksWrapperEl.style.width = `${this.canvasEl.width * zoomScale}px`;
    this.marksWrapperEl.style.height = `${this.canvasEl.height * zoomScale}px`;
    this.marksWrapperEl.style.left = this.zoomXPosition(diffX, zoomScale);
    this.marksWrapperEl.style.top = this.zoomYPosition(diffY, zoomScale);
  }

  private zoomYPosition(diffY, zoomScale) {
    if (this.zoomPosition.y !== (this.canvasEl.height / 2)) {
      if (zoomScale > 1) {
        const aux = zoomScale.toString().split('.')[0] > 1 ? (zoomScale - 1) : (zoomScale % 1);
        return -(this.zoomPosition.y * aux) + 'px';
      } else {
        return null;
      }
    } else {
      return (diffY / 2) * -1 + 'px';
    }
  }

  private zoomXPosition(diffX, zoomScale) {
    if (this.zoomPosition.x !== (this.canvasEl.width / 2)) {
      if (zoomScale > 1) {
        const aux = zoomScale.toString().split('.')[0] > 1 ? (zoomScale - 1) : (zoomScale % 1);
        return -(this.zoomPosition.x * aux) + 'px';
      } else {
        return null;
      }
    } else {
      return (diffX / 2) * -1 + 'px';
    }
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

  private cleanMarks(): void {
    if (this.marksWrapperEl) {
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
  }

  private createPointTag(coordinates: number[], index: number): HTMLDivElement {
    const [x, y] = coordinates;
    const tag = this.renderer.createElement('div');
    tag.innerHTML = `${index}`;
    tag.className = 'point-tag';
    tag.style.top = `calc(${y}% - 12px)`;
    tag.style.left = `calc(${x}% - 12px)`;
    this.marksWrapperEl.appendChild(tag);
    const comment = this.marker.tags.find(c => c.reference === index);
    tag.addEventListener('click', () => this.clickEventPointTag(comment));
    tag.addEventListener('mouseover', () => this.addCommentNode(comment));
    tag.addEventListener('mouseout', this.removeCommentNode);
    return tag;
  }

  private createZoomAreaTag(coordinates: number[], index: number): HTMLDivElement {
    const [x, y] = coordinates;
    const tag = this.renderer.createElement('div');
    tag.innerHTML = `${index}`;
    tag.className = 'zoom-area-tag';
    tag.style.top = `calc(${y}% - 12px)`;
    tag.style.left = `calc(${x}% - 12px)`;
    this.marksWrapperEl.appendChild(tag);
    const zoomArea = this.marker.zoomAreas.find(z => z.reference === index);
    tag.addEventListener('click', () => this.clickEventZoomTag(zoomArea));
    return tag;
  }

  private createSquareTag(coordinates: number[], index: number): void {
    const [x, y, x2, y2] = coordinates;
    const square = this.renderer.createElement('div');
    square.className = 'square-tag';
    square.style.width = `${Math.abs(x - x2)}%`;
    square.style.height = `${Math.abs(y - y2)}%`;
    square.style.top = `${y2 > y ? y : y2}%`;
    square.style.left = `${x2 > x ? x : x2}%`;
    const point = this.createPointTag([0, 0], index);
    square.appendChild(point);
    this.marksWrapperEl.appendChild(square);
  }

  private clickEventPointTag(comment: Tag) {
    const dialogRef = this.dialog.open(DecRenderCommentComponent, { data: { comment: comment.comment, version: comment.version } });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        comment.comment = result.comment;
        comment.description = result.description;
      }
    });

    dialogRef.componentInstance.deleteMark.subscribe(() => {
      this.deleteMark(comment);
    });
  }

  private clickEventZoomTag(zoomArea: ZoomArea) {
    this.openZoomArea.emit(zoomArea);
  }

  private clearSquare(): void {
    if (document.getElementById('squareMark')) {
      document.getElementById('squareMark').remove();
    }
  }

  private addCommentNode = (comment: Tag): void => {
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

  private setCanvasSize(size: number): void {
    this.canvasEl.width = size;
    this.canvasEl.height = size;
  }

  setMouseMoved(moved: boolean) {
    this.mouseMoved = moved;
  }

  private setWrapperSize(size: number): void {
    this.marksWrapperEl.style.width = `${size}px`;
    this.marksWrapperEl.style.height = `${size}px`;
  }

  private setZoomPosition(x: number, y: number): void {
    this.zoomPosition.x = x;
    this.zoomPosition.y = y;
  }

  private setWrapperCursor(mousedown?: boolean): void {
    if (this.marksWrapperEl) {
      if (this.qaMode && this.zoomScale === 1) {
        this.marksWrapperEl.style.cursor = 'crosshair';
      } else if (mousedown) {
        this.marksWrapperEl.style.cursor = 'move';
      } else {
        this.marksWrapperEl.style.cursor = 'grab';
      }
    }
  }

  public zoom(zoomScale: number = 1) {
    this.zoomScale = zoomScale;
    this.resizeMarker(zoomScale);
    this.setWrapperCursor();
    this.ctx.clearRect(0, 0, this.canvasEl.width, this.canvasEl.height);
    this.ctx.save();
    this.ctx.translate(this.zoomPosition.x, this.zoomPosition.y);
    this.ctx.scale(zoomScale, zoomScale);
    this.ctx.drawImage(this.imageElement, -this.zoomPosition.x, -this.zoomPosition.y, this.canvasEl.width, this.canvasEl.height);
    this.ctx.restore();
  }

  public zoomIn(amount: number = 1) {
    if (this.zoomScale < parseInt(this.maxZoomLevel, 10)) {
      (this.zoomScale + amount) < this.maxZoomLevel ? this.zoomScale += amount : this.zoomScale = +this.maxZoomLevel;
      this.zoom(this.zoomScale);
    }
  }

  public zoomOut(amount: number = 1) {
    if (this.zoomScale > parseInt(this.minZoomLevel, 10)) {
      (this.zoomScale - amount) > this.minZoomLevel ? this.zoomScale -= amount : this.zoomScale = +this.minZoomLevel;
      this.zoom(this.zoomScale);
    }
  }

  public onZoomSlide(value: number): void {
    this.zoom(value);
  }

  public getFormatedPositionAndScale = () => {
    const file: any = this.marker.file;

    return {
      file: file,
      position: {
        x: this.zoomPosition.x,
        y: this.zoomPosition.y
      },
      zoomScale: this.zoomScale
    };
  }

  public addNewZoomArea = (newZoomArea) => {
    if (newZoomArea.coordinates.length > 0) {
      this.editZoomArea(newZoomArea);
      return;
    }
    newZoomArea.coordinates.push(Math.round(Math.round(((this.startX / this.marksWrapperEl.offsetWidth) * 100) * 100) / 100));
    newZoomArea.coordinates.push(Math.round(Math.round(((this.startY / this.marksWrapperEl.offsetHeight) * 100) * 100) / 100));
    newZoomArea.reference = this.commentsArraySize + 1;
    this.marker.zoomAreas.push(newZoomArea);
    this.commentsArraySize++;
    this.drawMarks();
  }

  editZoomArea(newZoomArea) {
    const za = this.marker.zoomAreas.find(x => x.reference === newZoomArea.ref);
    if (za) {
      za.renderShot = newZoomArea.renderShot;
      za.referenceShot = newZoomArea.referenceShot;
    }
  }

  private deleteMark(tag: Tag) {
    this.marker.tags.splice(this.marker.tags.indexOf(tag), 1);
    this.recalculateReferences(tag);

    this.removeCommentNode();
    this.drawMarks();
  }

  public recalculateReferences(tag: Tag): void {
    this.marker.tags.forEach(tagItem => {
      if (tagItem.reference > tag.reference) {
        tagItem.reference--;
      }
    });

    if (this.marker.zoomAreas) {
      this.marker.zoomAreas.forEach(zoomArea => {
        if (zoomArea.reference > tag.reference) {
          zoomArea.reference--;
        }
      });
    }

  }

}
