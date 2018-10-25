import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DecColorService } from './../../../services/color/dec-color.service';
import { ColorPickerService } from './../../../services/color-picker/color-picker.service';
import { takeUntil, mergeMap } from 'rxjs/operators';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'dec-color-picker-modal',
  templateUrl: './dec-color-picker-modal.component.html',
  styleUrls: ['./dec-color-picker-modal.component.scss']
})
export class DecColorPickerModalComponent implements OnInit {

  red: number;

  green: number;

  blue: number;

  hex: string;

  rgb: string;

  constructor(
    private dialogRef: MatDialogRef<DecColorPickerModalComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private decColorService: DecColorService,
    private colorPickerService: ColorPickerService
  ) {
    this.hex = this.data.color;
  }

  ngOnInit() {
    this.load();
    this.dragInit();
  }

  private load() {
    this.rgb = this.hex ? this.decColorService.hexToRgb(this.hex) : null;
    if (this.rgb) {
      this.red = parseInt(this.rgb[0], 10);
      this.green = parseInt(this.rgb[1], 10);
      this.blue = parseInt(this.rgb[2], 10);
      this.rgb = `rgb(${this.red},${this.green},${this.blue})`;
    }
  }

  private dragInit() {

    const dragItem: HTMLDivElement = document.querySelector('.color-picker-container');
    const dragger: HTMLDivElement = document.querySelector('.color-preview');

    const move$ = fromEvent(document, 'mousemove');
    const down$ = fromEvent(dragger, 'mousedown');
    const up$ = fromEvent(document, 'mouseup');

    const drag$ = down$.pipe(
      mergeMap(() => {
        dragItem.style.position = 'absolute';
        return move$.pipe(takeUntil(up$));
      })
    );

    drag$.subscribe((event: MouseEvent) => {
      dragItem.style.top = `${event.clientY - 160}px`;
      dragItem.style.left = `${event.clientX - 160}px`;
    });

  }

  changeRgbValue() {
    this.hex = this.decColorService.rgbToHex(this.red || 0, this.green || 0, this.blue || 0);
    this.rgb = this.decColorService.hexToRgb(this.hex, true);
  }

  startColorPicker() {
    const colorContainer = document.getElementById('colorContainer');
    colorContainer.style.display = 'none';
    this.colorPickerService.start.subscribe((color: string) => {
      colorContainer.style.display = 'block';
      this.hex = color;
      this.load();
    });
  }

  cancel() {
    this.dialogRef.close();
  }

  apply() {
    this.dialogRef.close(this.hex);
  }

}
