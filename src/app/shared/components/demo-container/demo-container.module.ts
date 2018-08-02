import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoContainerComponent } from './demo-container.component';
import { DecMarkdownModule } from './../markdown/markdown.module';
import { DecTabsModule } from '@projects/decora/browser-lib-ui/src/public_api';

@NgModule({
  imports: [
    CommonModule,
    DecMarkdownModule,
    DecTabsModule,
  ],
  declarations: [DemoContainerComponent],
  exports: [DemoContainerComponent]
})
export class DemoContainerModule { }
