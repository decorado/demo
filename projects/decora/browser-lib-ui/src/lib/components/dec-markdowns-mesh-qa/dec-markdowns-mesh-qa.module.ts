import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecMarkdownsMeshQaComponent } from './dec-markdowns-mesh-qa.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule
  ],
  declarations: [DecMarkdownsMeshQaComponent],
  exports: [DecMarkdownsMeshQaComponent],
})
export class DecMarkdownsMeshQaModule { }
