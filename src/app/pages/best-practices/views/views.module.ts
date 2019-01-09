import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewsRoutingModule } from './views-routing.module';
import { ViewsComponent } from './views.component';
import { DecMarkdownModule } from '@app/shared/components/markdown/markdown.module';

@NgModule({
  declarations: [ViewsComponent],
  imports: [
    CommonModule,
    ViewsRoutingModule,
    DecMarkdownModule,
  ]
})
export class ViewsModule { }
