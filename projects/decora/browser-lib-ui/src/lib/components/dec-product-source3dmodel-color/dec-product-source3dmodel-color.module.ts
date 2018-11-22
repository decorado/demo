import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecProductSource3dmodelColorComponent } from './dec-product-source3dmodel-color.component';
import { TranslateModule } from '@ngx-translate/core';
import { DecGalleryModule } from '../gallery/dec-gallery.module';
import { MatButtonModule } from '@angular/material';

@NgModule({
  declarations: [DecProductSource3dmodelColorComponent],
  imports: [
    CommonModule,
    TranslateModule,
    FlexLayoutModule,
    MatButtonModule,
    DecGalleryModule
  ],
  exports: [DecProductSource3dmodelColorComponent]
})
export class DecProductSource3dmodelColorModule { }
