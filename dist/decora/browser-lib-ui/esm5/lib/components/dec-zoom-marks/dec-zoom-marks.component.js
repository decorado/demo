/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Input, ViewChild, ElementRef, HostListener, Renderer2, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Marker } from './models/marker.model';
import { Comment } from './models/comment.model';
import { fromEvent } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { DecRenderCommentComponent } from './../dec-render-comment/dec-render-comment.component';
import { DecRenderCommentService } from './../dec-render-comment/dec-render-comment.service';
var DecZoomMarksComponent = /** @class */ (function () {
    function DecZoomMarksComponent(renderer, dialog, decRenderCommentService) {
        var _this = this;
        this.renderer = renderer;
        this.dialog = dialog;
        this.decRenderCommentService = decRenderCommentService;
        this.openZoomArea = new EventEmitter();
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
        this.getFormatedPositionAndScale = function () {
            /** @type {?} */
            var file = _this.marker.file;
            return {
                file: file,
                position: {
                    x: _this.zoomPosition.x,
                    y: _this.zoomPosition.y
                },
                zoomScale: _this.zoomScale
            };
        };
        this.addNewZoomArea = function (newZoomArea) {
            if (newZoomArea.coordinates.length > 0) {
                _this.editZoomArea(newZoomArea);
                return;
            }
            newZoomArea.coordinates.push(Math.round(Math.round(((_this.startX / _this.marksWrapperEl.offsetWidth) * 100) * 100) / 100));
            newZoomArea.coordinates.push(Math.round(Math.round(((_this.startY / _this.marksWrapperEl.offsetHeight) * 100) * 100) / 100));
            newZoomArea.id = _this.commentsArraySize + 1;
            _this.marker.zoomAreas.push(newZoomArea);
            _this.commentsArraySize++;
            _this.drawMarks();
        };
        this.zoomPosition = { x: 0, y: 0 };
        this.zoomScale = 1;
    }
    Object.defineProperty(DecZoomMarksComponent.prototype, "marker", {
        get: /**
         * @return {?}
         */
        function () {
            return this._marker;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value !== this._marker) {
                this._marker = value;
                if (this.contentDone) {
                    this.setupCanvas();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DecZoomMarksComponent.prototype, "qaMode", {
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
    DecZoomMarksComponent.prototype.onResize = /**
     * @return {?}
     */
    function () {
        this.setCanvasSize(this.canvasEl.offsetWidth);
        this.setWrapperSize(this.canvasEl.width);
        this.zoom(this.zoomScale);
    };
    /**
     * @return {?}
     */
    DecZoomMarksComponent.prototype.ngAfterViewChecked = /**
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
    DecZoomMarksComponent.prototype.setupCanvas = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.canvasEl = this.canvas.nativeElement;
        this.setCanvasSize(this.canvasEl.offsetWidth);
        this.cleanMarks();
        this.setupLoadingContainer();
        this.ctx = this.canvasEl.getContext('2d');
        this.imageElement.onload = function () {
            _this.loadingContainerEl.style.display = 'none';
            _this.ctx.drawImage(_this.imageElement, 0, 0, _this.canvasEl.width, _this.canvasEl.width);
            _this.drawMarks();
            _this.setZoomPosition(_this.canvasEl.width * 0.5, _this.canvasEl.width * 0.5);
        };
        this.imageElement.src = this.marker.file.fileUrl;
    };
    /**
     * @return {?}
     */
    DecZoomMarksComponent.prototype.setupLoadingContainer = /**
     * @return {?}
     */
    function () {
        this.loadingContainerEl = this.loadingContainer.nativeElement;
        this.loadingContainerEl.style.width = this.canvasEl.offsetWidth + "px";
        this.loadingContainerEl.style.height = this.canvasEl.offsetWidth + "px";
        this.loadingContainerEl.style.display = 'flex';
    };
    /**
     * @return {?}
     */
    DecZoomMarksComponent.prototype.setupMarksWrapper = /**
     * @return {?}
     */
    function () {
        this.marksWrapperEl = this.marksWrapper.nativeElement;
        this.setWrapperSize(this.canvasEl.width);
        this.setWrapperCursor();
    };
    /**
     * @return {?}
     */
    DecZoomMarksComponent.prototype.setupMouseEvents = /**
     * @return {?}
     */
    function () {
        this.wheelEvent();
        this.mousedownEvent();
    };
    /**
     * @return {?}
     */
    DecZoomMarksComponent.prototype.wheelEvent = /**
     * @return {?}
     */
    function () {
        var _this = this;
        fromEvent(this.marksWrapperEl, 'wheel').subscribe(function (event) {
            event.preventDefault();
            /** @type {?} */
            var target = /** @type {?} */ (event.target);
            if (!target.classList.contains('point-tag') && !target.classList.contains('zoom-area-tag')) {
                _this.setZoomPosition(((100 * event.offsetX) / _this.marksWrapperEl.offsetWidth * _this.canvasEl.offsetWidth) / 100, ((100 * event.offsetY) / _this.marksWrapperEl.offsetHeight * _this.canvasEl.offsetHeight) / 100);
                if (event.deltaY < 0) {
                    _this.zoomIn(0.5);
                }
                event.deltaY < 0 ? _this.zoomIn(0.5) : _this.zoomOut(0.5);
            }
        });
    };
    /**
     * @return {?}
     */
    DecZoomMarksComponent.prototype.mouseleaveEvent = /**
     * @return {?}
     */
    function () {
        return fromEvent(this.marksWrapperEl, 'mouseleave');
    };
    /**
     * @return {?}
     */
    DecZoomMarksComponent.prototype.mouseupEvent = /**
     * @return {?}
     */
    function () {
        return fromEvent(this.marksWrapperEl, 'mouseup');
    };
    /**
     * @param {?} comment
     * @return {?}
     */
    DecZoomMarksComponent.prototype.addInCommentsArray = /**
     * @param {?} comment
     * @return {?}
     */
    function (comment) {
        this.marker.comments.push(comment);
        this.commentsArraySize++;
    };
    /**
     * @return {?}
     */
    DecZoomMarksComponent.prototype.mousedownEvent = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var mouseup = this.mouseupEvent();
        mouseup.subscribe(function (event) {
            _this.setWrapperCursor();
            /** @type {?} */
            var target = /** @type {?} */ (event.target);
            _this.enablePointEvents(_this.marksWrapperEl.querySelectorAll('.point-tag'));
            if (_this.qaMode && _this.zoomScale === 1) {
                /** @type {?} */
                var x_1 = Math.round(((_this.startX / _this.marksWrapperEl.offsetHeight) * 100) * 100) / 100;
                /** @type {?} */
                var y_1 = Math.round(((_this.startY / _this.marksWrapperEl.offsetWidth) * 100) * 100) / 100;
                /** @type {?} */
                var x2_1 = Math.round(((event.offsetX / _this.marksWrapperEl.offsetHeight) * 100) * 100) / 100;
                /** @type {?} */
                var y2_1 = Math.round(((event.offsetY / _this.marksWrapperEl.offsetWidth) * 100) * 100) / 100;
                if (_this.mouseMoved) {
                    _this.setMouseMoved(false);
                    /** @type {?} */
                    var dialogRef = _this.dialog.open(DecRenderCommentComponent);
                    dialogRef.afterClosed().subscribe(function (result) {
                        if (result) {
                            /** @type {?} */
                            var comment = new Comment({
                                coordinates: [x_1, y_1, x2_1, y2_1],
                                comment: result.comment,
                                description: result.description,
                                id: _this.commentsArraySize + 1
                            });
                            _this.addInCommentsArray(comment);
                            _this.createSquareTag([x_1, y_1, x2_1, y2_1], comment.id);
                            _this.clearSquare();
                        }
                    });
                }
                else {
                    if (!target.classList.contains('point-tag') && !target.classList.contains('zoom-area-tag')) {
                        /** @type {?} */
                        var dialogRef = _this.dialog.open(DecRenderCommentComponent);
                        dialogRef.afterClosed().subscribe(function (result) {
                            if (result) {
                                /** @type {?} */
                                var comment = new Comment({
                                    coordinates: [x_1, y_1],
                                    comment: result.comment,
                                    description: result.description,
                                    id: _this.commentsArraySize + 1
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
        var mouseleave = this.mouseleaveEvent();
        mouseleave.subscribe(function (event) {
            _this.setWrapperCursor();
            _this.enablePointEvents(_this.marksWrapperEl.querySelectorAll('.point-tag'));
            if (_this.qaMode) {
                _this.setMouseMoved(false);
                _this.clearSquare();
            }
        });
        fromEvent(this.marksWrapperEl, 'mousedown').pipe(switchMap(function (event) {
            _this.startX = event.offsetX;
            _this.startY = event.offsetY;
            _this.setWrapperCursor(true);
            return fromEvent(_this.marksWrapperEl, 'mousemove').pipe(takeUntil(mouseup), takeUntil(mouseleave));
        })).subscribe(function (event) {
            if (_this.qaMode && _this.zoomScale === 1) {
                _this.setMouseMoved(true);
                _this.disablePointEvents(_this.marksWrapperEl.querySelectorAll('.point-tag'));
                _this.clearSquare();
                /** @type {?} */
                var square = _this.renderer.createElement('div');
                square.id = 'squareMark';
                square.style.top = _this.startY > event.offsetY ? event.offsetY + "px" : _this.startY + "px";
                square.style.left = _this.startX > event.offsetX ? event.offsetX + "px" : _this.startX + "px";
                square.style.width = Math.abs(_this.startX - event.offsetX) + "px";
                square.style.height = Math.abs(_this.startY - event.offsetY) + "px";
                _this.marksWrapperEl.appendChild(square);
            }
            else {
                _this.zoomPosition.x -= event.movementX;
                _this.zoomPosition.y -= event.movementY;
                if (_this.zoomPosition.x < 0) {
                    _this.zoomPosition.x = 0;
                }
                if (_this.zoomPosition.y < 0) {
                    _this.zoomPosition.y = 0;
                }
                if (_this.zoomPosition.x > _this.canvasEl.width) {
                    _this.zoomPosition.x = _this.canvasEl.width;
                }
                if (_this.zoomPosition.y > _this.canvasEl.height) {
                    _this.zoomPosition.y = _this.canvasEl.height;
                }
                _this.resizeMarker(_this.zoomScale);
                _this.ctx.clearRect(0, 0, _this.canvasEl.width, _this.canvasEl.height);
                _this.ctx.save();
                _this.ctx.translate(_this.zoomPosition.x, _this.zoomPosition.y);
                _this.ctx.scale(_this.zoomScale, _this.zoomScale);
                _this.ctx.translate(-_this.zoomPosition.x, -_this.zoomPosition.y);
                _this.ctx.drawImage(_this.imageElement, 0, 0, _this.canvasEl.width, _this.canvasEl.height);
                _this.ctx.restore();
            }
        });
    };
    /**
     * @return {?}
     */
    DecZoomMarksComponent.prototype.drawMarks = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.cleanMarks();
        this.commentsArraySize = 0;
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
            this.commentsArraySize += this.marker.comments.length;
        }
        if (this.marker.zoomAreas && this.marker.zoomAreas.length > 0) {
            this.marker.zoomAreas.forEach(function (zoomArea) {
                _this.createZoomAreaTag(zoomArea.coordinates, zoomArea.id);
            });
            this.commentsArraySize += this.marker.zoomAreas.length;
        }
    };
    /**
     * @param {?} zoomScale
     * @return {?}
     */
    DecZoomMarksComponent.prototype.resizeMarker = /**
     * @param {?} zoomScale
     * @return {?}
     */
    function (zoomScale) {
        /** @type {?} */
        var diffX = this.canvasEl.width * zoomScale - this.canvasEl.width;
        /** @type {?} */
        var diffY = this.canvasEl.height * zoomScale - this.canvasEl.height;
        this.marksWrapperEl.style.width = this.canvasEl.width * zoomScale + "px";
        this.marksWrapperEl.style.height = this.canvasEl.height * zoomScale + "px";
        this.marksWrapperEl.style.left = this.zoomXPosition(diffX, zoomScale);
        this.marksWrapperEl.style.top = this.zoomYPosition(diffY, zoomScale);
    };
    /**
     * @param {?} diffY
     * @param {?} zoomScale
     * @return {?}
     */
    DecZoomMarksComponent.prototype.zoomYPosition = /**
     * @param {?} diffY
     * @param {?} zoomScale
     * @return {?}
     */
    function (diffY, zoomScale) {
        if (this.zoomPosition.y !== (this.canvasEl.height / 2)) {
            if (zoomScale > 1) {
                /** @type {?} */
                var aux = zoomScale.toString().split('.')[0] > 1 ? (zoomScale - 1) : (zoomScale % 1);
                return -(this.zoomPosition.y * aux) + 'px';
            }
            else {
                return null;
            }
        }
        else {
            return (diffY / 2) * -1 + 'px';
        }
    };
    /**
     * @param {?} diffX
     * @param {?} zoomScale
     * @return {?}
     */
    DecZoomMarksComponent.prototype.zoomXPosition = /**
     * @param {?} diffX
     * @param {?} zoomScale
     * @return {?}
     */
    function (diffX, zoomScale) {
        if (this.zoomPosition.x !== (this.canvasEl.width / 2)) {
            if (zoomScale > 1) {
                /** @type {?} */
                var aux = zoomScale.toString().split('.')[0] > 1 ? (zoomScale - 1) : (zoomScale % 1);
                return -(this.zoomPosition.x * aux) + 'px';
            }
            else {
                return null;
            }
        }
        else {
            return (diffX / 2) * -1 + 'px';
        }
    };
    /**
     * @param {?} elements
     * @return {?}
     */
    DecZoomMarksComponent.prototype.enablePointEvents = /**
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
    DecZoomMarksComponent.prototype.disablePointEvents = /**
     * @param {?} elements
     * @return {?}
     */
    function (elements) {
        Array.from(elements).forEach(function (element) {
            element.style.pointerEvents = 'none';
        });
    };
    /**
     * @return {?}
     */
    DecZoomMarksComponent.prototype.cleanMarks = /**
     * @return {?}
     */
    function () {
        if (this.marksWrapperEl) {
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
        }
    };
    /**
     * @param {?} coordinates
     * @param {?} index
     * @return {?}
     */
    DecZoomMarksComponent.prototype.createPointTag = /**
     * @param {?} coordinates
     * @param {?} index
     * @return {?}
     */
    function (coordinates, index) {
        var _this = this;
        var _a = tslib_1.__read(coordinates, 2), x = _a[0], y = _a[1];
        /** @type {?} */
        var tag = this.renderer.createElement('div');
        tag.innerHTML = "" + index;
        tag.className = 'point-tag';
        tag.style.top = "calc(" + y + "% - 12px)";
        tag.style.left = "calc(" + x + "% - 12px)";
        this.marksWrapperEl.appendChild(tag);
        /** @type {?} */
        var comment = this.marker.comments.find(function (c) { return c.id === index; });
        tag.addEventListener('click', function () { return _this.clickEventPointTag(comment); });
        tag.addEventListener('mouseover', function () { return _this.addCommentNode(comment); });
        tag.addEventListener('mouseout', this.removeCommentNode);
        return tag;
    };
    /**
     * @param {?} coordinates
     * @param {?} index
     * @return {?}
     */
    DecZoomMarksComponent.prototype.createZoomAreaTag = /**
     * @param {?} coordinates
     * @param {?} index
     * @return {?}
     */
    function (coordinates, index) {
        var _this = this;
        var _a = tslib_1.__read(coordinates, 2), x = _a[0], y = _a[1];
        /** @type {?} */
        var tag = this.renderer.createElement('div');
        tag.innerHTML = "" + index;
        tag.className = 'zoom-area-tag';
        tag.style.top = "calc(" + y + "% - 12px)";
        tag.style.left = "calc(" + x + "% - 12px)";
        this.marksWrapperEl.appendChild(tag);
        /** @type {?} */
        var zoomArea = this.marker.zoomAreas.find(function (z) { return z.id === index; });
        tag.addEventListener('click', function () { return _this.clickEventZoomTag(zoomArea); });
        return tag;
    };
    /**
     * @param {?} coordinates
     * @param {?} index
     * @return {?}
     */
    DecZoomMarksComponent.prototype.createSquareTag = /**
     * @param {?} coordinates
     * @param {?} index
     * @return {?}
     */
    function (coordinates, index) {
        var _a = tslib_1.__read(coordinates, 4), x = _a[0], y = _a[1], x2 = _a[2], y2 = _a[3];
        /** @type {?} */
        var square = this.renderer.createElement('div');
        square.className = 'square-tag';
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
     * @param {?} comment
     * @return {?}
     */
    DecZoomMarksComponent.prototype.clickEventPointTag = /**
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
     * @param {?} zoomArea
     * @return {?}
     */
    DecZoomMarksComponent.prototype.clickEventZoomTag = /**
     * @param {?} zoomArea
     * @return {?}
     */
    function (zoomArea) {
        this.openZoomArea.emit(zoomArea);
    };
    /**
     * @return {?}
     */
    DecZoomMarksComponent.prototype.clearSquare = /**
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
    DecZoomMarksComponent.prototype.removeCommentNode = /**
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
     * @param {?} size
     * @return {?}
     */
    DecZoomMarksComponent.prototype.setCanvasSize = /**
     * @param {?} size
     * @return {?}
     */
    function (size) {
        this.canvasEl.width = size;
        this.canvasEl.height = size;
    };
    /**
     * @param {?} moved
     * @return {?}
     */
    DecZoomMarksComponent.prototype.setMouseMoved = /**
     * @param {?} moved
     * @return {?}
     */
    function (moved) {
        this.mouseMoved = moved;
    };
    /**
     * @param {?} size
     * @return {?}
     */
    DecZoomMarksComponent.prototype.setWrapperSize = /**
     * @param {?} size
     * @return {?}
     */
    function (size) {
        this.marksWrapperEl.style.width = size + "px";
        this.marksWrapperEl.style.height = size + "px";
    };
    /**
     * @param {?} x
     * @param {?} y
     * @return {?}
     */
    DecZoomMarksComponent.prototype.setZoomPosition = /**
     * @param {?} x
     * @param {?} y
     * @return {?}
     */
    function (x, y) {
        this.zoomPosition.x = x;
        this.zoomPosition.y = y;
    };
    /**
     * @param {?=} mousedown
     * @return {?}
     */
    DecZoomMarksComponent.prototype.setWrapperCursor = /**
     * @param {?=} mousedown
     * @return {?}
     */
    function (mousedown) {
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
    };
    /**
     * @param {?=} zoomScale
     * @return {?}
     */
    DecZoomMarksComponent.prototype.zoom = /**
     * @param {?=} zoomScale
     * @return {?}
     */
    function (zoomScale) {
        if (zoomScale === void 0) { zoomScale = 1; }
        this.zoomScale = zoomScale;
        this.resizeMarker(zoomScale);
        this.setWrapperCursor();
        this.ctx.clearRect(0, 0, this.canvasEl.width, this.canvasEl.height);
        this.ctx.save();
        this.ctx.translate(this.zoomPosition.x, this.zoomPosition.y);
        this.ctx.scale(zoomScale, zoomScale);
        this.ctx.drawImage(this.imageElement, -this.zoomPosition.x, -this.zoomPosition.y, this.canvasEl.width, this.canvasEl.height);
        this.ctx.restore();
    };
    /**
     * @param {?=} amount
     * @return {?}
     */
    DecZoomMarksComponent.prototype.zoomIn = /**
     * @param {?=} amount
     * @return {?}
     */
    function (amount) {
        if (amount === void 0) { amount = 1; }
        if (this.zoomScale < parseInt(this.maxZoomLevel, 10)) {
            (this.zoomScale + amount) < this.maxZoomLevel ? this.zoomScale += amount : this.zoomScale = +this.maxZoomLevel;
            this.zoom(this.zoomScale);
        }
    };
    /**
     * @param {?=} amount
     * @return {?}
     */
    DecZoomMarksComponent.prototype.zoomOut = /**
     * @param {?=} amount
     * @return {?}
     */
    function (amount) {
        if (amount === void 0) { amount = 1; }
        if (this.zoomScale > parseInt(this.minZoomLevel, 10)) {
            (this.zoomScale - amount) > this.minZoomLevel ? this.zoomScale -= amount : this.zoomScale = +this.minZoomLevel;
            this.zoom(this.zoomScale);
        }
    };
    /**
     * @param {?} value
     * @return {?}
     */
    DecZoomMarksComponent.prototype.onZoomSlide = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.zoom(value);
    };
    /**
     * @param {?} newZoomArea
     * @return {?}
     */
    DecZoomMarksComponent.prototype.editZoomArea = /**
     * @param {?} newZoomArea
     * @return {?}
     */
    function (newZoomArea) {
        /** @type {?} */
        var za = this.marker.zoomAreas.find(function (x) { return x.id === newZoomArea.id; });
        if (za) {
            za.renderShot = newZoomArea.renderShot;
            za.referenceShot = newZoomArea.referenceShot;
        }
    };
    DecZoomMarksComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dec-zoom-marks',
                    template: "<div class=\"zoom-container\">\n  <div #loadingContainer class=\"loading-container\">\n    <div class=\"spinner\"></div>\n  </div>\n  <div #marksWrapper class=\"marks-wrapper\"></div>\n  <canvas #canvas></canvas>\n</div>\n\n<div fxLayoutAlign=\"center center\" fxLayoutGap=\"8px\">\n  <button mat-icon-button color=\"primary\" (click)=\"zoomOut()\" [disabled]=\"zoomScale == minZoomLevel\">\n    <mat-icon aria-label=\"Zoom out\">remove</mat-icon>\n  </button>\n  <mat-slider fxFlex color=\"primary\" [min]=\"minZoomLevel\" [max]=\"maxZoomLevel\" [step]=\"stepZoomLevel\" [(ngModel)]=\"zoomScale\"\n    (input)=\"onZoomSlide($event.value)\"></mat-slider>\n  <button mat-icon-button color=\"primary\" (click)=\"zoomIn()\" [disabled]=\"zoomScale == maxZoomLevel\">\n    <mat-icon aria-label=\"Zoom in\">add</mat-icon>\n  </button>\n</div>\n",
                    styles: ["#squareMark{position:absolute;border:2px solid #ff0ade;pointer-events:none}.zoom-container{display:flex;flex-direction:column;position:relative;overflow:hidden}.zoom-container .loading-container{position:absolute;display:flex;justify-content:center;align-items:center}.zoom-container .loading-container .spinner{width:20%;height:20%;border:16px solid #fff;border-radius:50%;border-top:16px solid #ff0ade;border-bottom:16px solid #ff0ade;-webkit-animation:2s linear infinite spin;animation:2s linear infinite spin}.zoom-container .marks-wrapper{position:absolute;z-index:1}.zoom-container .marks-wrapper .zoom-area-tag{position:absolute;font-size:12px;width:24px;height:24px;background-color:#ff0ade;font-weight:500;text-align:center;cursor:pointer;line-height:24px;color:#fff;border-radius:100%;border:1px solid #fff;box-sizing:border-box;text-shadow:0 0 10px #000;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;z-index:auto;display:flex;justify-content:center;align-items:center;pointer-events:all}.zoom-container .marks-wrapper .zoom-area-tag:before{content:'';position:absolute;width:34px;height:22px;top:12px;left:12px;background-color:#ff8f00;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAQAAABLCVATAAABVUlEQVR4Ae3PAwxQXRgA0Pvbto1sW2NDts0x27atIdeQrakpY8i23cnGe5nn8epDeO1h+VgeVdRVRJLwsCQ101nX2aWJd8OD8a7Ozrkda6UJ8XnPUsBZy43S2Wz7rs8UDnEZCZjn5+tzb6jqCDgucYhDakAnb4Rb+MdmMCPEYSqYfH2cXfPr/ymcBalDFF84izN+uD7TnHCdXqB7iCI/WByuuy1QbrAiRFEL9L3WlObmc/l7uUHfgn0hivqg47VaXMfluQ/A6RBFeTDmnq39D7aEKNKBXfcMVBVMCtFsB0XvFshbVoBSIZqGYL8/wh10B/u8F6L52E6wU7ZwEx/oC6gV4pHVOXDeIPn95WOZ1bYRsD7EJ79D7m4nmO7dEI+fTHC7o7p6h+uh4pJJB0vscMwKQ+X13uXZ6RGh4vKeeQ8c6nWoJiFadCjRFUXzntbeDc/GaxcAotf7cicflKkAAAAASUVORK5CYII=);background-size:60%;background-repeat:no-repeat;background-position:center;z-index:-1;border:1px solid #fff}.zoom-container .marks-wrapper .zoom-area-tag:hover{border-color:#ff0ade}.zoom-container .marks-wrapper .zoom-area-tag:hover:before{border-color:#ff8f00}.zoom-container .marks-wrapper .point-tag{position:absolute;font-size:12px;width:24px;height:24px;background-color:#ff0ade;font-weight:500;text-align:center;cursor:pointer;line-height:24px;color:#fff;border-radius:100%;border:1px solid #fff;box-sizing:border-box;text-shadow:0 0 10px #000;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;z-index:1;display:flex;justify-content:center;align-items:center;pointer-events:all}.zoom-container .marks-wrapper .point-tag:hover{border-color:#ff0ade}.zoom-container .marks-wrapper .square-tag{position:absolute;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;pointer-events:none;border:2px solid #ff0ade}.zoom-container .comment-hover{background-color:#ff0ade;box-sizing:border-box;padding:8px 12px;border-radius:4px;position:absolute;font-size:12px;line-height:18px;text-shadow:none;text-align:left;color:#fff;left:10px;top:10px;z-index:1}@-webkit-keyframes spin{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes spin{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}"]
                },] },
    ];
    /** @nocollapse */
    DecZoomMarksComponent.ctorParameters = function () { return [
        { type: Renderer2 },
        { type: MatDialog },
        { type: DecRenderCommentService }
    ]; };
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
    return DecZoomMarksComponent;
}());
export { DecZoomMarksComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLXpvb20tbWFya3MuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGRlY29yYS9icm93c2VyLWxpYi11aS8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL2RlYy16b29tLW1hcmtzL2RlYy16b29tLW1hcmtzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQW9CLEtBQUssRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6SSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDOUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQy9DLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUVqRCxPQUFPLEVBQUUsU0FBUyxFQUFjLE1BQU0sTUFBTSxDQUFDO0FBQzdDLE9BQU8sRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFdEQsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sc0RBQXNELENBQUM7QUFDakcsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sb0RBQW9ELENBQUM7O0lBMEYzRiwrQkFBb0IsUUFBbUIsRUFBVSxNQUFpQixFQUFVLHVCQUFnRDtRQUE1SCxpQkFHQztRQUhtQixhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBVztRQUFVLDRCQUF1QixHQUF2Qix1QkFBdUIsQ0FBeUI7NEJBbENuRyxJQUFJLFlBQVksRUFBRTs0QkFJRixJQUFJLEtBQUssRUFBRTs4QkF1VzNCLFVBQUMsT0FBZ0I7O1lBQ3hDLElBQU0sSUFBSSxHQUFHLEtBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBRWpELElBQUksQ0FB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LElBQUksR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxTQUFTLENBQUMsQ0FBQztRQUN0RSxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsU0FBUyxDQUFDLENBQUM7Ozs7Ozs7SUFHL0QsNkNBQWE7Ozs7O2NBQUMsS0FBSyxFQUFFLFNBQVM7UUFDcEMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdkQsRUFBRSxDQUFDLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7O2dCQUNsQixJQUFNLEdBQUcsR0FBRyxTQUFTLENBQUMsUUFBUSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUN2RixNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQzthQUM1QztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLE1BQU0sQ0FBQyxJQUFJLENBQUM7YUFDYjtTQUNGO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixNQUFNLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO1NBQ2hDOzs7Ozs7O0lBR0ssNkNBQWE7Ozs7O2NBQUMsS0FBSyxFQUFFLFNBQVM7UUFDcEMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssR0FBRyxDQUFD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LGFBQWEsR0FBRyxXQUFXLENBQUMsYUFBYSxDQUFDO1NBQzlDO0tBQ0Y7O2dCQWxoQkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxnQkFBZ0I7b0JBQzFCLFFBQVEsRUFBRSx3MEJBa0JYO29CQUNDLE1BQU0sRUFBRSxDQUFDLGtyR0FBa3JHLENBQUM7aUJBQzdyRzs7OztnQkFqQ2lGLFNBQVM7Z0JBQ2xGLFNBQVM7Z0JBUVQsdUJBQXVCOzs7K0JBMkI3QixLQUFLOytCQUNMLEtBQUs7Z0NBQ0wsS0FBSzt5QkFFTCxLQUFLO3lCQWNMLEtBQUs7K0JBV0wsTUFBTTt5QkFpQk4sU0FBUyxTQUFDLFFBQVE7K0JBSWxCLFNBQVMsU0FBQyxjQUFjO21DQUd4QixTQUFTLFNBQUMsa0JBQWtCOzJCQUc1QixZQUFZLFNBQUMsZUFBZTs7Z0NBNUYvQjs7U0FrQ2EscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBBZnRlclZpZXdDaGVja2VkLCBJbnB1dCwgVmlld0NoaWxkLCBFbGVtZW50UmVmLCBIb3N0TGlzdGVuZXIsIFJlbmRlcmVyMiwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1hdERpYWxvZyB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IE1hcmtlciB9IGZyb20gJy4vbW9kZWxzL21hcmtlci5tb2RlbCc7XG5pbXBvcnQgeyBDb21tZW50IH0gZnJvbSAnLi9tb2RlbHMvY29tbWVudC5tb2RlbCc7XG5pbXBvcnQgeyBab29tUG9zaXRpb24gfSBmcm9tICcuL21vZGVscy96b29tLXBvc2l0aW9uLmludGVyZmFjZSc7XG5pbXBvcnQgeyBmcm9tRXZlbnQsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHN3aXRjaE1hcCwgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgWm9vbUFyZWEgfSBmcm9tICcuL21vZGVscy96b29tLWFyZWEubW9kZWwnO1xuaW1wb3J0IHsgRGVjUmVuZGVyQ29tbWVudENvbXBvbmVudCB9IGZyb20gJy4vLi4vZGVjLXJlbmRlci1jb21tZW50L2RlYy1yZW5kZXItY29tbWVudC5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGVjUmVuZGVyQ29tbWVudFNlcnZpY2UgfSBmcm9tICcuLy4uL2RlYy1yZW5kZXItY29tbWVudC9kZWMtcmVuZGVyLWNvbW1lbnQuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy16b29tLW1hcmtzJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwiem9vbS1jb250YWluZXJcIj5cbiAgPGRpdiAjbG9hZGluZ0NvbnRhaW5lciBjbGFzcz1cImxvYWRpbmctY29udGFpbmVyXCI+XG4gICAgPGRpdiBjbGFzcz1cInNwaW5uZXJcIj48L2Rpdj5cbiAgPC9kaXY+XG4gIDxkaXYgI21hcmtzV3JhcHBlciBjbGFzcz1cIm1hcmtzLXdyYXBwZXJcIj48L2Rpdj5cbiAgPGNhbnZhcyAjY2FudmFzPjwvY2FudmFzPlxuPC9kaXY+XG5cbjxkaXYgZnhMYXlvdXRBbGlnbj1cImNlbnRlciBjZW50ZXJcIiBmeExheW91dEdhcD1cIjhweFwiPlxuICA8YnV0dG9uIG1hdC1pY29uLWJ1dHRvbiBjb2xvcj1cInByaW1hcnlcIiAoY2xpY2spPVwiem9vbU91dCgpXCIgW2Rpc2FibGVkXT1cInpvb21TY2FsZSA9PSBtaW5ab29tTGV2ZWxcIj5cbiAgICA8bWF0LWljb24gYXJpYS1sYWJlbD1cIlpvb20gb3V0XCI+cmVtb3ZlPC9tYXQtaWNvbj5cbiAgPC9idXR0b24+XG4gIDxtYXQtc2xpZGVyIGZ4RmxleCBjb2xvcj1cInByaW1hcnlcIiBbbWluXT1cIm1pblpvb21MZXZlbFwiIFttYXhdPVwibWF4Wm9vbUxldmVsXCIgW3N0ZXBdPVwic3RlcFpvb21MZXZlbFwiIFsobmdNb2RlbCldPVwiem9vbVNjYWxlXCJcbiAgICAoaW5wdXQpPVwib25ab29tU2xpZGUoJGV2ZW50LnZhbHVlKVwiPjwvbWF0LXNsaWRlcj5cbiAgPGJ1dHRvbiBtYXQtaWNvbi1idXR0b24gY29sb3I9XCJwcmltYXJ5XCIgKGNsaWNrKT1cInpvb21JbigpXCIgW2Rpc2FibGVkXT1cInpvb21TY2FsZSA9PSBtYXhab29tTGV2ZWxcIj5cbiAgICA8bWF0LWljb24gYXJpYS1sYWJlbD1cIlpvb20gaW5cIj5hZGQ8L21hdC1pY29uPlxuICA8L2J1dHRvbj5cbjwvZGl2PlxuYCxcbiAgc3R5bGVzOiBbYCNzcXVhcmVNYXJre3Bvc2l0aW9uOmFic29sdXRlO2JvcmRlcjoycHggc29saWQgI2ZmMGFkZTtwb2ludGVyLWV2ZW50czpub25lfS56b29tLWNvbnRhaW5lcntkaXNwbGF5OmZsZXg7ZmxleC1kaXJlY3Rpb246Y29sdW1uO3Bvc2l0aW9uOnJlbGF0aXZlO292ZXJmbG93OmhpZGRlbn0uem9vbS1jb250YWluZXIgLmxvYWRpbmctY29udGFpbmVye3Bvc2l0aW9uOmFic29sdXRlO2Rpc3BsYXk6ZmxleDtqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO2FsaWduLWl0ZW1zOmNlbnRlcn0uem9vbS1jb250YWluZXIgLmxvYWRpbmctY29udGFpbmVyIC5zcGlubmVye3dpZHRoOjIwJTtoZWlnaHQ6MjAlO2JvcmRlcjoxNnB4IHNvbGlkICNmZmY7Ym9yZGVyLXJhZGl1czo1MCU7Ym9yZGVyLXRvcDoxNnB4IHNvbGlkICNmZjBhZGU7Ym9yZGVyLWJvdHRvbToxNnB4IHNvbGlkICNmZjBhZGU7LXdlYmtpdC1hbmltYXRpb246MnMgbGluZWFyIGluZmluaXRlIHNwaW47YW5pbWF0aW9uOjJzIGxpbmVhciBpbmZpbml0ZSBzcGlufS56b29tLWNvbnRhaW5lciAubWFya3Mtd3JhcHBlcntwb3NpdGlvbjphYnNvbHV0ZTt6LWluZGV4OjF9Lnpvb20tY29udGFpbmVyIC5tYXJrcy13cmFwcGVyIC56b29tLWFyZWEtdGFne3Bvc2l0aW9uOmFic29sdXRlO2ZvbnQtc2l6ZToxMnB4O3dpZHRoOjI0cHg7aGVpZ2h0OjI0cHg7YmFja2dyb3VuZC1jb2xvcjojZmYwYWRlO2ZvbnQtd2VpZ2h0OjUwMDt0ZXh0LWFsaWduOmNlbnRlcjtjdXJzb3I6cG9pbnRlcjtsaW5lLWhlaWdodDoyNHB4O2NvbG9yOiNmZmY7Ym9yZGVyLXJhZGl1czoxMDAlO2JvcmRlcjoxcHggc29saWQgI2ZmZjtib3gtc2l6aW5nOmJvcmRlci1ib3g7dGV4dC1zaGFkb3c6MCAwIDEwcHggIzAwMDstd2Via2l0LXVzZXItc2VsZWN0Om5vbmU7LW1vei11c2VyLXNlbGVjdDpub25lOy1tcy11c2VyLXNlbGVjdDpub25lO3VzZXItc2VsZWN0Om5vbmU7ei1pbmRleDphdXRvO2Rpc3BsYXk6ZmxleDtqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO2FsaWduLWl0ZW1zOmNlbnRlcjtwb2ludGVyLWV2ZW50czphbGx9Lnpvb20tY29udGFpbmVyIC5tYXJrcy13cmFwcGVyIC56b29tLWFyZWEtdGFnOmJlZm9yZXtjb250ZW50OicnO3Bvc2l0aW9uOmFic29sdXRlO3dpZHRoOjM0cHg7aGVpZ2h0OjIycHg7dG9wOjEycHg7bGVmdDoxMnB4O2JhY2tncm91bmQtY29sb3I6I2ZmOGYwMDtiYWNrZ3JvdW5kLWltYWdlOnVybChkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUNRQUFBQWtDQVFBQUFCTENWQVRBQUFCVlVsRVFWUjRBZTNQQXd4UVhSZ0EwUHZidG8xc1cyTkR0czB4MjdhdElkZVFyYWtwWThpMjNjbkdlNW5uOGVwRGVPMWgrVmdlVmRSVlJKTHdzQ1ExMDFuWDJhV0pkOE9EOGE3T3pya2RhNlVKOFhuUFVzQlp5NDNTMld6N3JzOFVEbkVaQ1pqbjUrdHpiNmpxQ0RndWNZaERha0FuYjRSYitNZG1NQ1BFWVNxWWZIMmNYZlByL3ltY0JhbERGRjg0aXpOK3VEN1RuSENkWHFCN2lDSS9XQnl1dXkxUWJyQWlSRkVMOUwzV2xPYm1jL2w3dVVIZmduMGhpdnFnNDdWYVhNZmx1US9BNlJCRmVURG1ucTM5RDdhRUtOS0JYZmNNVkJWTUN0RnNCMFh2RnNoYlZvQlNJWnFHWUw4L3doMTBCL3U4RjZMNTJFNndVN1p3RXgvb0M2Z1Y0cEhWT1hEZUlQbjk1V09aMWJZUnNEN0VKNzlEN200bm1PN2RFSStmVEhDN283cDZoK3VoNHBKSkIwdnNjTXdLUStYMTN1WFo2UkdoNHZLZWVROGM2bldvSmlGYWRDalJGVVh6bnRiZURjL0dheGNBb3RmN2NpY2ZsS2tBQUFBQVNVVk9SSzVDWUlJPSk7YmFja2dyb3VuZC1zaXplOjYwJTtiYWNrZ3JvdW5kLXJlcGVhdDpuby1yZXBlYXQ7YmFja2dyb3VuZC1wb3NpdGlvbjpjZW50ZXI7ei1pbmRleDotMTtib3JkZXI6MXB4IHNvbGlkICNmZmZ9Lnpvb20tY29udGFpbmVyIC5tYXJrcy13cmFwcGVyIC56b29tLWFyZWEtdGFnOmhvdmVye2JvcmRlci1jb2xvcjojZmYwYWRlfS56b29tLWNvbnRhaW5lciAubWFya3Mtd3JhcHBlciAuem9vbS1hcmVhLXRhZzpob3ZlcjpiZWZvcmV7Ym9yZGVyLWNvbG9yOiNmZjhmMDB9Lnpvb20tY29udGFpbmVyIC5tYXJrcy13cmFwcGVyIC5wb2ludC10YWd7cG9zaXRpb246YWJzb2x1dGU7Zm9udC1zaXplOjEycHg7d2lkdGg6MjRweDtoZWlnaHQ6MjRweDtiYWNrZ3JvdW5kLWNvbG9yOiNmZjBhZGU7Zm9udC13ZWlnaHQ6NTAwO3RleHQtYWxpZ246Y2VudGVyO2N1cnNvcjpwb2ludGVyO2xpbmUtaGVpZ2h0OjI0cHg7Y29sb3I6I2ZmZjtib3JkZXItcmFkaXVzOjEwMCU7Ym9yZGVyOjFweCBzb2xpZCAjZmZmO2JveC1zaXppbmc6Ym9yZGVyLWJveDt0ZXh0LXNoYWRvdzowIDAgMTBweCAjMDAwOy13ZWJraXQtdXNlci1zZWxlY3Q6bm9uZTstbW96LXVzZXItc2VsZWN0Om5vbmU7LW1zLXVzZXItc2VsZWN0Om5vbmU7dXNlci1zZWxlY3Q6bm9uZTt6LWluZGV4OjE7ZGlzcGxheTpmbGV4O2p1c3RpZnktY29udGVudDpjZW50ZXI7YWxpZ24taXRlbXM6Y2VudGVyO3BvaW50ZXItZXZlbnRzOmFsbH0uem9vbS1jb250YWluZXIgLm1hcmtzLXdyYXBwZXIgLnBvaW50LXRhZzpob3Zlcntib3JkZXItY29sb3I6I2ZmMGFkZX0uem9vbS1jb250YWluZXIgLm1hcmtzLXdyYXBwZXIgLnNxdWFyZS10YWd7cG9zaXRpb246YWJzb2x1dGU7LXdlYmtpdC11c2VyLXNlbGVjdDpub25lOy1tb3otdXNlci1zZWxlY3Q6bm9uZTstbXMtdXNlci1zZWxlY3Q6bm9uZTt1c2VyLXNlbGVjdDpub25lO3BvaW50ZXItZXZlbnRzOm5vbmU7Ym9yZGVyOjJweCBzb2xpZCAjZmYwYWRlfS56b29tLWNvbnRhaW5lciAuY29tbWVudC1ob3ZlcntiYWNrZ3JvdW5kLWNvbG9yOiNmZjBhZGU7Ym94LXNpemluZzpib3JkZXItYm94O3BhZGRpbmc6OHB4IDEycHg7Ym9yZGVyLXJhZGl1czo0cHg7cG9zaXRpb246YWJzb2x1dGU7Zm9udC1zaXplOjEycHg7bGluZS1oZWlnaHQ6MThweDt0ZXh0LXNoYWRvdzpub25lO3RleHQtYWxpZ246bGVmdDtjb2xvcjojZmZmO2xlZnQ6MTBweDt0b3A6MTBweDt6LWluZGV4OjF9QC13ZWJraXQta2V5ZnJhbWVzIHNwaW57MCV7LXdlYmtpdC10cmFuc2Zvcm06cm90YXRlKDApO3RyYW5zZm9ybTpyb3RhdGUoMCl9MTAwJXstd2Via2l0LXRyYW5zZm9ybTpyb3RhdGUoMzYwZGVnKTt0cmFuc2Zvcm06cm90YXRlKDM2MGRlZyl9fUBrZXlmcmFtZXMgc3BpbnswJXstd2Via2l0LXRyYW5zZm9ybTpyb3RhdGUoMCk7dHJhbnNmb3JtOnJvdGF0ZSgwKX0xMDAley13ZWJraXQtdHJhbnNmb3JtOnJvdGF0ZSgzNjBkZWcpO3RyYW5zZm9ybTpyb3RhdGUoMzYwZGVnKX19YF1cbn0pXG5leHBvcnQgY2xhc3MgRGVjWm9vbU1hcmtzQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3Q2hlY2tlZCB7XG5cbiAgQElucHV0KCkgbWluWm9vbUxldmVsOiBhbnk7XG4gIEBJbnB1dCgpIG1heFpvb21MZXZlbDogYW55O1xuICBASW5wdXQoKSBzdGVwWm9vbUxldmVsOiBhbnk7XG5cbiAgQElucHV0KClcbiAgc2V0IG1hcmtlcih2YWx1ZTogTWFya2VyKSB7XG4gICAgaWYgKHZhbHVlICE9PSB0aGlzLl9tYXJrZXIpIHtcbiAgICAgIHRoaXMuX21hcmtlciA9IHZhbHVlO1xuICAgICAgaWYgKHRoaXMuY29udGVudERvbmUpIHtcbiAgICAgICAgdGhpcy5zZXR1cENhbnZhcygpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBnZXQgbWFya2VyKCkge1xuICAgIHJldHVybiB0aGlzLl9tYXJrZXI7XG4gIH1cbiAgcHJpdmF0ZSBfbWFya2VyOiBNYXJrZXI7XG5cbiAgQElucHV0KClcbiAgc2V0IHFhTW9kZSh2YWx1ZTogYm9vbGVhbikge1xuICAgIGlmICh2YWx1ZSAhPT0gdGhpcy5fcWFNb2RlKSB7XG4gICAgICB0aGlzLl9xYU1vZGUgPSB2YWx1ZTtcbiAgICAgIHRoaXMuc2V0V3JhcHBlckN1cnNvcigpO1xuICAgIH1cbiAgfVxuICBnZXQgcWFNb2RlKCkge1xuICAgIHJldHVybiB0aGlzLl9xYU1vZGU7XG4gIH1cblxuICBAT3V0cHV0KCkgb3Blblpvb21BcmVhID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIHByaXZhdGUgX3FhTW9kZTogYm9vbGVhbjtcblxuICBwcml2YXRlIGltYWdlRWxlbWVudDogSFRNTEltYWdlRWxlbWVudCA9IG5ldyBJbWFnZSgpO1xuXG4gIHByaXZhdGUgY29tbWVudHNBcnJheVNpemU6IG51bWJlcjtcblxuICBwcml2YXRlIGNvbnRlbnREb25lOiBib29sZWFuO1xuXG4gIHByaXZhdGUgem9vbVBvc2l0aW9uOiBab29tUG9zaXRpb247XG4gIHByaXZhdGUgc3RhcnRYOiBudW1iZXI7XG4gIHByaXZhdGUgc3RhcnRZOiBudW1iZXI7XG4gIHByaXZhdGUgbW91c2VNb3ZlZDogYm9vbGVhbjtcblxuICBwdWJsaWMgem9vbVNjYWxlOiBudW1iZXI7XG5cbiAgQFZpZXdDaGlsZCgnY2FudmFzJykgY2FudmFzOiBFbGVtZW50UmVmO1xuICBwdWJsaWMgY2FudmFzRWw6IEhUTUxDYW52YXNFbGVtZW50O1xuICBwcml2YXRlIGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xuXG4gIEBWaWV3Q2hpbGQoJ21hcmtzV3JhcHBlcicpIG1hcmtzV3JhcHBlcjogRWxlbWVudFJlZjtcbiAgcHVibGljIG1hcmtzV3JhcHBlckVsOiBIVE1MRGl2RWxlbWVudDtcblxuICBAVmlld0NoaWxkKCdsb2FkaW5nQ29udGFpbmVyJykgbG9hZGluZ0NvbnRhaW5lcjogRWxlbWVudFJlZjtcbiAgcHVibGljIGxvYWRpbmdDb250YWluZXJFbDogSFRNTERpdkVsZW1lbnQ7XG5cbiAgQEhvc3RMaXN0ZW5lcignd2luZG93OnJlc2l6ZScpXG4gIG9uUmVzaXplKCkge1xuICAgIHRoaXMuc2V0Q2FudmFzU2l6ZSh0aGlzLmNhbnZhc0VsLm9mZnNldFdpZHRoKTtcbiAgICB0aGlzLnNldFdyYXBwZXJTaXplKHRoaXMuY2FudmFzRWwud2lkdGgpO1xuICAgIHRoaXMuem9vbSh0aGlzLnpvb21TY2FsZSk7XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsIHByaXZhdGUgZGlhbG9nOiBNYXREaWFsb2csIHByaXZhdGUgZGVjUmVuZGVyQ29tbWVudFNlcnZpY2U6IERlY1JlbmRlckNvbW1lbnRTZXJ2aWNlKSB7XG4gICAgdGhpcy56b29tUG9zaXRpb24gPSB7IHg6IDAsIHk6IDAgfTtcbiAgICB0aGlzLnpvb21TY2FsZSA9IDE7XG4gIH1cblxuICBuZ0FmdGVyVmlld0NoZWNrZWQoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmNvbnRlbnREb25lICYmIHRoaXMuY2FudmFzLm5hdGl2ZUVsZW1lbnQucGFyZW50RWxlbWVudC5vZmZzZXRXaWR0aCAhPT0gMCkge1xuICAgICAgdGhpcy5zZXR1cENhbnZhcygpO1xuICAgICAgdGhpcy5zZXR1cE1hcmtzV3JhcHBlcigpO1xuICAgICAgdGhpcy5zZXR1cE1vdXNlRXZlbnRzKCk7XG4gICAgICB0aGlzLmNvbnRlbnREb25lID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNldHVwQ2FudmFzKCk6IHZvaWQge1xuICAgIHRoaXMuY2FudmFzRWwgPSB0aGlzLmNhbnZhcy5uYXRpdmVFbGVtZW50O1xuICAgIHRoaXMuc2V0Q2FudmFzU2l6ZSh0aGlzLmNhbnZhc0VsLm9mZnNldFdpZHRoKTtcbiAgICB0aGlzLmNsZWFuTWFya3MoKTtcbiAgICB0aGlzLnNldHVwTG9hZGluZ0NvbnRhaW5lcigpO1xuICAgIHRoaXMuY3R4ID0gdGhpcy5jYW52YXNFbC5nZXRDb250ZXh0KCcyZCcpO1xuICAgIHRoaXMuaW1hZ2VFbGVtZW50Lm9ubG9hZCA9ICgpID0+IHtcbiAgICAgIHRoaXMubG9hZGluZ0NvbnRhaW5lckVsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICB0aGlzLmN0eC5kcmF3SW1hZ2UodGhpcy5pbWFnZUVsZW1lbnQsIDAsIDAsIHRoaXMuY2FudmFzRWwud2lkdGgsIHRoaXMuY2FudmFzRWwud2lkdGgpO1xuICAgICAgdGhpcy5kcmF3TWFya3MoKTtcbiAgICAgIHRoaXMuc2V0Wm9vbVBvc2l0aW9uKHRoaXMuY2FudmFzRWwud2lkdGggKiAwLjUsIHRoaXMuY2FudmFzRWwud2lkdGggKiAwLjUpO1xuICAgIH07XG4gICAgdGhpcy5pbWFnZUVsZW1lbnQuc3JjID0gdGhpcy5tYXJrZXIuZmlsZS5maWxlVXJsO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXR1cExvYWRpbmdDb250YWluZXIoKTogdm9pZCB7XG4gICAgdGhpcy5sb2FkaW5nQ29udGFpbmVyRWwgPSB0aGlzLmxvYWRpbmdDb250YWluZXIubmF0aXZlRWxlbWVudDtcbiAgICB0aGlzLmxvYWRpbmdDb250YWluZXJFbC5zdHlsZS53aWR0aCA9IGAke3RoaXMuY2FudmFzRWwub2Zmc2V0V2lkdGh9cHhgO1xuICAgIHRoaXMubG9hZGluZ0NvbnRhaW5lckVsLnN0eWxlLmhlaWdodCA9IGAke3RoaXMuY2FudmFzRWwub2Zmc2V0V2lkdGh9cHhgO1xuICAgIHRoaXMubG9hZGluZ0NvbnRhaW5lckVsLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XG4gIH1cblxuICBwcml2YXRlIHNldHVwTWFya3NXcmFwcGVyKCk6IHZvaWQge1xuICAgIHRoaXMubWFya3NXcmFwcGVyRWwgPSB0aGlzLm1hcmtzV3JhcHBlci5uYXRpdmVFbGVtZW50O1xuICAgIHRoaXMuc2V0V3JhcHBlclNpemUodGhpcy5jYW52YXNFbC53aWR0aCk7XG4gICAgdGhpcy5zZXRXcmFwcGVyQ3Vyc29yKCk7XG4gIH1cblxuICBwcml2YXRlIHNldHVwTW91c2VFdmVudHMoKTogdm9pZCB7XG4gICAgdGhpcy53aGVlbEV2ZW50KCk7XG4gICAgdGhpcy5tb3VzZWRvd25FdmVudCgpO1xuICB9XG5cbiAgcHJpdmF0ZSB3aGVlbEV2ZW50KCk6IHZvaWQge1xuICAgIGZyb21FdmVudCh0aGlzLm1hcmtzV3JhcHBlckVsLCAnd2hlZWwnKS5zdWJzY3JpYmUoKGV2ZW50OiBXaGVlbEV2ZW50KSA9PiB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0IGFzIEhUTUxEaXZFbGVtZW50O1xuICAgICAgaWYgKCF0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdwb2ludC10YWcnKSAmJiAhdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnem9vbS1hcmVhLXRhZycpKSB7XG4gICAgICAgIHRoaXMuc2V0Wm9vbVBvc2l0aW9uKFxuICAgICAgICAgICgoMTAwICogZXZlbnQub2Zmc2V0WCkgLyB0aGlzLm1hcmtzV3JhcHBlckVsLm9mZnNldFdpZHRoICogdGhpcy5jYW52YXNFbC5vZmZzZXRXaWR0aCkgLyAxMDAsXG4gICAgICAgICAgKCgxMDAgKiBldmVudC5vZmZzZXRZKSAvIHRoaXMubWFya3NXcmFwcGVyRWwub2Zmc2V0SGVpZ2h0ICogdGhpcy5jYW52YXNFbC5vZmZzZXRIZWlnaHQpIC8gMTAwKTtcbiAgICAgICAgaWYgKGV2ZW50LmRlbHRhWSA8IDApIHtcbiAgICAgICAgICB0aGlzLnpvb21JbigwLjUpO1xuICAgICAgICB9XG4gICAgICAgIGV2ZW50LmRlbHRhWSA8IDAgPyB0aGlzLnpvb21JbigwLjUpIDogdGhpcy56b29tT3V0KDAuNSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIG1vdXNlbGVhdmVFdmVudCgpOiBPYnNlcnZhYmxlPEV2ZW50PiB7XG4gICAgcmV0dXJuIGZyb21FdmVudCh0aGlzLm1hcmtzV3JhcHBlckVsLCAnbW91c2VsZWF2ZScpO1xuICB9XG5cbiAgcHJpdmF0ZSBtb3VzZXVwRXZlbnQoKTogT2JzZXJ2YWJsZTxFdmVudD4ge1xuICAgIHJldHVybiBmcm9tRXZlbnQodGhpcy5tYXJrc1dyYXBwZXJFbCwgJ21vdXNldXAnKTtcbiAgfVxuXG4gIHByaXZhdGUgYWRkSW5Db21tZW50c0FycmF5KGNvbW1lbnQ6IENvbW1lbnQpOiB2b2lkIHtcbiAgICB0aGlzLm1hcmtlci5jb21tZW50cy5wdXNoKGNvbW1lbnQpO1xuICAgIHRoaXMuY29tbWVudHNBcnJheVNpemUrKztcbiAgfVxuXG4gIHByaXZhdGUgbW91c2Vkb3duRXZlbnQoKTogdm9pZCB7XG4gICAgY29uc3QgbW91c2V1cCA9IHRoaXMubW91c2V1cEV2ZW50KCk7XG4gICAgbW91c2V1cC5zdWJzY3JpYmUoKGV2ZW50OiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICB0aGlzLnNldFdyYXBwZXJDdXJzb3IoKTtcbiAgICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldCBhcyBIVE1MRGl2RWxlbWVudDtcbiAgICAgIHRoaXMuZW5hYmxlUG9pbnRFdmVudHModGhpcy5tYXJrc1dyYXBwZXJFbC5xdWVyeVNlbGVjdG9yQWxsKCcucG9pbnQtdGFnJykpO1xuICAgICAgaWYgKHRoaXMucWFNb2RlICYmIHRoaXMuem9vbVNjYWxlID09PSAxKSB7XG4gICAgICAgIGNvbnN0IHggPSBNYXRoLnJvdW5kKCgodGhpcy5zdGFydFggLyB0aGlzLm1hcmtzV3JhcHBlckVsLm9mZnNldEhlaWdodCkgKiAxMDApICogMTAwKSAvIDEwMDtcbiAgICAgICAgY29uc3QgeSA9IE1hdGgucm91bmQoKCh0aGlzLnN0YXJ0WSAvIHRoaXMubWFya3NXcmFwcGVyRWwub2Zmc2V0V2lkdGgpICogMTAwKSAqIDEwMCkgLyAxMDA7XG4gICAgICAgIGNvbnN0IHgyID0gTWF0aC5yb3VuZCgoKGV2ZW50Lm9mZnNldFggLyB0aGlzLm1hcmtzV3JhcHBlckVsLm9mZnNldEhlaWdodCkgKiAxMDApICogMTAwKSAvIDEwMDtcbiAgICAgICAgY29uc3QgeTIgPSBNYXRoLnJvdW5kKCgoZXZlbnQub2Zmc2V0WSAvIHRoaXMubWFya3NXcmFwcGVyRWwub2Zmc2V0V2lkdGgpICogMTAwKSAqIDEwMCkgLyAxMDA7XG4gICAgICAgIGlmICh0aGlzLm1vdXNlTW92ZWQpIHtcbiAgICAgICAgICB0aGlzLnNldE1vdXNlTW92ZWQoZmFsc2UpO1xuICAgICAgICAgIGNvbnN0IGRpYWxvZ1JlZiA9IHRoaXMuZGlhbG9nLm9wZW4oRGVjUmVuZGVyQ29tbWVudENvbXBvbmVudCk7XG4gICAgICAgICAgZGlhbG9nUmVmLmFmdGVyQ2xvc2VkKCkuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgIGNvbnN0IGNvbW1lbnQgPSBuZXcgQ29tbWVudCh7XG4gICAgICAgICAgICAgICAgY29vcmRpbmF0ZXM6IFt4LCB5LCB4MiwgeTJdLFxuICAgICAgICAgICAgICAgIGNvbW1lbnQ6IHJlc3VsdC5jb21tZW50LFxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiByZXN1bHQuZGVzY3JpcHRpb24sXG4gICAgICAgICAgICAgICAgaWQ6IHRoaXMuY29tbWVudHNBcnJheVNpemUgKyAxXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB0aGlzLmFkZEluQ29tbWVudHNBcnJheShjb21tZW50KTtcbiAgICAgICAgICAgICAgdGhpcy5jcmVhdGVTcXVhcmVUYWcoW3gsIHksIHgyLCB5Ml0sIGNvbW1lbnQuaWQpO1xuICAgICAgICAgICAgICB0aGlzLmNsZWFyU3F1YXJlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKCF0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdwb2ludC10YWcnKSAmJiAhdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnem9vbS1hcmVhLXRhZycpKSB7XG4gICAgICAgICAgICBjb25zdCBkaWFsb2dSZWYgPSB0aGlzLmRpYWxvZy5vcGVuKERlY1JlbmRlckNvbW1lbnRDb21wb25lbnQpO1xuICAgICAgICAgICAgZGlhbG9nUmVmLmFmdGVyQ2xvc2VkKCkuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjb21tZW50ID0gbmV3IENvbW1lbnQoe1xuICAgICAgICAgICAgICAgICAgY29vcmRpbmF0ZXM6IFt4LCB5XSxcbiAgICAgICAgICAgICAgICAgIGNvbW1lbnQ6IHJlc3VsdC5jb21tZW50LFxuICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IHJlc3VsdC5kZXNjcmlwdGlvbixcbiAgICAgICAgICAgICAgICAgIGlkOiB0aGlzLmNvbW1lbnRzQXJyYXlTaXplICsgMVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkSW5Db21tZW50c0FycmF5KGNvbW1lbnQpO1xuICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlUG9pbnRUYWcoW3gsIHldLCBjb21tZW50LmlkKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBtb3VzZWxlYXZlID0gdGhpcy5tb3VzZWxlYXZlRXZlbnQoKTtcbiAgICBtb3VzZWxlYXZlLnN1YnNjcmliZSgoZXZlbnQ6IE1vdXNlRXZlbnQpID0+IHtcbiAgICAgIHRoaXMuc2V0V3JhcHBlckN1cnNvcigpO1xuICAgICAgdGhpcy5lbmFibGVQb2ludEV2ZW50cyh0aGlzLm1hcmtzV3JhcHBlckVsLnF1ZXJ5U2VsZWN0b3JBbGwoJy5wb2ludC10YWcnKSk7XG4gICAgICBpZiAodGhpcy5xYU1vZGUpIHtcbiAgICAgICAgdGhpcy5zZXRNb3VzZU1vdmVkKGZhbHNlKTtcbiAgICAgICAgdGhpcy5jbGVhclNxdWFyZSgpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgZnJvbUV2ZW50KHRoaXMubWFya3NXcmFwcGVyRWwsICdtb3VzZWRvd24nKS5waXBlKFxuICAgICAgc3dpdGNoTWFwKChldmVudDogTW91c2VFdmVudCkgPT4ge1xuICAgICAgICB0aGlzLnN0YXJ0WCA9IGV2ZW50Lm9mZnNldFg7XG4gICAgICAgIHRoaXMuc3RhcnRZID0gZXZlbnQub2Zmc2V0WTtcbiAgICAgICAgdGhpcy5zZXRXcmFwcGVyQ3Vyc29yKHRydWUpO1xuICAgICAgICByZXR1cm4gZnJvbUV2ZW50KHRoaXMubWFya3NXcmFwcGVyRWwsICdtb3VzZW1vdmUnKS5waXBlKFxuICAgICAgICAgIHRha2VVbnRpbChtb3VzZXVwKSxcbiAgICAgICAgICB0YWtlVW50aWwobW91c2VsZWF2ZSlcbiAgICAgICAgKTtcbiAgICAgIH0pXG4gICAgKS5zdWJzY3JpYmUoKGV2ZW50OiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICBpZiAodGhpcy5xYU1vZGUgJiYgdGhpcy56b29tU2NhbGUgPT09IDEpIHtcbiAgICAgICAgdGhpcy5zZXRNb3VzZU1vdmVkKHRydWUpO1xuICAgICAgICB0aGlzLmRpc2FibGVQb2ludEV2ZW50cyh0aGlzLm1hcmtzV3JhcHBlckVsLnF1ZXJ5U2VsZWN0b3JBbGwoJy5wb2ludC10YWcnKSk7XG4gICAgICAgIHRoaXMuY2xlYXJTcXVhcmUoKTtcbiAgICAgICAgY29uc3Qgc3F1YXJlID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgc3F1YXJlLmlkID0gJ3NxdWFyZU1hcmsnO1xuICAgICAgICBzcXVhcmUuc3R5bGUudG9wID0gdGhpcy5zdGFydFkgPiBldmVudC5vZmZzZXRZID8gYCR7ZXZlbnQub2Zmc2V0WX1weGAgOiBgJHt0aGlzLnN0YXJ0WX1weGA7XG4gICAgICAgIHNxdWFyZS5zdHlsZS5sZWZ0ID0gdGhpcy5zdGFydFggPiBldmVudC5vZmZzZXRYID8gYCR7ZXZlbnQub2Zmc2V0WH1weGAgOiBgJHt0aGlzLnN0YXJ0WH1weGA7XG4gICAgICAgIHNxdWFyZS5zdHlsZS53aWR0aCA9IGAke01hdGguYWJzKHRoaXMuc3RhcnRYIC0gZXZlbnQub2Zmc2V0WCl9cHhgO1xuICAgICAgICBzcXVhcmUuc3R5bGUuaGVpZ2h0ID0gYCR7TWF0aC5hYnModGhpcy5zdGFydFkgLSBldmVudC5vZmZzZXRZKX1weGA7XG4gICAgICAgIHRoaXMubWFya3NXcmFwcGVyRWwuYXBwZW5kQ2hpbGQoc3F1YXJlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuem9vbVBvc2l0aW9uLnggLT0gZXZlbnQubW92ZW1lbnRYO1xuICAgICAgICB0aGlzLnpvb21Qb3NpdGlvbi55IC09IGV2ZW50Lm1vdmVtZW50WTtcbiAgICAgICAgaWYgKHRoaXMuem9vbVBvc2l0aW9uLnggPCAwKSB7XG4gICAgICAgICAgdGhpcy56b29tUG9zaXRpb24ueCA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuem9vbVBvc2l0aW9uLnkgPCAwKSB7XG4gICAgICAgICAgdGhpcy56b29tUG9zaXRpb24ueSA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuem9vbVBvc2l0aW9uLnggPiB0aGlzLmNhbnZhc0VsLndpZHRoKSB7XG4gICAgICAgICAgdGhpcy56b29tUG9zaXRpb24ueCA9IHRoaXMuY2FudmFzRWwud2lkdGg7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuem9vbVBvc2l0aW9uLnkgPiB0aGlzLmNhbnZhc0VsLmhlaWdodCkge1xuICAgICAgICAgIHRoaXMuem9vbVBvc2l0aW9uLnkgPSB0aGlzLmNhbnZhc0VsLmhlaWdodDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlc2l6ZU1hcmtlcih0aGlzLnpvb21TY2FsZSk7XG4gICAgICAgIHRoaXMuY3R4LmNsZWFyUmVjdCgwLCAwLCB0aGlzLmNhbnZhc0VsLndpZHRoLCB0aGlzLmNhbnZhc0VsLmhlaWdodCk7XG4gICAgICAgIHRoaXMuY3R4LnNhdmUoKTtcbiAgICAgICAgdGhpcy5jdHgudHJhbnNsYXRlKHRoaXMuem9vbVBvc2l0aW9uLngsIHRoaXMuem9vbVBvc2l0aW9uLnkpO1xuICAgICAgICB0aGlzLmN0eC5zY2FsZSh0aGlzLnpvb21TY2FsZSwgdGhpcy56b29tU2NhbGUpO1xuICAgICAgICB0aGlzLmN0eC50cmFuc2xhdGUoLXRoaXMuem9vbVBvc2l0aW9uLngsIC10aGlzLnpvb21Qb3NpdGlvbi55KTtcbiAgICAgICAgdGhpcy5jdHguZHJhd0ltYWdlKHRoaXMuaW1hZ2VFbGVtZW50LCAwLCAwLCB0aGlzLmNhbnZhc0VsLndpZHRoLCB0aGlzLmNhbnZhc0VsLmhlaWdodCk7XG4gICAgICAgIHRoaXMuY3R4LnJlc3RvcmUoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgZHJhd01hcmtzKCkge1xuICAgIHRoaXMuY2xlYW5NYXJrcygpO1xuICAgIHRoaXMuY29tbWVudHNBcnJheVNpemUgPSAwO1xuICAgIHRoaXMuZGVjUmVuZGVyQ29tbWVudFNlcnZpY2UuZ2V0UmVuZGVyRGVzY3JpcHRpb25zQnlDb2RlKHRoaXMubWFya2VyLmNvbW1lbnRzKTtcbiAgICBpZiAodGhpcy5tYXJrZXIuY29tbWVudHMgJiYgdGhpcy5tYXJrZXIuY29tbWVudHMubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5tYXJrZXIuY29tbWVudHMuZm9yRWFjaCgoY29tbWVudDogQ29tbWVudCkgPT4ge1xuICAgICAgICBpZiAoY29tbWVudC5jb29yZGluYXRlcy5sZW5ndGggPiAyKSB7XG4gICAgICAgICAgdGhpcy5jcmVhdGVTcXVhcmVUYWcoY29tbWVudC5jb29yZGluYXRlcywgY29tbWVudC5pZCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5jcmVhdGVQb2ludFRhZyhjb21tZW50LmNvb3JkaW5hdGVzLCBjb21tZW50LmlkKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICB0aGlzLmNvbW1lbnRzQXJyYXlTaXplICs9IHRoaXMubWFya2VyLmNvbW1lbnRzLmxlbmd0aDtcbiAgICB9XG4gICAgaWYgKHRoaXMubWFya2VyLnpvb21BcmVhcyAmJiB0aGlzLm1hcmtlci56b29tQXJlYXMubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5tYXJrZXIuem9vbUFyZWFzLmZvckVhY2goKHpvb21BcmVhOiBab29tQXJlYSkgPT4ge1xuICAgICAgICB0aGlzLmNyZWF0ZVpvb21BcmVhVGFnKHpvb21BcmVhLmNvb3JkaW5hdGVzLCB6b29tQXJlYS5pZCk7XG4gICAgICB9KTtcbiAgICAgIHRoaXMuY29tbWVudHNBcnJheVNpemUgKz0gdGhpcy5tYXJrZXIuem9vbUFyZWFzLmxlbmd0aDtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHJlc2l6ZU1hcmtlcih6b29tU2NhbGUpIHtcbiAgICBjb25zdCBkaWZmWCA9IHRoaXMuY2FudmFzRWwud2lkdGggKiB6b29tU2NhbGUgLSB0aGlzLmNhbnZhc0VsLndpZHRoO1xuICAgIGNvbnN0IGRpZmZZID0gdGhpcy5jYW52YXNFbC5oZWlnaHQgKiB6b29tU2NhbGUgLSB0aGlzLmNhbnZhc0VsLmhlaWdodDtcbiAgICB0aGlzLm1hcmtzV3JhcHBlckVsLnN0eWxlLndpZHRoID0gYCR7dGhpcy5jYW52YXNFbC53aWR0aCAqIHpvb21TY2FsZX1weGA7XG4gICAgdGhpcy5tYXJrc1dyYXBwZXJFbC5zdHlsZS5oZWlnaHQgPSBgJHt0aGlzLmNhbnZhc0VsLmhlaWdodCAqIHpvb21TY2FsZX1weGA7XG4gICAgdGhpcy5tYXJrc1dyYXBwZXJFbC5zdHlsZS5sZWZ0ID0gdGhpcy56b29tWFBvc2l0aW9uKGRpZmZYLCB6b29tU2NhbGUpO1xuICAgIHRoaXMubWFya3NXcmFwcGVyRWwuc3R5bGUudG9wID0gdGhpcy56b29tWVBvc2l0aW9uKGRpZmZZLCB6b29tU2NhbGUpO1xuICB9XG5cbiAgcHJpdmF0ZSB6b29tWVBvc2l0aW9uKGRpZmZZLCB6b29tU2NhbGUpIHtcbiAgICBpZiAodGhpcy56b29tUG9zaXRpb24ueSAhPT0gKHRoaXMuY2FudmFzRWwuaGVpZ2h0IC8gMikpIHtcbiAgICAgIGlmICh6b29tU2NhbGUgPiAxKSB7XG4gICAgICAgIGNvbnN0IGF1eCA9IHpvb21TY2FsZS50b1N0cmluZygpLnNwbGl0KCcuJylbMF0gPiAxID8gKHpvb21TY2FsZSAtIDEpIDogKHpvb21TY2FsZSAlIDEpO1xuICAgICAgICByZXR1cm4gLSh0aGlzLnpvb21Qb3NpdGlvbi55ICogYXV4KSArICdweCc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIChkaWZmWSAvIDIpICogLTEgKyAncHgnO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgem9vbVhQb3NpdGlvbihkaWZmWCwgem9vbVNjYWxlKSB7XG4gICAgaWYgKHRoaXMuem9vbVBvc2l0aW9uLnggIT09ICh0aGlzLmNhbnZhc0VsLndpZHRoIC8gMikpIHtcbiAgICAgIGlmICh6b29tU2NhbGUgPiAxKSB7XG4gICAgICAgIGNvbnN0IGF1eCA9IHpvb21TY2FsZS50b1N0cmluZygpLnNwbGl0KCcuJylbMF0gPiAxID8gKHpvb21TY2FsZSAtIDEpIDogKHpvb21TY2FsZSAlIDEpO1xuICAgICAgICByZXR1cm4gLSh0aGlzLnpvb21Qb3NpdGlvbi54ICogYXV4KSArICdweCc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIChkaWZmWCAvIDIpICogLTEgKyAncHgnO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZW5hYmxlUG9pbnRFdmVudHMoZWxlbWVudHM6IE5vZGVMaXN0T2Y8SFRNTERpdkVsZW1lbnQ+KSB7XG4gICAgQXJyYXkuZnJvbShlbGVtZW50cykuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgICAgZWxlbWVudC5zdHlsZS5wb2ludGVyRXZlbnRzID0gJ2FsbCc7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGRpc2FibGVQb2ludEV2ZW50cyhlbGVtZW50czogTm9kZUxpc3RPZjxIVE1MRGl2RWxlbWVudD4pIHtcbiAgICBBcnJheS5mcm9tKGVsZW1lbnRzKS5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgICBlbGVtZW50LnN0eWxlLnBvaW50ZXJFdmVudHMgPSAnbm9uZSc7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGNsZWFuTWFya3MoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMubWFya3NXcmFwcGVyRWwpIHtcbiAgICAgIGNvbnN0IHBvaW50RWxlbWVudHMgPSB0aGlzLm1hcmtzV3JhcHBlckVsLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3BvaW50LXRhZycpO1xuICAgICAgY29uc3Qgc3F1YXJlRWxlbWVudHMgPSB0aGlzLm1hcmtzV3JhcHBlckVsLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3NxdWFyZS10YWcnKTtcbiAgICAgIGNvbnN0IHpvb21BcmVhRWxlbWVudHMgPSB0aGlzLm1hcmtzV3JhcHBlckVsLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3pvb20tYXJlYS10YWcnKTtcbiAgICAgIHdoaWxlIChwb2ludEVsZW1lbnRzWzBdKSB7XG4gICAgICAgIHBvaW50RWxlbWVudHNbMF0ucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChwb2ludEVsZW1lbnRzWzBdKTtcbiAgICAgIH1cbiAgICAgIHdoaWxlIChzcXVhcmVFbGVtZW50c1swXSkge1xuICAgICAgICBzcXVhcmVFbGVtZW50c1swXS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHNxdWFyZUVsZW1lbnRzWzBdKTtcbiAgICAgIH1cbiAgICAgIHdoaWxlICh6b29tQXJlYUVsZW1lbnRzWzBdKSB7XG4gICAgICAgIHpvb21BcmVhRWxlbWVudHNbMF0ucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh6b29tQXJlYUVsZW1lbnRzWzBdKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZVBvaW50VGFnKGNvb3JkaW5hdGVzOiBudW1iZXJbXSwgaW5kZXg6IG51bWJlcik6IEhUTUxEaXZFbGVtZW50IHtcbiAgICBjb25zdCBbeCwgeV0gPSBjb29yZGluYXRlcztcbiAgICBjb25zdCB0YWcgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRhZy5pbm5lckhUTUwgPSBgJHtpbmRleH1gO1xuICAgIHRhZy5jbGFzc05hbWUgPSAncG9pbnQtdGFnJztcbiAgICB0YWcuc3R5bGUudG9wID0gYGNhbGMoJHt5fSUgLSAxMnB4KWA7XG4gICAgdGFnLnN0eWxlLmxlZnQgPSBgY2FsYygke3h9JSAtIDEycHgpYDtcbiAgICB0aGlzLm1hcmtzV3JhcHBlckVsLmFwcGVuZENoaWxkKHRhZyk7XG4gICAgY29uc3QgY29tbWVudCA9IHRoaXMubWFya2VyLmNvbW1lbnRzLmZpbmQoYyA9PiBjLmlkID09PSBpbmRleCk7XG4gICAgdGFnLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdGhpcy5jbGlja0V2ZW50UG9pbnRUYWcoY29tbWVudCkpO1xuICAgIHRhZy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCAoKSA9PiB0aGlzLmFkZENvbW1lbnROb2RlKGNvbW1lbnQpKTtcbiAgICB0YWcuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdXQnLCB0aGlzLnJlbW92ZUNvbW1lbnROb2RlKTtcbiAgICByZXR1cm4gdGFnO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVab29tQXJlYVRhZyhjb29yZGluYXRlczogbnVtYmVyW10sIGluZGV4OiBudW1iZXIpOiBIVE1MRGl2RWxlbWVudCB7XG4gICAgY29uc3QgW3gsIHldID0gY29vcmRpbmF0ZXM7XG4gICAgY29uc3QgdGFnID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0YWcuaW5uZXJIVE1MID0gYCR7aW5kZXh9YDtcbiAgICB0YWcuY2xhc3NOYW1lID0gJ3pvb20tYXJlYS10YWcnO1xuICAgIHRhZy5zdHlsZS50b3AgPSBgY2FsYygke3l9JSAtIDEycHgpYDtcbiAgICB0YWcuc3R5bGUubGVmdCA9IGBjYWxjKCR7eH0lIC0gMTJweClgO1xuICAgIHRoaXMubWFya3NXcmFwcGVyRWwuYXBwZW5kQ2hpbGQodGFnKTtcbiAgICBjb25zdCB6b29tQXJlYSA9IHRoaXMubWFya2VyLnpvb21BcmVhcy5maW5kKHogPT4gei5pZCA9PT0gaW5kZXgpO1xuICAgIHRhZy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHRoaXMuY2xpY2tFdmVudFpvb21UYWcoem9vbUFyZWEpKTtcbiAgICByZXR1cm4gdGFnO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVTcXVhcmVUYWcoY29vcmRpbmF0ZXM6IG51bWJlcltdLCBpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgY29uc3QgW3gsIHksIHgyLCB5Ml0gPSBjb29yZGluYXRlcztcbiAgICBjb25zdCBzcXVhcmUgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHNxdWFyZS5jbGFzc05hbWUgPSAnc3F1YXJlLXRhZyc7XG4gICAgc3F1YXJlLnN0eWxlLndpZHRoID0gYCR7TWF0aC5hYnMoeCAtIHgyKX0lYDtcbiAgICBzcXVhcmUuc3R5bGUuaGVpZ2h0ID0gYCR7TWF0aC5hYnMoeSAtIHkyKX0lYDtcbiAgICBzcXVhcmUuc3R5bGUudG9wID0gYCR7eTIgPiB5ID8geSA6IHkyfSVgO1xuICAgIHNxdWFyZS5zdHlsZS5sZWZ0ID0gYCR7eDIgPiB4ID8geCA6IHgyfSVgO1xuICAgIGNvbnN0IHBvaW50ID0gdGhpcy5jcmVhdGVQb2ludFRhZyhbMCwgMF0sIGluZGV4KTtcbiAgICBzcXVhcmUuYXBwZW5kQ2hpbGQocG9pbnQpO1xuICAgIHRoaXMubWFya3NXcmFwcGVyRWwuYXBwZW5kQ2hpbGQoc3F1YXJlKTtcbiAgfVxuXG4gIHByaXZhdGUgY2xpY2tFdmVudFBvaW50VGFnKGNvbW1lbnQ6IENvbW1lbnQpIHtcbiAgICBjb25zdCBkaWFsb2dSZWYgPSB0aGlzLmRpYWxvZy5vcGVuKERlY1JlbmRlckNvbW1lbnRDb21wb25lbnQsIHsgZGF0YTogeyBjb21tZW50OiBjb21tZW50LmNvbW1lbnQsIHZlcnNpb246IGNvbW1lbnQudmVyc2lvbiB9IH0pO1xuICAgIGRpYWxvZ1JlZi5hZnRlckNsb3NlZCgpLnN1YnNjcmliZShyZXN1bHQgPT4ge1xuICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICBjb21tZW50LmNvbW1lbnQgPSByZXN1bHQuY29tbWVudDtcbiAgICAgICAgY29tbWVudC5kZXNjcmlwdGlvbiA9IHJlc3VsdC5kZXNjcmlwdGlvbjtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgY2xpY2tFdmVudFpvb21UYWcoem9vbUFyZWE6IFpvb21BcmVhKSB7XG4gICAgdGhpcy5vcGVuWm9vbUFyZWEuZW1pdCh6b29tQXJlYSk7XG4gIH1cblxuICBwcml2YXRlIGNsZWFyU3F1YXJlKCk6IHZvaWQge1xuICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3F1YXJlTWFyaycpKSB7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3F1YXJlTWFyaycpLnJlbW92ZSgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYWRkQ29tbWVudE5vZGUgPSAoY29tbWVudDogQ29tbWVudCk6IHZvaWQgPT4ge1xuICAgIGNvbnN0IHNwYW4gPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcblxuICAgIHNwYW4uaW5uZXJIVE1MID0gYCR7Y29tbWVudC5jb21tZW50fSAtICR7Y29tbWVudC5kZXNjcmlwdGlvbn1gO1xuXG4gICAgY29uc3QgY29tbWVudERpdiA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY29tbWVudERpdi5jbGFzc05hbWUgPSAnY29tbWVudC1ob3Zlcic7XG4gICAgY29tbWVudERpdi5zdHlsZS5tYXhXaWR0aCA9IHRoaXMuY2FudmFzRWwud2lkdGggPiAzNDAgPyAnMzQwcHgnIDogJ2NhbGMoMTAwJSAtIDIwcHgpJztcbiAgICBjb21tZW50RGl2LmFwcGVuZENoaWxkKHNwYW4pO1xuICAgIHRoaXMubWFya3NXcmFwcGVyRWwucGFyZW50RWxlbWVudC5hcHBlbmRDaGlsZChjb21tZW50RGl2KTtcbiAgfVxuXG4gIHByaXZhdGUgcmVtb3ZlQ29tbWVudE5vZGUoKSB7XG4gICAgY29uc3QgY29tbWVudE5vZGUgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdjb21tZW50LWhvdmVyJylbMF07XG4gICAgaWYgKGNvbW1lbnROb2RlKSB7XG4gICAgICBjb21tZW50Tm9kZS5wYXJlbnRFbGVtZW50LnJlbW92ZUNoaWxkKGNvbW1lbnROb2RlKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNldENhbnZhc1NpemUoc2l6ZTogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5jYW52YXNFbC53aWR0aCA9IHNpemU7XG4gICAgdGhpcy5jYW52YXNFbC5oZWlnaHQgPSBzaXplO1xuICB9XG5cbiAgc2V0TW91c2VNb3ZlZChtb3ZlZDogYm9vbGVhbikge1xuICAgIHRoaXMubW91c2VNb3ZlZCA9IG1vdmVkO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRXcmFwcGVyU2l6ZShzaXplOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLm1hcmtzV3JhcHBlckVsLnN0eWxlLndpZHRoID0gYCR7c2l6ZX1weGA7XG4gICAgdGhpcy5tYXJrc1dyYXBwZXJFbC5zdHlsZS5oZWlnaHQgPSBgJHtzaXplfXB4YDtcbiAgfVxuXG4gIHByaXZhdGUgc2V0Wm9vbVBvc2l0aW9uKHg6IG51bWJlciwgeTogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy56b29tUG9zaXRpb24ueCA9IHg7XG4gICAgdGhpcy56b29tUG9zaXRpb24ueSA9IHk7XG4gIH1cblxuICBwcml2YXRlIHNldFdyYXBwZXJDdXJzb3IobW91c2Vkb3duPzogYm9vbGVhbik6IHZvaWQge1xuICAgIGlmICh0aGlzLm1hcmtzV3JhcHBlckVsKSB7XG4gICAgICBpZiAodGhpcy5xYU1vZGUgJiYgdGhpcy56b29tU2NhbGUgPT09IDEpIHtcbiAgICAgICAgdGhpcy5tYXJrc1dyYXBwZXJFbC5zdHlsZS5jdXJzb3IgPSAnY3Jvc3NoYWlyJztcbiAgICAgIH0gZWxzZSBpZiAobW91c2Vkb3duKSB7XG4gICAgICAgIHRoaXMubWFya3NXcmFwcGVyRWwuc3R5bGUuY3Vyc29yID0gJ21vdmUnO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5tYXJrc1dyYXBwZXJFbC5zdHlsZS5jdXJzb3IgPSAnZ3JhYic7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHpvb20oem9vbVNjYWxlOiBudW1iZXIgPSAxKSB7XG4gICAgdGhpcy56b29tU2NhbGUgPSB6b29tU2NhbGU7XG4gICAgdGhpcy5yZXNpemVNYXJrZXIoem9vbVNjYWxlKTtcbiAgICB0aGlzLnNldFdyYXBwZXJDdXJzb3IoKTtcbiAgICB0aGlzLmN0eC5jbGVhclJlY3QoMCwgMCwgdGhpcy5jYW52YXNFbC53aWR0aCwgdGhpcy5jYW52YXNFbC5oZWlnaHQpO1xuICAgIHRoaXMuY3R4LnNhdmUoKTtcbiAgICB0aGlzLmN0eC50cmFuc2xhdGUodGhpcy56b29tUG9zaXRpb24ueCwgdGhpcy56b29tUG9zaXRpb24ueSk7XG4gICAgdGhpcy5jdHguc2NhbGUoem9vbVNjYWxlLCB6b29tU2NhbGUpO1xuICAgIHRoaXMuY3R4LmRyYXdJbWFnZSh0aGlzLmltYWdlRWxlbWVudCwgLXRoaXMuem9vbVBvc2l0aW9uLngsIC10aGlzLnpvb21Qb3NpdGlvbi55LCB0aGlzLmNhbnZhc0VsLndpZHRoLCB0aGlzLmNhbnZhc0VsLmhlaWdodCk7XG4gICAgdGhpcy5jdHgucmVzdG9yZSgpO1xuICB9XG5cbiAgcHVibGljIHpvb21JbihhbW91bnQ6IG51bWJlciA9IDEpIHtcbiAgICBpZiAodGhpcy56b29tU2NhbGUgPCBwYXJzZUludCh0aGlzLm1heFpvb21MZXZlbCwgMTApKSB7XG4gICAgICAodGhpcy56b29tU2NhbGUgKyBhbW91bnQpIDwgdGhpcy5tYXhab29tTGV2ZWwgPyB0aGlzLnpvb21TY2FsZSArPSBhbW91bnQgOiB0aGlzLnpvb21TY2FsZSA9ICt0aGlzLm1heFpvb21MZXZlbDtcbiAgICAgIHRoaXMuem9vbSh0aGlzLnpvb21TY2FsZSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHpvb21PdXQoYW1vdW50OiBudW1iZXIgPSAxKSB7XG4gICAgaWYgKHRoaXMuem9vbVNjYWxlID4gcGFyc2VJbnQodGhpcy5taW5ab29tTGV2ZWwsIDEwKSkge1xuICAgICAgKHRoaXMuem9vbVNjYWxlIC0gYW1vdW50KSA+IHRoaXMubWluWm9vbUxldmVsID8gdGhpcy56b29tU2NhbGUgLT0gYW1vdW50IDogdGhpcy56b29tU2NhbGUgPSArdGhpcy5taW5ab29tTGV2ZWw7XG4gICAgICB0aGlzLnpvb20odGhpcy56b29tU2NhbGUpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBvblpvb21TbGlkZSh2YWx1ZTogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy56b29tKHZhbHVlKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRGb3JtYXRlZFBvc2l0aW9uQW5kU2NhbGUgPSAoKSA9PiB7XG4gICAgY29uc3QgZmlsZTogYW55ID0gdGhpcy5tYXJrZXIuZmlsZTtcblxuICAgIHJldHVybiB7XG4gICAgICBmaWxlOiBmaWxlLFxuICAgICAgcG9zaXRpb246IHtcbiAgICAgICAgeDogdGhpcy56b29tUG9zaXRpb24ueCxcbiAgICAgICAgeTogdGhpcy56b29tUG9zaXRpb24ueVxuICAgICAgfSxcbiAgICAgIHpvb21TY2FsZTogdGhpcy56b29tU2NhbGVcbiAgICB9O1xuICB9XG5cbiAgcHVibGljIGFkZE5ld1pvb21BcmVhID0gKG5ld1pvb21BcmVhKSA9PiB7XG4gICAgaWYgKG5ld1pvb21BcmVhLmNvb3JkaW5hdGVzLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMuZWRpdFpvb21BcmVhKG5ld1pvb21BcmVhKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBuZXdab29tQXJlYS5jb29yZGluYXRlcy5wdXNoKE1hdGgucm91bmQoTWF0aC5yb3VuZCgoKHRoaXMuc3RhcnRYIC8gdGhpcy5tYXJrc1dyYXBwZXJFbC5vZmZzZXRXaWR0aCkgKiAxMDApICogMTAwKSAvIDEwMCkpO1xuICAgIG5ld1pvb21BcmVhLmNvb3JkaW5hdGVzLnB1c2goTWF0aC5yb3VuZChNYXRoLnJvdW5kKCgodGhpcy5zdGFydFkgLyB0aGlzLm1hcmtzV3JhcHBlckVsLm9mZnNldEhlaWdodCkgKiAxMDApICogMTAwKSAvIDEwMCkpO1xuICAgIG5ld1pvb21BcmVhLmlkID0gdGhpcy5jb21tZW50c0FycmF5U2l6ZSArIDE7XG4gICAgdGhpcy5tYXJrZXIuem9vbUFyZWFzLnB1c2gobmV3Wm9vbUFyZWEpO1xuICAgIHRoaXMuY29tbWVudHNBcnJheVNpemUrKztcbiAgICB0aGlzLmRyYXdNYXJrcygpO1xuICB9XG5cbiAgZWRpdFpvb21BcmVhKG5ld1pvb21BcmVhKSB7XG4gICAgY29uc3QgemEgPSB0aGlzLm1hcmtlci56b29tQXJlYXMuZmluZCh4ID0+IHguaWQgPT09IG5ld1pvb21BcmVhLmlkKTtcbiAgICBpZiAoemEpIHtcbiAgICAgIHphLnJlbmRlclNob3QgPSBuZXdab29tQXJlYS5yZW5kZXJTaG90O1xuICAgICAgemEucmVmZXJlbmNlU2hvdCA9IG5ld1pvb21BcmVhLnJlZmVyZW5jZVNob3Q7XG4gICAgfVxuICB9XG5cbn1cbiJdfQ==