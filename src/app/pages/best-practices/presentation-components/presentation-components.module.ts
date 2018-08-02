import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PresentationComponentsRoutingModule } from './presentation-components-routing.module';
import { PresentationComponentsComponent } from './presentation-components.component';
import { DecMarkdownModule } from '@app/shared/components/markdown/markdown.module';

@NgModule({
  imports: [
    CommonModule,
    PresentationComponentsRoutingModule,
    DecMarkdownModule,
  ],
  declarations: [PresentationComponentsComponent]
})
export class PresentationComponentsModule { }
