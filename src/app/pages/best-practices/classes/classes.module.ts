import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClassesRoutingModule } from './classes-routing.module';
import { ClassesComponent } from './classes.component';
import { DecMarkdownModule } from '@app/shared/components/markdown/markdown.module';

@NgModule({
  declarations: [ClassesComponent],
  imports: [
    CommonModule,
    ClassesRoutingModule,
    DecMarkdownModule,
  ]
})
export class ClassesModule { }
