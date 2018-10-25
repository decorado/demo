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
export class DecColorPickerModalComponent {
    /**
     * @param {?} dialogRef
     * @param {?} data
     * @param {?} decColorService
     * @param {?} colorPickerService
     */
    constructor(dialogRef, data, decColorService, colorPickerService) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.decColorService = decColorService;
        this.colorPickerService = colorPickerService;
        this.hex = this.data.color;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.load();
        this.dragInit();
    }
    /**
     * @return {?}
     */
    load() {
        this.rgb = this.hex ? this.decColorService.hexToRgb(this.hex) : null;
        if (this.rgb) {
            this.red = parseInt(this.rgb[0], 10);
            this.green = parseInt(this.rgb[1], 10);
            this.blue = parseInt(this.rgb[2], 10);
            this.rgb = `rgb(${this.red},${this.green},${this.blue})`;
        }
    }
    /**
     * @return {?}
     */
    dragInit() {
        /** @type {?} */
        const dragItem = document.querySelector('.color-picker-container');
        /** @type {?} */
        const dragger = document.querySelector('.color-preview');
        /** @type {?} */
        const move$ = fromEvent(document, 'mousemove');
        /** @type {?} */
        const down$ = fromEvent(dragger, 'mousedown');
        /** @type {?} */
        const up$ = fromEvent(document, 'mouseup');
        /** @type {?} */
        const drag$ = down$.pipe(mergeMap(() => {
            dragItem.style.position = 'absolute';
            return move$.pipe(takeUntil(up$));
        }));
        drag$.subscribe((event) => {
            dragItem.style.top = `${event.clientY - 160}px`;
            dragItem.style.left = `${event.clientX - 160}px`;
        });
    }
    /**
     * @return {?}
     */
    changeRgbValue() {
        this.hex = this.decColorService.rgbToHex(this.red || 0, this.green || 0, this.blue || 0);
        this.rgb = this.decColorService.hexToRgb(this.hex, true);
    }
    /**
     * @return {?}
     */
    startColorPicker() {
        /** @type {?} */
        const colorContainer = document.getElementById('colorContainer');
        colorContainer.style.display = 'none';
        this.colorPickerService.start.subscribe((color) => {
            colorContainer.style.display = 'block';
            this.hex = color;
            this.load();
        });
    }
    /**
     * @return {?}
     */
    cancel() {
        this.dialogRef.close();
    }
    /**
     * @return {?}
     */
    apply() {
        this.dialogRef.close(this.hex);
    }
}
DecColorPickerModalComponent.decorators = [
    { type: Component, args: [{
                selector: 'dec-color-picker-modal',
                template: `<div fxLayout="column">
  <div class="color-preview" [ngStyle]="{'backgroundColor': hex}">
    <dec-icon font="mat" class="close-preview" (click)="cancel()">close</dec-icon>
  </div>
  <div class="color-options-container" fxLayout="column">
    <div fxLayout="row" fxLayoutAlign="start center" fxLayoutGap="8px">
      <span>R</span>
      <mat-slider fxFlex min="0" max="255" step="1" [value]="red" [(ngModel)]="red" (ngModelChange)="changeRgbValue()"></mat-slider>
    </div>
    <div fxLayout="row" fxLayoutAlign="start center" fxLayoutGap="8px">
      <span>G</span>
      <mat-slider fxFlex min="0" max="255" step="1" [value]="green" [(ngModel)]="green" (ngModelChange)="changeRgbValue()"></mat-slider>
    </div>
    <div fxLayout="row" fxLayoutAlign="start center" fxLayoutGap="8px">
      <span>B</span>
      <mat-slider fxFlex min="0" max="255" step="1" [value]="blue" [(ngModel)]="blue" (ngModelChange)="changeRgbValue()"></mat-slider>
    </div>

    <div fxLayout="column" fxLayoutAlign="start" fxLayoutGap="16px" class="color-input-container">

      <div fxLayout="row" fxLayoutAlign="start center" fxLayoutGap="16px">

        <div fxFlex>RGB</div>

        <input matInput type="number" min="0" max="255" value="red" [(ngModel)]="red" (ngModelChange)="changeRgbValue()"
          autocomplete="off">

        <input matInput type="number" min="0" max="255" value="green" [(ngModel)]="green" (ngModelChange)="changeRgbValue()"
          autocomplete="off">

        <input matInput type="number" min="0" max="255" value="blue" [(ngModel)]="blue" (ngModelChange)="changeRgbValue()"
          autocomplete="off">

      </div>

      <div fxLayout="row" fxLayoutAlign="start center" fxLayoutGap="16px">

        <div fxFlex>HEX</div>

        <input matInput type="text" value="hex" [(ngModel)]="hex" autocomplete="off">

        <dec-icon font="mat" (click)="startColorPicker()">colorize</dec-icon>

      </div>

    </div>

    <div fxLayout="row" fxLayoutGap="8px" fxLayoutAlign="end center" class="dialog-actions">
      <button mat-button type="button" (click)="cancel()">{{ 'label.Cancel' | translate | uppercase }}</button>
      <button mat-raised-button color="primary" type="button" (click)="apply()">{{ 'label.Apply' | translate | uppercase }}</button>
    </div>

  </div>

</div>
`,
                styles: [`.color-preview{height:320px;margin:0;padding:0;position:relative;cursor:-webkit-grab;cursor:grab}.color-preview .close-preview{position:absolute;right:0;top:0;cursor:pointer}.color-preview .close-preview:hover{color:#fff}.color-options-container{background-color:#eee;padding:0 16px;box-shadow:0 11px 15px -7px rgba(0,0,0,.2),0 24px 38px 3px rgba(0,0,0,.14),0 9px 46px 8px rgba(0,0,0,.12)}.color-options-container .color-input-container{margin-bottom:16px}.color-options-container .color-input-container input{text-align:center;border-bottom:1px solid #ccc}.color-options-container .color-input-container input:focus{border-color:rgba(0,0,0,.7)}.color-options-container .color-input-container input[type=number]::-webkit-inner-spin-button,.color-options-container .color-input-container input[type=number]::-webkit-outer-spin-button{-webkit-appearance:none}.color-options-container .color-input-container input[type=number]{-moz-appearance:textfield}.color-options-container .color-input-container dec-icon{cursor:pointer}.dialog-actions{text-align:right;background-color:#eee;padding-bottom:8px}`]
            },] },
];
/** @nocollapse */
DecColorPickerModalComponent.ctorParameters = () => [
    { type: MatDialogRef },
    { type: undefined, decorators: [{ type: Inject, args: [MAT_DIALOG_DATA,] }] },
    { type: DecColorService },
    { type: ColorPickerService }
];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLWNvbG9yLXBpY2tlci1tb2RhbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZGVjb3JhL2Jyb3dzZXItbGliLXVpLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvZGVjLWNvbG9yLXBpY2tlci9kZWMtY29sb3ItcGlja2VyLW1vZGFsL2RlYy1jb2xvci1waWNrZXItbW9kYWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxRCxPQUFPLEVBQUUsZUFBZSxFQUFFLFlBQVksRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUM5RSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx1REFBdUQsQ0FBQztBQUMzRixPQUFPLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxNQUFNLENBQUM7QUE4RGpDLE1BQU07Ozs7Ozs7SUFZSixZQUNVLFdBQ3lCLElBQVMsRUFDbEMsaUJBQ0E7UUFIQSxjQUFTLEdBQVQsU0FBUztRQUNnQixTQUFJLEdBQUosSUFBSSxDQUFLO1FBQ2xDLG9CQUFlLEdBQWYsZUFBZTtRQUNmLHVCQUFrQixHQUFsQixrQkFBa0I7UUFFMUIsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztLQUM1Qjs7OztJQUVELFFBQVE7UUFDTixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDWixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7S0FDakI7Ozs7SUFFTyxJQUFJO1FBQ1YsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FB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QUFDO0tBQ3hCOzs7O0lBRUQsS0FBSztRQUNILElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUNoQzs7O1lBNUlGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsd0JBQXdCO2dCQUNsQyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0F1RFg7Z0JBQ0MsTUFBTSxFQUFFLENBQUMsMGtDQUEwa0MsQ0FBQzthQUNybEM7Ozs7WUFqRXlCLFlBQVk7NENBZ0ZqQyxNQUFNLFNBQUMsZUFBZTtZQS9FbEIsZUFBZTtZQUNmLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1BVF9ESUFMT0dfREFUQSwgTWF0RGlhbG9nUmVmIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgRGVjQ29sb3JTZXJ2aWNlIH0gZnJvbSAnLi8uLi8uLi8uLi9zZXJ2aWNlcy9jb2xvci9kZWMtY29sb3Iuc2VydmljZSc7XG5pbXBvcnQgeyBDb2xvclBpY2tlclNlcnZpY2UgfSBmcm9tICcuLy4uLy4uLy4uL3NlcnZpY2VzL2NvbG9yLXBpY2tlci9jb2xvci1waWNrZXIuc2VydmljZSc7XG5pbXBvcnQgeyB0YWtlVW50aWwsIG1lcmdlTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgZnJvbUV2ZW50IH0gZnJvbSAncnhqcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RlYy1jb2xvci1waWNrZXItbW9kYWwnLFxuICB0ZW1wbGF0ZTogYDxkaXYgZnhMYXlvdXQ9XCJjb2x1bW5cIj5cbiAgPGRpdiBjbGFzcz1cImNvbG9yLXByZXZpZXdcIiBbbmdTdHlsZV09XCJ7J2JhY2tncm91bmRDb2xvcic6IGhleH1cIj5cbiAgICA8ZGVjLWljb24gZm9udD1cIm1hdFwiIGNsYXNzPVwiY2xvc2UtcHJldmlld1wiIChjbGljayk9XCJjYW5jZWwoKVwiPmNsb3NlPC9kZWMtaWNvbj5cbiAgPC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJjb2xvci1vcHRpb25zLWNvbnRhaW5lclwiIGZ4TGF5b3V0PVwiY29sdW1uXCI+XG4gICAgPGRpdiBmeExheW91dD1cInJvd1wiIGZ4TGF5b3V0QWxpZ249XCJzdGFydCBjZW50ZXJcIiBmeExheW91dEdhcD1cIjhweFwiPlxuICAgICAgPHNwYW4+Ujwvc3Bhbj5cbiAgICAgIDxtYXQtc2xpZGVyIGZ4RmxleCBtaW49XCIwXCIgbWF4PVwiMjU1XCIgc3RlcD1cIjFcIiBbdmFsdWVdPVwicmVkXCIgWyhuZ01vZGVsKV09XCJyZWRcIiAobmdNb2RlbENoYW5nZSk9XCJjaGFuZ2VSZ2JWYWx1ZSgpXCI+PC9tYXQtc2xpZGVyPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgZnhMYXlvdXQ9XCJyb3dcIiBmeExheW91dEFsaWduPVwic3RhcnQgY2VudGVyXCIgZnhMYXlvdXRHYXA9XCI4cHhcIj5cbiAgICAgIDxzcGFuPkc8L3NwYW4+XG4gICAgICA8bWF0LXNsaWRlciBmeEZsZXggbWluPVwiMFwiIG1heD1cIjI1NVwiIHN0ZXA9XCIxXCIgW3ZhbHVlXT1cImdyZWVuXCIgWyhuZ01vZGVsKV09XCJncmVlblwiIChuZ01vZGVsQ2hhbmdlKT1cImNoYW5nZVJnYlZhbHVlKClcIj48L21hdC1zbGlkZXI+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBmeExheW91dD1cInJvd1wiIGZ4TGF5b3V0QWxpZ249XCJzdGFydCBjZW50ZXJcIiBmeExheW91dEdhcD1cIjhweFwiPlxuICAgICAgPHNwYW4+Qjwvc3Bhbj5cbiAgICAgIDxtYXQtc2xpZGVyIGZ4RmxleCBtaW49XCIwXCIgbWF4PVwiMjU1XCIgc3RlcD1cIjFcIiBbdmFsdWVdPVwiYmx1ZVwiIFsobmdNb2RlbCldPVwiYmx1ZVwiIChuZ01vZGVsQ2hhbmdlKT1cImNoYW5nZVJnYlZhbHVlKClcIj48L21hdC1zbGlkZXI+XG4gICAgPC9kaXY+XG5cbiAgICA8ZGl2IGZ4TGF5b3V0PVwiY29sdW1uXCIgZnhMYXlvdXRBbGlnbj1cInN0YXJ0XCIgZnhMYXlvdXRHYXA9XCIxNnB4XCIgY2xhc3M9XCJjb2xvci1pbnB1dC1jb250YWluZXJcIj5cblxuICAgICAgPGRpdiBmeExheW91dD1cInJvd1wiIGZ4TGF5b3V0QWxpZ249XCJzdGFydCBjZW50ZXJcIiBmeExheW91dEdhcD1cIjE2cHhcIj5cblxuICAgICAgICA8ZGl2IGZ4RmxleD5SR0I8L2Rpdj5cblxuICAgICAgICA8aW5wdXQgbWF0SW5wdXQgdHlwZT1cIm51bWJlclwiIG1pbj1cIjBcIiBtYXg9XCIyNTVcIiB2YWx1ZT1cInJlZFwiIFsobmdNb2RlbCldPVwicmVkXCIgKG5nTW9kZWxDaGFuZ2UpPVwiY2hhbmdlUmdiVmFsdWUoKVwiXG4gICAgICAgICAgYXV0b2NvbXBsZXRlPVwib2ZmXCI+XG5cbiAgICAgICAgPGlucHV0IG1hdElucHV0IHR5cGU9XCJudW1iZXJcIiBtaW49XCIwXCIgbWF4PVwiMjU1XCIgdmFsdWU9XCJncmVlblwiIFsobmdNb2RlbCldPVwiZ3JlZW5cIiAobmdNb2RlbENoYW5nZSk9XCJjaGFuZ2VSZ2JWYWx1ZSgpXCJcbiAgICAgICAgICBhdXRvY29tcGxldGU9XCJvZmZcIj5cblxuICAgICAgICA8aW5wdXQgbWF0SW5wdXQgdHlwZT1cIm51bWJlclwiIG1pbj1cIjBcIiBtYXg9XCIyNTVcIiB2YWx1ZT1cImJsdWVcIiBbKG5nTW9kZWwpXT1cImJsdWVcIiAobmdNb2RlbENoYW5nZSk9XCJjaGFuZ2VSZ2JWYWx1ZSgpXCJcbiAgICAgICAgICBhdXRvY29tcGxldGU9XCJvZmZcIj5cblxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxkaXYgZnhMYXlvdXQ9XCJyb3dcIiBmeExheW91dEFsaWduPVwic3RhcnQgY2VudGVyXCIgZnhMYXlvdXRHYXA9XCIxNnB4XCI+XG5cbiAgICAgICAgPGRpdiBmeEZsZXg+SEVYPC9kaXY+XG5cbiAgICAgICAgPGlucHV0IG1hdElucHV0IHR5cGU9XCJ0ZXh0XCIgdmFsdWU9XCJoZXhcIiBbKG5nTW9kZWwpXT1cImhleFwiIGF1dG9jb21wbGV0ZT1cIm9mZlwiPlxuXG4gICAgICAgIDxkZWMtaWNvbiBmb250PVwibWF0XCIgKGNsaWNrKT1cInN0YXJ0Q29sb3JQaWNrZXIoKVwiPmNvbG9yaXplPC9kZWMtaWNvbj5cblxuICAgICAgPC9kaXY+XG5cbiAgICA8L2Rpdj5cblxuICAgIDxkaXYgZnhMYXlvdXQ9XCJyb3dcIiBmeExheW91dEdhcD1cIjhweFwiIGZ4TGF5b3V0QWxpZ249XCJlbmQgY2VudGVyXCIgY2xhc3M9XCJkaWFsb2ctYWN0aW9uc1wiPlxuICAgICAgPGJ1dHRvbiBtYXQtYnV0dG9uIHR5cGU9XCJidXR0b25cIiAoY2xpY2spPVwiY2FuY2VsKClcIj57eyAnbGFiZWwuQ2FuY2VsJyB8IHRyYW5zbGF0ZSB8IHVwcGVyY2FzZSB9fTwvYnV0dG9uPlxuICAgICAgPGJ1dHRvbiBtYXQtcmFpc2VkLWJ1dHRvbiBjb2xvcj1cInByaW1hcnlcIiB0eXBlPVwiYnV0dG9uXCIgKGNsaWNrKT1cImFwcGx5KClcIj57eyAnbGFiZWwuQXBwbHknIHwgdHJhbnNsYXRlIHwgdXBwZXJjYXNlIH19PC9idXR0b24+XG4gICAgPC9kaXY+XG5cbiAgPC9kaXY+XG5cbjwvZGl2PlxuYCxcbiAgc3R5bGVzOiBbYC5jb2xvci1wcmV2aWV3e2hlaWdodDozMjBweDttYXJnaW46MDtwYWRkaW5nOjA7cG9zaXRpb246cmVsYXRpdmU7Y3Vyc29yOi13ZWJraXQtZ3JhYjtjdXJzb3I6Z3JhYn0uY29sb3ItcHJldmlldyAuY2xvc2UtcHJldmlld3twb3NpdGlvbjphYnNvbHV0ZTtyaWdodDowO3RvcDowO2N1cnNvcjpwb2ludGVyfS5jb2xvci1wcmV2aWV3IC5jbG9zZS1wcmV2aWV3OmhvdmVye2NvbG9yOiNmZmZ9LmNvbG9yLW9wdGlvbnMtY29udGFpbmVye2JhY2tncm91bmQtY29sb3I6I2VlZTtwYWRkaW5nOjAgMTZweDtib3gtc2hhZG93OjAgMTFweCAxNXB4IC03cHggcmdiYSgwLDAsMCwuMiksMCAyNHB4IDM4cHggM3B4IHJnYmEoMCwwLDAsLjE0KSwwIDlweCA0NnB4IDhweCByZ2JhKDAsMCwwLC4xMil9LmNvbG9yLW9wdGlvbnMtY29udGFpbmVyIC5jb2xvci1pbnB1dC1jb250YWluZXJ7bWFyZ2luLWJvdHRvbToxNnB4fS5jb2xvci1vcHRpb25zLWNvbnRhaW5lciAuY29sb3ItaW5wdXQtY29udGFpbmVyIGlucHV0e3RleHQtYWxpZ246Y2VudGVyO2JvcmRlci1ib3R0b206MXB4IHNvbGlkICNjY2N9LmNvbG9yLW9wdGlvbnMtY29udGFpbmVyIC5jb2xvci1pbnB1dC1jb250YWluZXIgaW5wdXQ6Zm9jdXN7Ym9yZGVyLWNvbG9yOnJnYmEoMCwwLDAsLjcpfS5jb2xvci1vcHRpb25zLWNvbnRhaW5lciAuY29sb3ItaW5wdXQtY29udGFpbmVyIGlucHV0W3R5cGU9bnVtYmVyXTo6LXdlYmtpdC1pbm5lci1zcGluLWJ1dHRvbiwuY29sb3Itb3B0aW9ucy1jb250YWluZXIgLmNvbG9yLWlucHV0LWNvbnRhaW5lciBpbnB1dFt0eXBlPW51bWJlcl06Oi13ZWJraXQtb3V0ZXItc3Bpbi1idXR0b257LXdlYmtpdC1hcHBlYXJhbmNlOm5vbmV9LmNvbG9yLW9wdGlvbnMtY29udGFpbmVyIC5jb2xvci1pbnB1dC1jb250YWluZXIgaW5wdXRbdHlwZT1udW1iZXJdey1tb3otYXBwZWFyYW5jZTp0ZXh0ZmllbGR9LmNvbG9yLW9wdGlvbnMtY29udGFpbmVyIC5jb2xvci1pbnB1dC1jb250YWluZXIgZGVjLWljb257Y3Vyc29yOnBvaW50ZXJ9LmRpYWxvZy1hY3Rpb25ze3RleHQtYWxpZ246cmlnaHQ7YmFja2dyb3VuZC1jb2xvcjojZWVlO3BhZGRpbmctYm90dG9tOjhweH1gXVxufSlcbmV4cG9ydCBjbGFzcyBEZWNDb2xvclBpY2tlck1vZGFsQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICByZWQ6IG51bWJlcjtcblxuICBncmVlbjogbnVtYmVyO1xuXG4gIGJsdWU6IG51bWJlcjtcblxuICBoZXg6IHN0cmluZztcblxuICByZ2I6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGRpYWxvZ1JlZjogTWF0RGlhbG9nUmVmPERlY0NvbG9yUGlja2VyTW9kYWxDb21wb25lbnQ+LFxuICAgIEBJbmplY3QoTUFUX0RJQUxPR19EQVRBKSBwcml2YXRlIGRhdGE6IGFueSxcbiAgICBwcml2YXRlIGRlY0NvbG9yU2VydmljZTogRGVjQ29sb3JTZXJ2aWNlLFxuICAgIHByaXZhdGUgY29sb3JQaWNrZXJTZXJ2aWNlOiBDb2xvclBpY2tlclNlcnZpY2VcbiAgKSB7XG4gICAgdGhpcy5oZXggPSB0aGlzLmRhdGEuY29sb3I7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmxvYWQoKTtcbiAgICB0aGlzLmRyYWdJbml0KCk7XG4gIH1cblxuICBwcml2YXRlIGxvYWQoKSB7XG4gICAgdGhpcy5yZ2IgPSB0aGlzLmhleCA/IHRoaXMuZGVjQ29sb3JTZXJ2aWNlLmhleFRvUmdiKHRoaXMuaGV4KSA6IG51bGw7XG4gICAgaWYgKHRoaXMucmdiKSB7XG4gICAgICB0aGlzLnJlZCA9IHBhcnNlSW50KHRoaXMucmdiWzBdLCAxMCk7XG4gICAgICB0aGlzLmdyZWVuID0gcGFyc2VJbnQodGhpcy5yZ2JbMV0sIDEwKTtcbiAgICAgIHRoaXMuYmx1ZSA9IHBhcnNlSW50KHRoaXMucmdiWzJdLCAxMCk7XG4gICAgICB0aGlzLnJnYiA9IGByZ2IoJHt0aGlzLnJlZH0sJHt0aGlzLmdyZWVufSwke3RoaXMuYmx1ZX0pYDtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGRyYWdJbml0KCkge1xuXG4gICAgY29uc3QgZHJhZ0l0ZW06IEhUTUxEaXZFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbG9yLXBpY2tlci1jb250YWluZXInKTtcbiAgICBjb25zdCBkcmFnZ2VyOiBIVE1MRGl2RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb2xvci1wcmV2aWV3Jyk7XG5cbiAgICBjb25zdCBtb3ZlJCA9IGZyb21FdmVudChkb2N1bWVudCwgJ21vdXNlbW92ZScpO1xuICAgIGNvbnN0IGRvd24kID0gZnJvbUV2ZW50KGRyYWdnZXIsICdtb3VzZWRvd24nKTtcbiAgICBjb25zdCB1cCQgPSBmcm9tRXZlbnQoZG9jdW1lbnQsICdtb3VzZXVwJyk7XG5cbiAgICBjb25zdCBkcmFnJCA9IGRvd24kLnBpcGUoXG4gICAgICBtZXJnZU1hcCgoKSA9PiB7XG4gICAgICAgIGRyYWdJdGVtLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICAgICAgcmV0dXJuIG1vdmUkLnBpcGUodGFrZVVudGlsKHVwJCkpO1xuICAgICAgfSlcbiAgICApO1xuXG4gICAgZHJhZyQuc3Vic2NyaWJlKChldmVudDogTW91c2VFdmVudCkgPT4ge1xuICAgICAgZHJhZ0l0ZW0uc3R5bGUudG9wID0gYCR7ZXZlbnQuY2xpZW50WSAtIDE2MH1weGA7XG4gICAgICBkcmFnSXRlbS5zdHlsZS5sZWZ0ID0gYCR7ZXZlbnQuY2xpZW50WCAtIDE2MH1weGA7XG4gICAgfSk7XG5cbiAgfVxuXG4gIGNoYW5nZVJnYlZhbHVlKCkge1xuICAgIHRoaXMuaGV4ID0gdGhpcy5kZWNDb2xvclNlcnZpY2UucmdiVG9IZXgodGhpcy5yZWQgfHwgMCwgdGhpcy5ncmVlbiB8fCAwLCB0aGlzLmJsdWUgfHwgMCk7XG4gICAgdGhpcy5yZ2IgPSB0aGlzLmRlY0NvbG9yU2VydmljZS5oZXhUb1JnYih0aGlzLmhleCwgdHJ1ZSk7XG4gIH1cblxuICBzdGFydENvbG9yUGlja2VyKCkge1xuICAgIGNvbnN0IGNvbG9yQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbG9yQ29udGFpbmVyJyk7XG4gICAgY29sb3JDb250YWluZXIuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICB0aGlzLmNvbG9yUGlja2VyU2VydmljZS5zdGFydC5zdWJzY3JpYmUoKGNvbG9yOiBzdHJpbmcpID0+IHtcbiAgICAgIGNvbG9yQ29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgdGhpcy5oZXggPSBjb2xvcjtcbiAgICAgIHRoaXMubG9hZCgpO1xuICAgIH0pO1xuICB9XG5cbiAgY2FuY2VsKCkge1xuICAgIHRoaXMuZGlhbG9nUmVmLmNsb3NlKCk7XG4gIH1cblxuICBhcHBseSgpIHtcbiAgICB0aGlzLmRpYWxvZ1JlZi5jbG9zZSh0aGlzLmhleCk7XG4gIH1cblxufVxuIl19