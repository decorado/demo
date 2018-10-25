/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DecColorService } from './../../../services/color/dec-color.service';
import { ColorPickerService } from './../../../services/color-picker/color-picker.service';
import { takeUntil, mergeMap } from 'rxjs/operators';
import { fromEvent } from 'rxjs';
var DecColorPickerModalComponent = /** @class */ (function () {
    function DecColorPickerModalComponent(dialogRef, data, decColorService, colorPickerService) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.decColorService = decColorService;
        this.colorPickerService = colorPickerService;
        this.hex = this.data.color;
    }
    /**
     * @return {?}
     */
    DecColorPickerModalComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.load();
        this.dragInit();
    };
    /**
     * @return {?}
     */
    DecColorPickerModalComponent.prototype.load = /**
     * @return {?}
     */
    function () {
        this.rgb = this.hex ? this.decColorService.hexToRgb(this.hex) : null;
        if (this.rgb) {
            this.red = parseInt(this.rgb[0], 10);
            this.green = parseInt(this.rgb[1], 10);
            this.blue = parseInt(this.rgb[2], 10);
            this.rgb = "rgb(" + this.red + "," + this.green + "," + this.blue + ")";
        }
    };
    /**
     * @return {?}
     */
    DecColorPickerModalComponent.prototype.dragInit = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var dragItem = document.querySelector('.color-picker-container');
        /** @type {?} */
        var dragger = document.querySelector('.color-preview');
        /** @type {?} */
        var move$ = fromEvent(document, 'mousemove');
        /** @type {?} */
        var down$ = fromEvent(dragger, 'mousedown');
        /** @type {?} */
        var up$ = fromEvent(document, 'mouseup');
        /** @type {?} */
        var drag$ = down$.pipe(mergeMap(function () {
            dragItem.style.position = 'absolute';
            return move$.pipe(takeUntil(up$));
        }));
        drag$.subscribe(function (event) {
            dragItem.style.top = event.clientY - 160 + "px";
            dragItem.style.left = event.clientX - 160 + "px";
        });
    };
    /**
     * @return {?}
     */
    DecColorPickerModalComponent.prototype.changeRgbValue = /**
     * @return {?}
     */
    function () {
        this.hex = this.decColorService.rgbToHex(this.red || 0, this.green || 0, this.blue || 0);
        this.rgb = this.decColorService.hexToRgb(this.hex, true);
    };
    /**
     * @return {?}
     */
    DecColorPickerModalComponent.prototype.startColorPicker = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var colorContainer = document.getElementById('colorContainer');
        colorContainer.style.display = 'none';
        this.colorPickerService.start.subscribe(function (color) {
            colorContainer.style.display = 'block';
            _this.hex = color;
            _this.load();
        });
    };
    /**
     * @return {?}
     */
    DecColorPickerModalComponent.prototype.cancel = /**
     * @return {?}
     */
    function () {
        this.dialogRef.close();
    };
    /**
     * @return {?}
     */
    DecColorPickerModalComponent.prototype.apply = /**
     * @return {?}
     */
    function () {
        this.dialogRef.close(this.hex);
    };
    DecColorPickerModalComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dec-color-picker-modal',
                    template: "<div fxLayout=\"column\">\n  <div class=\"color-preview\" [ngStyle]=\"{'backgroundColor': hex}\">\n    <dec-icon font=\"mat\" class=\"close-preview\" (click)=\"cancel()\">close</dec-icon>\n  </div>\n  <div class=\"color-options-container\" fxLayout=\"column\">\n    <div fxLayout=\"row\" fxLayoutAlign=\"start center\" fxLayoutGap=\"8px\">\n      <span>R</span>\n      <mat-slider fxFlex min=\"0\" max=\"255\" step=\"1\" [value]=\"red\" [(ngModel)]=\"red\" (ngModelChange)=\"changeRgbValue()\"></mat-slider>\n    </div>\n    <div fxLayout=\"row\" fxLayoutAlign=\"start center\" fxLayoutGap=\"8px\">\n      <span>G</span>\n      <mat-slider fxFlex min=\"0\" max=\"255\" step=\"1\" [value]=\"green\" [(ngModel)]=\"green\" (ngModelChange)=\"changeRgbValue()\"></mat-slider>\n    </div>\n    <div fxLayout=\"row\" fxLayoutAlign=\"start center\" fxLayoutGap=\"8px\">\n      <span>B</span>\n      <mat-slider fxFlex min=\"0\" max=\"255\" step=\"1\" [value]=\"blue\" [(ngModel)]=\"blue\" (ngModelChange)=\"changeRgbValue()\"></mat-slider>\n    </div>\n\n    <div fxLayout=\"column\" fxLayoutAlign=\"start\" fxLayoutGap=\"16px\" class=\"color-input-container\">\n\n      <div fxLayout=\"row\" fxLayoutAlign=\"start center\" fxLayoutGap=\"16px\">\n\n        <div fxFlex>RGB</div>\n\n        <input matInput type=\"number\" min=\"0\" max=\"255\" value=\"red\" [(ngModel)]=\"red\" (ngModelChange)=\"changeRgbValue()\"\n          autocomplete=\"off\">\n\n        <input matInput type=\"number\" min=\"0\" max=\"255\" value=\"green\" [(ngModel)]=\"green\" (ngModelChange)=\"changeRgbValue()\"\n          autocomplete=\"off\">\n\n        <input matInput type=\"number\" min=\"0\" max=\"255\" value=\"blue\" [(ngModel)]=\"blue\" (ngModelChange)=\"changeRgbValue()\"\n          autocomplete=\"off\">\n\n      </div>\n\n      <div fxLayout=\"row\" fxLayoutAlign=\"start center\" fxLayoutGap=\"16px\">\n\n        <div fxFlex>HEX</div>\n\n        <input matInput type=\"text\" value=\"hex\" [(ngModel)]=\"hex\" autocomplete=\"off\">\n\n        <dec-icon font=\"mat\" (click)=\"startColorPicker()\">colorize</dec-icon>\n\n      </div>\n\n    </div>\n\n    <div fxLayout=\"row\" fxLayoutGap=\"8px\" fxLayoutAlign=\"end center\" class=\"dialog-actions\">\n      <button mat-button type=\"button\" (click)=\"cancel()\">{{ 'label.Cancel' | translate | uppercase }}</button>\n      <button mat-raised-button color=\"primary\" type=\"button\" (click)=\"apply()\">{{ 'label.Apply' | translate | uppercase }}</button>\n    </div>\n\n  </div>\n\n</div>\n",
                    styles: [".color-preview{height:320px;margin:0;padding:0;position:relative;cursor:-webkit-grab;cursor:grab}.color-preview .close-preview{position:absolute;right:0;top:0;cursor:pointer}.color-preview .close-preview:hover{color:#fff}.color-options-container{background-color:#eee;padding:0 16px;box-shadow:0 11px 15px -7px rgba(0,0,0,.2),0 24px 38px 3px rgba(0,0,0,.14),0 9px 46px 8px rgba(0,0,0,.12)}.color-options-container .color-input-container{margin-bottom:16px}.color-options-container .color-input-container input{text-align:center;border-bottom:1px solid #ccc}.color-options-container .color-input-container input:focus{border-color:rgba(0,0,0,.7)}.color-options-container .color-input-container input[type=number]::-webkit-inner-spin-button,.color-options-container .color-input-container input[type=number]::-webkit-outer-spin-button{-webkit-appearance:none}.color-options-container .color-input-container input[type=number]{-moz-appearance:textfield}.color-options-container .color-input-container dec-icon{cursor:pointer}.dialog-actions{text-align:right;background-color:#eee;padding-bottom:8px}"]
                },] },
    ];
    /** @nocollapse */
    DecColorPickerModalComponent.ctorParameters = function () { return [
        { type: MatDialogRef },
        { type: undefined, decorators: [{ type: Inject, args: [MAT_DIALOG_DATA,] }] },
        { type: DecColorService },
        { type: ColorPickerService }
    ]; };
    return DecColorPickerModalComponent;
}());
export { DecColorPickerModalComponent };
if (false) {
    /** @type {?} */
    DecColorPickerModalComponent.prototype.red;
    /** @type {?} */
    DecColorPickerModalComponent.prototype.green;
    /** @type {?} */
    DecColorPickerModalComponent.prototype.blue;
    /** @type {?} */
    DecColorPickerModalComponent.prototype.hex;
    /** @type {?} */
    DecColorPickerModalComponent.prototype.rgb;
    /** @type {?} */
    DecColorPickerModalComponent.prototype.dialogRef;
    /** @type {?} */
    DecColorPickerModalComponent.prototype.data;
    /** @type {?} */
    DecColorPickerModalComponent.prototype.decColorService;
    /** @type {?} */
    DecColorPickerModalComponent.prototype.colorPickerService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLWNvbG9yLXBpY2tlci1tb2RhbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvZGVjLWNvbG9yLXBpY2tlci9kZWMtY29sb3ItcGlja2VyLW1vZGFsL2RlYy1jb2xvci1waWNrZXItbW9kYWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxRCxPQUFPLEVBQUUsZUFBZSxFQUFFLFlBQVksRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUM5RSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx1REFBdUQsQ0FBQztBQUMzRixPQUFPLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxNQUFNLENBQUM7O0lBMEUvQixzQ0FDVSxXQUN5QixJQUFTLEVBQ2xDLGlCQUNBO1FBSEEsY0FBUyxHQUFULFNBQVM7UUFDZ0IsU0FBSSxHQUFKLElBQUksQ0FBSztRQUNsQyxvQkFBZSxHQUFmLGVBQWU7UUFDZix1QkFBa0IsR0FBbEIsa0JBQWtCO1FBRTFCLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7S0FDNUI7Ozs7SUFFRCwrQ0FBUTs7O0lBQVI7UUFDRSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDWixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7S0FDakI7Ozs7SUFFTywyQ0FBSTs7OztRQUNWLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMs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O0tBQ3hCOzs7O0lBRUQsNENBQUs7OztJQUFMO1FBQ0UsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ2hDOztnQkE1SUYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSx3QkFBd0I7b0JBQ2xDLFFBQVEsRUFBRSwrOUVBdURYO29CQUNDLE1BQU0sRUFBRSxDQUFDLDBrQ0FBMGtDLENBQUM7aUJBQ3JsQzs7OztnQkFqRXlCLFlBQVk7Z0RBZ0ZqQyxNQUFNLFNBQUMsZUFBZTtnQkEvRWxCLGVBQWU7Z0JBQ2Ysa0JBQWtCOzt1Q0FIM0I7O1NBbUVhLDRCQUE0QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1BVF9ESUFMT0dfREFUQSwgTWF0RGlhbG9nUmVmIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgRGVjQ29sb3JTZXJ2aWNlIH0gZnJvbSAnLi8uLi8uLi8uLi9zZXJ2aWNlcy9jb2xvci9kZWMtY29sb3Iuc2VydmljZSc7XG5pbXBvcnQgeyBDb2xvclBpY2tlclNlcnZpY2UgfSBmcm9tICcuLy4uLy4uLy4uL3NlcnZpY2VzL2NvbG9yLXBpY2tlci9jb2xvci1waWNrZXIuc2VydmljZSc7XG5pbXBvcnQgeyB0YWtlVW50aWwsIG1lcmdlTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgZnJvbUV2ZW50IH0gZnJvbSAncnhqcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1jb2xvci1waWNrZXItbW9kYWwnLFxuICB0ZW1wbGF0ZTogYDxkaXYgZnhMYXlvdXQ9XCJjb2x1bW5cIj5cbiAgPGRpdiBjbGFzcz1cImNvbG9yLXByZXZpZXdcIiBbbmdTdHlsZV09XCJ7J2JhY2tncm91bmRDb2xvcic6IGhleH1cIj5cbiAgICA8ZGVjLWljb24gZm9udD1cIm1hdFwiIGNsYXNzPVwiY2xvc2UtcHJldmlld1wiIChjbGljayk9XCJjYW5jZWwoKVwiPmNsb3NlPC9kZWMtaWNvbj5cbiAgPC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJjb2xvci1vcHRpb25zLWNvbnRhaW5lclwiIGZ4TGF5b3V0PVwiY29sdW1uXCI+XG4gICAgPGRpdiBmeExheW91dD1cInJvd1wiIGZ4TGF5b3V0QWxpZ249XCJzdGFydCBjZW50ZXJcIiBmeExheW91dEdhcD1cIjhweFwiPlxuICAgICAgPHNwYW4+Ujwvc3Bhbj5cbiAgICAgIDxtYXQtc2xpZGVyIGZ4RmxleCBtaW49XCIwXCIgbWF4PVwiMjU1XCIgc3RlcD1cIjFcIiBbdmFsdWVdPVwicmVkXCIgWyhuZ01vZGVsKV09XCJyZWRcIiAobmdNb2RlbENoYW5nZSk9XCJjaGFuZ2VSZ2JWYWx1ZSgpXCI+PC9tYXQtc2xpZGVyPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgZnhMYXlvdXQ9XCJyb3dcIiBmeExheW91dEFsaWduPVwic3RhcnQgY2VudGVyXCIgZnhMYXlvdXRHYXA9XCI4cHhcIj5cbiAgICAgIDxzcGFuPkc8L3NwYW4+XG4gICAgICA8bWF0LXNsaWRlciBmeEZsZXggbWluPVwiMFwiIG1heD1cIjI1NVwiIHN0ZXA9XCIxXCIgW3ZhbHVlXT1cImdyZWVuXCIgWyhuZ01vZGVsKV09XCJncmVlblwiIChuZ01vZGVsQ2hhbmdlKT1cImNoYW5nZVJnYlZhbHVlKClcIj48L21hdC1zbGlkZXI+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBmeExheW91dD1cInJvd1wiIGZ4TGF5b3V0QWxpZ249XCJzdGFydCBjZW50ZXJcIiBmeExheW91dEdhcD1cIjhweFwiPlxuICAgICAgPHNwYW4+Qjwvc3Bhbj5cbiAgICAgIDxtYXQtc2xpZGVyIGZ4RmxleCBtaW49XCIwXCIgbWF4PVwiMjU1XCIgc3RlcD1cIjFcIiBbdmFsdWVdPVwiYmx1ZVwiIFsobmdNb2RlbCldPVwiYmx1ZVwiIChuZ01vZGVsQ2hhbmdlKT1cImNoYW5nZVJnYlZhbHVlKClcIj48L21hdC1zbGlkZXI+XG4gICAgPC9kaXY+XG5cbiAgICA8ZGl2IGZ4TGF5b3V0PVwiY29sdW1uXCIgZnhMYXlvdXRBbGlnbj1cInN0YXJ0XCIgZnhMYXlvdXRHYXA9XCIxNnB4XCIgY2xhc3M9XCJjb2xvci1pbnB1dC1jb250YWluZXJcIj5cblxuICAgICAgPGRpdiBmeExheW91dD1cInJvd1wiIGZ4TGF5b3V0QWxpZ249XCJzdGFydCBjZW50ZXJcIiBmeExheW91dEdhcD1cIjE2cHhcIj5cblxuICAgICAgICA8ZGl2IGZ4RmxleD5SR0I8L2Rpdj5cblxuICAgICAgICA8aW5wdXQgbWF0SW5wdXQgdHlwZT1cIm51bWJlclwiIG1pbj1cIjBcIiBtYXg9XCIyNTVcIiB2YWx1ZT1cInJlZFwiIFsobmdNb2RlbCldPVwicmVkXCIgKG5nTW9kZWxDaGFuZ2UpPVwiY2hhbmdlUmdiVmFsdWUoKVwiXG4gICAgICAgICAgYXV0b2NvbXBsZXRlPVwib2ZmXCI+XG5cbiAgICAgICAgPGlucHV0IG1hdElucHV0IHR5cGU9XCJudW1iZXJcIiBtaW49XCIwXCIgbWF4PVwiMjU1XCIgdmFsdWU9XCJncmVlblwiIFsobmdNb2RlbCldPVwiZ3JlZW5cIiAobmdNb2RlbENoYW5nZSk9XCJjaGFuZ2VSZ2JWYWx1ZSgpXCJcbiAgICAgICAgICBhdXRvY29tcGxldGU9XCJvZmZcIj5cblxuICAgICAgICA8aW5wdXQgbWF0SW5wdXQgdHlwZT1cIm51bWJlclwiIG1pbj1cIjBcIiBtYXg9XCIyNTVcIiB2YWx1ZT1cImJsdWVcIiBbKG5nTW9kZWwpXT1cImJsdWVcIiAobmdNb2RlbENoYW5nZSk9XCJjaGFuZ2VSZ2JWYWx1ZSgpXCJcbiAgICAgICAgICBhdXRvY29tcGxldGU9XCJvZmZcIj5cblxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxkaXYgZnhMYXlvdXQ9XCJyb3dcIiBmeExheW91dEFsaWduPVwic3RhcnQgY2VudGVyXCIgZnhMYXlvdXRHYXA9XCIxNnB4XCI+XG5cbiAgICAgICAgPGRpdiBmeEZsZXg+SEVYPC9kaXY+XG5cbiAgICAgICAgPGlucHV0IG1hdElucHV0IHR5cGU9XCJ0ZXh0XCIgdmFsdWU9XCJoZXhcIiBbKG5nTW9kZWwpXT1cImhleFwiIGF1dG9jb21wbGV0ZT1cIm9mZlwiPlxuXG4gICAgICAgIDxkZWMtaWNvbiBmb250PVwibWF0XCIgKGNsaWNrKT1cInN0YXJ0Q29sb3JQaWNrZXIoKVwiPmNvbG9yaXplPC9kZWMtaWNvbj5cblxuICAgICAgPC9kaXY+XG5cbiAgICA8L2Rpdj5cblxuICAgIDxkaXYgZnhMYXlvdXQ9XCJyb3dcIiBmeExheW91dEdhcD1cIjhweFwiIGZ4TGF5b3V0QWxpZ249XCJlbmQgY2VudGVyXCIgY2xhc3M9XCJkaWFsb2ctYWN0aW9uc1wiPlxuICAgICAgPGJ1dHRvbiBtYXQtYnV0dG9uIHR5cGU9XCJidXR0b25cIiAoY2xpY2spPVwiY2FuY2VsKClcIj57eyAnbGFiZWwuQ2FuY2VsJyB8IHRyYW5zbGF0ZSB8IHVwcGVyY2FzZSB9fTwvYnV0dG9uPlxuICAgICAgPGJ1dHRvbiBtYXQtcmFpc2VkLWJ1dHRvbiBjb2xvcj1cInByaW1hcnlcIiB0eXBlPVwiYnV0dG9uXCIgKGNsaWNrKT1cImFwcGx5KClcIj57eyAnbGFiZWwuQXBwbHknIHwgdHJhbnNsYXRlIHwgdXBwZXJjYXNlIH19PC9idXR0b24+XG4gICAgPC9kaXY+XG5cbiAgPC9kaXY+XG5cbjwvZGl2PlxuYCxcbiAgc3R5bGVzOiBbYC5jb2xvci1wcmV2aWV3e2hlaWdodDozMjBweDttYXJnaW46MDtwYWRkaW5nOjA7cG9zaXRpb246cmVsYXRpdmU7Y3Vyc29yOi13ZWJraXQtZ3JhYjtjdXJzb3I6Z3JhYn0uY29sb3ItcHJldmlldyAuY2xvc2UtcHJldmlld3twb3NpdGlvbjphYnNvbHV0ZTtyaWdodDowO3RvcDowO2N1cnNvcjpwb2ludGVyfS5jb2xvci1wcmV2aWV3IC5jbG9zZS1wcmV2aWV3OmhvdmVye2NvbG9yOiNmZmZ9LmNvbG9yLW9wdGlvbnMtY29udGFpbmVye2JhY2tncm91bmQtY29sb3I6I2VlZTtwYWRkaW5nOjAgMTZweDtib3gtc2hhZG93OjAgMTFweCAxNXB4IC03cHggcmdiYSgwLDAsMCwuMiksMCAyNHB4IDM4cHggM3B4IHJnYmEoMCwwLDAsLjE0KSwwIDlweCA0NnB4IDhweCByZ2JhKDAsMCwwLC4xMil9LmNvbG9yLW9wdGlvbnMtY29udGFpbmVyIC5jb2xvci1pbnB1dC1jb250YWluZXJ7bWFyZ2luLWJvdHRvbToxNnB4fS5jb2xvci1vcHRpb25zLWNvbnRhaW5lciAuY29sb3ItaW5wdXQtY29udGFpbmVyIGlucHV0e3RleHQtYWxpZ246Y2VudGVyO2JvcmRlci1ib3R0b206MXB4IHNvbGlkICNjY2N9LmNvbG9yLW9wdGlvbnMtY29udGFpbmVyIC5jb2xvci1pbnB1dC1jb250YWluZXIgaW5wdXQ6Zm9jdXN7Ym9yZGVyLWNvbG9yOnJnYmEoMCwwLDAsLjcpfS5jb2xvci1vcHRpb25zLWNvbnRhaW5lciAuY29sb3ItaW5wdXQtY29udGFpbmVyIGlucHV0W3R5cGU9bnVtYmVyXTo6LXdlYmtpdC1pbm5lci1zcGluLWJ1dHRvbiwuY29sb3Itb3B0aW9ucy1jb250YWluZXIgLmNvbG9yLWlucHV0LWNvbnRhaW5lciBpbnB1dFt0eXBlPW51bWJlcl06Oi13ZWJraXQtb3V0ZXItc3Bpbi1idXR0b257LXdlYmtpdC1hcHBlYXJhbmNlOm5vbmV9LmNvbG9yLW9wdGlvbnMtY29udGFpbmVyIC5jb2xvci1pbnB1dC1jb250YWluZXIgaW5wdXRbdHlwZT1udW1iZXJdey1tb3otYXBwZWFyYW5jZTp0ZXh0ZmllbGR9LmNvbG9yLW9wdGlvbnMtY29udGFpbmVyIC5jb2xvci1pbnB1dC1jb250YWluZXIgZGVjLWljb257Y3Vyc29yOnBvaW50ZXJ9LmRpYWxvZy1hY3Rpb25ze3RleHQtYWxpZ246cmlnaHQ7YmFja2dyb3VuZC1jb2xvcjojZWVlO3BhZGRpbmctYm90dG9tOjhweH1gXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNDb2xvclBpY2tlck1vZGFsQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICByZWQ6IG51bWJlcjtcblxuICBncmVlbjogbnVtYmVyO1xuXG4gIGJsdWU6IG51bWJlcjtcblxuICBoZXg6IHN0cmluZztcblxuICByZ2I6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGRpYWxvZ1JlZjogTWF0RGlhbG9nUmVmPERlY0NvbG9yUGlja2VyTW9kYWxDb21wb25lbnQ+LFxuICAgIEBJbmplY3QoTUFUX0RJQUxPR19EQVRBKSBwcml2YXRlIGRhdGE6IGFueSxcbiAgICBwcml2YXRlIGRlY0NvbG9yU2VydmljZTogRGVjQ29sb3JTZXJ2aWNlLFxuICAgIHByaXZhdGUgY29sb3JQaWNrZXJTZXJ2aWNlOiBDb2xvclBpY2tlclNlcnZpY2VcbiAgKSB7XG4gICAgdGhpcy5oZXggPSB0aGlzLmRhdGEuY29sb3I7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmxvYWQoKTtcbiAgICB0aGlzLmRyYWdJbml0KCk7XG4gIH1cblxuICBwcml2YXRlIGxvYWQoKSB7XG4gICAgdGhpcy5yZ2IgPSB0aGlzLmhleCA/IHRoaXMuZGVjQ29sb3JTZXJ2aWNlLmhleFRvUmdiKHRoaXMuaGV4KSA6IG51bGw7XG4gICAgaWYgKHRoaXMucmdiKSB7XG4gICAgICB0aGlzLnJlZCA9IHBhcnNlSW50KHRoaXMucmdiWzBdLCAxMCk7XG4gICAgICB0aGlzLmdyZWVuID0gcGFyc2VJbnQodGhpcy5yZ2JbMV0sIDEwKTtcbiAgICAgIHRoaXMuYmx1ZSA9IHBhcnNlSW50KHRoaXMucmdiWzJdLCAxMCk7XG4gICAgICB0aGlzLnJnYiA9IGByZ2IoJHt0aGlzLnJlZH0sJHt0aGlzLmdyZWVufSwke3RoaXMuYmx1ZX0pYDtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGRyYWdJbml0KCkge1xuXG4gICAgY29uc3QgZHJhZ0l0ZW06IEhUTUxEaXZFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbG9yLXBpY2tlci1jb250YWluZXInKTtcbiAgICBjb25zdCBkcmFnZ2VyOiBIVE1MRGl2RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb2xvci1wcmV2aWV3Jyk7XG5cbiAgICBjb25zdCBtb3ZlJCA9IGZyb21FdmVudChkb2N1bWVudCwgJ21vdXNlbW92ZScpO1xuICAgIGNvbnN0IGRvd24kID0gZnJvbUV2ZW50KGRyYWdnZXIsICdtb3VzZWRvd24nKTtcbiAgICBjb25zdCB1cCQgPSBmcm9tRXZlbnQoZG9jdW1lbnQsICdtb3VzZXVwJyk7XG5cbiAgICBjb25zdCBkcmFnJCA9IGRvd24kLnBpcGUoXG4gICAgICBtZXJnZU1hcCgoKSA9PiB7XG4gICAgICAgIGRyYWdJdGVtLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICAgICAgcmV0dXJuIG1vdmUkLnBpcGUodGFrZVVudGlsKHVwJCkpO1xuICAgICAgfSlcbiAgICApO1xuXG4gICAgZHJhZyQuc3Vic2NyaWJlKChldmVudDogTW91c2VFdmVudCkgPT4ge1xuICAgICAgZHJhZ0l0ZW0uc3R5bGUudG9wID0gYCR7ZXZlbnQuY2xpZW50WSAtIDE2MH1weGA7XG4gICAgICBkcmFnSXRlbS5zdHlsZS5sZWZ0ID0gYCR7ZXZlbnQuY2xpZW50WCAtIDE2MH1weGA7XG4gICAgfSk7XG5cbiAgfVxuXG4gIGNoYW5nZVJnYlZhbHVlKCkge1xuICAgIHRoaXMuaGV4ID0gdGhpcy5kZWNDb2xvclNlcnZpY2UucmdiVG9IZXgodGhpcy5yZWQgfHwgMCwgdGhpcy5ncmVlbiB8fCAwLCB0aGlzLmJsdWUgfHwgMCk7XG4gICAgdGhpcy5yZ2IgPSB0aGlzLmRlY0NvbG9yU2VydmljZS5oZXhUb1JnYih0aGlzLmhleCwgdHJ1ZSk7XG4gIH1cblxuICBzdGFydENvbG9yUGlja2VyKCkge1xuICAgIGNvbnN0IGNvbG9yQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbG9yQ29udGFpbmVyJyk7XG4gICAgY29sb3JDb250YWluZXIuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICB0aGlzLmNvbG9yUGlja2VyU2VydmljZS5zdGFydC5zdWJzY3JpYmUoKGNvbG9yOiBzdHJpbmcpID0+IHtcbiAgICAgIGNvbG9yQ29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgdGhpcy5oZXggPSBjb2xvcjtcbiAgICAgIHRoaXMubG9hZCgpO1xuICAgIH0pO1xuICB9XG5cbiAgY2FuY2VsKCkge1xuICAgIHRoaXMuZGlhbG9nUmVmLmNsb3NlKCk7XG4gIH1cblxuICBhcHBseSgpIHtcbiAgICB0aGlzLmRpYWxvZ1JlZi5jbG9zZSh0aGlzLmhleCk7XG4gIH1cblxufVxuIl19