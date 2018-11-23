import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { MatButtonToggleModule, MatButtonModule } from '@angular/material';
import { DecGridModule } from './../dec-grid/dec-grid.module';
import { DecIconModule } from './../dec-icon/dec-icon.module';
import { DecProductSource3dmodelFixComponent } from './dec-product-source3dmodel-fix.component';
import { DecGalleryMarksModule } from '../dec-gallery-marks/dec-gallery-marks.module';
import { DecGalleryModule } from '../gallery/dec-gallery.module';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [
    DecProductSource3dmodelFixComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    MatButtonToggleModule,
    DecGalleryMarksModule,
    DecGalleryModule,
    FlexLayoutModule,
    DecGridModule,
    DecIconModule,
    MatButtonModule
  ],
  exports: [
    DecProductSource3dmodelFixComponent
  ]
})
export class DecProductSource3dmodelFixModule { }
