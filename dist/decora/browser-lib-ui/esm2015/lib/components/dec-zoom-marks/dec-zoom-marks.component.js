/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input, ViewChild, ElementRef, HostListener, Renderer2, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Marker } from './models/marker.model';
import { Comment } from './models/comment.model';
import { fromEvent } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { DecRenderCommentComponent } from './../dec-render-comment/dec-render-comment.component';
import { DecRenderCommentService } from './../dec-render-comment/dec-render-comment.service';
export class DecZoomMarksComponent {
    /**
     * @param {?} renderer
     * @param {?} dialog
     * @param {?} decRenderCommentService
     */
    constructor(renderer, dialog, decRenderCommentService) {
        this.renderer = renderer;
        this.dialog = dialog;
        this.decRenderCommentService = decRenderCommentService;
        this.openZoomArea = new EventEmitter();
        this.imageElement = new Image();
        this.addCommentNode = (comment) => {
            /** @type {?} */
            const span = this.renderer.createElement('span');
            span.innerHTML = `${comment.comment} - ${comment.description}`;
            /** @type {?} */
            const commentDiv = this.renderer.createElement('div');
            commentDiv.className = 'comment-hover';
            commentDiv.style.maxWidth = this.canvasEl.width > 340 ? '340px' : 'calc(100% - 20px)';
            commentDiv.appendChild(span);
            this.marksWrapperEl.parentElement.appendChild(commentDiv);
        };
        this.getFormatedPositionAndScale = () => {
            /** @type {?} */
            const file = this.marker.file;
            return {
                file: file,
                position: {
                    x: this.zoomPosition.x,
                    y: this.zoomPosition.y
                },
                zoomScale: this.zoomScale
            };
        };
        this.addNewZoomArea = (newZoomArea) => {
            if (newZoomArea.coordinates.length > 0) {
                this.editZoomArea(newZoomArea);
                return;
            }
            newZoomArea.coordinates.push(Math.round(Math.round(((this.startX / this.marksWrapperEl.offsetWidth) * 100) * 100) / 100));
            newZoomArea.coordinates.push(Math.round(Math.round(((this.startY / this.marksWrapperEl.offsetHeight) * 100) * 100) / 100));
            newZoomArea.id = this.commentsArraySize + 1;
            this.marker.zoomAreas.push(newZoomArea);
            this.commentsArraySize++;
            this.drawMarks();
        };
        this.zoomPosition = { x: 0, y: 0 };
        this.zoomScale = 1;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set marker(value) {
        if (value !== this._marker) {
            this._marker = value;
            if (this.contentDone) {
                this.setupCanvas();
            }
        }
    }
    /**
     * @return {?}
     */
    get marker() {
        return this._marker;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set qaMode(value) {
        if (value !== this._qaMode) {
            this._qaMode = value;
            this.setWrapperCursor();
        }
    }
    /**
     * @return {?}
     */
    get qaMode() {
        return this._qaMode;
    }
    /**
     * @return {?}
     */
    onResize() {
        this.setCanvasSize(this.canvasEl.offsetWidth);
        this.setWrapperSize(this.canvasEl.width);
        this.zoom(this.zoomScale);
    }
    /**
     * @return {?}
     */
    ngAfterViewChecked() {
        if (!this.contentDone && this.canvas.nativeElement.parentElement.offsetWidth !== 0) {
            this.setupCanvas();
            this.setupMarksWrapper();
            this.setupMouseEvents();
            this.contentDone = true;
        }
    }
    /**
     * @return {?}
     */
    setupCanvas() {
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
    /**
     * @return {?}
     */
    setupLoadingContainer() {
        this.loadingContainerEl = this.loadingContainer.nativeElement;
        this.loadingContainerEl.style.width = `${this.canvasEl.offsetWidth}px`;
        this.loadingContainerEl.style.height = `${this.canvasEl.offsetWidth}px`;
        this.loadingContainerEl.style.display = 'flex';
    }
    /**
     * @return {?}
     */
    setupMarksWrapper() {
        this.marksWrapperEl = this.marksWrapper.nativeElement;
        this.setWrapperSize(this.canvasEl.width);
        this.setWrapperCursor();
    }
    /**
     * @return {?}
     */
    setupMouseEvents() {
        this.wheelEvent();
        this.mousedownEvent();
    }
    /**
     * @return {?}
     */
    wheelEvent() {
        fromEvent(this.marksWrapperEl, 'wheel').subscribe((event) => {
            event.preventDefault();
            /** @type {?} */
            const target = /** @type {?} */ (event.target);
            if (!target.classList.contains('point-tag') && !target.classList.contains('zoom-area-tag')) {
                this.setZoomPosition(((100 * event.offsetX) / this.marksWrapperEl.offsetWidth * this.canvasEl.offsetWidth) / 100, ((100 * event.offsetY) / this.marksWrapperEl.offsetHeight * this.canvasEl.offsetHeight) / 100);
                if (event.deltaY < 0) {
                    this.zoomIn(0.5);
                }
                event.deltaY < 0 ? this.zoomIn(0.5) : this.zoomOut(0.5);
            }
        });
    }
    /**
     * @return {?}
     */
    mouseleaveEvent() {
        return fromEvent(this.marksWrapperEl, 'mouseleave');
    }
    /**
     * @return {?}
     */
    mouseupEvent() {
        return fromEvent(this.marksWrapperEl, 'mouseup');
    }
    /**
     * @param {?} comment
     * @return {?}
     */
    addInCommentsArray(comment) {
        this.marker.comments.push(comment);
        this.commentsArraySize++;
    }
    /**
     * @return {?}
     */
    mousedownEvent() {
        /** @type {?} */
        const mouseup = this.mouseupEvent();
        mouseup.subscribe((event) => {
            this.setWrapperCursor();
            /** @type {?} */
            const target = /** @type {?} */ (event.target);
            this.enablePointEvents(this.marksWrapperEl.querySelectorAll('.point-tag'));
            if (this.qaMode && this.zoomScale === 1) {
                /** @type {?} */
                const x = Math.round(((this.startX / this.marksWrapperEl.offsetHeight) * 100) * 100) / 100;
                /** @type {?} */
                const y = Math.round(((this.startY / this.marksWrapperEl.offsetWidth) * 100) * 100) / 100;
                /** @type {?} */
                const x2 = Math.round(((event.offsetX / this.marksWrapperEl.offsetHeight) * 100) * 100) / 100;
                /** @type {?} */
                const y2 = Math.round(((event.offsetY / this.marksWrapperEl.offsetWidth) * 100) * 100) / 100;
                if (this.mouseMoved) {
                    this.setMouseMoved(false);
                    /** @type {?} */
                    const dialogRef = this.dialog.open(DecRenderCommentComponent);
                    dialogRef.afterClosed().subscribe(result => {
                        if (result) {
                            /** @type {?} */
                            const comment = new Comment({
                                coordinates: [x, y, x2, y2],
                                comment: result.comment,
                                description: result.description,
                                id: this.commentsArraySize + 1
                            });
                            this.addInCommentsArray(comment);
                            this.createSquareTag([x, y, x2, y2], comment.id);
                            this.clearSquare();
                        }
                    });
                }
                else {
                    if (!target.classList.contains('point-tag') && !target.classList.contains('zoom-area-tag')) {
                        /** @type {?} */
                        const dialogRef = this.dialog.open(DecRenderCommentComponent);
                        dialogRef.afterClosed().subscribe(result => {
                            if (result) {
                                /** @type {?} */
                                const comment = new Comment({
                                    coordinates: [x, y],
                                    comment: result.comment,
                                    description: result.description,
                                    id: this.commentsArraySize + 1
                                });
                                this.addInCommentsArray(comment);
                                this.createPointTag([x, y], comment.id);
                            }
                        });
                    }
                }
            }
        });
        /** @type {?} */
        const mouseleave = this.mouseleaveEvent();
        mouseleave.subscribe((event) => {
            this.setWrapperCursor();
            this.enablePointEvents(this.marksWrapperEl.querySelectorAll('.point-tag'));
            if (this.qaMode) {
                this.setMouseMoved(false);
                this.clearSquare();
            }
        });
        fromEvent(this.marksWrapperEl, 'mousedown').pipe(switchMap((event) => {
            this.startX = event.offsetX;
            this.startY = event.offsetY;
            this.setWrapperCursor(true);
            return fromEvent(this.marksWrapperEl, 'mousemove').pipe(takeUntil(mouseup), takeUntil(mouseleave));
        })).subscribe((event) => {
            if (this.qaMode && this.zoomScale === 1) {
                this.setMouseMoved(true);
                this.disablePointEvents(this.marksWrapperEl.querySelectorAll('.point-tag'));
                this.clearSquare();
                /** @type {?} */
                const square = this.renderer.createElement('div');
                square.id = 'squareMark';
                square.style.top = this.startY > event.offsetY ? `${event.offsetY}px` : `${this.startY}px`;
                square.style.left = this.startX > event.offsetX ? `${event.offsetX}px` : `${this.startX}px`;
                square.style.width = `${Math.abs(this.startX - event.offsetX)}px`;
                square.style.height = `${Math.abs(this.startY - event.offsetY)}px`;
                this.marksWrapperEl.appendChild(square);
            }
            else {
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
    /**
     * @return {?}
     */
    drawMarks() {
        this.cleanMarks();
        this.commentsArraySize = 0;
        this.decRenderCommentService.getRenderDescriptionsByCode(this.marker.comments);
        if (this.marker.comments && this.marker.comments.length > 0) {
            this.marker.comments.forEach((comment) => {
                if (comment.coordinates.length > 2) {
                    this.createSquareTag(comment.coordinates, comment.id);
                }
                else {
                    this.createPointTag(comment.coordinates, comment.id);
                }
            });
            this.commentsArraySize += this.marker.comments.length;
        }
        if (this.marker.zoomAreas && this.marker.zoomAreas.length > 0) {
            this.marker.zoomAreas.forEach((zoomArea) => {
                this.createZoomAreaTag(zoomArea.coordinates, zoomArea.id);
            });
            this.commentsArraySize += this.marker.zoomAreas.length;
        }
    }
    /**
     * @param {?} zoomScale
     * @return {?}
     */
    resizeMarker(zoomScale) {
        /** @type {?} */
        const diffX = this.canvasEl.width * zoomScale - this.canvasEl.width;
        /** @type {?} */
        const diffY = this.canvasEl.height * zoomScale - this.canvasEl.height;
        this.marksWrapperEl.style.width = `${this.canvasEl.width * zoomScale}px`;
        this.marksWrapperEl.style.height = `${this.canvasEl.height * zoomScale}px`;
        this.marksWrapperEl.style.left = this.zoomXPosition(diffX, zoomScale);
        this.marksWrapperEl.style.top = this.zoomYPosition(diffY, zoomScale);
    }
    /**
     * @param {?} diffY
     * @param {?} zoomScale
     * @return {?}
     */
    zoomYPosition(diffY, zoomScale) {
        if (this.zoomPosition.y !== (this.canvasEl.height / 2)) {
            if (zoomScale > 1) {
                /** @type {?} */
                const aux = zoomScale.toString().split('.')[0] > 1 ? (zoomScale - 1) : (zoomScale % 1);
                return -(this.zoomPosition.y * aux) + 'px';
            }
            else {
                return null;
            }
        }
        else {
            return (diffY / 2) * -1 + 'px';
        }
    }
    /**
     * @param {?} diffX
     * @param {?} zoomScale
     * @return {?}
     */
    zoomXPosition(diffX, zoomScale) {
        if (this.zoomPosition.x !== (this.canvasEl.width / 2)) {
            if (zoomScale > 1) {
                /** @type {?} */
                const aux = zoomScale.toString().split('.')[0] > 1 ? (zoomScale - 1) : (zoomScale % 1);
                return -(this.zoomPosition.x * aux) + 'px';
            }
            else {
                return null;
            }
        }
        else {
            return (diffX / 2) * -1 + 'px';
        }
    }
    /**
     * @param {?} elements
     * @return {?}
     */
    enablePointEvents(elements) {
        Array.from(elements).forEach((element) => {
            element.style.pointerEvents = 'all';
        });
    }
    /**
     * @param {?} elements
     * @return {?}
     */
    disablePointEvents(elements) {
        Array.from(elements).forEach((element) => {
            element.style.pointerEvents = 'none';
        });
    }
    /**
     * @return {?}
     */
    cleanMarks() {
        if (this.marksWrapperEl) {
            /** @type {?} */
            const pointElements = this.marksWrapperEl.getElementsByClassName('point-tag');
            /** @type {?} */
            const squareElements = this.marksWrapperEl.getElementsByClassName('square-tag');
            /** @type {?} */
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
    /**
     * @param {?} coordinates
     * @param {?} index
     * @return {?}
     */
    createPointTag(coordinates, index) {
        const [x, y] = coordinates;
        /** @type {?} */
        const tag = this.renderer.createElement('div');
        tag.innerHTML = `${index}`;
        tag.className = 'point-tag';
        tag.style.top = `calc(${y}% - 12px)`;
        tag.style.left = `calc(${x}% - 12px)`;
        this.marksWrapperEl.appendChild(tag);
        /** @type {?} */
        const comment = this.marker.comments.find(c => c.id === index);
        tag.addEventListener('click', () => this.clickEventPointTag(comment));
        tag.addEventListener('mouseover', () => this.addCommentNode(comment));
        tag.addEventListener('mouseout', this.removeCommentNode);
        return tag;
    }
    /**
     * @param {?} coordinates
     * @param {?} index
     * @return {?}
     */
    createZoomAreaTag(coordinates, index) {
        const [x, y] = coordinates;
        /** @type {?} */
        const tag = this.renderer.createElement('div');
        tag.innerHTML = `${index}`;
        tag.className = 'zoom-area-tag';
        tag.style.top = `calc(${y}% - 12px)`;
        tag.style.left = `calc(${x}% - 12px)`;
        this.marksWrapperEl.appendChild(tag);
        /** @type {?} */
        const zoomArea = this.marker.zoomAreas.find(z => z.id === index);
        tag.addEventListener('click', () => this.clickEventZoomTag(zoomArea));
        return tag;
    }
    /**
     * @param {?} coordinates
     * @param {?} index
     * @return {?}
     */
    createSquareTag(coordinates, index) {
        const [x, y, x2, y2] = coordinates;
        /** @type {?} */
        const square = this.renderer.createElement('div');
        square.className = 'square-tag';
        square.style.width = `${Math.abs(x - x2)}%`;
        square.style.height = `${Math.abs(y - y2)}%`;
        square.style.top = `${y2 > y ? y : y2}%`;
        square.style.left = `${x2 > x ? x : x2}%`;
        /** @type {?} */
        const point = this.createPointTag([0, 0], index);
        square.appendChild(point);
        this.marksWrapperEl.appendChild(square);
    }
    /**
     * @param {?} comment
     * @return {?}
     */
    clickEventPointTag(comment) {
        /** @type {?} */
        const dialogRef = this.dialog.open(DecRenderCommentComponent, { data: { comment: comment.comment, version: comment.version } });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                comment.comment = result.comment;
                comment.description = result.description;
            }
        });
    }
    /**
     * @param {?} zoomArea
     * @return {?}
     */
    clickEventZoomTag(zoomArea) {
        this.openZoomArea.emit(zoomArea);
    }
    /**
     * @return {?}
     */
    clearSquare() {
        if (document.getElementById('squareMark')) {
            document.getElementById('squareMark').remove();
        }
    }
    /**
     * @return {?}
     */
    removeCommentNode() {
        /** @type {?} */
        const commentNode = document.getElementsByClassName('comment-hover')[0];
        if (commentNode) {
            commentNode.parentElement.removeChild(commentNode);
        }
    }
    /**
     * @param {?} size
     * @return {?}
     */
    setCanvasSize(size) {
        this.canvasEl.width = size;
        this.canvasEl.height = size;
    }
    /**
     * @param {?} moved
     * @return {?}
     */
    setMouseMoved(moved) {
        this.mouseMoved = moved;
    }
    /**
     * @param {?} size
     * @return {?}
     */
    setWrapperSize(size) {
        this.marksWrapperEl.style.width = `${size}px`;
        this.marksWrapperEl.style.height = `${size}px`;
    }
    /**
     * @param {?} x
     * @param {?} y
     * @return {?}
     */
    setZoomPosition(x, y) {
        this.zoomPosition.x = x;
        this.zoomPosition.y = y;
    }
    /**
     * @param {?=} mousedown
     * @return {?}
     */
    setWrapperCursor(mousedown) {
        if (this.marksWrapperEl) {
            if (this.qaMode && this.zoomScale === 1) {
                this.marksWrapperEl.style.cursor = 'crosshair';
            }
            else if (mousedown) {
                this.marksWrapperEl.style.cursor = 'move';
            }
            else {
                this.marksWrapperEl.style.cursor = 'grab';
            }
        }
    }
    /**
     * @param {?=} zoomScale
     * @return {?}
     */
    zoom(zoomScale = 1) {
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
    /**
     * @param {?=} amount
     * @return {?}
     */
    zoomIn(amount = 1) {
        if (this.zoomScale < parseInt(this.maxZoomLevel, 10)) {
            (this.zoomScale + amount) < this.maxZoomLevel ? this.zoomScale += amount : this.zoomScale = +this.maxZoomLevel;
            this.zoom(this.zoomScale);
        }
    }
    /**
     * @param {?=} amount
     * @return {?}
     */
    zoomOut(amount = 1) {
        if (this.zoomScale > parseInt(this.minZoomLevel, 10)) {
            (this.zoomScale - amount) > this.minZoomLevel ? this.zoomScale -= amount : this.zoomScale = +this.minZoomLevel;
            this.zoom(this.zoomScale);
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    onZoomSlide(value) {
        this.zoom(value);
    }
    /**
     * @param {?} newZoomArea
     * @return {?}
     */
    editZoomArea(newZoomArea) {
        /** @type {?} */
        const za = this.marker.zoomAreas.find(x => x.id === newZoomArea.id);
        if (za) {
            za.renderShot = newZoomArea.renderShot;
            za.referenceShot = newZoomArea.referenceShot;
        }
    }
}
DecZoomMarksComponent.decorators = [
    { type: Component, args: [{
                selector: 'dec-zoom-marks',
                template: `<div class="zoom-container">
  <div #loadingContainer class="loading-container">
    <div class="spinner"></div>
  </div>
  <div #marksWrapper class="marks-wrapper"></div>
  <canvas #canvas></canvas>
</div>

<div fxLayoutAlign="center center" fxLayoutGap="8px">
  <button mat-icon-button color="primary" (click)="zoomOut()" [disabled]="zoomScale == minZoomLevel">
    <mat-icon aria-label="Zoom out">remove</mat-icon>
  </button>
  <mat-slider fxFlex color="primary" [min]="minZoomLevel" [max]="maxZoomLevel" [step]="stepZoomLevel" [(ngModel)]="zoomScale"
    (input)="onZoomSlide($event.value)"></mat-slider>
  <button mat-icon-button color="primary" (click)="zoomIn()" [disabled]="zoomScale == maxZoomLevel">
    <mat-icon aria-label="Zoom in">add</mat-icon>
  </button>
</div>
`,
                styles: [`#squareMark{position:absolute;border:2px solid #ff0ade;pointer-events:none}.zoom-container{display:flex;flex-direction:column;position:relative;overflow:hidden}.zoom-container .loading-container{position:absolute;display:flex;justify-content:center;align-items:center}.zoom-container .loading-container .spinner{width:20%;height:20%;border:16px solid #fff;border-radius:50%;border-top:16px solid #ff0ade;border-bottom:16px solid #ff0ade;-webkit-animation:2s linear infinite spin;animation:2s linear infinite spin}.zoom-container .marks-wrapper{position:absolute;z-index:1}.zoom-container .marks-wrapper .zoom-area-tag{position:absolute;font-size:12px;width:24px;height:24px;background-color:#ff0ade;font-weight:500;text-align:center;cursor:pointer;line-height:24px;color:#fff;border-radius:100%;border:1px solid #fff;box-sizing:border-box;text-shadow:0 0 10px #000;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;z-index:auto;display:flex;justify-content:center;align-items:center;pointer-events:all}.zoom-container .marks-wrapper .zoom-area-tag:before{content:'';position:absolute;width:34px;height:22px;top:12px;left:12px;background-color:#ff8f00;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAQAAABLCVATAAABVUlEQVR4Ae3PAwxQXRgA0Pvbto1sW2NDts0x27atIdeQrakpY8i23cnGe5nn8epDeO1h+VgeVdRVRJLwsCQ101nX2aWJd8OD8a7Ozrkda6UJ8XnPUsBZy43S2Wz7rs8UDnEZCZjn5+tzb6jqCDgucYhDakAnb4Rb+MdmMCPEYSqYfH2cXfPr/ymcBalDFF84izN+uD7TnHCdXqB7iCI/WByuuy1QbrAiRFEL9L3WlObmc/l7uUHfgn0hivqg47VaXMfluQ/A6RBFeTDmnq39D7aEKNKBXfcMVBVMCtFsB0XvFshbVoBSIZqGYL8/wh10B/u8F6L52E6wU7ZwEx/oC6gV4pHVOXDeIPn95WOZ1bYRsD7EJ79D7m4nmO7dEI+fTHC7o7p6h+uh4pJJB0vscMwKQ+X13uXZ6RGh4vKeeQ8c6nWoJiFadCjRFUXzntbeDc/GaxcAotf7cicflKkAAAAASUVORK5CYII=);background-size:60%;background-repeat:no-repeat;background-position:center;z-index:-1;border:1px solid #fff}.zoom-container .marks-wrapper .zoom-area-tag:hover{border-color:#ff0ade}.zoom-container .marks-wrapper .zoom-area-tag:hover:before{border-color:#ff8f00}.zoom-container .marks-wrapper .point-tag{position:absolute;font-size:12px;width:24px;height:24px;background-color:#ff0ade;font-weight:500;text-align:center;cursor:pointer;line-height:24px;color:#fff;border-radius:100%;border:1px solid #fff;box-sizing:border-box;text-shadow:0 0 10px #000;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;z-index:1;display:flex;justify-content:center;align-items:center;pointer-events:all}.zoom-container .marks-wrapper .point-tag:hover{border-color:#ff0ade}.zoom-container .marks-wrapper .square-tag{position:absolute;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;pointer-events:none;border:2px solid #ff0ade}.zoom-container .comment-hover{background-color:#ff0ade;box-sizing:border-box;padding:8px 12px;border-radius:4px;position:absolute;font-size:12px;line-height:18px;text-shadow:none;text-align:left;color:#fff;left:10px;top:10px;z-index:1}@-webkit-keyframes spin{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes spin{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}`]
            },] },
];
/** @nocollapse */
DecZoomMarksComponent.ctorParameters = () => [
    { type: Renderer2 },
    { type: MatDialog },
    { type: DecRenderCommentService }
];
DecZoomMarksComponent.propDecorators = {
    minZoomLevel: [{ type: Input }],
    maxZoomLevel: [{ type: Input }],
    stepZoomLevel: [{ type: Input }],
    marker: [{ type: Input }],
    qaMode: [{ type: Input }],
    openZoomArea: [{ type: Output }],
    canvas: [{ type: ViewChild, args: ['canvas',] }],
    marksWrapper: [{ type: ViewChild, args: ['marksWrapper',] }],
    loadingContainer: [{ type: ViewChild, args: ['loadingContainer',] }],
    onResize: [{ type: HostListener, args: ['window:resize',] }]
};
if (false) {
    /** @type {?} */
    DecZoomMarksComponent.prototype.minZoomLevel;
    /** @type {?} */
    DecZoomMarksComponent.prototype.maxZoomLevel;
    /** @type {?} */
    DecZoomMarksComponent.prototype.stepZoomLevel;
    /** @type {?} */
    DecZoomMarksComponent.prototype._marker;
    /** @type {?} */
    DecZoomMarksComponent.prototype.openZoomArea;
    /** @type {?} */
    DecZoomMarksComponent.prototype._qaMode;
    /** @type {?} */
    DecZoomMarksComponent.prototype.imageElement;
    /** @type {?} */
    DecZoomMarksComponent.prototype.commentsArraySize;
    /** @type {?} */
    DecZoomMarksComponent.prototype.contentDone;
    /** @type {?} */
    DecZoomMarksComponent.prototype.zoomPosition;
    /** @type {?} */
    DecZoomMarksComponent.prototype.startX;
    /** @type {?} */
    DecZoomMarksComponent.prototype.startY;
    /** @type {?} */
    DecZoomMarksComponent.prototype.mouseMoved;
    /** @type {?} */
    DecZoomMarksComponent.prototype.zoomScale;
    /** @type {?} */
    DecZoomMarksComponent.prototype.canvas;
    /** @type {?} */
    DecZoomMarksComponent.prototype.canvasEl;
    /** @type {?} */
    DecZoomMarksComponent.prototype.ctx;
    /** @type {?} */
    DecZoomMarksComponent.prototype.marksWrapper;
    /** @type {?} */
    DecZoomMarksComponent.prototype.marksWrapperEl;
    /** @type {?} */
    DecZoomMarksComponent.prototype.loadingContainer;
    /** @type {?} */
    DecZoomMarksComponent.prototype.loadingContainerEl;
    /** @type {?} */
    DecZoomMarksComponent.prototype.addCommentNode;
    /** @type {?} */
    DecZoomMarksComponent.prototype.getFormatedPositionAndScale;
    /** @type {?} */
    DecZoomMarksComponent.prototype.addNewZoomArea;
    /** @type {?} */
    DecZoomMarksComponent.prototype.renderer;
    /** @type {?} */
    DecZoomMarksComponent.prototype.dialog;
    /** @type {?} */
    DecZoomMarksComponent.prototype.decRenderCommentService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLXpvb20tbWFya3MuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL2RlYy16b29tLW1hcmtzL2RlYy16b29tLW1hcmtzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBb0IsS0FBSyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pJLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUM5QyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDL0MsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRWpELE9BQU8sRUFBRSxTQUFTLEVBQWMsTUFBTSxNQUFNLENBQUM7QUFDN0MsT0FBTyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUV0RCxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxzREFBc0QsQ0FBQztBQUNqRyxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxvREFBb0QsQ0FBQztBQXlCN0YsTUFBTTs7Ozs7O0lBaUVKLFlBQW9CLFFBQW1CLEVBQVUsTUFBaUIsRUFBVSx1QkFBZ0Q7UUFBeEcsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUFVLFdBQU0sR0FBTixNQUFNLENBQVc7UUFBVSw0QkFBdUIsR0FBdkIsdUJBQXVCLENBQXlCOzRCQWxDbkcsSUFBSSxZQUFZLEVBQUU7NEJBSUYsSUFBSSxLQUFLLEVBQUU7OEJBdVczQixDQUFDLE9BQWdCLEVBQVEsRUFBRTs7WUFDbEQsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7WUFF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QUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JELENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUM7WUFDL0csSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDM0I7Ozs7OztJQUdJLE9BQU8sQ0FBQyxTQUFpQixDQUFDO1FBQy9CLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JELENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUM7WUFDL0csSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDM0I7Ozs7OztJQUdJLFdBQVcsQ0FBQyxLQUFhO1FBQzlCLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Ozs7OztJQThCbkIsWUFBWSxDQUFDLFdBQVc7O1FBQ3RCLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3BFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDUCxFQUFFLENBQUMsVUFBVSxHQUFHLFdBQVcsQ0FBQyxVQUFVLENBQUM7WUFDdkMsRUFBRSxDQUFDLGFBQWEsR0FBRyxXQUFXLENBQUMsYUFBYSxDQUFDO1NBQzlDO0tBQ0Y7OztZQWxoQkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxnQkFBZ0I7Z0JBQzFCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBa0JYO2dCQUNDLE1BQU0sRUFBRSxDQUFDLGtyR0FBa3JHLENBQUM7YUFDN3JHOzs7O1lBakNpRixTQUFTO1lBQ2xGLFNBQVM7WUFRVCx1QkFBdUI7OzsyQkEyQjdCLEtBQUs7MkJBQ0wsS0FBSzs0QkFDTCxLQUFLO3FCQUVMLEtBQUs7cUJBY0wsS0FBSzsyQkFXTCxNQUFNO3FCQWlCTixTQUFTLFNBQUMsUUFBUTsyQkFJbEIsU0FBUyxTQUFDLGNBQWM7K0JBR3hCLFNBQVMsU0FBQyxrQkFBa0I7dUJBRzVCLFlBQVksU0FBQyxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBBZnRlclZpZXdDaGVja2VkLCBJbnB1dCwgVmlld0NoaWxkLCBFbGVtZW50UmVmLCBIb3N0TGlzdGVuZXIsIFJlbmRlcmVyMiwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1hdERpYWxvZyB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IE1hcmtlciB9IGZyb20gJy4vbW9kZWxzL21hcmtlci5tb2RlbCc7XG5pbXBvcnQgeyBDb21tZW50IH0gZnJvbSAnLi9tb2RlbHMvY29tbWVudC5tb2RlbCc7XG5pbXBvcnQgeyBab29tUG9zaXRpb24gfSBmcm9tICcuL21vZGVscy96b29tLXBvc2l0aW9uLmludGVyZmFjZSc7XG5pbXBvcnQgeyBmcm9tRXZlbnQsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHN3aXRjaE1hcCwgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgWm9vbUFyZWEgfSBmcm9tICcuL21vZGVscy96b29tLWFyZWEubW9kZWwnO1xuaW1wb3J0IHsgRGVjUmVuZGVyQ29tbWVudENvbXBvbmVudCB9IGZyb20gJy4vLi4vZGVjLXJlbmRlci1jb21tZW50L2RlYy1yZW5kZXItY29tbWVudC5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGVjUmVuZGVyQ29tbWVudFNlcnZpY2UgfSBmcm9tICcuLy4uL2RlYy1yZW5kZXItY29tbWVudC9kZWMtcmVuZGVyLWNvbW1lbnQuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy16b29tLW1hcmtzJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwiem9vbS1jb250YWluZXJcIj5cbiAgPGRpdiAjbG9hZGluZ0NvbnRhaW5lciBjbGFzcz1cImxvYWRpbmctY29udGFpbmVyXCI+XG4gICAgPGRpdiBjbGFzcz1cInNwaW5uZXJcIj48L2Rpdj5cbiAgPC9kaXY+XG4gIDxkaXYgI21hcmtzV3JhcHBlciBjbGFzcz1cIm1hcmtzLXdyYXBwZXJcIj48L2Rpdj5cbiAgPGNhbnZhcyAjY2FudmFzPjwvY2FudmFzPlxuPC9kaXY+XG5cbjxkaXYgZnhMYXlvdXRBbGlnbj1cImNlbnRlciBjZW50ZXJcIiBmeExheW91dEdhcD1cIjhweFwiPlxuICA8YnV0dG9uIG1hdC1pY29uLWJ1dHRvbiBjb2xvcj1cInByaW1hcnlcIiAoY2xpY2spPVwiem9vbU91dCgpXCIgW2Rpc2FibGVkXT1cInpvb21TY2FsZSA9PSBtaW5ab29tTGV2ZWxcIj5cbiAgICA8bWF0LWljb24gYXJpYS1sYWJlbD1cIlpvb20gb3V0XCI+cmVtb3ZlPC9tYXQtaWNvbj5cbiAgPC9idXR0b24+XG4gIDxtYXQtc2xpZGVyIGZ4RmxleCBjb2xvcj1cInByaW1hcnlcIiBbbWluXT1cIm1pblpvb21MZXZlbFwiIFttYXhdPVwibWF4Wm9vbUxldmVsXCIgW3N0ZXBdPVwic3RlcFpvb21MZXZlbFwiIFsobmdNb2RlbCldPVwiem9vbVNjYWxlXCJcbiAgICAoaW5wdXQpPVwib25ab29tU2xpZGUoJGV2ZW50LnZhbHVlKVwiPjwvbWF0LXNsaWRlcj5cbiAgPGJ1dHRvbiBtYXQtaWNvbi1idXR0b24gY29sb3I9XCJwcmltYXJ5XCIgKGNsaWNrKT1cInpvb21JbigpXCIgW2Rpc2FibGVkXT1cInpvb21TY2FsZSA9PSBtYXhab29tTGV2ZWxcIj5cbiAgICA8bWF0LWljb24gYXJpYS1sYWJlbD1cIlpvb20gaW5cIj5hZGQ8L21hdC1pY29uPlxuICA8L2J1dHRvbj5cbjwvZGl2PlxuYCxcbiAgc3R5bGVzOiBbYCNzcXVhcmVNYXJre3Bvc2l0aW9uOmFic29sdXRlO2JvcmRlcjoycHggc29saWQgI2ZmMGFkZTtwb2ludGVyLWV2ZW50czpub25lfS56b29tLWNvbnRhaW5lcntkaXNwbGF5OmZsZXg7ZmxleC1kaXJlY3Rpb246Y29sdW1uO3Bvc2l0aW9uOnJlbGF0aXZlO292ZXJmbG93OmhpZGRlbn0uem9vbS1jb250YWluZXIgLmxvYWRpbmctY29udGFpbmVye3Bvc2l0aW9uOmFic29sdXRlO2Rpc3BsYXk6ZmxleDtqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO2FsaWduLWl0ZW1zOmNlbnRlcn0uem9vbS1jb250YWluZXIgLmxvYWRpbmctY29udGFpbmVyIC5zcGlubmVye3dpZHRoOjIwJTtoZWlnaHQ6MjAlO2JvcmRlcjoxNnB4IHNvbGlkICNmZmY7Ym9yZGVyLXJhZGl1czo1MCU7Ym9yZGVyLXRvcDoxNnB4IHNvbGlkICNmZjBhZGU7Ym9yZGVyLWJvdHRvbToxNnB4IHNvbGlkICNmZjBhZGU7LXdlYmtpdC1hbmltYXRpb246MnMgbGluZWFyIGluZmluaXRlIHNwaW47YW5pbWF0aW9uOjJzIGxpbmVhciBpbmZpbml0ZSBzcGlufS56b29tLWNvbnRhaW5lciAubWFya3Mtd3JhcHBlcntwb3NpdGlvbjphYnNvbHV0ZTt6LWluZGV4OjF9Lnpvb20tY29udGFpbmVyIC5tYXJrcy13cmFwcGVyIC56b29tLWFyZWEtdGFne3Bvc2l0aW9uOmFic29sdXRlO2ZvbnQtc2l6ZToxMnB4O3dpZHRoOjI0cHg7aGVpZ2h0OjI0cHg7YmFja2dyb3VuZC1jb2xvcjojZmYwYWRlO2ZvbnQtd2VpZ2h0OjUwMDt0ZXh0LWFsaWduOmNlbnRlcjtjdXJzb3I6cG9pbnRlcjtsaW5lLWhlaWdodDoyNHB4O2NvbG9yOiNmZmY7Ym9yZGVyLXJhZGl1czoxMDAlO2JvcmRlcjoxcHggc29saWQgI2ZmZjtib3gtc2l6aW5nOmJvcmRlci1ib3g7dGV4dC1zaGFkb3c6MCAwIDEwcHggIzAwMDstd2Via2l0LXVzZXItc2VsZWN0Om5vbmU7LW1vei11c2VyLXNlbGVjdDpub25lOy1tcy11c2VyLXNlbGVjdDpub25lO3VzZXItc2VsZWN0Om5vbmU7ei1pbmRleDphdXRvO2Rpc3BsYXk6ZmxleDtqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO2FsaWduLWl0ZW1zOmNlbnRlcjtwb2ludGVyLWV2ZW50czphbGx9Lnpvb20tY29udGFpbmVyIC5tYXJrcy13cmFwcGVyIC56b29tLWFyZWEtdGFnOmJlZm9yZXtjb250ZW50OicnO3Bvc2l0aW9uOmFic29sdXRlO3dpZHRoOjM0cHg7aGVpZ2h0OjIycHg7dG9wOjEycHg7bGVmdDoxMnB4O2JhY2tncm91bmQtY29sb3I6I2ZmOGYwMDtiYWNrZ3JvdW5kLWltYWdlOnVybChkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUNRQUFBQWtDQVFBQUFCTENWQVRBQUFCVlVsRVFWUjRBZTNQQXd4UVhSZ0EwUHZidG8xc1cyTkR0czB4MjdhdElkZVFyYWtwWThpMjNjbkdlNW5uOGVwRGVPMWgrVmdlVmRSVlJKTHdzQ1ExMDFuWDJhV0pkOE9EOGE3T3pya2RhNlVKOFhuUFVzQlp5NDNTMld6N3JzOFVEbkVaQ1pqbjUrdHpiNmpxQ0RndWNZaERha0FuYjRSYitNZG1NQ1BFWVNxWWZIMmNYZlByL3ltY0JhbERGRjg0aXpOK3VEN1RuSENkWHFCN2lDSS9XQnl1dXkxUWJyQWlSRkVMOUwzV2xPYm1jL2w3dVVIZmduMGhpdnFnNDdWYVhNZmx1US9BNlJCRmVURG1ucTM5RDdhRUtOS0JYZmNNVkJWTUN0RnNCMFh2RnNoYlZvQlNJWnFHWUw4L3doMTBCL3U4RjZMNTJFNndVN1p3RXgvb0M2Z1Y0cEhWT1hEZUlQbjk1V09aMWJZUnNEN0VKNzlEN200bm1PN2RFSStmVEhDN283cDZoK3VoNHBKSkIwdnNjTXdLUStYMTN1WFo2UkdoNHZLZWVROGM2bldvSmlGYWRDalJGVVh6bnRiZURjL0dheGNBb3RmN2NpY2ZsS2tBQUFBQVNVVk9SSzVDWUlJPSk7YmFja2dyb3VuZC1zaXplOjYwJTtiYWNrZ3JvdW5kLXJlcGVhdDpuby1yZXBlYXQ7YmFja2dyb3VuZC1wb3NpdGlvbjpjZW50ZXI7ei1pbmRleDotMTtib3JkZXI6MXB4IHNvbGlkICNmZmZ9Lnpvb20tY29udGFpbmVyIC5tYXJrcy13cmFwcGVyIC56b29tLWFyZWEtdGFnOmhvdmVye2JvcmRlci1jb2xvcjojZmYwYWRlfS56b29tLWNvbnRhaW5lciAubWFya3Mtd3JhcHBlciAuem9vbS1hcmVhLXRhZzpob3ZlcjpiZWZvcmV7Ym9yZGVyLWNvbG9yOiNmZjhmMDB9Lnpvb20tY29udGFpbmVyIC5tYXJrcy13cmFwcGVyIC5wb2ludC10YWd7cG9zaXRpb246YWJzb2x1dGU7Zm9udC1zaXplOjEycHg7d2lkdGg6MjRweDtoZWlnaHQ6MjRweDtiYWNrZ3JvdW5kLWNvbG9yOiNmZjBhZGU7Zm9udC13ZWlnaHQ6NTAwO3RleHQtYWxpZ246Y2VudGVyO2N1cnNvcjpwb2ludGVyO2xpbmUtaGVpZ2h0OjI0cHg7Y29sb3I6I2ZmZjtib3JkZXItcmFkaXVzOjEwMCU7Ym9yZGVyOjFweCBzb2xpZCAjZmZmO2JveC1zaXppbmc6Ym9yZGVyLWJveDt0ZXh0LXNoYWRvdzowIDAgMTBweCAjMDAwOy13ZWJraXQtdXNlci1zZWxlY3Q6bm9uZTstbW96LXVzZXItc2VsZWN0Om5vbmU7LW1zLXVzZXItc2VsZWN0Om5vbmU7dXNlci1zZWxlY3Q6bm9uZTt6LWluZGV4OjE7ZGlzcGxheTpmbGV4O2p1c3RpZnktY29udGVudDpjZW50ZXI7YWxpZ24taXRlbXM6Y2VudGVyO3BvaW50ZXItZXZlbnRzOmFsbH0uem9vbS1jb250YWluZXIgLm1hcmtzLXdyYXBwZXIgLnBvaW50LXRhZzpob3Zlcntib3JkZXItY29sb3I6I2ZmMGFkZX0uem9vbS1jb250YWluZXIgLm1hcmtzLXdyYXBwZXIgLnNxdWFyZS10YWd7cG9zaXRpb246YWJzb2x1dGU7LXdlYmtpdC11c2VyLXNlbGVjdDpub25lOy1tb3otdXNlci1zZWxlY3Q6bm9uZTstbXMtdXNlci1zZWxlY3Q6bm9uZTt1c2VyLXNlbGVjdDpub25lO3BvaW50ZXItZXZlbnRzOm5vbmU7Ym9yZGVyOjJweCBzb2xpZCAjZmYwYWRlfS56b29tLWNvbnRhaW5lciAuY29tbWVudC1ob3ZlcntiYWNrZ3JvdW5kLWNvbG9yOiNmZjBhZGU7Ym94LXNpemluZzpib3JkZXItYm94O3BhZGRpbmc6OHB4IDEycHg7Ym9yZGVyLXJhZGl1czo0cHg7cG9zaXRpb246YWJzb2x1dGU7Zm9udC1zaXplOjEycHg7bGluZS1oZWlnaHQ6MThweDt0ZXh0LXNoYWRvdzpub25lO3RleHQtYWxpZ246bGVmdDtjb2xvcjojZmZmO2xlZnQ6MTBweDt0b3A6MTBweDt6LWluZGV4OjF9QC13ZWJraXQta2V5ZnJhbWVzIHNwaW57MCV7LXdlYmtpdC10cmFuc2Zvcm06cm90YXRlKDApO3RyYW5zZm9ybTpyb3RhdGUoMCl9MTAwJXstd2Via2l0LXRyYW5zZm9ybTpyb3RhdGUoMzYwZGVnKTt0cmFuc2Zvcm06cm90YXRlKDM2MGRlZyl9fUBrZXlmcmFtZXMgc3BpbnswJXstd2Via2l0LXRyYW5zZm9ybTpyb3RhdGUoMCk7dHJhbnNmb3JtOnJvdGF0ZSgwKX0xMDAley13ZWJraXQtdHJhbnNmb3JtOnJvdGF0ZSgzNjBkZWcpO3RyYW5zZm9ybTpyb3RhdGUoMzYwZGVnKX19YF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjWm9vbU1hcmtzQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3Q2hlY2tlZCB7XG5cbiAgQElucHV0KCkgbWluWm9vbUxldmVsOiBhbnk7XG4gIEBJbnB1dCgpIG1heFpvb21MZXZlbDogYW55O1xuICBASW5wdXQoKSBzdGVwWm9vbUxldmVsOiBhbnk7XG5cbiAgQElucHV0KClcbiAgc2V0IG1hcmtlcih2YWx1ZTogTWFya2VyKSB7XG4gICAgaWYgKHZhbHVlICE9PSB0aGlzLl9tYXJrZXIpIHtcbiAgICAgIHRoaXMuX21hcmtlciA9IHZhbHVlO1xuICAgICAgaWYgKHRoaXMuY29udGVudERvbmUpIHtcbiAgICAgICAgdGhpcy5zZXR1cENhbnZhcygpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBnZXQgbWFya2VyKCkge1xuICAgIHJldHVybiB0aGlzLl9tYXJrZXI7XG4gIH1cbiAgcHJpdmF0ZSBfbWFya2VyOiBNYXJrZXI7XG5cbiAgQElucHV0KClcbiAgc2V0IHFhTW9kZSh2YWx1ZTogYm9vbGVhbikge1xuICAgIGlmICh2YWx1ZSAhPT0gdGhpcy5fcWFNb2RlKSB7XG4gICAgICB0aGlzLl9xYU1vZGUgPSB2YWx1ZTtcbiAgICAgIHRoaXMuc2V0V3JhcHBlckN1cnNvcigpO1xuICAgIH1cbiAgfVxuICBnZXQgcWFNb2RlKCkge1xuICAgIHJldHVybiB0aGlzLl9xYU1vZGU7XG4gIH1cblxuICBAT3V0cHV0KCkgb3Blblpvb21BcmVhID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIHByaXZhdGUgX3FhTW9kZTogYm9vbGVhbjtcblxuICBwcml2YXRlIGltYWdlRWxlbWVudDogSFRNTEltYWdlRWxlbWVudCA9IG5ldyBJbWFnZSgpO1xuXG4gIHByaXZhdGUgY29tbWVudHNBcnJheVNpemU6IG51bWJlcjtcblxuICBwcml2YXRlIGNvbnRlbnREb25lOiBib29sZWFuO1xuXG4gIHByaXZhdGUgem9vbVBvc2l0aW9uOiBab29tUG9zaXRpb247XG4gIHByaXZhdGUgc3RhcnRYOiBudW1iZXI7XG4gIHByaXZhdGUgc3RhcnRZOiBudW1iZXI7XG4gIHByaXZhdGUgbW91c2VNb3ZlZDogYm9vbGVhbjtcblxuICBwdWJsaWMgem9vbVNjYWxlOiBudW1iZXI7XG5cbiAgQFZpZXdDaGlsZCgnY2FudmFzJykgY2FudmFzOiBFbGVtZW50UmVmO1xuICBwdWJsaWMgY2FudmFzRWw6IEhUTUxDYW52YXNFbGVtZW50O1xuICBwcml2YXRlIGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xuXG4gIEBWaWV3Q2hpbGQoJ21hcmtzV3JhcHBlcicpIG1hcmtzV3JhcHBlcjogRWxlbWVudFJlZjtcbiAgcHVibGljIG1hcmtzV3JhcHBlckVsOiBIVE1MRGl2RWxlbWVudDtcblxuICBAVmlld0NoaWxkKCdsb2FkaW5nQ29udGFpbmVyJykgbG9hZGluZ0NvbnRhaW5lcjogRWxlbWVudFJlZjtcbiAgcHVibGljIGxvYWRpbmdDb250YWluZXJFbDogSFRNTERpdkVsZW1lbnQ7XG5cbiAgQEhvc3RMaXN0ZW5lcignd2luZG93OnJlc2l6ZScpXG4gIG9uUmVzaXplKCkge1xuICAgIHRoaXMuc2V0Q2FudmFzU2l6ZSh0aGlzLmNhbnZhc0VsLm9mZnNldFdpZHRoKTtcbiAgICB0aGlzLnNldFdyYXBwZXJTaXplKHRoaXMuY2FudmFzRWwud2lkdGgpO1xuICAgIHRoaXMuem9vbSh0aGlzLnpvb21TY2FsZSk7XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsIHByaXZhdGUgZGlhbG9nOiBNYXREaWFsb2csIHByaXZhdGUgZGVjUmVuZGVyQ29tbWVudFNlcnZpY2U6IERlY1JlbmRlckNvbW1lbnRTZXJ2aWNlKSB7XG4gICAgdGhpcy56b29tUG9zaXRpb24gPSB7IHg6IDAsIHk6IDAgfTtcbiAgICB0aGlzLnpvb21TY2FsZSA9IDE7XG4gIH1cblxuICBuZ0FmdGVyVmlld0NoZWNrZWQoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmNvbnRlbnREb25lICYmIHRoaXMuY2FudmFzLm5hdGl2ZUVsZW1lbnQucGFyZW50RWxlbWVudC5vZmZzZXRXaWR0aCAhPT0gMCkge1xuICAgICAgdGhpcy5zZXR1cENhbnZhcygpO1xuICAgICAgdGhpcy5zZXR1cE1hcmtzV3JhcHBlcigpO1xuICAgICAgdGhpcy5zZXR1cE1vdXNlRXZlbnRzKCk7XG4gICAgICB0aGlzLmNvbnRlbnREb25lID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNldHVwQ2FudmFzKCk6IHZvaWQge1xuICAgIHRoaXMuY2FudmFzRWwgPSB0aGlzLmNhbnZhcy5uYXRpdmVFbGVtZW50O1xuICAgIHRoaXMuc2V0Q2FudmFzU2l6ZSh0aGlzLmNhbnZhc0VsLm9mZnNldFdpZHRoKTtcbiAgICB0aGlzLmNsZWFuTWFya3MoKTtcbiAgICB0aGlzLnNldHVwTG9hZGluZ0NvbnRhaW5lcigpO1xuICAgIHRoaXMuY3R4ID0gdGhpcy5jYW52YXNFbC5nZXRDb250ZXh0KCcyZCcpO1xuICAgIHRoaXMuaW1hZ2VFbGVtZW50Lm9ubG9hZCA9ICgpID0+IHtcbiAgICAgIHRoaXMubG9hZGluZ0NvbnRhaW5lckVsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICB0aGlzLmN0eC5kcmF3SW1hZ2UodGhpcy5pbWFnZUVsZW1lbnQsIDAsIDAsIHRoaXMuY2FudmFzRWwud2lkdGgsIHRoaXMuY2FudmFzRWwud2lkdGgpO1xuICAgICAgdGhpcy5kcmF3TWFya3MoKTtcbiAgICAgIHRoaXMuc2V0Wm9vbVBvc2l0aW9uKHRoaXMuY2FudmFzRWwud2lkdGggKiAwLjUsIHRoaXMuY2FudmFzRWwud2lkdGggKiAwLjUpO1xuICAgIH07XG4gICAgdGhpcy5pbWFnZUVsZW1lbnQuc3JjID0gdGhpcy5tYXJrZXIuZmlsZS5maWxlVXJsO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXR1cExvYWRpbmdDb250YWluZXIoKTogdm9pZCB7XG4gICAgdGhpcy5sb2FkaW5nQ29udGFpbmVyRWwgPSB0aGlzLmxvYWRpbmdDb250YWluZXIubmF0aXZlRWxlbWVudDtcbiAgICB0aGlzLmxvYWRpbmdDb250YWluZXJFbC5zdHlsZS53aWR0aCA9IGAke3RoaXMuY2FudmFzRWwub2Zmc2V0V2lkdGh9cHhgO1xuICAgIHRoaXMubG9hZGluZ0NvbnRhaW5lckVsLnN0eWxlLmhlaWdodCA9IGAke3RoaXMuY2FudmFzRWwub2Zmc2V0V2lkdGh9cHhgO1xuICAgIHRoaXMubG9hZGluZ0NvbnRhaW5lckVsLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XG4gIH1cblxuICBwcml2YXRlIHNldHVwTWFya3NXcmFwcGVyKCk6IHZvaWQge1xuICAgIHRoaXMubWFya3NXcmFwcGVyRWwgPSB0aGlzLm1hcmtzV3JhcHBlci5uYXRpdmVFbGVtZW50O1xuICAgIHRoaXMuc2V0V3JhcHBlclNpemUodGhpcy5jYW52YXNFbC53aWR0aCk7XG4gICAgdGhpcy5zZXRXcmFwcGVyQ3Vyc29yKCk7XG4gIH1cblxuICBwcml2YXRlIHNldHVwTW91c2VFdmVudHMoKTogdm9pZCB7XG4gICAgdGhpcy53aGVlbEV2ZW50KCk7XG4gICAgdGhpcy5tb3VzZWRvd25FdmVudCgpO1xuICB9XG5cbiAgcHJpdmF0ZSB3aGVlbEV2ZW50KCk6IHZvaWQge1xuICAgIGZyb21FdmVudCh0aGlzLm1hcmtzV3JhcHBlckVsLCAnd2hlZWwnKS5zdWJzY3JpYmUoKGV2ZW50OiBXaGVlbEV2ZW50KSA9PiB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0IGFzIEhUTUxEaXZFbGVtZW50O1xuICAgICAgaWYgKCF0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdwb2ludC10YWcnKSAmJiAhdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnem9vbS1hcmVhLXRhZycpKSB7XG4gICAgICAgIHRoaXMuc2V0Wm9vbVBvc2l0aW9uKFxuICAgICAgICAgICgoMTAwICogZXZlbnQub2Zmc2V0WCkgLyB0aGlzLm1hcmtzV3JhcHBlckVsLm9mZnNldFdpZHRoICogdGhpcy5jYW52YXNFbC5vZmZzZXRXaWR0aCkgLyAxMDAsXG4gICAgICAgICAgKCgxMDAgKiBldmVudC5vZmZzZXRZKSAvIHRoaXMubWFya3NXcmFwcGVyRWwub2Zmc2V0SGVpZ2h0ICogdGhpcy5jYW52YXNFbC5vZmZzZXRIZWlnaHQpIC8gMTAwKTtcbiAgICAgICAgaWYgKGV2ZW50LmRlbHRhWSA8IDApIHtcbiAgICAgICAgICB0aGlzLnpvb21JbigwLjUpO1xuICAgICAgICB9XG4gICAgICAgIGV2ZW50LmRlbHRhWSA8IDAgPyB0aGlzLnpvb21JbigwLjUpIDogdGhpcy56b29tT3V0KDAuNSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIG1vdXNlbGVhdmVFdmVudCgpOiBPYnNlcnZhYmxlPEV2ZW50PiB7XG4gICAgcmV0dXJuIGZyb21FdmVudCh0aGlzLm1hcmtzV3JhcHBlckVsLCAnbW91c2VsZWF2ZScpO1xuICB9XG5cbiAgcHJpdmF0ZSBtb3VzZXVwRXZlbnQoKTogT2JzZXJ2YWJsZTxFdmVudD4ge1xuICAgIHJldHVybiBmcm9tRXZlbnQodGhpcy5tYXJrc1dyYXBwZXJFbCwgJ21vdXNldXAnKTtcbiAgfVxuXG4gIHByaXZhdGUgYWRkSW5Db21tZW50c0FycmF5KGNvbW1lbnQ6IENvbW1lbnQpOiB2b2lkIHtcbiAgICB0aGlzLm1hcmtlci5jb21tZW50cy5wdXNoKGNvbW1lbnQpO1xuICAgIHRoaXMuY29tbWVudHNBcnJheVNpemUrKztcbiAgfVxuXG4gIHByaXZhdGUgbW91c2Vkb3duRXZlbnQoKTogdm9pZCB7XG4gICAgY29uc3QgbW91c2V1cCA9IHRoaXMubW91c2V1cEV2ZW50KCk7XG4gICAgbW91c2V1cC5zdWJzY3JpYmUoKGV2ZW50OiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICB0aGlzLnNldFdyYXBwZXJDdXJzb3IoKTtcbiAgICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldCBhcyBIVE1MRGl2RWxlbWVudDtcbiAgICAgIHRoaXMuZW5hYmxlUG9pbnRFdmVudHModGhpcy5tYXJrc1dyYXBwZXJFbC5xdWVyeVNlbGVjdG9yQWxsKCcucG9pbnQtdGFnJykpO1xuICAgICAgaWYgKHRoaXMucWFNb2RlICYmIHRoaXMuem9vbVNjYWxlID09PSAxKSB7XG4gICAgICAgIGNvbnN0IHggPSBNYXRoLnJvdW5kKCgodGhpcy5zdGFydFggLyB0aGlzLm1hcmtzV3JhcHBlckVsLm9mZnNldEhlaWdodCkgKiAxMDApICogMTAwKSAvIDEwMDtcbiAgICAgICAgY29uc3QgeSA9IE1hdGgucm91bmQoKCh0aGlzLnN0YXJ0WSAvIHRoaXMubWFya3NXcmFwcGVyRWwub2Zmc2V0V2lkdGgpICogMTAwKSAqIDEwMCkgLyAxMDA7XG4gICAgICAgIGNvbnN0IHgyID0gTWF0aC5yb3VuZCgoKGV2ZW50Lm9mZnNldFggLyB0aGlzLm1hcmtzV3JhcHBlckVsLm9mZnNldEhlaWdodCkgKiAxMDApICogMTAwKSAvIDEwMDtcbiAgICAgICAgY29uc3QgeTIgPSBNYXRoLnJvdW5kKCgoZXZlbnQub2Zmc2V0WSAvIHRoaXMubWFya3NXcmFwcGVyRWwub2Zmc2V0V2lkdGgpICogMTAwKSAqIDEwMCkgLyAxMDA7XG4gICAgICAgIGlmICh0aGlzLm1vdXNlTW92ZWQpIHtcbiAgICAgICAgICB0aGlzLnNldE1vdXNlTW92ZWQoZmFsc2UpO1xuICAgICAgICAgIGNvbnN0IGRpYWxvZ1JlZiA9IHRoaXMuZGlhbG9nLm9wZW4oRGVjUmVuZGVyQ29tbWVudENvbXBvbmVudCk7XG4gICAgICAgICAgZGlhbG9nUmVmLmFmdGVyQ2xvc2VkKCkuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgIGNvbnN0IGNvbW1lbnQgPSBuZXcgQ29tbWVudCh7XG4gICAgICAgICAgICAgICAgY29vcmRpbmF0ZXM6IFt4LCB5LCB4MiwgeTJdLFxuICAgICAgICAgICAgICAgIGNvbW1lbnQ6IHJlc3VsdC5jb21tZW50LFxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiByZXN1bHQuZGVzY3JpcHRpb24sXG4gICAgICAgICAgICAgICAgaWQ6IHRoaXMuY29tbWVudHNBcnJheVNpemUgKyAxXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB0aGlzLmFkZEluQ29tbWVudHNBcnJheShjb21tZW50KTtcbiAgICAgICAgICAgICAgdGhpcy5jcmVhdGVTcXVhcmVUYWcoW3gsIHksIHgyLCB5Ml0sIGNvbW1lbnQuaWQpO1xuICAgICAgICAgICAgICB0aGlzLmNsZWFyU3F1YXJlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKCF0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdwb2ludC10YWcnKSAmJiAhdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnem9vbS1hcmVhLXRhZycpKSB7XG4gICAgICAgICAgICBjb25zdCBkaWFsb2dSZWYgPSB0aGlzLmRpYWxvZy5vcGVuKERlY1JlbmRlckNvbW1lbnRDb21wb25lbnQpO1xuICAgICAgICAgICAgZGlhbG9nUmVmLmFmdGVyQ2xvc2VkKCkuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjb21tZW50ID0gbmV3IENvbW1lbnQoe1xuICAgICAgICAgICAgICAgICAgY29vcmRpbmF0ZXM6IFt4LCB5XSxcbiAgICAgICAgICAgICAgICAgIGNvbW1lbnQ6IHJlc3VsdC5jb21tZW50LFxuICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IHJlc3VsdC5kZXNjcmlwdGlvbixcbiAgICAgICAgICAgICAgICAgIGlkOiB0aGlzLmNvbW1lbnRzQXJyYXlTaXplICsgMVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkSW5Db21tZW50c0FycmF5KGNvbW1lbnQpO1xuICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlUG9pbnRUYWcoW3gsIHldLCBjb21tZW50LmlkKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBtb3VzZWxlYXZlID0gdGhpcy5tb3VzZWxlYXZlRXZlbnQoKTtcbiAgICBtb3VzZWxlYXZlLnN1YnNjcmliZSgoZXZlbnQ6IE1vdXNlRXZlbnQpID0+IHtcbiAgICAgIHRoaXMuc2V0V3JhcHBlckN1cnNvcigpO1xuICAgICAgdGhpcy5lbmFibGVQb2ludEV2ZW50cyh0aGlzLm1hcmtzV3JhcHBlckVsLnF1ZXJ5U2VsZWN0b3JBbGwoJy5wb2ludC10YWcnKSk7XG4gICAgICBpZiAodGhpcy5xYU1vZGUpIHtcbiAgICAgICAgdGhpcy5zZXRNb3VzZU1vdmVkKGZhbHNlKTtcbiAgICAgICAgdGhpcy5jbGVhclNxdWFyZSgpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgZnJvbUV2ZW50KHRoaXMubWFya3NXcmFwcGVyRWwsICdtb3VzZWRvd24nKS5waXBlKFxuICAgICAgc3dpdGNoTWFwKChldmVudDogTW91c2VFdmVudCkgPT4ge1xuICAgICAgICB0aGlzLnN0YXJ0WCA9IGV2ZW50Lm9mZnNldFg7XG4gICAgICAgIHRoaXMuc3RhcnRZID0gZXZlbnQub2Zmc2V0WTtcbiAgICAgICAgdGhpcy5zZXRXcmFwcGVyQ3Vyc29yKHRydWUpO1xuICAgICAgICByZXR1cm4gZnJvbUV2ZW50KHRoaXMubWFya3NXcmFwcGVyRWwsICdtb3VzZW1vdmUnKS5waXBlKFxuICAgICAgICAgIHRha2VVbnRpbChtb3VzZXVwKSxcbiAgICAgICAgICB0YWtlVW50aWwobW91c2VsZWF2ZSlcbiAgICAgICAgKTtcbiAgICAgIH0pXG4gICAgKS5zdWJzY3JpYmUoKGV2ZW50OiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICBpZiAodGhpcy5xYU1vZGUgJiYgdGhpcy56b29tU2NhbGUgPT09IDEpIHtcbiAgICAgICAgdGhpcy5zZXRNb3VzZU1vdmVkKHRydWUpO1xuICAgICAgICB0aGlzLmRpc2FibGVQb2ludEV2ZW50cyh0aGlzLm1hcmtzV3JhcHBlckVsLnF1ZXJ5U2VsZWN0b3JBbGwoJy5wb2ludC10YWcnKSk7XG4gICAgICAgIHRoaXMuY2xlYXJTcXVhcmUoKTtcbiAgICAgICAgY29uc3Qgc3F1YXJlID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgc3F1YXJlLmlkID0gJ3NxdWFyZU1hcmsnO1xuICAgICAgICBzcXVhcmUuc3R5bGUudG9wID0gdGhpcy5zdGFydFkgPiBldmVudC5vZmZzZXRZID8gYCR7ZXZlbnQub2Zmc2V0WX1weGAgOiBgJHt0aGlzLnN0YXJ0WX1weGA7XG4gICAgICAgIHNxdWFyZS5zdHlsZS5sZWZ0ID0gdGhpcy5zdGFydFggPiBldmVudC5vZmZzZXRYID8gYCR7ZXZlbnQub2Zmc2V0WH1weGAgOiBgJHt0aGlzLnN0YXJ0WH1weGA7XG4gICAgICAgIHNxdWFyZS5zdHlsZS53aWR0aCA9IGAke01hdGguYWJzKHRoaXMuc3RhcnRYIC0gZXZlbnQub2Zmc2V0WCl9cHhgO1xuICAgICAgICBzcXVhcmUuc3R5bGUuaGVpZ2h0ID0gYCR7TWF0aC5hYnModGhpcy5zdGFydFkgLSBldmVudC5vZmZzZXRZKX1weGA7XG4gICAgICAgIHRoaXMubWFya3NXcmFwcGVyRWwuYXBwZW5kQ2hpbGQoc3F1YXJlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuem9vbVBvc2l0aW9uLnggLT0gZXZlbnQubW92ZW1lbnRYO1xuICAgICAgICB0aGlzLnpvb21Qb3NpdGlvbi55IC09IGV2ZW50Lm1vdmVtZW50WTtcbiAgICAgICAgaWYgKHRoaXMuem9vbVBvc2l0aW9uLnggPCAwKSB7XG4gICAgICAgICAgdGhpcy56b29tUG9zaXRpb24ueCA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuem9vbVBvc2l0aW9uLnkgPCAwKSB7XG4gICAgICAgICAgdGhpcy56b29tUG9zaXRpb24ueSA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuem9vbVBvc2l0aW9uLnggPiB0aGlzLmNhbnZhc0VsLndpZHRoKSB7XG4gICAgICAgICAgdGhpcy56b29tUG9zaXRpb24ueCA9IHRoaXMuY2FudmFzRWwud2lkdGg7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuem9vbVBvc2l0aW9uLnkgPiB0aGlzLmNhbnZhc0VsLmhlaWdodCkge1xuICAgICAgICAgIHRoaXMuem9vbVBvc2l0aW9uLnkgPSB0aGlzLmNhbnZhc0VsLmhlaWdodDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlc2l6ZU1hcmtlcih0aGlzLnpvb21TY2FsZSk7XG4gICAgICAgIHRoaXMuY3R4LmNsZWFyUmVjdCgwLCAwLCB0aGlzLmNhbnZhc0VsLndpZHRoLCB0aGlzLmNhbnZhc0VsLmhlaWdodCk7XG4gICAgICAgIHRoaXMuY3R4LnNhdmUoKTtcbiAgICAgICAgdGhpcy5jdHgudHJhbnNsYXRlKHRoaXMuem9vbVBvc2l0aW9uLngsIHRoaXMuem9vbVBvc2l0aW9uLnkpO1xuICAgICAgICB0aGlzLmN0eC5zY2FsZSh0aGlzLnpvb21TY2FsZSwgdGhpcy56b29tU2NhbGUpO1xuICAgICAgICB0aGlzLmN0eC50cmFuc2xhdGUoLXRoaXMuem9vbVBvc2l0aW9uLngsIC10aGlzLnpvb21Qb3NpdGlvbi55KTtcbiAgICAgICAgdGhpcy5jdHguZHJhd0ltYWdlKHRoaXMuaW1hZ2VFbGVtZW50LCAwLCAwLCB0aGlzLmNhbnZhc0VsLndpZHRoLCB0aGlzLmNhbnZhc0VsLmhlaWdodCk7XG4gICAgICAgIHRoaXMuY3R4LnJlc3RvcmUoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgZHJhd01hcmtzKCkge1xuICAgIHRoaXMuY2xlYW5NYXJrcygpO1xuICAgIHRoaXMuY29tbWVudHNBcnJheVNpemUgPSAwO1xuICAgIHRoaXMuZGVjUmVuZGVyQ29tbWVudFNlcnZpY2UuZ2V0UmVuZGVyRGVzY3JpcHRpb25zQnlDb2RlKHRoaXMubWFya2VyLmNvbW1lbnRzKTtcbiAgICBpZiAodGhpcy5tYXJrZXIuY29tbWVudHMgJiYgdGhpcy5tYXJrZXIuY29tbWVudHMubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5tYXJrZXIuY29tbWVudHMuZm9yRWFjaCgoY29tbWVudDogQ29tbWVudCkgPT4ge1xuICAgICAgICBpZiAoY29tbWVudC5jb29yZGluYXRlcy5sZW5ndGggPiAyKSB7XG4gICAgICAgICAgdGhpcy5jcmVhdGVTcXVhcmVUYWcoY29tbWVudC5jb29yZGluYXRlcywgY29tbWVudC5pZCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5jcmVhdGVQb2ludFRhZyhjb21tZW50LmNvb3JkaW5hdGVzLCBjb21tZW50LmlkKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICB0aGlzLmNvbW1lbnRzQXJyYXlTaXplICs9IHRoaXMubWFya2VyLmNvbW1lbnRzLmxlbmd0aDtcbiAgICB9XG4gICAgaWYgKHRoaXMubWFya2VyLnpvb21BcmVhcyAmJiB0aGlzLm1hcmtlci56b29tQXJlYXMubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5tYXJrZXIuem9vbUFyZWFzLmZvckVhY2goKHpvb21BcmVhOiBab29tQXJlYSkgPT4ge1xuICAgICAgICB0aGlzLmNyZWF0ZVpvb21BcmVhVGFnKHpvb21BcmVhLmNvb3JkaW5hdGVzLCB6b29tQXJlYS5pZCk7XG4gICAgICB9KTtcbiAgICAgIHRoaXMuY29tbWVudHNBcnJheVNpemUgKz0gdGhpcy5tYXJrZXIuem9vbUFyZWFzLmxlbmd0aDtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHJlc2l6ZU1hcmtlcih6b29tU2NhbGUpIHtcbiAgICBjb25zdCBkaWZmWCA9IHRoaXMuY2FudmFzRWwud2lkdGggKiB6b29tU2NhbGUgLSB0aGlzLmNhbnZhc0VsLndpZHRoO1xuICAgIGNvbnN0IGRpZmZZID0gdGhpcy5jYW52YXNFbC5oZWlnaHQgKiB6b29tU2NhbGUgLSB0aGlzLmNhbnZhc0VsLmhlaWdodDtcbiAgICB0aGlzLm1hcmtzV3JhcHBlckVsLnN0eWxlLndpZHRoID0gYCR7dGhpcy5jYW52YXNFbC53aWR0aCAqIHpvb21TY2FsZX1weGA7XG4gICAgdGhpcy5tYXJrc1dyYXBwZXJFbC5zdHlsZS5oZWlnaHQgPSBgJHt0aGlzLmNhbnZhc0VsLmhlaWdodCAqIHpvb21TY2FsZX1weGA7XG4gICAgdGhpcy5tYXJrc1dyYXBwZXJFbC5zdHlsZS5sZWZ0ID0gdGhpcy56b29tWFBvc2l0aW9uKGRpZmZYLCB6b29tU2NhbGUpO1xuICAgIHRoaXMubWFya3NXcmFwcGVyRWwuc3R5bGUudG9wID0gdGhpcy56b29tWVBvc2l0aW9uKGRpZmZZLCB6b29tU2NhbGUpO1xuICB9XG5cbiAgcHJpdmF0ZSB6b29tWVBvc2l0aW9uKGRpZmZZLCB6b29tU2NhbGUpIHtcbiAgICBpZiAodGhpcy56b29tUG9zaXRpb24ueSAhPT0gKHRoaXMuY2FudmFzRWwuaGVpZ2h0IC8gMikpIHtcbiAgICAgIGlmICh6b29tU2NhbGUgPiAxKSB7XG4gICAgICAgIGNvbnN0IGF1eCA9IHpvb21TY2FsZS50b1N0cmluZygpLnNwbGl0KCcuJylbMF0gPiAxID8gKHpvb21TY2FsZSAtIDEpIDogKHpvb21TY2FsZSAlIDEpO1xuICAgICAgICByZXR1cm4gLSh0aGlzLnpvb21Qb3NpdGlvbi55ICogYXV4KSArICdweCc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIChkaWZmWSAvIDIpICogLTEgKyAncHgnO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgem9vbVhQb3NpdGlvbihkaWZmWCwgem9vbVNjYWxlKSB7XG4gICAgaWYgKHRoaXMuem9vbVBvc2l0aW9uLnggIT09ICh0aGlzLmNhbnZhc0VsLndpZHRoIC8gMikpIHtcbiAgICAgIGlmICh6b29tU2NhbGUgPiAxKSB7XG4gICAgICAgIGNvbnN0IGF1eCA9IHpvb21TY2FsZS50b1N0cmluZygpLnNwbGl0KCcuJylbMF0gPiAxID8gKHpvb21TY2FsZSAtIDEpIDogKHpvb21TY2FsZSAlIDEpO1xuICAgICAgICByZXR1cm4gLSh0aGlzLnpvb21Qb3NpdGlvbi54ICogYXV4KSArICdweCc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIChkaWZmWCAvIDIpICogLTEgKyAncHgnO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZW5hYmxlUG9pbnRFdmVudHMoZWxlbWVudHM6IE5vZGVMaXN0T2Y8SFRNTERpdkVsZW1lbnQ+KSB7XG4gICAgQXJyYXkuZnJvbShlbGVtZW50cykuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgICAgZWxlbWVudC5zdHlsZS5wb2ludGVyRXZlbnRzID0gJ2FsbCc7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGRpc2FibGVQb2ludEV2ZW50cyhlbGVtZW50czogTm9kZUxpc3RPZjxIVE1MRGl2RWxlbWVudD4pIHtcbiAgICBBcnJheS5mcm9tKGVsZW1lbnRzKS5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgICBlbGVtZW50LnN0eWxlLnBvaW50ZXJFdmVudHMgPSAnbm9uZSc7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGNsZWFuTWFya3MoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMubWFya3NXcmFwcGVyRWwpIHtcbiAgICAgIGNvbnN0IHBvaW50RWxlbWVudHMgPSB0aGlzLm1hcmtzV3JhcHBlckVsLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3BvaW50LXRhZycpO1xuICAgICAgY29uc3Qgc3F1YXJlRWxlbWVudHMgPSB0aGlzLm1hcmtzV3JhcHBlckVsLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3NxdWFyZS10YWcnKTtcbiAgICAgIGNvbnN0IHpvb21BcmVhRWxlbWVudHMgPSB0aGlzLm1hcmtzV3JhcHBlckVsLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3pvb20tYXJlYS10YWcnKTtcbiAgICAgIHdoaWxlIChwb2ludEVsZW1lbnRzWzBdKSB7XG4gICAgICAgIHBvaW50RWxlbWVudHNbMF0ucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChwb2ludEVsZW1lbnRzWzBdKTtcbiAgICAgIH1cbiAgICAgIHdoaWxlIChzcXVhcmVFbGVtZW50c1swXSkge1xuICAgICAgICBzcXVhcmVFbGVtZW50c1swXS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHNxdWFyZUVsZW1lbnRzWzBdKTtcbiAgICAgIH1cbiAgICAgIHdoaWxlICh6b29tQXJlYUVsZW1lbnRzWzBdKSB7XG4gICAgICAgIHpvb21BcmVhRWxlbWVudHNbMF0ucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh6b29tQXJlYUVsZW1lbnRzWzBdKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZVBvaW50VGFnKGNvb3JkaW5hdGVzOiBudW1iZXJbXSwgaW5kZXg6IG51bWJlcik6IEhUTUxEaXZFbGVtZW50IHtcbiAgICBjb25zdCBbeCwgeV0gPSBjb29yZGluYXRlcztcbiAgICBjb25zdCB0YWcgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRhZy5pbm5lckhUTUwgPSBgJHtpbmRleH1gO1xuICAgIHRhZy5jbGFzc05hbWUgPSAncG9pbnQtdGFnJztcbiAgICB0YWcuc3R5bGUudG9wID0gYGNhbGMoJHt5fSUgLSAxMnB4KWA7XG4gICAgdGFnLnN0eWxlLmxlZnQgPSBgY2FsYygke3h9JSAtIDEycHgpYDtcbiAgICB0aGlzLm1hcmtzV3JhcHBlckVsLmFwcGVuZENoaWxkKHRhZyk7XG4gICAgY29uc3QgY29tbWVudCA9IHRoaXMubWFya2VyLmNvbW1lbnRzLmZpbmQoYyA9PiBjLmlkID09PSBpbmRleCk7XG4gICAgdGFnLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdGhpcy5jbGlja0V2ZW50UG9pbnRUYWcoY29tbWVudCkpO1xuICAgIHRhZy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCAoKSA9PiB0aGlzLmFkZENvbW1lbnROb2RlKGNvbW1lbnQpKTtcbiAgICB0YWcuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdXQnLCB0aGlzLnJlbW92ZUNvbW1lbnROb2RlKTtcbiAgICByZXR1cm4gdGFnO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVab29tQXJlYVRhZyhjb29yZGluYXRlczogbnVtYmVyW10sIGluZGV4OiBudW1iZXIpOiBIVE1MRGl2RWxlbWVudCB7XG4gICAgY29uc3QgW3gsIHldID0gY29vcmRpbmF0ZXM7XG4gICAgY29uc3QgdGFnID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0YWcuaW5uZXJIVE1MID0gYCR7aW5kZXh9YDtcbiAgICB0YWcuY2xhc3NOYW1lID0gJ3pvb20tYXJlYS10YWcnO1xuICAgIHRhZy5zdHlsZS50b3AgPSBgY2FsYygke3l9JSAtIDEycHgpYDtcbiAgICB0YWcuc3R5bGUubGVmdCA9IGBjYWxjKCR7eH0lIC0gMTJweClgO1xuICAgIHRoaXMubWFya3NXcmFwcGVyRWwuYXBwZW5kQ2hpbGQodGFnKTtcbiAgICBjb25zdCB6b29tQXJlYSA9IHRoaXMubWFya2VyLnpvb21BcmVhcy5maW5kKHogPT4gei5pZCA9PT0gaW5kZXgpO1xuICAgIHRhZy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHRoaXMuY2xpY2tFdmVudFpvb21UYWcoem9vbUFyZWEpKTtcbiAgICByZXR1cm4gdGFnO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVTcXVhcmVUYWcoY29vcmRpbmF0ZXM6IG51bWJlcltdLCBpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgY29uc3QgW3gsIHksIHgyLCB5Ml0gPSBjb29yZGluYXRlcztcbiAgICBjb25zdCBzcXVhcmUgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHNxdWFyZS5jbGFzc05hbWUgPSAnc3F1YXJlLXRhZyc7XG4gICAgc3F1YXJlLnN0eWxlLndpZHRoID0gYCR7TWF0aC5hYnMoeCAtIHgyKX0lYDtcbiAgICBzcXVhcmUuc3R5bGUuaGVpZ2h0ID0gYCR7TWF0aC5hYnMoeSAtIHkyKX0lYDtcbiAgICBzcXVhcmUuc3R5bGUudG9wID0gYCR7eTIgPiB5ID8geSA6IHkyfSVgO1xuICAgIHNxdWFyZS5zdHlsZS5sZWZ0ID0gYCR7eDIgPiB4ID8geCA6IHgyfSVgO1xuICAgIGNvbnN0IHBvaW50ID0gdGhpcy5jcmVhdGVQb2ludFRhZyhbMCwgMF0sIGluZGV4KTtcbiAgICBzcXVhcmUuYXBwZW5kQ2hpbGQocG9pbnQpO1xuICAgIHRoaXMubWFya3NXcmFwcGVyRWwuYXBwZW5kQ2hpbGQoc3F1YXJlKTtcbiAgfVxuXG4gIHByaXZhdGUgY2xpY2tFdmVudFBvaW50VGFnKGNvbW1lbnQ6IENvbW1lbnQpIHtcbiAgICBjb25zdCBkaWFsb2dSZWYgPSB0aGlzLmRpYWxvZy5vcGVuKERlY1JlbmRlckNvbW1lbnRDb21wb25lbnQsIHsgZGF0YTogeyBjb21tZW50OiBjb21tZW50LmNvbW1lbnQsIHZlcnNpb246IGNvbW1lbnQudmVyc2lvbiB9IH0pO1xuICAgIGRpYWxvZ1JlZi5hZnRlckNsb3NlZCgpLnN1YnNjcmliZShyZXN1bHQgPT4ge1xuICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICBjb21tZW50LmNvbW1lbnQgPSByZXN1bHQuY29tbWVudDtcbiAgICAgICAgY29tbWVudC5kZXNjcmlwdGlvbiA9IHJlc3VsdC5kZXNjcmlwdGlvbjtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgY2xpY2tFdmVudFpvb21UYWcoem9vbUFyZWE6IFpvb21BcmVhKSB7XG4gICAgdGhpcy5vcGVuWm9vbUFyZWEuZW1pdCh6b29tQXJlYSk7XG4gIH1cblxuICBwcml2YXRlIGNsZWFyU3F1YXJlKCk6IHZvaWQge1xuICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3F1YXJlTWFyaycpKSB7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3F1YXJlTWFyaycpLnJlbW92ZSgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYWRkQ29tbWVudE5vZGUgPSAoY29tbWVudDogQ29tbWVudCk6IHZvaWQgPT4ge1xuICAgIGNvbnN0IHNwYW4gPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcblxuICAgIHNwYW4uaW5uZXJIVE1MID0gYCR7Y29tbWVudC5jb21tZW50fSAtICR7Y29tbWVudC5kZXNjcmlwdGlvbn1gO1xuXG4gICAgY29uc3QgY29tbWVudERpdiA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY29tbWVudERpdi5jbGFzc05hbWUgPSAnY29tbWVudC1ob3Zlcic7XG4gICAgY29tbWVudERpdi5zdHlsZS5tYXhXaWR0aCA9IHRoaXMuY2FudmFzRWwud2lkdGggPiAzNDAgPyAnMzQwcHgnIDogJ2NhbGMoMTAwJSAtIDIwcHgpJztcbiAgICBjb21tZW50RGl2LmFwcGVuZENoaWxkKHNwYW4pO1xuICAgIHRoaXMubWFya3NXcmFwcGVyRWwucGFyZW50RWxlbWVudC5hcHBlbmRDaGlsZChjb21tZW50RGl2KTtcbiAgfVxuXG4gIHByaXZhdGUgcmVtb3ZlQ29tbWVudE5vZGUoKSB7XG4gICAgY29uc3QgY29tbWVudE5vZGUgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdjb21tZW50LWhvdmVyJylbMF07XG4gICAgaWYgKGNvbW1lbnROb2RlKSB7XG4gICAgICBjb21tZW50Tm9kZS5wYXJlbnRFbGVtZW50LnJlbW92ZUNoaWxkKGNvbW1lbnROb2RlKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNldENhbnZhc1NpemUoc2l6ZTogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5jYW52YXNFbC53aWR0aCA9IHNpemU7XG4gICAgdGhpcy5jYW52YXNFbC5oZWlnaHQgPSBzaXplO1xuICB9XG5cbiAgc2V0TW91c2VNb3ZlZChtb3ZlZDogYm9vbGVhbikge1xuICAgIHRoaXMubW91c2VNb3ZlZCA9IG1vdmVkO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRXcmFwcGVyU2l6ZShzaXplOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLm1hcmtzV3JhcHBlckVsLnN0eWxlLndpZHRoID0gYCR7c2l6ZX1weGA7XG4gICAgdGhpcy5tYXJrc1dyYXBwZXJFbC5zdHlsZS5oZWlnaHQgPSBgJHtzaXplfXB4YDtcbiAgfVxuXG4gIHByaXZhdGUgc2V0Wm9vbVBvc2l0aW9uKHg6IG51bWJlciwgeTogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy56b29tUG9zaXRpb24ueCA9IHg7XG4gICAgdGhpcy56b29tUG9zaXRpb24ueSA9IHk7XG4gIH1cblxuICBwcml2YXRlIHNldFdyYXBwZXJDdXJzb3IobW91c2Vkb3duPzogYm9vbGVhbik6IHZvaWQge1xuICAgIGlmICh0aGlzLm1hcmtzV3JhcHBlckVsKSB7XG4gICAgICBpZiAodGhpcy5xYU1vZGUgJiYgdGhpcy56b29tU2NhbGUgPT09IDEpIHtcbiAgICAgICAgdGhpcy5tYXJrc1dyYXBwZXJFbC5zdHlsZS5jdXJzb3IgPSAnY3Jvc3NoYWlyJztcbiAgICAgIH0gZWxzZSBpZiAobW91c2Vkb3duKSB7XG4gICAgICAgIHRoaXMubWFya3NXcmFwcGVyRWwuc3R5bGUuY3Vyc29yID0gJ21vdmUnO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5tYXJrc1dyYXBwZXJFbC5zdHlsZS5jdXJzb3IgPSAnZ3JhYic7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHpvb20oem9vbVNjYWxlOiBudW1iZXIgPSAxKSB7XG4gICAgdGhpcy56b29tU2NhbGUgPSB6b29tU2NhbGU7XG4gICAgdGhpcy5yZXNpemVNYXJrZXIoem9vbVNjYWxlKTtcbiAgICB0aGlzLnNldFdyYXBwZXJDdXJzb3IoKTtcbiAgICB0aGlzLmN0eC5jbGVhclJlY3QoMCwgMCwgdGhpcy5jYW52YXNFbC53aWR0aCwgdGhpcy5jYW52YXNFbC5oZWlnaHQpO1xuICAgIHRoaXMuY3R4LnNhdmUoKTtcbiAgICB0aGlzLmN0eC50cmFuc2xhdGUodGhpcy56b29tUG9zaXRpb24ueCwgdGhpcy56b29tUG9zaXRpb24ueSk7XG4gICAgdGhpcy5jdHguc2NhbGUoem9vbVNjYWxlLCB6b29tU2NhbGUpO1xuICAgIHRoaXMuY3R4LmRyYXdJbWFnZSh0aGlzLmltYWdlRWxlbWVudCwgLXRoaXMuem9vbVBvc2l0aW9uLngsIC10aGlzLnpvb21Qb3NpdGlvbi55LCB0aGlzLmNhbnZhc0VsLndpZHRoLCB0aGlzLmNhbnZhc0VsLmhlaWdodCk7XG4gICAgdGhpcy5jdHgucmVzdG9yZSgpO1xuICB9XG5cbiAgcHVibGljIHpvb21JbihhbW91bnQ6IG51bWJlciA9IDEpIHtcbiAgICBpZiAodGhpcy56b29tU2NhbGUgPCBwYXJzZUludCh0aGlzLm1heFpvb21MZXZlbCwgMTApKSB7XG4gICAgICAodGhpcy56b29tU2NhbGUgKyBhbW91bnQpIDwgdGhpcy5tYXhab29tTGV2ZWwgPyB0aGlzLnpvb21TY2FsZSArPSBhbW91bnQgOiB0aGlzLnpvb21TY2FsZSA9ICt0aGlzLm1heFpvb21MZXZlbDtcbiAgICAgIHRoaXMuem9vbSh0aGlzLnpvb21TY2FsZSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHpvb21PdXQoYW1vdW50OiBudW1iZXIgPSAxKSB7XG4gICAgaWYgKHRoaXMuem9vbVNjYWxlID4gcGFyc2VJbnQodGhpcy5taW5ab29tTGV2ZWwsIDEwKSkge1xuICAgICAgKHRoaXMuem9vbVNjYWxlIC0gYW1vdW50KSA+IHRoaXMubWluWm9vbUxldmVsID8gdGhpcy56b29tU2NhbGUgLT0gYW1vdW50IDogdGhpcy56b29tU2NhbGUgPSArdGhpcy5taW5ab29tTGV2ZWw7XG4gICAgICB0aGlzLnpvb20odGhpcy56b29tU2NhbGUpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBvblpvb21TbGlkZSh2YWx1ZTogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy56b29tKHZhbHVlKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRGb3JtYXRlZFBvc2l0aW9uQW5kU2NhbGUgPSAoKSA9PiB7XG4gICAgY29uc3QgZmlsZTogYW55ID0gdGhpcy5tYXJrZXIuZmlsZTtcblxuICAgIHJldHVybiB7XG4gICAgICBmaWxlOiBmaWxlLFxuICAgICAgcG9zaXRpb246IHtcbiAgICAgICAgeDogdGhpcy56b29tUG9zaXRpb24ueCxcbiAgICAgICAgeTogdGhpcy56b29tUG9zaXRpb24ueVxuICAgICAgfSxcbiAgICAgIHpvb21TY2FsZTogdGhpcy56b29tU2NhbGVcbiAgICB9O1xuICB9XG5cbiAgcHVibGljIGFkZE5ld1pvb21BcmVhID0gKG5ld1pvb21BcmVhKSA9PiB7XG4gICAgaWYgKG5ld1pvb21BcmVhLmNvb3JkaW5hdGVzLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMuZWRpdFpvb21BcmVhKG5ld1pvb21BcmVhKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBuZXdab29tQXJlYS5jb29yZGluYXRlcy5wdXNoKE1hdGgucm91bmQoTWF0aC5yb3VuZCgoKHRoaXMuc3RhcnRYIC8gdGhpcy5tYXJrc1dyYXBwZXJFbC5vZmZzZXRXaWR0aCkgKiAxMDApICogMTAwKSAvIDEwMCkpO1xuICAgIG5ld1pvb21BcmVhLmNvb3JkaW5hdGVzLnB1c2goTWF0aC5yb3VuZChNYXRoLnJvdW5kKCgodGhpcy5zdGFydFkgLyB0aGlzLm1hcmtzV3JhcHBlckVsLm9mZnNldEhlaWdodCkgKiAxMDApICogMTAwKSAvIDEwMCkpO1xuICAgIG5ld1pvb21BcmVhLmlkID0gdGhpcy5jb21tZW50c0FycmF5U2l6ZSArIDE7XG4gICAgdGhpcy5tYXJrZXIuem9vbUFyZWFzLnB1c2gobmV3Wm9vbUFyZWEpO1xuICAgIHRoaXMuY29tbWVudHNBcnJheVNpemUrKztcbiAgICB0aGlzLmRyYXdNYXJrcygpO1xuICB9XG5cbiAgZWRpdFpvb21BcmVhKG5ld1pvb21BcmVhKSB7XG4gICAgY29uc3QgemEgPSB0aGlzLm1hcmtlci56b29tQXJlYXMuZmluZCh4ID0+IHguaWQgPT09IG5ld1pvb21BcmVhLmlkKTtcbiAgICBpZiAoemEpIHtcbiAgICAgIHphLnJlbmRlclNob3QgPSBuZXdab29tQXJlYS5yZW5kZXJTaG90O1xuICAgICAgemEucmVmZXJlbmNlU2hvdCA9IG5ld1pvb21BcmVhLnJlZmVyZW5jZVNob3Q7XG4gICAgfVxuICB9XG5cbn1cbiJdfQ==