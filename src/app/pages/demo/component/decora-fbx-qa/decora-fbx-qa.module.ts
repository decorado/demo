import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DecoraFbxQaRoutingModule } from './decora-fbx-qa-routing.module';
import { DecoraFbxQaComponent } from './decora-fbx-qa.component';
import { DecMeshQaModule } from '@projects/decora/browser-lib-ui/src/lib/components/dec-mesh-qa/dec-mesh-qa.module';
import { DecMarkdownsMeshQaModule } from '@projects/decora/browser-lib-ui/src/lib/components/dec-markdowns-mesh-qa/dec-markdowns-mesh-qa.module';

@NgModule({
  imports: [
    CommonModule,
    DecoraFbxQaRoutingModule,
    DecMeshQaModule,
    DecMarkdownsMeshQaModule
  ],
  declarations: [DecoraFbxQaComponent],
})
export class DecoraFbxQaModule { }
