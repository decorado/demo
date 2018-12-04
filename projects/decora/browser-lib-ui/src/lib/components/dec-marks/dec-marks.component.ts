import { Component, Input, ViewChild, ElementRef, HostListener, Renderer2, AfterViewChecked, Output, EventEmitter } from '@angular/core';
import { Marker } from './../dec-zoom-marks/models/marker.model';
import { Tag } from './../dec-zoom-marks/models/tag.model';
import { fromEvent } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { DecRenderCommentService } from './../dec-render-comment/dec-render-comment.service';
import { MatDialog } from '@angular/material';
import { DecRenderCommentComponent } from './../dec-render-comment/dec-render-comment.component';
import { TranslateService } from '@ngx-translate/core';

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

  @Input() parentSize: any;

  @Input() noComments = true;

  @Input() parentId = 1;

  @Input() comentIndex;

  @Input() jobType;

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

  @Input()
  public set enableDeleteLinkedtag(v: any) {
    this._enableDeleteLinkedtag = v;
  }
  public get enableDeleteLinkedtag(): any {
    return this._enableDeleteLinkedtag;
  }
  private _enableDeleteLinkedtag: any;

  @Output() link = new EventEmitter();
  @Output() deleteTag = new EventEmitter();

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

  deleteLabel = this.translate.instant('label.delete');
  editLabel = this.translate.instant('label.edit');

  @HostListener('window:resize')
  onResize() {
    this.setCanvasSize(this.canvasEl.offsetWidth);
    this.setWrapperSize(this.canvasEl.width);
    this.setupCanvas();
  }

  constructor(
    private renderer: Renderer2,
    private dialog: MatDialog,
    private decRenderCommentService:
      DecRenderCommentService, public translate: TranslateService) { }

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
      if (this.parentSize) {
        this.formatZoomPositon();
      }
      this.ctx.translate(this.zoomPosition.x, this.zoomPosition.y);
      this.ctx.scale(this.zoomScale, this.zoomScale);

      const wrh = this.imageElement.width / this.imageElement.height;
      let newWidth = this.canvasEl.width;
      let newHeight = newWidth / wrh;
      if (newHeight > this.canvasEl.height) {
        newHeight = this.canvasEl.height;
        newWidth = newHeight * wrh;
      }
      const heightToCenter = this.canvasEl.height / 2 - newHeight / 2;
      const widthToCenter = this.canvasEl.width / 2 - newWidth / 2;
      this.ctx.drawImage(this.imageElement, -(this.zoomPosition.x - widthToCenter), -(this.zoomPosition.y - heightToCenter), newWidth, newHeight);
      this.ctx.restore();
      this.drawMarks();
    };
    this.imageElement.src = this.marker.file.fileUrl;
  }

  formatZoomPositon() {
    if (this.parentSize.x === this.canvasEl.width) {
      return;
    }
    const proporX = this.canvasEl.width / (this.parentSize ? this.parentSize.x : 646);
    const proporY = this.canvasEl.height / (this.parentSize ? this.parentSize.y : 646);
    this.zoomPosition.x = this.zoomPosition.x * proporX;
    this.zoomPosition.y = this.zoomPosition.y * proporY;
  }

  private setupMarksWrapper(): void {
    this.marksWrapperEl = this.marksWrapper.nativeElement;
    this.setWrapperSize(this.canvasEl.width);
    this.setWrapperCursor();
  }

  private addInCommentsArray(comment: Tag): void {
    if (!this.marker.tags) {
      this.marker.tags = [];
    }
    this.marker.tags.push(comment);
  }

  private setupMouseEvents(): void {
    const mouseup = fromEvent(this.marksWrapperEl, 'mouseup');
    mouseup.subscribe((event: any) => {
      if (this.verifyMenu(event.target)) {
        const parent = event.target.parentElement.id === 'tagMenu' ? event.target.parentElement : event.target.parentElement.parentElement;
        const comment = parent.getAttribute('comment');
        const type = event.target.getAttribute('type') ? event.target.getAttribute('type') : event.target.parentElement.getAttribute('type');
        if (type === 'edit') {
          this.editTags(JSON.parse(comment));
        } else {
          this.removeTag(JSON.parse(comment));
        }
        this.removeMenu();
        return;
      }
      this.removeMenu();
      const target = event.target as HTMLDivElement;
      if (this.qaMode) {
        const x = Math.round(((this.startX / this.marksWrapperEl.offsetHeight) * 100) * 100) / 100;
        const y = Math.round(((this.startY / this.marksWrapperEl.offsetWidth) * 100) * 100) / 100;
        const x2 = Math.round(((event.offsetX / this.marksWrapperEl.offsetHeight) * 100) * 100) / 100;
        const y2 = Math.round(((event.offsetY / this.marksWrapperEl.offsetWidth) * 100) * 100) / 100;
        const index = this.marker.tags.length + 1;
        if (this.mouseMoved) {
          this.enablePointEvents(this.marksWrapperEl.querySelectorAll('.point-tag'));
          this.setMouseMoved(false);
          if (this.noComments) {
            const comment = new Tag({
              coordinates: [x, y, x2, y2],
              reference: this.noComments ? this.formatTagId() : index
            });
            this.addInCommentsArray(comment);
            this.createSquareTag([x, y, x2, y2], comment.reference);
            this.clearSquare();
            return;
          }

          const onlyColorVariation = this.jobType === 'COLOR';
          const dialogRef = this.dialog.open(DecRenderCommentComponent, { data: { onlyColorVariation } });
          dialogRef.afterClosed().subscribe(result => {
            if (result) {
              const comment = new Tag({
                coordinates: [x, y, x2, y2],
                comment: result.comment,
                description: result.description,
                reference: index
              });
              this.addInCommentsArray(comment);
              this.createSquareTag([x, y, x2, y2], comment.reference);
              this.clearSquare();
            }
          });
        } else {
          if (!target.classList.contains('point-tag') && !target.classList.contains('link-button')) {
            if (this.noComments) {
              const comment = new Tag({
                coordinates: [x, y],
                reference: this.noComments ? this.formatTagId() : index
              });
              this.addInCommentsArray(comment);
              this.createPointTag([x, y], comment.reference);
              return;
            }

            const onlyColorVariation = this.jobType === 'COLOR';
            const dialogRef = this.dialog.open(DecRenderCommentComponent, { data: { onlyColorVariation } });
            dialogRef.afterClosed().subscribe(result => {
              if (result) {
                const comment = new Tag({
                  coordinates: [x, y],
                  comment: result.comment,
                  description: result.description,
                  reference: index
                });
                this.addInCommentsArray(comment);
                this.createPointTag([x, y], comment.reference);
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

  private createPointTag(coordinates: number[], index: number, parentX?: number): HTMLDivElement {
    const [x, y] = coordinates;
    const tag = this.renderer.createElement('div');
    tag.innerHTML = this.noComments ? index : `${this.parentId}.${index}`;
    tag.className = 'point-tag';
    tag.style.top = `calc(${y}% - 12px)`;
    tag.style.left = `calc(${x}% - 12px)`;
    this.marksWrapperEl.appendChild(tag);
    if (!this.noComments && this.qaMode) {
      const link = this.renderer.createElement('div');
      link.classList.add('link-button');
      link.innerHTML = '+';
      const xPos = parentX ? parentX : x;
      const xPositionInPixels = xPos * this.marksWrapperEl.offsetWidth / 100;
      if (xPositionInPixels <= 32) {
        link.classList.add('right-side');
      }
      tag.appendChild(link);
      const comment = this.marker.tags.find(c => c.reference === index);
      this.linkTag(comment);
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
    } else if (this.noComments) {
      tag.addEventListener('click', event => {
        const tags = Array.from(this.marksWrapperEl.querySelectorAll('.point-tag')).filter(el => el.textContent === event.target.innerText);
        this.clickEventPointTagReference(this.marker.tags.filter(c => c.reference === event.target.innerText)[tags.indexOf(event.target)]);
      });
    } else {
      tag.addEventListener('mouseover', () => this.addCommentNode(this.marker.tags.find(c => c.reference === index)));
      tag.addEventListener('mouseout', this.removeCommentNode);
    }
    return tag;
  }

  linkTag(comment) {
    this.link.emit(comment);
  }

  private clickEventPointTag(comment: Tag) {
    if (this.qaMode) {
      const menu = this.createDivMenu(comment.coordinates, comment);
      this.marksWrapperEl.appendChild(menu);
    }
  }

  private clickEventPointTagReference(tag: Tag) {
    if (this.enableDeleteLinkedtag) {
      this.marker.tags.splice(this.marker.tags.indexOf(tag), 1);
      this.drawMarks();
    }
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
    const point = this.createPointTag([0, 0], index, x);
    square.appendChild(point);
    this.marksWrapperEl.appendChild(square);
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

  private drawMarks() {
    this.cleanMarks();
    if (this.marker.tags && this.marker.tags.length > 0) {
      this.decRenderCommentService.getRenderDescriptionsByCode(this.marker.tags);
      this.marker.tags.forEach((comment: Tag) => {
        if (comment.coordinates.length > 2) {
          this.createSquareTag(comment.coordinates, comment.reference);
        } else {
          this.createPointTag(comment.coordinates, comment.reference);
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
    this.marker.tags.splice(this.getTagIndex(comment), 1);
    this.deleteTag.emit(comment);
    this.marker.tags.forEach(c => {
      if (c.reference > comment.reference) {
        c.reference--;
      }
    });
    this.removeCommentNode();
    this.drawMarks();
  }

  public deleteMarkByReference(reference) {
    const tags = this.marker.tags.filter(t => t.reference.toString() === reference);
    if (tags && tags.length) {
      tags.forEach(t => {
        this.marker.tags.splice(this.marker.tags.indexOf(t), 1);
      });
    }
    this.marker.tags.forEach(t => {
      if (parseFloat(t.reference.toString()) > parseFloat(reference)) {
        t.reference = parseFloat((parseFloat(t.reference.toString()) - 0.1).toFixed(1));
      }
    });
    this.drawMarks();
  }

  private configureNoComments(square: HTMLDivElement): void {
    if (this.noComments) {
      square.style.borderStyle = 'dashed';
    }
  }

  private createDivMenu(coordinates, comment) {
    const [x, y] = coordinates;
    const menu = document.createElement('div');
    menu.id = 'tagMenu';
    menu.style.top = `calc(${y}% - 50px)`;
    menu.style.left = `calc(${x}% + 18px)`;
    menu.style.position = 'absolute';
    menu.style.width = '100px';
    menu.style.height = '100px';
    menu.style.backgroundColor = 'white';
    menu.style.zIndex = '99';
    menu.style.border = '1px solid rgba(0,0,0,0.15)';
    menu.setAttribute('comment', JSON.stringify(comment));

    const edit = document.createElement('div');
    edit.style.cursor = 'pointer';
    edit.setAttribute('type', 'edit');
    edit.style.marginTop = '15px';
    edit.style.textAlign = 'center';
    edit.innerHTML = '<img class="img-menu" width="24" height="24" src="/assets/img/edit-icon.svg"> <span class="icon-label">' + this.editLabel + '</span>';


    const deleteDiv = document.createElement('div');
    deleteDiv.style.cursor = 'pointer';
    deleteDiv.setAttribute('type', 'delete');
    deleteDiv.style.marginTop = '15px';
    deleteDiv.style.textAlign = 'center';
    deleteDiv.innerHTML = '<img class="img-menu" width="24" height="24" src="/assets/img/delete-icon.svg"> <span class="icon-delete-label">' + this.deleteLabel + ' </span>';

    menu.appendChild(edit);
    menu.appendChild(deleteDiv);
    return menu;
  }

  verifyMenu(target) {
    return target.parentElement.id === 'tagMenu' || target.parentElement.parentElement.id === 'tagMenu';
  }

  removeMenu() {
    const menu = document.getElementById('tagMenu');
    if (menu) {
      this.marksWrapperEl.removeChild(menu);
    }
  }

  private editTags(comment) {
    const commentEdit = { comment: comment.comment, version: comment.version };
    const onlyColorVariation = this.jobType === 'COLOR';

    const dialogRef = this.dialog.open(DecRenderCommentComponent, { data: { commentEdit, onlyColorVariation } });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        comment = this.getComment(comment);
        comment.comment = result.comment;
        comment.description = result.description;
      }
    });

  }

  getComment(tag) {
    for (let i = 0; i < this.marker.tags.length; i++) {
      if (JSON.stringify(tag.coordinates) === JSON.stringify(this.marker.tags[i].coordinates)) {
        return this.marker.tags[i];
      }
    }
  }

  private removeTag(comment) {
    this.deleteMark(comment);
  }

  public getTagIndex(tag) {
    for (let i = 0; i < this.marker.tags.length; i++) {
      if (JSON.stringify(tag.coordinates) === JSON.stringify(this.marker.tags[i].coordinates)) {
        return i;
      }
    }
    return -1;
  }
}
