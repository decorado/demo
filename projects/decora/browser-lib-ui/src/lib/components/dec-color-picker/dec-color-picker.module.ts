import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecColorPickerComponent } from './dec-color-picker.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSliderModule, MatButtonModule, MatInputModule, MatDialogModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { DecIconModule } from './../dec-icon/dec-icon.module';
import { DecColorPickerModalComponent } from './dec-color-picker-modal/dec-color-picker-modal.component';
import { ColorPickerModule } from './../../services/color-picker/color-picker.module';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatSliderModule,
    MatButtonModule,
    MatInputModule,
    DecIconModule,
    FormsModule,
    MatDialogModule,
    ColorPickerModule
  ],
  declarations: [DecColorPickerComponent, DecColorPickerModalComponent],
  exports: [DecColorPickerComponent],
  entryComponents: [DecColorPickerModalComponent]
})
export class DecColorPickerModule { }
