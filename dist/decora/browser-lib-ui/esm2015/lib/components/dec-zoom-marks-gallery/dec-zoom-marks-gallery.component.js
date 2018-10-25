/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { CarouselZoomConfig } from './../gallery/carousel-config';
import { DecZoomMarksComponent } from './../dec-zoom-marks/dec-zoom-marks.component';
export class DecZoomMarksGalleryComponent {
    constructor() {
        this.carouselConfig = CarouselZoomConfig;
        this.imageIndex = 0;
        this.openZoomArea = new EventEmitter();
        this.onSelectImage = ($event, sysFile, i) => {
            this.markedObj = this.markedObjs[i];
            this.imageIndex = i;
        };
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set markedObjs(v) {
        if (this._markedObjs !== v) {
            this._markedObjs = v;
            this.markedObj = this.markedObjs[0];
        }
    }
    /**
     * @return {?}
     */
    get markedObjs() {
        return this._markedObjs;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set showTags(v) {
        if (v) {
            this._showTags = v;
        }
    }
    /**
     * @return {?}
     */
    get showTags() {
        return this._showTags;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onInitDataFn(event) {
        this.setPrevNextCheckers(event.isFirst, event.items >= this.markedObjs.length);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onMoveFn(event) {
        this.setPrevNextCheckers(event.isFirst, event.isLast);
    }
    /**
     * @param {?} first
     * @param {?} last
     * @return {?}
     */
    setPrevNextCheckers(first, last) {
        setTimeout(() => {
            this.isFirst = first;
            this.isLast = last;
        }, 0);
    }
    /**
     * @return {?}
     */
    getFormatedPositionAndScale() {
        return this.zoomMarks.getFormatedPositionAndScale();
    }
    /**
     * @param {?} addNewZoomArea
     * @return {?}
     */
    addNewZoomArea(addNewZoomArea) {
        this.zoomMarks.addNewZoomArea(addNewZoomArea);
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    onOpenZoomArea($event) {
        this.openZoomArea.emit($event);
    }
    /**
     * @return {?}
     */
    getImageIndex() {
        return this.imageIndex;
    }
}
DecZoomMarksGalleryComponent.decorators = [
    { type: Component, args: [{
                selector: 'dec-zoom-marks-gallery',
                template: `<div class="gallery-size" fxLayout="column" fxLayoutGap="32px" fxLayoutAlign="space-between start">
  <dec-zoom-marks fxFlex class="gallery-size" [marker]="markedObj" [qaMode]="qaModeActive" (openZoomArea)="onOpenZoomArea($event)"
    minZoomLevel="1" maxZoomLevel="8" stepZoomLevel="0.1"></dec-zoom-marks>

  <div class="gallery-size">
    <ngu-carousel class="carousel-wrapper " [inputs]="carouselConfig" (initData)="onInitDataFn($event)" (onMove)="onMoveFn($event)">

      <ngu-item NguCarouselItem *ngFor="let image of markedObjs; let i = index;" [class.active]="image == markedObj">
        <img [decImage]="image.file" [decImageSize]="{width:300, height:300}" (click)="onSelectImage($event,image, i)">
      </ngu-item>

      <mat-icon NguCarouselPrev class="left-previous" [ngClass]="{'disabled': isFirst}">chevron_left</mat-icon>

      <mat-icon NguCarouselNext class="right-next" [ngClass]="{'disabled': isLast}">chevron_right</mat-icon>

    </ngu-carousel>
  </div>

  <div *ngIf="showTags" class="container-comments" fxLayout="column" fxLayoutGap="16px">
    <div>
      <h3><dec-icon class="dec-icon-size dec-color-grey" font="mat">bookmarks</dec-icon>
        <span class="dec-icon-text-size-zoom-area"> Tags </span>
      </h3>
    </div>
    <dec-markdowns-comment [renders]="markedObjs"></dec-markdowns-comment>

    <div>
      <h3><dec-icon class="dec-icon-size dec-color-grey" font="mat">error</dec-icon>
        <span class="dec-icon-text-size-zoom-area"> Zoom areas </span>
      </h3>
    </div>
    <dec-markdowns-zoom-area [renders]="markedObjs"></dec-markdowns-zoom-area>
  </div>
</div>`,
                styles: [`.image-highlighted{border:2px solid #f5f5f5}a{font-size:10px;text-decoration:none;color:#929292;cursor:pointer}.carousel-wrapper{margin-top:8px;padding:0 24px}.carousel-wrapper ngu-item{display:flex;align-items:center;flex-flow:column}.carousel-wrapper ngu-item.active img,.carousel-wrapper ngu-item:hover img{border:2px solid #232e38}.carousel-wrapper ngu-item img{max-width:62px;border:2px solid transparent;cursor:pointer}.carousel-wrapper .left-previous,.carousel-wrapper .right-next{display:block!important;position:absolute;top:calc(50% - 12px);cursor:pointer;text-shadow:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.carousel-wrapper .left-previous:hover,.carousel-wrapper .right-next:hover{text-shadow:0 0 6px rgba(0,0,0,.2)}.carousel-wrapper .left-previous.disabled,.carousel-wrapper .right-next.disabled{opacity:.4}.carousel-wrapper .left-previous.disabled:hover,.carousel-wrapper .right-next.disabled:hover{text-shadow:none}.carousel-wrapper .left-previous{left:0}.carousel-wrapper .right-next{right:0}.dec-icon-size{font-size:28px}.dec-icon-text-size{font-size:18px;position:relative;top:6px;left:-30px}.container-comments{padding-left:20px}.gallery-size{width:100%}.dec-icon-text-size-zoom-area{font-size:18px;position:relative;top:-4px}`]
            },] },
];
/** @nocollapse */
DecZoomMarksGalleryComponent.ctorParameters = () => [];
DecZoomMarksGalleryComponent.propDecorators = {
    markedObjs: [{ type: Input }],
    showTags: [{ type: Input }],
    qaModeActive: [{ type: Input }],
    zoomMarks: [{ type: ViewChild, args: [DecZoomMarksComponent,] }],
    openZoomArea: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    DecZoomMarksGalleryComponent.prototype.carouselConfig;
    /** @type {?} */
    DecZoomMarksGalleryComponent.prototype.imageIndex;
    /** @type {?} */
    DecZoomMarksGalleryComponent.prototype.qaModeActive;
    /** @type {?} */
    DecZoomMarksGalleryComponent.prototype.zoomMarks;
    /** @type {?} */
    DecZoomMarksGalleryComponent.prototype.openZoomArea;
    /** @type {?} */
    DecZoomMarksGalleryComponent.prototype.markedObj;
    /** @type {?} */
    DecZoomMarksGalleryComponent.prototype._markedObjs;
    /** @type {?} */
    DecZoomMarksGalleryComponent.prototype._showTags;
    /** @type {?} */
    DecZoomMarksGalleryComponent.prototype.isFirst;
    /** @type {?} */
    DecZoomMarksGalleryComponent.prototype.isLast;
    /** @type {?} */
    DecZoomMarksGalleryComponent.prototype.onSelectImage;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLXpvb20tbWFya3MtZ2FsbGVyeS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvZGVjLXpvb20tbWFya3MtZ2FsbGVyeS9kZWMtem9vbS1tYXJrcy1nYWxsZXJ5LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFMUYsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDbEUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sOENBQThDLENBQUM7QUF3Q3JGLE1BQU07SUE0Q0o7OEJBMUNpQixrQkFBa0I7MEJBeUJ0QixDQUFDOzRCQU1XLElBQUksWUFBWSxFQUFFOzZCQXlCM0IsQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3JDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNwQyxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQztTQUNyQjtLQWpCZ0I7Ozs7O0lBeENqQixJQUNJLFVBQVUsQ0FBQyxDQUFDO1FBQ2QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzNCLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNyQztLQUNGOzs7O0lBRUQsSUFBSSxVQUFVO1FBQ1osTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7S0FDekI7Ozs7O0lBRUQsSUFDSSxRQUFRLENBQUMsQ0FBQztRQUNaLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDTixJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztTQUNwQjtLQUNGOzs7O0lBRUQsSUFBSSxRQUFRO1FBQ1YsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7S0FDdkI7Ozs7O0lBcUJELFlBQVksQ0FBQyxLQUF1QjtRQUVsQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7S0FFaEY7Ozs7O0lBRUQsUUFBUSxDQUFDLEtBQXVCO1FBRTlCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUV2RDs7Ozs7O0lBT0QsbUJBQW1CLENBQUMsS0FBYyxFQUFFLElBQWE7UUFFL0MsVUFBVSxDQUFDLEdBQUcsRUFBRTtZQUVkLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1lBRXJCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1NBRXBCLEVBQUUsQ0FBQyxDQUFDLENBQUM7S0FFUDs7OztJQUVNLDJCQUEyQjtRQUNoQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQywyQkFBMkIsRUFBRSxDQUFDOzs7Ozs7SUFJL0MsY0FBYyxDQUFDLGNBQWM7UUFDbEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLENBQUM7Ozs7OztJQUd6QyxjQUFjLENBQUMsTUFBTTtRQUMxQixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQzs7Ozs7SUFHMUIsYUFBYTtRQUNsQixNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQzs7OztZQS9IMUIsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSx3QkFBd0I7Z0JBQ2xDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BaUNMO2dCQUNMLE1BQU0sRUFBRSxDQUFDLGl4Q0FBaXhDLENBQUM7YUFDNXhDOzs7Ozt5QkFLRSxLQUFLO3VCQVlMLEtBQUs7MkJBYUwsS0FBSzt3QkFFTCxTQUFTLFNBQUMscUJBQXFCOzJCQUUvQixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBWaWV3Q2hpbGQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ3VDYXJvdXNlbFN0b3JlIH0gZnJvbSAnQG5ndS9jYXJvdXNlbCc7XG5pbXBvcnQgeyBDYXJvdXNlbFpvb21Db25maWcgfSBmcm9tICcuLy4uL2dhbGxlcnkvY2Fyb3VzZWwtY29uZmlnJztcbmltcG9ydCB7IERlY1pvb21NYXJrc0NvbXBvbmVudCB9IGZyb20gJy4vLi4vZGVjLXpvb20tbWFya3MvZGVjLXpvb20tbWFya3MuY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLXpvb20tbWFya3MtZ2FsbGVyeScsXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cImdhbGxlcnktc2l6ZVwiIGZ4TGF5b3V0PVwiY29sdW1uXCIgZnhMYXlvdXRHYXA9XCIzMnB4XCIgZnhMYXlvdXRBbGlnbj1cInNwYWNlLWJldHdlZW4gc3RhcnRcIj5cbiAgPGRlYy16b29tLW1hcmtzIGZ4RmxleCBjbGFzcz1cImdhbGxlcnktc2l6ZVwiIFttYXJrZXJdPVwibWFya2VkT2JqXCIgW3FhTW9kZV09XCJxYU1vZGVBY3RpdmVcIiAob3Blblpvb21BcmVhKT1cIm9uT3Blblpvb21BcmVhKCRldmVudClcIlxuICAgIG1pblpvb21MZXZlbD1cIjFcIiBtYXhab29tTGV2ZWw9XCI4XCIgc3RlcFpvb21MZXZlbD1cIjAuMVwiPjwvZGVjLXpvb20tbWFya3M+XG5cbiAgPGRpdiBjbGFzcz1cImdhbGxlcnktc2l6ZVwiPlxuICAgIDxuZ3UtY2Fyb3VzZWwgY2xhc3M9XCJjYXJvdXNlbC13cmFwcGVyIFwiIFtpbnB1dHNdPVwiY2Fyb3VzZWxDb25maWdcIiAoaW5pdERhdGEpPVwib25Jbml0RGF0YUZuKCRldmVudClcIiAob25Nb3ZlKT1cIm9uTW92ZUZuKCRldmVudClcIj5cblxuICAgICAgPG5ndS1pdGVtIE5ndUNhcm91c2VsSXRlbSAqbmdGb3I9XCJsZXQgaW1hZ2Ugb2YgbWFya2VkT2JqczsgbGV0IGkgPSBpbmRleDtcIiBbY2xhc3MuYWN0aXZlXT1cImltYWdlID09IG1hcmtlZE9ialwiPlxuICAgICAgICA8aW1nIFtkZWNJbWFnZV09XCJpbWFnZS5maWxlXCIgW2RlY0ltYWdlU2l6ZV09XCJ7d2lkdGg6MzAwLCBoZWlnaHQ6MzAwfVwiIChjbGljayk9XCJvblNlbGVjdEltYWdlKCRldmVudCxpbWFnZSwgaSlcIj5cbiAgICAgIDwvbmd1LWl0ZW0+XG5cbiAgICAgIDxtYXQtaWNvbiBOZ3VDYXJvdXNlbFByZXYgY2xhc3M9XCJsZWZ0LXByZXZpb3VzXCIgW25nQ2xhc3NdPVwieydkaXNhYmxlZCc6IGlzRmlyc3R9XCI+Y2hldnJvbl9sZWZ0PC9tYXQtaWNvbj5cblxuICAgICAgPG1hdC1pY29uIE5ndUNhcm91c2VsTmV4dCBjbGFzcz1cInJpZ2h0LW5leHRcIiBbbmdDbGFzc109XCJ7J2Rpc2FibGVkJzogaXNMYXN0fVwiPmNoZXZyb25fcmlnaHQ8L21hdC1pY29uPlxuXG4gICAgPC9uZ3UtY2Fyb3VzZWw+XG4gIDwvZGl2PlxuXG4gIDxkaXYgKm5nSWY9XCJzaG93VGFnc1wiIGNsYXNzPVwiY29udGFpbmVyLWNvbW1lbnRzXCIgZnhMYXlvdXQ9XCJjb2x1bW5cIiBmeExheW91dEdhcD1cIjE2cHhcIj5cbiAgICA8ZGl2PlxuICAgICAgPGgzPjxkZWMtaWNvbiBjbGFzcz1cImRlYy1pY29uLXNpemUgZGVjLWNvbG9yLWdyZXlcIiBmb250PVwibWF0XCI+Ym9va21hcmtzPC9kZWMtaWNvbj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJkZWMtaWNvbi10ZXh0LXNpemUtem9vbS1hcmVhXCI+IFRhZ3MgPC9zcGFuPlxuICAgICAgPC9oMz5cbiAgICA8L2Rpdj5cbiAgICA8ZGVjLW1hcmtkb3ducy1jb21tZW50IFtyZW5kZXJzXT1cIm1hcmtlZE9ianNcIj48L2RlYy1tYXJrZG93bnMtY29tbWVudD5cblxuICAgIDxkaXY+XG4gICAgICA8aDM+PGRlYy1pY29uIGNsYXNzPVwiZGVjLWljb24tc2l6ZSBkZWMtY29sb3ItZ3JleVwiIGZvbnQ9XCJtYXRcIj5lcnJvcjwvZGVjLWljb24+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwiZGVjLWljb24tdGV4dC1zaXplLXpvb20tYXJlYVwiPiBab29tIGFyZWFzIDwvc3Bhbj5cbiAgICAgIDwvaDM+XG4gICAgPC9kaXY+XG4gICAgPGRlYy1tYXJrZG93bnMtem9vbS1hcmVhIFtyZW5kZXJzXT1cIm1hcmtlZE9ianNcIj48L2RlYy1tYXJrZG93bnMtem9vbS1hcmVhPlxuICA8L2Rpdj5cbjwvZGl2PmAsXG4gIHN0eWxlczogW2AuaW1hZ2UtaGlnaGxpZ2h0ZWR7Ym9yZGVyOjJweCBzb2xpZCAjZjVmNWY1fWF7Zm9udC1zaXplOjEwcHg7dGV4dC1kZWNvcmF0aW9uOm5vbmU7Y29sb3I6IzkyOTI5MjtjdXJzb3I6cG9pbnRlcn0uY2Fyb3VzZWwtd3JhcHBlcnttYXJnaW4tdG9wOjhweDtwYWRkaW5nOjAgMjRweH0uY2Fyb3VzZWwtd3JhcHBlciBuZ3UtaXRlbXtkaXNwbGF5OmZsZXg7YWxpZ24taXRlbXM6Y2VudGVyO2ZsZXgtZmxvdzpjb2x1bW59LmNhcm91c2VsLXdyYXBwZXIgbmd1LWl0ZW0uYWN0aXZlIGltZywuY2Fyb3VzZWwtd3JhcHBlciBuZ3UtaXRlbTpob3ZlciBpbWd7Ym9yZGVyOjJweCBzb2xpZCAjMjMyZTM4fS5jYXJvdXNlbC13cmFwcGVyIG5ndS1pdGVtIGltZ3ttYXgtd2lkdGg6NjJweDtib3JkZXI6MnB4IHNvbGlkIHRyYW5zcGFyZW50O2N1cnNvcjpwb2ludGVyfS5jYXJvdXNlbC13cmFwcGVyIC5sZWZ0LXByZXZpb3VzLC5jYXJvdXNlbC13cmFwcGVyIC5yaWdodC1uZXh0e2Rpc3BsYXk6YmxvY2shaW1wb3J0YW50O3Bvc2l0aW9uOmFic29sdXRlO3RvcDpjYWxjKDUwJSAtIDEycHgpO2N1cnNvcjpwb2ludGVyO3RleHQtc2hhZG93Om5vbmU7LXdlYmtpdC11c2VyLXNlbGVjdDpub25lOy1tb3otdXNlci1zZWxlY3Q6bm9uZTstbXMtdXNlci1zZWxlY3Q6bm9uZTt1c2VyLXNlbGVjdDpub25lfS5jYXJvdXNlbC13cmFwcGVyIC5sZWZ0LXByZXZpb3VzOmhvdmVyLC5jYXJvdXNlbC13cmFwcGVyIC5yaWdodC1uZXh0OmhvdmVye3RleHQtc2hhZG93OjAgMCA2cHggcmdiYSgwLDAsMCwuMil9LmNhcm91c2VsLXdyYXBwZXIgLmxlZnQtcHJldmlvdXMuZGlzYWJsZWQsLmNhcm91c2VsLXdyYXBwZXIgLnJpZ2h0LW5leHQuZGlzYWJsZWR7b3BhY2l0eTouNH0uY2Fyb3VzZWwtd3JhcHBlciAubGVmdC1wcmV2aW91cy5kaXNhYmxlZDpob3ZlciwuY2Fyb3VzZWwtd3JhcHBlciAucmlnaHQtbmV4dC5kaXNhYmxlZDpob3Zlcnt0ZXh0LXNoYWRvdzpub25lfS5jYXJvdXNlbC13cmFwcGVyIC5sZWZ0LXByZXZpb3Vze2xlZnQ6MH0uY2Fyb3VzZWwtd3JhcHBlciAucmlnaHQtbmV4dHtyaWdodDowfS5kZWMtaWNvbi1zaXple2ZvbnQtc2l6ZToyOHB4fS5kZWMtaWNvbi10ZXh0LXNpemV7Zm9udC1zaXplOjE4cHg7cG9zaXRpb246cmVsYXRpdmU7dG9wOjZweDtsZWZ0Oi0zMHB4fS5jb250YWluZXItY29tbWVudHN7cGFkZGluZy1sZWZ0OjIwcHh9LmdhbGxlcnktc2l6ZXt3aWR0aDoxMDAlfS5kZWMtaWNvbi10ZXh0LXNpemUtem9vbS1hcmVhe2ZvbnQtc2l6ZToxOHB4O3Bvc2l0aW9uOnJlbGF0aXZlO3RvcDotNHB4fWBdXG59KVxuZXhwb3J0IGNsYXNzIERlY1pvb21NYXJrc0dhbGxlcnlDb21wb25lbnQge1xuXG4gIGNhcm91c2VsQ29uZmlnID0gQ2Fyb3VzZWxab29tQ29uZmlnO1xuXG4gIEBJbnB1dCgpXG4gIHNldCBtYXJrZWRPYmpzKHYpIHtcbiAgICBpZiAodGhpcy5fbWFya2VkT2JqcyAhPT0gdikge1xuICAgICAgdGhpcy5fbWFya2VkT2JqcyA9IHY7XG4gICAgICB0aGlzLm1hcmtlZE9iaiA9IHRoaXMubWFya2VkT2Jqc1swXTtcbiAgICB9XG4gIH1cblxuICBnZXQgbWFya2VkT2JqcygpIHtcbiAgICByZXR1cm4gdGhpcy5fbWFya2VkT2JqcztcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCBzaG93VGFncyh2KSB7XG4gICAgaWYgKHYpIHtcbiAgICAgIHRoaXMuX3Nob3dUYWdzID0gdjtcbiAgICB9XG4gIH1cblxuICBnZXQgc2hvd1RhZ3MoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3Nob3dUYWdzO1xuICB9XG5cbiAgaW1hZ2VJbmRleCA9IDA7XG5cbiAgQElucHV0KCkgcWFNb2RlQWN0aXZlOiBib29sZWFuO1xuXG4gIEBWaWV3Q2hpbGQoRGVjWm9vbU1hcmtzQ29tcG9uZW50KSB6b29tTWFya3M6IERlY1pvb21NYXJrc0NvbXBvbmVudDsgXG5cbiAgQE91dHB1dCgpIG9wZW5ab29tQXJlYSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBtYXJrZWRPYmo6IGFueTtcbiAgX21hcmtlZE9ianM6IGFueTtcblxuICBfc2hvd1RhZ3M6IGJvb2xlYW47XG5cbiAgaXNGaXJzdDogYm9vbGVhbjtcblxuICBpc0xhc3Q6IGJvb2xlYW47XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBvbkluaXREYXRhRm4oZXZlbnQ6IE5ndUNhcm91c2VsU3RvcmUpIHtcblxuICAgIHRoaXMuc2V0UHJldk5leHRDaGVja2VycyhldmVudC5pc0ZpcnN0LCBldmVudC5pdGVtcyA+PSB0aGlzLm1hcmtlZE9ianMubGVuZ3RoKTtcblxuICB9XG5cbiAgb25Nb3ZlRm4oZXZlbnQ6IE5ndUNhcm91c2VsU3RvcmUpIHtcblxuICAgIHRoaXMuc2V0UHJldk5leHRDaGVja2VycyhldmVudC5pc0ZpcnN0LCBldmVudC5pc0xhc3QpO1xuXG4gIH1cblxuICBvblNlbGVjdEltYWdlID0gKCRldmVudCwgc3lzRmlsZSwgaSkgPT4ge1xuICAgIHRoaXMubWFya2VkT2JqID0gdGhpcy5tYXJrZWRPYmpzW2ldO1xuICAgIHRoaXMuaW1hZ2VJbmRleCA9IGk7XG4gIH1cblxuICBzZXRQcmV2TmV4dENoZWNrZXJzKGZpcnN0OiBib29sZWFuLCBsYXN0OiBib29sZWFuKSB7XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcblxuICAgICAgdGhpcy5pc0ZpcnN0ID0gZmlyc3Q7XG5cbiAgICAgIHRoaXMuaXNMYXN0ID0gbGFzdDtcblxuICAgIH0sIDApO1xuXG4gIH1cblxuICBwdWJsaWMgZ2V0Rm9ybWF0ZWRQb3NpdGlvbkFuZFNjYWxlKCkge1xuICAgIHJldHVybiB0aGlzLnpvb21NYXJrcy5nZXRGb3JtYXRlZFBvc2l0aW9uQW5kU2NhbGUoKTtcbiAgfVxuXG5cbiAgcHVibGljIGFkZE5ld1pvb21BcmVhKGFkZE5ld1pvb21BcmVhKSB7XG4gICAgdGhpcy56b29tTWFya3MuYWRkTmV3Wm9vbUFyZWEoYWRkTmV3Wm9vbUFyZWEpO1xuICB9XG5cbiAgcHVibGljIG9uT3Blblpvb21BcmVhKCRldmVudCkge1xuICAgIHRoaXMub3Blblpvb21BcmVhLmVtaXQoJGV2ZW50KTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRJbWFnZUluZGV4KCkge1xuICAgIHJldHVybiB0aGlzLmltYWdlSW5kZXg7XG4gIH1cbn1cbiJdfQ==