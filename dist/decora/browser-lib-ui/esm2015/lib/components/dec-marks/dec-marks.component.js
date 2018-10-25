/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input, ViewChild, ElementRef, HostListener, Renderer2, Output, EventEmitter } from '@angular/core';
import { Marker } from './../dec-zoom-marks/models/marker.model';
import { Comment } from './../dec-zoom-marks/models/comment.model';
import { fromEvent } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { DecRenderCommentService } from './../dec-render-comment/dec-render-comment.service';
import { MatDialog } from '@angular/material';
import { DecRenderCommentComponent } from './../dec-render-comment/dec-render-comment.component';
/**
 * @record
 */
export function ZoomPosition() { }
/** @type {?} */
ZoomPosition.prototype.x;
/** @type {?} */
ZoomPosition.prototype.y;
export class DecMarksComponent {
    /**
     * @param {?} renderer
     * @param {?} dialog
     * @param {?} decRenderCommentService
     */
    constructor(renderer, dialog, decRenderCommentService) {
        this.renderer = renderer;
        this.dialog = dialog;
        this.decRenderCommentService = decRenderCommentService;
        this.marker = new Marker();
        this.noComments = true;
        this.parentId = 1;
        this.link = new EventEmitter();
        this.referenceQa = new EventEmitter();
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
        this.setupCanvas();
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
    /**
     * @return {?}
     */
    setupMarksWrapper() {
        this.marksWrapperEl = this.marksWrapper.nativeElement;
        this.setWrapperSize(this.canvasEl.width);
        this.setWrapperCursor();
    }
    /**
     * @param {?} comment
     * @return {?}
     */
    addInCommentsArray(comment) {
        this.marker.comments.push(comment);
    }
    /**
     * @return {?}
     */
    setupMouseEvents() {
        /** @type {?} */
        const mouseup = fromEvent(this.marksWrapperEl, 'mouseup');
        mouseup.subscribe((event) => {
            /** @type {?} */
            const target = /** @type {?} */ (event.target);
            if (this.qaMode) {
                /** @type {?} */
                const x = Math.round(((this.startX / this.marksWrapperEl.offsetHeight) * 100) * 100) / 100;
                /** @type {?} */
                const y = Math.round(((this.startY / this.marksWrapperEl.offsetWidth) * 100) * 100) / 100;
                /** @type {?} */
                const x2 = Math.round(((event.offsetX / this.marksWrapperEl.offsetHeight) * 100) * 100) / 100;
                /** @type {?} */
                const y2 = Math.round(((event.offsetY / this.marksWrapperEl.offsetWidth) * 100) * 100) / 100;
                /** @type {?} */
                const index = this.marker.comments.length + 1;
                if (this.mouseMoved) {
                    this.enablePointEvents(this.marksWrapperEl.querySelectorAll('.point-tag'));
                    this.setMouseMoved(false);
                    if (this.noComments) {
                        /** @type {?} */
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
                    /** @type {?} */
                    const dialogRef = this.dialog.open(DecRenderCommentComponent);
                    dialogRef.afterClosed().subscribe(result => {
                        if (result) {
                            /** @type {?} */
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
                }
                else {
                    if (!target.classList.contains('point-tag') && !target.classList.contains('link-button')) {
                        if (this.noComments) {
                            /** @type {?} */
                            const comment = new Comment({
                                coordinates: [x, y],
                                id: this.noComments ? this.formatTagId() : index
                            });
                            this.addInCommentsArray(comment);
                            this.createPointTag([x, y], comment.id);
                            this.referenceQa.emit(false);
                            return;
                        }
                        /** @type {?} */
                        const dialogRef = this.dialog.open(DecRenderCommentComponent);
                        dialogRef.afterClosed().subscribe(result => {
                            if (result) {
                                /** @type {?} */
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
        /** @type {?} */
        const mouseleave = fromEvent(this.marksWrapperEl, 'mouseleave');
        mouseleave.subscribe((event) => {
            this.setWrapperCursor();
            if (this.qaMode) {
                this.setMouseMoved(false);
                this.clearSquare();
            }
        });
        fromEvent(this.marksWrapperEl, 'mousedown').pipe(switchMap((event) => {
            this.startX = event.offsetX;
            this.startY = event.offsetY;
            return fromEvent(this.marksWrapperEl, 'mousemove').pipe(takeUntil(mouseup), takeUntil(mouseleave));
        })).subscribe((event) => {
            if (this.qaMode) {
                this.setMouseMoved(true);
                this.disablePointEvents(this.marksWrapperEl.querySelectorAll('.point-tag'));
                this.clearSquare();
                /** @type {?} */
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
    /**
     * @return {?}
     */
    formatTagId() {
        return `${this.parentId}.${this.comentIndex}`;
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
     * @return {?}
     */
    setWrapperCursor() {
        if (this.marksWrapperEl) {
            if (this.qaMode) {
                this.marksWrapperEl.style.cursor = 'crosshair';
            }
            else {
                this.marksWrapperEl.style.cursor = 'default';
            }
        }
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
     * @param {?} moved
     * @return {?}
     */
    setMouseMoved(moved) {
        this.mouseMoved = moved;
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
     * @param {?} coordinates
     * @param {?} index
     * @return {?}
     */
    createPointTag(coordinates, index) {
        const [x, y] = coordinates;
        /** @type {?} */
        const tag = this.renderer.createElement('div');
        tag.innerHTML = this.noComments ? index : `${this.parentId}.${index}`;
        tag.className = 'point-tag';
        tag.style.top = `calc(${y}% - 12px)`;
        tag.style.left = `calc(${x}% - 12px)`;
        this.marksWrapperEl.appendChild(tag);
        if (!this.noComments) {
            /** @type {?} */
            const link = this.renderer.createElement('div');
            link.className = 'link-button';
            link.innerHTML = '+';
            tag.appendChild(link);
            /** @type {?} */
            const comment = this.marker.comments.find(c => c.id === index);
            tag.addEventListener('click', (event) => {
                /** @type {?} */
                const target = /** @type {?} */ (event.target);
                if (target.classList.contains('link-button')) {
                    this.linkTag(comment);
                }
                else {
                    this.clickEventPointTag(comment);
                }
            });
            tag.addEventListener('mouseover', () => this.addCommentNode(comment));
            tag.addEventListener('mouseout', this.removeCommentNode);
        }
        return tag;
    }
    /**
     * @param {?} comment
     * @return {?}
     */
    linkTag(comment) {
        this.link.emit(comment);
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
     * @param {?} coordinates
     * @param {?} index
     * @return {?}
     */
    createSquareTag(coordinates, index) {
        const [x, y, x2, y2] = coordinates;
        /** @type {?} */
        const square = this.renderer.createElement('div');
        square.className = 'square-tag';
        this.configureNoComments(square);
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
     * @return {?}
     */
    drawMarks() {
        this.cleanMarks();
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
        }
    }
    /**
     * @return {?}
     */
    cleanMarks() {
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
    /**
     * @param {?} comment
     * @return {?}
     */
    deleteMark(comment) {
        this.marker.comments.splice(this.marker.comments.indexOf(comment), 1);
        this.marker.comments.forEach(c => {
            if (c.id > comment.id) {
                c.id--;
            }
        });
        this.removeCommentNode();
        this.drawMarks();
    }
    /**
     * @param {?} square
     * @return {?}
     */
    configureNoComments(square) {
        if (this.noComments) {
            square.style.borderStyle = 'dashed';
        }
    }
}
DecMarksComponent.decorators = [
    { type: Component, args: [{
                selector: 'dec-marks',
                template: `<div class="zoom-container">
  <div #marksWrapper class="marks-wrapper"></div>
  <canvas #canvas></canvas>
</div>
`,
                styles: [`#squareMark{position:absolute;border:2px solid #ff0ade;pointer-events:none}.zoom-container{display:flex;flex-direction:column;position:relative;overflow:hidden}.zoom-container .marks-wrapper{position:absolute}.zoom-container .marks-wrapper .point-tag{position:absolute;font-size:12px;width:24px;height:24px;background-color:#ff0ade;font-weight:500;text-align:center;cursor:pointer;line-height:24px;color:#fff;border-radius:100%;border:1px solid #fff;box-sizing:border-box;text-shadow:0 0 10px #000;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;z-index:1;display:flex;justify-content:center;align-items:center;pointer-events:all}.zoom-container .marks-wrapper .point-tag:hover{border-color:#ff0ade}.zoom-container .marks-wrapper .point-tag .link-button{width:12px;height:12px;background-color:#ff0ade;position:absolute;display:flex;justify-content:center;align-items:center;left:-16px;border:1px solid #fff}.zoom-container .marks-wrapper .point-tag .link-button:hover{border-color:#ff0ade}.zoom-container .marks-wrapper .square-tag{position:absolute;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;pointer-events:none;border:2px solid #ff0ade}.zoom-container .comment-hover{background-color:#ff0ade;box-sizing:border-box;padding:8px 12px;border-radius:4px;position:absolute;font-size:12px;line-height:18px;text-shadow:none;text-align:left;color:#fff;left:10px;top:10px;z-index:1}`]
            },] },
];
/** @nocollapse */
DecMarksComponent.ctorParameters = () => [
    { type: Renderer2 },
    { type: MatDialog },
    { type: DecRenderCommentService }
];
DecMarksComponent.propDecorators = {
    marker: [{ type: Input }],
    zoomScale: [{ type: Input }],
    zoomPosition: [{ type: Input }],
    noComments: [{ type: Input }],
    parentId: [{ type: Input }],
    comentIndex: [{ type: Input }],
    qaMode: [{ type: Input }],
    link: [{ type: Output }],
    referenceQa: [{ type: Output }],
    canvas: [{ type: ViewChild, args: ['canvas',] }],
    marksWrapper: [{ type: ViewChild, args: ['marksWrapper',] }],
    onResize: [{ type: HostListener, args: ['window:resize',] }]
};
if (false) {
    /** @type {?} */
    DecMarksComponent.prototype.marker;
    /** @type {?} */
    DecMarksComponent.prototype.zoomScale;
    /** @type {?} */
    DecMarksComponent.prototype.zoomPosition;
    /** @type {?} */
    DecMarksComponent.prototype.noComments;
    /** @type {?} */
    DecMarksComponent.prototype.parentId;
    /** @type {?} */
    DecMarksComponent.prototype.comentIndex;
    /** @type {?} */
    DecMarksComponent.prototype._qaMode;
    /** @type {?} */
    DecMarksComponent.prototype.link;
    /** @type {?} */
    DecMarksComponent.prototype.referenceQa;
    /** @type {?} */
    DecMarksComponent.prototype.canvas;
    /** @type {?} */
    DecMarksComponent.prototype.canvasEl;
    /** @type {?} */
    DecMarksComponent.prototype.ctx;
    /** @type {?} */
    DecMarksComponent.prototype.marksWrapper;
    /** @type {?} */
    DecMarksComponent.prototype.marksWrapperEl;
    /** @type {?} */
    DecMarksComponent.prototype.imageElement;
    /** @type {?} */
    DecMarksComponent.prototype.contentDone;
    /** @type {?} */
    DecMarksComponent.prototype.startX;
    /** @type {?} */
    DecMarksComponent.prototype.startY;
    /** @type {?} */
    DecMarksComponent.prototype.mouseMoved;
    /** @type {?} */
    DecMarksComponent.prototype.addCommentNode;
    /** @type {?} */
    DecMarksComponent.prototype.renderer;
    /** @type {?} */
    DecMarksComponent.prototype.dialog;
    /** @type {?} */
    DecMarksComponent.prototype.decRenderCommentService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLW1hcmtzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9kZWMtbWFya3MvZGVjLW1hcmtzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFvQixNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pJLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUNqRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sMENBQTBDLENBQUM7QUFDbkUsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNqQyxPQUFPLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3RELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLG9EQUFvRCxDQUFDO0FBQzdGLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUM5QyxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxzREFBc0QsQ0FBQzs7Ozs7Ozs7O0FBZ0JqRyxNQUFNOzs7Ozs7SUFtREosWUFBb0IsUUFBbUIsRUFBVSxNQUFpQixFQUFVLHVCQUFnRDtRQUF4RyxhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBVztRQUFVLDRCQUF1QixHQUF2Qix1QkFBdUIsQ0FBeUI7c0JBakRsRyxJQUFJLE1BQU0sRUFBRTswQkFNaEIsSUFBSTt3QkFFTixDQUFDO29CQWdCSixJQUFJLFlBQVksRUFBRTsyQkFDWCxJQUFJLFlBQVksRUFBRTs0QkFTRCxJQUFJLEtBQUssRUFBRTs4QkFrUTNCLENBQUMsT0FBZ0IsRUFBUSxFQUFFOztZQUNsRCxNQUFN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QUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUMvQixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUN0QixDQUFDLENBQUMsRUFBRSxFQUFFLENBQUM7YUFDUjtTQUNGLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQzs7Ozs7O0lBR1gsbUJBQW1CLENBQUMsTUFBc0I7UUFDaEQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDcEIsTUFBTSxDQUFDLEtBQUssQ0FBQyxXQUFXLEdBQUcsUUFBUSxDQUFDO1NBQ3JDOzs7O1lBM1dKLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsV0FBVztnQkFDckIsUUFBUSxFQUFFOzs7O0NBSVg7Z0JBQ0MsTUFBTSxFQUFFLENBQUMsZzdDQUFnN0MsQ0FBQzthQUMzN0M7Ozs7WUF0QitELFNBQVM7WUFNaEUsU0FBUztZQURULHVCQUF1Qjs7O3FCQW9CN0IsS0FBSzt3QkFFTCxLQUFLOzJCQUVMLEtBQUs7eUJBRUwsS0FBSzt1QkFFTCxLQUFLOzBCQUVMLEtBQUs7cUJBRUwsS0FBSzttQkFZTCxNQUFNOzBCQUNOLE1BQU07cUJBRU4sU0FBUyxTQUFDLFFBQVE7MkJBSWxCLFNBQVMsU0FBQyxjQUFjO3VCQVd4QixZQUFZLFNBQUMsZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIFZpZXdDaGlsZCwgRWxlbWVudFJlZiwgSG9zdExpc3RlbmVyLCBSZW5kZXJlcjIsIEFmdGVyVmlld0NoZWNrZWQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXJrZXIgfSBmcm9tICcuLy4uL2RlYy16b29tLW1hcmtzL21vZGVscy9tYXJrZXIubW9kZWwnO1xuaW1wb3J0IHsgQ29tbWVudCB9IGZyb20gJy4vLi4vZGVjLXpvb20tbWFya3MvbW9kZWxzL2NvbW1lbnQubW9kZWwnO1xuaW1wb3J0IHsgZnJvbUV2ZW50IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBzd2l0Y2hNYXAsIHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IERlY1JlbmRlckNvbW1lbnRTZXJ2aWNlIH0gZnJvbSAnLi8uLi9kZWMtcmVuZGVyLWNvbW1lbnQvZGVjLXJlbmRlci1jb21tZW50LnNlcnZpY2UnO1xuaW1wb3J0IHsgTWF0RGlhbG9nIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgRGVjUmVuZGVyQ29tbWVudENvbXBvbmVudCB9IGZyb20gJy4vLi4vZGVjLXJlbmRlci1jb21tZW50L2RlYy1yZW5kZXItY29tbWVudC5jb21wb25lbnQnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFpvb21Qb3NpdGlvbiB7XG4gIHg6IG51bWJlcjtcbiAgeTogbnVtYmVyO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtbWFya3MnLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJ6b29tLWNvbnRhaW5lclwiPlxuICA8ZGl2ICNtYXJrc1dyYXBwZXIgY2xhc3M9XCJtYXJrcy13cmFwcGVyXCI+PC9kaXY+XG4gIDxjYW52YXMgI2NhbnZhcz48L2NhbnZhcz5cbjwvZGl2PlxuYCxcbiAgc3R5bGVzOiBbYCNzcXVhcmVNYXJre3Bvc2l0aW9uOmFic29sdXRlO2JvcmRlcjoycHggc29saWQgI2ZmMGFkZTtwb2ludGVyLWV2ZW50czpub25lfS56b29tLWNvbnRhaW5lcntkaXNwbGF5OmZsZXg7ZmxleC1kaXJlY3Rpb246Y29sdW1uO3Bvc2l0aW9uOnJlbGF0aXZlO292ZXJmbG93OmhpZGRlbn0uem9vbS1jb250YWluZXIgLm1hcmtzLXdyYXBwZXJ7cG9zaXRpb246YWJzb2x1dGV9Lnpvb20tY29udGFpbmVyIC5tYXJrcy13cmFwcGVyIC5wb2ludC10YWd7cG9zaXRpb246YWJzb2x1dGU7Zm9udC1zaXplOjEycHg7d2lkdGg6MjRweDtoZWlnaHQ6MjRweDtiYWNrZ3JvdW5kLWNvbG9yOiNmZjBhZGU7Zm9udC13ZWlnaHQ6NTAwO3RleHQtYWxpZ246Y2VudGVyO2N1cnNvcjpwb2ludGVyO2xpbmUtaGVpZ2h0OjI0cHg7Y29sb3I6I2ZmZjtib3JkZXItcmFkaXVzOjEwMCU7Ym9yZGVyOjFweCBzb2xpZCAjZmZmO2JveC1zaXppbmc6Ym9yZGVyLWJveDt0ZXh0LXNoYWRvdzowIDAgMTBweCAjMDAwOy13ZWJraXQtdXNlci1zZWxlY3Q6bm9uZTstbW96LXVzZXItc2VsZWN0Om5vbmU7LW1zLXVzZXItc2VsZWN0Om5vbmU7dXNlci1zZWxlY3Q6bm9uZTt6LWluZGV4OjE7ZGlzcGxheTpmbGV4O2p1c3RpZnktY29udGVudDpjZW50ZXI7YWxpZ24taXRlbXM6Y2VudGVyO3BvaW50ZXItZXZlbnRzOmFsbH0uem9vbS1jb250YWluZXIgLm1hcmtzLXdyYXBwZXIgLnBvaW50LXRhZzpob3Zlcntib3JkZXItY29sb3I6I2ZmMGFkZX0uem9vbS1jb250YWluZXIgLm1hcmtzLXdyYXBwZXIgLnBvaW50LXRhZyAubGluay1idXR0b257d2lkdGg6MTJweDtoZWlnaHQ6MTJweDtiYWNrZ3JvdW5kLWNvbG9yOiNmZjBhZGU7cG9zaXRpb246YWJzb2x1dGU7ZGlzcGxheTpmbGV4O2p1c3RpZnktY29udGVudDpjZW50ZXI7YWxpZ24taXRlbXM6Y2VudGVyO2xlZnQ6LTE2cHg7Ym9yZGVyOjFweCBzb2xpZCAjZmZmfS56b29tLWNvbnRhaW5lciAubWFya3Mtd3JhcHBlciAucG9pbnQtdGFnIC5saW5rLWJ1dHRvbjpob3Zlcntib3JkZXItY29sb3I6I2ZmMGFkZX0uem9vbS1jb250YWluZXIgLm1hcmtzLXdyYXBwZXIgLnNxdWFyZS10YWd7cG9zaXRpb246YWJzb2x1dGU7LXdlYmtpdC11c2VyLXNlbGVjdDpub25lOy1tb3otdXNlci1zZWxlY3Q6bm9uZTstbXMtdXNlci1zZWxlY3Q6bm9uZTt1c2VyLXNlbGVjdDpub25lO3BvaW50ZXItZXZlbnRzOm5vbmU7Ym9yZGVyOjJweCBzb2xpZCAjZmYwYWRlfS56b29tLWNvbnRhaW5lciAuY29tbWVudC1ob3ZlcntiYWNrZ3JvdW5kLWNvbG9yOiNmZjBhZGU7Ym94LXNpemluZzpib3JkZXItYm94O3BhZGRpbmc6OHB4IDEycHg7Ym9yZGVyLXJhZGl1czo0cHg7cG9zaXRpb246YWJzb2x1dGU7Zm9udC1zaXplOjEycHg7bGluZS1oZWlnaHQ6MThweDt0ZXh0LXNoYWRvdzpub25lO3RleHQtYWxpZ246bGVmdDtjb2xvcjojZmZmO2xlZnQ6MTBweDt0b3A6MTBweDt6LWluZGV4OjF9YF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjTWFya3NDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdDaGVja2VkIHtcblxuICBASW5wdXQoKSBtYXJrZXI6IE1hcmtlciA9IG5ldyBNYXJrZXIoKTtcblxuICBASW5wdXQoKSB6b29tU2NhbGU6IG51bWJlcjtcblxuICBASW5wdXQoKSB6b29tUG9zaXRpb246IFpvb21Qb3NpdGlvbjtcblxuICBASW5wdXQoKSBub0NvbW1lbnRzID0gdHJ1ZTtcblxuICBASW5wdXQoKSBwYXJlbnRJZCA9IDE7XG5cbiAgQElucHV0KCkgY29tZW50SW5kZXg7XG5cbiAgQElucHV0KClcbiAgc2V0IHFhTW9kZSh2YWx1ZTogYm9vbGVhbikge1xuICAgIGlmICh2YWx1ZSAhPT0gdGhpcy5fcWFNb2RlKSB7XG4gICAgICB0aGlzLl9xYU1vZGUgPSB2YWx1ZTtcbiAgICAgIHRoaXMuc2V0V3JhcHBlckN1cnNvcigpO1xuICAgIH1cbiAgfVxuICBnZXQgcWFNb2RlKCkge1xuICAgIHJldHVybiB0aGlzLl9xYU1vZGU7XG4gIH1cbiAgcHJpdmF0ZSBfcWFNb2RlOiBib29sZWFuO1xuXG4gIEBPdXRwdXQoKSBsaW5rID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgcmVmZXJlbmNlUWEgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgQFZpZXdDaGlsZCgnY2FudmFzJykgY2FudmFzOiBFbGVtZW50UmVmO1xuICBwdWJsaWMgY2FudmFzRWw6IEhUTUxDYW52YXNFbGVtZW50O1xuICBwcml2YXRlIGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xuXG4gIEBWaWV3Q2hpbGQoJ21hcmtzV3JhcHBlcicpIG1hcmtzV3JhcHBlcjogRWxlbWVudFJlZjtcbiAgcHVibGljIG1hcmtzV3JhcHBlckVsOiBIVE1MRGl2RWxlbWVudDtcblxuICBwcml2YXRlIGltYWdlRWxlbWVudDogSFRNTEltYWdlRWxlbWVudCA9IG5ldyBJbWFnZSgpO1xuXG4gIHByaXZhdGUgY29udGVudERvbmU6IGJvb2xlYW47XG5cbiAgcHJpdmF0ZSBzdGFydFg6IG51bWJlcjtcbiAgcHJpdmF0ZSBzdGFydFk6IG51bWJlcjtcbiAgcHJpdmF0ZSBtb3VzZU1vdmVkOiBib29sZWFuO1xuXG4gIEBIb3N0TGlzdGVuZXIoJ3dpbmRvdzpyZXNpemUnKVxuICBvblJlc2l6ZSgpIHtcbiAgICB0aGlzLnNldENhbnZhc1NpemUodGhpcy5jYW52YXNFbC5vZmZzZXRXaWR0aCk7XG4gICAgdGhpcy5zZXRXcmFwcGVyU2l6ZSh0aGlzLmNhbnZhc0VsLndpZHRoKTtcbiAgICB0aGlzLnNldHVwQ2FudmFzKCk7XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsIHByaXZhdGUgZGlhbG9nOiBNYXREaWFsb2csIHByaXZhdGUgZGVjUmVuZGVyQ29tbWVudFNlcnZpY2U6IERlY1JlbmRlckNvbW1lbnRTZXJ2aWNlKSB7IH1cblxuICBuZ0FmdGVyVmlld0NoZWNrZWQoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmNvbnRlbnREb25lICYmIHRoaXMuY2FudmFzLm5hdGl2ZUVsZW1lbnQucGFyZW50RWxlbWVudC5vZmZzZXRXaWR0aCAhPT0gMCkge1xuICAgICAgdGhpcy5zZXR1cENhbnZhcygpO1xuICAgICAgdGhpcy5zZXR1cE1hcmtzV3JhcHBlcigpO1xuICAgICAgdGhpcy5zZXR1cE1vdXNlRXZlbnRzKCk7XG4gICAgICB0aGlzLmNvbnRlbnREb25lID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNldHVwQ2FudmFzKCk6IHZvaWQge1xuICAgIHRoaXMuY2FudmFzRWwgPSB0aGlzLmNhbnZhcy5uYXRpdmVFbGVtZW50O1xuICAgIHRoaXMuc2V0Q2FudmFzU2l6ZSh0aGlzLmNhbnZhc0VsLm9mZnNldFdpZHRoKTtcbiAgICB0aGlzLmN0eCA9IHRoaXMuY2FudmFzRWwuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICB0aGlzLmltYWdlRWxlbWVudC5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICB0aGlzLmN0eC5jbGVhclJlY3QoMCwgMCwgdGhpcy5jYW52YXNFbC53aWR0aCwgdGhpcy5jYW52YXNFbC5oZWlnaHQpO1xuICAgICAgdGhpcy5jdHguc2F2ZSgpO1xuICAgICAgdGhpcy5jdHgudHJhbnNsYXRlKHRoaXMuem9vbVBvc2l0aW9uLngsIHRoaXMuem9vbVBvc2l0aW9uLnkpO1xuICAgICAgdGhpcy5jdHguc2NhbGUodGhpcy56b29tU2NhbGUsIHRoaXMuem9vbVNjYWxlKTtcbiAgICAgIHRoaXMuY3R4LmRyYXdJbWFnZSh0aGlzLmltYWdlRWxlbWVudCwgLXRoaXMuem9vbVBvc2l0aW9uLngsIC10aGlzLnpvb21Qb3NpdGlvbi55LCB0aGlzLmNhbnZhc0VsLndpZHRoLCB0aGlzLmNhbnZhc0VsLmhlaWdodCk7XG4gICAgICB0aGlzLmN0eC5yZXN0b3JlKCk7XG4gICAgICB0aGlzLmRyYXdNYXJrcygpO1xuICAgIH07XG4gICAgY29uc29sZS5sb2coJ21hcmtzJywgdGhpcy5tYXJrZXIpO1xuICAgIHRoaXMuaW1hZ2VFbGVtZW50LnNyYyA9IHRoaXMubWFya2VyLmZpbGUuZmlsZVVybDtcbiAgfVxuXG4gIHByaXZhdGUgc2V0dXBNYXJrc1dyYXBwZXIoKTogdm9pZCB7XG4gICAgdGhpcy5tYXJrc1dyYXBwZXJFbCA9IHRoaXMubWFya3NXcmFwcGVyLm5hdGl2ZUVsZW1lbnQ7XG4gICAgdGhpcy5zZXRXcmFwcGVyU2l6ZSh0aGlzLmNhbnZhc0VsLndpZHRoKTtcbiAgICB0aGlzLnNldFdyYXBwZXJDdXJzb3IoKTtcbiAgfVxuXG4gIHByaXZhdGUgYWRkSW5Db21tZW50c0FycmF5KGNvbW1lbnQ6IENvbW1lbnQpOiB2b2lkIHtcbiAgICB0aGlzLm1hcmtlci5jb21tZW50cy5wdXNoKGNvbW1lbnQpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXR1cE1vdXNlRXZlbnRzKCk6IHZvaWQge1xuICAgIGNvbnN0IG1vdXNldXAgPSBmcm9tRXZlbnQodGhpcy5tYXJrc1dyYXBwZXJFbCwgJ21vdXNldXAnKTtcbiAgICBtb3VzZXVwLnN1YnNjcmliZSgoZXZlbnQ6IE1vdXNlRXZlbnQpID0+IHtcbiAgICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldCBhcyBIVE1MRGl2RWxlbWVudDtcbiAgICAgIGlmICh0aGlzLnFhTW9kZSkge1xuICAgICAgICBjb25zdCB4ID0gTWF0aC5yb3VuZCgoKHRoaXMuc3RhcnRYIC8gdGhpcy5tYXJrc1dyYXBwZXJFbC5vZmZzZXRIZWlnaHQpICogMTAwKSAqIDEwMCkgLyAxMDA7XG4gICAgICAgIGNvbnN0IHkgPSBNYXRoLnJvdW5kKCgodGhpcy5zdGFydFkgLyB0aGlzLm1hcmtzV3JhcHBlckVsLm9mZnNldFdpZHRoKSAqIDEwMCkgKiAxMDApIC8gMTAwO1xuICAgICAgICBjb25zdCB4MiA9IE1hdGgucm91bmQoKChldmVudC5vZmZzZXRYIC8gdGhpcy5tYXJrc1dyYXBwZXJFbC5vZmZzZXRIZWlnaHQpICogMTAwKSAqIDEwMCkgLyAxMDA7XG4gICAgICAgIGNvbnN0IHkyID0gTWF0aC5yb3VuZCgoKGV2ZW50Lm9mZnNldFkgLyB0aGlzLm1hcmtzV3JhcHBlckVsLm9mZnNldFdpZHRoKSAqIDEwMCkgKiAxMDApIC8gMTAwO1xuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMubWFya2VyLmNvbW1lbnRzLmxlbmd0aCArIDE7XG4gICAgICAgIGlmICh0aGlzLm1vdXNlTW92ZWQpIHtcbiAgICAgICAgICB0aGlzLmVuYWJsZVBvaW50RXZlbnRzKHRoaXMubWFya3NXcmFwcGVyRWwucXVlcnlTZWxlY3RvckFsbCgnLnBvaW50LXRhZycpKTtcbiAgICAgICAgICB0aGlzLnNldE1vdXNlTW92ZWQoZmFsc2UpO1xuICAgICAgICAgIGlmICh0aGlzLm5vQ29tbWVudHMpIHtcbiAgICAgICAgICAgIGNvbnN0IGNvbW1lbnQgPSBuZXcgQ29tbWVudCh7XG4gICAgICAgICAgICAgIGNvb3JkaW5hdGVzOiBbeCwgeSwgeDIsIHkyXSxcbiAgICAgICAgICAgICAgaWQ6IHRoaXMubm9Db21tZW50cyA/IHRoaXMuZm9ybWF0VGFnSWQoKSA6IGluZGV4XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuYWRkSW5Db21tZW50c0FycmF5KGNvbW1lbnQpO1xuICAgICAgICAgICAgdGhpcy5jcmVhdGVTcXVhcmVUYWcoW3gsIHksIHgyLCB5Ml0sIGNvbW1lbnQuaWQpO1xuICAgICAgICAgICAgdGhpcy5jbGVhclNxdWFyZSgpO1xuICAgICAgICAgICAgdGhpcy5yZWZlcmVuY2VRYS5lbWl0KGZhbHNlKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc3QgZGlhbG9nUmVmID0gdGhpcy5kaWFsb2cub3BlbihEZWNSZW5kZXJDb21tZW50Q29tcG9uZW50KTtcbiAgICAgICAgICBkaWFsb2dSZWYuYWZ0ZXJDbG9zZWQoKS5zdWJzY3JpYmUocmVzdWx0ID0+IHtcbiAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgY29uc3QgY29tbWVudCA9IG5ldyBDb21tZW50KHtcbiAgICAgICAgICAgICAgICBjb29yZGluYXRlczogW3gsIHksIHgyLCB5Ml0sXG4gICAgICAgICAgICAgICAgY29tbWVudDogcmVzdWx0LmNvbW1lbnQsXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IHJlc3VsdC5kZXNjcmlwdGlvbixcbiAgICAgICAgICAgICAgICBpZDogaW5kZXhcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIHRoaXMuYWRkSW5Db21tZW50c0FycmF5KGNvbW1lbnQpO1xuICAgICAgICAgICAgICB0aGlzLmNyZWF0ZVNxdWFyZVRhZyhbeCwgeSwgeDIsIHkyXSwgY29tbWVudC5pZCk7XG4gICAgICAgICAgICAgIHRoaXMuY2xlYXJTcXVhcmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoIXRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3BvaW50LXRhZycpICYmICF0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdsaW5rLWJ1dHRvbicpKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5ub0NvbW1lbnRzKSB7XG4gICAgICAgICAgICAgIGNvbnN0IGNvbW1lbnQgPSBuZXcgQ29tbWVudCh7XG4gICAgICAgICAgICAgICAgY29vcmRpbmF0ZXM6IFt4LCB5XSxcbiAgICAgICAgICAgICAgICBpZDogdGhpcy5ub0NvbW1lbnRzID8gdGhpcy5mb3JtYXRUYWdJZCgpIDogaW5kZXhcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIHRoaXMuYWRkSW5Db21tZW50c0FycmF5KGNvbW1lbnQpO1xuICAgICAgICAgICAgICB0aGlzLmNyZWF0ZVBvaW50VGFnKFt4LCB5XSwgY29tbWVudC5pZCk7XG4gICAgICAgICAgICAgIHRoaXMucmVmZXJlbmNlUWEuZW1pdChmYWxzZSk7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGRpYWxvZ1JlZiA9IHRoaXMuZGlhbG9nLm9wZW4oRGVjUmVuZGVyQ29tbWVudENvbXBvbmVudCk7XG4gICAgICAgICAgICBkaWFsb2dSZWYuYWZ0ZXJDbG9zZWQoKS5zdWJzY3JpYmUocmVzdWx0ID0+IHtcbiAgICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvbW1lbnQgPSBuZXcgQ29tbWVudCh7XG4gICAgICAgICAgICAgICAgICBjb29yZGluYXRlczogW3gsIHldLFxuICAgICAgICAgICAgICAgICAgY29tbWVudDogcmVzdWx0LmNvbW1lbnQsXG4gICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogcmVzdWx0LmRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgICAgICAgaWQ6IGluZGV4XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRJbkNvbW1lbnRzQXJyYXkoY29tbWVudCk7XG4gICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVQb2ludFRhZyhbeCwgeV0sIGNvbW1lbnQuaWQpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IG1vdXNlbGVhdmUgPSBmcm9tRXZlbnQodGhpcy5tYXJrc1dyYXBwZXJFbCwgJ21vdXNlbGVhdmUnKTtcbiAgICBtb3VzZWxlYXZlLnN1YnNjcmliZSgoZXZlbnQ6IE1vdXNlRXZlbnQpID0+IHtcbiAgICAgIHRoaXMuc2V0V3JhcHBlckN1cnNvcigpO1xuICAgICAgaWYgKHRoaXMucWFNb2RlKSB7XG4gICAgICAgIHRoaXMuc2V0TW91c2VNb3ZlZChmYWxzZSk7XG4gICAgICAgIHRoaXMuY2xlYXJTcXVhcmUoKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGZyb21FdmVudCh0aGlzLm1hcmtzV3JhcHBlckVsLCAnbW91c2Vkb3duJykucGlwZShcbiAgICAgIHN3aXRjaE1hcCgoZXZlbnQ6IE1vdXNlRXZlbnQpID0+IHtcbiAgICAgICAgdGhpcy5zdGFydFggPSBldmVudC5vZmZzZXRYO1xuICAgICAgICB0aGlzLnN0YXJ0WSA9IGV2ZW50Lm9mZnNldFk7XG4gICAgICAgIHJldHVybiBmcm9tRXZlbnQodGhpcy5tYXJrc1dyYXBwZXJFbCwgJ21vdXNlbW92ZScpLnBpcGUoXG4gICAgICAgICAgdGFrZVVudGlsKG1vdXNldXApLFxuICAgICAgICAgIHRha2VVbnRpbChtb3VzZWxlYXZlKVxuICAgICAgICApO1xuICAgICAgfSlcbiAgICApLnN1YnNjcmliZSgoZXZlbnQ6IE1vdXNlRXZlbnQpID0+IHtcbiAgICAgIGlmICh0aGlzLnFhTW9kZSkge1xuICAgICAgICB0aGlzLnNldE1vdXNlTW92ZWQodHJ1ZSk7XG4gICAgICAgIHRoaXMuZGlzYWJsZVBvaW50RXZlbnRzKHRoaXMubWFya3NXcmFwcGVyRWwucXVlcnlTZWxlY3RvckFsbCgnLnBvaW50LXRhZycpKTtcbiAgICAgICAgdGhpcy5jbGVhclNxdWFyZSgpO1xuICAgICAgICBjb25zdCBzcXVhcmUgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBzcXVhcmUuaWQgPSAnc3F1YXJlTWFyayc7XG4gICAgICAgIHRoaXMuY29uZmlndXJlTm9Db21tZW50cyhzcXVhcmUpO1xuICAgICAgICBzcXVhcmUuc3R5bGUudG9wID0gdGhpcy5zdGFydFkgPiBldmVudC5vZmZzZXRZID8gYCR7ZXZlbnQub2Zmc2V0WX1weGAgOiBgJHt0aGlzLnN0YXJ0WX1weGA7XG4gICAgICAgIHNxdWFyZS5zdHlsZS5sZWZ0ID0gdGhpcy5zdGFydFggPiBldmVudC5vZmZzZXRYID8gYCR7ZXZlbnQub2Zmc2V0WH1weGAgOiBgJHt0aGlzLnN0YXJ0WH1weGA7XG4gICAgICAgIHNxdWFyZS5zdHlsZS53aWR0aCA9IGAke01hdGguYWJzKHRoaXMuc3RhcnRYIC0gZXZlbnQub2Zmc2V0WCl9cHhgO1xuICAgICAgICBzcXVhcmUuc3R5bGUuaGVpZ2h0ID0gYCR7TWF0aC5hYnModGhpcy5zdGFydFkgLSBldmVudC5vZmZzZXRZKX1weGA7XG4gICAgICAgIHRoaXMubWFya3NXcmFwcGVyRWwuYXBwZW5kQ2hpbGQoc3F1YXJlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgZm9ybWF0VGFnSWQoKSB7XG4gICAgcmV0dXJuIGAke3RoaXMucGFyZW50SWR9LiR7dGhpcy5jb21lbnRJbmRleH1gO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRDYW52YXNTaXplKHNpemU6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuY2FudmFzRWwud2lkdGggPSBzaXplO1xuICAgIHRoaXMuY2FudmFzRWwuaGVpZ2h0ID0gc2l6ZTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0V3JhcHBlckN1cnNvcigpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5tYXJrc1dyYXBwZXJFbCkge1xuICAgICAgaWYgKHRoaXMucWFNb2RlKSB7XG4gICAgICAgIHRoaXMubWFya3NXcmFwcGVyRWwuc3R5bGUuY3Vyc29yID0gJ2Nyb3NzaGFpcic7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm1hcmtzV3JhcHBlckVsLnN0eWxlLmN1cnNvciA9ICdkZWZhdWx0JztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNldFdyYXBwZXJTaXplKHNpemU6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMubWFya3NXcmFwcGVyRWwuc3R5bGUud2lkdGggPSBgJHtzaXplfXB4YDtcbiAgICB0aGlzLm1hcmtzV3JhcHBlckVsLnN0eWxlLmhlaWdodCA9IGAke3NpemV9cHhgO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRNb3VzZU1vdmVkKG1vdmVkOiBib29sZWFuKSB7XG4gICAgdGhpcy5tb3VzZU1vdmVkID0gbW92ZWQ7XG4gIH1cblxuICBwcml2YXRlIGVuYWJsZVBvaW50RXZlbnRzKGVsZW1lbnRzOiBOb2RlTGlzdE9mPEhUTUxEaXZFbGVtZW50Pikge1xuICAgIEFycmF5LmZyb20oZWxlbWVudHMpLmZvckVhY2goKGVsZW1lbnQpID0+IHtcbiAgICAgIGVsZW1lbnQuc3R5bGUucG9pbnRlckV2ZW50cyA9ICdhbGwnO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBkaXNhYmxlUG9pbnRFdmVudHMoZWxlbWVudHM6IE5vZGVMaXN0T2Y8SFRNTERpdkVsZW1lbnQ+KSB7XG4gICAgQXJyYXkuZnJvbShlbGVtZW50cykuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgICAgZWxlbWVudC5zdHlsZS5wb2ludGVyRXZlbnRzID0gJ25vbmUnO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVQb2ludFRhZyhjb29yZGluYXRlczogbnVtYmVyW10sIGluZGV4OiBudW1iZXIpOiBIVE1MRGl2RWxlbWVudCB7XG4gICAgY29uc3QgW3gsIHldID0gY29vcmRpbmF0ZXM7XG4gICAgY29uc3QgdGFnID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0YWcuaW5uZXJIVE1MID0gdGhpcy5ub0NvbW1lbnRzID8gaW5kZXggOiBgJHt0aGlzLnBhcmVudElkfS4ke2luZGV4fWA7XG4gICAgdGFnLmNsYXNzTmFtZSA9ICdwb2ludC10YWcnO1xuICAgIHRhZy5zdHlsZS50b3AgPSBgY2FsYygke3l9JSAtIDEycHgpYDtcbiAgICB0YWcuc3R5bGUubGVmdCA9IGBjYWxjKCR7eH0lIC0gMTJweClgO1xuICAgIHRoaXMubWFya3NXcmFwcGVyRWwuYXBwZW5kQ2hpbGQodGFnKTtcbiAgICBpZiAoIXRoaXMubm9Db21tZW50cykge1xuICAgICAgY29uc3QgbGluayA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBsaW5rLmNsYXNzTmFtZSA9ICdsaW5rLWJ1dHRvbic7XG4gICAgICBsaW5rLmlubmVySFRNTCA9ICcrJztcbiAgICAgIHRhZy5hcHBlbmRDaGlsZChsaW5rKTtcbiAgICAgIGNvbnN0IGNvbW1lbnQgPSB0aGlzLm1hcmtlci5jb21tZW50cy5maW5kKGMgPT4gYy5pZCA9PT0gaW5kZXgpO1xuICAgICAgdGFnLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50OiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldCBhcyBIVE1MRGl2RWxlbWVudDtcbiAgICAgICAgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2xpbmstYnV0dG9uJykpIHtcbiAgICAgICAgICB0aGlzLmxpbmtUYWcoY29tbWVudCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5jbGlja0V2ZW50UG9pbnRUYWcoY29tbWVudCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgdGFnLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsICgpID0+IHRoaXMuYWRkQ29tbWVudE5vZGUoY29tbWVudCkpO1xuICAgICAgdGFnLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0JywgdGhpcy5yZW1vdmVDb21tZW50Tm9kZSk7XG4gICAgfVxuICAgIHJldHVybiB0YWc7XG4gIH1cblxuICBsaW5rVGFnKGNvbW1lbnQpIHtcbiAgICB0aGlzLmxpbmsuZW1pdChjb21tZW50KTtcbiAgfVxuXG4gIHByaXZhdGUgY2xpY2tFdmVudFBvaW50VGFnKGNvbW1lbnQ6IENvbW1lbnQpIHtcbiAgICBjb25zdCBkaWFsb2dSZWYgPSB0aGlzLmRpYWxvZy5vcGVuKERlY1JlbmRlckNvbW1lbnRDb21wb25lbnQsIHsgZGF0YTogeyBjb21tZW50OiBjb21tZW50LmNvbW1lbnQsIHZlcnNpb246IGNvbW1lbnQudmVyc2lvbiB9IH0pO1xuICAgIGRpYWxvZ1JlZi5hZnRlckNsb3NlZCgpLnN1YnNjcmliZShyZXN1bHQgPT4ge1xuICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICBjb21tZW50LmNvbW1lbnQgPSByZXN1bHQuY29tbWVudDtcbiAgICAgICAgY29tbWVudC5kZXNjcmlwdGlvbiA9IHJlc3VsdC5kZXNjcmlwdGlvbjtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlU3F1YXJlVGFnKGNvb3JkaW5hdGVzOiBudW1iZXJbXSwgaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgIGNvbnN0IFt4LCB5LCB4MiwgeTJdID0gY29vcmRpbmF0ZXM7XG4gICAgY29uc3Qgc3F1YXJlID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBzcXVhcmUuY2xhc3NOYW1lID0gJ3NxdWFyZS10YWcnO1xuICAgIHRoaXMuY29uZmlndXJlTm9Db21tZW50cyhzcXVhcmUpO1xuICAgIHNxdWFyZS5zdHlsZS53aWR0aCA9IGAke01hdGguYWJzKHggLSB4Mil9JWA7XG4gICAgc3F1YXJlLnN0eWxlLmhlaWdodCA9IGAke01hdGguYWJzKHkgLSB5Mil9JWA7XG4gICAgc3F1YXJlLnN0eWxlLnRvcCA9IGAke3kyID4geSA/IHkgOiB5Mn0lYDtcbiAgICBzcXVhcmUuc3R5bGUubGVmdCA9IGAke3gyID4geCA/IHggOiB4Mn0lYDtcbiAgICBjb25zdCBwb2ludCA9IHRoaXMuY3JlYXRlUG9pbnRUYWcoWzAsIDBdLCBpbmRleCk7XG4gICAgc3F1YXJlLmFwcGVuZENoaWxkKHBvaW50KTtcbiAgICB0aGlzLm1hcmtzV3JhcHBlckVsLmFwcGVuZENoaWxkKHNxdWFyZSk7XG4gIH1cblxuICBwcml2YXRlIGNsZWFyU3F1YXJlKCk6IHZvaWQge1xuICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3F1YXJlTWFyaycpKSB7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3F1YXJlTWFyaycpLnJlbW92ZSgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYWRkQ29tbWVudE5vZGUgPSAoY29tbWVudDogQ29tbWVudCk6IHZvaWQgPT4ge1xuICAgIGNvbnN0IHNwYW4gPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBzcGFuLmlubmVySFRNTCA9IGAke2NvbW1lbnQuY29tbWVudH0gLSAke2NvbW1lbnQuZGVzY3JpcHRpb259YDtcbiAgICBjb25zdCBjb21tZW50RGl2ID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb21tZW50RGl2LmNsYXNzTmFtZSA9ICdjb21tZW50LWhvdmVyJztcbiAgICBjb21tZW50RGl2LnN0eWxlLm1heFdpZHRoID0gdGhpcy5jYW52YXNFbC53aWR0aCA+IDM0MCA/ICczNDBweCcgOiAnY2FsYygxMDAlIC0gMjBweCknO1xuICAgIGNvbW1lbnREaXYuYXBwZW5kQ2hpbGQoc3Bhbik7XG4gICAgdGhpcy5tYXJrc1dyYXBwZXJFbC5wYXJlbnRFbGVtZW50LmFwcGVuZENoaWxkKGNvbW1lbnREaXYpO1xuICB9XG5cbiAgcHJpdmF0ZSByZW1vdmVDb21tZW50Tm9kZSgpIHtcbiAgICBjb25zdCBjb21tZW50Tm9kZSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2NvbW1lbnQtaG92ZXInKVswXTtcbiAgICBpZiAoY29tbWVudE5vZGUpIHtcbiAgICAgIGNvbW1lbnROb2RlLnBhcmVudEVsZW1lbnQucmVtb3ZlQ2hpbGQoY29tbWVudE5vZGUpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZHJhd01hcmtzKCkge1xuICAgIHRoaXMuY2xlYW5NYXJrcygpO1xuICAgIHRoaXMuZGVjUmVuZGVyQ29tbWVudFNlcnZpY2UuZ2V0UmVuZGVyRGVzY3JpcHRpb25zQnlDb2RlKHRoaXMubWFya2VyLmNvbW1lbnRzKTtcbiAgICBpZiAodGhpcy5tYXJrZXIuY29tbWVudHMgJiYgdGhpcy5tYXJrZXIuY29tbWVudHMubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5tYXJrZXIuY29tbWVudHMuZm9yRWFjaCgoY29tbWVudDogQ29tbWVudCkgPT4ge1xuICAgICAgICBpZiAoY29tbWVudC5jb29yZGluYXRlcy5sZW5ndGggPiAyKSB7XG4gICAgICAgICAgdGhpcy5jcmVhdGVTcXVhcmVUYWcoY29tbWVudC5jb29yZGluYXRlcywgY29tbWVudC5pZCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5jcmVhdGVQb2ludFRhZyhjb21tZW50LmNvb3JkaW5hdGVzLCBjb21tZW50LmlkKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBjbGVhbk1hcmtzKCk6IHZvaWQge1xuICAgIGNvbnN0IHBvaW50RWxlbWVudHMgPSB0aGlzLm1hcmtzV3JhcHBlckVsLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3BvaW50LXRhZycpO1xuICAgIGNvbnN0IHNxdWFyZUVsZW1lbnRzID0gdGhpcy5tYXJrc1dyYXBwZXJFbC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdzcXVhcmUtdGFnJyk7XG4gICAgY29uc3Qgem9vbUFyZWFFbGVtZW50cyA9IHRoaXMubWFya3NXcmFwcGVyRWwuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnem9vbS1hcmVhLXRhZycpO1xuICAgIHdoaWxlIChwb2ludEVsZW1lbnRzWzBdKSB7XG4gICAgICBwb2ludEVsZW1lbnRzWzBdLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQocG9pbnRFbGVtZW50c1swXSk7XG4gICAgfVxuICAgIHdoaWxlIChzcXVhcmVFbGVtZW50c1swXSkge1xuICAgICAgc3F1YXJlRWxlbWVudHNbMF0ucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzcXVhcmVFbGVtZW50c1swXSk7XG4gICAgfVxuICAgIHdoaWxlICh6b29tQXJlYUVsZW1lbnRzWzBdKSB7XG4gICAgICB6b29tQXJlYUVsZW1lbnRzWzBdLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoem9vbUFyZWFFbGVtZW50c1swXSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBkZWxldGVNYXJrKGNvbW1lbnQpIHtcbiAgICB0aGlzLm1hcmtlci5jb21tZW50cy5zcGxpY2UodGhpcy5tYXJrZXIuY29tbWVudHMuaW5kZXhPZihjb21tZW50KSwgMSk7XG4gICAgdGhpcy5tYXJrZXIuY29tbWVudHMuZm9yRWFjaChjID0+IHtcbiAgICAgIGlmIChjLmlkID4gY29tbWVudC5pZCkge1xuICAgICAgICBjLmlkLS07XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5yZW1vdmVDb21tZW50Tm9kZSgpO1xuICAgIHRoaXMuZHJhd01hcmtzKCk7XG4gIH1cblxuICBwcml2YXRlIGNvbmZpZ3VyZU5vQ29tbWVudHMoc3F1YXJlOiBIVE1MRGl2RWxlbWVudCk6IHZvaWQge1xuICAgIGlmICh0aGlzLm5vQ29tbWVudHMpIHtcbiAgICAgIHNxdWFyZS5zdHlsZS5ib3JkZXJTdHlsZSA9ICdkYXNoZWQnO1xuICAgIH1cbiAgfVxuXG59XG4iXX0=