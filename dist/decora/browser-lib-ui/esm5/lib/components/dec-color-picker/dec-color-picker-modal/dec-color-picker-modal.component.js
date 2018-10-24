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
    DecColorPickerModalComponent.prototype.close = /**
     * @return {?}
     */
    function () {
        this.dialogRef.close(this.hex);
    };
    DecColorPickerModalComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dec-color-picker-modal',
                    template: "<div fxLayout=\"column\">\n  <div class=\"color-preview\" [ngStyle]=\"{'backgroundColor': hex}\">\n    <dec-icon font=\"mat\" class=\"close-preview\" (click)=\"close()\">close</dec-icon>\n  </div>\n  <div class=\"color-options-container\" fxLayout=\"column\">\n    <div fxLayout=\"row\" fxLayoutAlign=\"start center\" fxLayoutGap=\"8px\">\n      <span>R</span>\n      <mat-slider fxFlex min=\"0\" max=\"255\" step=\"1\" [value]=\"red\" [(ngModel)]=\"red\" (ngModelChange)=\"changeRgbValue()\"></mat-slider>\n    </div>\n    <div fxLayout=\"row\" fxLayoutAlign=\"start center\" fxLayoutGap=\"8px\">\n      <span>G</span>\n      <mat-slider fxFlex min=\"0\" max=\"255\" step=\"1\" [value]=\"green\" [(ngModel)]=\"green\" (ngModelChange)=\"changeRgbValue()\"></mat-slider>\n    </div>\n    <div fxLayout=\"row\" fxLayoutAlign=\"start center\" fxLayoutGap=\"8px\">\n      <span>B</span>\n      <mat-slider fxFlex min=\"0\" max=\"255\" step=\"1\" [value]=\"blue\" [(ngModel)]=\"blue\" (ngModelChange)=\"changeRgbValue()\"></mat-slider>\n    </div>\n\n    <div fxLayout=\"column\" fxLayoutAlign=\"start\" fxLayoutGap=\"16px\" class=\"color-input-container\">\n\n      <div fxLayout=\"row\" fxLayoutAlign=\"start center\" fxLayoutGap=\"16px\">\n\n        <div fxFlex>RGB</div>\n\n        <input matInput type=\"number\" min=\"0\" max=\"255\" value=\"red\" [(ngModel)]=\"red\" (ngModelChange)=\"changeRgbValue()\"\n          autocomplete=\"off\">\n\n        <input matInput type=\"number\" min=\"0\" max=\"255\" value=\"green\" [(ngModel)]=\"green\" (ngModelChange)=\"changeRgbValue()\"\n          autocomplete=\"off\">\n\n        <input matInput type=\"number\" min=\"0\" max=\"255\" value=\"blue\" [(ngModel)]=\"blue\" (ngModelChange)=\"changeRgbValue()\"\n          autocomplete=\"off\">\n\n      </div>\n\n      <div fxLayout=\"row\" fxLayoutAlign=\"start center\" fxLayoutGap=\"16px\">\n\n        <div fxFlex>HEX</div>\n\n        <input matInput type=\"text\" value=\"hex\" [(ngModel)]=\"hex\" autocomplete=\"off\">\n\n        <dec-icon font=\"mat\" (click)=\"startColorPicker()\">colorize</dec-icon>\n\n      </div>\n\n    </div>\n\n  </div>\n</div>\n",
                    styles: [".color-preview{height:320px;margin:0;padding:0;position:relative;cursor:-webkit-grab;cursor:grab}.color-preview .close-preview{position:absolute;right:0;top:0;cursor:pointer}.color-preview .close-preview:hover{color:#fff}.color-options-container{background-color:#eee;padding:0 16px;box-shadow:0 11px 15px -7px rgba(0,0,0,.2),0 24px 38px 3px rgba(0,0,0,.14),0 9px 46px 8px rgba(0,0,0,.12)}.color-options-container .color-input-container{margin-bottom:16px}.color-options-container .color-input-container input{text-align:center;border-bottom:1px solid #ccc}.color-options-container .color-input-container input:focus{border-color:rgba(0,0,0,.7)}.color-options-container .color-input-container input[type=number]::-webkit-inner-spin-button,.color-options-container .color-input-container input[type=number]::-webkit-outer-spin-button{-webkit-appearance:none}.color-options-container .color-input-container input[type=number]{-moz-appearance:textfield}.color-options-container .color-input-container dec-icon{cursor:pointer}"]
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLWNvbG9yLXBpY2tlci1tb2RhbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvZGVjLWNvbG9yLXBpY2tlci9kZWMtY29sb3ItcGlja2VyLW1vZGFsL2RlYy1jb2xvci1waWNrZXItbW9kYWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxRCxPQUFPLEVBQUUsZUFBZSxFQUFFLFlBQVksRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUM5RSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx1REFBdUQsQ0FBQztBQUMzRixPQUFPLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxNQUFNLENBQUM7O0lBa0UvQixzQ0FDVSxXQUN5QixJQUFTLEVBQ2xDLGlCQUNBO1FBSEEsY0FBUyxHQUFULFNBQVM7UUFDZ0IsU0FBSSxHQUFKLElBQUksQ0FBSztRQUNsQyxvQkFBZSxHQUFmLGVBQWU7UUFDZix1QkFBa0IsR0FBbEIsa0JBQWtCO1FBRTFCLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7S0FDNUI7Ozs7SUFFRCwrQ0FBUTs7O0lBQVI7UUFDRSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDWixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7S0FDakI7Ozs7SUFFTywyQ0FBSTs7OztRQUNWLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMs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LENBQUMsR0FBRyxDQUFDLENBQUM7S0FDaEM7O2dCQWhJRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLHdCQUF3QjtvQkFDbEMsUUFBUSxFQUFFLHVtRUFpRFg7b0JBQ0MsTUFBTSxFQUFFLENBQUMsZ2dDQUFnZ0MsQ0FBQztpQkFDM2dDOzs7O2dCQTNEeUIsWUFBWTtnREF3RWpDLE1BQU0sU0FBQyxlQUFlO2dCQXZFbEIsZUFBZTtnQkFDZixrQkFBa0I7O3VDQUgzQjs7U0E2RGEsNEJBQTRCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTUFUX0RJQUxPR19EQVRBLCBNYXREaWFsb2dSZWYgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBEZWNDb2xvclNlcnZpY2UgfSBmcm9tICcuLy4uLy4uLy4uL3NlcnZpY2VzL2NvbG9yL2RlYy1jb2xvci5zZXJ2aWNlJztcbmltcG9ydCB7IENvbG9yUGlja2VyU2VydmljZSB9IGZyb20gJy4vLi4vLi4vLi4vc2VydmljZXMvY29sb3ItcGlja2VyL2NvbG9yLXBpY2tlci5zZXJ2aWNlJztcbmltcG9ydCB7IHRha2VVbnRpbCwgbWVyZ2VNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBmcm9tRXZlbnQgfSBmcm9tICdyeGpzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGVjLWNvbG9yLXBpY2tlci1tb2RhbCcsXG4gIHRlbXBsYXRlOiBgPGRpdiBmeExheW91dD1cImNvbHVtblwiPlxuICA8ZGl2IGNsYXNzPVwiY29sb3ItcHJldmlld1wiIFtuZ1N0eWxlXT1cInsnYmFja2dyb3VuZENvbG9yJzogaGV4fVwiPlxuICAgIDxkZWMtaWNvbiBmb250PVwibWF0XCIgY2xhc3M9XCJjbG9zZS1wcmV2aWV3XCIgKGNsaWNrKT1cImNsb3NlKClcIj5jbG9zZTwvZGVjLWljb24+XG4gIDwvZGl2PlxuICA8ZGl2IGNsYXNzPVwiY29sb3Itb3B0aW9ucy1jb250YWluZXJcIiBmeExheW91dD1cImNvbHVtblwiPlxuICAgIDxkaXYgZnhMYXlvdXQ9XCJyb3dcIiBmeExheW91dEFsaWduPVwic3RhcnQgY2VudGVyXCIgZnhMYXlvdXRHYXA9XCI4cHhcIj5cbiAgICAgIDxzcGFuPlI8L3NwYW4+XG4gICAgICA8bWF0LXNsaWRlciBmeEZsZXggbWluPVwiMFwiIG1heD1cIjI1NVwiIHN0ZXA9XCIxXCIgW3ZhbHVlXT1cInJlZFwiIFsobmdNb2RlbCldPVwicmVkXCIgKG5nTW9kZWxDaGFuZ2UpPVwiY2hhbmdlUmdiVmFsdWUoKVwiPjwvbWF0LXNsaWRlcj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGZ4TGF5b3V0PVwicm93XCIgZnhMYXlvdXRBbGlnbj1cInN0YXJ0IGNlbnRlclwiIGZ4TGF5b3V0R2FwPVwiOHB4XCI+XG4gICAgICA8c3Bhbj5HPC9zcGFuPlxuICAgICAgPG1hdC1zbGlkZXIgZnhGbGV4IG1pbj1cIjBcIiBtYXg9XCIyNTVcIiBzdGVwPVwiMVwiIFt2YWx1ZV09XCJncmVlblwiIFsobmdNb2RlbCldPVwiZ3JlZW5cIiAobmdNb2RlbENoYW5nZSk9XCJjaGFuZ2VSZ2JWYWx1ZSgpXCI+PC9tYXQtc2xpZGVyPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgZnhMYXlvdXQ9XCJyb3dcIiBmeExheW91dEFsaWduPVwic3RhcnQgY2VudGVyXCIgZnhMYXlvdXRHYXA9XCI4cHhcIj5cbiAgICAgIDxzcGFuPkI8L3NwYW4+XG4gICAgICA8bWF0LXNsaWRlciBmeEZsZXggbWluPVwiMFwiIG1heD1cIjI1NVwiIHN0ZXA9XCIxXCIgW3ZhbHVlXT1cImJsdWVcIiBbKG5nTW9kZWwpXT1cImJsdWVcIiAobmdNb2RlbENoYW5nZSk9XCJjaGFuZ2VSZ2JWYWx1ZSgpXCI+PC9tYXQtc2xpZGVyPlxuICAgIDwvZGl2PlxuXG4gICAgPGRpdiBmeExheW91dD1cImNvbHVtblwiIGZ4TGF5b3V0QWxpZ249XCJzdGFydFwiIGZ4TGF5b3V0R2FwPVwiMTZweFwiIGNsYXNzPVwiY29sb3ItaW5wdXQtY29udGFpbmVyXCI+XG5cbiAgICAgIDxkaXYgZnhMYXlvdXQ9XCJyb3dcIiBmeExheW91dEFsaWduPVwic3RhcnQgY2VudGVyXCIgZnhMYXlvdXRHYXA9XCIxNnB4XCI+XG5cbiAgICAgICAgPGRpdiBmeEZsZXg+UkdCPC9kaXY+XG5cbiAgICAgICAgPGlucHV0IG1hdElucHV0IHR5cGU9XCJudW1iZXJcIiBtaW49XCIwXCIgbWF4PVwiMjU1XCIgdmFsdWU9XCJyZWRcIiBbKG5nTW9kZWwpXT1cInJlZFwiIChuZ01vZGVsQ2hhbmdlKT1cImNoYW5nZVJnYlZhbHVlKClcIlxuICAgICAgICAgIGF1dG9jb21wbGV0ZT1cIm9mZlwiPlxuXG4gICAgICAgIDxpbnB1dCBtYXRJbnB1dCB0eXBlPVwibnVtYmVyXCIgbWluPVwiMFwiIG1heD1cIjI1NVwiIHZhbHVlPVwiZ3JlZW5cIiBbKG5nTW9kZWwpXT1cImdyZWVuXCIgKG5nTW9kZWxDaGFuZ2UpPVwiY2hhbmdlUmdiVmFsdWUoKVwiXG4gICAgICAgICAgYXV0b2NvbXBsZXRlPVwib2ZmXCI+XG5cbiAgICAgICAgPGlucHV0IG1hdElucHV0IHR5cGU9XCJudW1iZXJcIiBtaW49XCIwXCIgbWF4PVwiMjU1XCIgdmFsdWU9XCJibHVlXCIgWyhuZ01vZGVsKV09XCJibHVlXCIgKG5nTW9kZWxDaGFuZ2UpPVwiY2hhbmdlUmdiVmFsdWUoKVwiXG4gICAgICAgICAgYXV0b2NvbXBsZXRlPVwib2ZmXCI+XG5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8ZGl2IGZ4TGF5b3V0PVwicm93XCIgZnhMYXlvdXRBbGlnbj1cInN0YXJ0IGNlbnRlclwiIGZ4TGF5b3V0R2FwPVwiMTZweFwiPlxuXG4gICAgICAgIDxkaXYgZnhGbGV4PkhFWDwvZGl2PlxuXG4gICAgICAgIDxpbnB1dCBtYXRJbnB1dCB0eXBlPVwidGV4dFwiIHZhbHVlPVwiaGV4XCIgWyhuZ01vZGVsKV09XCJoZXhcIiBhdXRvY29tcGxldGU9XCJvZmZcIj5cblxuICAgICAgICA8ZGVjLWljb24gZm9udD1cIm1hdFwiIChjbGljayk9XCJzdGFydENvbG9yUGlja2VyKClcIj5jb2xvcml6ZTwvZGVjLWljb24+XG5cbiAgICAgIDwvZGl2PlxuXG4gICAgPC9kaXY+XG5cbiAgPC9kaXY+XG48L2Rpdj5cbmAsXG4gIHN0eWxlczogW2AuY29sb3ItcHJldmlld3toZWlnaHQ6MzIwcHg7bWFyZ2luOjA7cGFkZGluZzowO3Bvc2l0aW9uOnJlbGF0aXZlO2N1cnNvcjotd2Via2l0LWdyYWI7Y3Vyc29yOmdyYWJ9LmNvbG9yLXByZXZpZXcgLmNsb3NlLXByZXZpZXd7cG9zaXRpb246YWJzb2x1dGU7cmlnaHQ6MDt0b3A6MDtjdXJzb3I6cG9pbnRlcn0uY29sb3ItcHJldmlldyAuY2xvc2UtcHJldmlldzpob3Zlcntjb2xvcjojZmZmfS5jb2xvci1vcHRpb25zLWNvbnRhaW5lcntiYWNrZ3JvdW5kLWNvbG9yOiNlZWU7cGFkZGluZzowIDE2cHg7Ym94LXNoYWRvdzowIDExcHggMTVweCAtN3B4IHJnYmEoMCwwLDAsLjIpLDAgMjRweCAzOHB4IDNweCByZ2JhKDAsMCwwLC4xNCksMCA5cHggNDZweCA4cHggcmdiYSgwLDAsMCwuMTIpfS5jb2xvci1vcHRpb25zLWNvbnRhaW5lciAuY29sb3ItaW5wdXQtY29udGFpbmVye21hcmdpbi1ib3R0b206MTZweH0uY29sb3Itb3B0aW9ucy1jb250YWluZXIgLmNvbG9yLWlucHV0LWNvbnRhaW5lciBpbnB1dHt0ZXh0LWFsaWduOmNlbnRlcjtib3JkZXItYm90dG9tOjFweCBzb2xpZCAjY2NjfS5jb2xvci1vcHRpb25zLWNvbnRhaW5lciAuY29sb3ItaW5wdXQtY29udGFpbmVyIGlucHV0OmZvY3Vze2JvcmRlci1jb2xvcjpyZ2JhKDAsMCwwLC43KX0uY29sb3Itb3B0aW9ucy1jb250YWluZXIgLmNvbG9yLWlucHV0LWNvbnRhaW5lciBpbnB1dFt0eXBlPW51bWJlcl06Oi13ZWJraXQtaW5uZXItc3Bpbi1idXR0b24sLmNvbG9yLW9wdGlvbnMtY29udGFpbmVyIC5jb2xvci1pbnB1dC1jb250YWluZXIgaW5wdXRbdHlwZT1udW1iZXJdOjotd2Via2l0LW91dGVyLXNwaW4tYnV0dG9uey13ZWJraXQtYXBwZWFyYW5jZTpub25lfS5jb2xvci1vcHRpb25zLWNvbnRhaW5lciAuY29sb3ItaW5wdXQtY29udGFpbmVyIGlucHV0W3R5cGU9bnVtYmVyXXstbW96LWFwcGVhcmFuY2U6dGV4dGZpZWxkfS5jb2xvci1vcHRpb25zLWNvbnRhaW5lciAuY29sb3ItaW5wdXQtY29udGFpbmVyIGRlYy1pY29ue2N1cnNvcjpwb2ludGVyfWBdXG59KVxuZXhwb3J0IGNsYXNzIERlY0NvbG9yUGlja2VyTW9kYWxDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIHJlZDogbnVtYmVyO1xuICBncmVlbjogbnVtYmVyO1xuICBibHVlOiBudW1iZXI7XG5cbiAgaGV4OiBzdHJpbmc7XG5cbiAgcmdiOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBkaWFsb2dSZWY6IE1hdERpYWxvZ1JlZjxEZWNDb2xvclBpY2tlck1vZGFsQ29tcG9uZW50PixcbiAgICBASW5qZWN0KE1BVF9ESUFMT0dfREFUQSkgcHJpdmF0ZSBkYXRhOiBhbnksXG4gICAgcHJpdmF0ZSBkZWNDb2xvclNlcnZpY2U6IERlY0NvbG9yU2VydmljZSxcbiAgICBwcml2YXRlIGNvbG9yUGlja2VyU2VydmljZTogQ29sb3JQaWNrZXJTZXJ2aWNlXG4gICkge1xuICAgIHRoaXMuaGV4ID0gdGhpcy5kYXRhLmNvbG9yO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5sb2FkKCk7XG4gICAgdGhpcy5kcmFnSW5pdCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBsb2FkKCkge1xuICAgIHRoaXMucmdiID0gdGhpcy5oZXggPyB0aGlzLmRlY0NvbG9yU2VydmljZS5oZXhUb1JnYih0aGlzLmhleCkgOiBudWxsO1xuICAgIGlmICh0aGlzLnJnYikge1xuICAgICAgdGhpcy5yZWQgPSBwYXJzZUludCh0aGlzLnJnYlswXSwgMTApO1xuICAgICAgdGhpcy5ncmVlbiA9IHBhcnNlSW50KHRoaXMucmdiWzFdLCAxMCk7XG4gICAgICB0aGlzLmJsdWUgPSBwYXJzZUludCh0aGlzLnJnYlsyXSwgMTApO1xuICAgICAgdGhpcy5yZ2IgPSBgcmdiKCR7dGhpcy5yZWR9LCR7dGhpcy5ncmVlbn0sJHt0aGlzLmJsdWV9KWA7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBkcmFnSW5pdCgpIHtcblxuICAgIGNvbnN0IGRyYWdJdGVtOiBIVE1MRGl2RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb2xvci1waWNrZXItY29udGFpbmVyJyk7XG4gICAgY29uc3QgZHJhZ2dlcjogSFRNTERpdkVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29sb3ItcHJldmlldycpO1xuXG4gICAgY29uc3QgbW92ZSQgPSBmcm9tRXZlbnQoZG9jdW1lbnQsICdtb3VzZW1vdmUnKTtcbiAgICBjb25zdCBkb3duJCA9IGZyb21FdmVudChkcmFnZ2VyLCAnbW91c2Vkb3duJyk7XG4gICAgY29uc3QgdXAkID0gZnJvbUV2ZW50KGRvY3VtZW50LCAnbW91c2V1cCcpO1xuXG4gICAgY29uc3QgZHJhZyQgPSBkb3duJC5waXBlKFxuICAgICAgbWVyZ2VNYXAoKCkgPT4ge1xuICAgICAgICBkcmFnSXRlbS5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gICAgICAgIHJldHVybiBtb3ZlJC5waXBlKHRha2VVbnRpbCh1cCQpKTtcbiAgICAgIH0pXG4gICAgKTtcblxuICAgIGRyYWckLnN1YnNjcmliZSgoZXZlbnQ6IE1vdXNlRXZlbnQpID0+IHtcbiAgICAgIGRyYWdJdGVtLnN0eWxlLnRvcCA9IGAke2V2ZW50LmNsaWVudFkgLSAxNjB9cHhgO1xuICAgICAgZHJhZ0l0ZW0uc3R5bGUubGVmdCA9IGAke2V2ZW50LmNsaWVudFggLSAxNjB9cHhgO1xuICAgIH0pO1xuXG4gIH1cblxuICBjaGFuZ2VSZ2JWYWx1ZSgpIHtcbiAgICB0aGlzLmhleCA9IHRoaXMuZGVjQ29sb3JTZXJ2aWNlLnJnYlRvSGV4KHRoaXMucmVkIHx8IDAsIHRoaXMuZ3JlZW4gfHwgMCwgdGhpcy5ibHVlIHx8IDApO1xuICAgIHRoaXMucmdiID0gdGhpcy5kZWNDb2xvclNlcnZpY2UuaGV4VG9SZ2IodGhpcy5oZXgsIHRydWUpO1xuICB9XG5cbiAgc3RhcnRDb2xvclBpY2tlcigpIHtcbiAgICBjb25zdCBjb2xvckNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb2xvckNvbnRhaW5lcicpO1xuICAgIGNvbG9yQ29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgdGhpcy5jb2xvclBpY2tlclNlcnZpY2Uuc3RhcnQuc3Vic2NyaWJlKChjb2xvcjogc3RyaW5nKSA9PiB7XG4gICAgICBjb2xvckNvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgIHRoaXMuaGV4ID0gY29sb3I7XG4gICAgICB0aGlzLmxvYWQoKTtcbiAgICB9KTtcbiAgfVxuXG4gIGNsb3NlKCkge1xuICAgIHRoaXMuZGlhbG9nUmVmLmNsb3NlKHRoaXMuaGV4KTtcbiAgfVxuXG59XG4iXX0=