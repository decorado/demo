import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecMarkdownComponent } from './markdown.component';
import { MarkdownModule } from 'ngx-markdown';

@NgModule({
  imports: [
    CommonModule,
    MarkdownModule.forRoot(),
  ],
  declarations: [DecMarkdownComponent],
  exports: [DecMarkdownComponent, MarkdownModule]
})
export class DecMarkdownModule { }
