import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentStylesRoutingModule } from './component-styles-routing.module';
import { ComponentStylesComponent } from './component-styles.component';
import { DecMarkdownModule } from '@app/shared/components/markdown/markdown.module';

@NgModule({
  imports: [
    CommonModule,
    ComponentStylesRoutingModule,
    DecMarkdownModule,
  ],
  declarations: [ComponentStylesComponent]
})
export class ComponentStylesModule { }
