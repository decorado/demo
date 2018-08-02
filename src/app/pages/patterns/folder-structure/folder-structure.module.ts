import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FolderStructureRoutingModule } from './folder-structure-routing.module';
import { FolderStructureComponent } from './folder-structure.component';
import { DecMarkdownModule } from '@app/shared/components/markdown/markdown.module';

@NgModule({
  imports: [
    CommonModule,
    FolderStructureRoutingModule,
    DecMarkdownModule,
  ],
  declarations: [FolderStructureComponent]
})
export class FolderStructureModule { }
