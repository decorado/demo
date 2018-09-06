/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, HostListener, Input, Output, EventEmitter, Renderer } from '@angular/core';
const /** @type {?} */ FALLBACK_IMAGE = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAAmJLR0QA/4ePzL8AAAAJcEhZcwAACxMAAAsTAQCanBgAAAALSURBVAjXY2BgAAAAAwABINWUxwAAAABJRU5' +
    'ErkJggg==';
const /** @type {?} */ LOADING_IMAGE = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWlkWU1pZCIg' +
    'Y2xhc3M9InVpbC1yaW5nIj48cGF0aCBmaWxsPSJub25lIiBjbGFzcz0iYmsiIGQ9Ik0wIDBoMTAwdjEwMEgweiIvPjxjaXJjbGUgY3g9Ijc1IiBjeT0iNzUiIHI9IjQ1IiBzdHJva2UtZGFzaGFycmF5PSIyMjYuMTk1IDU2LjU0OSI' +
    'gc3Ryb2tlPSIjMjMyZTM4IiBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjEwIj48YW5pbWF0ZVRyYW5zZm9ybSBhdHRyaWJ1dGVOYW1lPSJ0cmFuc2Zvcm0iIHR5cGU9InJvdGF0ZSIgdmFsdWVzPSIwIDc1IDc1OzE4MCA3NSA3NT' +
    'szNjAgNzUgNzU7IiBrZXlUaW1lcz0iMDswLjU7MSIgZHVyPSIxcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIGJlZ2luPSIwcyIvPjwvY2lyY2xlPjwvc3ZnPg==';
export class DecProductSpinComponent {
    /**
     * @param {?} renderer
     */
    constructor(renderer) {
        this.renderer = renderer;
        this.loadingImage = LOADING_IMAGE;
        this.looping = false;
        this.onlyModal = false;
        this.FALLBACK_IMAGE = FALLBACK_IMAGE;
        this.startInCenter = false;
        this.showOpenDialogButton = true;
        this.open = new EventEmitter();
        this.scenesLen = 0;
        this.mouseDown = false;
        this.markAsLoaded = (event) => {
            this.totalImagesLoaded++;
            if (this.totalImagesLoaded === this.scenesLen) {
                this.placeholderScene = this.scenes[0];
                this.loadingImages = false;
            }
        };
        this.goLeft = () => {
            if (this.scenes[this.frameShown - 1]) {
                this.frameShown--;
            }
            else if (this.looping) {
                this.frameShown = this.scenesLen - 1;
            }
        };
        this.goRight = () => {
            if (this.scenes[this.frameShown + 1]) {
                this.frameShown++;
            }
            else if (this.looping) {
                this.frameShown = 0;
            }
        };
        this.start = ($event) => {
            this.placeholderScene = LOADING_IMAGE;
            this.totalImagesLoaded = 0;
            this.loadingImages = true;
            this.started = true;
        };
        this.loaderPercentage = () => {
            return (this.scenesLen - this.totalImagesLoaded) > 0 ? ((100 / this.scenesLen) * this.totalImagesLoaded).toFixed(1) : 0;
        };
    }
    /**
     * @param {?} spin
     * @return {?}
     */
    set spin(spin) {
        if (spin) {
            const /** @type {?} */ scenes = this.loadScenes(spin);
            const /** @type {?} */ scenesChanged = !this.scenes || (scenes && this.scenes.join() !== scenes.join());
            if (scenesChanged) {
                this.resetScenesData(scenes);
                // this.resetStartPositionBasedOnCompany(spin, scenes);
            }
            this._spin = spin;
        }
    }
    /**
     * @return {?}
     */
    get spin() {
        return this._spin;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onDragStart(event) {
        event.stopPropagation();
        event.preventDefault();
        return false;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onMousedown(event) {
        event.stopPropagation();
        this.mouseDown = true;
        this.lastMouseEvent = event;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onMousemove(event) {
        if (this.mouseDown && this.started) {
            this.calculatePosition(event);
            // The width is divided by the amount of images. Moving from 0 to 100 will turn 360°
            if (Math.abs(this.positionDiff) >= this.interval) {
                if (this.positionDiff < 0) {
                    this.goRight();
                }
                else {
                    this.goLeft();
                }
                this.lastMouseEvent = event;
            }
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.frameShown = 0;
        this.renderer.listenGlobal('document', 'mouseup', (event) => {
            if (this.mouseDown) {
                this.mouseDown = false;
            }
        });
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    onOpen($event) {
        this.open.emit($event);
    }
    /**
     * @param {?} spin
     * @param {?} scenes
     * @return {?}
     */
    resetStartPositionBasedOnCompany(spin, scenes) {
        this.startInCenter = spin.company.id === 100 ? true : false;
        this.startInCenter = this.startInCenter && scenes.length <= 16;
    }
    /**
     * @param {?} scenes
     * @return {?}
     */
    resetScenesData(scenes) {
        this.placeholderScene = scenes[0];
        this.scenesLen = scenes.length;
        this.scenes = scenes;
    }
    /**
     * @param {?} spin
     * @return {?}
     */
    loadScenes(spin) {
        try {
            const /** @type {?} */ scenes = this.getUrlsFromSysFiles(spin.data.shots);
            return scenes && scenes.length > 0 ? scenes : [FALLBACK_IMAGE];
        }
        catch (/** @type {?} */ error) {
            return [FALLBACK_IMAGE];
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    calculatePosition(event) {
        const /** @type {?} */ target = event['target'];
        if (this.containerWidth !== target.clientWidth) {
            this.containerWidth = target.clientWidth;
            this.interval = (this.containerWidth / this.scenesLen) / 1.6;
        }
        this.positionDiff = event.clientX - this.lastMouseEvent.clientX;
    }
    /**
     * @param {?} sysFiles
     * @return {?}
     */
    getUrlsFromSysFiles(sysFiles) {
        if (!sysFiles) {
            return;
        }
        else {
            return sysFiles.map(file => {
                return file.renderFile.fileUrl;
            });
        }
    }
}
DecProductSpinComponent.decorators = [
    { type: Component, args: [{
                selector: 'dec-product-spin',
                template: `<div class="product-spinner-wrapper" *ngIf="scenes">
  <div [ngSwitch]="loadingImages ? true : false">

    <div *ngSwitchCase="true" class="overlay">
      <!-- Loading spinner -->
      <div [ngStyle]="{'background-image':'url(' + loadingImage + ')'}">{{loaderPercentage()}}%</div>
    </div>

    <div *ngSwitchCase="false" class="overlay">

      <!-- Overlay over the image (hand icon) -->
      <img class="frame" *ngIf="!onlyModal" src="//s3-sa-east-1.amazonaws.com/static-files-prod/platform/drag-horizontally.png" alt="" (click)="onlyModal ? '' : start($event)">

    </div>

  </div>

  <div [ngSwitch]="started ? true : false">

    <div *ngSwitchCase="true" class="frame">
      <!-- Images -->
      <img *ngFor="let scene of scenes; let i = index;"
        [src]="scene"
        draggable="false"
        class="no-drag image-only"
        (load)="markAsLoaded($event)"
        [ngClass]="frameShown === i && !loadingImages ? 'current-scene' : 'next-scene'">

    </div>

    <div *ngSwitchCase="false" class="frame">

      <!-- Placeholder image -->
      <img
        [src]="scenes[frameShown]"
        draggable="false"
        class="no-drag"
        (click)="onlyModal ? onOpen($event) : start($event)"
        [ngClass]="{'image-only': onlyModal}">

      <!-- Loading spinner -->
      <button
      *ngIf="showOpenDialogButton && !onlyModal"
      mat-icon-button
      (click)="onOpen($event)"
      [matTooltip]="'label.open' | translate"
      class="dialog-button"
      type="button"
      color="default">
        <mat-icon aria-label="Swap between Reference and Render images" color="primary" contrastFontWithBg >fullscreen</mat-icon>
      </button>

    </div>

  </div>
</div>
`,
                styles: [`.product-spinner-wrapper{display:block;position:relative}.product-spinner-wrapper:hover .frame{opacity:1}.product-spinner-wrapper:hover .overlay{display:none}.product-spinner-wrapper .frame{display:block;width:100%;background-size:contain;background-repeat:no-repeat;background-position:center center;opacity:.5;transition:opacity .3s ease;cursor:move}.product-spinner-wrapper .frame.image-only{opacity:1;cursor:pointer}.product-spinner-wrapper .frame .current-scene{display:block}.product-spinner-wrapper .frame .next-scene{display:none}.product-spinner-wrapper .frame img{width:100%}.product-spinner-wrapper .overlay{position:absolute;padding:10px;width:20%;margin-left:40%;margin-top:40%;z-index:1;opacity:.4;transition:opacity .2s ease}.product-spinner-wrapper .frame.loader{width:50%;margin:auto}.product-spinner-wrapper .dialog-button{position:absolute;top:0;right:0}.product-spinner-wrapper .loader-percentage{position:relative;top:47%;width:100%;text-align:center;opacity:.5}`]
            },] },
];
/** @nocollapse */
DecProductSpinComponent.ctorParameters = () => [
    { type: Renderer }
];
DecProductSpinComponent.propDecorators = {
    looping: [{ type: Input }],
    onlyModal: [{ type: Input }],
    FALLBACK_IMAGE: [{ type: Input }],
    startInCenter: [{ type: Input }],
    showOpenDialogButton: [{ type: Input }],
    spin: [{ type: Input }],
    open: [{ type: Output }],
    onDragStart: [{ type: HostListener, args: ['dragstart', ['$event'],] }],
    onMousedown: [{ type: HostListener, args: ['mousedown', ['$event'],] }],
    onMousemove: [{ type: HostListener, args: ['mousemove', ['$event'],] }]
};
function DecProductSpinComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    DecProductSpinComponent.prototype.frameShown;
    /** @type {?} */
    DecProductSpinComponent.prototype.scenes;
    /** @type {?} */
    DecProductSpinComponent.prototype.loadingImages;
    /** @type {?} */
    DecProductSpinComponent.prototype.placeholderScene;
    /** @type {?} */
    DecProductSpinComponent.prototype.started;
    /** @type {?} */
    DecProductSpinComponent.prototype.totalImagesLoaded;
    /** @type {?} */
    DecProductSpinComponent.prototype.loadingImage;
    /** @type {?} */
    DecProductSpinComponent.prototype.looping;
    /** @type {?} */
    DecProductSpinComponent.prototype.onlyModal;
    /** @type {?} */
    DecProductSpinComponent.prototype.FALLBACK_IMAGE;
    /** @type {?} */
    DecProductSpinComponent.prototype.startInCenter;
    /** @type {?} */
    DecProductSpinComponent.prototype.showOpenDialogButton;
    /** @type {?} */
    DecProductSpinComponent.prototype.open;
    /** @type {?} */
    DecProductSpinComponent.prototype.scenesLen;
    /** @type {?} */
    DecProductSpinComponent.prototype.mouseDown;
    /** @type {?} */
    DecProductSpinComponent.prototype.lastMouseEvent;
    /** @type {?} */
    DecProductSpinComponent.prototype.containerWidth;
    /** @type {?} */
    DecProductSpinComponent.prototype.interval;
    /** @type {?} */
    DecProductSpinComponent.prototype.positionDiff;
    /** @type {?} */
    DecProductSpinComponent.prototype._spin;
    /** @type {?} */
    DecProductSpinComponent.prototype.markAsLoaded;
    /** @type {?} */
    DecProductSpinComponent.prototype.goLeft;
    /** @type {?} */
    DecProductSpinComponent.prototype.goRight;
    /** @type {?} */
    DecProductSpinComponent.prototype.start;
    /** @type {?} */
    DecProductSpinComponent.prototype.loaderPercentage;
    /** @type {?} */
    DecProductSpinComponent.prototype.renderer;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdC1zcGluLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9wcm9kdWN0LXNwaW4vcHJvZHVjdC1zcGluLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFVLE1BQU0sRUFBRSxZQUFZLEVBQUUsUUFBUSxFQUFHLE1BQU0sZUFBZSxDQUFDO0FBRXhHLHVCQUFNLGNBQWMsR0FBRywySkFBMko7SUFDbEwsV0FBVyxDQUFDO0FBRVosdUJBQU0sYUFBYSxHQUFHLDRKQUE0SjtJQUNsTCxpTEFBaUw7SUFDakwsaUxBQWlMO0lBQ2pMLGdJQUFnSSxDQUFDO0FBK0RqSSxNQUFNOzs7O0lBdUZKLFlBQW9CLFFBQWtCO1FBQWxCLGFBQVEsR0FBUixRQUFRLENBQVU7NEJBL0V2QixhQUFhO3VCQUVULEtBQUs7eUJBQ0gsS0FBSzs4QkFDUSxjQUFjOzZCQUN2QixLQUFLO29DQUNFLElBQUk7b0JBdUJuQixJQUFJLFlBQVksRUFBTzt5QkFFcEIsQ0FBQzt5QkFDRCxLQUFLOzRCQTZEVixDQUFDLEtBQUssRUFBRSxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1lBQ3pCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsS0FBSyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFDOUMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZDLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO2FBQzVCO1NBQ0Y7c0JBRVEsR0FBRyxFQUFFO1lBQ1osRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxD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QUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGtCQUFrQjtnQkFDNUIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQXdEWDtnQkFDQyxNQUFNLEVBQUUsQ0FBQyx5OUJBQXk5QixDQUFDO2FBQ3ArQjs7OztZQXRFc0UsUUFBUTs7O3NCQWlGNUUsS0FBSzt3QkFDTCxLQUFLOzZCQUNMLEtBQUs7NEJBQ0wsS0FBSzttQ0FDTCxLQUFLO21CQUVMLEtBQUs7bUJBcUJMLE1BQU07MEJBZ0JOLFlBQVksU0FBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLENBQUM7MEJBUXBDLFlBQVksU0FBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLENBQUM7MEJBUXBDLFlBQVksU0FBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIFJlbmRlcmVyICB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5jb25zdCBGQUxMQkFDS19JTUFHRSA9ICdkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUFFQUFBQUJDQVFBQUFDMUhBd0NBQUFBQW1KTFIwUUEvNGVQekw4QUFBQUpjRWhaY3dBQUN4TUFBQXNUQVFDYW5CZ0FBQUFMU1VSQlZBalhZMkJnQUFBQUF3QUJJTldVeHdBQUFBQkpSVTUnICtcbidFcmtKZ2dnPT0nO1xuXG5jb25zdCBMT0FESU5HX0lNQUdFID0gJ2RhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsUEhOMlp5QjNhV1IwYUQwaU1UVXdJaUJvWldsbmFIUTlJakUxTUNJZ2VHMXNibk05SW1oMGRIQTZMeTkzZDNjdWR6TXViM0puTHpJd01EQXZjM1puSWlCd2NtVnpaWEoyWlVGemNHVmpkRkpoZEdsdlBTSjRUV2xrV1UxcFpDSWcnICtcbidZMnhoYzNNOUluVnBiQzF5YVc1bklqNDhjR0YwYUNCbWFXeHNQU0p1YjI1bElpQmpiR0Z6Y3owaVltc2lJR1E5SWswd0lEQm9NVEF3ZGpFd01FZ3dlaUl2UGp4amFYSmpiR1VnWTNnOUlqYzFJaUJqZVQwaU56VWlJSEk5SWpRMUlpQnpkSEp2YTJVdFpHRnphR0Z5Y21GNVBTSXlNall1TVRrMUlEVTJMalUwT1NJJyArXG4nZ2MzUnliMnRsUFNJak1qTXlaVE00SWlCbWFXeHNQU0p1YjI1bElpQnpkSEp2YTJVdGQybGtkR2c5SWpFd0lqNDhZVzVwYldGMFpWUnlZVzV6Wm05eWJTQmhkSFJ5YVdKMWRHVk9ZVzFsUFNKMGNtRnVjMlp2Y20waUlIUjVjR1U5SW5KdmRHRjBaU0lnZG1Gc2RXVnpQU0l3SURjMUlEYzFPekU0TUNBM05TQTNOVCcgK1xuJ3N6TmpBZ056VWdOelU3SWlCclpYbFVhVzFsY3owaU1Ec3dMalU3TVNJZ1pIVnlQU0l4Y3lJZ2NtVndaV0YwUTI5MWJuUTlJbWx1WkdWbWFXNXBkR1VpSUdKbFoybHVQU0l3Y3lJdlBqd3ZZMmx5WTJ4bFBqd3ZjM1puUGc9PSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1wcm9kdWN0LXNwaW4nLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJwcm9kdWN0LXNwaW5uZXItd3JhcHBlclwiICpuZ0lmPVwic2NlbmVzXCI+XG4gIDxkaXYgW25nU3dpdGNoXT1cImxvYWRpbmdJbWFnZXMgPyB0cnVlIDogZmFsc2VcIj5cblxuICAgIDxkaXYgKm5nU3dpdGNoQ2FzZT1cInRydWVcIiBjbGFzcz1cIm92ZXJsYXlcIj5cbiAgICAgIDwhLS0gTG9hZGluZyBzcGlubmVyIC0tPlxuICAgICAgPGRpdiBbbmdTdHlsZV09XCJ7J2JhY2tncm91bmQtaW1hZ2UnOid1cmwoJyArIGxvYWRpbmdJbWFnZSArICcpJ31cIj57e2xvYWRlclBlcmNlbnRhZ2UoKX19JTwvZGl2PlxuICAgIDwvZGl2PlxuXG4gICAgPGRpdiAqbmdTd2l0Y2hDYXNlPVwiZmFsc2VcIiBjbGFzcz1cIm92ZXJsYXlcIj5cblxuICAgICAgPCEtLSBPdmVybGF5IG92ZXIgdGhlIGltYWdlIChoYW5kIGljb24pIC0tPlxuICAgICAgPGltZyBjbGFzcz1cImZyYW1lXCIgKm5nSWY9XCIhb25seU1vZGFsXCIgc3JjPVwiLy9zMy1zYS1lYXN0LTEuYW1hem9uYXdzLmNvbS9zdGF0aWMtZmlsZXMtcHJvZC9wbGF0Zm9ybS9kcmFnLWhvcml6b250YWxseS5wbmdcIiBhbHQ9XCJcIiAoY2xpY2spPVwib25seU1vZGFsID8gJycgOiBzdGFydCgkZXZlbnQpXCI+XG5cbiAgICA8L2Rpdj5cblxuICA8L2Rpdj5cblxuICA8ZGl2IFtuZ1N3aXRjaF09XCJzdGFydGVkID8gdHJ1ZSA6IGZhbHNlXCI+XG5cbiAgICA8ZGl2ICpuZ1N3aXRjaENhc2U9XCJ0cnVlXCIgY2xhc3M9XCJmcmFtZVwiPlxuICAgICAgPCEtLSBJbWFnZXMgLS0+XG4gICAgICA8aW1nICpuZ0Zvcj1cImxldCBzY2VuZSBvZiBzY2VuZXM7IGxldCBpID0gaW5kZXg7XCJcbiAgICAgICAgW3NyY109XCJzY2VuZVwiXG4gICAgICAgIGRyYWdnYWJsZT1cImZhbHNlXCJcbiAgICAgICAgY2xhc3M9XCJuby1kcmFnIGltYWdlLW9ubHlcIlxuICAgICAgICAobG9hZCk9XCJtYXJrQXNMb2FkZWQoJGV2ZW50KVwiXG4gICAgICAgIFtuZ0NsYXNzXT1cImZyYW1lU2hvd24gPT09IGkgJiYgIWxvYWRpbmdJbWFnZXMgPyAnY3VycmVudC1zY2VuZScgOiAnbmV4dC1zY2VuZSdcIj5cblxuICAgIDwvZGl2PlxuXG4gICAgPGRpdiAqbmdTd2l0Y2hDYXNlPVwiZmFsc2VcIiBjbGFzcz1cImZyYW1lXCI+XG5cbiAgICAgIDwhLS0gUGxhY2Vob2xkZXIgaW1hZ2UgLS0+XG4gICAgICA8aW1nXG4gICAgICAgIFtzcmNdPVwic2NlbmVzW2ZyYW1lU2hvd25dXCJcbiAgICAgICAgZHJhZ2dhYmxlPVwiZmFsc2VcIlxuICAgICAgICBjbGFzcz1cIm5vLWRyYWdcIlxuICAgICAgICAoY2xpY2spPVwib25seU1vZGFsID8gb25PcGVuKCRldmVudCkgOiBzdGFydCgkZXZlbnQpXCJcbiAgICAgICAgW25nQ2xhc3NdPVwieydpbWFnZS1vbmx5Jzogb25seU1vZGFsfVwiPlxuXG4gICAgICA8IS0tIExvYWRpbmcgc3Bpbm5lciAtLT5cbiAgICAgIDxidXR0b25cbiAgICAgICpuZ0lmPVwic2hvd09wZW5EaWFsb2dCdXR0b24gJiYgIW9ubHlNb2RhbFwiXG4gICAgICBtYXQtaWNvbi1idXR0b25cbiAgICAgIChjbGljayk9XCJvbk9wZW4oJGV2ZW50KVwiXG4gICAgICBbbWF0VG9vbHRpcF09XCInbGFiZWwub3BlbicgfCB0cmFuc2xhdGVcIlxuICAgICAgY2xhc3M9XCJkaWFsb2ctYnV0dG9uXCJcbiAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgY29sb3I9XCJkZWZhdWx0XCI+XG4gICAgICAgIDxtYXQtaWNvbiBhcmlhLWxhYmVsPVwiU3dhcCBiZXR3ZWVuIFJlZmVyZW5jZSBhbmQgUmVuZGVyIGltYWdlc1wiIGNvbG9yPVwicHJpbWFyeVwiIGNvbnRyYXN0Rm9udFdpdGhCZyA+ZnVsbHNjcmVlbjwvbWF0LWljb24+XG4gICAgICA8L2J1dHRvbj5cblxuICAgIDwvZGl2PlxuXG4gIDwvZGl2PlxuPC9kaXY+XG5gLFxuICBzdHlsZXM6IFtgLnByb2R1Y3Qtc3Bpbm5lci13cmFwcGVye2Rpc3BsYXk6YmxvY2s7cG9zaXRpb246cmVsYXRpdmV9LnByb2R1Y3Qtc3Bpbm5lci13cmFwcGVyOmhvdmVyIC5mcmFtZXtvcGFjaXR5OjF9LnByb2R1Y3Qtc3Bpbm5lci13cmFwcGVyOmhvdmVyIC5vdmVybGF5e2Rpc3BsYXk6bm9uZX0ucHJvZHVjdC1zcGlubmVyLXdyYXBwZXIgLmZyYW1le2Rpc3BsYXk6YmxvY2s7d2lkdGg6MTAwJTtiYWNrZ3JvdW5kLXNpemU6Y29udGFpbjtiYWNrZ3JvdW5kLXJlcGVhdDpuby1yZXBlYXQ7YmFja2dyb3VuZC1wb3NpdGlvbjpjZW50ZXIgY2VudGVyO29wYWNpdHk6LjU7dHJhbnNpdGlvbjpvcGFjaXR5IC4zcyBlYXNlO2N1cnNvcjptb3ZlfS5wcm9kdWN0LXNwaW5uZXItd3JhcHBlciAuZnJhbWUuaW1hZ2Utb25seXtvcGFjaXR5OjE7Y3Vyc29yOnBvaW50ZXJ9LnByb2R1Y3Qtc3Bpbm5lci13cmFwcGVyIC5mcmFtZSAuY3VycmVudC1zY2VuZXtkaXNwbGF5OmJsb2NrfS5wcm9kdWN0LXNwaW5uZXItd3JhcHBlciAuZnJhbWUgLm5leHQtc2NlbmV7ZGlzcGxheTpub25lfS5wcm9kdWN0LXNwaW5uZXItd3JhcHBlciAuZnJhbWUgaW1ne3dpZHRoOjEwMCV9LnByb2R1Y3Qtc3Bpbm5lci13cmFwcGVyIC5vdmVybGF5e3Bvc2l0aW9uOmFic29sdXRlO3BhZGRpbmc6MTBweDt3aWR0aDoyMCU7bWFyZ2luLWxlZnQ6NDAlO21hcmdpbi10b3A6NDAlO3otaW5kZXg6MTtvcGFjaXR5Oi40O3RyYW5zaXRpb246b3BhY2l0eSAuMnMgZWFzZX0ucHJvZHVjdC1zcGlubmVyLXdyYXBwZXIgLmZyYW1lLmxvYWRlcnt3aWR0aDo1MCU7bWFyZ2luOmF1dG99LnByb2R1Y3Qtc3Bpbm5lci13cmFwcGVyIC5kaWFsb2ctYnV0dG9ue3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO3JpZ2h0OjB9LnByb2R1Y3Qtc3Bpbm5lci13cmFwcGVyIC5sb2FkZXItcGVyY2VudGFnZXtwb3NpdGlvbjpyZWxhdGl2ZTt0b3A6NDclO3dpZHRoOjEwMCU7dGV4dC1hbGlnbjpjZW50ZXI7b3BhY2l0eTouNX1gXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNQcm9kdWN0U3BpbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgZnJhbWVTaG93bjogbnVtYmVyO1xuICBzY2VuZXM6IHN0cmluZ1tdO1xuICBsb2FkaW5nSW1hZ2VzOiBib29sZWFuO1xuICBwbGFjZWhvbGRlclNjZW5lOiBzdHJpbmc7XG4gIHN0YXJ0ZWQ6IGJvb2xlYW47XG4gIHRvdGFsSW1hZ2VzTG9hZGVkOiBudW1iZXI7XG4gIGxvYWRpbmdJbWFnZSA9IExPQURJTkdfSU1BR0U7XG5cbiAgQElucHV0KCkgbG9vcGluZyA9IGZhbHNlO1xuICBASW5wdXQoKSBvbmx5TW9kYWwgPSBmYWxzZTtcbiAgQElucHV0KCkgRkFMTEJBQ0tfSU1BR0U6IHN0cmluZyA9IEZBTExCQUNLX0lNQUdFO1xuICBASW5wdXQoKSBzdGFydEluQ2VudGVyID0gZmFsc2U7XG4gIEBJbnB1dCgpIHNob3dPcGVuRGlhbG9nQnV0dG9uID0gdHJ1ZTtcblxuICBASW5wdXQoKVxuICBzZXQgc3BpbihzcGluOiBhbnkpIHtcbiAgICBpZiAoc3Bpbikge1xuICAgICAgY29uc3Qgc2NlbmVzID0gdGhpcy5sb2FkU2NlbmVzKHNwaW4pO1xuXG4gICAgICBjb25zdCBzY2VuZXNDaGFuZ2VkID0gIXRoaXMuc2NlbmVzIHx8IChzY2VuZXMgJiYgdGhpcy5zY2VuZXMuam9pbigpICE9PSBzY2VuZXMuam9pbigpKTtcblxuICAgICAgaWYgKHNjZW5lc0NoYW5nZWQpIHtcbiAgICAgICAgdGhpcy5yZXNldFNjZW5lc0RhdGEoc2NlbmVzKTtcbiAgICAgICAgLy8gdGhpcy5yZXNldFN0YXJ0UG9zaXRpb25CYXNlZE9uQ29tcGFueShzcGluLCBzY2VuZXMpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLl9zcGluID0gc3BpbjtcblxuICAgIH1cbiAgfVxuXG4gIGdldCBzcGluKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuX3NwaW47XG4gIH1cblxuICBAT3V0cHV0KCkgb3BlbiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIHByaXZhdGUgc2NlbmVzTGVuID0gMDtcbiAgcHJpdmF0ZSBtb3VzZURvd24gPSBmYWxzZTtcbiAgcHJpdmF0ZSBsYXN0TW91c2VFdmVudDogTW91c2VFdmVudDtcbiAgcHJpdmF0ZSBjb250YWluZXJXaWR0aDogbnVtYmVyO1xuICBwcml2YXRlIGludGVydmFsOiBudW1iZXI7XG4gIHByaXZhdGUgcG9zaXRpb25EaWZmOiBudW1iZXI7XG4gIHByaXZhdGUgX3NwaW46IGFueTtcblxuICAvKlxuICAqIExpc3RlbmluZyBmb3IgbW91c2UgZXZlbnRzXG4gICogbW91c2V1cCBpbiBuZ09uSW5pdCBiZWNhdXNlIGl0IHVzZWQgZG9jY3VtZW50IGFzIHJlZmVyZW5jZVxuICAqL1xuXG4gIC8vIGF2b2lkIGRyYWdcbiAgQEhvc3RMaXN0ZW5lcignZHJhZ3N0YXJ0JywgWyckZXZlbnQnXSlcbiAgb25EcmFnU3RhcnQoZXZlbnQpIHtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8vIG1vdXNlZG93blxuICBASG9zdExpc3RlbmVyKCdtb3VzZWRvd24nLCBbJyRldmVudCddKVxuICBvbk1vdXNlZG93bihldmVudCkge1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIHRoaXMubW91c2VEb3duID0gdHJ1ZTtcbiAgICB0aGlzLmxhc3RNb3VzZUV2ZW50ID0gZXZlbnQ7XG4gIH1cblxuICAvLyBtb3VzZW1vdmVcbiAgQEhvc3RMaXN0ZW5lcignbW91c2Vtb3ZlJywgWyckZXZlbnQnXSlcbiAgb25Nb3VzZW1vdmUoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICBpZiAodGhpcy5tb3VzZURvd24gJiYgdGhpcy5zdGFydGVkKSB7XG5cbiAgICAgIHRoaXMuY2FsY3VsYXRlUG9zaXRpb24oZXZlbnQpO1xuXG4gICAgICAvLyBUaGUgd2lkdGggaXMgZGl2aWRlZCBieSB0aGUgYW1vdW50IG9mIGltYWdlcy4gTW92aW5nIGZyb20gMCB0byAxMDAgd2lsbCB0dXJuIDM2MMKwXG4gICAgICBpZiAoTWF0aC5hYnModGhpcy5wb3NpdGlvbkRpZmYpID49IHRoaXMuaW50ZXJ2YWwpIHtcbiAgICAgICAgaWYgKHRoaXMucG9zaXRpb25EaWZmIDwgMCkge1xuICAgICAgICAgIHRoaXMuZ29SaWdodCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuZ29MZWZ0KCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5sYXN0TW91c2VFdmVudCA9IGV2ZW50O1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuXG4gICAgdGhpcy5mcmFtZVNob3duID0gMDtcblxuICAgIHRoaXMucmVuZGVyZXIubGlzdGVuR2xvYmFsKCdkb2N1bWVudCcsICdtb3VzZXVwJywgKGV2ZW50KSA9PiB7XG4gICAgICBpZiAodGhpcy5tb3VzZURvd24pIHtcbiAgICAgICAgdGhpcy5tb3VzZURvd24gPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICB9XG5cbiAgbWFya0FzTG9hZGVkID0gKGV2ZW50KSA9PiB7XG4gICAgdGhpcy50b3RhbEltYWdlc0xvYWRlZCsrO1xuICAgIGlmICh0aGlzLnRvdGFsSW1hZ2VzTG9hZGVkID09PSB0aGlzLnNjZW5lc0xlbikge1xuICAgICAgdGhpcy5wbGFjZWhvbGRlclNjZW5lID0gdGhpcy5zY2VuZXNbMF07XG4gICAgICB0aGlzLmxvYWRpbmdJbWFnZXMgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBnb0xlZnQgPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMuc2NlbmVzW3RoaXMuZnJhbWVTaG93biAtIDFdKSB7XG4gICAgICB0aGlzLmZyYW1lU2hvd24tLTtcbiAgICB9IGVsc2UgaWYgKHRoaXMubG9vcGluZykge1xuICAgICAgdGhpcy5mcmFtZVNob3duID0gdGhpcy5zY2VuZXNMZW4gLSAxO1xuICAgIH1cbiAgfVxuXG4gIGdvUmlnaHQgPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMuc2NlbmVzW3RoaXMuZnJhbWVTaG93biArIDFdKSB7XG4gICAgICB0aGlzLmZyYW1lU2hvd24rKztcbiAgICB9IGVsc2UgaWYgKHRoaXMubG9vcGluZykge1xuICAgICAgdGhpcy5mcmFtZVNob3duID0gMDtcbiAgICB9XG4gIH1cblxuICBzdGFydCA9ICgkZXZlbnQpOiB2b2lkID0+IHtcbiAgICB0aGlzLnBsYWNlaG9sZGVyU2NlbmUgPSBMT0FESU5HX0lNQUdFO1xuICAgIHRoaXMudG90YWxJbWFnZXNMb2FkZWQgPSAwO1xuICAgIHRoaXMubG9hZGluZ0ltYWdlcyA9IHRydWU7XG4gICAgdGhpcy5zdGFydGVkID0gdHJ1ZTtcbiAgfVxuXG4gIGxvYWRlclBlcmNlbnRhZ2UgPSAoKSA9PiB7XG4gICAgcmV0dXJuICh0aGlzLnNjZW5lc0xlbiAtIHRoaXMudG90YWxJbWFnZXNMb2FkZWQpID4gMCA/ICgoMTAwIC8gdGhpcy5zY2VuZXNMZW4pICogdGhpcy50b3RhbEltYWdlc0xvYWRlZCkudG9GaXhlZCgxKSA6IDA7XG4gIH1cblxuICBvbk9wZW4oJGV2ZW50KSB7XG5cbiAgICB0aGlzLm9wZW4uZW1pdCgkZXZlbnQpO1xuXG4gIH1cblxuICAvKlxuICAgKlxuICAgKiBJTVBPUlRBTlRcbiAgICpcbiAgICogcmVzZXRTdGFydFBvc2l0aW9uQmFzZWRPbkNvbXBhbnlcbiAgICpcbiAgICogVGhpcyBtZXRob2QgaXMgcmVzcG9uc2libGUgZm9yIGVuc3VyaW5nIHRoZSBCdXNpbmVzcyBSdWxlIG9mIHRoZSBzcGluIHNlcXVlbmNlXG4gICAqIFRoZSBIb21lIERlcG90IGFrYSBjdXN0b21lciAxMDAsIGhhdmUgYSBwYXJ0aWN1bGFyIGJlaGF2aW9yIHN0YXJ0aW5nIDE4MMK6IGluIHRoZSBtaWRkbGVcbiAgICpcbiAgKi9cbiAgcHJpdmF0ZSByZXNldFN0YXJ0UG9zaXRpb25CYXNlZE9uQ29tcGFueShzcGluLCBzY2VuZXMpIHtcblxuICAgIHRoaXMuc3RhcnRJbkNlbnRlciA9IHNwaW4uY29tcGFueS5pZCA9PT0gMTAwID8gdHJ1ZSA6IGZhbHNlO1xuXG4gICAgdGhpcy5zdGFydEluQ2VudGVyID0gdGhpcy5zdGFydEluQ2VudGVyICYmIHNjZW5lcy5sZW5ndGggPD0gMTY7XG5cbiAgfVxuXG4gIHByaXZhdGUgcmVzZXRTY2VuZXNEYXRhKHNjZW5lcykge1xuICAgIHRoaXMucGxhY2Vob2xkZXJTY2VuZSA9IHNjZW5lc1swXTtcbiAgICB0aGlzLnNjZW5lc0xlbiA9IHNjZW5lcy5sZW5ndGg7XG4gICAgdGhpcy5zY2VuZXMgPSBzY2VuZXM7XG4gIH1cblxuICBwcml2YXRlIGxvYWRTY2VuZXMoc3Bpbikge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBzY2VuZXMgPSB0aGlzLmdldFVybHNGcm9tU3lzRmlsZXMoc3Bpbi5kYXRhLnNob3RzKTtcbiAgICAgIHJldHVybiBzY2VuZXMgJiYgc2NlbmVzLmxlbmd0aCA+IDAgPyBzY2VuZXMgOiBbRkFMTEJBQ0tfSU1BR0VdO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICByZXR1cm4gW0ZBTExCQUNLX0lNQUdFXTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGNhbGN1bGF0ZVBvc2l0aW9uKGV2ZW50KSB7XG4gICAgY29uc3QgdGFyZ2V0OiBhbnkgPSBldmVudFsndGFyZ2V0J107XG5cbiAgICBpZiAodGhpcy5jb250YWluZXJXaWR0aCAhPT0gdGFyZ2V0LmNsaWVudFdpZHRoKSB7XG4gICAgICB0aGlzLmNvbnRhaW5lcldpZHRoID0gIHRhcmdldC5jbGllbnRXaWR0aDtcbiAgICAgIHRoaXMuaW50ZXJ2YWwgPSAodGhpcy5jb250YWluZXJXaWR0aCAvIHRoaXMuc2NlbmVzTGVuKSAvIDEuNjtcbiAgICB9XG5cbiAgICB0aGlzLnBvc2l0aW9uRGlmZiA9IGV2ZW50LmNsaWVudFggLSB0aGlzLmxhc3RNb3VzZUV2ZW50LmNsaWVudFg7XG4gIH1cblxuICBwcml2YXRlIGdldFVybHNGcm9tU3lzRmlsZXMoc3lzRmlsZXMpIHtcbiAgICBpZiAoIXN5c0ZpbGVzKSB7XG4gICAgICByZXR1cm47XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBzeXNGaWxlcy5tYXAoZmlsZSA9PiB7XG4gICAgICAgIHJldHVybiBmaWxlLnJlbmRlckZpbGUuZmlsZVVybDtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuIl19