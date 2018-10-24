/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { DecMarksComponent } from './../dec-marks/dec-marks.component';
export class DecZoomAreaComponent {
    constructor() {
        this.save = new EventEmitter();
        this.cancel = new EventEmitter();
        this.referenceQaMode = false;
        this.renderMarkdons = [];
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set reference(v) {
        if (v) {
            this._reference = v;
        }
    }
    /**
     * @return {?}
     */
    get reference() {
        return this._reference;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set render(v) {
        if (v) {
            this._render = v;
            this.renderMarkdons.push(this._render);
        }
    }
    /**
     * @return {?}
     */
    get render() {
        return this._render;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
    /**
     * @return {?}
     */
    onSave() {
        /** @type {?} */
        const saveObj = {
            coordinates: [],
            id: this.parentId,
            descripition: this.descripition,
            renderShot: this.renderZoom.marker,
            referenceShot: this.referenceZoom.marker
        };
        console.log(saveObj);
        this.save.emit(saveObj);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onLinkTag(event) {
        this.referenceQaMode = true;
        this.commentIndex = event.id;
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    onReferenceQa($event) {
        this.referenceQaMode = false;
    }
    /**
     * @return {?}
     */
    onCancel() {
        this.cancel.emit();
    }
}
DecZoomAreaComponent.decorators = [
    { type: Component, args: [{
                selector: 'dec-zoom-area',
                template: `<div class="main-container" fxLayout="column" fxLayoutGap="16px">
  <div fxLayout="row" fxLayoutAlign="start start">

    <div fxFlex="50" class="zoom-container" fxLayout="column" fxLayoutGap="16px">
      <dec-marks class="zoom-container" #referenceZoom [noComments]="true" [marker]="reference" [qaMode]="referenceQaMode" [parentId]="parentId"
        (referenceQa)="onReferenceQa($event)" [comentIndex]="commentIndex" [zoomScale]="reference?.zoomScale" [zoomPosition]="reference?.position">
      </dec-marks>
      <div class="fake-div">

      </div>
      <div div fxLayout="row" fxLayoutAlign="start center">
        <h2 class="dec-color-grey">
          <dec-icon font="mat">description</dec-icon>{{ 'label.observations' | translate }}
        </h2>
      </div>
      <textarea [(ngModel)]="descripition" class="text-area"></textarea>
    </div>


    <div fxFlex="50" fxLayout="column" fxLayoutGap="16px" class="zoom-container">
      <dec-marks #renderZoom [noComments]="false" [marker]="render" [parentId]="parentId" [qaMode]="true" (link)="onLinkTag($event)"
        [zoomScale]="render?.zoomScale" [zoomPosition]="render?.position">
      </dec-marks>

      <div fxLayout="row" fxLayoutAlign="end center" fxLayoutGap="16px" class="fake-div">
        <button mat-button (click)="onCancel()"> {{ 'label.cancel' | translate }} </button>
        <button mat-flat-button color="primary" (click)="onSave()"> {{ 'label.save' | translate }} </button>
      </div>

      <div class="container-comments" fxLayout="column" fxLayoutGap="16px">
        <div fxLayout="row" fxLayoutGap="8px">
          <h2 class="dec-color-grey">
            <dec-icon font="mat">bookmarks</dec-icon>Tags
          </h2>
        </div>
        <dec-markdowns-comment [parentId]="parentId" [renders]="renderMarkdons"></dec-markdowns-comment>
      </div>
    </div>
  </div>
</div>`,
                styles: [`.text-area{width:95%;height:185px;padding:15px}.zoom-container{width:100%}.main-container{position:relative;background-color:#fff}.button-save{position:absolute;z-index:5;right:0;top:45%}.fake-div{width:100%;height:36px}.container-comments{padding-left:20px}`]
            },] },
];
/** @nocollapse */
DecZoomAreaComponent.ctorParameters = () => [];
DecZoomAreaComponent.propDecorators = {
    reference: [{ type: Input }],
    render: [{ type: Input }],
    save: [{ type: Output }],
    cancel: [{ type: Output }],
    parentId: [{ type: Input }],
    renderZoom: [{ type: ViewChild, args: ['renderZoom',] }],
    referenceZoom: [{ type: ViewChild, args: ['referenceZoom',] }]
};
if (false) {
    /** @type {?} */
    DecZoomAreaComponent.prototype.save;
    /** @type {?} */
    DecZoomAreaComponent.prototype.cancel;
    /** @type {?} */
    DecZoomAreaComponent.prototype._reference;
    /** @type {?} */
    DecZoomAreaComponent.prototype._render;
    /** @type {?} */
    DecZoomAreaComponent.prototype.parentId;
    /** @type {?} */
    DecZoomAreaComponent.prototype.commentIndex;
    /** @type {?} */
    DecZoomAreaComponent.prototype.referenceQaMode;
    /** @type {?} */
    DecZoomAreaComponent.prototype.descripition;
    /** @type {?} */
    DecZoomAreaComponent.prototype.renderMarkdons;
    /** @type {?} */
    DecZoomAreaComponent.prototype.renderZoom;
    /** @type {?} */
    DecZoomAreaComponent.prototype.referenceZoom;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLXpvb20tYXJlYS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvZGVjLXpvb20tYXJlYS9kZWMtem9vbS1hcmVhLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUYsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUE4Q3ZFLE1BQU07SUE2Q0o7b0JBcEJpQixJQUFJLFlBQVksRUFBRTtzQkFFaEIsSUFBSSxZQUFZLEVBQUU7K0JBUW5CLEtBQUs7OEJBSU4sRUFBRTtLQU1GOzs7OztJQTNDakIsSUFDSSxTQUFTLENBQUMsQ0FBQztRQUNiLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDTixJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQztTQUNyQjtLQUNGOzs7O0lBRUQsSUFBSSxTQUFTO1FBQ1gsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7S0FDeEI7Ozs7O0lBRUQsSUFDSSxNQUFNLENBQUMsQ0FBQztRQUNWLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDTixJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztZQUNqQixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDeEM7S0FDRjs7OztJQUVELElBQUksTUFBTTtRQUNSLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO0tBQ3JCOzs7O0lBd0JELFFBQVE7S0FDUDs7OztJQUVELE1BQU07O1FBQ0osTUFBTSxPQUFPLEdBQUc7WUFDZCxXQUFXLEVBQUUsRUFBRTtZQUNmLEVBQUUsRUFBRSxJQUFJLENBQUMsUUFBUTtZQUNqQixZQUFZLEVBQUUsSUFBSSxDQUFDLFlBQVk7WUFDL0IsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTTtZQUNsQyxhQUFhLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNO1NBQ3pDLENBQUE7UUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQ3pCOzs7OztJQUVELFNBQVMsQ0FBQyxLQUFLO1FBQ2IsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7UUFDNUIsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUMsRUFBRSxDQUFDO0tBQzlCOzs7OztJQUVELGFBQWEsQ0FBQyxNQUFNO1FBQ2xCLElBQUksQ0FBQyxlQUFlLEdBQUcsS0FBSyxDQUFDO0tBQzlCOzs7O0lBRUQsUUFBUTtRQUNOLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7S0FDcEI7OztZQXJIRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGVBQWU7Z0JBQ3pCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BdUNMO2dCQUNMLE1BQU0sRUFBRSxDQUFDLG9RQUFvUSxDQUFDO2FBQy9ROzs7Ozt3QkFHRSxLQUFLO3FCQVdMLEtBQUs7bUJBWUwsTUFBTTtxQkFFTixNQUFNO3VCQUtOLEtBQUs7eUJBU0wsU0FBUyxTQUFDLFlBQVk7NEJBRXRCLFNBQVMsU0FBQyxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBWaWV3Q2hpbGQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEZWNNYXJrc0NvbXBvbmVudCB9IGZyb20gJy4vLi4vZGVjLW1hcmtzL2RlYy1tYXJrcy5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWMtem9vbS1hcmVhJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwibWFpbi1jb250YWluZXJcIiBmeExheW91dD1cImNvbHVtblwiIGZ4TGF5b3V0R2FwPVwiMTZweFwiPlxuICA8ZGl2IGZ4TGF5b3V0PVwicm93XCIgZnhMYXlvdXRBbGlnbj1cInN0YXJ0IHN0YXJ0XCI+XG5cbiAgICA8ZGl2IGZ4RmxleD1cIjUwXCIgY2xhc3M9XCJ6b29tLWNvbnRhaW5lclwiIGZ4TGF5b3V0PVwiY29sdW1uXCIgZnhMYXlvdXRHYXA9XCIxNnB4XCI+XG4gICAgICA8ZGVjLW1hcmtzIGNsYXNzPVwiem9vbS1jb250YWluZXJcIiAjcmVmZXJlbmNlWm9vbSBbbm9Db21tZW50c109XCJ0cnVlXCIgW21hcmtlcl09XCJyZWZlcmVuY2VcIiBbcWFNb2RlXT1cInJlZmVyZW5jZVFhTW9kZVwiIFtwYXJlbnRJZF09XCJwYXJlbnRJZFwiXG4gICAgICAgIChyZWZlcmVuY2VRYSk9XCJvblJlZmVyZW5jZVFhKCRldmVudClcIiBbY29tZW50SW5kZXhdPVwiY29tbWVudEluZGV4XCIgW3pvb21TY2FsZV09XCJyZWZlcmVuY2U/Lnpvb21TY2FsZVwiIFt6b29tUG9zaXRpb25dPVwicmVmZXJlbmNlPy5wb3NpdGlvblwiPlxuICAgICAgPC9kZWMtbWFya3M+XG4gICAgICA8ZGl2IGNsYXNzPVwiZmFrZS1kaXZcIj5cblxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGRpdiBmeExheW91dD1cInJvd1wiIGZ4TGF5b3V0QWxpZ249XCJzdGFydCBjZW50ZXJcIj5cbiAgICAgICAgPGgyIGNsYXNzPVwiZGVjLWNvbG9yLWdyZXlcIj5cbiAgICAgICAgICA8ZGVjLWljb24gZm9udD1cIm1hdFwiPmRlc2NyaXB0aW9uPC9kZWMtaWNvbj57eyAnbGFiZWwub2JzZXJ2YXRpb25zJyB8IHRyYW5zbGF0ZSB9fVxuICAgICAgICA8L2gyPlxuICAgICAgPC9kaXY+XG4gICAgICA8dGV4dGFyZWEgWyhuZ01vZGVsKV09XCJkZXNjcmlwaXRpb25cIiBjbGFzcz1cInRleHQtYXJlYVwiPjwvdGV4dGFyZWE+XG4gICAgPC9kaXY+XG5cblxuICAgIDxkaXYgZnhGbGV4PVwiNTBcIiBmeExheW91dD1cImNvbHVtblwiIGZ4TGF5b3V0R2FwPVwiMTZweFwiIGNsYXNzPVwiem9vbS1jb250YWluZXJcIj5cbiAgICAgIDxkZWMtbWFya3MgI3JlbmRlclpvb20gW25vQ29tbWVudHNdPVwiZmFsc2VcIiBbbWFya2VyXT1cInJlbmRlclwiIFtwYXJlbnRJZF09XCJwYXJlbnRJZFwiIFtxYU1vZGVdPVwidHJ1ZVwiIChsaW5rKT1cIm9uTGlua1RhZygkZXZlbnQpXCJcbiAgICAgICAgW3pvb21TY2FsZV09XCJyZW5kZXI/Lnpvb21TY2FsZVwiIFt6b29tUG9zaXRpb25dPVwicmVuZGVyPy5wb3NpdGlvblwiPlxuICAgICAgPC9kZWMtbWFya3M+XG5cbiAgICAgIDxkaXYgZnhMYXlvdXQ9XCJyb3dcIiBmeExheW91dEFsaWduPVwiZW5kIGNlbnRlclwiIGZ4TGF5b3V0R2FwPVwiMTZweFwiIGNsYXNzPVwiZmFrZS1kaXZcIj5cbiAgICAgICAgPGJ1dHRvbiBtYXQtYnV0dG9uIChjbGljayk9XCJvbkNhbmNlbCgpXCI+IHt7ICdsYWJlbC5jYW5jZWwnIHwgdHJhbnNsYXRlIH19IDwvYnV0dG9uPlxuICAgICAgICA8YnV0dG9uIG1hdC1mbGF0LWJ1dHRvbiBjb2xvcj1cInByaW1hcnlcIiAoY2xpY2spPVwib25TYXZlKClcIj4ge3sgJ2xhYmVsLnNhdmUnIHwgdHJhbnNsYXRlIH19IDwvYnV0dG9uPlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxkaXYgY2xhc3M9XCJjb250YWluZXItY29tbWVudHNcIiBmeExheW91dD1cImNvbHVtblwiIGZ4TGF5b3V0R2FwPVwiMTZweFwiPlxuICAgICAgICA8ZGl2IGZ4TGF5b3V0PVwicm93XCIgZnhMYXlvdXRHYXA9XCI4cHhcIj5cbiAgICAgICAgICA8aDIgY2xhc3M9XCJkZWMtY29sb3ItZ3JleVwiPlxuICAgICAgICAgICAgPGRlYy1pY29uIGZvbnQ9XCJtYXRcIj5ib29rbWFya3M8L2RlYy1pY29uPlRhZ3NcbiAgICAgICAgICA8L2gyPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRlYy1tYXJrZG93bnMtY29tbWVudCBbcGFyZW50SWRdPVwicGFyZW50SWRcIiBbcmVuZGVyc109XCJyZW5kZXJNYXJrZG9uc1wiPjwvZGVjLW1hcmtkb3ducy1jb21tZW50PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC9kaXY+YCxcbiAgc3R5bGVzOiBbYC50ZXh0LWFyZWF7d2lkdGg6OTUlO2hlaWdodDoxODVweDtwYWRkaW5nOjE1cHh9Lnpvb20tY29udGFpbmVye3dpZHRoOjEwMCV9Lm1haW4tY29udGFpbmVye3Bvc2l0aW9uOnJlbGF0aXZlO2JhY2tncm91bmQtY29sb3I6I2ZmZn0uYnV0dG9uLXNhdmV7cG9zaXRpb246YWJzb2x1dGU7ei1pbmRleDo1O3JpZ2h0OjA7dG9wOjQ1JX0uZmFrZS1kaXZ7d2lkdGg6MTAwJTtoZWlnaHQ6MzZweH0uY29udGFpbmVyLWNvbW1lbnRze3BhZGRpbmctbGVmdDoyMHB4fWBdXG59KVxuZXhwb3J0IGNsYXNzIERlY1pvb21BcmVhQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBASW5wdXQoKVxuICBzZXQgcmVmZXJlbmNlKHYpIHtcbiAgICBpZiAodikge1xuICAgICAgdGhpcy5fcmVmZXJlbmNlID0gdjtcbiAgICB9XG4gIH1cblxuICBnZXQgcmVmZXJlbmNlKCkge1xuICAgIHJldHVybiB0aGlzLl9yZWZlcmVuY2U7XG4gIH1cblxuICBASW5wdXQoKVxuICBzZXQgcmVuZGVyKHYpIHtcbiAgICBpZiAodikge1xuICAgICAgdGhpcy5fcmVuZGVyID0gdjtcbiAgICAgIHRoaXMucmVuZGVyTWFya2RvbnMucHVzaCh0aGlzLl9yZW5kZXIpO1xuICAgIH1cbiAgfVxuXG4gIGdldCByZW5kZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3JlbmRlcjtcbiAgfVxuXG4gIEBPdXRwdXQoKSBzYXZlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIEBPdXRwdXQoKSBjYW5jZWwgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIFxuICBwcml2YXRlIF9yZWZlcmVuY2U7XG4gIHByaXZhdGUgX3JlbmRlcjtcblxuICBASW5wdXQoKSBwYXJlbnRJZDogbnVtYmVyO1xuXG4gIGNvbW1lbnRJbmRleDtcbiAgcmVmZXJlbmNlUWFNb2RlID0gZmFsc2U7XG5cbiAgZGVzY3JpcGl0aW9uOiBhbnk7XG5cbiAgcmVuZGVyTWFya2RvbnMgPSBbXTtcblxuICBAVmlld0NoaWxkKCdyZW5kZXJab29tJykgcmVuZGVyWm9vbTogRGVjTWFya3NDb21wb25lbnQ7XG5cbiAgQFZpZXdDaGlsZCgncmVmZXJlbmNlWm9vbScpIHJlZmVyZW5jZVpvb206IERlY01hcmtzQ29tcG9uZW50O1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxuICBvblNhdmUoKSB7XG4gICAgY29uc3Qgc2F2ZU9iaiA9IHtcbiAgICAgIGNvb3JkaW5hdGVzOiBbXSxcbiAgICAgIGlkOiB0aGlzLnBhcmVudElkLFxuICAgICAgZGVzY3JpcGl0aW9uOiB0aGlzLmRlc2NyaXBpdGlvbixcbiAgICAgIHJlbmRlclNob3Q6IHRoaXMucmVuZGVyWm9vbS5tYXJrZXIsXG4gICAgICByZWZlcmVuY2VTaG90OiB0aGlzLnJlZmVyZW5jZVpvb20ubWFya2VyXG4gICAgfVxuICAgIGNvbnNvbGUubG9nKHNhdmVPYmopO1xuICAgIHRoaXMuc2F2ZS5lbWl0KHNhdmVPYmopO1xuICB9XG5cbiAgb25MaW5rVGFnKGV2ZW50KSB7XG4gICAgdGhpcy5yZWZlcmVuY2VRYU1vZGUgPSB0cnVlO1xuICAgIHRoaXMuY29tbWVudEluZGV4ID0gZXZlbnQuaWQ7XG4gIH1cblxuICBvblJlZmVyZW5jZVFhKCRldmVudCkge1xuICAgIHRoaXMucmVmZXJlbmNlUWFNb2RlID0gZmFsc2U7XG4gIH1cblxuICBvbkNhbmNlbCgpIHtcbiAgICB0aGlzLmNhbmNlbC5lbWl0KCk7XG4gIH1cbn1cbiJdfQ==