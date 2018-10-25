/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input, ViewChild } from '@angular/core';
import { DecImageMarksComponent } from './../dec-image-marks/dec-image-marks.component';
import { MatDialog } from '@angular/material';
import { DecCommentDialogComponent } from './dec-comment-dialog/dec-comment-dialog.component';
import { TranslateService } from '@ngx-translate/core';
var DecImageMarkerComponent = /** @class */ (function () {
    function DecImageMarkerComponent(dialog, translateService) {
        this.dialog = dialog;
        this.translateService = translateService;
        this.existsEvents = false;
        this.requestByClient = false;
        this.mousedown = false;
        this.mouseup = true;
        this.mousemove = false;
    }
    Object.defineProperty(DecImageMarkerComponent.prototype, "qaModeActive", {
        get: /**
         * @return {?}
         */
        function () {
            return this._qaModeActive;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            if (this._qaModeActive !== v) {
                this._qaModeActive = v;
                // TODO: fix me
                if (!this.existsEvents) {
                    this.addListeners(this.decMarks.marksWrapper.nativeElement, this.decMarks.imgRef.nativeElement);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    DecImageMarkerComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () { };
    /**
     * @param {?} target
     * @param {?} commentIndex
     * @return {?}
     */
    DecImageMarkerComponent.prototype.deleteMark = /**
     * @param {?} target
     * @param {?} commentIndex
     * @return {?}
     */
    function (target, commentIndex) {
        this.removeTag(target);
        this.removeComment(commentIndex);
        this.refreshTagsNumber();
    };
    /**
     * @param {?} target
     * @return {?}
     */
    DecImageMarkerComponent.prototype.removeTag = /**
     * @param {?} target
     * @return {?}
     */
    function (target) {
        if (target.parentElement && target.parentElement.classList.contains('square-tag')) {
            target.parentElement.remove();
        }
        else {
            target.remove();
        }
    };
    /**
     * @param {?} commentIndex
     * @return {?}
     */
    DecImageMarkerComponent.prototype.removeComment = /**
     * @param {?} commentIndex
     * @return {?}
     */
    function (commentIndex) {
        /** @type {?} */
        var index = commentIndex;
        this.render.comments.splice(index, 1);
    };
    /**
     * @return {?}
     */
    DecImageMarkerComponent.prototype.refreshTagsNumber = /**
     * @return {?}
     */
    function () {
        Array.from(this.decMarks.marksWrapper.nativeElement.querySelectorAll('.point-tag')).forEach(function (point, idx) {
            point.innerHTML = (idx + 1).toString();
        });
    };
    /**
     * @param {?} wrapperElement
     * @param {?} imageElement
     * @return {?}
     */
    DecImageMarkerComponent.prototype.addListeners = /**
     * @param {?} wrapperElement
     * @param {?} imageElement
     * @return {?}
     */
    function (wrapperElement, imageElement) {
        this.onMouseDown(wrapperElement);
        this.onDragStart(wrapperElement);
        this.onMouseMove(wrapperElement);
        this.onMouseUp(wrapperElement, imageElement);
        this.existsEvents = true;
    };
    /**
     * @param {?} wrapperElement
     * @param {?} imageElement
     * @return {?}
     */
    DecImageMarkerComponent.prototype.onMouseUp = /**
     * @param {?} wrapperElement
     * @param {?} imageElement
     * @return {?}
     */
    function (wrapperElement, imageElement) {
        var _this = this;
        wrapperElement.addEventListener('mouseup', function (event) {
            /** @type {?} */
            var inQaMode = _this.qaModeActive;
            /** @type {?} */
            var mouseWasDown = !_this.mouseup;
            /** @type {?} */
            var inAPointTag = ((/** @type {?} */ (event.target)).classList.contains('point-tag'));
            /** @type {?} */
            var notInAPointTag = !inAPointTag;
            /** @type {?} */
            var requestByClient = ((/** @type {?} */ (event.target)).classList.contains('client'));
            if (inQaMode && mouseWasDown && notInAPointTag) {
                _this.createNewTag(imageElement);
            }
            if (inQaMode && inAPointTag && !requestByClient) {
                _this.editComment(event);
            }
            _this.mousemove = false;
            _this.mouseup = true;
        });
    };
    /**
     * @param {?} imageElement
     * @return {?}
     */
    DecImageMarkerComponent.prototype.createNewTag = /**
     * @param {?} imageElement
     * @return {?}
     */
    function (imageElement) {
        this.mousedown = false;
        /** @type {?} */
        var x = Math.round(((this.startX / imageElement.height) * 100) * 100) / 100;
        /** @type {?} */
        var y = Math.round(((this.startY / imageElement.width) * 100) * 100) / 100;
        /** @type {?} */
        var index = this.render.comments.length + 1;
        if (this.mousemove) {
            this.drawSquareTag(event, imageElement, index, x, y);
        }
        else {
            this.drawPointTag(index, x, y);
        }
        this.removeSquareMark();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    DecImageMarkerComponent.prototype.editComment = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var _this = this;
        /** @type {?} */
        var target = /** @type {?} */ (event.target);
        /** @type {?} */
        var commentIndex = parseInt(target.innerHTML, 10) - 1;
        /** @type {?} */
        var ref = this.dialog.open(DecCommentDialogComponent, {
            data: {
                title: this.translateService.instant('label.markdowns'),
                comment: this.render.comments[commentIndex], editing: true
            },
            width: '615px'
        });
        ref.afterClosed().subscribe(function (resp) {
            if (resp === 'delete') {
                _this.deleteMark(target, commentIndex);
            }
            else if (resp) {
                _this.render.comments[commentIndex].comment = resp;
            }
        });
    };
    /**
     * @param {?} index
     * @param {?} x
     * @param {?} y
     * @return {?}
     */
    DecImageMarkerComponent.prototype.drawPointTag = /**
     * @param {?} index
     * @param {?} x
     * @param {?} y
     * @return {?}
     */
    function (index, x, y) {
        var _this = this;
        /** @type {?} */
        var ref = this.dialog.open(DecCommentDialogComponent, {
            data: {
                title: this.translateService.instant('label.markdowns'),
                comment: {}
            },
            width: '615px'
        });
        ref.afterClosed().subscribe(function (resp) {
            if (resp) {
                _this.decMarks.createPointTag([x, y], index, _this.requestByClient);
                _this.render.comments.push({ comment: resp, coordinates: [x, y] });
            }
        });
    };
    /**
     * @param {?} event
     * @param {?} imageElement
     * @param {?} index
     * @param {?} x
     * @param {?} y
     * @return {?}
     */
    DecImageMarkerComponent.prototype.drawSquareTag = /**
     * @param {?} event
     * @param {?} imageElement
     * @param {?} index
     * @param {?} x
     * @param {?} y
     * @return {?}
     */
    function (event, imageElement, index, x, y) {
        var _this = this;
        /** @type {?} */
        var x2 = Math.round(((event.offsetX / imageElement.width) * 100) * 100) / 100;
        /** @type {?} */
        var y2 = Math.round(((event.offsetY / imageElement.height) * 100) * 100) / 100;
        /** @type {?} */
        var ref = this.dialog.open(DecCommentDialogComponent, {
            data: {
                title: this.translateService.instant('label.markdowns'),
                comment: {}
            },
            width: '615px'
        });
        ref.afterClosed().subscribe(function (resp) {
            if (resp) {
                _this.decMarks.createSquareTag([x, y, x2, y2], index, _this.requestByClient);
                _this.render.comments.push({ comment: resp, coordinates: [x, y, x2, y2] });
            }
        });
    };
    /**
     * @param {?} wrapperElement
     * @return {?}
     */
    DecImageMarkerComponent.prototype.onMouseDown = /**
     * @param {?} wrapperElement
     * @return {?}
     */
    function (wrapperElement) {
        var _this = this;
        wrapperElement.addEventListener('mousedown', function (event) {
            if (_this.qaModeActive && !((/** @type {?} */ (event.target.classList.contains('point-tag'))))) {
                _this.mousedown = true;
                _this.mouseup = false;
                _this.startX = event.offsetX;
                _this.startY = event.offsetY;
            }
        });
    };
    /**
     * @param {?} wrapperElement
     * @return {?}
     */
    DecImageMarkerComponent.prototype.onDragStart = /**
     * @param {?} wrapperElement
     * @return {?}
     */
    function (wrapperElement) {
        wrapperElement.addEventListener('dragstart', function (event) {
            event.preventDefault();
        });
    };
    /**
     * @param {?} wrapperElement
     * @return {?}
     */
    DecImageMarkerComponent.prototype.onMouseMove = /**
     * @param {?} wrapperElement
     * @return {?}
     */
    function (wrapperElement) {
        var _this = this;
        wrapperElement.addEventListener('mousemove', function (event) {
            /** @type {?} */
            var notClickingInAnyTag = !((/** @type {?} */ (event.target.classList.contains('point-tag'))));
            /** @type {?} */
            var inQaMode = _this.qaModeActive;
            /** @type {?} */
            var mouseIsDown = _this.mousedown && !_this.mouseup;
            if (inQaMode && mouseIsDown && notClickingInAnyTag) {
                _this.mousemove = true;
                _this.ensureNoMark();
                _this.squareMark = _this.createNewSquareMark(event);
                wrapperElement.appendChild(_this.squareMark);
            }
            _this.onMouseLeave(wrapperElement);
            _this.onMouseOut(wrapperElement);
            event.preventDefault();
        });
    };
    /**
     * @param {?} event
     * @return {?}
     */
    DecImageMarkerComponent.prototype.createNewSquareMark = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var squareMark = document.createElement('div');
        squareMark.id = 'squareMark';
        squareMark.style.position = 'absolute';
        squareMark.style.pointerEvents = 'none';
        squareMark.style.borderStyle = 'solid';
        squareMark.style.borderColor = '#f33d3c';
        squareMark.style.borderWidth = '2px';
        squareMark.style.width = (event.offsetX - this.startX) + "px";
        squareMark.style.height = (event.offsetY - this.startY) + "px";
        squareMark.style.top = this.startY > event.offsetY ? event.offsetY + "px" : this.startY + "px";
        squareMark.style.left = this.startX > event.offsetX ? event.offsetX + "px" : this.startX + "px";
        squareMark.style.width = Math.abs(this.startX - event.offsetX) + "px";
        squareMark.style.height = Math.abs(this.startY - event.offsetY) + "px";
        return squareMark;
    };
    /**
     * @param {?} wrapperElement
     * @return {?}
     */
    DecImageMarkerComponent.prototype.onMouseLeave = /**
     * @param {?} wrapperElement
     * @return {?}
     */
    function (wrapperElement) {
        var _this = this;
        wrapperElement.onmouseleave = function () {
            if (_this.qaModeActive && _this.squareMark) {
                _this.mousedown = false;
                _this.mouseup = true;
                _this.squareMark.remove();
            }
        };
    };
    /**
     * @param {?} wrapperElement
     * @return {?}
     */
    DecImageMarkerComponent.prototype.onMouseOut = /**
     * @param {?} wrapperElement
     * @return {?}
     */
    function (wrapperElement) {
        var _this = this;
        wrapperElement.onmouseout = function () {
            if (_this.qaModeActive && _this.squareMark) {
                _this.mousedown = false;
                _this.mouseup = true;
                _this.squareMark.remove();
            }
        };
    };
    /**
     * @return {?}
     */
    DecImageMarkerComponent.prototype.ensureNoMark = /**
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
    DecImageMarkerComponent.prototype.removeSquareMark = /**
     * @return {?}
     */
    function () {
        if (this.squareMark) {
            this.squareMark.remove();
        }
    };
    DecImageMarkerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dec-image-marker',
                    template: "<dec-image-marks [ngClass]=\"{'qa-mode-active': qaModeActive}\" [render]=\"render\"></dec-image-marks>\n",
                    styles: [".mat-tab-body-content{padding:16px 0}.mat-form-field-prefix{margin-right:8px!important}.mat-form-field-suffix{margin-left:8px!important}.no-padding .mat-dialog-container{padding:0}.box-shadow-none .mat-dialog-container{box-shadow:none}.cdk-overlay-container .mat-menu-panel{max-width:400px}.mat-elevation-z0{box-shadow:0 0 0 0 rgba(0,0,0,.2),0 0 0 0 rgba(0,0,0,.14),0 0 0 0 rgba(0,0,0,.12)}.mat-elevation-z1{box-shadow:0 2px 1px -1px rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 1px 3px 0 rgba(0,0,0,.12)}.mat-elevation-z2{box-shadow:0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12)}.mat-elevation-z3{box-shadow:0 3px 3px -2px rgba(0,0,0,.2),0 3px 4px 0 rgba(0,0,0,.14),0 1px 8px 0 rgba(0,0,0,.12)}.mat-elevation-z4{box-shadow:0 2px 4px -1px rgba(0,0,0,.2),0 4px 5px 0 rgba(0,0,0,.14),0 1px 10px 0 rgba(0,0,0,.12)}.mat-elevation-z5{box-shadow:0 3px 5px -1px rgba(0,0,0,.2),0 5px 8px 0 rgba(0,0,0,.14),0 1px 14px 0 rgba(0,0,0,.12)}.mat-elevation-z6{box-shadow:0 3px 5px -1px rgba(0,0,0,.2),0 6px 10px 0 rgba(0,0,0,.14),0 1px 18px 0 rgba(0,0,0,.12)}.mat-elevation-z7{box-shadow:0 4px 5px -2px rgba(0,0,0,.2),0 7px 10px 1px rgba(0,0,0,.14),0 2px 16px 1px rgba(0,0,0,.12)}.mat-elevation-z8{box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12)}.mat-elevation-z9{box-shadow:0 5px 6px -3px rgba(0,0,0,.2),0 9px 12px 1px rgba(0,0,0,.14),0 3px 16px 2px rgba(0,0,0,.12)}.mat-elevation-z10{box-shadow:0 6px 6px -3px rgba(0,0,0,.2),0 10px 14px 1px rgba(0,0,0,.14),0 4px 18px 3px rgba(0,0,0,.12)}.mat-elevation-z11{box-shadow:0 6px 7px -4px rgba(0,0,0,.2),0 11px 15px 1px rgba(0,0,0,.14),0 4px 20px 3px rgba(0,0,0,.12)}.mat-elevation-z12{box-shadow:0 7px 8px -4px rgba(0,0,0,.2),0 12px 17px 2px rgba(0,0,0,.14),0 5px 22px 4px rgba(0,0,0,.12)}.mat-elevation-z13{box-shadow:0 7px 8px -4px rgba(0,0,0,.2),0 13px 19px 2px rgba(0,0,0,.14),0 5px 24px 4px rgba(0,0,0,.12)}.mat-elevation-z14{box-shadow:0 7px 9px -4px rgba(0,0,0,.2),0 14px 21px 2px rgba(0,0,0,.14),0 5px 26px 4px rgba(0,0,0,.12)}.mat-elevation-z15{box-shadow:0 8px 9px -5px rgba(0,0,0,.2),0 15px 22px 2px rgba(0,0,0,.14),0 6px 28px 5px rgba(0,0,0,.12)}.mat-elevation-z16{box-shadow:0 8px 10px -5px rgba(0,0,0,.2),0 16px 24px 2px rgba(0,0,0,.14),0 6px 30px 5px rgba(0,0,0,.12)}.mat-elevation-z17{box-shadow:0 8px 11px -5px rgba(0,0,0,.2),0 17px 26px 2px rgba(0,0,0,.14),0 6px 32px 5px rgba(0,0,0,.12)}.mat-elevation-z18{box-shadow:0 9px 11px -5px rgba(0,0,0,.2),0 18px 28px 2px rgba(0,0,0,.14),0 7px 34px 6px rgba(0,0,0,.12)}.mat-elevation-z19{box-shadow:0 9px 12px -6px rgba(0,0,0,.2),0 19px 29px 2px rgba(0,0,0,.14),0 7px 36px 6px rgba(0,0,0,.12)}.mat-elevation-z20{box-shadow:0 10px 13px -6px rgba(0,0,0,.2),0 20px 31px 3px rgba(0,0,0,.14),0 8px 38px 7px rgba(0,0,0,.12)}.mat-elevation-z21{box-shadow:0 10px 13px -6px rgba(0,0,0,.2),0 21px 33px 3px rgba(0,0,0,.14),0 8px 40px 7px rgba(0,0,0,.12)}.mat-elevation-z22{box-shadow:0 10px 14px -6px rgba(0,0,0,.2),0 22px 35px 3px rgba(0,0,0,.14),0 8px 42px 7px rgba(0,0,0,.12)}.mat-elevation-z23{box-shadow:0 11px 14px -7px rgba(0,0,0,.2),0 23px 36px 3px rgba(0,0,0,.14),0 9px 44px 8px rgba(0,0,0,.12)}.mat-elevation-z24{box-shadow:0 11px 15px -7px rgba(0,0,0,.2),0 24px 38px 3px rgba(0,0,0,.14),0 9px 46px 8px rgba(0,0,0,.12)}.mat-badge-content{font-weight:600;font-size:12px;font-family:Roboto,\"Helvetica Neue\",sans-serif}.mat-badge-small .mat-badge-content{font-size:6px}.mat-badge-large .mat-badge-content{font-size:24px}.mat-h1,.mat-headline,.mat-typography h1{font:400 24px/32px Roboto,\"Helvetica Neue\",sans-serif;margin:0 0 16px}.mat-h2,.mat-title,.mat-typography h2{font:500 20px/32px Roboto,\"Helvetica Neue\",sans-serif;margin:0 0 16px}.mat-h3,.mat-subheading-2,.mat-typography h3{font:400 16px/28px Roboto,\"Helvetica Neue\",sans-serif;margin:0 0 16px}.mat-h4,.mat-subheading-1,.mat-typography h4{font:400 15px/24px Roboto,\"Helvetica Neue\",sans-serif;margin:0 0 16px}.mat-h5,.mat-typography h5{font:400 11.62px/20px Roboto,\"Helvetica Neue\",sans-serif;margin:0 0 12px}.mat-h6,.mat-typography h6{font:400 9.38px/20px Roboto,\"Helvetica Neue\",sans-serif;margin:0 0 12px}.mat-body-2,.mat-body-strong{font:500 14px/24px Roboto,\"Helvetica Neue\",sans-serif}.mat-body,.mat-body-1,.mat-typography{font:400 14px/20px Roboto,\"Helvetica Neue\",sans-serif}.mat-body p,.mat-body-1 p,.mat-typography p{margin:0 0 12px}.mat-caption,.mat-small{font:400 12px/20px Roboto,\"Helvetica Neue\",sans-serif}.mat-display-4,.mat-typography .mat-display-4{font:300 112px/112px Roboto,\"Helvetica Neue\",sans-serif;margin:0 0 56px;letter-spacing:-.05em}.mat-display-3,.mat-typography .mat-display-3{font:400 56px/56px Roboto,\"Helvetica Neue\",sans-serif;margin:0 0 64px;letter-spacing:-.02em}.mat-display-2,.mat-typography .mat-display-2{font:400 45px/48px Roboto,\"Helvetica Neue\",sans-serif;margin:0 0 64px;letter-spacing:-.005em}.mat-display-1,.mat-typography .mat-display-1{font:400 34px/40px Roboto,\"Helvetica Neue\",sans-serif;margin:0 0 64px}.mat-bottom-sheet-container{font-family:Roboto,\"Helvetica Neue\",sans-serif;font-size:16px;font-weight:400}.mat-button,.mat-fab,.mat-flat-button,.mat-icon-button,.mat-mini-fab,.mat-raised-button,.mat-stroked-button{font-family:Roboto,\"Helvetica Neue\",sans-serif;font-size:14px;font-weight:500}.mat-button-toggle,.mat-card{font-family:Roboto,\"Helvetica Neue\",sans-serif}.mat-card-title{font-size:24px;font-weight:400}.mat-card-content,.mat-card-header .mat-card-title,.mat-card-subtitle{font-size:14px}.mat-checkbox{font-family:Roboto,\"Helvetica Neue\",sans-serif}.mat-checkbox-layout .mat-checkbox-label{line-height:24px}.mat-chip{font-size:13px;line-height:18px}.mat-chip .mat-chip-remove.mat-icon,.mat-chip .mat-chip-trailing-icon.mat-icon{font-size:18px}.mat-table{font-family:Roboto,\"Helvetica Neue\",sans-serif}.mat-header-cell{font-size:12px;font-weight:500}.mat-cell,.mat-footer-cell{font-size:14px}.mat-calendar{font-family:Roboto,\"Helvetica Neue\",sans-serif}.mat-calendar-body{font-size:13px}.mat-calendar-body-label,.mat-calendar-period-button{font-size:14px;font-weight:500}.mat-calendar-table-header th{font-size:11px;font-weight:400}.mat-dialog-title{font:500 20px/32px Roboto,\"Helvetica Neue\",sans-serif}.mat-expansion-panel-header{font-family:Roboto,\"Helvetica Neue\",sans-serif;font-size:15px;font-weight:400}.mat-expansion-panel-content{font:400 14px/20px Roboto,\"Helvetica Neue\",sans-serif}.mat-form-field{width:100%;font-size:inherit;font-weight:400;line-height:1.125;font-family:Roboto,\"Helvetica Neue\",sans-serif}.mat-form-field-wrapper{padding-bottom:1.34375em}.mat-form-field-prefix .mat-icon,.mat-form-field-suffix .mat-icon{font-size:150%;line-height:1.125}.mat-form-field-prefix .mat-icon-button,.mat-form-field-suffix .mat-icon-button{height:1.5em;width:1.5em}.mat-form-field-prefix .mat-icon-button .mat-icon,.mat-form-field-suffix .mat-icon-button .mat-icon{height:1.125em;line-height:1.125}.mat-form-field-infix{padding:.5em 0;border-top:.84375em solid transparent}.mat-form-field-can-float .mat-input-server:focus+.mat-form-field-label-wrapper .mat-form-field-label,.mat-form-field-can-float.mat-form-field-should-float .mat-form-field-label{-webkit-transform:translateY(-1.34375em) scale(.75);transform:translateY(-1.34375em) scale(.75);width:133.33333%}.mat-form-field-can-float .mat-input-server[label]:not(:label-shown)+.mat-form-field-label-wrapper .mat-form-field-label{-webkit-transform:translateY(-1.34374em) scale(.75);transform:translateY(-1.34374em) scale(.75);width:133.33334%}.mat-form-field-label-wrapper{top:-.84375em;padding-top:.84375em}.mat-form-field-label{top:1.34375em}.mat-form-field-underline{bottom:1.34375em}.mat-form-field-subscript-wrapper{font-size:75%;margin-top:.66667em;top:calc(100% - 1.79167em)}.mat-form-field-appearance-legacy .mat-form-field-wrapper{padding-bottom:1.25em}.mat-form-field-appearance-legacy .mat-form-field-infix{padding:.4375em 0}.mat-form-field-appearance-legacy.mat-form-field-can-float .mat-input-server:focus+.mat-form-field-label-wrapper .mat-form-field-label,.mat-form-field-appearance-legacy.mat-form-field-can-float.mat-form-field-should-float .mat-form-field-label{-webkit-transform:translateY(-1.28125em) scale(.75) perspective(100px) translateZ(.001px);transform:translateY(-1.28125em) scale(.75) perspective(100px) translateZ(.001px);-ms-transform:translateY(-1.28125em) scale(.75);width:133.33333%}.mat-form-field-appearance-legacy.mat-form-field-can-float .mat-form-field-autofill-control:-webkit-autofill+.mat-form-field-label-wrapper .mat-form-field-label{-webkit-transform:translateY(-1.28125em) scale(.75) perspective(100px) translateZ(.00101px);transform:translateY(-1.28125em) scale(.75) perspective(100px) translateZ(.00101px);-ms-transform:translateY(-1.28124em) scale(.75);width:133.33334%}.mat-form-field-appearance-legacy.mat-form-field-can-float .mat-input-server[label]:not(:label-shown)+.mat-form-field-label-wrapper .mat-form-field-label{-webkit-transform:translateY(-1.28125em) scale(.75) perspective(100px) translateZ(.00102px);transform:translateY(-1.28125em) scale(.75) perspective(100px) translateZ(.00102px);-ms-transform:translateY(-1.28123em) scale(.75);width:133.33335%}.mat-form-field-appearance-legacy .mat-form-field-label{top:1.28125em}.mat-form-field-appearance-legacy .mat-form-field-underline{bottom:1.25em}.mat-form-field-appearance-legacy .mat-form-field-subscript-wrapper{margin-top:.54167em;top:calc(100% - 1.66667em)}.mat-form-field-appearance-fill .mat-form-field-infix{padding:.25em 0 .75em}.mat-form-field-appearance-fill .mat-form-field-label{top:1.09375em;margin-top:-.5em}.mat-form-field-appearance-fill.mat-form-field-can-float .mat-input-server:focus+.mat-form-field-label-wrapper .mat-form-field-label,.mat-form-field-appearance-fill.mat-form-field-can-float.mat-form-field-should-float .mat-form-field-label{-webkit-transform:translateY(-.59375em) scale(.75);transform:translateY(-.59375em) scale(.75);width:133.33333%}.mat-form-field-appearance-fill.mat-form-field-can-float .mat-input-server[label]:not(:label-shown)+.mat-form-field-label-wrapper .mat-form-field-label{-webkit-transform:translateY(-.59374em) scale(.75);transform:translateY(-.59374em) scale(.75);width:133.33334%}.mat-form-field-appearance-outline .mat-form-field-infix{padding:1em 0}.mat-form-field-appearance-outline .mat-form-field-label{top:1.84375em;margin-top:-.25em}.mat-form-field-appearance-outline.mat-form-field-can-float .mat-input-server:focus+.mat-form-field-label-wrapper .mat-form-field-label,.mat-form-field-appearance-outline.mat-form-field-can-float.mat-form-field-should-float .mat-form-field-label{-webkit-transform:translateY(-1.59375em) scale(.75);transform:translateY(-1.59375em) scale(.75);width:133.33333%}.mat-form-field-appearance-outline.mat-form-field-can-float .mat-input-server[label]:not(:label-shown)+.mat-form-field-label-wrapper .mat-form-field-label{-webkit-transform:translateY(-1.59374em) scale(.75);transform:translateY(-1.59374em) scale(.75);width:133.33334%}.mat-grid-tile-footer,.mat-grid-tile-header{font-size:14px}.mat-grid-tile-footer .mat-line,.mat-grid-tile-header .mat-line{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;box-sizing:border-box}.mat-grid-tile-footer .mat-line:nth-child(n+2),.mat-grid-tile-header .mat-line:nth-child(n+2){font-size:12px}input.mat-input-element{margin-top:-.0625em}.mat-menu-item{font-family:Roboto,\"Helvetica Neue\",sans-serif;font-size:16px;font-weight:400}.mat-paginator,.mat-paginator-page-size .mat-select-trigger{font-family:Roboto,\"Helvetica Neue\",sans-serif;font-size:12px}.mat-radio-button,.mat-select{font-family:Roboto,\"Helvetica Neue\",sans-serif}.mat-select-trigger{height:1.125em}.mat-slide-toggle-content{font:400 14px/20px Roboto,\"Helvetica Neue\",sans-serif}.mat-slider-thumb-label-text{font-family:Roboto,\"Helvetica Neue\",sans-serif;font-size:12px;font-weight:500}.mat-stepper-horizontal,.mat-stepper-vertical{font-family:Roboto,\"Helvetica Neue\",sans-serif}.mat-step-label{font-size:14px;font-weight:400}.mat-step-label-selected{font-size:14px;font-weight:500}.mat-tab-group{font-family:Roboto,\"Helvetica Neue\",sans-serif}.mat-tab-label,.mat-tab-link{font-family:Roboto,\"Helvetica Neue\",sans-serif;font-size:14px;font-weight:500}.mat-toolbar,.mat-toolbar h1,.mat-toolbar h2,.mat-toolbar h3,.mat-toolbar h4,.mat-toolbar h5,.mat-toolbar h6{font:500 20px/32px Roboto,\"Helvetica Neue\",sans-serif;margin:0}.mat-tooltip{font-family:Roboto,\"Helvetica Neue\",sans-serif;font-size:10px;padding-top:6px;padding-bottom:6px}.mat-tooltip-handset{font-size:14px;padding-top:9px;padding-bottom:9px}.mat-list-item,.mat-list-option{font-family:Roboto,\"Helvetica Neue\",sans-serif}.mat-list .mat-list-item,.mat-nav-list .mat-list-item,.mat-selection-list .mat-list-item{font-size:16px}.mat-list .mat-list-item .mat-line,.mat-nav-list .mat-list-item .mat-line,.mat-selection-list .mat-list-item .mat-line{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;box-sizing:border-box}.mat-list .mat-list-item .mat-line:nth-child(n+2),.mat-nav-list .mat-list-item .mat-line:nth-child(n+2),.mat-selection-list .mat-list-item .mat-line:nth-child(n+2){font-size:14px}.mat-list .mat-list-option,.mat-nav-list .mat-list-option,.mat-selection-list .mat-list-option{font-size:16px}.mat-list .mat-list-option .mat-line,.mat-nav-list .mat-list-option .mat-line,.mat-selection-list .mat-list-option .mat-line{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;box-sizing:border-box}.mat-list .mat-list-option .mat-line:nth-child(n+2),.mat-nav-list .mat-list-option .mat-line:nth-child(n+2),.mat-selection-list .mat-list-option .mat-line:nth-child(n+2){font-size:14px}.mat-list .mat-subheader,.mat-nav-list .mat-subheader,.mat-selection-list .mat-subheader{font-family:Roboto,\"Helvetica Neue\",sans-serif;font-size:14px;font-weight:500}.mat-list[dense] .mat-list-item,.mat-nav-list[dense] .mat-list-item,.mat-selection-list[dense] .mat-list-item{font-size:12px}.mat-list[dense] .mat-list-item .mat-line,.mat-nav-list[dense] .mat-list-item .mat-line,.mat-selection-list[dense] .mat-list-item .mat-line{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;box-sizing:border-box}.mat-list[dense] .mat-list-item .mat-line:nth-child(n+2),.mat-list[dense] .mat-list-option,.mat-nav-list[dense] .mat-list-item .mat-line:nth-child(n+2),.mat-nav-list[dense] .mat-list-option,.mat-selection-list[dense] .mat-list-item .mat-line:nth-child(n+2),.mat-selection-list[dense] .mat-list-option{font-size:12px}.mat-list[dense] .mat-list-option .mat-line,.mat-nav-list[dense] .mat-list-option .mat-line,.mat-selection-list[dense] .mat-list-option .mat-line{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;box-sizing:border-box}.mat-list[dense] .mat-list-option .mat-line:nth-child(n+2),.mat-nav-list[dense] .mat-list-option .mat-line:nth-child(n+2),.mat-selection-list[dense] .mat-list-option .mat-line:nth-child(n+2){font-size:12px}.mat-list[dense] .mat-subheader,.mat-nav-list[dense] .mat-subheader,.mat-selection-list[dense] .mat-subheader{font-family:Roboto,\"Helvetica Neue\",sans-serif;font-size:12px;font-weight:500}.mat-option{font-family:Roboto,\"Helvetica Neue\",sans-serif;font-size:16px}.mat-optgroup-label{font:500 14px/24px Roboto,\"Helvetica Neue\",sans-serif}.mat-simple-snackbar{font-family:Roboto,\"Helvetica Neue\",sans-serif;font-size:14px}.mat-simple-snackbar-action{line-height:1;font-family:inherit;font-size:inherit;font-weight:500}.mat-tree{font-family:Roboto,\"Helvetica Neue\",sans-serif}.mat-tree-node{font-weight:400;font-size:14px}.mat-ripple{overflow:hidden}.mat-ripple.mat-ripple-unbounded{overflow:visible}.mat-ripple-element{position:absolute;border-radius:50%;pointer-events:none;transition:opacity,-webkit-transform 0s cubic-bezier(0,0,.2,1);transition:opacity,transform 0s cubic-bezier(0,0,.2,1);transition:opacity,transform 0s cubic-bezier(0,0,.2,1),-webkit-transform 0s cubic-bezier(0,0,.2,1);-webkit-transform:scale(0);transform:scale(0)}@media screen and (-ms-high-contrast:active){.mat-ripple-element{display:none}}.cdk-visually-hidden{border:0;clip:rect(0 0 0 0);height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;width:1px;outline:0;-webkit-appearance:none;-moz-appearance:none}.cdk-global-overlay-wrapper,.cdk-overlay-container{pointer-events:none;top:0;left:0;height:100%;width:100%}.cdk-overlay-container{position:fixed;z-index:1000}.cdk-overlay-container:empty{display:none}.cdk-global-overlay-wrapper{display:flex;position:absolute;z-index:1000}.cdk-overlay-pane{position:absolute;pointer-events:auto;box-sizing:border-box;z-index:1000;display:flex;max-width:100%;max-height:100%}.cdk-overlay-backdrop{position:absolute;top:0;bottom:0;left:0;right:0;z-index:1000;pointer-events:auto;-webkit-tap-highlight-color:transparent;transition:opacity .4s cubic-bezier(.25,.8,.25,1);opacity:0}.cdk-overlay-backdrop.cdk-overlay-backdrop-showing{opacity:1}@media screen and (-ms-high-contrast:active){.cdk-overlay-backdrop.cdk-overlay-backdrop-showing{opacity:.6}}.cdk-overlay-dark-backdrop{background:rgba(0,0,0,.288)}.cdk-overlay-transparent-backdrop,.cdk-overlay-transparent-backdrop.cdk-overlay-backdrop-showing{opacity:0}.cdk-overlay-connected-position-bounding-box{position:absolute;z-index:1000;display:flex;flex-direction:column;min-width:1px;min-height:1px}.cdk-global-scrollblock{position:fixed;width:100%;overflow-y:scroll}.cdk-text-field-autofill-monitored:-webkit-autofill{-webkit-animation-name:cdk-text-field-autofill-start;animation-name:cdk-text-field-autofill-start}.cdk-text-field-autofill-monitored:not(:-webkit-autofill){-webkit-animation-name:cdk-text-field-autofill-end;animation-name:cdk-text-field-autofill-end}textarea.cdk-textarea-autosize{resize:none}textarea.cdk-textarea-autosize-measuring{height:auto!important;overflow:hidden!important;padding:2px 0!important;box-sizing:content-box!important}.qa-mode-active{cursor:crosshair}"]
                },] },
    ];
    /** @nocollapse */
    DecImageMarkerComponent.ctorParameters = function () { return [
        { type: MatDialog },
        { type: TranslateService }
    ]; };
    DecImageMarkerComponent.propDecorators = {
        render: [{ type: Input }],
        qaModeActive: [{ type: Input }],
        decMarks: [{ type: ViewChild, args: [DecImageMarksComponent,] }]
    };
    return DecImageMarkerComponent;
}());
export { DecImageMarkerComponent };
if (false) {
    /** @type {?} */
    DecImageMarkerComponent.prototype.render;
    /** @type {?} */
    DecImageMarkerComponent.prototype._qaModeActive;
    /** @type {?} */
    DecImageMarkerComponent.prototype.existsEvents;
    /** @type {?} */
    DecImageMarkerComponent.prototype.requestByClient;
    /** @type {?} */
    DecImageMarkerComponent.prototype.mousedown;
    /** @type {?} */
    DecImageMarkerComponent.prototype.mouseup;
    /** @type {?} */
    DecImageMarkerComponent.prototype.mousemove;
    /** @type {?} */
    DecImageMarkerComponent.prototype.startX;
    /** @type {?} */
    DecImageMarkerComponent.prototype.startY;
    /** @type {?} */
    DecImageMarkerComponent.prototype.squareMark;
    /** @type {?} */
    DecImageMarkerComponent.prototype.decMarks;
    /** @type {?} */
    DecImageMarkerComponent.prototype.dialog;
    /** @type {?} */
    DecImageMarkerComponent.prototype.translateService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLWltYWdlLW1hcmtlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvZGVjLWltYWdlLW1hcmtlci9kZWMtaW1hZ2UtbWFya2VyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLGdEQUFnRCxDQUFDO0FBQ3hGLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUM5QyxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxtREFBbUQsQ0FBQztBQUM5RixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQzs7SUFpRHJELGlDQUFvQixNQUFpQixFQUFVLGdCQUFrQztRQUE3RCxXQUFNLEdBQU4sTUFBTSxDQUFXO1FBQVUscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjs0QkFwQjFELEtBQUs7K0JBRUYsS0FBSzt5QkFHWCxLQUFLO3VCQUVQLElBQUk7eUJBRUYsS0FBSztLQVc2RDtJQXJDdEYsc0JBQ0ksaURBQVk7Ozs7UUFVaEI7WUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQztTQUMzQjs7Ozs7UUFiRCxVQUNpQixDQUFVO1lBQ3pCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDN0IsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUM7O2dCQUV2QixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO29CQUN2QixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLGFBQWEsRUFB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QUFDO2dCQUNwQixLQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDO2FBQzFCO1NBQ0YsQ0FBQzs7Ozs7O0lBSUksNENBQVU7Ozs7Y0FBQyxjQUFjOztRQUUvQixjQUFjLENBQUMsVUFBVSxHQUFHO1lBQzFCLEVBQUUsQ0FBQyxDQUFDLEtBQUksQ0FBQyxZQUFZLElBQUksS0FBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pDLEtBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO2dCQUN2QixLQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztnQkFDcEIsS0FBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQzthQUMxQjtTQUNGLENBQUM7Ozs7O0lBSUksOENBQVk7Ozs7UUFFbEIsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFMUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUVoRDs7Ozs7SUFJSyxrREFBZ0I7Ozs7UUFFdEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFFcEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUUxQjs7O2dCQTFVSixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGtCQUFrQjtvQkFDNUIsUUFBUSxFQUFFLDBHQUNYO29CQUNDLE1BQU0sRUFBRSxDQUFDLHFuakJBQW1pakIsQ0FBQztpQkFDOWlqQjs7OztnQkFUUSxTQUFTO2dCQUVULGdCQUFnQjs7O3lCQVV0QixLQUFLOytCQUVMLEtBQUs7MkJBbUNMLFNBQVMsU0FBQyxzQkFBc0I7O2tDQW5EbkM7O1NBWWEsdUJBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERlY0ltYWdlTWFya3NDb21wb25lbnQgfSBmcm9tICcuLy4uL2RlYy1pbWFnZS1tYXJrcy9kZWMtaW1hZ2UtbWFya3MuY29tcG9uZW50JztcbmltcG9ydCB7IE1hdERpYWxvZyB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IERlY0NvbW1lbnREaWFsb2dDb21wb25lbnQgfSBmcm9tICcuL2RlYy1jb21tZW50LWRpYWxvZy9kZWMtY29tbWVudC1kaWFsb2cuY29tcG9uZW50JztcbmltcG9ydCB7IFRyYW5zbGF0ZVNlcnZpY2UgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLWltYWdlLW1hcmtlcicsXG4gIHRlbXBsYXRlOiBgPGRlYy1pbWFnZS1tYXJrcyBbbmdDbGFzc109XCJ7J3FhLW1vZGUtYWN0aXZlJzogcWFNb2RlQWN0aXZlfVwiIFtyZW5kZXJdPVwicmVuZGVyXCI+PC9kZWMtaW1hZ2UtbWFya3M+XG5gLFxuICBzdHlsZXM6IFtgLm1hdC10YWItYm9keS1jb250ZW50e3BhZGRpbmc6MTZweCAwfS5tYXQtZm9ybS1maWVsZC1wcmVmaXh7bWFyZ2luLXJpZ2h0OjhweCFpbXBvcnRhbnR9Lm1hdC1mb3JtLWZpZWxkLXN1ZmZpeHttYXJnaW4tbGVmdDo4cHghaW1wb3J0YW50fS5uby1wYWRkaW5nIC5tYXQtZGlhbG9nLWNvbnRhaW5lcntwYWRkaW5nOjB9LmJveC1zaGFkb3ctbm9uZSAubWF0LWRpYWxvZy1jb250YWluZXJ7Ym94LXNoYWRvdzpub25lfS5jZGstb3ZlcmxheS1jb250YWluZXIgLm1hdC1tZW51LXBhbmVse21heC13aWR0aDo0MDBweH0ubWF0LWVsZXZhdGlvbi16MHtib3gtc2hhZG93OjAgMCAwIDAgcmdiYSgwLDAsMCwuMiksMCAwIDAgMCByZ2JhKDAsMCwwLC4xNCksMCAwIDAgMCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1lbGV2YXRpb24tejF7Ym94LXNoYWRvdzowIDJweCAxcHggLTFweCByZ2JhKDAsMCwwLC4yKSwwIDFweCAxcHggMCByZ2JhKDAsMCwwLC4xNCksMCAxcHggM3B4IDAgcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXoye2JveC1zaGFkb3c6MCAzcHggMXB4IC0ycHggcmdiYSgwLDAsMCwuMiksMCAycHggMnB4IDAgcmdiYSgwLDAsMCwuMTQpLDAgMXB4IDVweCAwIHJnYmEoMCwwLDAsLjEyKX0ubWF0LWVsZXZhdGlvbi16M3tib3gtc2hhZG93OjAgM3B4IDNweCAtMnB4IHJnYmEoMCwwLDAsLjIpLDAgM3B4IDRweCAwIHJnYmEoMCwwLDAsLjE0KSwwIDFweCA4cHggMCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1lbGV2YXRpb24tejR7Ym94LXNoYWRvdzowIDJweCA0cHggLTFweCByZ2JhKDAsMCwwLC4yKSwwIDRweCA1cHggMCByZ2JhKDAsMCwwLC4xNCksMCAxcHggMTBweCAwIHJnYmEoMCwwLDAsLjEyKX0ubWF0LWVsZXZhdGlvbi16NXtib3gtc2hhZG93OjAgM3B4IDVweCAtMXB4IHJnYmEoMCwwLDAsLjIpLDAgNXB4IDhweCAwIHJnYmEoMCwwLDAsLjE0KSwwIDFweCAxNHB4IDAgcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXo2e2JveC1zaGFkb3c6MCAzcHggNXB4IC0xcHggcmdiYSgwLDAsMCwuMiksMCA2cHggMTBweCAwIHJnYmEoMCwwLDAsLjE0KSwwIDFweCAxOHB4IDAgcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXo3e2JveC1zaGFkb3c6MCA0cHggNXB4IC0ycHggcmdiYSgwLDAsMCwuMiksMCA3cHggMTBweCAxcHggcmdiYSgwLDAsMCwuMTQpLDAgMnB4IDE2cHggMXB4IHJnYmEoMCwwLDAsLjEyKX0ubWF0LWVsZXZhdGlvbi16OHtib3gtc2hhZG93OjAgNXB4IDVweCAtM3B4IHJnYmEoMCwwLDAsLjIpLDAgOHB4IDEwcHggMXB4IHJnYmEoMCwwLDAsLjE0KSwwIDNweCAxNHB4IDJweCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1lbGV2YXRpb24tejl7Ym94LXNoYWRvdzowIDVweCA2cHggLTNweCByZ2JhKDAsMCwwLC4yKSwwIDlweCAxMnB4IDFweCByZ2JhKDAsMCwwLC4xNCksMCAzcHggMTZweCAycHggcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXoxMHtib3gtc2hhZG93OjAgNnB4IDZweCAtM3B4IHJnYmEoMCwwLDAsLjIpLDAgMTBweCAxNHB4IDFweCByZ2JhKDAsMCwwLC4xNCksMCA0cHggMThweCAzcHggcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXoxMXtib3gtc2hhZG93OjAgNnB4IDdweCAtNHB4IHJnYmEoMCwwLDAsLjIpLDAgMTFweCAxNXB4IDFweCByZ2JhKDAsMCwwLC4xNCksMCA0cHggMjBweCAzcHggcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXoxMntib3gtc2hhZG93OjAgN3B4IDhweCAtNHB4IHJnYmEoMCwwLDAsLjIpLDAgMTJweCAxN3B4IDJweCByZ2JhKDAsMCwwLC4xNCksMCA1cHggMjJweCA0cHggcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXoxM3tib3gtc2hhZG93OjAgN3B4IDhweCAtNHB4IHJnYmEoMCwwLDAsLjIpLDAgMTNweCAxOXB4IDJweCByZ2JhKDAsMCwwLC4xNCksMCA1cHggMjRweCA0cHggcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXoxNHtib3gtc2hhZG93OjAgN3B4IDlweCAtNHB4IHJnYmEoMCwwLDAsLjIpLDAgMTRweCAyMXB4IDJweCByZ2JhKDAsMCwwLC4xNCksMCA1cHggMjZweCA0cHggcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXoxNXtib3gtc2hhZG93OjAgOHB4IDlweCAtNXB4IHJnYmEoMCwwLDAsLjIpLDAgMTVweCAyMnB4IDJweCByZ2JhKDAsMCwwLC4xNCksMCA2cHggMjhweCA1cHggcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXoxNntib3gtc2hhZG93OjAgOHB4IDEwcHggLTVweCByZ2JhKDAsMCwwLC4yKSwwIDE2cHggMjRweCAycHggcmdiYSgwLDAsMCwuMTQpLDAgNnB4IDMwcHggNXB4IHJnYmEoMCwwLDAsLjEyKX0ubWF0LWVsZXZhdGlvbi16MTd7Ym94LXNoYWRvdzowIDhweCAxMXB4IC01cHggcmdiYSgwLDAsMCwuMiksMCAxN3B4IDI2cHggMnB4IHJnYmEoMCwwLDAsLjE0KSwwIDZweCAzMnB4IDVweCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1lbGV2YXRpb24tejE4e2JveC1zaGFkb3c6MCA5cHggMTFweCAtNXB4IHJnYmEoMCwwLDAsLjIpLDAgMThweCAyOHB4IDJweCByZ2JhKDAsMCwwLC4xNCksMCA3cHggMzRweCA2cHggcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXoxOXtib3gtc2hhZG93OjAgOXB4IDEycHggLTZweCByZ2JhKDAsMCwwLC4yKSwwIDE5cHggMjlweCAycHggcmdiYSgwLDAsMCwuMTQpLDAgN3B4IDM2cHggNnB4IHJnYmEoMCwwLDAsLjEyKX0ubWF0LWVsZXZhdGlvbi16MjB7Ym94LXNoYWRvdzowIDEwcHggMTNweCAtNnB4IHJnYmEoMCwwLDAsLjIpLDAgMjBweCAzMXB4IDNweCByZ2JhKDAsMCwwLC4xNCksMCA4cHggMzhweCA3cHggcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXoyMXtib3gtc2hhZG93OjAgMTBweCAxM3B4IC02cHggcmdiYSgwLDAsMCwuMiksMCAyMXB4IDMzcHggM3B4IHJnYmEoMCwwLDAsLjE0KSwwIDhweCA0MHB4IDdweCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1lbGV2YXRpb24tejIye2JveC1zaGFkb3c6MCAxMHB4IDE0cHggLTZweCByZ2JhKDAsMCwwLC4yKSwwIDIycHggMzVweCAzcHggcmdiYSgwLDAsMCwuMTQpLDAgOHB4IDQycHggN3B4IHJnYmEoMCwwLDAsLjEyKX0ubWF0LWVsZXZhdGlvbi16MjN7Ym94LXNoYWRvdzowIDExcHggMTRweCAtN3B4IHJnYmEoMCwwLDAsLjIpLDAgMjNweCAzNnB4IDNweCByZ2JhKDAsMCwwLC4xNCksMCA5cHggNDRweCA4cHggcmdiYSgwLDAsMCwuMTIpfS5tYXQtZWxldmF0aW9uLXoyNHtib3gtc2hhZG93OjAgMTFweCAxNXB4IC03cHggcmdiYSgwLDAsMCwuMiksMCAyNHB4IDM4cHggM3B4IHJnYmEoMCwwLDAsLjE0KSwwIDlweCA0NnB4IDhweCByZ2JhKDAsMCwwLC4xMil9Lm1hdC1iYWRnZS1jb250ZW50e2ZvbnQtd2VpZ2h0OjYwMDtmb250LXNpemU6MTJweDtmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWZ9Lm1hdC1iYWRnZS1zbWFsbCAubWF0LWJhZGdlLWNvbnRlbnR7Zm9udC1zaXplOjZweH0ubWF0LWJhZGdlLWxhcmdlIC5tYXQtYmFkZ2UtY29udGVudHtmb250LXNpemU6MjRweH0ubWF0LWgxLC5tYXQtaGVhZGxpbmUsLm1hdC10eXBvZ3JhcGh5IGgxe2ZvbnQ6NDAwIDI0cHgvMzJweCBSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWY7bWFyZ2luOjAgMCAxNnB4fS5tYXQtaDIsLm1hdC10aXRsZSwubWF0LXR5cG9ncmFwaHkgaDJ7Zm9udDo1MDAgMjBweC8zMnB4IFJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjttYXJnaW46MCAwIDE2cHh9Lm1hdC1oMywubWF0LXN1YmhlYWRpbmctMiwubWF0LXR5cG9ncmFwaHkgaDN7Zm9udDo0MDAgMTZweC8yOHB4IFJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjttYXJnaW46MCAwIDE2cHh9Lm1hdC1oNCwubWF0LXN1YmhlYWRpbmctMSwubWF0LXR5cG9ncmFwaHkgaDR7Zm9udDo0MDAgMTVweC8yNHB4IFJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjttYXJnaW46MCAwIDE2cHh9Lm1hdC1oNSwubWF0LXR5cG9ncmFwaHkgaDV7Zm9udDo0MDAgMTEuNjJweC8yMHB4IFJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjttYXJnaW46MCAwIDEycHh9Lm1hdC1oNiwubWF0LXR5cG9ncmFwaHkgaDZ7Zm9udDo0MDAgOS4zOHB4LzIwcHggUm9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO21hcmdpbjowIDAgMTJweH0ubWF0LWJvZHktMiwubWF0LWJvZHktc3Ryb25ne2ZvbnQ6NTAwIDE0cHgvMjRweCBSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWZ9Lm1hdC1ib2R5LC5tYXQtYm9keS0xLC5tYXQtdHlwb2dyYXBoeXtmb250OjQwMCAxNHB4LzIwcHggUm9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmfS5tYXQtYm9keSBwLC5tYXQtYm9keS0xIHAsLm1hdC10eXBvZ3JhcGh5IHB7bWFyZ2luOjAgMCAxMnB4fS5tYXQtY2FwdGlvbiwubWF0LXNtYWxse2ZvbnQ6NDAwIDEycHgvMjBweCBSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWZ9Lm1hdC1kaXNwbGF5LTQsLm1hdC10eXBvZ3JhcGh5IC5tYXQtZGlzcGxheS00e2ZvbnQ6MzAwIDExMnB4LzExMnB4IFJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjttYXJnaW46MCAwIDU2cHg7bGV0dGVyLXNwYWNpbmc6LS4wNWVtfS5tYXQtZGlzcGxheS0zLC5tYXQtdHlwb2dyYXBoeSAubWF0LWRpc3BsYXktM3tmb250OjQwMCA1NnB4LzU2cHggUm9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO21hcmdpbjowIDAgNjRweDtsZXR0ZXItc3BhY2luZzotLjAyZW19Lm1hdC1kaXNwbGF5LTIsLm1hdC10eXBvZ3JhcGh5IC5tYXQtZGlzcGxheS0ye2ZvbnQ6NDAwIDQ1cHgvNDhweCBSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWY7bWFyZ2luOjAgMCA2NHB4O2xldHRlci1zcGFjaW5nOi0uMDA1ZW19Lm1hdC1kaXNwbGF5LTEsLm1hdC10eXBvZ3JhcGh5IC5tYXQtZGlzcGxheS0xe2ZvbnQ6NDAwIDM0cHgvNDBweCBSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWY7bWFyZ2luOjAgMCA2NHB4fS5tYXQtYm90dG9tLXNoZWV0LWNvbnRhaW5lcntmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWY7Zm9udC1zaXplOjE2cHg7Zm9udC13ZWlnaHQ6NDAwfS5tYXQtYnV0dG9uLC5tYXQtZmFiLC5tYXQtZmxhdC1idXR0b24sLm1hdC1pY29uLWJ1dHRvbiwubWF0LW1pbmktZmFiLC5tYXQtcmFpc2VkLWJ1dHRvbiwubWF0LXN0cm9rZWQtYnV0dG9ue2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjtmb250LXNpemU6MTRweDtmb250LXdlaWdodDo1MDB9Lm1hdC1idXR0b24tdG9nZ2xlLC5tYXQtY2FyZHtmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWZ9Lm1hdC1jYXJkLXRpdGxle2ZvbnQtc2l6ZToyNHB4O2ZvbnQtd2VpZ2h0OjQwMH0ubWF0LWNhcmQtY29udGVudCwubWF0LWNhcmQtaGVhZGVyIC5tYXQtY2FyZC10aXRsZSwubWF0LWNhcmQtc3VidGl0bGV7Zm9udC1zaXplOjE0cHh9Lm1hdC1jaGVja2JveHtmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWZ9Lm1hdC1jaGVja2JveC1sYXlvdXQgLm1hdC1jaGVja2JveC1sYWJlbHtsaW5lLWhlaWdodDoyNHB4fS5tYXQtY2hpcHtmb250LXNpemU6MTNweDtsaW5lLWhlaWdodDoxOHB4fS5tYXQtY2hpcCAubWF0LWNoaXAtcmVtb3ZlLm1hdC1pY29uLC5tYXQtY2hpcCAubWF0LWNoaXAtdHJhaWxpbmctaWNvbi5tYXQtaWNvbntmb250LXNpemU6MThweH0ubWF0LXRhYmxle2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZn0ubWF0LWhlYWRlci1jZWxse2ZvbnQtc2l6ZToxMnB4O2ZvbnQtd2VpZ2h0OjUwMH0ubWF0LWNlbGwsLm1hdC1mb290ZXItY2VsbHtmb250LXNpemU6MTRweH0ubWF0LWNhbGVuZGFye2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZn0ubWF0LWNhbGVuZGFyLWJvZHl7Zm9udC1zaXplOjEzcHh9Lm1hdC1jYWxlbmRhci1ib2R5LWxhYmVsLC5tYXQtY2FsZW5kYXItcGVyaW9kLWJ1dHRvbntmb250LXNpemU6MTRweDtmb250LXdlaWdodDo1MDB9Lm1hdC1jYWxlbmRhci10YWJsZS1oZWFkZXIgdGh7Zm9udC1zaXplOjExcHg7Zm9udC13ZWlnaHQ6NDAwfS5tYXQtZGlhbG9nLXRpdGxle2ZvbnQ6NTAwIDIwcHgvMzJweCBSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWZ9Lm1hdC1leHBhbnNpb24tcGFuZWwtaGVhZGVye2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjtmb250LXNpemU6MTVweDtmb250LXdlaWdodDo0MDB9Lm1hdC1leHBhbnNpb24tcGFuZWwtY29udGVudHtmb250OjQwMCAxNHB4LzIwcHggUm9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmfS5tYXQtZm9ybS1maWVsZHt3aWR0aDoxMDAlO2ZvbnQtc2l6ZTppbmhlcml0O2ZvbnQtd2VpZ2h0OjQwMDtsaW5lLWhlaWdodDoxLjEyNTtmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWZ9Lm1hdC1mb3JtLWZpZWxkLXdyYXBwZXJ7cGFkZGluZy1ib3R0b206MS4zNDM3NWVtfS5tYXQtZm9ybS1maWVsZC1wcmVmaXggLm1hdC1pY29uLC5tYXQtZm9ybS1maWVsZC1zdWZmaXggLm1hdC1pY29ue2ZvbnQtc2l6ZToxNTAlO2xpbmUtaGVpZ2h0OjEuMTI1fS5tYXQtZm9ybS1maWVsZC1wcmVmaXggLm1hdC1pY29uLWJ1dHRvbiwubWF0LWZvcm0tZmllbGQtc3VmZml4IC5tYXQtaWNvbi1idXR0b257aGVpZ2h0OjEuNWVtO3dpZHRoOjEuNWVtfS5tYXQtZm9ybS1maWVsZC1wcmVmaXggLm1hdC1pY29uLWJ1dHRvbiAubWF0LWljb24sLm1hdC1mb3JtLWZpZWxkLXN1ZmZpeCAubWF0LWljb24tYnV0dG9uIC5tYXQtaWNvbntoZWlnaHQ6MS4xMjVlbTtsaW5lLWhlaWdodDoxLjEyNX0ubWF0LWZvcm0tZmllbGQtaW5maXh7cGFkZGluZzouNWVtIDA7Ym9yZGVyLXRvcDouODQzNzVlbSBzb2xpZCB0cmFuc3BhcmVudH0ubWF0LWZvcm0tZmllbGQtY2FuLWZsb2F0IC5tYXQtaW5wdXQtc2VydmVyOmZvY3VzKy5tYXQtZm9ybS1maWVsZC1sYWJlbC13cmFwcGVyIC5tYXQtZm9ybS1maWVsZC1sYWJlbCwubWF0LWZvcm0tZmllbGQtY2FuLWZsb2F0Lm1hdC1mb3JtLWZpZWxkLXNob3VsZC1mbG9hdCAubWF0LWZvcm0tZmllbGQtbGFiZWx7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWSgtMS4zNDM3NWVtKSBzY2FsZSguNzUpO3RyYW5zZm9ybTp0cmFuc2xhdGVZKC0xLjM0Mzc1ZW0pIHNjYWxlKC43NSk7d2lkdGg6MTMzLjMzMzMzJX0ubWF0LWZvcm0tZmllbGQtY2FuLWZsb2F0IC5tYXQtaW5wdXQtc2VydmVyW2xhYmVsXTpub3QoOmxhYmVsLXNob3duKSsubWF0LWZvcm0tZmllbGQtbGFiZWwtd3JhcHBlciAubWF0LWZvcm0tZmllbGQtbGFiZWx7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWSgtMS4zNDM3NGVtKSBzY2FsZSguNzUpO3RyYW5zZm9ybTp0cmFuc2xhdGVZKC0xLjM0Mzc0ZW0pIHNjYWxlKC43NSk7d2lkdGg6MTMzLjMzMzM0JX0ubWF0LWZvcm0tZmllbGQtbGFiZWwtd3JhcHBlcnt0b3A6LS44NDM3NWVtO3BhZGRpbmctdG9wOi44NDM3NWVtfS5tYXQtZm9ybS1maWVsZC1sYWJlbHt0b3A6MS4zNDM3NWVtfS5tYXQtZm9ybS1maWVsZC11bmRlcmxpbmV7Ym90dG9tOjEuMzQzNzVlbX0ubWF0LWZvcm0tZmllbGQtc3Vic2NyaXB0LXdyYXBwZXJ7Zm9udC1zaXplOjc1JTttYXJnaW4tdG9wOi42NjY2N2VtO3RvcDpjYWxjKDEwMCUgLSAxLjc5MTY3ZW0pfS5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLWxlZ2FjeSAubWF0LWZvcm0tZmllbGQtd3JhcHBlcntwYWRkaW5nLWJvdHRvbToxLjI1ZW19Lm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2UtbGVnYWN5IC5tYXQtZm9ybS1maWVsZC1pbmZpeHtwYWRkaW5nOi40Mzc1ZW0gMH0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1sZWdhY3kubWF0LWZvcm0tZmllbGQtY2FuLWZsb2F0IC5tYXQtaW5wdXQtc2VydmVyOmZvY3VzKy5tYXQtZm9ybS1maWVsZC1sYWJlbC13cmFwcGVyIC5tYXQtZm9ybS1maWVsZC1sYWJlbCwubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1sZWdhY3kubWF0LWZvcm0tZmllbGQtY2FuLWZsb2F0Lm1hdC1mb3JtLWZpZWxkLXNob3VsZC1mbG9hdCAubWF0LWZvcm0tZmllbGQtbGFiZWx7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWSgtMS4yODEyNWVtKSBzY2FsZSguNzUpIHBlcnNwZWN0aXZlKDEwMHB4KSB0cmFuc2xhdGVaKC4wMDFweCk7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTEuMjgxMjVlbSkgc2NhbGUoLjc1KSBwZXJzcGVjdGl2ZSgxMDBweCkgdHJhbnNsYXRlWiguMDAxcHgpOy1tcy10cmFuc2Zvcm06dHJhbnNsYXRlWSgtMS4yODEyNWVtKSBzY2FsZSguNzUpO3dpZHRoOjEzMy4zMzMzMyV9Lm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2UtbGVnYWN5Lm1hdC1mb3JtLWZpZWxkLWNhbi1mbG9hdCAubWF0LWZvcm0tZmllbGQtYXV0b2ZpbGwtY29udHJvbDotd2Via2l0LWF1dG9maWxsKy5tYXQtZm9ybS1maWVsZC1sYWJlbC13cmFwcGVyIC5tYXQtZm9ybS1maWVsZC1sYWJlbHstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVZKC0xLjI4MTI1ZW0pIHNjYWxlKC43NSkgcGVyc3BlY3RpdmUoMTAwcHgpIHRyYW5zbGF0ZVooLjAwMTAxcHgpO3RyYW5zZm9ybTp0cmFuc2xhdGVZKC0xLjI4MTI1ZW0pIHNjYWxlKC43NSkgcGVyc3BlY3RpdmUoMTAwcHgpIHRyYW5zbGF0ZVooLjAwMTAxcHgpOy1tcy10cmFuc2Zvcm06dHJhbnNsYXRlWSgtMS4yODEyNGVtKSBzY2FsZSguNzUpO3dpZHRoOjEzMy4zMzMzNCV9Lm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2UtbGVnYWN5Lm1hdC1mb3JtLWZpZWxkLWNhbi1mbG9hdCAubWF0LWlucHV0LXNlcnZlcltsYWJlbF06bm90KDpsYWJlbC1zaG93bikrLm1hdC1mb3JtLWZpZWxkLWxhYmVsLXdyYXBwZXIgLm1hdC1mb3JtLWZpZWxkLWxhYmVsey13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTEuMjgxMjVlbSkgc2NhbGUoLjc1KSBwZXJzcGVjdGl2ZSgxMDBweCkgdHJhbnNsYXRlWiguMDAxMDJweCk7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTEuMjgxMjVlbSkgc2NhbGUoLjc1KSBwZXJzcGVjdGl2ZSgxMDBweCkgdHJhbnNsYXRlWiguMDAxMDJweCk7LW1zLXRyYW5zZm9ybTp0cmFuc2xhdGVZKC0xLjI4MTIzZW0pIHNjYWxlKC43NSk7d2lkdGg6MTMzLjMzMzM1JX0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1sZWdhY3kgLm1hdC1mb3JtLWZpZWxkLWxhYmVse3RvcDoxLjI4MTI1ZW19Lm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2UtbGVnYWN5IC5tYXQtZm9ybS1maWVsZC11bmRlcmxpbmV7Ym90dG9tOjEuMjVlbX0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1sZWdhY3kgLm1hdC1mb3JtLWZpZWxkLXN1YnNjcmlwdC13cmFwcGVye21hcmdpbi10b3A6LjU0MTY3ZW07dG9wOmNhbGMoMTAwJSAtIDEuNjY2NjdlbSl9Lm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2UtZmlsbCAubWF0LWZvcm0tZmllbGQtaW5maXh7cGFkZGluZzouMjVlbSAwIC43NWVtfS5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLWZpbGwgLm1hdC1mb3JtLWZpZWxkLWxhYmVse3RvcDoxLjA5Mzc1ZW07bWFyZ2luLXRvcDotLjVlbX0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1maWxsLm1hdC1mb3JtLWZpZWxkLWNhbi1mbG9hdCAubWF0LWlucHV0LXNlcnZlcjpmb2N1cysubWF0LWZvcm0tZmllbGQtbGFiZWwtd3JhcHBlciAubWF0LWZvcm0tZmllbGQtbGFiZWwsLm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2UtZmlsbC5tYXQtZm9ybS1maWVsZC1jYW4tZmxvYXQubWF0LWZvcm0tZmllbGQtc2hvdWxkLWZsb2F0IC5tYXQtZm9ybS1maWVsZC1sYWJlbHstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVZKC0uNTkzNzVlbSkgc2NhbGUoLjc1KTt0cmFuc2Zvcm06dHJhbnNsYXRlWSgtLjU5Mzc1ZW0pIHNjYWxlKC43NSk7d2lkdGg6MTMzLjMzMzMzJX0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1maWxsLm1hdC1mb3JtLWZpZWxkLWNhbi1mbG9hdCAubWF0LWlucHV0LXNlcnZlcltsYWJlbF06bm90KDpsYWJlbC1zaG93bikrLm1hdC1mb3JtLWZpZWxkLWxhYmVsLXdyYXBwZXIgLm1hdC1mb3JtLWZpZWxkLWxhYmVsey13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZVkoLS41OTM3NGVtKSBzY2FsZSguNzUpO3RyYW5zZm9ybTp0cmFuc2xhdGVZKC0uNTkzNzRlbSkgc2NhbGUoLjc1KTt3aWR0aDoxMzMuMzMzMzQlfS5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLW91dGxpbmUgLm1hdC1mb3JtLWZpZWxkLWluZml4e3BhZGRpbmc6MWVtIDB9Lm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2Utb3V0bGluZSAubWF0LWZvcm0tZmllbGQtbGFiZWx7dG9wOjEuODQzNzVlbTttYXJnaW4tdG9wOi0uMjVlbX0ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1vdXRsaW5lLm1hdC1mb3JtLWZpZWxkLWNhbi1mbG9hdCAubWF0LWlucHV0LXNlcnZlcjpmb2N1cysubWF0LWZvcm0tZmllbGQtbGFiZWwtd3JhcHBlciAubWF0LWZvcm0tZmllbGQtbGFiZWwsLm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2Utb3V0bGluZS5tYXQtZm9ybS1maWVsZC1jYW4tZmxvYXQubWF0LWZvcm0tZmllbGQtc2hvdWxkLWZsb2F0IC5tYXQtZm9ybS1maWVsZC1sYWJlbHstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGVZKC0xLjU5Mzc1ZW0pIHNjYWxlKC43NSk7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTEuNTkzNzVlbSkgc2NhbGUoLjc1KTt3aWR0aDoxMzMuMzMzMzMlfS5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLW91dGxpbmUubWF0LWZvcm0tZmllbGQtY2FuLWZsb2F0IC5tYXQtaW5wdXQtc2VydmVyW2xhYmVsXTpub3QoOmxhYmVsLXNob3duKSsubWF0LWZvcm0tZmllbGQtbGFiZWwtd3JhcHBlciAubWF0LWZvcm0tZmllbGQtbGFiZWx7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWSgtMS41OTM3NGVtKSBzY2FsZSguNzUpO3RyYW5zZm9ybTp0cmFuc2xhdGVZKC0xLjU5Mzc0ZW0pIHNjYWxlKC43NSk7d2lkdGg6MTMzLjMzMzM0JX0ubWF0LWdyaWQtdGlsZS1mb290ZXIsLm1hdC1ncmlkLXRpbGUtaGVhZGVye2ZvbnQtc2l6ZToxNHB4fS5tYXQtZ3JpZC10aWxlLWZvb3RlciAubWF0LWxpbmUsLm1hdC1ncmlkLXRpbGUtaGVhZGVyIC5tYXQtbGluZXt3aGl0ZS1zcGFjZTpub3dyYXA7b3ZlcmZsb3c6aGlkZGVuO3RleHQtb3ZlcmZsb3c6ZWxsaXBzaXM7ZGlzcGxheTpibG9jaztib3gtc2l6aW5nOmJvcmRlci1ib3h9Lm1hdC1ncmlkLXRpbGUtZm9vdGVyIC5tYXQtbGluZTpudGgtY2hpbGQobisyKSwubWF0LWdyaWQtdGlsZS1oZWFkZXIgLm1hdC1saW5lOm50aC1jaGlsZChuKzIpe2ZvbnQtc2l6ZToxMnB4fWlucHV0Lm1hdC1pbnB1dC1lbGVtZW50e21hcmdpbi10b3A6LS4wNjI1ZW19Lm1hdC1tZW51LWl0ZW17Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO2ZvbnQtc2l6ZToxNnB4O2ZvbnQtd2VpZ2h0OjQwMH0ubWF0LXBhZ2luYXRvciwubWF0LXBhZ2luYXRvci1wYWdlLXNpemUgLm1hdC1zZWxlY3QtdHJpZ2dlcntmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWY7Zm9udC1zaXplOjEycHh9Lm1hdC1yYWRpby1idXR0b24sLm1hdC1zZWxlY3R7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmfS5tYXQtc2VsZWN0LXRyaWdnZXJ7aGVpZ2h0OjEuMTI1ZW19Lm1hdC1zbGlkZS10b2dnbGUtY29udGVudHtmb250OjQwMCAxNHB4LzIwcHggUm9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmfS5tYXQtc2xpZGVyLXRodW1iLWxhYmVsLXRleHR7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO2ZvbnQtc2l6ZToxMnB4O2ZvbnQtd2VpZ2h0OjUwMH0ubWF0LXN0ZXBwZXItaG9yaXpvbnRhbCwubWF0LXN0ZXBwZXItdmVydGljYWx7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmfS5tYXQtc3RlcC1sYWJlbHtmb250LXNpemU6MTRweDtmb250LXdlaWdodDo0MDB9Lm1hdC1zdGVwLWxhYmVsLXNlbGVjdGVke2ZvbnQtc2l6ZToxNHB4O2ZvbnQtd2VpZ2h0OjUwMH0ubWF0LXRhYi1ncm91cHtmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWZ9Lm1hdC10YWItbGFiZWwsLm1hdC10YWItbGlua3tmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWY7Zm9udC1zaXplOjE0cHg7Zm9udC13ZWlnaHQ6NTAwfS5tYXQtdG9vbGJhciwubWF0LXRvb2xiYXIgaDEsLm1hdC10b29sYmFyIGgyLC5tYXQtdG9vbGJhciBoMywubWF0LXRvb2xiYXIgaDQsLm1hdC10b29sYmFyIGg1LC5tYXQtdG9vbGJhciBoNntmb250OjUwMCAyMHB4LzMycHggUm9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO21hcmdpbjowfS5tYXQtdG9vbHRpcHtmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWY7Zm9udC1zaXplOjEwcHg7cGFkZGluZy10b3A6NnB4O3BhZGRpbmctYm90dG9tOjZweH0ubWF0LXRvb2x0aXAtaGFuZHNldHtmb250LXNpemU6MTRweDtwYWRkaW5nLXRvcDo5cHg7cGFkZGluZy1ib3R0b206OXB4fS5tYXQtbGlzdC1pdGVtLC5tYXQtbGlzdC1vcHRpb257Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmfS5tYXQtbGlzdCAubWF0LWxpc3QtaXRlbSwubWF0LW5hdi1saXN0IC5tYXQtbGlzdC1pdGVtLC5tYXQtc2VsZWN0aW9uLWxpc3QgLm1hdC1saXN0LWl0ZW17Zm9udC1zaXplOjE2cHh9Lm1hdC1saXN0IC5tYXQtbGlzdC1pdGVtIC5tYXQtbGluZSwubWF0LW5hdi1saXN0IC5tYXQtbGlzdC1pdGVtIC5tYXQtbGluZSwubWF0LXNlbGVjdGlvbi1saXN0IC5tYXQtbGlzdC1pdGVtIC5tYXQtbGluZXt3aGl0ZS1zcGFjZTpub3dyYXA7b3ZlcmZsb3c6aGlkZGVuO3RleHQtb3ZlcmZsb3c6ZWxsaXBzaXM7ZGlzcGxheTpibG9jaztib3gtc2l6aW5nOmJvcmRlci1ib3h9Lm1hdC1saXN0IC5tYXQtbGlzdC1pdGVtIC5tYXQtbGluZTpudGgtY2hpbGQobisyKSwubWF0LW5hdi1saXN0IC5tYXQtbGlzdC1pdGVtIC5tYXQtbGluZTpudGgtY2hpbGQobisyKSwubWF0LXNlbGVjdGlvbi1saXN0IC5tYXQtbGlzdC1pdGVtIC5tYXQtbGluZTpudGgtY2hpbGQobisyKXtmb250LXNpemU6MTRweH0ubWF0LWxpc3QgLm1hdC1saXN0LW9wdGlvbiwubWF0LW5hdi1saXN0IC5tYXQtbGlzdC1vcHRpb24sLm1hdC1zZWxlY3Rpb24tbGlzdCAubWF0LWxpc3Qtb3B0aW9ue2ZvbnQtc2l6ZToxNnB4fS5tYXQtbGlzdCAubWF0LWxpc3Qtb3B0aW9uIC5tYXQtbGluZSwubWF0LW5hdi1saXN0IC5tYXQtbGlzdC1vcHRpb24gLm1hdC1saW5lLC5tYXQtc2VsZWN0aW9uLWxpc3QgLm1hdC1saXN0LW9wdGlvbiAubWF0LWxpbmV7d2hpdGUtc3BhY2U6bm93cmFwO292ZXJmbG93OmhpZGRlbjt0ZXh0LW92ZXJmbG93OmVsbGlwc2lzO2Rpc3BsYXk6YmxvY2s7Ym94LXNpemluZzpib3JkZXItYm94fS5tYXQtbGlzdCAubWF0LWxpc3Qtb3B0aW9uIC5tYXQtbGluZTpudGgtY2hpbGQobisyKSwubWF0LW5hdi1saXN0IC5tYXQtbGlzdC1vcHRpb24gLm1hdC1saW5lOm50aC1jaGlsZChuKzIpLC5tYXQtc2VsZWN0aW9uLWxpc3QgLm1hdC1saXN0LW9wdGlvbiAubWF0LWxpbmU6bnRoLWNoaWxkKG4rMil7Zm9udC1zaXplOjE0cHh9Lm1hdC1saXN0IC5tYXQtc3ViaGVhZGVyLC5tYXQtbmF2LWxpc3QgLm1hdC1zdWJoZWFkZXIsLm1hdC1zZWxlY3Rpb24tbGlzdCAubWF0LXN1YmhlYWRlcntmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWY7Zm9udC1zaXplOjE0cHg7Zm9udC13ZWlnaHQ6NTAwfS5tYXQtbGlzdFtkZW5zZV0gLm1hdC1saXN0LWl0ZW0sLm1hdC1uYXYtbGlzdFtkZW5zZV0gLm1hdC1saXN0LWl0ZW0sLm1hdC1zZWxlY3Rpb24tbGlzdFtkZW5zZV0gLm1hdC1saXN0LWl0ZW17Zm9udC1zaXplOjEycHh9Lm1hdC1saXN0W2RlbnNlXSAubWF0LWxpc3QtaXRlbSAubWF0LWxpbmUsLm1hdC1uYXYtbGlzdFtkZW5zZV0gLm1hdC1saXN0LWl0ZW0gLm1hdC1saW5lLC5tYXQtc2VsZWN0aW9uLWxpc3RbZGVuc2VdIC5tYXQtbGlzdC1pdGVtIC5tYXQtbGluZXt3aGl0ZS1zcGFjZTpub3dyYXA7b3ZlcmZsb3c6aGlkZGVuO3RleHQtb3ZlcmZsb3c6ZWxsaXBzaXM7ZGlzcGxheTpibG9jaztib3gtc2l6aW5nOmJvcmRlci1ib3h9Lm1hdC1saXN0W2RlbnNlXSAubWF0LWxpc3QtaXRlbSAubWF0LWxpbmU6bnRoLWNoaWxkKG4rMiksLm1hdC1saXN0W2RlbnNlXSAubWF0LWxpc3Qtb3B0aW9uLC5tYXQtbmF2LWxpc3RbZGVuc2VdIC5tYXQtbGlzdC1pdGVtIC5tYXQtbGluZTpudGgtY2hpbGQobisyKSwubWF0LW5hdi1saXN0W2RlbnNlXSAubWF0LWxpc3Qtb3B0aW9uLC5tYXQtc2VsZWN0aW9uLWxpc3RbZGVuc2VdIC5tYXQtbGlzdC1pdGVtIC5tYXQtbGluZTpudGgtY2hpbGQobisyKSwubWF0LXNlbGVjdGlvbi1saXN0W2RlbnNlXSAubWF0LWxpc3Qtb3B0aW9ue2ZvbnQtc2l6ZToxMnB4fS5tYXQtbGlzdFtkZW5zZV0gLm1hdC1saXN0LW9wdGlvbiAubWF0LWxpbmUsLm1hdC1uYXYtbGlzdFtkZW5zZV0gLm1hdC1saXN0LW9wdGlvbiAubWF0LWxpbmUsLm1hdC1zZWxlY3Rpb24tbGlzdFtkZW5zZV0gLm1hdC1saXN0LW9wdGlvbiAubWF0LWxpbmV7d2hpdGUtc3BhY2U6bm93cmFwO292ZXJmbG93OmhpZGRlbjt0ZXh0LW92ZXJmbG93OmVsbGlwc2lzO2Rpc3BsYXk6YmxvY2s7Ym94LXNpemluZzpib3JkZXItYm94fS5tYXQtbGlzdFtkZW5zZV0gLm1hdC1saXN0LW9wdGlvbiAubWF0LWxpbmU6bnRoLWNoaWxkKG4rMiksLm1hdC1uYXYtbGlzdFtkZW5zZV0gLm1hdC1saXN0LW9wdGlvbiAubWF0LWxpbmU6bnRoLWNoaWxkKG4rMiksLm1hdC1zZWxlY3Rpb24tbGlzdFtkZW5zZV0gLm1hdC1saXN0LW9wdGlvbiAubWF0LWxpbmU6bnRoLWNoaWxkKG4rMil7Zm9udC1zaXplOjEycHh9Lm1hdC1saXN0W2RlbnNlXSAubWF0LXN1YmhlYWRlciwubWF0LW5hdi1saXN0W2RlbnNlXSAubWF0LXN1YmhlYWRlciwubWF0LXNlbGVjdGlvbi1saXN0W2RlbnNlXSAubWF0LXN1YmhlYWRlcntmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWY7Zm9udC1zaXplOjEycHg7Zm9udC13ZWlnaHQ6NTAwfS5tYXQtb3B0aW9ue2ZvbnQtZmFtaWx5OlJvYm90byxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjtmb250LXNpemU6MTZweH0ubWF0LW9wdGdyb3VwLWxhYmVse2ZvbnQ6NTAwIDE0cHgvMjRweCBSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWZ9Lm1hdC1zaW1wbGUtc25hY2tiYXJ7Zm9udC1mYW1pbHk6Um9ib3RvLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmO2ZvbnQtc2l6ZToxNHB4fS5tYXQtc2ltcGxlLXNuYWNrYmFyLWFjdGlvbntsaW5lLWhlaWdodDoxO2ZvbnQtZmFtaWx5OmluaGVyaXQ7Zm9udC1zaXplOmluaGVyaXQ7Zm9udC13ZWlnaHQ6NTAwfS5tYXQtdHJlZXtmb250LWZhbWlseTpSb2JvdG8sXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWZ9Lm1hdC10cmVlLW5vZGV7Zm9udC13ZWlnaHQ6NDAwO2ZvbnQtc2l6ZToxNHB4fS5tYXQtcmlwcGxle292ZXJmbG93OmhpZGRlbn0ubWF0LXJpcHBsZS5tYXQtcmlwcGxlLXVuYm91bmRlZHtvdmVyZmxvdzp2aXNpYmxlfS5tYXQtcmlwcGxlLWVsZW1lbnR7cG9zaXRpb246YWJzb2x1dGU7Ym9yZGVyLXJhZGl1czo1MCU7cG9pbnRlci1ldmVudHM6bm9uZTt0cmFuc2l0aW9uOm9wYWNpdHksLXdlYmtpdC10cmFuc2Zvcm0gMHMgY3ViaWMtYmV6aWVyKDAsMCwuMiwxKTt0cmFuc2l0aW9uOm9wYWNpdHksdHJhbnNmb3JtIDBzIGN1YmljLWJlemllcigwLDAsLjIsMSk7dHJhbnNpdGlvbjpvcGFjaXR5LHRyYW5zZm9ybSAwcyBjdWJpYy1iZXppZXIoMCwwLC4yLDEpLC13ZWJraXQtdHJhbnNmb3JtIDBzIGN1YmljLWJlemllcigwLDAsLjIsMSk7LXdlYmtpdC10cmFuc2Zvcm06c2NhbGUoMCk7dHJhbnNmb3JtOnNjYWxlKDApfUBtZWRpYSBzY3JlZW4gYW5kICgtbXMtaGlnaC1jb250cmFzdDphY3RpdmUpey5tYXQtcmlwcGxlLWVsZW1lbnR7ZGlzcGxheTpub25lfX0uY2RrLXZpc3VhbGx5LWhpZGRlbntib3JkZXI6MDtjbGlwOnJlY3QoMCAwIDAgMCk7aGVpZ2h0OjFweDttYXJnaW46LTFweDtvdmVyZmxvdzpoaWRkZW47cGFkZGluZzowO3Bvc2l0aW9uOmFic29sdXRlO3dpZHRoOjFweDtvdXRsaW5lOjA7LXdlYmtpdC1hcHBlYXJhbmNlOm5vbmU7LW1vei1hcHBlYXJhbmNlOm5vbmV9LmNkay1nbG9iYWwtb3ZlcmxheS13cmFwcGVyLC5jZGstb3ZlcmxheS1jb250YWluZXJ7cG9pbnRlci1ldmVudHM6bm9uZTt0b3A6MDtsZWZ0OjA7aGVpZ2h0OjEwMCU7d2lkdGg6MTAwJX0uY2RrLW92ZXJsYXktY29udGFpbmVye3Bvc2l0aW9uOmZpeGVkO3otaW5kZXg6MTAwMH0uY2RrLW92ZXJsYXktY29udGFpbmVyOmVtcHR5e2Rpc3BsYXk6bm9uZX0uY2RrLWdsb2JhbC1vdmVybGF5LXdyYXBwZXJ7ZGlzcGxheTpmbGV4O3Bvc2l0aW9uOmFic29sdXRlO3otaW5kZXg6MTAwMH0uY2RrLW92ZXJsYXktcGFuZXtwb3NpdGlvbjphYnNvbHV0ZTtwb2ludGVyLWV2ZW50czphdXRvO2JveC1zaXppbmc6Ym9yZGVyLWJveDt6LWluZGV4OjEwMDA7ZGlzcGxheTpmbGV4O21heC13aWR0aDoxMDAlO21heC1oZWlnaHQ6MTAwJX0uY2RrLW92ZXJsYXktYmFja2Ryb3B7cG9zaXRpb246YWJzb2x1dGU7dG9wOjA7Ym90dG9tOjA7bGVmdDowO3JpZ2h0OjA7ei1pbmRleDoxMDAwO3BvaW50ZXItZXZlbnRzOmF1dG87LXdlYmtpdC10YXAtaGlnaGxpZ2h0LWNvbG9yOnRyYW5zcGFyZW50O3RyYW5zaXRpb246b3BhY2l0eSAuNHMgY3ViaWMtYmV6aWVyKC4yNSwuOCwuMjUsMSk7b3BhY2l0eTowfS5jZGstb3ZlcmxheS1iYWNrZHJvcC5jZGstb3ZlcmxheS1iYWNrZHJvcC1zaG93aW5ne29wYWNpdHk6MX1AbWVkaWEgc2NyZWVuIGFuZCAoLW1zLWhpZ2gtY29udHJhc3Q6YWN0aXZlKXsuY2RrLW92ZXJsYXktYmFja2Ryb3AuY2RrLW92ZXJsYXktYmFja2Ryb3Atc2hvd2luZ3tvcGFjaXR5Oi42fX0uY2RrLW92ZXJsYXktZGFyay1iYWNrZHJvcHtiYWNrZ3JvdW5kOnJnYmEoMCwwLDAsLjI4OCl9LmNkay1vdmVybGF5LXRyYW5zcGFyZW50LWJhY2tkcm9wLC5jZGstb3ZlcmxheS10cmFuc3BhcmVudC1iYWNrZHJvcC5jZGstb3ZlcmxheS1iYWNrZHJvcC1zaG93aW5ne29wYWNpdHk6MH0uY2RrLW92ZXJsYXktY29ubmVjdGVkLXBvc2l0aW9uLWJvdW5kaW5nLWJveHtwb3NpdGlvbjphYnNvbHV0ZTt6LWluZGV4OjEwMDA7ZGlzcGxheTpmbGV4O2ZsZXgtZGlyZWN0aW9uOmNvbHVtbjttaW4td2lkdGg6MXB4O21pbi1oZWlnaHQ6MXB4fS5jZGstZ2xvYmFsLXNjcm9sbGJsb2Nre3Bvc2l0aW9uOmZpeGVkO3dpZHRoOjEwMCU7b3ZlcmZsb3cteTpzY3JvbGx9LmNkay10ZXh0LWZpZWxkLWF1dG9maWxsLW1vbml0b3JlZDotd2Via2l0LWF1dG9maWxsey13ZWJraXQtYW5pbWF0aW9uLW5hbWU6Y2RrLXRleHQtZmllbGQtYXV0b2ZpbGwtc3RhcnQ7YW5pbWF0aW9uLW5hbWU6Y2RrLXRleHQtZmllbGQtYXV0b2ZpbGwtc3RhcnR9LmNkay10ZXh0LWZpZWxkLWF1dG9maWxsLW1vbml0b3JlZDpub3QoOi13ZWJraXQtYXV0b2ZpbGwpey13ZWJraXQtYW5pbWF0aW9uLW5hbWU6Y2RrLXRleHQtZmllbGQtYXV0b2ZpbGwtZW5kO2FuaW1hdGlvbi1uYW1lOmNkay10ZXh0LWZpZWxkLWF1dG9maWxsLWVuZH10ZXh0YXJlYS5jZGstdGV4dGFyZWEtYXV0b3NpemV7cmVzaXplOm5vbmV9dGV4dGFyZWEuY2RrLXRleHRhcmVhLWF1dG9zaXplLW1lYXN1cmluZ3toZWlnaHQ6YXV0byFpbXBvcnRhbnQ7b3ZlcmZsb3c6aGlkZGVuIWltcG9ydGFudDtwYWRkaW5nOjJweCAwIWltcG9ydGFudDtib3gtc2l6aW5nOmNvbnRlbnQtYm94IWltcG9ydGFudH0ucWEtbW9kZS1hY3RpdmV7Y3Vyc29yOmNyb3NzaGFpcn1gXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNJbWFnZU1hcmtlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgQElucHV0KCkgcmVuZGVyOiBhbnk7XG5cbiAgQElucHV0KClcbiAgc2V0IHFhTW9kZUFjdGl2ZSh2OiBib29sZWFuKSB7XG4gICAgaWYgKHRoaXMuX3FhTW9kZUFjdGl2ZSAhPT0gdikge1xuICAgICAgdGhpcy5fcWFNb2RlQWN0aXZlID0gdjtcbiAgICAgIC8vIFRPRE86IGZpeCBtZVxuICAgICAgaWYgKCF0aGlzLmV4aXN0c0V2ZW50cykge1xuICAgICAgICB0aGlzLmFkZExpc3RlbmVycyh0aGlzLmRlY01hcmtzLm1hcmtzV3JhcHBlci5uYXRpdmVFbGVtZW50LCB0aGlzLmRlY01hcmtzLmltZ1JlZi5uYXRpdmVFbGVtZW50KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBnZXQgcWFNb2RlQWN0aXZlKCkge1xuICAgIHJldHVybiB0aGlzLl9xYU1vZGVBY3RpdmU7XG4gIH1cblxuICBwcml2YXRlIF9xYU1vZGVBY3RpdmU6IGJvb2xlYW47XG5cbiAgcHJpdmF0ZSBleGlzdHNFdmVudHMgPSBmYWxzZTtcblxuICBwcml2YXRlIHJlcXVlc3RCeUNsaWVudCA9IGZhbHNlO1xuXG4gIC8vIEV2ZW50cyBjb250cm9sc1xuICBwcml2YXRlIG1vdXNlZG93biA9IGZhbHNlO1xuXG4gIHByaXZhdGUgbW91c2V1cCA9IHRydWU7XG5cbiAgcHJpdmF0ZSBtb3VzZW1vdmUgPSBmYWxzZTtcblxuICBwcml2YXRlIHN0YXJ0WDtcblxuICBwcml2YXRlIHN0YXJ0WTtcblxuICBwcml2YXRlIHNxdWFyZU1hcms6IEhUTUxEaXZFbGVtZW50O1xuXG5cbiAgQFZpZXdDaGlsZChEZWNJbWFnZU1hcmtzQ29tcG9uZW50KSBkZWNNYXJrczogRGVjSW1hZ2VNYXJrc0NvbXBvbmVudDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRpYWxvZzogTWF0RGlhbG9nLCBwcml2YXRlIHRyYW5zbGF0ZVNlcnZpY2U6IFRyYW5zbGF0ZVNlcnZpY2UpIHsgfVxuXG4gIG5nT25Jbml0KCkgeyB9XG5cbiAgZGVsZXRlTWFyayh0YXJnZXQsIGNvbW1lbnRJbmRleCkge1xuXG4gICAgdGhpcy5yZW1vdmVUYWcodGFyZ2V0KTtcblxuICAgIHRoaXMucmVtb3ZlQ29tbWVudChjb21tZW50SW5kZXgpO1xuXG4gICAgdGhpcy5yZWZyZXNoVGFnc051bWJlcigpO1xuXG4gIH1cblxuICBwcml2YXRlIHJlbW92ZVRhZyh0YXJnZXQpIHtcblxuICAgIGlmICh0YXJnZXQucGFyZW50RWxlbWVudCAmJiB0YXJnZXQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ3NxdWFyZS10YWcnKSkge1xuXG4gICAgICB0YXJnZXQucGFyZW50RWxlbWVudC5yZW1vdmUoKTtcblxuICAgIH0gZWxzZSB7XG5cbiAgICAgIHRhcmdldC5yZW1vdmUoKTtcblxuICAgIH1cblxuICB9XG5cbiAgcHJpdmF0ZSByZW1vdmVDb21tZW50KGNvbW1lbnRJbmRleCkge1xuXG4gICAgY29uc3QgaW5kZXggPSBjb21tZW50SW5kZXg7XG5cbiAgICB0aGlzLnJlbmRlci5jb21tZW50cy5zcGxpY2UoaW5kZXgsIDEpO1xuXG4gIH1cblxuICBwcml2YXRlIHJlZnJlc2hUYWdzTnVtYmVyKCkge1xuXG4gICAgQXJyYXkuZnJvbSh0aGlzLmRlY01hcmtzLm1hcmtzV3JhcHBlci5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wb2ludC10YWcnKSkuZm9yRWFjaCgocG9pbnQ6IEVsZW1lbnQsIGlkeCkgPT4ge1xuICAgICAgcG9pbnQuaW5uZXJIVE1MID0gKGlkeCArIDEpLnRvU3RyaW5nKCk7XG4gICAgfSk7XG5cbiAgfVxuXG4gIHByaXZhdGUgYWRkTGlzdGVuZXJzKHdyYXBwZXJFbGVtZW50OiBIVE1MRGl2RWxlbWVudCwgaW1hZ2VFbGVtZW50OiBIVE1MSW1hZ2VFbGVtZW50KTogYW55IHtcblxuICAgIHRoaXMub25Nb3VzZURvd24od3JhcHBlckVsZW1lbnQpO1xuXG4gICAgdGhpcy5vbkRyYWdTdGFydCh3cmFwcGVyRWxlbWVudCk7XG5cbiAgICB0aGlzLm9uTW91c2VNb3ZlKHdyYXBwZXJFbGVtZW50KTtcblxuICAgIHRoaXMub25Nb3VzZVVwKHdyYXBwZXJFbGVtZW50LCBpbWFnZUVsZW1lbnQpO1xuXG4gICAgdGhpcy5leGlzdHNFdmVudHMgPSB0cnVlO1xuXG4gIH1cblxuICBwcml2YXRlIG9uTW91c2VVcCh3cmFwcGVyRWxlbWVudCwgaW1hZ2VFbGVtZW50KSB7XG5cbiAgICB3cmFwcGVyRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgKGV2ZW50KSA9PiB7XG5cbiAgICAgIGNvbnN0IGluUWFNb2RlID0gdGhpcy5xYU1vZGVBY3RpdmU7XG5cbiAgICAgIGNvbnN0IG1vdXNlV2FzRG93biA9ICF0aGlzLm1vdXNldXA7XG5cbiAgICAgIGNvbnN0IGluQVBvaW50VGFnID0gKCg8RWxlbWVudD5ldmVudC50YXJnZXQpLmNsYXNzTGlzdC5jb250YWlucygncG9pbnQtdGFnJykpO1xuICAgICAgY29uc3Qgbm90SW5BUG9pbnRUYWcgPSAhaW5BUG9pbnRUYWc7XG5cbiAgICAgIGNvbnN0IHJlcXVlc3RCeUNsaWVudCA9ICgoPEVsZW1lbnQ+ZXZlbnQudGFyZ2V0KS5jbGFzc0xpc3QuY29udGFpbnMoJ2NsaWVudCcpKTtcblxuICAgICAgaWYgKGluUWFNb2RlICYmIG1vdXNlV2FzRG93biAmJiBub3RJbkFQb2ludFRhZykge1xuICAgICAgICB0aGlzLmNyZWF0ZU5ld1RhZyhpbWFnZUVsZW1lbnQpO1xuICAgICAgfVxuXG4gICAgICBpZiAoaW5RYU1vZGUgJiYgaW5BUG9pbnRUYWcgJiYgIXJlcXVlc3RCeUNsaWVudCkge1xuICAgICAgICB0aGlzLmVkaXRDb21tZW50KGV2ZW50KTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5tb3VzZW1vdmUgPSBmYWxzZTtcbiAgICAgIHRoaXMubW91c2V1cCA9IHRydWU7XG4gICAgfSk7XG5cbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlTmV3VGFnKGltYWdlRWxlbWVudCkge1xuXG4gICAgdGhpcy5tb3VzZWRvd24gPSBmYWxzZTtcblxuICAgIGNvbnN0IHggPSBNYXRoLnJvdW5kKCgodGhpcy5zdGFydFggLyBpbWFnZUVsZW1lbnQuaGVpZ2h0KSAqIDEwMCkgKiAxMDApIC8gMTAwO1xuXG4gICAgY29uc3QgeSA9IE1hdGgucm91bmQoKCh0aGlzLnN0YXJ0WSAvIGltYWdlRWxlbWVudC53aWR0aCkgKiAxMDApICogMTAwKSAvIDEwMDtcblxuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5yZW5kZXIuY29tbWVudHMubGVuZ3RoICsgMTtcblxuICAgIGlmICh0aGlzLm1vdXNlbW92ZSkge1xuXG4gICAgICB0aGlzLmRyYXdTcXVhcmVUYWcoZXZlbnQsIGltYWdlRWxlbWVudCwgaW5kZXgsIHgsIHkpO1xuXG4gICAgfSBlbHNlIHtcblxuICAgICAgdGhpcy5kcmF3UG9pbnRUYWcoaW5kZXgsIHgsIHkpO1xuXG4gICAgfVxuXG4gICAgdGhpcy5yZW1vdmVTcXVhcmVNYXJrKCk7XG5cbiAgfVxuXG4gIHByaXZhdGUgZWRpdENvbW1lbnQoZXZlbnQpIHtcblxuICAgIGNvbnN0IHRhcmdldCA9IDxFbGVtZW50PmV2ZW50LnRhcmdldDtcblxuICAgIGNvbnN0IGNvbW1lbnRJbmRleCA9IHBhcnNlSW50KHRhcmdldC5pbm5lckhUTUwsIDEwKSAtIDE7XG5cbiAgICBjb25zdCByZWYgPSB0aGlzLmRpYWxvZy5vcGVuKERlY0NvbW1lbnREaWFsb2dDb21wb25lbnQsIHtcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgdGl0bGU6IHRoaXMudHJhbnNsYXRlU2VydmljZS5pbnN0YW50KCdsYWJlbC5tYXJrZG93bnMnKSxcbiAgICAgICAgY29tbWVudDogdGhpcy5yZW5kZXIuY29tbWVudHNbY29tbWVudEluZGV4XSwgZWRpdGluZzogdHJ1ZVxuICAgICAgfSxcbiAgICAgIHdpZHRoOiAnNjE1cHgnXG4gICAgfSk7XG5cbiAgICByZWYuYWZ0ZXJDbG9zZWQoKS5zdWJzY3JpYmUocmVzcCA9PiB7XG5cbiAgICAgIGlmIChyZXNwID09PSAnZGVsZXRlJykge1xuXG4gICAgICAgIHRoaXMuZGVsZXRlTWFyayh0YXJnZXQsIGNvbW1lbnRJbmRleCk7XG5cbiAgICAgIH0gZWxzZSBpZiAocmVzcCkge1xuXG4gICAgICAgIHRoaXMucmVuZGVyLmNvbW1lbnRzW2NvbW1lbnRJbmRleF0uY29tbWVudCA9IHJlc3A7XG5cbiAgICAgIH1cblxuICAgIH0pO1xuXG4gIH1cblxuICBwcml2YXRlIGRyYXdQb2ludFRhZyhpbmRleCwgeCwgeSkge1xuXG4gICAgY29uc3QgcmVmID0gdGhpcy5kaWFsb2cub3BlbihEZWNDb21tZW50RGlhbG9nQ29tcG9uZW50LCB7XG4gICAgICBkYXRhOiB7XG4gICAgICAgIHRpdGxlOiB0aGlzLnRyYW5zbGF0ZVNlcnZpY2UuaW5zdGFudCgnbGFiZWwubWFya2Rvd25zJyksXG4gICAgICAgIGNvbW1lbnQ6IHt9XG4gICAgICB9LFxuICAgICAgd2lkdGg6ICc2MTVweCdcbiAgICB9KTtcblxuICAgIHJlZi5hZnRlckNsb3NlZCgpLnN1YnNjcmliZShyZXNwID0+IHtcbiAgICAgIGlmIChyZXNwKSB7XG4gICAgICAgIHRoaXMuZGVjTWFya3MuY3JlYXRlUG9pbnRUYWcoW3gsIHldLCBpbmRleCwgdGhpcy5yZXF1ZXN0QnlDbGllbnQpO1xuICAgICAgICB0aGlzLnJlbmRlci5jb21tZW50cy5wdXNoKHsgY29tbWVudDogcmVzcCwgY29vcmRpbmF0ZXM6IFt4LCB5XSB9KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICB9XG5cbiAgcHJpdmF0ZSBkcmF3U3F1YXJlVGFnKGV2ZW50LCBpbWFnZUVsZW1lbnQsIGluZGV4LCB4LCB5KSB7XG5cbiAgICBjb25zdCB4MiA9IE1hdGgucm91bmQoKChldmVudC5vZmZzZXRYIC8gaW1hZ2VFbGVtZW50LndpZHRoKSAqIDEwMCkgKiAxMDApIC8gMTAwO1xuICAgIGNvbnN0IHkyID0gTWF0aC5yb3VuZCgoKGV2ZW50Lm9mZnNldFkgLyBpbWFnZUVsZW1lbnQuaGVpZ2h0KSAqIDEwMCkgKiAxMDApIC8gMTAwO1xuXG4gICAgY29uc3QgcmVmID0gdGhpcy5kaWFsb2cub3BlbihEZWNDb21tZW50RGlhbG9nQ29tcG9uZW50LCB7XG4gICAgICBkYXRhOiB7XG4gICAgICAgIHRpdGxlOiB0aGlzLnRyYW5zbGF0ZVNlcnZpY2UuaW5zdGFudCgnbGFiZWwubWFya2Rvd25zJyksXG4gICAgICAgIGNvbW1lbnQ6IHt9XG4gICAgICB9LFxuICAgICAgd2lkdGg6ICc2MTVweCdcbiAgICB9KTtcblxuICAgIHJlZi5hZnRlckNsb3NlZCgpLnN1YnNjcmliZShyZXNwID0+IHtcbiAgICAgIGlmIChyZXNwKSB7XG4gICAgICAgIHRoaXMuZGVjTWFya3MuY3JlYXRlU3F1YXJlVGFnKFt4LCB5LCB4MiwgeTJdLCBpbmRleCwgdGhpcy5yZXF1ZXN0QnlDbGllbnQpO1xuICAgICAgICB0aGlzLnJlbmRlci5jb21tZW50cy5wdXNoKHsgY29tbWVudDogcmVzcCwgY29vcmRpbmF0ZXM6IFt4LCB5LCB4MiwgeTJdIH0pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gIH1cblxuICBwcml2YXRlIG9uTW91c2VEb3duKHdyYXBwZXJFbGVtZW50KSB7XG4gICAgd3JhcHBlckVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgKGV2ZW50KSA9PiB7XG4gICAgICBpZiAodGhpcy5xYU1vZGVBY3RpdmUgJiYgISgoPEVsZW1lbnQ+ZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygncG9pbnQtdGFnJykpKSkge1xuICAgICAgICB0aGlzLm1vdXNlZG93biA9IHRydWU7XG4gICAgICAgIHRoaXMubW91c2V1cCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnN0YXJ0WCA9IGV2ZW50Lm9mZnNldFg7XG4gICAgICAgIHRoaXMuc3RhcnRZID0gZXZlbnQub2Zmc2V0WTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgb25EcmFnU3RhcnQod3JhcHBlckVsZW1lbnQpIHtcbiAgICB3cmFwcGVyRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnc3RhcnQnLCAoZXZlbnQpID0+IHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIG9uTW91c2VNb3ZlKHdyYXBwZXJFbGVtZW50KSB7XG5cbiAgICB3cmFwcGVyRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCAoZXZlbnQpID0+IHtcblxuICAgICAgY29uc3Qgbm90Q2xpY2tpbmdJbkFueVRhZyA9ICEoKDxFbGVtZW50PmV2ZW50LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3BvaW50LXRhZycpKSk7XG5cbiAgICAgIGNvbnN0IGluUWFNb2RlID0gdGhpcy5xYU1vZGVBY3RpdmU7XG5cbiAgICAgIGNvbnN0IG1vdXNlSXNEb3duID0gdGhpcy5tb3VzZWRvd24gJiYgIXRoaXMubW91c2V1cDtcblxuICAgICAgaWYgKGluUWFNb2RlICYmIG1vdXNlSXNEb3duICYmIG5vdENsaWNraW5nSW5BbnlUYWcpIHtcblxuICAgICAgICB0aGlzLm1vdXNlbW92ZSA9IHRydWU7XG5cbiAgICAgICAgdGhpcy5lbnN1cmVOb01hcmsoKTtcblxuICAgICAgICB0aGlzLnNxdWFyZU1hcmsgPSB0aGlzLmNyZWF0ZU5ld1NxdWFyZU1hcmsoZXZlbnQpO1xuXG4gICAgICAgIHdyYXBwZXJFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuc3F1YXJlTWFyayk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMub25Nb3VzZUxlYXZlKHdyYXBwZXJFbGVtZW50KTtcblxuICAgICAgdGhpcy5vbk1vdXNlT3V0KHdyYXBwZXJFbGVtZW50KTtcblxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlTmV3U3F1YXJlTWFyayhldmVudCkge1xuICAgIGNvbnN0IHNxdWFyZU1hcmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBzcXVhcmVNYXJrLmlkID0gJ3NxdWFyZU1hcmsnO1xuICAgIHNxdWFyZU1hcmsuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgIHNxdWFyZU1hcmsuc3R5bGUucG9pbnRlckV2ZW50cyA9ICdub25lJztcbiAgICBzcXVhcmVNYXJrLnN0eWxlLmJvcmRlclN0eWxlID0gJ3NvbGlkJztcbiAgICBzcXVhcmVNYXJrLnN0eWxlLmJvcmRlckNvbG9yID0gJyNmMzNkM2MnO1xuICAgIHNxdWFyZU1hcmsuc3R5bGUuYm9yZGVyV2lkdGggPSAnMnB4JztcbiAgICBzcXVhcmVNYXJrLnN0eWxlLndpZHRoID0gYCR7KGV2ZW50Lm9mZnNldFggLSB0aGlzLnN0YXJ0WCl9cHhgO1xuICAgIHNxdWFyZU1hcmsuc3R5bGUuaGVpZ2h0ID0gYCR7KGV2ZW50Lm9mZnNldFkgLSB0aGlzLnN0YXJ0WSl9cHhgO1xuICAgIHNxdWFyZU1hcmsuc3R5bGUudG9wID0gdGhpcy5zdGFydFkgPiBldmVudC5vZmZzZXRZID8gYCR7ZXZlbnQub2Zmc2V0WX1weGAgOiBgJHt0aGlzLnN0YXJ0WX1weGA7XG4gICAgc3F1YXJlTWFyay5zdHlsZS5sZWZ0ID0gdGhpcy5zdGFydFggPiBldmVudC5vZmZzZXRYID8gYCR7ZXZlbnQub2Zmc2V0WH1weGAgOiBgJHt0aGlzLnN0YXJ0WH1weGA7XG4gICAgc3F1YXJlTWFyay5zdHlsZS53aWR0aCA9IGAke01hdGguYWJzKHRoaXMuc3RhcnRYIC0gZXZlbnQub2Zmc2V0WCl9cHhgO1xuICAgIHNxdWFyZU1hcmsuc3R5bGUuaGVpZ2h0ID0gYCR7TWF0aC5hYnModGhpcy5zdGFydFkgLSBldmVudC5vZmZzZXRZKX1weGA7XG4gICAgcmV0dXJuIHNxdWFyZU1hcms7XG4gIH1cblxuICBwcml2YXRlIG9uTW91c2VMZWF2ZSh3cmFwcGVyRWxlbWVudCkge1xuXG4gICAgd3JhcHBlckVsZW1lbnQub25tb3VzZWxlYXZlID0gKCkgPT4ge1xuICAgICAgaWYgKHRoaXMucWFNb2RlQWN0aXZlICYmIHRoaXMuc3F1YXJlTWFyaykge1xuICAgICAgICB0aGlzLm1vdXNlZG93biA9IGZhbHNlO1xuICAgICAgICB0aGlzLm1vdXNldXAgPSB0cnVlO1xuICAgICAgICB0aGlzLnNxdWFyZU1hcmsucmVtb3ZlKCk7XG4gICAgICB9XG4gICAgfTtcblxuICB9XG5cbiAgcHJpdmF0ZSBvbk1vdXNlT3V0KHdyYXBwZXJFbGVtZW50KSB7XG5cbiAgICB3cmFwcGVyRWxlbWVudC5vbm1vdXNlb3V0ID0gKCkgPT4ge1xuICAgICAgaWYgKHRoaXMucWFNb2RlQWN0aXZlICYmIHRoaXMuc3F1YXJlTWFyaykge1xuICAgICAgICB0aGlzLm1vdXNlZG93biA9IGZhbHNlO1xuICAgICAgICB0aGlzLm1vdXNldXAgPSB0cnVlO1xuICAgICAgICB0aGlzLnNxdWFyZU1hcmsucmVtb3ZlKCk7XG4gICAgICB9XG4gICAgfTtcblxuICB9XG5cbiAgcHJpdmF0ZSBlbnN1cmVOb01hcmsoKSB7XG5cbiAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NxdWFyZU1hcmsnKSkge1xuXG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3F1YXJlTWFyaycpLnJlbW92ZSgpO1xuXG4gICAgfVxuXG4gIH1cblxuICBwcml2YXRlIHJlbW92ZVNxdWFyZU1hcmsoKSB7XG5cbiAgICBpZiAodGhpcy5zcXVhcmVNYXJrKSB7XG5cbiAgICAgIHRoaXMuc3F1YXJlTWFyay5yZW1vdmUoKTtcblxuICAgIH1cbiAgfVxufVxuIl19