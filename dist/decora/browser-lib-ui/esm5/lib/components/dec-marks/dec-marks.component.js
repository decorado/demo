/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
var DecMarksComponent = /** @class */ (function () {
    function DecMarksComponent(renderer, dialog, decRenderCommentService) {
        var _this = this;
        this.renderer = renderer;
        this.dialog = dialog;
        this.decRenderCommentService = decRenderCommentService;
        this.marker = new Marker();
        this.noComments = true;
        this.parentId = 1;
        this.link = new EventEmitter();
        this.referenceQa = new EventEmitter();
        this.imageElement = new Image();
        this.addCommentNode = function (comment) {
            /** @type {?} */
            var span = _this.renderer.createElement('span');
            span.innerHTML = comment.comment + " - " + comment.description;
            /** @type {?} */
            var commentDiv = _this.renderer.createElement('div');
            commentDiv.className = 'comment-hover';
            commentDiv.style.maxWidth = _this.canvasEl.width > 340 ? '340px' : 'calc(100% - 20px)';
            commentDiv.appendChild(span);
            _this.marksWrapperEl.parentElement.appendChild(commentDiv);
        };
    }
    Object.defineProperty(DecMarksComponent.prototype, "qaMode", {
        get: /**
         * @return {?}
         */
        function () {
            return this._qaMode;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value !== this._qaMode) {
                this._qaMode = value;
                this.setWrapperCursor();
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    DecMarksComponent.prototype.onResize = /**
     * @return {?}
     */
    function () {
        this.setCanvasSize(this.canvasEl.offsetWidth);
        this.setWrapperSize(this.canvasEl.width);
        this.setupCanvas();
    };
    /**
     * @return {?}
     */
    DecMarksComponent.prototype.ngAfterViewChecked = /**
     * @return {?}
     */
    function () {
        if (!this.contentDone && this.canvas.nativeElement.parentElement.offsetWidth !== 0) {
            this.setupCanvas();
            this.setupMarksWrapper();
            this.setupMouseEvents();
            this.contentDone = true;
        }
    };
    /**
     * @return {?}
     */
    DecMarksComponent.prototype.setupCanvas = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.canvasEl = this.canvas.nativeElement;
        this.setCanvasSize(this.canvasEl.offsetWidth);
        this.ctx = this.canvasEl.getContext('2d');
        this.imageElement.onload = function () {
            _this.ctx.clearRect(0, 0, _this.canvasEl.width, _this.canvasEl.height);
            _this.ctx.save();
            _this.ctx.translate(_this.zoomPosition.x, _this.zoomPosition.y);
            _this.ctx.scale(_this.zoomScale, _this.zoomScale);
            _this.ctx.drawImage(_this.imageElement, -_this.zoomPosition.x, -_this.zoomPosition.y, _this.canvasEl.width, _this.canvasEl.height);
            _this.ctx.restore();
            _this.drawMarks();
        };
        console.log('marks', this.marker);
        this.imageElement.src = this.marker.file.fileUrl;
    };
    /**
     * @return {?}
     */
    DecMarksComponent.prototype.setupMarksWrapper = /**
     * @return {?}
     */
    function () {
        this.marksWrapperEl = this.marksWrapper.nativeElement;
        this.setWrapperSize(this.canvasEl.width);
        this.setWrapperCursor();
    };
    /**
     * @param {?} comment
     * @return {?}
     */
    DecMarksComponent.prototype.addInCommentsArray = /**
     * @param {?} comment
     * @return {?}
     */
    function (comment) {
        this.marker.comments.push(comment);
    };
    /**
     * @return {?}
     */
    DecMarksComponent.prototype.setupMouseEvents = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var mouseup = fromEvent(this.marksWrapperEl, 'mouseup');
        mouseup.subscribe(function (event) {
            /** @type {?} */
            var target = /** @type {?} */ (event.target);
            if (_this.qaMode) {
                /** @type {?} */
                var x_1 = Math.round(((_this.startX / _this.marksWrapperEl.offsetHeight) * 100) * 100) / 100;
                /** @type {?} */
                var y_1 = Math.round(((_this.startY / _this.marksWrapperEl.offsetWidth) * 100) * 100) / 100;
                /** @type {?} */
                var x2_1 = Math.round(((event.offsetX / _this.marksWrapperEl.offsetHeight) * 100) * 100) / 100;
                /** @type {?} */
                var y2_1 = Math.round(((event.offsetY / _this.marksWrapperEl.offsetWidth) * 100) * 100) / 100;
                /** @type {?} */
                var index_1 = _this.marker.comments.length + 1;
                if (_this.mouseMoved) {
                    _this.enablePointEvents(_this.marksWrapperEl.querySelectorAll('.point-tag'));
                    _this.setMouseMoved(false);
                    if (_this.noComments) {
                        /** @type {?} */
                        var comment = new Comment({
                            coordinates: [x_1, y_1, x2_1, y2_1],
                            id: _this.noComments ? _this.formatTagId() : index_1
                        });
                        _this.addInCommentsArray(comment);
                        _this.createSquareTag([x_1, y_1, x2_1, y2_1], comment.id);
                        _this.clearSquare();
                        _this.referenceQa.emit(false);
                        return;
                    }
                    /** @type {?} */
                    var dialogRef = _this.dialog.open(DecRenderCommentComponent);
                    dialogRef.afterClosed().subscribe(function (result) {
                        if (result) {
                            /** @type {?} */
                            var comment = new Comment({
                                coordinates: [x_1, y_1, x2_1, y2_1],
                                comment: result.comment,
                                description: result.description,
                                id: index_1
                            });
                            _this.addInCommentsArray(comment);
                            _this.createSquareTag([x_1, y_1, x2_1, y2_1], comment.id);
                            _this.clearSquare();
                        }
                    });
                }
                else {
                    if (!target.classList.contains('point-tag') && !target.classList.contains('link-button')) {
                        if (_this.noComments) {
                            /** @type {?} */
                            var comment = new Comment({
                                coordinates: [x_1, y_1],
                                id: _this.noComments ? _this.formatTagId() : index_1
                            });
                            _this.addInCommentsArray(comment);
                            _this.createPointTag([x_1, y_1], comment.id);
                            _this.referenceQa.emit(false);
                            return;
                        }
                        /** @type {?} */
                        var dialogRef = _this.dialog.open(DecRenderCommentComponent);
                        dialogRef.afterClosed().subscribe(function (result) {
                            if (result) {
                                /** @type {?} */
                                var comment = new Comment({
                                    coordinates: [x_1, y_1],
                                    comment: result.comment,
                                    description: result.description,
                                    id: index_1
                                });
                                _this.addInCommentsArray(comment);
                                _this.createPointTag([x_1, y_1], comment.id);
                            }
                        });
                    }
                }
            }
        });
        /** @type {?} */
        var mouseleave = fromEvent(this.marksWrapperEl, 'mouseleave');
        mouseleave.subscribe(function (event) {
            _this.setWrapperCursor();
            if (_this.qaMode) {
                _this.setMouseMoved(false);
                _this.clearSquare();
            }
        });
        fromEvent(this.marksWrapperEl, 'mousedown').pipe(switchMap(function (event) {
            _this.startX = event.offsetX;
            _this.startY = event.offsetY;
            return fromEvent(_this.marksWrapperEl, 'mousemove').pipe(takeUntil(mouseup), takeUntil(mouseleave));
        })).subscribe(function (event) {
            if (_this.qaMode) {
                _this.setMouseMoved(true);
                _this.disablePointEvents(_this.marksWrapperEl.querySelectorAll('.point-tag'));
                _this.clearSquare();
                /** @type {?} */
                var square = _this.renderer.createElement('div');
                square.id = 'squareMark';
                _this.configureNoComments(square);
                square.style.top = _this.startY > event.offsetY ? event.offsetY + "px" : _this.startY + "px";
                square.style.left = _this.startX > event.offsetX ? event.offsetX + "px" : _this.startX + "px";
                square.style.width = Math.abs(_this.startX - event.offsetX) + "px";
                square.style.height = Math.abs(_this.startY - event.offsetY) + "px";
                _this.marksWrapperEl.appendChild(square);
            }
        });
    };
    /**
     * @return {?}
     */
    DecMarksComponent.prototype.formatTagId = /**
     * @return {?}
     */
    function () {
        return this.parentId + "." + this.comentIndex;
    };
    /**
     * @param {?} size
     * @return {?}
     */
    DecMarksComponent.prototype.setCanvasSize = /**
     * @param {?} size
     * @return {?}
     */
    function (size) {
        this.canvasEl.width = size;
        this.canvasEl.height = size;
    };
    /**
     * @return {?}
     */
    DecMarksComponent.prototype.setWrapperCursor = /**
     * @return {?}
     */
    function () {
        if (this.marksWrapperEl) {
            if (this.qaMode) {
                this.marksWrapperEl.style.cursor = 'crosshair';
            }
            else {
                this.marksWrapperEl.style.cursor = 'default';
            }
        }
    };
    /**
     * @param {?} size
     * @return {?}
     */
    DecMarksComponent.prototype.setWrapperSize = /**
     * @param {?} size
     * @return {?}
     */
    function (size) {
        this.marksWrapperEl.style.width = size + "px";
        this.marksWrapperEl.style.height = size + "px";
    };
    /**
     * @param {?} moved
     * @return {?}
     */
    DecMarksComponent.prototype.setMouseMoved = /**
     * @param {?} moved
     * @return {?}
     */
    function (moved) {
        this.mouseMoved = moved;
    };
    /**
     * @param {?} elements
     * @return {?}
     */
    DecMarksComponent.prototype.enablePointEvents = /**
     * @param {?} elements
     * @return {?}
     */
    function (elements) {
        Array.from(elements).forEach(function (element) {
            element.style.pointerEvents = 'all';
        });
    };
    /**
     * @param {?} elements
     * @return {?}
     */
    DecMarksComponent.prototype.disablePointEvents = /**
     * @param {?} elements
     * @return {?}
     */
    function (elements) {
        Array.from(elements).forEach(function (element) {
            element.style.pointerEvents = 'none';
        });
    };
    /**
     * @param {?} coordinates
     * @param {?} index
     * @return {?}
     */
    DecMarksComponent.prototype.createPointTag = /**
     * @param {?} coordinates
     * @param {?} index
     * @return {?}
     */
    function (coordinates, index) {
        var _this = this;
        var _a = tslib_1.__read(coordinates, 2), x = _a[0], y = _a[1];
        /** @type {?} */
        var tag = this.renderer.createElement('div');
        tag.innerHTML = this.noComments ? index : this.parentId + "." + index;
        tag.className = 'point-tag';
        tag.style.top = "calc(" + y + "% - 12px)";
        tag.style.left = "calc(" + x + "% - 12px)";
        this.marksWrapperEl.appendChild(tag);
        if (!this.noComments) {
            /** @type {?} */
            var link = this.renderer.createElement('div');
            link.className = 'link-button';
            link.innerHTML = '+';
            tag.appendChild(link);
            /** @type {?} */
            var comment_1 = this.marker.comments.find(function (c) { return c.id === index; });
            tag.addEventListener('click', function (event) {
                /** @type {?} */
                var target = /** @type {?} */ (event.target);
                if (target.classList.contains('link-button')) {
                    _this.linkTag(comment_1);
                }
                else {
                    _this.clickEventPointTag(comment_1);
                }
            });
            tag.addEventListener('mouseover', function () { return _this.addCommentNode(comment_1); });
            tag.addEventListener('mouseout', this.removeCommentNode);
        }
        return tag;
    };
    /**
     * @param {?} comment
     * @return {?}
     */
    DecMarksComponent.prototype.linkTag = /**
     * @param {?} comment
     * @return {?}
     */
    function (comment) {
        this.link.emit(comment);
    };
    /**
     * @param {?} comment
     * @return {?}
     */
    DecMarksComponent.prototype.clickEventPointTag = /**
     * @param {?} comment
     * @return {?}
     */
    function (comment) {
        /** @type {?} */
        var dialogRef = this.dialog.open(DecRenderCommentComponent, { data: { comment: comment.comment, version: comment.version } });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                comment.comment = result.comment;
                comment.description = result.description;
            }
        });
    };
    /**
     * @param {?} coordinates
     * @param {?} index
     * @return {?}
     */
    DecMarksComponent.prototype.createSquareTag = /**
     * @param {?} coordinates
     * @param {?} index
     * @return {?}
     */
    function (coordinates, index) {
        var _a = tslib_1.__read(coordinates, 4), x = _a[0], y = _a[1], x2 = _a[2], y2 = _a[3];
        /** @type {?} */
        var square = this.renderer.createElement('div');
        square.className = 'square-tag';
        this.configureNoComments(square);
        square.style.width = Math.abs(x - x2) + "%";
        square.style.height = Math.abs(y - y2) + "%";
        square.style.top = (y2 > y ? y : y2) + "%";
        square.style.left = (x2 > x ? x : x2) + "%";
        /** @type {?} */
        var point = this.createPointTag([0, 0], index);
        square.appendChild(point);
        this.marksWrapperEl.appendChild(square);
    };
    /**
     * @return {?}
     */
    DecMarksComponent.prototype.clearSquare = /**
     * @return {?}
     */
    function () {
        if (document.getElementById('squareMark')) {
            document.getElementById('squareMark').remove();
        }
    };
    /**
     * @return {?}
     */
    DecMarksComponent.prototype.removeCommentNode = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var commentNode = document.getElementsByClassName('comment-hover')[0];
        if (commentNode) {
            commentNode.parentElement.removeChild(commentNode);
        }
    };
    /**
     * @return {?}
     */
    DecMarksComponent.prototype.drawMarks = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.cleanMarks();
        this.decRenderCommentService.getRenderDescriptionsByCode(this.marker.comments);
        if (this.marker.comments && this.marker.comments.length > 0) {
            this.marker.comments.forEach(function (comment) {
                if (comment.coordinates.length > 2) {
                    _this.createSquareTag(comment.coordinates, comment.id);
                }
                else {
                    _this.createPointTag(comment.coordinates, comment.id);
                }
            });
        }
    };
    /**
     * @return {?}
     */
    DecMarksComponent.prototype.cleanMarks = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var pointElements = this.marksWrapperEl.getElementsByClassName('point-tag');
        /** @type {?} */
        var squareElements = this.marksWrapperEl.getElementsByClassName('square-tag');
        /** @type {?} */
        var zoomAreaElements = this.marksWrapperEl.getElementsByClassName('zoom-area-tag');
        while (pointElements[0]) {
            pointElements[0].parentNode.removeChild(pointElements[0]);
        }
        while (squareElements[0]) {
            squareElements[0].parentNode.removeChild(squareElements[0]);
        }
        while (zoomAreaElements[0]) {
            zoomAreaElements[0].parentNode.removeChild(zoomAreaElements[0]);
        }
    };
    /**
     * @param {?} comment
     * @return {?}
     */
    DecMarksComponent.prototype.deleteMark = /**
     * @param {?} comment
     * @return {?}
     */
    function (comment) {
        this.marker.comments.splice(this.marker.comments.indexOf(comment), 1);
        this.marker.comments.forEach(function (c) {
            if (c.id > comment.id) {
                c.id--;
            }
        });
        this.removeCommentNode();
        this.drawMarks();
    };
    /**
     * @param {?} square
     * @return {?}
     */
    DecMarksComponent.prototype.configureNoComments = /**
     * @param {?} square
     * @return {?}
     */
    function (square) {
        if (this.noComments) {
            square.style.borderStyle = 'dashed';
        }
    };
    DecMarksComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dec-marks',
                    template: "<div class=\"zoom-container\">\n  <div #marksWrapper class=\"marks-wrapper\"></div>\n  <canvas #canvas></canvas>\n</div>\n",
                    styles: ["#squareMark{position:absolute;border:2px solid #ff0ade;pointer-events:none}.zoom-container{display:flex;flex-direction:column;position:relative;overflow:hidden}.zoom-container .marks-wrapper{position:absolute}.zoom-container .marks-wrapper .point-tag{position:absolute;font-size:12px;width:24px;height:24px;background-color:#ff0ade;font-weight:500;text-align:center;cursor:pointer;line-height:24px;color:#fff;border-radius:100%;border:1px solid #fff;box-sizing:border-box;text-shadow:0 0 10px #000;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;z-index:1;display:flex;justify-content:center;align-items:center;pointer-events:all}.zoom-container .marks-wrapper .point-tag:hover{border-color:#ff0ade}.zoom-container .marks-wrapper .point-tag .link-button{width:12px;height:12px;background-color:#ff0ade;position:absolute;display:flex;justify-content:center;align-items:center;left:-16px;border:1px solid #fff}.zoom-container .marks-wrapper .point-tag .link-button:hover{border-color:#ff0ade}.zoom-container .marks-wrapper .square-tag{position:absolute;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;pointer-events:none;border:2px solid #ff0ade}.zoom-container .comment-hover{background-color:#ff0ade;box-sizing:border-box;padding:8px 12px;border-radius:4px;position:absolute;font-size:12px;line-height:18px;text-shadow:none;text-align:left;color:#fff;left:10px;top:10px;z-index:1}"]
                },] },
    ];
    /** @nocollapse */
    DecMarksComponent.ctorParameters = function () { return [
        { type: Renderer2 },
        { type: MatDialog },
        { type: DecRenderCommentService }
    ]; };
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
    return DecMarksComponent;
}());
export { DecMarksComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLW1hcmtzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9kZWMtbWFya3MvZGVjLW1hcmtzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBb0IsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6SSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDakUsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBQ25FLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDakMsT0FBTyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN0RCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxvREFBb0QsQ0FBQztBQUM3RixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDOUMsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sc0RBQXNELENBQUM7Ozs7Ozs7Ozs7SUFtRS9GLDJCQUFvQixRQUFtQixFQUFVLE1BQWlCLEVBQVUsdUJBQWdEO1FBQTVILGlCQUFpSTtRQUE3RyxhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBVztRQUFVLDRCQUF1QixHQUF2Qix1QkFBdUIsQ0FBeUI7c0JBakRsRyxJQUFJLE1BQU0sRUFBRTswQkFNaEIsSUFBSTt3QkFFTixDQUFDO29CQWdCSixJQUFJLFlBQVksRUFBRTsyQkFDWCxJQUFJLFlBQVksRUFBRTs0QkFTRCxJQUFJLEtBQUssRUFBRTs4QkFrUTNCLFVBQUMsT0FBZ0I7O1lBQ3hDLElBQU0sSUFBSSxHQUFH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Z0JBQ3RCLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQzthQUNSO1NBQ0YsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDOzs7Ozs7SUFHWCwrQ0FBbUI7Ozs7Y0FBQyxNQUFzQjtRQUNoRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUNwQixNQUFNLENBQUMsS0FBSyxDQUFDLFdBQVcsR0FBRyxRQUFRLENBQUM7U0FDckM7OztnQkEzV0osU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxXQUFXO29CQUNyQixRQUFRLEVBQUUsNEhBSVg7b0JBQ0MsTUFBTSxFQUFFLENBQUMsZzdDQUFnN0MsQ0FBQztpQkFDMzdDOzs7O2dCQXRCK0QsU0FBUztnQkFNaEUsU0FBUztnQkFEVCx1QkFBdUI7Ozt5QkFvQjdCLEtBQUs7NEJBRUwsS0FBSzsrQkFFTCxLQUFLOzZCQUVMLEtBQUs7MkJBRUwsS0FBSzs4QkFFTCxLQUFLO3lCQUVMLEtBQUs7dUJBWUwsTUFBTTs4QkFDTixNQUFNO3lCQUVOLFNBQVMsU0FBQyxRQUFROytCQUlsQixTQUFTLFNBQUMsY0FBYzsyQkFXeEIsWUFBWSxTQUFDLGVBQWU7OzRCQW5FL0I7O1NBdUJhLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIFZpZXdDaGlsZCwgRWxlbWVudFJlZiwgSG9zdExpc3RlbmVyLCBSZW5kZXJlcjIsIEFmdGVyVmlld0NoZWNrZWQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXJrZXIgfSBmcm9tICcuLy4uL2RlYy16b29tLW1hcmtzL21vZGVscy9tYXJrZXIubW9kZWwnO1xuaW1wb3J0IHsgQ29tbWVudCB9IGZyb20gJy4vLi4vZGVjLXpvb20tbWFya3MvbW9kZWxzL2NvbW1lbnQubW9kZWwnO1xuaW1wb3J0IHsgZnJvbUV2ZW50IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBzd2l0Y2hNYXAsIHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IERlY1JlbmRlckNvbW1lbnRTZXJ2aWNlIH0gZnJvbSAnLi8uLi9kZWMtcmVuZGVyLWNvbW1lbnQvZGVjLXJlbmRlci1jb21tZW50LnNlcnZpY2UnO1xuaW1wb3J0IHsgTWF0RGlhbG9nIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgRGVjUmVuZGVyQ29tbWVudENvbXBvbmVudCB9IGZyb20gJy4vLi4vZGVjLXJlbmRlci1jb21tZW50L2RlYy1yZW5kZXItY29tbWVudC5jb21wb25lbnQnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFpvb21Qb3NpdGlvbiB7XG4gIHg6IG51bWJlcjtcbiAgeTogbnVtYmVyO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtbWFya3MnLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJ6b29tLWNvbnRhaW5lclwiPlxuICA8ZGl2ICNtYXJrc1dyYXBwZXIgY2xhc3M9XCJtYXJrcy13cmFwcGVyXCI+PC9kaXY+XG4gIDxjYW52YXMgI2NhbnZhcz48L2NhbnZhcz5cbjwvZGl2PlxuYCxcbiAgc3R5bGVzOiBbYCNzcXVhcmVNYXJre3Bvc2l0aW9uOmFic29sdXRlO2JvcmRlcjoycHggc29saWQgI2ZmMGFkZTtwb2ludGVyLWV2ZW50czpub25lfS56b29tLWNvbnRhaW5lcntkaXNwbGF5OmZsZXg7ZmxleC1kaXJlY3Rpb246Y29sdW1uO3Bvc2l0aW9uOnJlbGF0aXZlO292ZXJmbG93OmhpZGRlbn0uem9vbS1jb250YWluZXIgLm1hcmtzLXdyYXBwZXJ7cG9zaXRpb246YWJzb2x1dGV9Lnpvb20tY29udGFpbmVyIC5tYXJrcy13cmFwcGVyIC5wb2ludC10YWd7cG9zaXRpb246YWJzb2x1dGU7Zm9udC1zaXplOjEycHg7d2lkdGg6MjRweDtoZWlnaHQ6MjRweDtiYWNrZ3JvdW5kLWNvbG9yOiNmZjBhZGU7Zm9udC13ZWlnaHQ6NTAwO3RleHQtYWxpZ246Y2VudGVyO2N1cnNvcjpwb2ludGVyO2xpbmUtaGVpZ2h0OjI0cHg7Y29sb3I6I2ZmZjtib3JkZXItcmFkaXVzOjEwMCU7Ym9yZGVyOjFweCBzb2xpZCAjZmZmO2JveC1zaXppbmc6Ym9yZGVyLWJveDt0ZXh0LXNoYWRvdzowIDAgMTBweCAjMDAwOy13ZWJraXQtdXNlci1zZWxlY3Q6bm9uZTstbW96LXVzZXItc2VsZWN0Om5vbmU7LW1zLXVzZXItc2VsZWN0Om5vbmU7dXNlci1zZWxlY3Q6bm9uZTt6LWluZGV4OjE7ZGlzcGxheTpmbGV4O2p1c3RpZnktY29udGVudDpjZW50ZXI7YWxpZ24taXRlbXM6Y2VudGVyO3BvaW50ZXItZXZlbnRzOmFsbH0uem9vbS1jb250YWluZXIgLm1hcmtzLXdyYXBwZXIgLnBvaW50LXRhZzpob3Zlcntib3JkZXItY29sb3I6I2ZmMGFkZX0uem9vbS1jb250YWluZXIgLm1hcmtzLXdyYXBwZXIgLnBvaW50LXRhZyAubGluay1idXR0b257d2lkdGg6MTJweDtoZWlnaHQ6MTJweDtiYWNrZ3JvdW5kLWNvbG9yOiNmZjBhZGU7cG9zaXRpb246YWJzb2x1dGU7ZGlzcGxheTpmbGV4O2p1c3RpZnktY29udGVudDpjZW50ZXI7YWxpZ24taXRlbXM6Y2VudGVyO2xlZnQ6LTE2cHg7Ym9yZGVyOjFweCBzb2xpZCAjZmZmfS56b29tLWNvbnRhaW5lciAubWFya3Mtd3JhcHBlciAucG9pbnQtdGFnIC5saW5rLWJ1dHRvbjpob3Zlcntib3JkZXItY29sb3I6I2ZmMGFkZX0uem9vbS1jb250YWluZXIgLm1hcmtzLXdyYXBwZXIgLnNxdWFyZS10YWd7cG9zaXRpb246YWJzb2x1dGU7LXdlYmtpdC11c2VyLXNlbGVjdDpub25lOy1tb3otdXNlci1zZWxlY3Q6bm9uZTstbXMtdXNlci1zZWxlY3Q6bm9uZTt1c2VyLXNlbGVjdDpub25lO3BvaW50ZXItZXZlbnRzOm5vbmU7Ym9yZGVyOjJweCBzb2xpZCAjZmYwYWRlfS56b29tLWNvbnRhaW5lciAuY29tbWVudC1ob3ZlcntiYWNrZ3JvdW5kLWNvbG9yOiNmZjBhZGU7Ym94LXNpemluZzpib3JkZXItYm94O3BhZGRpbmc6OHB4IDEycHg7Ym9yZGVyLXJhZGl1czo0cHg7cG9zaXRpb246YWJzb2x1dGU7Zm9udC1zaXplOjEycHg7bGluZS1oZWlnaHQ6MThweDt0ZXh0LXNoYWRvdzpub25lO3RleHQtYWxpZ246bGVmdDtjb2xvcjojZmZmO2xlZnQ6MTBweDt0b3A6MTBweDt6LWluZGV4OjF9YF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjTWFya3NDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdDaGVja2VkIHtcblxuICBASW5wdXQoKSBtYXJrZXI6IE1hcmtlciA9IG5ldyBNYXJrZXIoKTtcblxuICBASW5wdXQoKSB6b29tU2NhbGU6IG51bWJlcjtcblxuICBASW5wdXQoKSB6b29tUG9zaXRpb246IFpvb21Qb3NpdGlvbjtcblxuICBASW5wdXQoKSBub0NvbW1lbnRzID0gdHJ1ZTtcblxuICBASW5wdXQoKSBwYXJlbnRJZCA9IDE7XG5cbiAgQElucHV0KCkgY29tZW50SW5kZXg7XG5cbiAgQElucHV0KClcbiAgc2V0IHFhTW9kZSh2YWx1ZTogYm9vbGVhbikge1xuICAgIGlmICh2YWx1ZSAhPT0gdGhpcy5fcWFNb2RlKSB7XG4gICAgICB0aGlzLl9xYU1vZGUgPSB2YWx1ZTtcbiAgICAgIHRoaXMuc2V0V3JhcHBlckN1cnNvcigpO1xuICAgIH1cbiAgfVxuICBnZXQgcWFNb2RlKCkge1xuICAgIHJldHVybiB0aGlzLl9xYU1vZGU7XG4gIH1cbiAgcHJpdmF0ZSBfcWFNb2RlOiBib29sZWFuO1xuXG4gIEBPdXRwdXQoKSBsaW5rID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgcmVmZXJlbmNlUWEgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgQFZpZXdDaGlsZCgnY2FudmFzJykgY2FudmFzOiBFbGVtZW50UmVmO1xuICBwdWJsaWMgY2FudmFzRWw6IEhUTUxDYW52YXNFbGVtZW50O1xuICBwcml2YXRlIGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xuXG4gIEBWaWV3Q2hpbGQoJ21hcmtzV3JhcHBlcicpIG1hcmtzV3JhcHBlcjogRWxlbWVudFJlZjtcbiAgcHVibGljIG1hcmtzV3JhcHBlckVsOiBIVE1MRGl2RWxlbWVudDtcblxuICBwcml2YXRlIGltYWdlRWxlbWVudDogSFRNTEltYWdlRWxlbWVudCA9IG5ldyBJbWFnZSgpO1xuXG4gIHByaXZhdGUgY29udGVudERvbmU6IGJvb2xlYW47XG5cbiAgcHJpdmF0ZSBzdGFydFg6IG51bWJlcjtcbiAgcHJpdmF0ZSBzdGFydFk6IG51bWJlcjtcbiAgcHJpdmF0ZSBtb3VzZU1vdmVkOiBib29sZWFuO1xuXG4gIEBIb3N0TGlzdGVuZXIoJ3dpbmRvdzpyZXNpemUnKVxuICBvblJlc2l6ZSgpIHtcbiAgICB0aGlzLnNldENhbnZhc1NpemUodGhpcy5jYW52YXNFbC5vZmZzZXRXaWR0aCk7XG4gICAgdGhpcy5zZXRXcmFwcGVyU2l6ZSh0aGlzLmNhbnZhc0VsLndpZHRoKTtcbiAgICB0aGlzLnNldHVwQ2FudmFzKCk7XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsIHByaXZhdGUgZGlhbG9nOiBNYXREaWFsb2csIHByaXZhdGUgZGVjUmVuZGVyQ29tbWVudFNlcnZpY2U6IERlY1JlbmRlckNvbW1lbnRTZXJ2aWNlKSB7IH1cblxuICBuZ0FmdGVyVmlld0NoZWNrZWQoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmNvbnRlbnREb25lICYmIHRoaXMuY2FudmFzLm5hdGl2ZUVsZW1lbnQucGFyZW50RWxlbWVudC5vZmZzZXRXaWR0aCAhPT0gMCkge1xuICAgICAgdGhpcy5zZXR1cENhbnZhcygpO1xuICAgICAgdGhpcy5zZXR1cE1hcmtzV3JhcHBlcigpO1xuICAgICAgdGhpcy5zZXR1cE1vdXNlRXZlbnRzKCk7XG4gICAgICB0aGlzLmNvbnRlbnREb25lID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNldHVwQ2FudmFzKCk6IHZvaWQge1xuICAgIHRoaXMuY2FudmFzRWwgPSB0aGlzLmNhbnZhcy5uYXRpdmVFbGVtZW50O1xuICAgIHRoaXMuc2V0Q2FudmFzU2l6ZSh0aGlzLmNhbnZhc0VsLm9mZnNldFdpZHRoKTtcbiAgICB0aGlzLmN0eCA9IHRoaXMuY2FudmFzRWwuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICB0aGlzLmltYWdlRWxlbWVudC5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICB0aGlzLmN0eC5jbGVhclJlY3QoMCwgMCwgdGhpcy5jYW52YXNFbC53aWR0aCwgdGhpcy5jYW52YXNFbC5oZWlnaHQpO1xuICAgICAgdGhpcy5jdHguc2F2ZSgpO1xuICAgICAgdGhpcy5jdHgudHJhbnNsYXRlKHRoaXMuem9vbVBvc2l0aW9uLngsIHRoaXMuem9vbVBvc2l0aW9uLnkpO1xuICAgICAgdGhpcy5jdHguc2NhbGUodGhpcy56b29tU2NhbGUsIHRoaXMuem9vbVNjYWxlKTtcbiAgICAgIHRoaXMuY3R4LmRyYXdJbWFnZSh0aGlzLmltYWdlRWxlbWVudCwgLXRoaXMuem9vbVBvc2l0aW9uLngsIC10aGlzLnpvb21Qb3NpdGlvbi55LCB0aGlzLmNhbnZhc0VsLndpZHRoLCB0aGlzLmNhbnZhc0VsLmhlaWdodCk7XG4gICAgICB0aGlzLmN0eC5yZXN0b3JlKCk7XG4gICAgICB0aGlzLmRyYXdNYXJrcygpO1xuICAgIH07XG4gICAgY29uc29sZS5sb2coJ21hcmtzJywgdGhpcy5tYXJrZXIpO1xuICAgIHRoaXMuaW1hZ2VFbGVtZW50LnNyYyA9IHRoaXMubWFya2VyLmZpbGUuZmlsZVVybDtcbiAgfVxuXG4gIHByaXZhdGUgc2V0dXBNYXJrc1dyYXBwZXIoKTogdm9pZCB7XG4gICAgdGhpcy5tYXJrc1dyYXBwZXJFbCA9IHRoaXMubWFya3NXcmFwcGVyLm5hdGl2ZUVsZW1lbnQ7XG4gICAgdGhpcy5zZXRXcmFwcGVyU2l6ZSh0aGlzLmNhbnZhc0VsLndpZHRoKTtcbiAgICB0aGlzLnNldFdyYXBwZXJDdXJzb3IoKTtcbiAgfVxuXG4gIHByaXZhdGUgYWRkSW5Db21tZW50c0FycmF5KGNvbW1lbnQ6IENvbW1lbnQpOiB2b2lkIHtcbiAgICB0aGlzLm1hcmtlci5jb21tZW50cy5wdXNoKGNvbW1lbnQpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXR1cE1vdXNlRXZlbnRzKCk6IHZvaWQge1xuICAgIGNvbnN0IG1vdXNldXAgPSBmcm9tRXZlbnQodGhpcy5tYXJrc1dyYXBwZXJFbCwgJ21vdXNldXAnKTtcbiAgICBtb3VzZXVwLnN1YnNjcmliZSgoZXZlbnQ6IE1vdXNlRXZlbnQpID0+IHtcbiAgICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldCBhcyBIVE1MRGl2RWxlbWVudDtcbiAgICAgIGlmICh0aGlzLnFhTW9kZSkge1xuICAgICAgICBjb25zdCB4ID0gTWF0aC5yb3VuZCgoKHRoaXMuc3RhcnRYIC8gdGhpcy5tYXJrc1dyYXBwZXJFbC5vZmZzZXRIZWlnaHQpICogMTAwKSAqIDEwMCkgLyAxMDA7XG4gICAgICAgIGNvbnN0IHkgPSBNYXRoLnJvdW5kKCgodGhpcy5zdGFydFkgLyB0aGlzLm1hcmtzV3JhcHBlckVsLm9mZnNldFdpZHRoKSAqIDEwMCkgKiAxMDApIC8gMTAwO1xuICAgICAgICBjb25zdCB4MiA9IE1hdGgucm91bmQoKChldmVudC5vZmZzZXRYIC8gdGhpcy5tYXJrc1dyYXBwZXJFbC5vZmZzZXRIZWlnaHQpICogMTAwKSAqIDEwMCkgLyAxMDA7XG4gICAgICAgIGNvbnN0IHkyID0gTWF0aC5yb3VuZCgoKGV2ZW50Lm9mZnNldFkgLyB0aGlzLm1hcmtzV3JhcHBlckVsLm9mZnNldFdpZHRoKSAqIDEwMCkgKiAxMDApIC8gMTAwO1xuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMubWFya2VyLmNvbW1lbnRzLmxlbmd0aCArIDE7XG4gICAgICAgIGlmICh0aGlzLm1vdXNlTW92ZWQpIHtcbiAgICAgICAgICB0aGlzLmVuYWJsZVBvaW50RXZlbnRzKHRoaXMubWFya3NXcmFwcGVyRWwucXVlcnlTZWxlY3RvckFsbCgnLnBvaW50LXRhZycpKTtcbiAgICAgICAgICB0aGlzLnNldE1vdXNlTW92ZWQoZmFsc2UpO1xuICAgICAgICAgIGlmICh0aGlzLm5vQ29tbWVudHMpIHtcbiAgICAgICAgICAgIGNvbnN0IGNvbW1lbnQgPSBuZXcgQ29tbWVudCh7XG4gICAgICAgICAgICAgIGNvb3JkaW5hdGVzOiBbeCwgeSwgeDIsIHkyXSxcbiAgICAgICAgICAgICAgaWQ6IHRoaXMubm9Db21tZW50cyA/IHRoaXMuZm9ybWF0VGFnSWQoKSA6IGluZGV4XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuYWRkSW5Db21tZW50c0FycmF5KGNvbW1lbnQpO1xuICAgICAgICAgICAgdGhpcy5jcmVhdGVTcXVhcmVUYWcoW3gsIHksIHgyLCB5Ml0sIGNvbW1lbnQuaWQpO1xuICAgICAgICAgICAgdGhpcy5jbGVhclNxdWFyZSgpO1xuICAgICAgICAgICAgdGhpcy5yZWZlcmVuY2VRYS5lbWl0KGZhbHNlKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc3QgZGlhbG9nUmVmID0gdGhpcy5kaWFsb2cub3BlbihEZWNSZW5kZXJDb21tZW50Q29tcG9uZW50KTtcbiAgICAgICAgICBkaWFsb2dSZWYuYWZ0ZXJDbG9zZWQoKS5zdWJzY3JpYmUocmVzdWx0ID0+IHtcbiAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgY29uc3QgY29tbWVudCA9IG5ldyBDb21tZW50KHtcbiAgICAgICAgICAgICAgICBjb29yZGluYXRlczogW3gsIHksIHgyLCB5Ml0sXG4gICAgICAgICAgICAgICAgY29tbWVudDogcmVzdWx0LmNvbW1lbnQsXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IHJlc3VsdC5kZXNjcmlwdGlvbixcbiAgICAgICAgICAgICAgICBpZDogaW5kZXhcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIHRoaXMuYWRkSW5Db21tZW50c0FycmF5KGNvbW1lbnQpO1xuICAgICAgICAgICAgICB0aGlzLmNyZWF0ZVNxdWFyZVRhZyhbeCwgeSwgeDIsIHkyXSwgY29tbWVudC5pZCk7XG4gICAgICAgICAgICAgIHRoaXMuY2xlYXJTcXVhcmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoIXRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3BvaW50LXRhZycpICYmICF0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdsaW5rLWJ1dHRvbicpKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5ub0NvbW1lbnRzKSB7XG4gICAgICAgICAgICAgIGNvbnN0IGNvbW1lbnQgPSBuZXcgQ29tbWVudCh7XG4gICAgICAgICAgICAgICAgY29vcmRpbmF0ZXM6IFt4LCB5XSxcbiAgICAgICAgICAgICAgICBpZDogdGhpcy5ub0NvbW1lbnRzID8gdGhpcy5mb3JtYXRUYWdJZCgpIDogaW5kZXhcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIHRoaXMuYWRkSW5Db21tZW50c0FycmF5KGNvbW1lbnQpO1xuICAgICAgICAgICAgICB0aGlzLmNyZWF0ZVBvaW50VGFnKFt4LCB5XSwgY29tbWVudC5pZCk7XG4gICAgICAgICAgICAgIHRoaXMucmVmZXJlbmNlUWEuZW1pdChmYWxzZSk7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGRpYWxvZ1JlZiA9IHRoaXMuZGlhbG9nLm9wZW4oRGVjUmVuZGVyQ29tbWVudENvbXBvbmVudCk7XG4gICAgICAgICAgICBkaWFsb2dSZWYuYWZ0ZXJDbG9zZWQoKS5zdWJzY3JpYmUocmVzdWx0ID0+IHtcbiAgICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvbW1lbnQgPSBuZXcgQ29tbWVudCh7XG4gICAgICAgICAgICAgICAgICBjb29yZGluYXRlczogW3gsIHldLFxuICAgICAgICAgICAgICAgICAgY29tbWVudDogcmVzdWx0LmNvbW1lbnQsXG4gICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogcmVzdWx0LmRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgICAgICAgaWQ6IGluZGV4XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRJbkNvbW1lbnRzQXJyYXkoY29tbWVudCk7XG4gICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVQb2ludFRhZyhbeCwgeV0sIGNvbW1lbnQuaWQpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IG1vdXNlbGVhdmUgPSBmcm9tRXZlbnQodGhpcy5tYXJrc1dyYXBwZXJFbCwgJ21vdXNlbGVhdmUnKTtcbiAgICBtb3VzZWxlYXZlLnN1YnNjcmliZSgoZXZlbnQ6IE1vdXNlRXZlbnQpID0+IHtcbiAgICAgIHRoaXMuc2V0V3JhcHBlckN1cnNvcigpO1xuICAgICAgaWYgKHRoaXMucWFNb2RlKSB7XG4gICAgICAgIHRoaXMuc2V0TW91c2VNb3ZlZChmYWxzZSk7XG4gICAgICAgIHRoaXMuY2xlYXJTcXVhcmUoKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGZyb21FdmVudCh0aGlzLm1hcmtzV3JhcHBlckVsLCAnbW91c2Vkb3duJykucGlwZShcbiAgICAgIHN3aXRjaE1hcCgoZXZlbnQ6IE1vdXNlRXZlbnQpID0+IHtcbiAgICAgICAgdGhpcy5zdGFydFggPSBldmVudC5vZmZzZXRYO1xuICAgICAgICB0aGlzLnN0YXJ0WSA9IGV2ZW50Lm9mZnNldFk7XG4gICAgICAgIHJldHVybiBmcm9tRXZlbnQodGhpcy5tYXJrc1dyYXBwZXJFbCwgJ21vdXNlbW92ZScpLnBpcGUoXG4gICAgICAgICAgdGFrZVVudGlsKG1vdXNldXApLFxuICAgICAgICAgIHRha2VVbnRpbChtb3VzZWxlYXZlKVxuICAgICAgICApO1xuICAgICAgfSlcbiAgICApLnN1YnNjcmliZSgoZXZlbnQ6IE1vdXNlRXZlbnQpID0+IHtcbiAgICAgIGlmICh0aGlzLnFhTW9kZSkge1xuICAgICAgICB0aGlzLnNldE1vdXNlTW92ZWQodHJ1ZSk7XG4gICAgICAgIHRoaXMuZGlzYWJsZVBvaW50RXZlbnRzKHRoaXMubWFya3NXcmFwcGVyRWwucXVlcnlTZWxlY3RvckFsbCgnLnBvaW50LXRhZycpKTtcbiAgICAgICAgdGhpcy5jbGVhclNxdWFyZSgpO1xuICAgICAgICBjb25zdCBzcXVhcmUgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBzcXVhcmUuaWQgPSAnc3F1YXJlTWFyayc7XG4gICAgICAgIHRoaXMuY29uZmlndXJlTm9Db21tZW50cyhzcXVhcmUpO1xuICAgICAgICBzcXVhcmUuc3R5bGUudG9wID0gdGhpcy5zdGFydFkgPiBldmVudC5vZmZzZXRZID8gYCR7ZXZlbnQub2Zmc2V0WX1weGAgOiBgJHt0aGlzLnN0YXJ0WX1weGA7XG4gICAgICAgIHNxdWFyZS5zdHlsZS5sZWZ0ID0gdGhpcy5zdGFydFggPiBldmVudC5vZmZzZXRYID8gYCR7ZXZlbnQub2Zmc2V0WH1weGAgOiBgJHt0aGlzLnN0YXJ0WH1weGA7XG4gICAgICAgIHNxdWFyZS5zdHlsZS53aWR0aCA9IGAke01hdGguYWJzKHRoaXMuc3RhcnRYIC0gZXZlbnQub2Zmc2V0WCl9cHhgO1xuICAgICAgICBzcXVhcmUuc3R5bGUuaGVpZ2h0ID0gYCR7TWF0aC5hYnModGhpcy5zdGFydFkgLSBldmVudC5vZmZzZXRZKX1weGA7XG4gICAgICAgIHRoaXMubWFya3NXcmFwcGVyRWwuYXBwZW5kQ2hpbGQoc3F1YXJlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgZm9ybWF0VGFnSWQoKSB7XG4gICAgcmV0dXJuIGAke3RoaXMucGFyZW50SWR9LiR7dGhpcy5jb21lbnRJbmRleH1gO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRDYW52YXNTaXplKHNpemU6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuY2FudmFzRWwud2lkdGggPSBzaXplO1xuICAgIHRoaXMuY2FudmFzRWwuaGVpZ2h0ID0gc2l6ZTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0V3JhcHBlckN1cnNvcigpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5tYXJrc1dyYXBwZXJFbCkge1xuICAgICAgaWYgKHRoaXMucWFNb2RlKSB7XG4gICAgICAgIHRoaXMubWFya3NXcmFwcGVyRWwuc3R5bGUuY3Vyc29yID0gJ2Nyb3NzaGFpcic7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm1hcmtzV3JhcHBlckVsLnN0eWxlLmN1cnNvciA9ICdkZWZhdWx0JztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNldFdyYXBwZXJTaXplKHNpemU6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMubWFya3NXcmFwcGVyRWwuc3R5bGUud2lkdGggPSBgJHtzaXplfXB4YDtcbiAgICB0aGlzLm1hcmtzV3JhcHBlckVsLnN0eWxlLmhlaWdodCA9IGAke3NpemV9cHhgO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRNb3VzZU1vdmVkKG1vdmVkOiBib29sZWFuKSB7XG4gICAgdGhpcy5tb3VzZU1vdmVkID0gbW92ZWQ7XG4gIH1cblxuICBwcml2YXRlIGVuYWJsZVBvaW50RXZlbnRzKGVsZW1lbnRzOiBOb2RlTGlzdE9mPEhUTUxEaXZFbGVtZW50Pikge1xuICAgIEFycmF5LmZyb20oZWxlbWVudHMpLmZvckVhY2goKGVsZW1lbnQpID0+IHtcbiAgICAgIGVsZW1lbnQuc3R5bGUucG9pbnRlckV2ZW50cyA9ICdhbGwnO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBkaXNhYmxlUG9pbnRFdmVudHMoZWxlbWVudHM6IE5vZGVMaXN0T2Y8SFRNTERpdkVsZW1lbnQ+KSB7XG4gICAgQXJyYXkuZnJvbShlbGVtZW50cykuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgICAgZWxlbWVudC5zdHlsZS5wb2ludGVyRXZlbnRzID0gJ25vbmUnO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVQb2ludFRhZyhjb29yZGluYXRlczogbnVtYmVyW10sIGluZGV4OiBudW1iZXIpOiBIVE1MRGl2RWxlbWVudCB7XG4gICAgY29uc3QgW3gsIHldID0gY29vcmRpbmF0ZXM7XG4gICAgY29uc3QgdGFnID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0YWcuaW5uZXJIVE1MID0gdGhpcy5ub0NvbW1lbnRzID8gaW5kZXggOiBgJHt0aGlzLnBhcmVudElkfS4ke2luZGV4fWA7XG4gICAgdGFnLmNsYXNzTmFtZSA9ICdwb2ludC10YWcnO1xuICAgIHRhZy5zdHlsZS50b3AgPSBgY2FsYygke3l9JSAtIDEycHgpYDtcbiAgICB0YWcuc3R5bGUubGVmdCA9IGBjYWxjKCR7eH0lIC0gMTJweClgO1xuICAgIHRoaXMubWFya3NXcmFwcGVyRWwuYXBwZW5kQ2hpbGQodGFnKTtcbiAgICBpZiAoIXRoaXMubm9Db21tZW50cykge1xuICAgICAgY29uc3QgbGluayA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBsaW5rLmNsYXNzTmFtZSA9ICdsaW5rLWJ1dHRvbic7XG4gICAgICBsaW5rLmlubmVySFRNTCA9ICcrJztcbiAgICAgIHRhZy5hcHBlbmRDaGlsZChsaW5rKTtcbiAgICAgIGNvbnN0IGNvbW1lbnQgPSB0aGlzLm1hcmtlci5jb21tZW50cy5maW5kKGMgPT4gYy5pZCA9PT0gaW5kZXgpO1xuICAgICAgdGFnLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50OiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldCBhcyBIVE1MRGl2RWxlbWVudDtcbiAgICAgICAgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2xpbmstYnV0dG9uJykpIHtcbiAgICAgICAgICB0aGlzLmxpbmtUYWcoY29tbWVudCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5jbGlja0V2ZW50UG9pbnRUYWcoY29tbWVudCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgdGFnLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsICgpID0+IHRoaXMuYWRkQ29tbWVudE5vZGUoY29tbWVudCkpO1xuICAgICAgdGFnLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0JywgdGhpcy5yZW1vdmVDb21tZW50Tm9kZSk7XG4gICAgfVxuICAgIHJldHVybiB0YWc7XG4gIH1cblxuICBsaW5rVGFnKGNvbW1lbnQpIHtcbiAgICB0aGlzLmxpbmsuZW1pdChjb21tZW50KTtcbiAgfVxuXG4gIHByaXZhdGUgY2xpY2tFdmVudFBvaW50VGFnKGNvbW1lbnQ6IENvbW1lbnQpIHtcbiAgICBjb25zdCBkaWFsb2dSZWYgPSB0aGlzLmRpYWxvZy5vcGVuKERlY1JlbmRlckNvbW1lbnRDb21wb25lbnQsIHsgZGF0YTogeyBjb21tZW50OiBjb21tZW50LmNvbW1lbnQsIHZlcnNpb246IGNvbW1lbnQudmVyc2lvbiB9IH0pO1xuICAgIGRpYWxvZ1JlZi5hZnRlckNsb3NlZCgpLnN1YnNjcmliZShyZXN1bHQgPT4ge1xuICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICBjb21tZW50LmNvbW1lbnQgPSByZXN1bHQuY29tbWVudDtcbiAgICAgICAgY29tbWVudC5kZXNjcmlwdGlvbiA9IHJlc3VsdC5kZXNjcmlwdGlvbjtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlU3F1YXJlVGFnKGNvb3JkaW5hdGVzOiBudW1iZXJbXSwgaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgIGNvbnN0IFt4LCB5LCB4MiwgeTJdID0gY29vcmRpbmF0ZXM7XG4gICAgY29uc3Qgc3F1YXJlID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBzcXVhcmUuY2xhc3NOYW1lID0gJ3NxdWFyZS10YWcnO1xuICAgIHRoaXMuY29uZmlndXJlTm9Db21tZW50cyhzcXVhcmUpO1xuICAgIHNxdWFyZS5zdHlsZS53aWR0aCA9IGAke01hdGguYWJzKHggLSB4Mil9JWA7XG4gICAgc3F1YXJlLnN0eWxlLmhlaWdodCA9IGAke01hdGguYWJzKHkgLSB5Mil9JWA7XG4gICAgc3F1YXJlLnN0eWxlLnRvcCA9IGAke3kyID4geSA/IHkgOiB5Mn0lYDtcbiAgICBzcXVhcmUuc3R5bGUubGVmdCA9IGAke3gyID4geCA/IHggOiB4Mn0lYDtcbiAgICBjb25zdCBwb2ludCA9IHRoaXMuY3JlYXRlUG9pbnRUYWcoWzAsIDBdLCBpbmRleCk7XG4gICAgc3F1YXJlLmFwcGVuZENoaWxkKHBvaW50KTtcbiAgICB0aGlzLm1hcmtzV3JhcHBlckVsLmFwcGVuZENoaWxkKHNxdWFyZSk7XG4gIH1cblxuICBwcml2YXRlIGNsZWFyU3F1YXJlKCk6IHZvaWQge1xuICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3F1YXJlTWFyaycpKSB7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3F1YXJlTWFyaycpLnJlbW92ZSgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYWRkQ29tbWVudE5vZGUgPSAoY29tbWVudDogQ29tbWVudCk6IHZvaWQgPT4ge1xuICAgIGNvbnN0IHNwYW4gPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBzcGFuLmlubmVySFRNTCA9IGAke2NvbW1lbnQuY29tbWVudH0gLSAke2NvbW1lbnQuZGVzY3JpcHRpb259YDtcbiAgICBjb25zdCBjb21tZW50RGl2ID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb21tZW50RGl2LmNsYXNzTmFtZSA9ICdjb21tZW50LWhvdmVyJztcbiAgICBjb21tZW50RGl2LnN0eWxlLm1heFdpZHRoID0gdGhpcy5jYW52YXNFbC53aWR0aCA+IDM0MCA/ICczNDBweCcgOiAnY2FsYygxMDAlIC0gMjBweCknO1xuICAgIGNvbW1lbnREaXYuYXBwZW5kQ2hpbGQoc3Bhbik7XG4gICAgdGhpcy5tYXJrc1dyYXBwZXJFbC5wYXJlbnRFbGVtZW50LmFwcGVuZENoaWxkKGNvbW1lbnREaXYpO1xuICB9XG5cbiAgcHJpdmF0ZSByZW1vdmVDb21tZW50Tm9kZSgpIHtcbiAgICBjb25zdCBjb21tZW50Tm9kZSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2NvbW1lbnQtaG92ZXInKVswXTtcbiAgICBpZiAoY29tbWVudE5vZGUpIHtcbiAgICAgIGNvbW1lbnROb2RlLnBhcmVudEVsZW1lbnQucmVtb3ZlQ2hpbGQoY29tbWVudE5vZGUpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZHJhd01hcmtzKCkge1xuICAgIHRoaXMuY2xlYW5NYXJrcygpO1xuICAgIHRoaXMuZGVjUmVuZGVyQ29tbWVudFNlcnZpY2UuZ2V0UmVuZGVyRGVzY3JpcHRpb25zQnlDb2RlKHRoaXMubWFya2VyLmNvbW1lbnRzKTtcbiAgICBpZiAodGhpcy5tYXJrZXIuY29tbWVudHMgJiYgdGhpcy5tYXJrZXIuY29tbWVudHMubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5tYXJrZXIuY29tbWVudHMuZm9yRWFjaCgoY29tbWVudDogQ29tbWVudCkgPT4ge1xuICAgICAgICBpZiAoY29tbWVudC5jb29yZGluYXRlcy5sZW5ndGggPiAyKSB7XG4gICAgICAgICAgdGhpcy5jcmVhdGVTcXVhcmVUYWcoY29tbWVudC5jb29yZGluYXRlcywgY29tbWVudC5pZCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5jcmVhdGVQb2ludFRhZyhjb21tZW50LmNvb3JkaW5hdGVzLCBjb21tZW50LmlkKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBjbGVhbk1hcmtzKCk6IHZvaWQge1xuICAgIGNvbnN0IHBvaW50RWxlbWVudHMgPSB0aGlzLm1hcmtzV3JhcHBlckVsLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3BvaW50LXRhZycpO1xuICAgIGNvbnN0IHNxdWFyZUVsZW1lbnRzID0gdGhpcy5tYXJrc1dyYXBwZXJFbC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdzcXVhcmUtdGFnJyk7XG4gICAgY29uc3Qgem9vbUFyZWFFbGVtZW50cyA9IHRoaXMubWFya3NXcmFwcGVyRWwuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnem9vbS1hcmVhLXRhZycpO1xuICAgIHdoaWxlIChwb2ludEVsZW1lbnRzWzBdKSB7XG4gICAgICBwb2ludEVsZW1lbnRzWzBdLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQocG9pbnRFbGVtZW50c1swXSk7XG4gICAgfVxuICAgIHdoaWxlIChzcXVhcmVFbGVtZW50c1swXSkge1xuICAgICAgc3F1YXJlRWxlbWVudHNbMF0ucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzcXVhcmVFbGVtZW50c1swXSk7XG4gICAgfVxuICAgIHdoaWxlICh6b29tQXJlYUVsZW1lbnRzWzBdKSB7XG4gICAgICB6b29tQXJlYUVsZW1lbnRzWzBdLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoem9vbUFyZWFFbGVtZW50c1swXSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBkZWxldGVNYXJrKGNvbW1lbnQpIHtcbiAgICB0aGlzLm1hcmtlci5jb21tZW50cy5zcGxpY2UodGhpcy5tYXJrZXIuY29tbWVudHMuaW5kZXhPZihjb21tZW50KSwgMSk7XG4gICAgdGhpcy5tYXJrZXIuY29tbWVudHMuZm9yRWFjaChjID0+IHtcbiAgICAgIGlmIChjLmlkID4gY29tbWVudC5pZCkge1xuICAgICAgICBjLmlkLS07XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5yZW1vdmVDb21tZW50Tm9kZSgpO1xuICAgIHRoaXMuZHJhd01hcmtzKCk7XG4gIH1cblxuICBwcml2YXRlIGNvbmZpZ3VyZU5vQ29tbWVudHMoc3F1YXJlOiBIVE1MRGl2RWxlbWVudCk6IHZvaWQge1xuICAgIGlmICh0aGlzLm5vQ29tbWVudHMpIHtcbiAgICAgIHNxdWFyZS5zdHlsZS5ib3JkZXJTdHlsZSA9ICdkYXNoZWQnO1xuICAgIH1cbiAgfVxuXG59XG4iXX0=