import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecoraMarkdownsCommentDemoRoutingModule } from './decora-markdowns-comment-demo-routing.module';
import { DecoraMarkdownsCommentDemoComponent } from './decora-markdowns-comment-demo.component';
import { DecMarkdownsCommentModule } from '@projects/decora/browser-lib-ui/src/public_api';
import { DemoContainerModule } from '@app/shared/components/demo-container/demo-container.module';

@NgModule({
  imports: [
    CommonModule,
    DecoraMarkdownsCommentDemoRoutingModule,
    DecMarkdownsCommentModule,
    DemoContainerModule
  ],
  declarations: [
    DecoraMarkdownsCommentDemoComponent
  ]
})
export class DecoraMarkdownsCommentDemoModule { }
