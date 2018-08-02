import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StyleGuideRoutingModule } from './style-guide-routing.module';
import { StyleGuideComponent } from './style-guide.component';
import { DecMarkdownModule } from '@app/shared/components/markdown/markdown.module';

@NgModule({
  imports: [
    CommonModule,
    StyleGuideRoutingModule,
    DecMarkdownModule
  ],
  declarations: [StyleGuideComponent]
})
export class StyleGuideModule { }
